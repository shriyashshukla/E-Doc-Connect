'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Calendar } from 'lucide-react';

export default function AppointmentsPage() {
  const { user } = useAuthStore();
  const { appointments, fetchAppointments, cancelAppointment, isLoading } = useAppointmentStore();
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (user?._id) {
      fetchAppointments({ patientId: user._id });
    }
  }, [user, fetchAppointments]);

  // Filter based on selected state
  const filteredAppointments = appointments.filter(appt => {
    if (filterStatus === 'all') return true;
    return appt.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  const statuses = [
    { label: 'All Bookings', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-800">My Consultations</h1>
        <p className="text-slate-400 text-sm mt-1">
          Track clinical statuses, download receipts, or cancel scheduled appointments.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-2">
        {statuses.map((tab) => {
          const isActive = filterStatus === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* List Container */}
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-50 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredAppointments.length === 0 ? (
        <EmptyState
          title="No Appointments Found"
          description={
            filterStatus === 'all'
              ? 'You have not booked any consultations yet. Find a doctor to get started.'
              : `You have no appointments with status "${filterStatus}" at this time.`
          }
          icon={Calendar}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredAppointments.map((appt) => (
            <AppointmentCard
              key={appt._id}
              appointment={appt}
              onCancel={cancelAppointment}
            />
          ))}
        </div>
      )}

    </div>
  );
}
