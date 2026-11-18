-- ==============================================================================
-- MARKETING-HUB: Supabase Database Schema
-- 3 Tables: campaigns, leads, content_posts
-- Includes Row Level Security (RLS) & Seed Data for 6 core UAE campaigns
-- ==============================================================================

-- 1. CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  channel TEXT NOT NULL,
  description TEXT,
  budget_aed NUMERIC(12, 2) NOT NULL DEFAULT 0,
  impressions BIGINT NOT NULL DEFAULT 0,
  clicks BIGINT NOT NULL DEFAULT 0,
  ctr NUMERIC(5, 2) NOT NULL DEFAULT 0,
  cpc_aed NUMERIC(10, 2) NOT NULL DEFAULT 0,
  leads INTEGER NOT NULL DEFAULT 0,
  roas NUMERIC(5, 2) NOT NULL DEFAULT 0,
  revenue_aed NUMERIC(12, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Active',
  cost_per_lead_aed NUMERIC(10, 2) NOT NULL DEFAULT 0,
  target_audience TEXT,
  badge_color TEXT DEFAULT '#FF6600',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  channel_source TEXT DEFAULT 'Audit Form',
  budget_aed TEXT,
  audit_requested BOOLEAN DEFAULT true,
  score INTEGER DEFAULT 85,
  estimated_value_aed NUMERIC(12, 2) DEFAULT 25000,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. CONTENT POSTS TABLE
CREATE TABLE IF NOT EXISTS content_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  day_label TEXT,
  channel TEXT NOT NULL,
  content_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Scheduled',
  author TEXT DEFAULT 'Growth Team',
  highlight TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_posts ENABLE ROW LEVEL SECURITY;

-- LEADS POLICIES:
-- 1. Anyone (public anonymous or authenticated) can submit/insert a lead
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
CREATE POLICY "Anyone can insert leads" 
  ON leads 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- 2. ONLY signed-in (authenticated) users can read/view leads
DROP POLICY IF EXISTS "Only authenticated users can view leads" ON leads;
CREATE POLICY "Only authenticated users can view leads" 
  ON leads 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- CAMPAIGNS POLICIES:
-- Public can read campaigns
DROP POLICY IF EXISTS "Public can view campaigns" ON campaigns;
CREATE POLICY "Public can view campaigns" 
  ON campaigns 
  FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Anyone can add campaigns (or configure to authenticated only)
DROP POLICY IF EXISTS "Anyone can add campaigns" ON campaigns;
CREATE POLICY "Anyone can add campaigns" 
  ON campaigns 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- CONTENT POSTS POLICIES:
-- Public can read content posts
DROP POLICY IF EXISTS "Public can view content posts" ON content_posts;
CREATE POLICY "Public can view content posts" 
  ON content_posts 
  FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Anyone can insert content posts
DROP POLICY IF EXISTS "Anyone can add content posts" ON content_posts;
CREATE POLICY "Anyone can add content posts" 
  ON content_posts 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA (6 UAE Marketing Campaigns & Initial Content Drops)
-- ==============================================================================

INSERT INTO campaigns (name, channel, description, budget_aed, impressions, clicks, ctr, cpc_aed, leads, roas, revenue_aed, status, cost_per_lead_aed, target_audience, badge_color)
VALUES
(
  'Meta Performance Max & Retargeting',
  'Meta Ads',
  'High-converting video carousel and dynamic catalog ads targeting UAE homeowners and professionals.',
  18500, 425000, 11900, 2.80, 1.55, 340, 4.20, 77700, 'Active', 54.41,
  'Dubai & Abu Dhabi 25-54, High Intent',
  '#0084FF'
),
(
  'Google High-Intent Search & PMax',
  'Google Ads',
  'Exact match commercial keywords and smart shopping across UAE Google Search & Maps network.',
  24000, 210000, 9240, 4.40, 2.60, 410, 4.80, 115200, 'Scaling', 58.54,
  'Active UAE Searchers for premium services',
  '#EA4335'
),
(
  'Organic Search Authority & UAE Local SEO',
  'SEO',
  'Technical optimization, GCC Arabic/English content hub, and high-tier regional backlink building.',
  9500, 680000, 23800, 3.50, 0.40, 520, 6.50, 61750, 'Active', 18.27,
  'GCC Organic Searchers, Top 3 SERP',
  '#10B981'
),
(
  'Retention, Onboarding & VIP VIP Flows',
  'Email',
  'Automated 7-step nurture sequences, flash sales, and segmented re-engagement campaigns.',
  4200, 95000, 7600, 8.00, 0.55, 280, 8.20, 34440, 'Active', 15.00,
  'Existing Subscriber List (45K active contacts)',
  '#8B5CF6'
),
(
  'Instagram Reels & Influencer Collabs',
  'Instagram',
  'Lifestyle Reels, creator spark ads, and visual story polls with direct DM automation lead magnets.',
  12000, 360000, 8640, 2.40, 1.39, 215, 3.30, 39600, 'Optimizing', 55.81,
  'UAE Expats & Locals 21-40, Lifestyle & Tech',
  '#E1306C'
),
(
  'LinkedIn Enterprise B2B Lead Gen',
  'LinkedIn',
  'Sponsored InMail and Thought Leadership spotlight targeting UAE C-Suite executives and Founders.',
  16800, 140000, 2520, 1.80, 6.67, 185, 5.50, 92400, 'Scaling', 90.81,
  'CEOs, CMOs & Directors at UAE Companies (50+ staff)',
  '#0A66C2'
)
ON CONFLICT DO NOTHING;

-- Initial Content Calendar items
INSERT INTO content_posts (title, date, day_label, channel, content_type, status, author, highlight)
VALUES
(
  'UAE National Day Early Bird Campaign Launch',
  '2026-11-20', 'Friday', 'Meta Ads', 'Carousel Ad', 'Scheduled', 'Performance Team',
  'Budget bump to 5K AED/day across Dubai & Abu Dhabi'
),
(
  'Black Friday & Cyber Week PMax Keyword Refresh',
  '2026-11-21', 'Saturday', 'Google Ads', 'Search Copy', 'Scheduled', 'SEM Specialist',
  'Added 45 negative search terms & updated site links'
),
(
  'GCC Luxury Consumer Trends 2027 Whitepaper',
  '2026-11-23', 'Monday', 'LinkedIn', 'Executive Post', 'In Review', 'Content Lead',
  'Targeting 2,500 UAE C-Suite leaders with gated PDF download'
),
(
  'Behind the Scenes Dubai Studio Reel',
  '2026-11-24', 'Tuesday', 'Instagram', 'Reels / Video', 'Scheduled', 'Social Media Manager',
  'Includes interactive sticker & direct DM promo code'
),
(
  'UAE Corporate Tax 2027 Marketing Deduction Guide',
  '2026-11-25', 'Wednesday', 'SEO', 'Blog Article', 'Draft', 'SEO Copywriter',
  '3,200 words bilingual EN/AR aiming for #1 SERP ranking'
),
(
  'VIP Weekend Private Access VIP Broadcast',
  '2026-11-27', 'Friday', 'Email', 'Newsletter', 'Scheduled', 'Retention Strategist',
  'Expected 42% open rate based on last VIP blast'
)
ON CONFLICT DO NOTHING;
