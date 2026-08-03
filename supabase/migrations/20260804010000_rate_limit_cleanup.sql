-- rate_limits grows one row per (key, window) and nothing ever removed expired
-- rows, so the table would grow unbounded with one row per unique IP forever.
-- Cheapest fix that needs no scheduler: opportunistically delete expired rows
-- from inside the existing RPC, which is the only writer.

create or replace function public.check_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_count integer;
  v_reset timestamptz;
begin
  -- Opportunistic GC. Runs rarely (~1% of calls) so it stays off the hot path,
  -- and is capped so a large backlog is drained across several calls rather
  -- than in one long-running statement.
  if random() < 0.01 then
    delete from public.rate_limits
    where key in (
      select key from public.rate_limits
      where reset_at <= v_now - interval '1 hour'
      limit 1000
    );
  end if;

  insert into public.rate_limits (key, count, reset_at)
  values (p_key, 1, v_now + make_interval(secs => p_window_seconds))
  on conflict (key) do update
    set count = case when public.rate_limits.reset_at <= v_now then 1
                     else public.rate_limits.count + 1 end,
        reset_at = case when public.rate_limits.reset_at <= v_now
                        then v_now + make_interval(secs => p_window_seconds)
                        else public.rate_limits.reset_at end
  returning public.rate_limits.count, public.rate_limits.reset_at
  into v_count, v_reset;

  if v_count > p_limit then
    return query select false, ceil(extract(epoch from (v_reset - v_now)))::integer;
  else
    return query select true, 0;
  end if;
end;
$$;

revoke all on function public.check_rate_limit(text, integer, integer) from public;
grant execute on function public.check_rate_limit(text, integer, integer) to anon, authenticated;
