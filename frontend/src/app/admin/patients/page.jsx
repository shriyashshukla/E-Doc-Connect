'use client';

import React, { useEffect, useState } from 'react';
import { userService } from '@/services/api';
import { useDebounce } from '@/hooks/useDebounce';
import { Card, CardBody } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToastStore } from '@/store/useToastStore';
import { Users, Search, Phone, Mail, MapPin, Award } from 'lucide-react';

export default function PatientDirectoryPage() {
  const { addToast } = useToastStore();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    async function loadPatients() {
      setIsLoading(true);
      try {
        const data = await userService.getAll(debouncedSearch, 'user');
        setPatients(data);
      } catch (err) {
        console.error(err);
        addToast('Failed to fetch patient directory records', 'error');
      } finally {
        setIsLoading(false);
      }
    }
    loadPatients();
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-800">Patient Directory</h1>
        <p className="text-slate-400 text-sm mt-1">
          Browse patient profiles, verify email communication files, and view contact records.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl shadow-sm max-w-md w-full">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter patients by name or email..."
          className="w-full pl-12 pr-4 py-3 bg-transparent rounded-2xl text-sm transition-all focus:outline-none text-slate-800"
        />
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-44 rounded-2xl animate-pulse" />
          <Skeleton className="h-44 rounded-2xl animate-pulse" />
        </div>
      ) : patients.length === 0 ? (
        <EmptyState
          title="No Patients Registered"
          description="There are no user profiles registered in the directory matching these terms."
          icon={Users}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-medium text-slate-700">
          {patients.map((pat) => (
            <Card key={pat._id} hover={true} className="bg-white border-slate-100 p-6 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center overflow-hidden border border-slate-100">
                    {pat.profileImage ? (
                      <img
                        src={`/uploads/${pat.profileImage}`}
                        alt={pat.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerText = pat.name.charAt(0);
                        }}
                      />
                    ) : (
                      pat.name?.charAt(0) || 'P'
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-slate-800">{pat.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gender: {pat.gender || 'Not specified'}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{pat.email}</span>
                  </div>
                  {pat.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{pat.phone}</span>
                    </div>
                  )}
                  {pat.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed truncate max-w-[220px]">{pat.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-slate-50 text-[9px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                <span>Joined</span>
                <span>{new Date(pat.createdAt).toLocaleDateString()}</span>
              </div>

            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
