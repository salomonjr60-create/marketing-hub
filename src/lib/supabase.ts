import { createClient } from '@supabase/supabase-js';
import { sampleCampaigns, sampleCalendarEvents, sampleLeads, Campaign, CalendarEvent, Lead } from '@/data/marketingData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    !supabaseUrl.includes('your-supabase') && 
    !supabaseAnonKey.includes('your-supabase')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Map DB row to Campaign interface
export const mapDbCampaign = (row: any): Campaign => ({
  id: row.id || `camp-${Date.now()}`,
  name: row.name,
  channel: row.channel,
  description: row.description || '',
  budgetAED: Number(row.budget_aed) || 0,
  impressions: Number(row.impressions) || 0,
  clicks: Number(row.clicks) || 0,
  ctr: Number(row.ctr) || 0,
  cpcAED: Number(row.cpc_aed) || 0,
  leads: Number(row.leads) || 0,
  roas: Number(row.roas) || 0,
  revenueAED: Number(row.revenue_aed) || 0,
  status: row.status || 'Active',
  costPerLeadAED: Number(row.cost_per_lead_aed) || 0,
  targetAudience: row.target_audience || 'UAE Market',
  badgeColor: row.badge_color || '#FF6600',
});

// Map Campaign interface to DB row
export const mapCampaignToDb = (c: Partial<Campaign>) => ({
  name: c.name,
  channel: c.channel,
  description: c.description,
  budget_aed: c.budgetAED,
  impressions: c.impressions,
  clicks: c.clicks,
  ctr: c.ctr,
  cpc_aed: c.cpcAED,
  leads: c.leads,
  roas: c.roas,
  revenue_aed: c.revenueAED,
  status: c.status,
  cost_per_lead_aed: c.costPerLeadAED,
  target_audience: c.targetAudience,
  badge_color: c.badgeColor,
});

// Fetch campaigns from Supabase or fallback
export async function getCampaigns(): Promise<Campaign[]> {
  if (!supabase) return sampleCampaigns;
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch error or empty, using local defaults:', error?.message);
      return sampleCampaigns;
    }
    return data.map(mapDbCampaign);
  } catch (err) {
    console.error('Error fetching campaigns:', err);
    return sampleCampaigns;
  }
}

// Insert campaign into Supabase
export async function insertCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
  const dbData = mapCampaignToDb(campaign);
  if (!supabase) {
    // Local memory fallback
    return { ...campaign, id: `camp-${Date.now()}` };
  }

  const { data, error } = await supabase
    .from('campaigns')
    .insert([dbData])
    .select()
    .single();

  if (error) {
    console.error('Error inserting campaign to Supabase:', error);
    return { ...campaign, id: `camp-${Date.now()}` };
  }

  return mapDbCampaign(data);
}

// Save lead to Supabase
export async function insertLead(lead: Omit<Lead, 'id' | 'date'>): Promise<{ success: boolean; data?: any; error?: any }> {
  const dbLead = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    channel_source: lead.channelSource,
    budget_aed: lead.budgetAED,
    audit_requested: lead.auditRequested,
    score: lead.score,
    estimated_value_aed: lead.estimatedValueAED,
    status: lead.status,
  };

  if (!supabase) {
    console.info('Supabase not configured yet. Lead recorded in local session.');
    return { success: true, data: { ...dbLead, id: `lead-${Date.now()}` } };
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([dbLead])
      .select()
      .single();

    if (error) {
      console.error('Error saving lead to Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception saving lead:', err);
    return { success: false, error: err };
  }
}

// Fetch content posts from Supabase or fallback
export async function getContentPosts(): Promise<CalendarEvent[]> {
  if (!supabase) return sampleCalendarEvents;
  try {
    const { data, error } = await supabase
      .from('content_posts')
      .select('*')
      .order('date', { ascending: true });

    if (error || !data || data.length === 0) {
      return sampleCalendarEvents;
    }

    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      date: row.date,
      dayLabel: row.day_label || 'Scheduled',
      channel: row.channel,
      contentType: row.content_type,
      status: row.status,
      author: row.author || 'Growth Team',
      highlight: row.highlight || '',
    }));
  } catch (err) {
    console.error('Error fetching content posts:', err);
    return sampleCalendarEvents;
  }
}

// Insert content post into Supabase
export async function insertContentPost(post: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
  const dbPost = {
    title: post.title,
    date: post.date,
    day_label: post.dayLabel,
    channel: post.channel,
    content_type: post.contentType,
    status: post.status,
    author: post.author,
    highlight: post.highlight,
  };

  if (!supabase) {
    return { ...post, id: `ev-${Date.now()}` };
  }

  const { data, error } = await supabase
    .from('content_posts')
    .insert([dbPost])
    .select()
    .single();

  if (error) {
    console.error('Error saving content post:', error);
    return { ...post, id: `ev-${Date.now()}` };
  }

  return {
    id: data.id,
    title: data.title,
    date: data.date,
    dayLabel: data.day_label,
    channel: data.channel,
    contentType: data.content_type,
    status: data.status,
    author: data.author,
    highlight: data.highlight,
  };
}
