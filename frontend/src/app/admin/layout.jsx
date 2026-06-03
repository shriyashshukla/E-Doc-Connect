'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    // If auth loaded and no user or user is NOT admin, redirect
    if (!isLoading) {
      if (!user) {
        router.push('/');
      } else if (user.role !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50/20 min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}
