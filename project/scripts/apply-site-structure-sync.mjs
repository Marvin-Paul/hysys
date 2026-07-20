/**
 * Applies site structure sync to Supabase site_content via REST API.
 * Mirrors: supabase/migrations/20260710000004_sync_site_structure.sql
 *
 * Usage (from project/):
 *   node scripts/apply-site-structure-sync.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');

function loadEnv() {
  const raw = readFileSync(envPath, 'utf8');
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

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in project/.env');
  process.exit(1);
}

const supabase = createClient(url, key);

const REMOVED_SECTIONS = ['solutions', 'learning', 'pricing'];
const REMOVED_KEYS = [
  'solutions_list',
  'learning_items',
  'trails',
  'pricing_plans',
  'pricingTitle',
  'pricingDesc',
];

const UPSERTS = [
  { section: 'events', content_key: 'eventsTitle', content_value: 'Events & Experiences' },
  { section: 'events', content_key: 'eventsDesc', content_value: 'Participate in live summits, workshops, and partner forums designed to help your organisation grow with Marmidon.' },
  { section: 'events', content_key: 'events_section_title', content_value: 'Learn, network, and lead change' },
  { section: 'events', content_key: 'events_section_desc', content_value: 'Experience Marmidon events tailored for customers, partners, and IT teams who want to modernize faster.' },
  {
    section: 'events',
    content_key: 'events_list',
    content_value: [
      { id: 'summit', date: 'June 12, 2026', title: 'Marmidon Global Summit', description: 'Join customers, partners, and product leaders for innovation sessions, hands-on workshops, and networking.', highlight: 'Live keynotes + panel discussions' },
      { id: 'forum', date: 'September 4, 2026', title: 'Customer Success Forum', description: 'Explore customer stories, best practices, and success strategies for CRM and AI-powered operations.', highlight: 'Case study deep dives' },
      { id: 'workshop', date: 'November 18, 2026', title: 'Cloud Transformation Workshop', description: 'Practical sessions for IT teams planning secure cloud migrations and scalable platform rollouts.', highlight: 'Architecture and security workshops' },
    ],
  },
  {
    section: 'events',
    content_key: 'faqs',
    content_value: [
      { question: 'Who should attend?', answer: 'IT leaders, operations teams, customer success managers, and anyone evaluating digital transformation solutions.' },
      { question: 'How do I register?', answer: 'Click the registration button or contact our team to reserve your place and ask about group registration.' },
      { question: 'Can I attend remotely?', answer: 'Yes — most events include virtual sessions, live Q&A, and on-demand recordings.' },
      { question: 'What will I learn?', answer: 'You will learn how to use Marmidon to improve customer experience, automate workflows, and scale with confidence.' },
    ],
  },
  { section: 'events', content_key: 'cta_title', content_value: 'Reserve your seat' },
  { section: 'events', content_key: 'cta_desc', content_value: 'Spaces are limited for our flagship events. Contact our team to register early.' },
  { section: 'events', content_key: 'cta_button', content_value: 'Contact Events Team' },
  { section: 'contact', content_key: 'contactTitle', content_value: 'Support & Contact' },
  { section: 'contact', content_key: 'contactDesc', content_value: 'Find help, documentation, and direct access to our support team for every product and request.' },
  { section: 'contact', content_key: 'hero_title', content_value: 'Support & Contact' },
  { section: 'contact', content_key: 'hero_desc', content_value: 'Find help, documentation, and direct access to our support team for every product and request.' },
  { section: 'contact', content_key: 'getInTouch', content_value: 'Get in Touch' },
  { section: 'contact', content_key: 'sendUsMessage', content_value: 'Send Us a Message' },
  { section: 'contact', content_key: 'phone_numbers', content_value: '0782-602854\n0752-602857\n0757-602854\nMon–Fri 8am–6pm EAT' },
  { section: 'contact', content_key: 'email_address', content_value: 'info@Marmidonglobal.com' },
  { section: 'contact', content_key: 'office_address', content_value: "Plot 19 Sir Albert Cook Road, Mengo — Kampala\nP.O. Box 16435 K'la" },
  { section: 'contact', content_key: 'business_hours', content_value: 'Mon–Fri: 8:00 AM – 6:00 PM EAT\nSat: 9:00 AM – 1:00 PM EAT' },
  { section: 'documentation', content_key: 'hero_title', content_value: 'Product Documentation' },
  { section: 'documentation', content_key: 'hero_desc', content_value: 'Browse technical guides, setup instructions, and best practices for every Marmidon product.' },
  { section: 'documentation', content_key: 'cta_title', content_value: 'Need help finding something?' },
  { section: 'documentation', content_key: 'cta_desc', content_value: 'Our support team can provide detailed documentation and guided assistance.' },
  { section: 'documentation', content_key: 'cta_button', content_value: 'Contact Support' },
  { section: 'global', content_key: 'footer_tagline', content_value: 'Empowering businesses with intelligent CRM solutions.' },
  { section: 'global', content_key: 'support_email', content_value: 'support@Marmidonglobal.com' },
  { section: 'global', content_key: 'support_phone', content_value: '0782-602854' },
  { section: 'stories', content_key: 'featured_section_title', content_value: 'Trusted by industry leaders' },
  { section: 'stories', content_key: 'featured_section_desc', content_value: 'See how organisations like yours are achieving remarkable results with Marmidon.' },
  {
    section: 'stories',
    content_key: 'stories_stats',
    content_value: [
      { id: 'customers', value: '150K+', label: 'Customers worldwide', iconName: 'Users' },
      { id: 'productivity', value: '35%', label: 'Avg. productivity boost', iconName: 'TrendingUp' },
      { id: 'rating', value: '4.8★', label: 'Average customer rating', iconName: 'Star' },
      { id: 'retention', value: '99.9%', label: 'Customer retention rate', iconName: 'Shield' },
    ],
  },
  { section: 'contact', content_key: 'sidebar_title', content_value: 'Ready to transform your business?' },
  { section: 'contact', content_key: 'sidebar_desc', content_value: 'Fill in the form and our team will get back to you within 24 hours. Or reach us directly using the contacts below.' },
  { section: 'contact', content_key: 'trial_title', content_value: 'Free 14-Day Trial' },
  { section: 'contact', content_key: 'trial_desc', content_value: 'No credit card needed. Full platform access from day one.' },
  { section: 'contact', content_key: 'trial_button', content_value: 'Get Started' },
  { section: 'events', content_key: 'events_highlights_title', content_value: 'Why attend Marmidon events?' },
  { section: 'events', content_key: 'faq_section_title', content_value: 'Everything you need to know' },
  {
    section: 'events',
    content_key: 'events_highlights',
    content_value: [
      { id: 'roadmaps', text: 'Discover product roadmaps and feature plans directly from our team.' },
      { id: 'practices', text: 'Learn best practices for CRM, automation, and digital transformation.' },
      { id: 'network', text: 'Connect with peers, partners, and solution experts.' },
      { id: 'deploy', text: 'Get actionable guidance for secure deployments and scaling.' },
    ],
  },
  { section: 'events', content_key: 'cta_desc', content_value: 'Spaces are limited for our flagship events. Reserve early to ensure your team gets the best experience and dedicated time with our experts.' },
  { section: 'documentation', content_key: 'hero_badge', content_value: 'Documentation' },
  { section: 'documentation', content_key: 'hero_subtitle', content_value: 'Guides & tutorials' },
  { section: 'documentation', content_key: 'hero_cta', content_value: 'Contact Support' },
  { section: 'documentation', content_key: 'hero_cta_secondary', content_value: 'Start Free Trial' },
  { section: 'documentation', content_key: 'search_placeholder', content_value: 'Search documentation...' },
  {
    section: 'documentation',
    content_key: 'doc_categories',
    content_value: [
      { id: 'getting-started', title: 'Getting Started', description: 'Quick-start guides, account setup, and first steps with Marmidon CRM.', iconName: 'Sparkles', articles: 'Platform overview, Creating your first account, Importing contacts, Setting up your pipeline' },
      { id: 'products', title: 'Products', description: 'Documentation for Sales Cloud, Service Cloud, Marketing Cloud, and more.', iconName: 'FileText', articles: 'Sales Cloud user guide, Service Cloud case management, Marketing Cloud campaigns, Data Cloud setup' },
      { id: 'administration', title: 'Administration', description: 'User management, security settings, and platform configuration.', iconName: 'BookOpen', articles: 'User roles and permissions, Security best practices, Custom fields and objects, Integration setup' },
      { id: 'video-tutorials', title: 'Video Tutorials', description: 'Step-by-step video walkthroughs for common tasks and workflows.', iconName: 'Video', articles: 'Dashboard walkthrough, Building automations, Creating reports, Mobile app setup' },
    ],
  },
  { section: 'products', content_key: 'cta_title', content_value: 'Ready to get started?' },
  { section: 'products', content_key: 'cta_desc', content_value: 'Try any Marmidon product free for 14 days. No credit card required.' },
  { section: 'products', content_key: 'cta_button', content_value: 'Start Free Trial' },
  { section: 'industries', content_key: 'cta_title', content_value: "Don't see your industry?" },
  { section: 'industries', content_key: 'cta_desc', content_value: 'Marmidon adapts to any sector. Talk to our team for a custom solution.' },
  { section: 'industries', content_key: 'cta_button', content_value: 'Contact Sales' },
];

async function main() {
  console.log('Syncing Supabase site_content…');

  for (const section of REMOVED_SECTIONS) {
    const { error, count } = await supabase
      .from('site_content')
      .delete({ count: 'exact' })
      .eq('section', section);
    if (error) {
      console.error(`Failed to delete section "${section}":`, error.message);
      process.exit(1);
    }
    console.log(`  Deleted section "${section}": ${count ?? 0} row(s)`);
  }

  for (const content_key of REMOVED_KEYS) {
    const { error, count } = await supabase
      .from('site_content')
      .delete({ count: 'exact' })
      .eq('content_key', content_key);
    if (error) {
      console.error(`Failed to delete key "${content_key}":`, error.message);
      process.exit(1);
    }
    if (count) console.log(`  Deleted key "${content_key}": ${count} row(s)`);
  }

  const { data: pricingTitleRows } = await supabase
    .from('site_content')
    .select('id')
    .eq('section', 'events')
    .eq('content_key', 'pricingTitle');
  if (pricingTitleRows?.length) {
    await supabase.from('site_content').update({ content_key: 'eventsTitle' }).eq('section', 'events').eq('content_key', 'pricingTitle');
    console.log('  Renamed events.pricingTitle → eventsTitle');
  }

  const { data: pricingDescRows } = await supabase
    .from('site_content')
    .select('id')
    .eq('section', 'events')
    .eq('content_key', 'pricingDesc');
  if (pricingDescRows?.length) {
    await supabase.from('site_content').update({ content_key: 'eventsDesc' }).eq('section', 'events').eq('content_key', 'pricingDesc');
    console.log('  Renamed events.pricingDesc → eventsDesc');
  }

  for (const row of UPSERTS) {
    const { error } = await supabase.from('site_content').upsert(
      { section: row.section, content_key: row.content_key, content_value: row.content_value },
      { onConflict: 'section,content_key' }
    );
    if (error) {
      console.error(`Failed to upsert ${row.section}.${row.content_key}:`, error.message);
      process.exit(1);
    }
    console.log(`  Upserted ${row.section}.${row.content_key}`);
  }

  console.log('Done. Site content matches current app structure.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

