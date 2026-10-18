BEGIN;
CREATE TABLE IF NOT EXISTS public.analytics_visits (
  id uuid PRIMARY KEY,
  path text NOT NULL CHECK (length(path) <= 240 AND path ~ '^/([a-z0-9-]+/?)*$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  active_seconds integer NOT NULL DEFAULT 0 CHECK (active_seconds BETWEEN 0 AND 14400),
  scroll_depth integer NOT NULL DEFAULT 0 CHECK (scroll_depth BETWEEN 0 AND 100),
  actions jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS analytics_visits_created_at_idx ON public.analytics_visits(created_at);
ALTER TABLE public.analytics_visits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.analytics_visits FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analytics_visits TO service_role;

CREATE OR REPLACE FUNCTION public.record_analytics_visit(snapshot jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE old public.analytics_visits; merged jsonb := '{}'; key text; seconds integer;
BEGIN
  -- Serialize snapshots of the same page view, including first-insert races.
  PERFORM pg_advisory_xact_lock(hashtextextended(snapshot->>'id', 0));
  SELECT * INTO old FROM public.analytics_visits WHERE id = (snapshot->>'id')::uuid;
  IF FOUND THEN
    IF old.path <> snapshot->>'path' OR old.created_at < now() - interval '4 hours' THEN RETURN '{"ignored":true}'::jsonb; END IF;
    seconds := greatest(old.active_seconds, least((snapshot->>'active_seconds')::integer, floor(extract(epoch FROM now() - old.created_at))::integer + 2, 14400));
  ELSE
    seconds := 0;
  END IF;
  FOREACH key IN ARRAY ARRAY['whatsapp','phone','email','map','website','search','filter','calculator','audio_play','video_play'] LOOP
    merged := merged || jsonb_build_object(key, greatest(coalesce((old.actions->>key)::integer,0), least(100,greatest(0,coalesce((snapshot->'actions'->>key)::integer,0)))));
  END LOOP;
  INSERT INTO public.analytics_visits(id,path,active_seconds,scroll_depth,actions)
  VALUES ((snapshot->>'id')::uuid,snapshot->>'path',seconds,least(100,greatest(0,(snapshot->>'scroll_depth')::integer)),merged)
  ON CONFLICT(id) DO UPDATE SET active_seconds = excluded.active_seconds, scroll_depth = greatest(analytics_visits.scroll_depth, excluded.scroll_depth), actions = excluded.actions, updated_at = now();
  RETURN '{"received":true}'::jsonb;
END $$;

CREATE OR REPLACE FUNCTION public.analytics_engagement_report(period_days integer DEFAULT 7)
RETURNS jsonb LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public, pg_temp AS $$
WITH visits AS (
  SELECT * FROM public.analytics_visits
  WHERE created_at >= ((now() AT TIME ZONE 'America/Lima')::date - (least(90,greatest(1,period_days)) - 1))::timestamp AT TIME ZONE 'America/Lima'
), pages AS (
  SELECT path, count(*) AS views, sum(active_seconds) AS active_seconds,
    round(avg(active_seconds)) AS avg_seconds,
    count(*) FILTER (WHERE scroll_depth >= 75) AS read75,
    sum(coalesce((actions->>'whatsapp')::int,0) + coalesce((actions->>'phone')::int,0) + coalesce((actions->>'email')::int,0)) AS contacts
  FROM visits GROUP BY path
), daily AS (
  SELECT (created_at AT TIME ZONE 'America/Lima')::date AS day, count(*) AS views, sum(active_seconds) AS active_seconds FROM visits GROUP BY 1
), actions AS (
  SELECT key, sum(value::integer) AS count FROM visits, jsonb_each_text(actions) GROUP BY key
)
SELECT jsonb_build_object(
  'generatedAt', now(), 'days', period_days,
  'totals', (SELECT jsonb_build_object('views',count(*),'activeSeconds',coalesce(sum(active_seconds),0),'avgSeconds',coalesce(round(avg(active_seconds)),0),'read75',count(*) FILTER (WHERE scroll_depth >= 75)) FROM visits),
  'pages',coalesce((SELECT jsonb_agg(to_jsonb(p)) FROM (SELECT * FROM pages ORDER BY active_seconds DESC,views DESC LIMIT 100) p),'[]'::jsonb),
  'daily',coalesce((SELECT jsonb_agg(to_jsonb(d) ORDER BY day) FROM daily d),'[]'::jsonb),
  'actions',coalesce((SELECT jsonb_object_agg(key,count) FROM actions),'{}'::jsonb)
);
$$;
REVOKE ALL ON FUNCTION public.record_analytics_visit(jsonb), public.analytics_engagement_report(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_analytics_visit(jsonb), public.analytics_engagement_report(integer) TO service_role;
COMMENT ON TABLE public.analytics_visits IS 'Consented page views; random per-navigation ID, no persistent visitor ID, IP, query, referrer or contact details. Retain at most 90 days.';
-- Supabase pg_cron is optional. Refuse to claim automatic retention without it.
DO $block$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'todolima-analytics-retention') THEN
      PERFORM cron.schedule('todolima-analytics-retention','17 5 * * *', $job$DELETE FROM public.analytics_visits WHERE created_at < now() - interval '90 days'$job$);
    END IF;
  END IF;
END $block$;
COMMIT;
