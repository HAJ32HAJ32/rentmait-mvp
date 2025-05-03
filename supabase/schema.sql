-- Create tables
create table contracts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  file_name text not null,
  file_type text not null,
  extracted_text text,
  status text default 'pending'::text
);

create table extracted_terms (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  contract_id uuid references contracts(id) not null,
  term_type text not null,
  term_value text not null,
  confidence_score float
);

create table user_queries (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  contract_id uuid references contracts(id) not null,
  question text not null,
  ai_response text not null,
  user_feedback text
);

-- Set up Row Level Security (RLS)
alter table contracts enable row level security;
alter table extracted_terms enable row level security;
alter table user_queries enable row level security;

-- Create policies
create policy "Users can view their own contracts"
  on contracts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own contracts"
  on contracts for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own extracted terms"
  on extracted_terms for select
  using (
    exists (
      select 1 from contracts
      where contracts.id = extracted_terms.contract_id
      and contracts.user_id = auth.uid()
    )
  );

create policy "Users can view their own queries"
  on user_queries for select
  using (
    exists (
      select 1 from contracts
      where contracts.id = user_queries.contract_id
      and contracts.user_id = auth.uid()
    )
  );

create policy "Users can insert their own queries"
  on user_queries for insert
  with check (
    exists (
      select 1 from contracts
      where contracts.id = user_queries.contract_id
      and contracts.user_id = auth.uid()
    )
  ); 