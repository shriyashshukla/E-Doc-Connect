'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If not loading and not authenticated, or if user is admin, redirect appropriately.
    if (!isLoading) {
      if (!user) {
        // Wait, the navbar auto-initializes john.doe, but if they logged out or failed, redirect home
        router.push('/');
      } else if (user.role === 'admin') {
        router.push('/admin');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50/20 min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}
