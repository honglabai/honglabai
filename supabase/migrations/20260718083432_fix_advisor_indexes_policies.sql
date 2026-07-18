create index apps_created_by_idx on public.apps (created_by)
  where created_by is not null;

create index apps_updated_by_idx on public.apps (updated_by)
  where updated_by is not null;

create index audit_logs_actor_id_idx on public.audit_logs (actor_id)
  where actor_id is not null;

drop policy "published apps are public" on public.apps;
create policy "published apps are public"
on public.apps for select
to anon
using (
  publication_status = 'published'
  and published_at <= now()
  and deleted_at is null
);

drop policy "published app media are public" on public.app_media;
create policy "published app media are public"
on public.app_media for select
to anon
using (
  exists (
    select 1 from public.apps
    where apps.id = app_media.app_id
      and apps.publication_status = 'published'
      and apps.published_at <= now()
      and apps.deleted_at is null
  )
);
