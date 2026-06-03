import React from 'react';
import Link from 'next/link';
import { HeartPulse, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-350 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                E-Doc<span className="text-emerald-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-450 leading-relaxed mt-2">
              E-Doc-Connect is a modern, premium healthcare booking platform designed to connect patients with top-rated medical specialists seamlessly.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-400 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-400 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-400 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-400 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/doctors" className="text-slate-400 hover:text-emerald-400 transition-colors">Find Doctors</Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-emerald-400 transition-colors">Patient Portal</Link>
              </li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-5">Our Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li>Cardiology Care</li>
              <li>Pediatric Care</li>
              <li>Gynecological Services</li>
              <li>Neurology & Spine</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-1">Contact Info</h4>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>742 Evergreen Terrace, Healthcare City, HC 89104</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>+1 (555) 019-2834</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>support@edocconnect.com</span>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} E-Doc-Connect. All rights reserved.</p>
          <div className="flex gap-6 mt-3 sm:mt-0">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
