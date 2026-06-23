-- Enable RLS on new tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_book_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, authenticated write)
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "users_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "users_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "users_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

-- Price Books policies
CREATE POLICY "public_read_price_books" ON price_books FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "users_insert_price_books" ON price_books FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "users_update_price_books" ON price_books FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "users_delete_price_books" ON price_books FOR DELETE
  TO authenticated USING (true);

-- Price Book Entries policies
CREATE POLICY "public_read_price_book_entries" ON price_book_entries FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "users_insert_price_book_entries" ON price_book_entries FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "users_update_price_book_entries" ON price_book_entries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "users_delete_price_book_entries" ON price_book_entries FOR DELETE
  TO authenticated USING (true);

-- Opportunity Line Items policies
CREATE POLICY "public_read_opportunity_line_items" ON opportunity_line_items FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "users_insert_opportunity_line_items" ON opportunity_line_items FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "users_update_opportunity_line_items" ON opportunity_line_items FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "users_delete_opportunity_line_items" ON opportunity_line_items FOR DELETE
  TO authenticated USING (true);

-- Campaigns policies
CREATE POLICY "public_read_campaigns" ON campaigns FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "users_insert_campaigns" ON campaigns FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_update_campaigns" ON campaigns FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL) WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_delete_campaigns" ON campaigns FOR DELETE
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL);

-- Leads policies
CREATE POLICY "public_read_leads" ON leads FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "users_insert_leads" ON leads FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_update_leads" ON leads FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL) WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_delete_leads" ON leads FOR DELETE
  TO authenticated USING (auth.uid() = owner_id OR owner_id IS NULL);

-- Notes policies
CREATE POLICY "public_read_notes" ON notes FOR SELECT
  TO authenticated USING (is_private = false OR auth.uid() = owner_id);

CREATE POLICY "users_insert_notes" ON notes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "users_update_notes" ON notes FOR UPDATE
  TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "users_delete_notes" ON notes FOR DELETE
  TO authenticated USING (auth.uid() = owner_id);