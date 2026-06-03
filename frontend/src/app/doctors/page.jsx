'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { doctorService } from '@/services/api';
import { useDebounce } from '@/hooks/useDebounce';
import DoctorCard from '@/components/doctors/DoctorCard';
import { DoctorCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { SPECIALIZATIONS } from '@/lib/constants';
import { Search, Stethoscope, SlidersHorizontal, Sparkles } from 'lucide-react';

function DoctorsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL search query initial values
  const urlSearch = searchParams.get('search') || '';
  const urlSpecialization = searchParams.get('specialization') || '';

  const [search, setSearch] = useState(urlSearch);
  const [specialization, setSpecialization] = useState(urlSpecialization);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search value
  const debouncedSearch = useDebounce(search, 300);

  // Sync URL query params with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.append('search', debouncedSearch);
    if (specialization) params.append('specialization', specialization);
    
    // Update browser URL without causing a reload
    router.replace(`/doctors?${params.toString()}`);
  }, [debouncedSearch, specialization, router]);

  // Fetch doctors on filter changes
  useEffect(() => {
    async function loadDoctors() {
      setIsLoading(true);
      try {
        const data = await doctorService.getAll(debouncedSearch, specialization);
        setDoctors(data);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDoctors();
  }, [debouncedSearch, specialization]);

  const clearFilters = () => {
    setSearch('');
    setSpecialization('');
  };

  return (
    <div className="bg-slate-50/30 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            Book with confidence
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Find Clinical Specialists
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Search, filter, and schedule consultations with double-board verified providers.
          </p>
        </div>

        {/* Filter Widget */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm mb-10 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          
          <div className="flex items-center gap-2 text-slate-700 font-bold font-heading text-sm uppercase tracking-wider pr-4 border-slate-100 lg:border-r">
            <SlidersHorizontal className="w-4.5 h-4.5 text-emerald-500" />
            <span>Filters</span>
          </div>

          {/* Name Search */}
          <div className="flex-1 relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by doctor name..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/10 border border-transparent focus:border-emerald-500 text-slate-800"
            />
          </div>

          {/* Specialization select */}
          <div className="flex-1 relative flex items-center">
            <Stethoscope className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/10 border border-transparent focus:border-emerald-500 text-slate-800 appearance-none"
            >
              <option value="">All Specializations</option>
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

          {/* Clear Button */}
          {(search || specialization) && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-sm font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          )}

        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
          </div>
        ) : doctors.length === 0 ? (
          <EmptyState
            title="No Doctors Match Your Search"
            description="Try modifying your keyword spelling, selecting another clinical specialization, or resetting your filter widgets."
            action={
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors shadow-md"
              >
                Reset Search Filters
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500" />
      </div>
    }>
      <DoctorsContent />
    </Suspense>
  );
}
