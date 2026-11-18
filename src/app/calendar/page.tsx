'use client';

import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Video, 
  Mail, 
  Search, 
  Layers,
  X
} from 'lucide-react';
import { sampleCalendarEvents, CalendarEvent } from '@/data/marketingData';
import { getContentPosts, insertContentPost, isSupabaseConfigured } from '@/lib/supabase';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleCalendarEvents);
  const [loading, setLoading] = useState(true);
  const [channelFilter, setChannelFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getContentPosts();
        if (data && data.length > 0) {
          setEvents(data);
        }
      } catch (err) {
        console.error('Failed to load content posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '2026-11-28',
    dayLabel: 'Saturday',
    channel: 'Instagram' as CalendarEvent['channel'],
    contentType: 'Reels / Video' as CalendarEvent['contentType'],
    status: 'Scheduled' as CalendarEvent['status'],
    author: 'Growth Team',
    highlight: '',
  });

  const filteredEvents = events.filter(e => {
    const matchesChannel = channelFilter === 'All' || e.channel === channelFilter;
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesChannel && matchesStatus;
  });

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title) return;

    const payload: Omit<CalendarEvent, 'id'> = {
      title: newEvent.title,
      date: newEvent.date,
      dayLabel: 'Scheduled Day',
      channel: newEvent.channel,
      contentType: newEvent.contentType,
      status: newEvent.status,
      author: newEvent.author,
      highlight: newEvent.highlight || 'Strategic UAE audience release',
    };

    try {
      const saved = await insertContentPost(payload);
      setEvents([saved, ...events]);
      setIsAddModalOpen(false);
      setNewEvent({
        title: '',
        date: '2026-11-28',
        dayLabel: 'Saturday',
        channel: 'Instagram',
        contentType: 'Reels / Video',
        status: 'Scheduled',
        author: 'Growth Team',
        highlight: '',
      });
    } catch (err) {
      console.error('Failed to save post:', err);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#070e1c] text-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1E3458]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="w-4 h-4 text-[#FF6600]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Campaign Planning</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Editorial & Content Calendar
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Synchronize multi-channel ad copy, creator Reels, executive drops, and UAE promotional seasons.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF6600] to-[#FF7A1A] text-white font-bold text-xs shadow-lg shadow-[#FF6600]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Campaign Drop</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B162C] p-4 rounded-2xl border border-[#1E3458]">
          
          {/* Channel Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-bold mr-1">Channel:</span>
            {['All', 'Meta Ads', 'Google Ads', 'SEO', 'Email', 'Instagram', 'LinkedIn'].map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  channelFilter === ch
                    ? 'bg-[#FF6600] text-white shadow-md'
                    : 'bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-bold mr-1">Status:</span>
            {['All', 'Scheduled', 'Published', 'In Review', 'Draft'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

        {/* Content Drops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((item) => {
            const chColor = getChannelColor(item.channel);
            return (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-[#0F1E3A] border border-[#1E3458] hover:border-[#FF6600]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${chColor}20`, color: chColor, border: `1px solid ${chColor}40` }}
                    >
                      {item.channel}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      item.status === 'Scheduled' ? 'bg-[#0084FF]/20 text-[#0084FF] border border-[#0084FF]/30' :
                      item.status === 'In Review' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-slate-700/40 text-slate-400 border border-slate-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-white group-hover:text-[#FF6600] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.highlight}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E3458] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF6600]" />
                      <strong className="text-white">{item.date}</strong> ({item.dayLabel})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#070e1c] border border-[#1E3458] text-[11px] text-slate-300">
                      {item.contentType}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>Owner: <strong className="text-slate-300">{item.author}</strong></span>
                    <span className="text-[#FF6600] font-semibold">Active Pipeline</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0F1E3A] border border-[#1E3458] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white">Schedule Content or Ad Drop</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-lg bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Campaign Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dubai Shopping Festival Flash Promo"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Channel *</label>
                    <select
                      value={newEvent.channel}
                      onChange={(e) => setNewEvent({ ...newEvent, channel: e.target.value as any })}
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
                    <label className="block text-slate-300 font-bold uppercase mb-1">Content Type</label>
                    <select
                      value={newEvent.contentType}
                      onChange={(e) => setNewEvent({ ...newEvent, contentType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                    >
                      <option value="Reels / Video">Reels / Video</option>
                      <option value="Carousel Ad">Carousel Ad</option>
                      <option value="Search Copy">Search Copy</option>
                      <option value="Blog Article">Blog Article</option>
                      <option value="Executive Post">Executive Post</option>
                      <option value="Newsletter">Newsletter</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Target Date</label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                    >
                    </input>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">Status</label>
                    <select
                      value={newEvent.status}
                      onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Review">In Review</option>
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Strategic Highlight / Note</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Budget increase to 3.5K AED/day with lookalike audiences"
                    value={newEvent.highlight}
                    onChange={(e) => setNewEvent({ ...newEvent, highlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-[#1E3458] text-white text-xs focus:outline-none focus:border-[#FF6600]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#070e1c] text-slate-400 hover:text-white border border-[#1E3458]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#FF6600] text-white font-bold hover:brightness-110 shadow-lg"
                  >
                    Add to Calendar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
