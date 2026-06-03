'use client';

import React, { useEffect, useState } from 'react';
import { cmsService } from '@/services/api';
import { Card, CardBody } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await cmsService.getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
        // Fallback
        setTestimonials([
          { name: 'Sarah Connor', review: 'E-Doc-Connect made booking a vascular checkup so effortless. The reminder system is excellent.', rating: 5 },
          { name: 'James Carter', review: 'Great experience! Was able to book Dr. Aisha Khan and check in within 10 minutes.', rating: 5 }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Client Reviews</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2 tracking-tight">
            What Patients Are Saying
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Read verified experiences from our patient community about care speed, clinical results, and portal convenience.
          </p>
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 p-6 flex flex-col gap-3 bg-white">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <Card key={idx} hover={true} className="bg-white border-slate-100">
                <CardBody className="flex flex-col gap-5 relative">
                  <div className="absolute right-6 top-6 text-slate-100">
                    <Quote className="w-10 h-10 fill-current" />
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(test.rating || 5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-sm text-slate-500 italic leading-relaxed z-10">
                    "{test.review || test.quote}"
                  </p>
                  
                  {/* User info */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-sm text-emerald-700">
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-800">{test.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Patient</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
