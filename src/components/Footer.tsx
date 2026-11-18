'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070e1c] border-t border-[#1E3458] text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6600] to-[#FF8533] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                marketing<span className="text-[#FF6600]">.hub</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium multi-channel digital marketing engine built for high-growth UAE & GCC businesses. Real-time attribution, ROAS tracking, and bespoke growth strategies.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#FF6600]" />
              <span>Downtown Dubai, UAE</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-[#FF6600] transition-colors">
                  Executive Dashboard
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-[#FF6600] transition-colors">
                  Campaigns & ROAS
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-[#FF6600] transition-colors">
                  Content Calendar
                </Link>
              </li>
              <li>
                <Link href="/leads" className="hover:text-[#FF6600] transition-colors">
                  Leads Pipeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Channels */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">Active Channels</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0084FF]"></span>
                <span>Meta Ads (Facebook & IG)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></span>
                <span>Google Search & PMax</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                <span>SEO & Organic GCC</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2]"></span>
                <span>LinkedIn B2B Advertising</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
                <span>Email Retention Sequences</span>
              </li>
            </ul>
          </div>

          {/* Contact & Free Audit */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Get in Touch</h4>
            <p className="text-xs text-slate-400">
              Ready to scale your customer acquisition in the Emirates?
            </p>
            <div className="space-y-1.5 text-xs">
              <a href="mailto:growth@marketinghub.ae" className="flex items-center gap-2 hover:text-[#FF6600] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#FF6600]" />
                <span>growth@marketinghub.ae</span>
              </a>
              <a href="tel:+97143990000" className="flex items-center gap-2 hover:text-[#FF6600] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#FF6600]" />
                <span>+971 4 399 0000</span>
              </a>
            </div>
            <Link
              href="/#audit"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6600] hover:text-[#FF8533] pt-1"
            >
              <span>Request free audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        <div className="pt-8 border-t border-[#1E3458] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 marketing-hub. All rights reserved. Designed for UAE & GCC businesses.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Privacy Policy</span>
            <span className="text-slate-500">Terms of Service</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
