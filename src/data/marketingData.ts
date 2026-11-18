export interface Campaign {
  id: string;
  name: string;
  channel: 'Meta Ads' | 'Google Ads' | 'SEO' | 'Email' | 'Instagram' | 'LinkedIn';
  description: string;
  budgetAED: number;
  impressions: number;
  clicks: number;
  ctr: number; // percentage
  cpcAED: number;
  leads: number;
  roas: number; // multiplier e.g. 4.2x
  revenueAED: number;
  status: 'Active' | 'Scaling' | 'Optimizing' | 'Paused';
  costPerLeadAED: number;
  targetAudience: string;
  badgeColor: string;
}

export const sampleCampaigns: Campaign[] = [
  {
    id: 'camp-meta',
    name: 'Meta Performance Max & Retargeting',
    channel: 'Meta Ads',
    description: 'High-converting video carousel and dynamic catalog ads targeting UAE homeowners and professionals.',
    budgetAED: 18500,
    impressions: 425000,
    clicks: 11900,
    ctr: 2.80,
    cpcAED: 1.55,
    leads: 340,
    roas: 4.2,
    revenueAED: 77700,
    status: 'Active',
    costPerLeadAED: 54.41,
    targetAudience: 'Dubai & Abu Dhabi 25-54, High Intent',
    badgeColor: '#0084FF',
  },
  {
    id: 'camp-google',
    name: 'Google High-Intent Search & PMax',
    channel: 'Google Ads',
    description: 'Exact match commercial keywords and smart shopping across UAE Google Search & Maps network.',
    budgetAED: 24000,
    impressions: 210000,
    clicks: 9240,
    ctr: 4.40,
    cpcAED: 2.60,
    leads: 410,
    roas: 4.8,
    revenueAED: 115200,
    status: 'Scaling',
    costPerLeadAED: 58.54,
    targetAudience: 'Active UAE Searchers for premium services',
    badgeColor: '#EA4335',
  },
  {
    id: 'camp-seo',
    name: 'Organic Search Authority & UAE Local SEO',
    channel: 'SEO',
    description: 'Technical optimization, GCC Arabic/English content hub, and high-tier regional backlink building.',
    budgetAED: 9500,
    impressions: 680000,
    clicks: 23800,
    ctr: 3.50,
    cpcAED: 0.40,
    leads: 520,
    roas: 6.5,
    revenueAED: 61750,
    status: 'Active',
    costPerLeadAED: 18.27,
    targetAudience: 'GCC Organic Searchers, Top 3 SERP',
    badgeColor: '#10B981',
  },
  {
    id: 'camp-email',
    name: 'Retention, Onboarding & VIP VIP Flows',
    channel: 'Email',
    description: 'Automated 7-step nurture sequences, flash sales, and segmented re-engagement campaigns.',
    budgetAED: 4200,
    impressions: 95000,
    clicks: 7600,
    ctr: 8.00,
    cpcAED: 0.55,
    leads: 280,
    roas: 8.2,
    revenueAED: 34440,
    status: 'Active',
    costPerLeadAED: 15.00,
    targetAudience: 'Existing Subscriber List (45K active contacts)',
    badgeColor: '#8B5CF6',
  },
  {
    id: 'camp-insta',
    name: 'Instagram Reels & Influencer Collabs',
    channel: 'Instagram',
    description: 'Lifestyle Reels, creator spark ads, and visual story polls with direct DM automation lead magnets.',
    budgetAED: 12000,
    impressions: 360000,
    clicks: 8640,
    ctr: 2.40,
    cpcAED: 1.39,
    leads: 215,
    roas: 3.3,
    revenueAED: 39600,
    status: 'Optimizing',
    costPerLeadAED: 55.81,
    targetAudience: 'UAE Expats & Locals 21-40, Lifestyle & Tech',
    badgeColor: '#E1306C',
  },
  {
    id: 'camp-linkedin',
    name: 'LinkedIn Enterprise B2B Lead Gen',
    channel: 'LinkedIn',
    description: 'Sponsored InMail and Thought Leadership spotlight targeting UAE C-Suite executives and Founders.',
    budgetAED: 16800,
    impressions: 140000,
    clicks: 2520,
    ctr: 1.80,
    cpcAED: 6.67,
    leads: 185,
    roas: 5.5,
    revenueAED: 92400,
    status: 'Scaling',
    costPerLeadAED: 90.81,
    targetAudience: 'CEOs, CMOs & Directors at UAE Companies (50+ staff)',
    badgeColor: '#0A66C2',
  },
];

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  channelSource: 'Meta Ads' | 'Google Ads' | 'SEO' | 'Email' | 'Instagram' | 'LinkedIn' | 'Audit Form';
  budgetAED: string;
  auditRequested: boolean;
  score: number; // 1-100
  estimatedValueAED: number;
  status: 'New' | 'Audit Sent' | 'Call Scheduled' | 'Converted' | 'Nurturing';
  date: string;
}

