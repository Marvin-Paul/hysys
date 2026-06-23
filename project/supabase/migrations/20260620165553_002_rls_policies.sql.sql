-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies (users can read/update own profile, admins can read all)
CREATE POLICY "users_read_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

CREATE POLICY "users_update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "users_insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

-- Companies policies (users can CRUD companies they own)
CREATE POLICY "users_read_own_companies" ON companies FOR SELECT
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_insert_companies" ON companies FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_update_own_companies" ON companies FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_delete_own_companies" ON companies FOR DELETE
  TO authenticated USING (auth.uid() = owner_id);

-- Contacts policies (users can CRUD contacts they own)
CREATE POLICY "users_read_own_contacts" ON contacts FOR SELECT
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_insert_contacts" ON contacts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_update_own_contacts" ON contacts FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_delete_own_contacts" ON contacts FOR DELETE
  TO authenticated USING (auth.uid() = owner_id);

-- Deals policies (users can CRUD deals they own)
CREATE POLICY "users_read_own_deals" ON deals FOR SELECT
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_insert_deals" ON deals FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_update_own_deals" ON deals FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_delete_own_deals" ON deals FOR DELETE
  TO authenticated USING (auth.uid() = owner_id);

-- Activities policies (users can CRUD activities they own)
CREATE POLICY "users_read_own_activities" ON activities FOR SELECT
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_insert_activities" ON activities FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_update_own_activities" ON activities FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_delete_own_activities" ON activities FOR DELETE
  TO authenticated USING (auth.uid() = owner_id);

-- Support tickets policies (users can CRUD their own tickets)
CREATE POLICY "users_read_own_tickets" ON support_tickets FOR SELECT
  TO authenticated USING (auth.uid() = user_id OR auth.uid() = assigned_to OR user_id IS NULL);

CREATE POLICY "users_insert_tickets" ON support_tickets FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_tickets" ON support_tickets FOR UPDATE
  TO authenticated USING (auth.uid() = user_id OR auth.uid() = assigned_to) WITH CHECK (auth.uid() = user_id OR auth.uid() = assigned_to);

-- Reports policies (users can CRUD reports they own)
CREATE POLICY "users_read_own_reports" ON reports FOR SELECT
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_insert_reports" ON reports FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_update_own_reports" ON reports FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_delete_own_reports" ON reports FOR DELETE
  TO authenticated USING (auth.uid() = owner_id);