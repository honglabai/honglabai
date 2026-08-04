-- Retention for contact-form submissions.
--
-- The privacy policy (src/app/privacy/page.tsx) states inquiries are kept for
-- 3 years and then deleted. Nothing enforced that, so records would have been
-- retained indefinitely — a claim the implementation did not back up.
--
-- This adds the deletion routine. It is NOT scheduled automatically: pg_cron
-- availability varies by Supabase plan, so scheduling is left explicit.
-- Either enable pg_cron and register the job (see comment at the bottom), or
-- call this function from an existing scheduled task.

create or replace function public.purge_expired_inquiries(p_retention_days integer default 1095)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  delete from public.inquiries
  where created_at < now() - make_interval(days => p_retention_days);

  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

comment on function public.purge_expired_inquiries(integer) is
  'Deletes inquiries older than the retention window (default 1095 days / 3 years). Keep in sync with the published privacy policy.';

-- Admin-only: this permanently destroys data, so it must not be callable by anon.
revoke all on function public.purge_expired_inquiries(integer) from public, anon;
grant execute on function public.purge_expired_inquiries(integer) to authenticated;

-- To run it nightly once pg_cron is enabled on the project:
--   create extension if not exists pg_cron;
--   select cron.schedule('purge-expired-inquiries', '0 3 * * *',
--     $$select public.purge_expired_inquiries();$$);