export const sampleLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rashid Al-Nuaimi',
    email: 'rashid@alnuaimi-group.ae',
    phone: '+971 50 839 2104',
    company: 'Al Nuaimi Properties',
    channelSource: 'Google Ads',
    budgetAED: '50,000 - 100,000 AED',
    auditRequested: true,
    score: 95,
    estimatedValueAED: 45000,
    status: 'Call Scheduled',
    date: 'Today at 02:45 PM',
  },
  {
    id: 'lead-2',
    name: 'Elena Rostova',
    email: 'elena@luxehorology.com',
    phone: '+971 52 411 9832',
    company: 'Luxe Horology Middle East',
    channelSource: 'Instagram',
    budgetAED: '30,000 - 50,000 AED',
    auditRequested: true,
    score: 88,
    estimatedValueAED: 28000,
    status: 'Audit Sent',
    date: 'Today at 11:20 AM',
  },
  {
    id: 'lead-3',
    name: 'Tariq Mansoor',
    email: 'tariq@gulfcloudtech.io',
    phone: '+971 55 901 7721',
    company: 'Gulf Cloud Technologies',
    channelSource: 'LinkedIn',
    budgetAED: '100,000+ AED',
    auditRequested: true,
    score: 98,
    estimatedValueAED: 72000,
    status: 'Converted',
    date: 'Yesterday',
  },
  {
    id: 'lead-4',
    name: 'Fatima Al-Sayed',
    email: 'fatima@nourishdxb.ae',
    phone: '+971 58 654 3210',
    company: 'Nourish Meal Prep DXB',
    channelSource: 'Meta Ads',
    budgetAED: '10,000 - 30,000 AED',
    auditRequested: false,
    score: 82,
    estimatedValueAED: 18000,
    status: 'New',
    date: 'Yesterday',
  },
  {
    id: 'lead-5',
    name: 'David Sterling',
    email: 'd.sterling@dubaimarinalaw.com',
    phone: '+971 54 220 8911',
    company: 'Marina Legal Consultants',
    channelSource: 'SEO',
    budgetAED: '30,000 - 50,000 AED',
    auditRequested: true,
    score: 91,
    estimatedValueAED: 35000,
    status: 'Audit Sent',
    date: 'Nov 16, 2026',
  },
  {
    id: 'lead-6',
    name: 'Noor Al-Hassan',
    email: 'noor@pearlfashion.ae',
    phone: '+971 50 119 4433',
    company: 'Pearl Haute Couture',
    channelSource: 'Email',
    budgetAED: '10,000 - 30,000 AED',
    auditRequested: false,
    score: 79,
    estimatedValueAED: 15000,
    status: 'Nurturing',
    date: 'Nov 15, 2026',
  },
  {
    id: 'lead-7',
    name: 'Zayed Khalfan',
    email: 'zayed@dubaiautocraft.ae',
    phone: '+971 56 778 9901',
    company: 'Autocraft Exotic Motors',
    channelSource: 'Google Ads',
    budgetAED: '50,000 - 100,000 AED',
    auditRequested: true,
    score: 94,
    estimatedValueAED: 52000,
    status: 'Call Scheduled',
    date: 'Nov 14, 2026',
  },
  {
    id: 'lead-8',
    name: 'Sarah Jenkins',
    email: 'sarah@desertwellness.com',
    phone: '+971 55 334 1122',
    company: 'Desert Oasis Wellness Retreat',
    channelSource: 'Meta Ads',
    budgetAED: '30,000 - 50,000 AED',
    auditRequested: true,
    score: 86,
    estimatedValueAED: 24000,
    status: 'Converted',
    date: 'Nov 13, 2026',
  },
];

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  dayLabel: string;
  channel: 'Meta Ads' | 'Google Ads' | 'SEO' | 'Email' | 'Instagram' | 'LinkedIn';
  contentType: 'Reels / Video' | 'Newsletter' | 'Search Copy' | 'Blog Article' | 'Carousel Ad' | 'Executive Post';
  status: 'Scheduled' | 'Published' | 'In Review' | 'Draft';
  author: string;
  highlight: string;
}

