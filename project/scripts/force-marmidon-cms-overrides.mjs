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
    hero_desc: 'Discover the full Marmidon ecosystem — from ERP fundamentals to AI-powered analytics.',
    cta_desc: 'Get started with Marmidon today and see why thousands of companies trust our platform.',
  },
  global: { ...MARMIDON_GLOBAL_OVERRIDES },
  events: {
    eventsDesc: 'Participate in live summits, workshops, and partner forums designed to help your organisation grow with Marmidon.',
    events_section_title: 'Learn, network, and lead change',
    events_section_desc: 'Experience Marmidon events tailored for customers, partners, and IT teams who want to modernize faster.',
    events_highlights_title: 'Why attend Marmidon events?',
    events_list: [
      { id: 'summit', date: 'June 12, 2026', title: 'Marmidon Global Summit', description: 'Join customers, partners, and product leaders for innovation sessions, hands-on workshops, and networking.', highlight: 'Live keynotes + panel discussions' },
      { id: 'forum', date: 'September 4, 2026', title: 'Customer Success Forum', description: 'Explore customer stories, best practices, and success strategies for ERP and AI-powered operations.', highlight: 'Case study deep dives' },
      { id: 'workshop', date: 'November 18, 2026', title: 'Cloud Transformation Workshop', description: 'Practical sessions for IT teams planning secure cloud migrations and scalable platform rollouts.', highlight: 'Architecture and security workshops' },
    ],
    faqs: [
      { question: 'Who should attend?', answer: 'IT leaders, operations teams, customer success managers, and anyone evaluating digital transformation solutions.' },
      { question: 'How do I register?', answer: 'Click the registration button or contact our team to reserve your place and ask about group registration.' },
      { question: 'Can I attend remotely?', answer: 'Yes — most events include virtual sessions, live Q&A, and on-demand recordings.' },
      { question: 'What will I learn?', answer: 'You will learn how to use Marmidon to improve customer experience, automate workflows, and scale with confidence.' },
    ],
  },
  documentation: {
    hero_desc: 'Browse technical guides, setup instructions, and best practices for every Marmidon product.',
    doc_categories: [
      { id: 'getting-started', title: 'Getting Started', description: 'Quick-start guides, account setup, and first steps with Marmidon ERP.', iconName: 'Sparkles', articles: 'Platform overview, Creating your first account, Importing contacts, Setting up your pipeline' },
      { id: 'products', title: 'Products', description: 'Documentation for Sales Cloud, Service Cloud, Marketing Cloud, and more.', iconName: 'FileText', articles: 'Sales Cloud user guide, Service Cloud case management, Marketing Cloud campaigns, Data Cloud setup' },
      { id: 'administration', title: 'Administration', description: 'User management, security settings, and platform configuration.', iconName: 'BookOpen', articles: 'User roles and permissions, Security best practices, Custom fields and objects, Integration setup' },
      { id: 'video-tutorials', title: 'Video Tutorials', description: 'Step-by-step video walkthroughs for common tasks and workflows.', iconName: 'Video', articles: 'Dashboard walkthrough, Building automations, Creating reports, Mobile app setup' },
    ],
  },
  about: {
    ...MARMIDON_ABOUT_OVERRIDES,
    hero_title: 'About Marmidon Global Solutions',
    stats_badge: 'Companies trust Marmidon Global Solutions Limited',
  },
  stories: {
    ...MARMIDON_STORIES_OVERRIDES,
    customerStoriesDesc: 'See how organizations worldwide transform with Marmidon.',
    shareYourStoryDesc: 'Join thousands of companies achieving remarkable results with Marmidon.',
    featured_section_desc: 'See how organisations like yours are achieving remarkable results with Marmidon.',
  },
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

