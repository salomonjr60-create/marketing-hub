'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Megaphone, 
  Search, 
  Filter, 
  Grid, 
  List, 
  TrendingUp, 
  DollarSign, 
  MousePointer, 
  Eye, 
  Sparkles, 
  ArrowUpRight, 
  SlidersHorizontal,
  X,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { sampleCampaigns, totals, Campaign } from '@/data/marketingData';
import { getCampaigns, insertCampaign, isSupabaseConfigured } from '@/lib/supabase';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New Campaign Form State
  const [newCamp, setNewCamp] = useState({
    name: '',
    channel: 'Meta Ads' as Campaign['channel'],
    description: '',
    budgetAED: 15000,
    targetAudience: 'UAE Residents & GCC Travelers, 25-50',
    status: 'Active' as Campaign['status'],
    roas: 4.5,
  });

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCampaigns();
        if (data && data.length > 0) {
          setCampaigns(data);
        }
      } catch (err) {
        console.error('Failed to load campaigns:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getChannelColor = (ch: string) => {
    switch (ch) {
      case 'Meta Ads': return '#0084FF';
      case 'Google Ads': return '#EA4335';
      case 'SEO': return '#10B981';
      case 'Email': return '#8B5CF6';
      case 'Instagram': return '#E1306C';
      case 'LinkedIn': return '#0A66C2';
      default: return '#FF6600';
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamp.name) return;
    setSubmitting(true);

    const budget = Number(newCamp.budgetAED) || 10000;
    const roas = Number(newCamp.roas) || 4.0;
    const color = getChannelColor(newCamp.channel);

    // Derived realistic marketing metrics
    let cpc = 1.5;
    let ctr = 3.2;
    if (newCamp.channel === 'Google Ads') { cpc = 2.6; ctr = 4.4; }
    else if (newCamp.channel === 'SEO') { cpc = 0.4; ctr = 3.5; }
    else if (newCamp.channel === 'LinkedIn') { cpc = 6.5; ctr = 1.8; }
    else if (newCamp.channel === 'Email') { cpc = 0.55; ctr = 8.0; }

    const clicks = Math.round(budget / cpc);
    const impressions = Math.round((clicks / (ctr / 100)));
    const leads = Math.round(clicks * 0.035); // 3.5% conversion rate
    const revenueAED = Math.round(budget * roas);
    const costPerLeadAED = Number((budget / (leads || 1)).toFixed(2));

    const campaignPayload: Omit<Campaign, 'id'> = {
      name: newCamp.name,
      channel: newCamp.channel,
      description: newCamp.description || 'Targeted multi-channel UAE performance campaign.',
      budgetAED: budget,
      impressions,
      clicks,
      ctr,
      cpcAED: Number(cpc.toFixed(2)),
      leads,
      roas,
      revenueAED,
      status: newCamp.status,
      costPerLeadAED,
      targetAudience: newCamp.targetAudience,
      badgeColor: color,
    };

    try {
      const created = await insertCampaign(campaignPayload);
      setCampaigns([created, ...campaigns]);
      setIsAddModalOpen(false);
      setNewCamp({
        name: '',
        channel: 'Meta Ads',
        description: '',
        budgetAED: 15000,
        targetAudience: 'UAE Residents & GCC Travelers, 25-50',
        status: 'Active',
        roas: 4.5,
      });
    } catch (err) {
      console.error('Failed to create campaign:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCampaigns = campaigns.filter(c => {
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalBudgetAED = campaigns.reduce((acc, c) => acc + c.budgetAED, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leads, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenueAED, 0);
  const aggregateROAS = totalBudgetAED > 0 ? (totalRevenue / totalBudgetAED).toFixed(2) : '0';

  return (
    <div className="min-h-screen bg-[#070e1c] text-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1E3458]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Megaphone className="w-4 h-4 text-[#FF6600]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Campaign Management</span>
              {isSupabaseConfigured() && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Supabase Live Sync
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Active Marketing Channels & ROAS
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {campaigns.length} acquisition channels tracked in AED with live Supabase integration and automated attribution.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Aggregate Badge */}
            <div className="flex items-center gap-3 bg-[#0F1E3A] p-3 rounded-2xl border border-[#1E3458]">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Spend</span>
                <span className="text-base font-black text-white">{totalBudgetAED.toLocaleString()} AED</span>
              </div>
              <div className="h-8 w-px bg-[#1E3458]" />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">ROAS</span>
                <span className="text-base font-black text-[#FF6600]">{aggregateROAS}x</span>
              </div>
            </div>

            {/* Add Campaign Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF6600] to-[#FF7A1A] text-white font-bold text-xs shadow-lg shadow-[#FF6600]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Campaign</span>
            </button>
          </div>
        </div>

        {/* Controls: Search, Filter, View Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B162C] p-4 rounded-2xl border border-[#1E3458]">
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by channel, audience, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#070e1c] border border-[#1E3458] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6600]"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Active', 'Scaling', 'Optimizing'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-[#FF6600] text-white shadow-md'
                    : 'bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]'
                }`}
              >
                {st}
              </button>
            ))}

            {/* Toggle Table/Grid */}
            <div className="flex items-center gap-1 ml-2 bg-[#070e1c] p-1 rounded-lg border border-[#1E3458]">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-[#FF6600] text-white' : 'text-slate-400 hover:text-white'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#FF6600] text-white' : 'text-slate-400 hover:text-white'}`}
                title="Grid Cards View"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* View 1: Detailed Table View */}
        {viewMode === 'table' && (
          <div className="bg-[#0F1E3A] rounded-3xl border border-[#1E3458] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#070e1c] text-slate-400 uppercase tracking-wider font-bold border-b border-[#1E3458]">
                  <tr>
                    <th className="py-4 px-5">Channel & Campaign</th>
                    <th className="py-4 px-4 text-right">Budget (AED)</th>
                    <th className="py-4 px-4 text-right">Impressions</th>
                    <th className="py-4 px-4 text-right">Clicks</th>
                    <th className="py-4 px-4 text-right">CTR (%)</th>
                    <th className="py-4 px-4 text-right">CPC (AED)</th>
                    <th className="py-4 px-4 text-right">Leads</th>
                    <th className="py-4 px-4 text-right">Cost / Lead</th>
                    <th className="py-4 px-4 text-right">ROAS</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-4 text-center">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E3458]/70">
                  {filteredCampaigns.map((camp) => (
                    <tr 
                      key={camp.id} 
                      className="hover:bg-[#0B162C] transition-colors cursor-pointer group"
                      onClick={() => setSelectedCampaign(camp)}
                    >
                      {/* Name & Channel */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: camp.badgeColor }}
                          />
                          <div>
                            <span className="font-bold text-white text-sm group-hover:text-[#FF6600] transition-colors">
                              {camp.name}
                            </span>
                            <span className="block text-[11px] text-slate-400 mt-0.5">
                              {camp.channel} • {camp.targetAudience}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Budget in AED */}
                      <td className="py-4 px-4 text-right font-black text-white text-sm">
                        {camp.budgetAED.toLocaleString()} <span className="text-[10px] text-slate-400 font-semibold">AED</span>
                      </td>

                      {/* Impressions */}
                      <td className="py-4 px-4 text-right text-slate-300 font-medium">
                        {camp.impressions.toLocaleString()}
                      </td>

                      {/* Clicks */}
                      <td className="py-4 px-4 text-right font-semibold text-white">
                        {camp.clicks.toLocaleString()}
                      </td>

                      {/* CTR */}
                      <td className="py-4 px-4 text-right text-slate-300 font-semibold">
                        <span className="px-2 py-0.5 rounded bg-[#070e1c] border border-[#1E3458]">
                          {camp.ctr.toFixed(2)}%
                        </span>
                      </td>

                      {/* CPC in AED */}
                      <td className="py-4 px-4 text-right font-bold text-slate-200">
                        {camp.cpcAED.toFixed(2)} AED
                      </td>

                      {/* Leads */}
                      <td className="py-4 px-4 text-right font-extrabold text-[#0084FF] text-sm">
                        {camp.leads}
                      </td>

                      {/* Cost per lead in AED */}
                      <td className="py-4 px-4 text-right text-emerald-400 font-semibold">
                        {camp.costPerLeadAED.toFixed(2)} AED
                      </td>

                      {/* ROAS */}
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm font-black text-[#FF6600] px-2 py-1 rounded-lg bg-[#FF6600]/10 border border-[#FF6600]/30">
                          {camp.roas}x
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          camp.status === 'Scaling' ? 'bg-[#0084FF]/20 text-[#0084FF] border border-[#0084FF]/30' :
                          camp.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {camp.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCampaign(camp);
                          }}
                          className="px-2.5 py-1 rounded bg-[#070e1c] border border-[#1E3458] text-slate-300 hover:text-white hover:border-[#FF6600] text-[11px] font-semibold transition-all"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Totals Row */}
            <div className="bg-[#070e1c] px-6 py-4 border-t border-[#1E3458] flex flex-wrap items-center justify-between text-xs text-slate-300">
              <span className="font-bold text-white uppercase tracking-wider">Active Campaigns Total:</span>
              <div className="flex items-center gap-6 font-semibold">
                <span>Budget: <strong className="text-white">{totalBudgetAED.toLocaleString()} AED</strong></span>
                <span>Leads: <strong className="text-[#0084FF]">{totalLeads}</strong></span>
                <span>Revenue: <strong className="text-emerald-400">{totalRevenue.toLocaleString()} AED</strong></span>
                <span>Blended ROAS: <strong className="text-[#FF6600] text-sm">{aggregateROAS}x</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Grid Cards View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((camp) => (
              <div
                key={camp.id}
                onClick={() => setSelectedCampaign(camp)}
                className="p-6 rounded-3xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/50 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${camp.badgeColor}20`, color: camp.badgeColor, border: `1px solid ${camp.badgeColor}40` }}
                    >
                      {camp.channel}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {camp.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-white group-hover:text-[#FF6600] transition-colors mb-2">
                    {camp.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {camp.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#1E3458]">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#070e1c] p-2 rounded-xl border border-[#1E3458]">
                      <span className="text-[10px] text-slate-400 block uppercase">Budget (AED)</span>
                      <span className="font-black text-white">{camp.budgetAED.toLocaleString()} AED</span>
                    </div>
                    <div className="bg-[#070e1c] p-2 rounded-xl border border-[#1E3458]">
                      <span className="text-[10px] text-slate-400 block uppercase">ROAS</span>
                      <span className="font-black text-[#FF6600] text-sm">{camp.roas}x</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1 text-center text-[11px] bg-[#070e1c]/50 p-2 rounded-xl">
                    <div>
                      <span className="text-[9px] text-slate-400 block">Clicks</span>
                      <span className="font-bold text-white">{camp.clicks.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">CTR</span>
                      <span className="font-bold text-white">{camp.ctr}%</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">CPC</span>
                      <span className="font-bold text-white">{camp.cpcAED} AED</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">Leads</span>
                      <span className="font-bold text-[#0084FF]">{camp.leads}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Add New Campaign Form */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="bg-[#0F1E3A] border border-[#1E3458] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-[#FF6600]" />
                    <span>Create New Marketing Campaign</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Saves directly to Supabase and recalculates ROAS metrics</p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-lg bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Campaign Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dubai Marina Luxury Real Estate Search"
                    value={newCamp.name}
                    onChange={(e) => setNewCamp({ ...newCamp, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Channel *</label>
                    <select
                      value={newCamp.channel}
                      onChange={(e) => setNewCamp({ ...newCamp, channel: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                    >
                      <option value="Meta Ads">Meta Ads</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="SEO">SEO</option>
                      <option value="Email">Email</option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Status</label>
                    <select
                      value={newCamp.status}
                      onChange={(e) => setNewCamp({ ...newCamp, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                    >
                      <option value="Active">Active</option>
                      <option value="Scaling">Scaling</option>
                      <option value="Optimizing">Optimizing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Monthly Budget (AED) *</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={500}
                      placeholder="15000"
                      value={newCamp.budgetAED}
                      onChange={(e) => setNewCamp({ ...newCamp, budgetAED: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Target ROAS Multiple</label>
                    <input
                      type="number"
                      required
                      min={1.0}
                      max={20.0}
                      step={0.1}
                      placeholder="4.5"
                      value={newCamp.roas}
                      onChange={(e) => setNewCamp({ ...newCamp, roas: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Target Audience & Geo</label>
                  <input
                    type="text"
                    placeholder="e.g. High Net Worth Individuals in Dubai, Abu Dhabi & Riyadh"
                    value={newCamp.targetAudience}
                    onChange={(e) => setNewCamp({ ...newCamp, targetAudience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Campaign Strategy / Description</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Focus on video hooks, lead forms, and instant automated WhatsApp followup."
                    value={newCamp.description}
                    onChange={(e) => setNewCamp({ ...newCamp, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#1E3458]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-[#FF6600] text-white font-bold hover:brightness-110 shadow-lg flex items-center gap-1.5"
                  >
                    {submitting ? 'Saving...' : 'Save Campaign to Supabase'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Campaign Inspector Modal / Drawer */}
        {selectedCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0F1E3A] border border-[#1E3458] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-block mb-2"
                    style={{ 
                      backgroundColor: `${selectedCampaign.badgeColor}20`, 
                      color: selectedCampaign.badgeColor, 
                      border: `1px solid ${selectedCampaign.badgeColor}40` 
                    }}
                  >
                    {selectedCampaign.channel}
                  </span>
                  <h2 className="text-2xl font-black text-white">{selectedCampaign.name}</h2>
                  <p className="text-xs text-slate-300 mt-1">{selectedCampaign.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="p-2 rounded-xl bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 6 Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Monthly Budget</span>
                  <span className="text-lg font-black text-white">{selectedCampaign.budgetAED.toLocaleString()} AED</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Impressions</span>
                  <span className="text-lg font-black text-white">{selectedCampaign.impressions.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Clicks</span>
                  <span className="text-lg font-black text-white">{selectedCampaign.clicks.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">CTR / Click Rate</span>
                  <span className="text-lg font-black text-white">{selectedCampaign.ctr}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg. CPC</span>
                  <span className="text-lg font-black text-white">{selectedCampaign.cpcAED} AED</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Leads</span>
                  <span className="text-lg font-black text-[#0084FF]">{selectedCampaign.leads}</span>
                </div>
              </div>

              {/* ROAS & Revenue Breakdown */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF6600]/10 via-[#0B162C] to-[#070e1c] border border-[#FF6600]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase text-slate-400 font-bold block">Return on Ad Spend (ROAS)</span>
                  <span className="text-2xl font-black text-[#FF6600]">{selectedCampaign.roas}x Multiple</span>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase text-slate-400 font-bold block">Attributed Revenue</span>
                  <span className="text-xl font-black text-emerald-400">{selectedCampaign.revenueAED.toLocaleString()} AED</span>
                </div>
              </div>

              {/* Target Audience & Tactical Optimization */}
              <div className="space-y-2 text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider block">Audience Targeting & Geo</span>
                <p className="p-3 rounded-xl bg-[#070e1c] border border-[#1E3458] text-slate-200">
                  {selectedCampaign.targetAudience}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#FF6600] text-white font-bold text-xs hover:brightness-110 transition-all"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
