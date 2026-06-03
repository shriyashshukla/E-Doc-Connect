'use client';

import React, { useEffect, useState } from 'react';
import { cmsService } from '@/services/api';
import { Card, CardBody } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Heart, Baby, Brain, Sparkles, Activity, ShieldAlert, Award, Stethoscope } from 'lucide-react';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await cmsService.getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
        // Fallback static list
        setServices([
          { title: 'Cardiology Care', description: 'Comprehensive cardiac testing, preventative checkups, and vascular consults.', icon: 'Heart' },
          { title: 'Pediatric Care', description: 'Nurturing healthcare services for children, infant checkups, and vaccinations.', icon: 'Baby' },
          { title: 'Neurology consults', description: 'Advanced diagnostics and treatment plans for neurological conditions.', icon: 'Brain' },
          { title: 'Dermatological Treatment', description: 'Clinical skin therapy, acne treatments, and melanoma screenings.', icon: 'Sparkles' }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    loadServices();
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      Heart: <Heart className="w-6 h-6" />,
      Baby: <Baby className="w-6 h-6" />,
      Brain: <Brain className="w-6 h-6" />,
      Sparkles: <Sparkles className="w-6 h-6" />,
      Activity: <Activity className="w-6 h-6" />,
      Award: <Award className="w-6 h-6" />,
    };
    return icons[iconName] || <Stethoscope className="w-6 h-6" />;
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Core Capabilities</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2 tracking-tight">
            Comprehensive Medical Services
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Access world-class medical departments staffed by certified, highly trained physicians and practitioners.
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 p-6 flex flex-col gap-3 bg-slate-50/20">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-14 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} hover={true} className="border-slate-100 bg-slate-50/10">
                <CardBody className="flex flex-col gap-4">
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                    {getIcon(service.icon || service.title.split(' ')[0])}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-slate-800 mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
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
