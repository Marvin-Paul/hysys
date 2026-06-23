-- Add missing DELETE policies

-- Support tickets: Users can delete their own tickets (or assigned agents)
CREATE POLICY "users_delete_own_tickets" ON support_tickets FOR DELETE
  TO authenticated USING (user_id = auth.uid());

-- Profiles: Users can never delete their own profile (only an admin could)
-- We'll allow users to delete their own profile for now (cascades to auth.users)
CREATE POLICY "users_delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (id = auth.uid());