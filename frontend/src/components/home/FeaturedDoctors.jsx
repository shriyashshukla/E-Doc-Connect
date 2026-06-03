'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { doctorService } from '@/services/api';
import DoctorCard from '@/components/doctors/DoctorCard';
import { DoctorCardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await doctorService.getAll();
        // Take the top 3 seeded doctors for the homepage
        setDoctors(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load featured doctors:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Verified Providers
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-slate-800 tracking-tight">
              Featured Medical Specialists
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-lg">
              Connect with highly experienced, double-board certified specialists verified by our core clinics.
            </p>
          </div>
          
          <Link href="/doctors">
            <Button variant="ghost" className="gap-1.5 text-emerald-600 font-bold hover:text-emerald-700 hover:bg-emerald-50 px-4">
              View All Specialists
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Doctor Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
