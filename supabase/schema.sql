create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

create table if not exists medicines (
  id uuid primary key default gen_random_uuid(),
  medicine_name text not null,
  generic_name text,
  brand_name text,
  category text,
  strength text,
  dosage_form text,
  price numeric(10, 2) not null default 0 check (price >= 0),
  quantity integer not null default 0 check (quantity >= 0),
  expiry_date date,
  manufacturer text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists prescription_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  image_url text,
  extracted_text text,
  created_at timestamptz not null default now()
);

create table if not exists scan_results (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid references prescription_scans(id) on delete cascade,
  detected_text text,
  medicine_id uuid references medicines(id),
  match_status text,
  similarity_score numeric(5, 2),
  created_at timestamptz not null default now()
);

create table if not exists pharmacy_settings (
  id uuid primary key default gen_random_uuid(),
  pharmacy_name text,
  phone text,
  address text,
  low_stock_threshold integer not null default 10,
  near_expiry_days integer not null default 120,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table medicines enable row level security;
alter table prescription_scans enable row level security;
alter table scan_results enable row level security;
alter table pharmacy_settings enable row level security;

create policy "authenticated users can manage medicines" on medicines for all to authenticated using (true) with check (true);
create policy "public users can view medicine availability" on medicines for select to anon using (true);
create policy "users can manage own scans" on prescription_scans for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "authenticated users can manage scan results" on scan_results for all to authenticated using (true) with check (true);
create policy "authenticated users can view settings" on pharmacy_settings for select to authenticated using (true);
