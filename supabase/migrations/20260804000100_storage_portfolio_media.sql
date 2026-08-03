-- Storage bucket policies for portfolio-media. Uploads go through the app as
-- the user's session (RLS applies to storage.objects), so without these
-- policies writes depend on undocumented dashboard config. Lock writes to
-- active admins who can edit, scoped to their own <uid>/ folder. Reads stay
-- public (portfolio images are served via public URLs).

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = true;

drop policy if exists "portfolio-media public read" on storage.objects;
drop policy if exists "portfolio-media admin insert" on storage.objects;
drop policy if exists "portfolio-media admin update" on storage.objects;
drop policy if exists "portfolio-media admin delete" on storage.objects;

create policy "portfolio-media public read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'portfolio-media');

create policy "portfolio-media admin insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (
    select 1 from public.admin_users
    where id = (select auth.uid()) and status = 'active'
      and role in ('owner', 'admin', 'editor')
  )
);

create policy "portfolio-media admin update"
on storage.objects for update
to authenticated
using (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (
    select 1 from public.admin_users
    where id = (select auth.uid()) and status = 'active'
      and role in ('owner', 'admin', 'editor')
  )
)
with check (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (
    select 1 from public.admin_users
    where id = (select auth.uid()) and status = 'active'
      and role in ('owner', 'admin', 'editor')
  )
);

create policy "portfolio-media admin delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (
    select 1 from public.admin_users
    where id = (select auth.uid()) and status = 'active'
      and role in ('owner', 'admin', 'editor')
  )
);
