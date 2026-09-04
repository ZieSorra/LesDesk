-- LESDESK Supabase migration schema
-- Target: PostgreSQL / Supabase
-- This file is additive and does NOT modify the current Google Sheets production backend.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.school_settings (
  id boolean primary key default true check (id = true),
  school_name text not null default '',
  school_address text not null default '',
  school_phone text not null default '',
  school_email text not null default '',
  principal_name text not null default '',
  current_academic_year text not null default '',
  currency text not null default 'IDR',
  timezone text not null default 'Asia/Jakarta',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.academic_years (
  academic_year_id text primary key,
  academic_year text not null,
  semester text not null check (semester in ('GANJIL','GENAP')),
  start_date date not null,
  end_date date not null,
  status text not null default 'INACTIVE' check (status in ('ACTIVE','INACTIVE')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint academic_year_dates_valid check (end_date > start_date)
);

create unique index if not exists academic_year_active_unique
  on public.academic_years (status)
  where status = 'ACTIVE';

create index if not exists academic_year_date_idx
  on public.academic_years (start_date desc);

create table if not exists public.students (
  student_id text primary key,
  nis text not null,
  full_name text not null,
  class_name text not null default '',
  status text not null default 'ACTIVE' check (status in ('ACTIVE','INACTIVE')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists students_nis_unique on public.students (nis);
create index if not exists students_name_idx on public.students (full_name);
create index if not exists students_class_idx on public.students (class_name);
create index if not exists students_status_idx on public.students (status);

create table if not exists public.invoices (
  invoice_id text primary key,
  invoice_number text not null unique,
  student_id text not null references public.students(student_id) on update cascade on delete restrict,
  academic_year_id text references public.academic_years(academic_year_id) on update cascade on delete restrict,
  invoice_date date not null,
  due_date date,
  category text not null default '',
  description text not null default '',
  amount numeric(14,2) not null default 0 check (amount >= 0),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invoices_student_idx on public.invoices (student_id);
create index if not exists invoices_academic_year_idx on public.invoices (academic_year_id);
create index if not exists invoices_date_idx on public.invoices (invoice_date desc);
create index if not exists invoices_due_date_idx on public.invoices (due_date);
create index if not exists invoices_amount_idx on public.invoices (amount);

create table if not exists public.payments (
  payment_id text primary key,
  receipt_number text not null unique,
  invoice_id text not null references public.invoices(invoice_id) on update cascade on delete restrict,
  payment_date date not null,
  amount numeric(14,2) not null check (amount > 0),
  payment_method text not null default 'CASH' check (payment_method in ('CASH','TRANSFER','QRIS','E-WALLET')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_invoice_idx on public.payments (invoice_id);
create index if not exists payments_date_idx on public.payments (payment_date desc);
create index if not exists payments_method_idx on public.payments (payment_method);

drop trigger if exists school_settings_updated_at on public.school_settings;
create trigger school_settings_updated_at
before update on public.school_settings
for each row execute function public.set_updated_at();

drop trigger if exists academic_years_updated_at on public.academic_years;
create trigger academic_years_updated_at
before update on public.academic_years
for each row execute function public.set_updated_at();

drop trigger if exists students_updated_at on public.students;
create trigger students_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists invoices_updated_at on public.invoices;
create trigger invoices_updated_at
before update on public.invoices
for each row execute function public.set_updated_at();

drop trigger if exists payments_updated_at on public.payments;
create trigger payments_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

insert into public.school_settings (id)
values (true)
on conflict (id) do nothing;

-- Useful read model for dashboards/statements.
create or replace view public.invoice_balances as
select
  i.invoice_id,
  i.invoice_number,
  i.student_id,
  i.academic_year_id,
  i.invoice_date,
  i.due_date,
  i.category,
  i.description,
  i.amount,
  coalesce(sum(p.amount), 0)::numeric(14,2) as paid_amount,
  greatest(i.amount - coalesce(sum(p.amount), 0), 0)::numeric(14,2) as outstanding_amount,
  case
    when coalesce(sum(p.amount), 0) >= i.amount then 'PAID'
    when coalesce(sum(p.amount), 0) > 0 then 'PARTIAL'
    else 'UNPAID'
  end as status
from public.invoices i
left join public.payments p on p.invoice_id = i.invoice_id
group by i.invoice_id;

-- Security: no anonymous access to school data.
-- The frontend migration must authenticate users with Supabase Auth.
alter table public.school_settings enable row level security;
alter table public.academic_years enable row level security;
alter table public.students enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;

drop policy if exists "authenticated users manage school settings" on public.school_settings;
create policy "authenticated users manage school settings"
on public.school_settings for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users manage academic years" on public.academic_years;
create policy "authenticated users manage academic years"
on public.academic_years for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users manage students" on public.students;
create policy "authenticated users manage students"
on public.students for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users manage invoices" on public.invoices;
create policy "authenticated users manage invoices"
on public.invoices for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated users manage payments" on public.payments;
create policy "authenticated users manage payments"
on public.payments for all
to authenticated
using (true)
with check (true);

-- Views are protected by the underlying table RLS when queried by authenticated users.
