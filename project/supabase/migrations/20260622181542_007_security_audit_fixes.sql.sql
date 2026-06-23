-- Security audit fixes for RLS policies
-- Remove overly permissive policies and replace with proper ownership checks

-- ============================================
-- PRODUCTS - Fix: Only admin or owner can modify
-- ============================================

DROP POLICY IF EXISTS public_read_products ON products;
DROP POLICY IF EXISTS users_delete_products ON products;
DROP POLICY IF EXISTS users_insert_products ON products;
DROP POLICY IF EXISTS users_update_products ON products;

-- Products are read-only for most users (catalog items)
CREATE POLICY "authenticated_read_active_products" ON products FOR SELECT
  TO authenticated USING (active = true);

-- Only allow write operations for users with admin role (checked via profile)
CREATE POLICY "admin_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_update_products" ON products FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_delete_products" ON products FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- PRICE BOOKS - Fix: Only admin can modify price books
-- ============================================

DROP POLICY IF EXISTS public_read_price_books ON price_books;
DROP POLICY IF EXISTS users_delete_price_books ON price_books;
DROP POLICY IF EXISTS users_insert_price_books ON price_books;
DROP POLICY IF EXISTS users_update_price_books ON price_books;

-- All authenticated users can read active price books
CREATE POLICY "authenticated_read_active_price_books" ON price_books FOR SELECT
  TO authenticated USING (is_active = true);

-- Only admin can modify price books
CREATE POLICY "admin_insert_price_books" ON price_books FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_update_price_books" ON price_books FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_delete_price_books" ON price_books FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- PRICE BOOK ENTRIES - Fix: Only admin can modify
-- ============================================

DROP POLICY IF EXISTS public_read_price_book_entries ON price_book_entries;
DROP POLICY IF EXISTS users_delete_price_book_entries ON price_book_entries;
DROP POLICY IF EXISTS users_insert_price_book_entries ON price_book_entries;
DROP POLICY IF EXISTS users_update_price_book_entries ON price_book_entries;

-- All authenticated users can read entries for active price books
CREATE POLICY "authenticated_read_price_book_entries" ON price_book_entries FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM price_books WHERE id = price_book_id AND is_active = true)
  );

-- Only admin can modify price book entries
CREATE POLICY "admin_insert_price_book_entries" ON price_book_entries FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_update_price_book_entries" ON price_book_entries FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_delete_price_book_entries" ON price_book_entries FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- OPPORTUNITY LINE ITEMS - Fix: Owner-based access
-- ============================================

DROP POLICY IF EXISTS public_read_opportunity_line_items ON opportunity_line_items;
DROP POLICY IF EXISTS users_delete_opportunity_line_items ON opportunity_line_items;
DROP POLICY IF EXISTS users_insert_opportunity_line_items ON opportunity_line_items;
DROP POLICY IF EXISTS users_update_opportunity_line_items ON opportunity_line_items;

-- Users can read line items for deals they own
CREATE POLICY "users_read_own_line_items" ON opportunity_line_items FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND (owner_id = auth.uid() OR owner_id IS NULL))
  );

-- Users can insert line items for deals they own
CREATE POLICY "users_insert_own_line_items" ON opportunity_line_items FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND owner_id = auth.uid())
  );

-- Users can update line items for deals they own
CREATE POLICY "users_update_own_line_items" ON opportunity_line_items FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND owner_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND owner_id = auth.uid())
  );

-- Users can delete line items for deals they own
CREATE POLICY "users_delete_own_line_items" ON opportunity_line_items FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM deals WHERE id = opportunity_id AND owner_id = auth.uid())
  );

-- ============================================
-- CAMPAIGNS - Fix: Owner-based access
-- ============================================

DROP POLICY IF EXISTS public_read_campaigns ON campaigns;

-- Users can read campaigns they own or that have no owner
CREATE POLICY "users_read_own_campaigns" ON campaigns FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

-- Remove access to owner_id IS NULL for modifications
DROP POLICY IF EXISTS users_delete_campaigns ON campaigns;
DROP POLICY IF EXISTS users_insert_campaigns ON campaigns;
DROP POLICY IF EXISTS users_update_campaigns ON campaigns;

CREATE POLICY "users_insert_own_campaigns" ON campaigns FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_own_campaigns" ON campaigns FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_own_campaigns" ON campaigns FOR DELETE
  TO authenticated USING (owner_id = auth.uid());

-- ============================================
-- LEADS - Fix: Owner-based access
-- ============================================

DROP POLICY IF EXISTS public_read_leads ON leads;

-- Users can read leads they own or that have no owner
CREATE POLICY "users_read_own_leads" ON leads FOR SELECT
  TO authenticated USING (owner_id = auth.uid() OR owner_id IS NULL);

-- Remove access to owner_id IS NULL for modifications
DROP POLICY IF EXISTS users_delete_leads ON leads;
DROP POLICY IF EXISTS users_insert_leads ON leads;
DROP POLICY IF EXISTS users_update_leads ON leads;

CREATE POLICY "users_insert_own_leads" ON leads FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_own_leads" ON leads FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_delete_own_leads" ON leads FOR DELETE
  TO authenticated USING (owner_id = auth.uid());

-- ============================================
-- ACTIVITIES - Fix insert/update to require ownership
-- ============================================

DROP POLICY IF EXISTS users_insert_activities ON activities;
DROP POLICY IF EXISTS users_update_own_activities ON activities;

CREATE POLICY "users_insert_own_activities" ON activities FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());

CREATE POLICY "users_update_own_activities" ON activities FOR UPDATE
  TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

-- ============================================
-- SUPPORT TICKETS - Fix policies
-- ============================================

DROP POLICY IF EXISTS users_read_own_tickets ON support_tickets;
DROP POLICY IF EXISTS users_insert_tickets ON support_tickets;
DROP POLICY IF EXISTS users_update_own_tickets ON support_tickets;

CREATE POLICY "users_read_own_tickets" ON support_tickets FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR auth.uid() = assigned_to OR user_id IS NULL);

CREATE POLICY "users_insert_own_tickets" ON support_tickets FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_update_own_tickets" ON support_tickets FOR UPDATE
  TO authenticated USING (user_id = auth.uid() OR auth.uid() = assigned_to)
  WITH CHECK (user_id = auth.uid() OR auth.uid() = assigned_to);

-- ============================================
-- NOTES - Fix insert policy
-- ============================================

DROP POLICY IF EXISTS users_insert_notes ON notes;

CREATE POLICY "users_insert_own_notes" ON notes FOR INSERT
  TO authenticated WITH CHECK (owner_id = auth.uid());