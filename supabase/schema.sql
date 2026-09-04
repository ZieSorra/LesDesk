-- LESDESK / SUPABASE
-- Sprint 1: database foundation
-- Generated from the current LesDesk frontend API contract.
-- Do not expose service/secret keys in the browser.

create extension if not exists pgcrypto;

create table if not exists public.academic_years (
  academic_year_id uuid primary key default gen_random_uuid(),
  academic_year text not null,
  semester text not null check (semester in ('GANJIL','GENAP')),
  start_date date not null,
  end_date date not null,
  status text not null default 'INACTIVE' check (status in ('ACTIVE','INACTIVE')),
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint academic_year_period_check check (start_date <= end_date)
);

create unique index if not exists academic_year_unique_period
  on public.academic_years (academic_year, semester);

create table if not exists public.students (
  student_id text primary key,
  nis text not null,
  full_name text not null,
  class_name text not null default '',
  status text not null default 'ACTIVE' check (status in ('ACTIVE','INACTIVE')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  notes text default ''
);

create unique index if not exists students_nis_unique
  on public.students (nis)
  where nis <> '';

create table if not exists public.invoices (
  invoice_id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  student_id text not null references public.students(student_id) on update cascade on delete restrict,
  academic_year_id uuid references public.academic_years(academic_year_id) on update cascade on delete restrict,
  invoice_date date not null default current_date,
  due_date date,
  category text not null default '',
  description text not null default '',
  amount numeric(14,2) not null default 0 check (amount >= 0),
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invoices_student_id_idx
  on public.invoices(student_id);

create index if not exists invoices_academic_year_id_idx
  on public.invoices(academic_year_id);

create index if not exists invoices_date_idx
  on public.invoices(invoice_date);

create table if not exists public.payments (
  payment_id uuid primary key default gen_random_uuid(),
  receipt_number text not null unique,
  invoice_id uuid not null references public.invoices(invoice_id) on update cascade on delete restrict,
  payment_date date not null default current_date,
  amount numeric(14,2) not null check (amount > 0),
  payment_method text not null default 'CASH'
    check (payment_method in ('CASH','TRANSFER','QRIS','E-WALLET')),
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_invoice_id_idx
  on public.payments(invoice_id);

create index if not exists payments_date_idx
  on public.payments(payment_date);

create table if not exists public.school_settings (
  id smallint primary key default 1 check (id = 1),
  school_name text default '',
  school_address text default '',
  school_phone text default '',
  school_email text default '',
  principal_name text default '',
  current_academic_year text default '',
  currency text not null default 'IDR',
  timezone text not null default 'Asia/Jakarta',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Convenience view for invoice balances.
-- Access to this view must be secured consistently with the underlying tables.
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
    when i.due_date is not null and i.due_date < current_date then 'OVERDUE'
    else 'UNPAID'
  end as status,
  i.notes,
  i.created_at,
  i.updated_at
from public.invoices i
left join public.payments p on p.invoice_id = i.invoice_id
group by i.invoice_id;

-- Keep updated_at current on writes.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists academic_years_set_updated_at on public.academic_years;
create trigger academic_years_set_updated_at
before update on public.academic_years
for each row execute function public.set_updated_at();

drop trigger if exists students_set_updated_at on public.students;
create trigger students_set_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at
before update on public.invoices
for each row execute function public.set_updated_at();

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

drop trigger if exists school_settings_set_updated_at on public.school_settings;
create trigger school_settings_set_updated_at
before update on public.school_settings
for each row execute function public.set_updated_at();

-- Security foundation:
-- RLS is enabled now so the database is not accidentally public.
-- Authenticated policies will be added in the authentication/authorization sprint.
alter table public.academic_years enable row level security;
alter table public.students enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.school_settings enable row level security;

-- The browser must use the Supabase publishable key, never a secret/service key.
