'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Calendar, Shield, Award, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-pattern py-12 md:py-20 lg:py-24">
      {/* Background radial gradients for glassmorphism vibes */}
      <div className="absolute top-0 right-0 -z-10 w-[40rem] h-[40rem] rounded-full bg-emerald-100/30 blur-3xl" />
      <div className="absolute bottom-0 left-12 -z-10 w-[30rem] h-[30rem] rounded-full bg-teal-100/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider self-start">
            <Shield className="w-3.5 h-3.5" />
            100% Certified & Verified Medical Specialists
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-[1.1]">
            Your Health, <br />
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Priority Connection</span>
          </h1>

          <p className="text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed">
            Find the right doctor and book verified appointments in minutes. No phone queues, no waiting lines. Manage all your consults and prescription history in one secure, premium space.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <Link href="/doctors">
              <Button size="lg" className="gap-2 shadow-lg shadow-emerald-500/20">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Clinics
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 mt-4">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-800">10k+</span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Happy Patients</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-800">150+</span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Expert Doctors</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-800">12+</span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Specialties</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side Image Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center"
        >
          {/* Decorative glowing blob */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-3xl filter blur-xl -z-10 animate-pulse-slow" />
          
          {/* Styled Image Frame */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-slate-200 max-w-md w-full aspect-[4/5] bg-slate-100">
            <img
              src="/hero_doctor_banner.png"
              alt="E-Doc-Connect Hero Doctor"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Float badge 1 */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md border border-white/50 p-4 rounded-2xl shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Top Rated Clinic</p>
                <p className="text-sm font-bold text-slate-800">Quality Care Guaranteed</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
