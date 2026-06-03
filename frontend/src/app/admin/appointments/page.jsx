'use client';

import React, { useEffect, useState } from 'react';
import { appointmentService } from '@/services/api';
import { useToastStore } from '@/store/useToastStore';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/utils/formatDate';
import { Calendar, Clock, User, Stethoscope, Check, X, ShieldAlert, Award } from 'lucide-react';

export default function AdminAppointmentsPage() {
  const { addToast } = useToastStore();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await appointmentService.getAll();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      addToast('Failed to load appointments list', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await appointmentService.updateStatus(id, status);
      addToast(`Appointment status updated to ${status}!`, 'success');
      loadAppointments();
    } catch (err) {
      console.error(err);
      addToast('Failed to update status', 'error');
    }
  };

  const getStatusVariant = (s) => {
    switch (s?.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      case 'completed': return 'slate';
      default: return 'info';
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    if (filterStatus === 'all') return true;
    return appt.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  const filterTabs = [
    { label: 'All Slots', value: 'all' },
    { label: 'Pending Approval', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-800">Clinical Booking Calendar</h1>
        <p className="text-slate-400 text-sm mt-1">
          Review patient scheduling queues, confirm timeslots, or cancel consult registrations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-2">
        {filterTabs.map((tab) => {
          const isActive = filterStatus === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="h-28 bg-slate-50 animate-pulse rounded-2xl" />
          <div className="h-28 bg-slate-50 animate-pulse rounded-2xl" />
        </div>
      ) : filteredAppointments.length === 0 ? (
        <EmptyState
          title="No Appointments Found"
          description={`There are no system booking records logged with status "${filterStatus}" currently.`}
          icon={Calendar}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredAppointments.map((appt) => {
            const isPending = appt.status === 'pending';
            const isConfirmed = appt.status === 'confirmed';

            return (
              <Card key={appt._id} hover={false} className="bg-white border-slate-100 p-6">
                <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center">
                  
                  {/* Info Column */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <Badge variant={getStatusVariant(appt.status)} className="text-[9px] font-bold">
                        {appt.status}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Booking ID: {appt._id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-3">
                      {/* Patient */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          {appt.patient?.name?.charAt(0) || 'P'}
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Patient</p>
                          <p className="font-bold text-slate-800">{appt.patient?.name || 'Anonymous'}</p>
                        </div>
                      </div>

                      {/* Doctor */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                          {appt.doctor?.doctorName?.charAt(0) || 'D'}
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Clinical Specialist</p>
                          <p className="font-bold text-slate-800">Dr. {appt.doctor?.doctorName || 'Unknown'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Date time */}
                    <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold text-slate-500 border-t border-slate-50 pt-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Date: {formatDate(appt.appointmentDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>Time: {appt.appointmentTime}</span>
                      </div>
                    </div>

                    {appt.notes && (
                      <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-550">
                        <strong>Patient Note: </strong> {appt.notes}
                      </div>
                    )}

                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center justify-end gap-2 border-t border-slate-50 pt-4 lg:border-t-0 lg:pt-0 flex-shrink-0">
                    {isPending && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                          className="text-red-500 hover:bg-red-50 border-slate-200 hover:border-red-200 gap-1.5 font-bold"
                        >
                          <X className="w-4 h-4" /> Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(appt._id, 'confirmed')}
                          className="gap-1.5 font-bold"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </Button>
                      </>
                    )}
                    
                    {isConfirmed && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                          className="text-red-500 hover:bg-red-50 border-slate-200 hover:border-red-200 gap-1.5 font-bold"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(appt._id, 'completed')}
                          className="bg-slate-700 hover:bg-slate-800 text-white gap-1.5 font-bold"
                        >
                          <Award className="w-4 h-4" /> Complete
                        </Button>
                      </>
                    )}
                  </div>

                </div>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}
