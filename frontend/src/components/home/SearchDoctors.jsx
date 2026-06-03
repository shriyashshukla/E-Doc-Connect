'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SPECIALIZATIONS } from '@/lib/constants';

export default function SearchDoctors() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (specialization) params.append('specialization', specialization);
    
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-6 -mt-8 z-10">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-stretch"
      >
        {/* Search input */}
        <div className="flex-1 relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctors by name..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-xl sm:rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/10 border border-transparent focus:border-emerald-500 text-slate-800"
          />
        </div>

        {/* Specialization selector */}
        <div className="flex-1 relative flex items-center">
          <Stethoscope className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-xl sm:rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/10 border border-transparent focus:border-emerald-500 text-slate-800 appearance-none"
          >
            <option value="">Select Specialization</option>
            {SPECIALIZATIONS.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <div className="absolute right-4 text-slate-400 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Search button */}
        <Button
          type="submit"
          className="px-8 py-3.5 rounded-xl sm:rounded-2xl gap-2 font-bold shadow-md shadow-emerald-500/10"
        >
          <Search className="w-4 h-4" />
          Search
        </Button>
      </form>
    </div>
  );
}
