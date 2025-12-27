-- 1. Make sure RLS is actually enabled (it likely already is)
alter table users enable row level security;

-- 2. Create a policy to allow anyone to "Insert" (Register)
create policy "Allow public to insert users" 
on public.users 
for insert 
with check (true);

-- 3. (Optional) Create a policy so users can "Select" (Read) the data
create policy "Allow public to read users" 
on public.users 
for select 
using (true);


-- 4. Allow anyone to update a row if they know the username
create policy "Allow public to update users" 
on public.users 
for update 
using (true) 
with check (true);