'use client';

import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';
import { Calendar, Clock, MapPin, FileText, AlertCircle, RefreshCw } from 'lucide-react';

export default function AppointmentCard({ appointment, onCancel, showPatient = false }) {
  const {
    _id,
    doctor,
    patient,
    appointmentDate,
    appointmentTime,
    status,
    notes
  } = appointment;

  const getStatusVariant = (s) => {
    switch (s?.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      case 'completed': return 'slate';
      default: return 'info';
    }
  };

  const isCancellable = ['pending', 'confirmed'].includes(status?.toLowerCase());

  return (
    <Card hover={true} className="bg-white border-slate-100">
      <CardBody className="p-6 flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center">
        
        {/* Detail Part */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4 items-start">
          
          {/* Avatar box */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold font-heading shadow-inner flex-shrink-0">
            {showPatient 
              ? (patient?.name?.charAt(0) || 'P') 
              : (doctor?.doctorName?.charAt(0) || 'D')}
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
            {/* Doctor/Patient Name & status */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-heading font-extrabold text-base text-slate-800">
                {showPatient 
                  ? `Patient: ${patient?.name || 'Anonymous'}` 
                  : `Dr. ${doctor?.doctorName || 'Clinical Specialist'}`}
              </h3>
              <Badge variant={getStatusVariant(status)} className="text-[9px] font-bold py-0.5 px-2">
                {status}
              </Badge>
            </div>
            
            {!showPatient && doctor?.specialization && (
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {doctor.specialization}
              </p>
            )}

            {/* Date-time row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1 text-slate-500 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{formatDate(appointmentDate)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{appointmentTime}</span>
              </div>
              {!showPatient && doctor?.hospital && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="truncate max-w-[200px]">{doctor.hospital}</span>
                </div>
              )}
            </div>

            {/* Notes */}
            {notes && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-slate-500 text-xs">
                <FileText className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed"><strong className="text-slate-700">Notes:</strong> {notes}</p>
              </div>
            )}
          </div>

        </div>

        {/* Action Button */}
        {isCancellable && onCancel && (
          <div className="flex items-center justify-end flex-shrink-0 border-t border-slate-50 pt-4 md:border-t-0 md:pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(_id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 border-slate-200 hover:border-red-200 font-bold w-full md:w-auto"
            >
              Cancel Consult
            </Button>
          </div>
        )}

      </CardBody>
    </Card>
  );
}
