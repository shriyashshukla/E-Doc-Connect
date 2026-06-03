'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Calendar, Clock, User, PlusCircle, CheckCircle, AlertCircle } from 'lucide-react';

export default function DashboardOverview() {
  const { user } = useAuthStore();
  const { appointments, fetchAppointments, cancelAppointment, isLoading } = useAppointmentStore();

  useEffect(() => {
    if (user?._id) {
      fetchAppointments({ patientId: user._id });
    }
  }, [user, fetchAppointments]);

  // Derived stats
  const total = appointments.length;
  const confirmed = appointments.filter(a => a.status === 'confirmed').length;
  const pending = appointments.filter(a => a.status === 'pending').length;

  // Find next upcoming appointment (earliest date/time that is not cancelled/completed)
  const activeAppts = appointments
    .filter(a => ['pending', 'confirmed'].includes(a.status?.toLowerCase()))
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
  
  const upcoming = activeAppts[0];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Welcome back, {user?.name || 'Patient'}
        </h1>
        <p className="text-slate-450 text-sm mt-1">
          Review your clinical status, schedule consultations, or update your personal health record file.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard
          title="Total Consults"
          value={total}
          icon={Calendar}
          color="blue"
          description="Total booking records logged"
        />
        <StatsCard
          title="Confirmed"
          value={confirmed}
          icon={CheckCircle}
          color="emerald"
          description="Scheduled active consults"
        />
        <StatsCard
          title="Pending Review"
          value={pending}
          icon={AlertCircle}
          color="amber"
          description="Awaiting clinic approval"
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upcoming consult (Left 2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card hover={false} className="bg-white border-slate-100">
            <CardHeader className="flex flex-row justify-between items-center">
              <h2 className="font-heading font-extrabold text-slate-800 text-base">Next Upcoming Consultation</h2>
              <Link href="/dashboard/appointments" className="text-xs text-emerald-500 font-bold hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardBody className="p-6">
              {isLoading ? (
                <div className="h-20 bg-slate-50 animate-pulse rounded-2xl" />
              ) : upcoming ? (
                <AppointmentCard
                  appointment={upcoming}
                  onCancel={cancelAppointment}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm mb-4">You have no upcoming appointments scheduled.</p>
                  <Link href="/doctors">
                    <Button size="sm" className="gap-1.5 font-bold">
                      <PlusCircle className="w-4 h-4" />
                      Find & Book a Doctor
                    </Button>
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions (Right 1 col) */}
        <div className="lg:col-span-1">
          <Card hover={false} className="bg-white border-slate-100 p-6 flex flex-col gap-5 h-full">
            <h2 className="font-heading font-extrabold text-slate-800 text-base border-b border-slate-50 pb-4">
              Quick Shortcuts
            </h2>
            
            <div className="flex flex-col gap-3">
              <Link href="/doctors" className="w-full">
                <Button className="w-full justify-start gap-3 font-bold" variant="outline">
                  <PlusCircle className="w-5 h-5 text-emerald-500" />
                  <span>Book New Slot</span>
                </Button>
              </Link>
              
              <Link href="/dashboard/profile" className="w-full">
                <Button className="w-full justify-start gap-3 font-bold" variant="outline">
                  <User className="w-5 h-5 text-emerald-500" />
                  <span>Edit Profile</span>
                </Button>
              </Link>

              <Link href="/contact" className="w-full">
                <Button className="w-full justify-start gap-3 font-bold" variant="outline">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <span>Clinic Support</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