export const sampleCalendarEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'UAE National Day Early Bird Campaign Launch',
    date: '2026-11-20',
    dayLabel: 'Friday',
    channel: 'Meta Ads',
    contentType: 'Carousel Ad',
    status: 'Scheduled',
    author: 'Performance Team',
    highlight: 'Budget bump to 5K AED/day across Dubai & Abu Dhabi',
  },
  {
    id: 'ev-2',
    title: 'Black Friday & Cyber Week PMax Keyword Refresh',
    date: '2026-11-21',
    dayLabel: 'Saturday',
    channel: 'Google Ads',
    contentType: 'Search Copy',
    status: 'Scheduled',
    author: 'SEM Specialist',
    highlight: 'Added 45 negative search terms & updated site links',
  },
  {
    id: 'ev-3',
    title: 'GCC Luxury Consumer Trends 2027 Whitepaper',
    date: '2026-11-23',
    dayLabel: 'Monday',
    channel: 'LinkedIn',
    contentType: 'Executive Post',
    status: 'In Review',
    author: 'Content Lead',
    highlight: 'Targeting 2,500 UAE C-Suite leaders with gated PDF download',
  },
  {
    id: 'ev-4',
    title: 'Behind the Scenes Dubai Studio Reel',
    date: '2026-11-24',
    dayLabel: 'Tuesday',
    channel: 'Instagram',
    contentType: 'Reels / Video',
    status: 'Scheduled',
    author: 'Social Media Manager',
    highlight: 'Includes interactive sticker & direct DM promo code',
  },
  {
    id: 'ev-5',
    title: 'UAE Corporate Tax 2027 Marketing Deduction Guide',
    date: '2026-11-25',
    dayLabel: 'Wednesday',
    channel: 'SEO',
    contentType: 'Blog Article',
    status: 'Draft',
    author: 'SEO Copywriter',
    highlight: '3,200 words bilingual EN/AR aiming for #1 SERP ranking',
  },
  {
    id: 'ev-6',
    title: 'VIP Weekend Private Access VIP Broadcast',
    date: '2026-11-27',
    dayLabel: 'Friday',
    channel: 'Email',
    contentType: 'Newsletter',
    status: 'Scheduled',
    author: 'Retention Strategist',
    highlight: 'Expected 42% open rate based on last VIP blast',
  },
];

export const totals = {
  budgetAED: sampleCampaigns.reduce((acc, c) => acc + c.budgetAED, 0),
  impressions: sampleCampaigns.reduce((acc, c) => acc + c.impressions, 0),
  clicks: sampleCampaigns.reduce((acc, c) => acc + c.clicks, 0),
  leads: sampleCampaigns.reduce((acc, c) => acc + c.leads, 0),
  revenueAED: sampleCampaigns.reduce((acc, c) => acc + c.revenueAED, 0),
  get blendedROAS() {
    return (this.revenueAED / this.budgetAED).toFixed(2);
  },
  get blendedCTR() {
    return ((this.clicks / this.impressions) * 100).toFixed(2);
  },
  get blendedCPC() {
    return (this.budgetAED / this.clicks).toFixed(2);
  },
  get blendedCPL() {
    return (this.budgetAED / this.leads).toFixed(2);
  },
};
