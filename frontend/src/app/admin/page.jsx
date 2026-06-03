'use client';

import React, { useEffect, useState } from 'react';
import { cmsService } from '@/services/api';
import StatsCard from '@/components/dashboard/StatsCard';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Users, Stethoscope, Calendar, Mail, BarChart2, PieChart as PieIcon, Activity } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadStats() {
      try {
        const data = await cmsService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#64748b'];

  if (isLoading || !stats) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">Admin Control Center</h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor system metrics, doctor availability, appointment statuses, and message inquiries.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="blue"
          description="Registered patients"
        />
        <StatsCard
          title="Active Doctors"
          value={stats.totalDoctors}
          icon={Stethoscope}
          color="emerald"
          description="Verified specialists"
        />
        <StatsCard
          title="Total Consults"
          value={stats.totalAppointments}
          icon={Calendar}
          color="amber"
          description="All appointments logged"
        />
        <StatsCard
          title="Support Inquiries"
          value={stats.totalContacts}
          icon={Mail}
          color="red"
          description="Messages received"
        />
      </div>

      {/* Charts (Render only on client) */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart: Specializations */}
          <Card hover={false} className="bg-white border-slate-100 p-6">
            <h3 className="font-heading font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-500" />
              Specialization Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.specialtyDistribution}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart: Statuses */}
          <Card hover={false} className="bg-white border-slate-100 p-6">
            <h3 className="font-heading font-extrabold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-emerald-500" />
              Appointment Status Breakdown
            </h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.appointmentStatusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {stats.appointmentStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Activity Info */}
      <Card hover={false} className="bg-white border-slate-100 p-6">
        <h3 className="font-heading font-extrabold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          Queue Distribution Statistics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending Approval</p>
            <p className="text-xl font-extrabold text-slate-800 mt-1">{stats.pendingAppointments}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Confirmed Slots</p>
            <p className="text-xl font-extrabold text-slate-800 mt-1">{stats.confirmedAppointments}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Cancelled Slots</p>
            <p className="text-xl font-extrabold text-slate-800 mt-1">{stats.cancelledAppointments}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Feedback Logs</p>
            <p className="text-xl font-extrabold text-slate-800 mt-1">{stats.totalReviews}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
