-- Distributed rate limiting. In-memory Map limiter did not survive serverless
-- multi-instance / cold starts, so every public endpoint was effectively
-- unthrottled. This moves the counter into Postgres with an atomic RPC.

create table if not exists public.rate_limits (
  key text primary key,
  count integer not null default 0,
  reset_at timestamptz not null
);

-- No direct access: the SECURITY DEFINER function below is the only writer.
alter table public.rate_limits enable row level security;

create index if not exists rate_limits_reset_at_idx on public.rate_limits (reset_at);

-- Atomic check-and-increment. Returns whether the caller is allowed and, when
-- blocked, seconds until the window resets. Allows exactly p_limit calls per
-- window (the p_limit+1-th is blocked), matching the old in-memory semantics.
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
