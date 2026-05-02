create extension if not exists "pgcrypto";

create type public.gender as enum ('woman', 'man', 'non_binary', 'other');
create type public.relationship_intent as enum ('serious', 'open_to_either', 'casual');
create type public.match_status as enum ('pending', 'accepted', 'declined', 'reported');
create type public.round_status as enum ('scheduled', 'running', 'completed', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text not null,
  age integer not null check (age >= 18),
  gender public.gender not null,
  interested_in public.gender[] not null check (array_length(interested_in, 1) > 0),
  bio text not null default '',
  relationship_intent public.relationship_intent not null default 'open_to_either',
  university text not null default 'ANU',
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint anu_email_only check (lower(email) like '%@anu.edu.au')
);

create table public.question_answers (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  self_answers jsonb not null,
  preference_answers jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.match_rounds (
  id uuid primary key default gen_random_uuid(),
  cadence text not null default 'weekly',
  status public.round_status not null default 'scheduled',
  run_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  round_id uuid not null references public.match_rounds(id) on delete cascade,
  user_a uuid not null references public.profiles(id) on delete cascade,
  user_b uuid not null references public.profiles(id) on delete cascade,
  score numeric(5, 4) not null check (score >= 0 and score <= 1),
  reasons text[] not null default '{}',
  user_a_status public.match_status not null default 'pending',
  user_b_status public.match_status not null default 'pending',
  created_at timestamptz not null default now(),
  constraint no_self_match check (user_a <> user_b),
  constraint one_match_per_user_pair_per_round unique (round_id, user_a, user_b)
);

create table public.blocks_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('block', 'report')),
  reason text,
  created_at timestamptz not null default now(),
  constraint no_self_block_or_report check (reporter_id <> target_id),
  constraint one_safety_record_per_kind unique (reporter_id, target_id, kind)
);

alter table public.profiles enable row level security;
alter table public.question_answers enable row level security;
alter table public.match_rounds enable row level security;
alter table public.matches enable row level security;
alter table public.blocks_reports enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can manage their own answers"
  on public.question_answers for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can read matches they are part of"
  on public.matches for select
  using (auth.uid() = user_a or auth.uid() = user_b);

create policy "Users can create safety records"
  on public.blocks_reports for insert
  with check (auth.uid() = reporter_id);

create policy "Users can read their own safety records"
  on public.blocks_reports for select
  using (auth.uid() = reporter_id);
