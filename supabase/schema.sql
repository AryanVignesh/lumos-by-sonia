-- Lumos by Sonia: enquiries table
-- Run this once in Supabase → SQL Editor → New query → Run.

create extension if not exists "pgcrypto";

create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  email       text not null,
  event_date  date not null,
  event_type  text not null,
  vision      text,
  status      text not null default 'new',
  created_at  timestamptz not null default now()
);

comment on table public.enquiries is 'Enquiry form submissions from the website.';
comment on column public.enquiries.status is 'Change to e.g. contacted, booked or declined as you follow up.';

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);

-- Row Level Security ON with NO public policies:
-- the public (anon) key can neither read nor write. The website inserts rows
-- server-side with the service role key, which bypasses RLS.
alter table public.enquiries enable row level security;
