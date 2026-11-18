'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  X,
  MessageSquare
} from 'lucide-react';
import { sampleLeads, Lead } from '@/data/marketingData';

export default function LeadsPage() {
  const [leadsList, setLeadsList] = useState<Lead[]>(sampleLeads);
  const [channelFilter, setChannelFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leadsList.filter(l => {
    const matchesChannel = channelFilter === 'All' || l.channelSource === channelFilter;
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.phone.includes(searchQuery);
    return matchesChannel && matchesStatus && matchesSearch;
  });

  const totalPipelineAED = leadsList.reduce((acc, l) => acc + l.estimatedValueAED, 0);
  const auditRequestsCount = leadsList.filter(l => l.auditRequested).length;

  const handleUpdateStatus = (id: string, newStatus: Lead['status']) => {
    setLeadsList(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1c] text-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1E3458]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-[#FF6600]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Inbound Pipeline CRM</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Customer Acquisition & Audit Leads
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Qualified high-ticket UAE leads captured across Meta, Google Ads, SEO, and free marketing audits.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-[#0F1E3A] p-3 rounded-2xl border border-[#1E3458]">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Pipeline Value (AED)</span>
              <span className="text-base font-black text-emerald-400">{totalPipelineAED.toLocaleString()} AED</span>
            </div>
            <div className="h-8 w-px bg-[#1E3458]" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Audit Inquiries</span>
              <span className="text-base font-black text-[#FF6600]">{auditRequestsCount} Active</span>
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458]">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Total Leads In Pipeline</span>
            <div className="text-2xl font-black text-white">{leadsList.length} Accounts</div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">+3 new today</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458]">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Audit Requests</span>
            <div className="text-2xl font-black text-[#FF6600]">{auditRequestsCount} Pending</div>
            <span className="text-[11px] text-slate-400 font-semibold mt-1 block">Free 15-page diagnostic</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458]">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Avg Lead Intent Score</span>
            <div className="text-2xl font-black text-[#0084FF]">89 / 100</div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Verified UAE Decision Makers</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-[#1E3458]">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Conversion Rate</span>
            <div className="text-2xl font-black text-emerald-400">25.0%</div>
            <span className="text-[11px] text-slate-400 font-semibold mt-1 block">2 Closed Retainers</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B162C] p-4 rounded-2xl border border-[#1E3458]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by contact name, company, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#070e1c] border border-[#1E3458] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6600]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status filters */}
            <div className="flex items-center gap-1">
              {['All', 'Call Scheduled', 'Audit Sent', 'New', 'Converted'].map((st) => (
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
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-[#0F1E3A] rounded-3xl border border-[#1E3458] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#070e1c] text-slate-400 uppercase tracking-wider font-bold border-b border-[#1E3458]">
                <tr>
                  <th className="py-4 px-5">Lead / Contact</th>
                  <th className="py-4 px-4">Company</th>
                  <th className="py-4 px-4">Channel Origin</th>
                  <th className="py-4 px-4">Ad Budget (AED)</th>
                  <th className="py-4 px-4 text-center">Score</th>
                  <th className="py-4 px-4 text-right">Est. Deal Value</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3458]/70">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-[#0B162C] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-white text-sm group-hover:text-[#FF6600] transition-colors">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{lead.email}</span>
                        <span>•</span>
                        <span>{lead.phone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-200">{lead.company}</div>
                      <div className="text-[10px] text-slate-500">{lead.date}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#070e1c] border border-[#1E3458] text-slate-300 font-bold text-[11px]">
                        {lead.channelSource}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-semibold text-slate-300">
                      {lead.budgetAED}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full font-black text-[11px] bg-[#070e1c] border border-[#1E3458] text-[#0084FF]">
                        {lead.score}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right font-black text-emerald-400 text-sm">
                      {lead.estimatedValueAED.toLocaleString()} AED
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        lead.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        lead.status === 'Call Scheduled' ? 'bg-[#0084FF]/20 text-[#0084FF] border border-[#0084FF]/30' :
                        lead.status === 'Audit Sent' ? 'bg-[#FF6600]/20 text-[#FF6600] border border-[#FF6600]/30' :
                        'bg-slate-700/40 text-slate-300 border border-slate-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#070e1c] border border-[#1E3458] text-slate-300 hover:text-white hover:border-[#FF6600] text-xs font-semibold transition-all"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Details Modal / Drawer */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0F1E3A] border border-[#1E3458] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
              
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#070e1c] border border-[#1E3458] text-xs font-bold text-[#FF6600]">
                      {selectedLead.channelSource}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Lead ID: {selectedLead.id}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{selectedLead.name}</h2>
                  <p className="text-sm text-slate-300 font-semibold">{selectedLead.company}</p>
                </div>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-white font-semibold hover:text-[#FF6600]">
                    {selectedLead.email}
                  </a>
                </div>

                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Direct Phone / WhatsApp</span>
                  <a href={`tel:${selectedLead.phone}`} className="text-white font-semibold hover:text-[#FF6600]">
                    {selectedLead.phone}
                  </a>
                </div>

                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Monthly Ad Budget</span>
                  <span className="text-white font-bold">{selectedLead.budgetAED}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#070e1c] border border-[#1E3458]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Estimated Deal Value</span>
                  <span className="text-emerald-400 font-black text-sm">{selectedLead.estimatedValueAED.toLocaleString()} AED</span>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Update Pipeline Stage</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['New', 'Audit Sent', 'Call Scheduled', 'Converted'] as Lead['status'][]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                        selectedLead.status === st
                          ? 'bg-[#FF6600] text-white shadow-md'
                          : 'bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#1E3458]">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Message</span>
                </a>
                <button
                  onClick={() => {
                    alert(`Dispatched bespoke 15-page PDF growth audit to ${selectedLead.email}`);
                    handleUpdateStatus(selectedLead.id, 'Audit Sent');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#FF6600] text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg"
                >
                  <FileText className="w-4 h-4" />
                  <span>Send Free Audit PDF</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
