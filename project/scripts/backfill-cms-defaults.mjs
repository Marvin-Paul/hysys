/**
 * Backfills empty site_content fields with Marmidon ERP defaults.
 *
 * Usage (from project/):
 *   node scripts/backfill-cms-defaults.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { buildMarmidonTextDefaults } from './marmidon-cms-defaults.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

const TEXT_DEFAULTS = buildMarmidonTextDefaults();

function isEmpty(value) {
  if (value == null) return true;
  if (typeof value === 'string') return !value.trim();
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

async function main() {
  const env = loadEnv();
  const url = env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, key);
  console.log('Backfilling empty CMS fields with Marmidon ERP defaults…');

  for (const [section, defaults] of Object.entries(TEXT_DEFAULTS)) {
    for (const [content_key, content_value] of Object.entries(defaults)) {
      const { data: existing } = await supabase
        .from('site_content')
        .select('content_value')
        .eq('section', section)
        .eq('content_key', content_key)
        .maybeSingle();

      if (existing && !isEmpty(existing.content_value)) {
        console.log(`  skip ${section}.${content_key} (already set)`);
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
      console.log(`  filled ${section}.${content_key}`);
    }
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

