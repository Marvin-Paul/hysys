/**
 * Force-overwrites Marmidon ERP CMS keys (ignores existing values).
 * Use when Supabase still has legacy CRM/Marmidon copy from before the ERP migration.
 *
 * Usage (from project/):
 *   node scripts/force-marmidon-cms-overrides.mjs
 *   node scripts/force-marmidon-cms-overrides.mjs --dry-run
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import {
  MARMIDON_HOMEPAGE_OVERRIDES,
  MARMIDON_NAV_OVERRIDES,
  MARMIDON_PRODUCTS_OVERRIDES,
  MARMIDON_GLOBAL_OVERRIDES,
  MARMIDON_PLATFORM_ARCH_LISTS,
  MARMIDON_NAV_LINKS,
  MARMIDON_ABOUT_OVERRIDES,
  MARMIDON_STORIES_OVERRIDES,
  navProductsForCms,
  productCardsForCms,
  productsListForCms,
  homepageSectorsForCms,
} from './marmidon-cms-defaults.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dryRun = process.argv.includes('--dry-run');

function loadEnv() {
  const raw = readFileSync(resolve(__dirname, '../.env'), 'utf8');
  const env = {};
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i === -1) continue;
    env[trimmed.slice(0, i).trim()] = trimmed.slice(i + 1).trim();
  }
  return env;
}

const FORCE_UPDATES = {
  homepage: {
    ...MARMIDON_HOMEPAGE_OVERRIDES,
    ...MARMIDON_PLATFORM_ARCH_LISTS,
    demo_bullets: [
      { id: 'finance', text: 'Finance, inventory, and sales on one platform' },
      { id: 'modules', text: 'Eleven integrated ERP modules' },
      { id: 'sectors', text: 'Sector-fit workflows for your industry' },
      { id: 'bi', text: 'Real-time dashboards and reporting' },
    ],
    product_cards: productCardsForCms(),
    homepage_industries_list: homepageSectorsForCms(),
  },
  navigation: {
    ...MARMIDON_NAV_OVERRIDES,
    nav_products: navProductsForCms(),
    nav_links: MARMIDON_NAV_LINKS,
    nav_signup_label: 'Request a Demo',
    nav_search_placeholder: 'Search modules, solutions…',
  },
  products: {
    ...MARMIDON_PRODUCTS_OVERRIDES,
    products_list: productsListForCms(),
    products_grid_title: 'Eleven modules. One ERP platform.',
  },
  global: { ...MARMIDON_GLOBAL_OVERRIDES },
  about: { ...MARMIDON_ABOUT_OVERRIDES },
  stories: { ...MARMIDON_STORIES_OVERRIDES },
};

async function main() {
  const env = loadEnv();
  const url = env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, key);
  console.log(dryRun ? 'Dry run — Marmidon CMS force overrides:' : 'Force-updating Marmidon CMS overrides…');

  let count = 0;
  for (const [section, keys] of Object.entries(FORCE_UPDATES)) {
    for (const [content_key, content_value] of Object.entries(keys)) {
      if (dryRun) {
        console.log(`  would update ${section}.${content_key}`);
        count++;
        continue;
      }
      const { error } = await supabase.from('site_content').upsert(
        { section, content_key, content_value },
        { onConflict: 'section,content_key' }
      );
      if (error) {
        console.error(`  failed ${section}.${content_key}:`, error.message);
        process.exit(1);
      }
      console.log(`  updated ${section}.${content_key}`);
      count++;
    }
  }

  console.log(dryRun ? `Would update ${count} keys.` : `Done. Updated ${count} keys.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

