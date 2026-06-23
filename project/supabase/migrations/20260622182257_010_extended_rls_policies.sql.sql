-- RLS policies for new Salesforce tables

-- Enable RLS on all new tables
ALTER TABLE campaign_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_contact_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CAMPAIGN MEMBERS
-- ============================================

CREATE POLICY "users_read_campaign_members" ON campaign_members FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE POLICY "users_insert_campaign_members" ON campaign_members FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_campaign_members" ON campaign_members FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_campaign_members" ON campaign_members FOR DELETE
  TO authenticated USING (owner_id = auth.uid());

-- ============================================
-- OPPORTUNITY CONTACT ROLES
-- ============================================

CREATE POLICY "users_read_contact_roles" ON opportunity_contact_roles FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND (owner_id = auth.uid() OR owner_id IS NULL))
  );

CREATE POLICY "users_insert_contact_roles" ON opportunity_contact_roles FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND owner_id = auth.uid())
  );

CREATE POLICY "users_update_contact_roles" ON opportunity_contact_roles FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND owner_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND owner_id = auth.uid())
  );

CREATE POLICY "users_delete_contact_roles" ON opportunity_contact_roles FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND owner_id = auth.uid())
  );

-- ============================================
-- QUOTES
-- ============================================

CREATE POLICY "users_read_quotes" ON quotes FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE POLICY "users_insert_quotes" ON quotes FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_quotes" ON quotes FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_quotes" ON quotes FOR DELETE
  TO authenticated USING (owner_id = auth.uid());

-- ============================================
-- QUOTE LINE ITEMS
-- ============================================

CREATE POLICY "users_read_quote_line_items" ON quote_line_items FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM quotes WHERE id = quote_id AND (owner_id = auth.uid() OR owner_id IS NULL))
  );

CREATE POLICY "users_insert_quote_line_items" ON quote_line_items FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM quotes WHERE id = quote_id AND owner_id = auth.uid())
  );

CREATE POLICY "users_update_quote_line_items" ON quote_line_items FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM quotes WHERE id = quote_id AND owner_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM quotes WHERE id = quote_id AND owner_id = auth.uid())
  );

CREATE POLICY "users_delete_quote_line_items" ON quote_line_items FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM quotes WHERE id = quote_id AND owner_id = auth.uid())
  );

-- ============================================
-- CONTRACTS
-- ============================================

CREATE POLICY "users_read_contracts" ON contracts FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE POLICY "users_insert_contracts" ON contracts FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_contracts" ON contracts FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_contracts" ON contracts FOR DELETE
  TO authenticated USING (owner_id = auth.uid());

-- ============================================
-- ASSETS
-- ============================================

CREATE POLICY "users_read_assets" ON assets FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE POLICY "users_insert_assets" ON assets FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_assets" ON assets FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_assets" ON assets FOR DELETE
  TO authenticated USING (owner_id = auth.uid());

-- ============================================
-- ATTACHMENTS
-- ============================================

CREATE POLICY "users_read_attachments" ON attachments FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE POLICY "users_insert_attachments" ON attachments FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_attachments" ON attachments FOR DELETE
  TO authenticated USING (owner_id = auth.uid());

-- ============================================
-- SERVICE CONTRACTS
-- ============================================

CREATE POLICY "users_read_service_contracts" ON service_contracts FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE POLICY "users_insert_service_contracts" ON service_contracts FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_service_contracts" ON service_contracts FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_service_contracts" ON service_contracts FOR DELETE
  TO authenticated USING (owner_id = auth.uid());

-- ============================================
-- ENTITLEMENTS
-- ============================================

CREATE POLICY "users_read_entitlements" ON entitlements FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE POLICY "users_insert_entitlements" ON entitlements FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_entitlements" ON entitlements FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_entitlements" ON entitlements FOR DELETE
  TO authenticated USING (owner_id = auth.uid());