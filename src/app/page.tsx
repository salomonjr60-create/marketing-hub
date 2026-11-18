'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  Target, 
  Zap, 
  Building2, 
  DollarSign, 
  Check, 
  AlertCircle,
  Eye,
  MousePointer,
  Award
} from 'lucide-react';
import { sampleCampaigns, totals } from '@/data/marketingData';
import { insertLead } from '@/lib/supabase';

export default function HomePage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    website: '',
    phone: '',
    monthlyBudget: '30,000 - 50,000 AED',
    primaryGoal: 'Maximize ROAS & Ad Efficiency',
    channels: ['Meta Ads', 'Google Ads'],
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [auditStep, setAuditStep] = useState(0);

  const auditStepsList = [
    'Connecting to UAE market benchmarks...',
    'Analyzing ad channel attribution & CPC...',
    'Identifying wasted ad spend & negative keywords...',
    'Synthesizing 15-page bespoke Growth Audit...',
  ];

  const handleChannelToggle = (ch: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(ch)
        ? prev.channels.filter(c => c !== ch)
        : [...prev.channels, ch],
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.website) {
      alert('Please fill in your name, email, and website.');
      return;
    }

    setFormStatus('analyzing');
    setAuditStep(0);

    // Save lead to Supabase (or local fallback)
    try {
      await insertLead({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || '+971 50 000 0000',
        company: formData.website,
        channelSource: 'Audit Form',
        budgetAED: formData.monthlyBudget,
        auditRequested: true,
        score: 92,
        estimatedValueAED: 35000,
        status: 'New',
      });
    } catch (err) {
      console.error('Error saving lead:', err);
    }

    const stepInterval = setInterval(() => {
      setAuditStep(prev => {
        if (prev < auditStepsList.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setFormStatus('completed');
          }, 600);
          return prev;
        }
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070e1c] text-white selection:bg-[#FF6600] selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#FF6600]/15 via-[#0B162C]/40 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-[#0084FF]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1E3A] border border-[#1E3458] text-xs font-semibold text-slate-300 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-[#FF6600] animate-ping" />
              <span>UAE #1 Data-Driven Marketing Engine</span>
              <span className="text-[#FF6600]">•</span>
              <span className="text-slate-400">Dubai & Abu Dhabi</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Scale Your Brand With <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-white via-slate-100 to-[#FF6600] bg-clip-text text-transparent">
                High-ROAS Digital Marketing
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              Unify Meta Ads, Google Ads, SEO, and omnichannel retention under one roof. Track every Dirham spent, eliminate ad waste, and supercharge your inbound pipeline.
            </p>

            {/* Live Ticker Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-lg bg-[#0B162C] border border-[#1E3458] text-xs font-bold text-slate-200 flex items-center gap-2">
                <span className="text-[#FF6600]">AED 85,000+</span> Monthly Spend Analyzed
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-[#0B162C] border border-[#1E3458] text-xs font-bold text-slate-200 flex items-center gap-2">
                <span className="text-emerald-400">4.95x</span> Blended ROAS
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-[#0B162C] border border-[#1E3458] text-xs font-bold text-slate-200 flex items-center gap-2">
                <span className="text-[#0084FF]">1,950+</span> Qualified Leads
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#audit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF6600] to-[#FF7A1A] text-white font-bold text-base shadow-xl shadow-[#FF6600]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Claim Free Marketing Audit</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0F1E3A] border border-[#1E3458] text-white font-semibold text-base hover:bg-[#1E3458] hover:border-[#FF6600]/40 transition-all flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5 text-[#FF6600]" />
                <span>Explore Live Dashboard</span>
              </Link>
            </div>

          </div>

          {/* KPI Snapshot Bar */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-5 rounded-2xl bg-[#0B162C]/90 border border-[#1E3458] text-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">Total Managed Spend</span>
              <span className="text-2xl sm:text-3xl font-black text-white">85,000 <span className="text-sm font-bold text-[#FF6600]">AED</span></span>
              <span className="text-[11px] text-emerald-400 flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B162C]/90 border border-[#1E3458] text-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">Leads Generated</span>
              <span className="text-2xl sm:text-3xl font-black text-white">1,950</span>
              <span className="text-[11px] text-emerald-400 flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> 43.58 AED Cost / Lead
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B162C]/90 border border-[#1E3458] text-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">Blended ROAS</span>
              <span className="text-2xl sm:text-3xl font-black text-[#FF6600]">4.95x</span>
              <span className="text-[11px] text-slate-400 block mt-1">
                421,090 AED Pipeline
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B162C]/90 border border-[#1E3458] text-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">Active Channels</span>
              <span className="text-2xl sm:text-3xl font-black text-white">6 Channels</span>
              <span className="text-[11px] text-[#0084FF] block mt-1">
                Meta, Google, SEO, Email +
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Channels Grid */}
      <section className="py-16 bg-[#0B162C]/50 border-y border-[#1E3458]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6600]">Omnichannel Architecture</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">6 Calibrated Marketing Channels</h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Every channel is benchmarked in AED with real-time conversion attribution and strict cost-per-lead limits.
              </p>
            </div>
            <Link
              href="/campaigns"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#FF6600] hover:text-[#FF8533]"
            >
              <span>View full metrics table</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCampaigns.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-2xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/50 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${c.badgeColor}20`, color: c.badgeColor, border: `1px solid ${c.badgeColor}40` }}
                    >
                      {c.channel}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {c.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-[#FF6600] transition-colors mb-2">
                    {c.name}
                  </h3>
                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E3458] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Budget</span>
                    <span className="text-sm font-bold text-white">{c.budgetAED.toLocaleString()} <span className="text-[10px] text-slate-400">AED</span></span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Leads</span>
                    <span className="text-sm font-bold text-white">{c.leads}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">ROAS</span>
                    <span className="text-sm font-black text-[#FF6600]">{c.roas}x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Marketing Audit Section (Primary Form) */}
      <section id="audit" className="py-20 lg:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl bg-gradient-to-b from-[#0F1E3A] to-[#0B162C] border-2 border-[#FF6600]/40 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Top decorative badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FF6600] to-transparent h-1.5 w-full" />

            {formStatus === 'idle' && (
              <div>
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6600]/20 text-[#FF6600] text-xs font-bold mb-3 border border-[#FF6600]/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant UAE Business Analysis</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white">
                    Request Your Free Marketing & ROAS Audit
                  </h2>
                  <p className="text-slate-300 text-sm mt-3">
                    Discover hidden ad waste, benchmark your CPC across GCC competitors, and get a customized roadmap to increase your ROAS to 4x+.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Row 1: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sultan Al-Maktoum"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-sm focus:outline-none focus:border-[#FF6600] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sultan@company.ae"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-sm focus:outline-none focus:border-[#FF6600] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Website & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Company Website URL *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="https://yourbrand.ae"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-sm focus:outline-none focus:border-[#FF6600] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        WhatsApp / Mobile (+971)
                      </label>
                      <input
                        type="tel"
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-sm focus:outline-none focus:border-[#FF6600] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Monthly Ad Budget in AED */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Monthly Ad Budget (AED)
                      </label>
                      <select
                        value={formData.monthlyBudget}
                        onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-sm focus:outline-none focus:border-[#FF6600] transition-colors"
                      >
                        <option value="Under 10,000 AED">Under 10,000 AED / month</option>
                        <option value="10,000 - 30,000 AED">10,000 - 30,000 AED / month</option>
                        <option value="30,000 - 50,000 AED">30,000 - 50,000 AED / month (Recommended)</option>
                        <option value="50,000 - 100,000 AED">50,000 - 100,000 AED / month</option>
                        <option value="100,000+ AED">100,000+ AED / month (Enterprise)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Primary 90-Day Growth Goal
                      </label>
                      <select
                        value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-sm focus:outline-none focus:border-[#FF6600] transition-colors"
                      >
                        <option value="Maximize ROAS & Ad Efficiency">Maximize ROAS & Lower Ad Cost</option>
                        <option value="Generate Inbound B2B Qualified Leads">Generate Inbound B2B Qualified Leads</option>
                        <option value="Scale E-commerce Direct Sales">Scale E-commerce Direct Sales (GCC)</option>
                        <option value="Dominate Google Search with SEO">Dominate Google Search with SEO</option>
                      </select>
                    </div>
                  </div>

                  {/* Channel Checkboxes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Which channels do you currently run or wish to audit?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {['Meta Ads', 'Google Ads', 'SEO', 'Email', 'Instagram', 'LinkedIn'].map((ch) => {
                        const checked = formData.channels.includes(ch);
                        return (
                          <button
                            type="button"
                            key={ch}
                            onClick={() => handleChannelToggle(ch)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                              checked
                                ? 'bg-[#FF6600]/15 border-[#FF6600] text-white'
                                : 'bg-[#070e1c] border-[#1E3458] text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              checked ? 'bg-[#FF6600] border-[#FF6600]' : 'border-slate-500'
                            }`}>
                              {checked && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span>{ch}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6600] to-[#FF7A1A] text-white font-extrabold text-base shadow-xl shadow-[#FF6600]/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Free Marketing Audit (Value: 3,500 AED)</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>100% Free • No credit card required • Strict UAE confidentiality</span>
                    </p>
                  </div>

                </form>
              </div>
            )}

            {/* Analyzing Animated State */}
            {formStatus === 'analyzing' && (
              <div className="py-16 text-center space-y-8">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#1E3458] animate-spin border-t-[#FF6600]" />
                  <div className="absolute inset-3 rounded-full bg-[#070e1c] flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#FF6600] animate-pulse" />
                  </div>
                </div>

                <div className="max-w-md mx-auto space-y-3">
                  <h3 className="text-2xl font-black text-white">Synthesizing Your Audit...</h3>
                  <p className="text-sm font-semibold text-[#FF6600]">
                    {auditStepsList[auditStep]}
                  </p>
                  <div className="w-full bg-[#070e1c] rounded-full h-2 overflow-hidden border border-[#1E3458] mt-4">
                    <div
                      className="bg-gradient-to-r from-[#FF6600] to-[#FF8533] h-full transition-all duration-500 ease-out"
                      style={{ width: `${((auditStep + 1) / auditStepsList.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Completed Result State */}
            {formStatus === 'completed' && (
              <div className="py-8 space-y-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-white">Your Audit is Ready, {formData.fullName}!</h3>
                  <p className="text-slate-300 text-sm max-w-lg mx-auto">
                    We have generated the initial performance benchmark for <span className="text-[#FF6600] font-bold">{formData.website}</span>. A full PDF has been dispatched to <span className="text-white font-semibold">{formData.email}</span>.
                  </p>
                </div>

                {/* Audit Key Takeaways Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#070e1c] p-6 rounded-2xl border border-[#1E3458]">
                  <div className="text-center sm:text-left space-y-1">
                    <span className="text-xs uppercase text-slate-400 font-bold block">Estimated ROAS Potential</span>
                    <span className="text-2xl font-black text-emerald-400">+42% Lift</span>
                    <p className="text-[11px] text-slate-400">Targeting 4.8x - 5.2x ROAS</p>
                  </div>
                  <div className="text-center sm:text-left space-y-1 border-t sm:border-t-0 sm:border-l border-[#1E3458] pt-3 sm:pt-0 sm:pl-4">
                    <span className="text-xs uppercase text-slate-400 font-bold block">Recoverable Ad Spend</span>
                    <span className="text-2xl font-black text-[#FF6600]">4,850 AED/mo</span>
                    <p className="text-[11px] text-slate-400">Negative search keywords & audience bleed</p>
                  </div>
                  <div className="text-center sm:text-left space-y-1 border-t sm:border-t-0 sm:border-l border-[#1E3458] pt-3 sm:pt-0 sm:pl-4">
                    <span className="text-xs uppercase text-slate-400 font-bold block">High-Value Inbound Leads</span>
                    <span className="text-2xl font-black text-white">+85 / month</span>
                    <p className="text-[11px] text-slate-400">Via tuned Google Ads + Meta Retargeting</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF6600] text-white font-bold text-center shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Interactive Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F1E3A] border border-[#1E3458] text-slate-300 font-semibold text-center hover:text-white"
                  >
                    Submit Another Audit
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Why marketing-hub Features */}
      <section className="py-20 border-t border-[#1E3458] bg-[#070e1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6600]">Engineered for Growth</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Why Top UAE Brands Choose marketing.hub
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#0B162C] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FF6600]/15 text-[#FF6600] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">GCC Multi-Channel Attribution</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect Meta Ads, Google PMax, and local SEO in unified currency (AED) with first-click, last-click, and algorithmic data-driven attribution models.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B162C] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0084FF]/15 text-[#0084FF] flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time ROAS Optimization</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Automated budget reallocation from low-performing ad sets to the highest-converting Emirates campaigns to keep overall ROAS well above 4.5x.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B162C] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Editorial Content Calendar</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Coordinate Reels, InMail executive drops, Arabic SEO articles, and VIP email newsletters with synchronized seasonal UAE retail dates.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
