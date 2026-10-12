-- DIR-01. Additive normalization; retain original fields and legacy clients.
CREATE TABLE IF NOT EXISTS public.directory_areas (
 slug text PRIMARY KEY, title text NOT NULL, description text NOT NULL,
 taxonomy_version text NOT NULL
);
CREATE TABLE IF NOT EXISTS public.directory_zones (
 slug text PRIMARY KEY, title text NOT NULL, classification text NOT NULL DEFAULT 'editorial_not_administrative'
 CHECK(classification='editorial_not_administrative')
);
CREATE TABLE IF NOT EXISTS public.directory_districts (
 slug text PRIMARY KEY, name text NOT NULL UNIQUE,
 zone_slug text NOT NULL REFERENCES public.directory_zones(slug) ON DELETE RESTRICT,
 province text NOT NULL CHECK(province IN ('Lima','Callao')),
 ubigeo text UNIQUE CHECK(ubigeo ~ '^[0-9]{6}$'),
 source text NOT NULL DEFAULT 'Todo Lima editorial district registry'
);
CREATE TABLE IF NOT EXISTS public.directory_district_aliases (
 alias text PRIMARY KEY, district_slug text NOT NULL REFERENCES public.directory_districts(slug) ON DELETE RESTRICT
);
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS area_slug text REFERENCES public.directory_areas(slug) ON DELETE RESTRICT;
CREATE TABLE IF NOT EXISTS public.directory_area_recommendations (
 area_slug text NOT NULL REFERENCES public.directory_areas(slug) ON DELETE RESTRICT,
 category_slug varchar(100) NOT NULL REFERENCES public.categories(slug) ON DELETE RESTRICT,
 PRIMARY KEY(area_slug,category_slug)
);
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS district_slug text REFERENCES public.directory_districts(slug) ON DELETE RESTRICT;
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS district_assignment text NOT NULL DEFAULT 'unresolved'
 CHECK(district_assignment IN ('unresolved','legacy_label_match'));
CREATE TABLE IF NOT EXISTS public.business_service_districts (
 business_id varchar(100) NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
 district_slug text NOT NULL REFERENCES public.directory_districts(slug) ON DELETE RESTRICT,
 verification text NOT NULL CHECK(verification IN ('business_confirmed','operator_verified')),
 source_reference text NOT NULL CHECK(length(trim(source_reference))>0),
 confirmed_at timestamptz NOT NULL, PRIMARY KEY(business_id,district_slug)
);
CREATE TABLE IF NOT EXISTS public.directory_taxonomy_releases (
 id text PRIMARY KEY, content_sha256 text NOT NULL CHECK(content_sha256 ~ '^[a-f0-9]{64}$'),
 payload jsonb NOT NULL CHECK(jsonb_typeof(payload)='object'), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.directory_district_profiles (
 district_slug text NOT NULL REFERENCES public.directory_districts(slug) ON DELETE RESTRICT,
 version text NOT NULL, payload jsonb NOT NULL CHECK(jsonb_typeof(payload)='object'),
 content_sha256 text NOT NULL CHECK(content_sha256 ~ '^[a-f0-9]{64}$'),
 PRIMARY KEY(district_slug,version)
);
CREATE OR REPLACE FUNCTION public.directory_assign_district() RETURNS trigger
LANGUAGE plpgsql SET search_path=pg_catalog,public AS $$
BEGIN
 SELECT a.district_slug INTO NEW.district_slug FROM public.directory_district_aliases a
 WHERE a.alias=lower(btrim(NEW.district));
 NEW.district_assignment := CASE WHEN NEW.district_slug IS NULL THEN 'unresolved' ELSE 'legacy_label_match' END;
 RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS directory_assign_district ON public.businesses;
CREATE TRIGGER directory_assign_district BEFORE INSERT OR UPDATE OF district ON public.businesses
FOR EACH ROW EXECUTE FUNCTION public.directory_assign_district();
CREATE INDEX IF NOT EXISTS idx_categories_area_slug ON public.categories(area_slug);
CREATE INDEX IF NOT EXISTS idx_businesses_district_category ON public.businesses(district_slug,category_slug);
-- Private reader view, explicit public fields only. No prospecting/contact/consent joins.
CREATE OR REPLACE VIEW public.directory_agent_business_context AS
 SELECT b.id,b.name,b.category_slug,c.area_slug,b.district_slug,b.district_assignment,
 b.address,b.website_url,b.maps_url,b.is_verified
 FROM public.businesses b JOIN public.categories c ON c.slug=b.category_slug;
REVOKE ALL ON public.directory_agent_business_context FROM PUBLIC,anon,authenticated,service_role;
GRANT SELECT ON public.directory_agent_business_context TO sector_catalog_reader_v1,service_role;
COMMENT ON VIEW public.directory_agent_business_context IS 'Public directory fields for exact-ID diagnostic lookup; not independent verification, contact permission or prospecting data.';
DO $$
DECLARE t text;
BEGIN
 FOREACH t IN ARRAY ARRAY['directory_areas','directory_zones','directory_districts','directory_district_aliases','directory_area_recommendations','business_service_districts','directory_taxonomy_releases','directory_district_profiles'] LOOP
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',t);
  EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC,anon,authenticated,service_role',t);
  EXECUTE format('GRANT SELECT,INSERT,UPDATE ON public.%I TO service_role',t);
  IF t NOT IN ('directory_taxonomy_releases','business_service_districts') THEN
   EXECUTE format('GRANT SELECT ON public.%I TO anon,authenticated',t);
   EXECUTE format('DROP POLICY IF EXISTS directory_public_read ON public.%I',t);
   EXECUTE format('CREATE POLICY directory_public_read ON public.%I FOR SELECT TO anon,authenticated USING(true)',t);
  END IF;
 END LOOP;
END $$;
-- Immutable releases/profiles: no update permission for service role.
REVOKE UPDATE ON public.directory_taxonomy_releases,public.directory_district_profiles FROM service_role;
GRANT SELECT ON public.directory_taxonomy_releases,public.directory_district_profiles TO sector_catalog_reader_v1;
DROP POLICY IF EXISTS directory_reader_release ON public.directory_taxonomy_releases;
CREATE POLICY directory_reader_release ON public.directory_taxonomy_releases FOR SELECT TO sector_catalog_reader_v1
 USING(id='todo-lima-taxonomy-20261012-v1');
DROP POLICY IF EXISTS directory_reader_profiles ON public.directory_district_profiles;
CREATE POLICY directory_reader_profiles ON public.directory_district_profiles FOR SELECT TO sector_catalog_reader_v1 USING(version='1.0');
