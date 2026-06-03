'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Star, ShieldCheck, MapPin, Briefcase, DollarSign } from 'lucide-react';

export default function DoctorCard({ doctor }) {
  const {
    _id,
    doctorName,
    specialization,
    experience,
    qualification,
    hospital,
    consultationFee,
    profileImage
  } = doctor;

  return (
    <Card className="flex flex-col h-full bg-white">
      <CardBody className="flex-1 flex flex-col gap-4">
        {/* Top Section: Avatar & Info */}
        <div className="flex gap-4 items-start">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-slate-100 flex items-center justify-center text-emerald-700 font-bold font-heading text-xl sm:text-2xl overflow-hidden flex-shrink-0 relative shadow-inner">
            {profileImage ? (
              <img
                src={`/uploads/${profileImage}`}
                alt={doctorName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerText = doctorName.charAt(0);
                }}
              />
            ) : (
              doctorName.charAt(0)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant="success" className="text-[10px] font-bold">
                {specialization}
              </Badge>
              <div className="flex items-center text-amber-500 gap-0.5 text-xs font-bold ml-auto">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>4.9</span>
              </div>
            </div>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-800 mt-1 truncate hover:text-emerald-600 transition-colors">
              <Link href={`/doctors/${_id}`}>{doctorName}</Link>
            </h3>
            <p className="text-xs text-slate-400 font-semibold truncate mt-0.5">
              {qualification}
            </p>
          </div>
        </div>

        {/* Doctor Details info list */}
        <div className="flex flex-col gap-2.5 py-3 border-y border-slate-50 text-slate-500 text-xs font-medium">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>{experience} Years Professional Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="truncate">{hospital}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-slate-700 font-bold">${consultationFee} Consultation Fee</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-4">
          <Link href={`/doctors/${_id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full font-bold">
              View Profile
            </Button>
          </Link>
          <Link href={`/doctors/${_id}?book=true`} className="w-full">
            <Button size="sm" className="w-full font-bold">
              Book Appointment
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
