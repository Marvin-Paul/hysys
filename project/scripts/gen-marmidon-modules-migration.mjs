import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { productCardsForCms, productsListForCms } from './marmidon-cms-defaults.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cards = JSON.stringify(productCardsForCms());
const list = JSON.stringify(productsListForCms());

const sql = [
  '-- Replace legacy Salesforce-style product cards and products list with all 11 Marmidon ERP modules',
  '',
  'UPDATE public.site_content',
  `SET content_value = '${cards.replace(/'/g, "''")}'::jsonb`,
  "WHERE section = 'homepage' AND content_key = 'product_cards';",
  '',
  'UPDATE public.site_content',
  `SET content_value = '${list.replace(/'/g, "''")}'::jsonb`,
  "WHERE section = 'products' AND content_key = 'products_list';",
  '',
].join('\n');

writeFileSync(resolve(__dirname, '../supabase/migrations/20260713000007_fix_marmidon_module_cards.sql'), sql);
console.log('Wrote 20260713000007_fix_marmidon_module_cards.sql');
