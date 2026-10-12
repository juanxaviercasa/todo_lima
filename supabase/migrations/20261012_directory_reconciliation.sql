CREATE TABLE IF NOT EXISTS public.directory_source_observations (
 business_id varchar(100) NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
 source text NOT NULL CHECK(source='todo_lima_static_files'), source_hash text NOT NULL CHECK(source_hash ~ '^[a-f0-9]{64}$'),
 identity text NOT NULL, payload jsonb NOT NULL, conflicts jsonb NOT NULL,
 imported_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(business_id,source_hash)
);
CREATE TABLE IF NOT EXISTS public.directory_reconciliation_reviews (
 source_hash text PRIMARY KEY CHECK(source_hash ~ '^[a-f0-9]{64}$'), reason text NOT NULL,
 identity text, category_slug text, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.directory_source_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_reconciliation_reviews ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.directory_source_observations,public.directory_reconciliation_reviews FROM PUBLIC,anon,authenticated,service_role;
GRANT SELECT,INSERT ON public.directory_source_observations,public.directory_reconciliation_reviews TO service_role;
COMMENT ON TABLE public.directory_source_observations IS 'Immutable allowlisted public source observations; not prospecting, verification or contact permission.';
