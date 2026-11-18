'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  MousePointer, 
  Eye, 
  Percent, 
  ArrowUpRight, 
  Sparkles, 
  BarChart2, 
  PieChart, 
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';
import { sampleCampaigns, totals, sampleLeads, Campaign } from '@/data/marketingData';
import { getCampaigns } from '@/lib/supabase';

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);
  const [timeRange, setTimeRange] = useState<'30d' | 'q4' | 'ytd'>('30d');
  const [activeChartTab, setActiveChartTab] = useState<'all' | 'paid' | 'organic'>('all');
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCampaigns();
        if (data && data.length > 0) {
          setCampaigns(data);
        }
      } catch (err) {
        console.error('Failed to load campaigns for dashboard:', err);
      }
    }
    loadData();
  }, []);

  const totalBudgetAED = campaigns.reduce((acc, c) => acc + c.budgetAED, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leads, 0);
  const totalRevenueAED = campaigns.reduce((acc, c) => acc + c.revenueAED, 0);
  const blendedROAS = totalBudgetAED > 0 ? (totalRevenueAED / totalBudgetAED).toFixed(2) : '0';
  const blendedCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0';
  const blendedCPC = totalClicks > 0 ? (totalBudgetAED / totalClicks).toFixed(2) : '0';
  const blendedCPL = totalLeads > 0 ? (totalBudgetAED / totalLeads).toFixed(2) : '0';

  // Time range multiplier adjustments for interactive responsiveness
  const multiplier = timeRange === '30d' ? 1 : timeRange === 'q4' ? 2.8 : 8.4;
  const currentBudget = Math.round(totalBudgetAED * multiplier);
  const currentLeads = Math.round(totalLeads * multiplier);
  const currentClicks = Math.round(totalClicks * multiplier);
  const currentImpressions = Math.round(totalImpressions * multiplier);
  const currentRevenue = Math.round(totalRevenueAED * multiplier);

  // Filtered campaigns for chart
  const displayedCampaigns = campaigns.filter(c => {
    if (activeChartTab === 'paid') return ['Meta Ads', 'Google Ads', 'Instagram', 'LinkedIn'].includes(c.channel);
    if (activeChartTab === 'organic') return ['SEO', 'Email'].includes(c.channel);
    return true;
  });

  // Maximum spend for scaling bar heights
  const maxSpend = Math.max(...displayedCampaigns.map(c => c.budgetAED), 1);
  const maxLeads = Math.max(...displayedCampaigns.map(c => c.leads), 1);

  return (
    <div className="min-h-screen bg-[#070e1c] text-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Range Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1E3458]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Executive Real-Time Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Marketing Performance & Attribution
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#0B162C] p-1 rounded-xl border border-[#1E3458] flex items-center gap-1">
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === '30d'
                    ? 'bg-[#FF6600] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Last 30 Days
              </button>
              <button
                onClick={() => setTimeRange('q4')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === 'q4'
                    ? 'bg-[#FF6600] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Q4 2026
              </button>
              <button
                onClick={() => setTimeRange('ytd')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === 'ytd'
                    ? 'bg-[#FF6600] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Year to Date
              </button>
            </div>

            <Link
              href="/campaigns"
              className="px-4 py-2 rounded-xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/40 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
            >
              <span>Manage Campaigns</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF6600]" />
            </Link>
          </div>
        </div>

        {/* 6 Summary KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Spend */}
          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Spend</span>
              <div className="w-7 h-7 rounded-lg bg-[#FF6600]/15 text-[#FF6600] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {currentBudget.toLocaleString()} <span className="text-xs font-bold text-[#FF6600]">AED</span>
            </div>
            <div className="mt-2 flex items-center text-[10px] text-emerald-400 font-semibold gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% budgeted</span>
            </div>
          </div>

          {/* Leads */}
          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {currentLeads.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center text-[10px] text-emerald-400 font-semibold gap-1">
              <span>{blendedCPL} AED / lead</span>
            </div>
          </div>

          {/* ROAS */}
          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Blended ROAS</span>
              <div className="w-7 h-7 rounded-lg bg-[#0084FF]/15 text-[#0084FF] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#FF6600]">
              {blendedROAS}x
            </div>
            <div className="mt-2 text-[10px] text-slate-400 font-semibold">
              {currentRevenue.toLocaleString()} AED Revenue
            </div>
          </div>

          {/* Clicks */}
          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Clicks</span>
              <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <MousePointer className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {currentClicks.toLocaleString()}
            </div>
            <div className="mt-2 text-[10px] text-slate-400 font-semibold">
              Across {campaigns.length} Channels
            </div>
          </div>

          {/* Impressions */}
          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Impressions</span>
              <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {(currentImpressions / 1000000).toFixed(2)}M
            </div>
            <div className="mt-2 text-[10px] text-slate-400 font-semibold">
              CTR: {blendedCTR}%
            </div>
          </div>

          {/* Avg CPC */}
          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg CPC</span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {blendedCPC} <span className="text-xs font-bold text-slate-400">AED</span>
            </div>
            <div className="mt-2 text-[10px] text-emerald-400 font-semibold">
              Optimal UAE Range
            </div>
          </div>

        </div>

        {/* 2 Simple Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Spend vs Leads */}
          <div className="p-6 rounded-3xl bg-[#0F1E3A] border border-[#1E3458] flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-[#FF6600]" />
                    <h2 className="text-lg font-bold text-white">Chart 1: Spend vs Leads</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Comparison of monthly budget in AED vs leads acquired by channel
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#FF6600]"></span>
                    <span className="text-slate-300">Spend (AED)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-[#0084FF]"></span>
                    <span className="text-slate-300">Leads</span>
                  </div>
                </div>
              </div>

              {/* Chart Visual */}
              <div className="space-y-4 pt-2">
                {displayedCampaigns.map((camp) => {
                  const spendPct = Math.round((camp.budgetAED / maxSpend) * 100);
                  const leadsPct = Math.round((camp.leads / maxLeads) * 100);
                  const isHovered = hoveredChannel === camp.id;

                  return (
                    <div 
                      key={camp.id}
                      onMouseEnter={() => setHoveredChannel(camp.id)}
                      onMouseLeave={() => setHoveredChannel(null)}
                      className={`p-3 rounded-xl transition-all ${
                        isHovered ? 'bg-[#0B162C] border border-[#FF6600]/30' : 'bg-[#070e1c]/40 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: camp.badgeColor }}
                          />
                          <span className="text-white font-bold">{camp.channel}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium">
                          <span className="text-slate-300">
                            <span className="text-[#FF6600] font-bold">{camp.budgetAED.toLocaleString()} AED</span> spend
                          </span>
                          <span className="text-slate-300">
                            <span className="text-[#0084FF] font-bold">{camp.leads}</span> leads
                          </span>
                          <span className="text-emerald-400 font-bold hidden sm:inline">
                            {camp.roas}x ROAS
                          </span>
                        </div>
                      </div>

                      {/* Dual Bars */}
                      <div className="space-y-1.5">
                        {/* Spend Bar */}
                        <div className="w-full bg-[#070e1c] rounded-full h-3 overflow-hidden border border-[#1E3458]">
                          <div
                            className="bg-gradient-to-r from-[#FF6600] to-[#FF8533] h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2 text-[9px] font-black text-white"
                            style={{ width: `${Math.max(spendPct, 8)}%` }}
                          >
                            {camp.budgetAED > 10000 && `${camp.budgetAED.toLocaleString()} AED`}
                          </div>
                        </div>

                        {/* Leads Bar */}
                        <div className="w-full bg-[#070e1c] rounded-full h-3 overflow-hidden border border-[#1E3458]">
                          <div
                            className="bg-gradient-to-r from-[#0084FF] to-[#38BDF8] h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2 text-[9px] font-black text-white"
                            style={{ width: `${Math.max(leadsPct, 8)}%` }}
                          >
                            {camp.leads} leads
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E3458] flex items-center justify-between text-xs text-slate-400">
              <span>Top Cost Efficiency: <strong className="text-emerald-400">Email & SEO</strong> (15-18 AED / lead)</span>
              <span>Highest Total Volume: <strong className="text-[#0084FF]">SEO & Google Ads</strong></span>
            </div>
          </div>

          {/* Chart 2: Clicks by Channel */}
          <div className="p-6 rounded-3xl bg-[#0F1E3A] border border-[#1E3458] flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-[#0084FF]" />
                    <h2 className="text-lg font-bold text-white">Chart 2: Clicks by Channel</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Traffic distribution of 63,700 total monthly clicks
                  </p>
                </div>

                <div className="px-2.5 py-1 rounded-lg bg-[#070e1c] border border-[#1E3458] text-xs font-bold text-slate-300">
                  {totalClicks.toLocaleString()} Total Clicks
                </div>
              </div>

              {/* Progress Distribution Bar */}
              <div className="mb-6">
                <div className="h-4 w-full rounded-full overflow-hidden flex border border-[#1E3458]">
                  {campaigns.map((camp) => {
                    const share = totalClicks > 0 ? (camp.clicks / totalClicks) * 100 : 0;
                    return (
                      <div
                        key={camp.id}
                        title={`${camp.channel}: ${camp.clicks.toLocaleString()} clicks (${share.toFixed(1)}%)`}
                        style={{ width: `${share}%`, backgroundColor: camp.badgeColor }}
                        className="h-full hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-semibold">
                  <span>0%</span>
                  <span>50% Share</span>
                  <span>100% ({(totalClicks / 1000).toFixed(1)}K Clicks)</span>
                </div>
              </div>

              {/* Ranked Channels List */}
              <div className="space-y-3">
                {[...campaigns]
                  .sort((a, b) => b.clicks - a.clicks)
                  .map((camp, idx) => {
                    const share = totalClicks > 0 ? ((camp.clicks / totalClicks) * 100).toFixed(1) : '0';
                    return (
                      <div
                        key={camp.id}
                        className="p-2.5 rounded-xl bg-[#070e1c]/40 border border-[#1E3458] flex items-center justify-between hover:border-slate-500 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-slate-400 w-4">
                            #{idx + 1}
                          </span>
                          <span
                            className="w-3 h-3 rounded-md"
                            style={{ backgroundColor: camp.badgeColor }}
                          />
                          <div>
                            <span className="text-sm font-bold text-white block">{camp.channel}</span>
                            <span className="text-[10px] text-slate-400">CTR: {camp.ctr}% • CPC: {camp.cpcAED} AED</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black text-white">{camp.clicks.toLocaleString()}</span>
                          <span className="text-xs font-bold text-[#FF6600] ml-2">({share}%)</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E3458] flex items-center justify-between text-xs text-slate-400">
              <span>Primary Traffic Driver: <strong className="text-white">SEO (37.4%)</strong></span>
              <Link href="/campaigns" className="text-[#FF6600] hover:text-[#FF8533] font-semibold flex items-center gap-1">
                <span>View CPC Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Recent High-Intent Leads from Audit & Campaigns */}
        <div className="p-6 rounded-3xl bg-[#0F1E3A] border border-[#1E3458]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Inbound Pipeline Leads</h2>
              <p className="text-xs text-slate-400 mt-0.5">High-intent corporate leads generated via Meta, Google, and Free Audits</p>
            </div>
            <Link
              href="/leads"
              className="text-xs font-bold text-[#FF6600] hover:text-[#FF8533] flex items-center gap-1"
            >
              <span>View All Leads ({sampleLeads.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#070e1c] text-slate-400 uppercase tracking-wider font-semibold border-b border-[#1E3458]">
                <tr>
                  <th className="py-3 px-4">Lead & Company</th>
                  <th className="py-3 px-4">Source Channel</th>
                  <th className="py-3 px-4">Budget Bracket</th>
                  <th className="py-3 px-4">Est. Pipeline Value</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3458]/60">
                {sampleLeads.slice(0, 5).map((l) => (
                  <tr key={l.id} className="hover:bg-[#0B162C]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{l.name}</div>
                      <div className="text-slate-400 text-xs">{l.company} • {l.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-1 rounded bg-[#070e1c] border border-[#1E3458] text-slate-300 font-semibold">
                        {l.channelSource}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      {l.budgetAED}
                    </td>
                    <td className="py-3.5 px-4 font-black text-emerald-400">
                      {l.estimatedValueAED.toLocaleString()} AED
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        l.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        l.status === 'Call Scheduled' ? 'bg-[#0084FF]/20 text-[#0084FF] border border-[#0084FF]/30' :
                        'bg-[#FF6600]/20 text-[#FF6600] border border-[#FF6600]/30'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/leads"
                        className="inline-flex items-center gap-1 text-[#FF6600] font-bold hover:underline"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
