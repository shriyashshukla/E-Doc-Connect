'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import {
  LayoutDashboard,
  Stethoscope,
  Calendar,
  Users,
  FileText,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { cn } from '@/utils/cn';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { addToast } = useToastStore();

  const menuItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Manage Doctors', href: '/admin/doctors', icon: Stethoscope },
    { label: 'All Appointments', href: '/admin/appointments', icon: Calendar },
    { label: 'Patient Directory', href: '/admin/patients', icon: Users },
    { label: 'CMS & Inquiries', href: '/admin/cms', icon: FileText },
  ];

  return (
    <aside className="w-full lg:w-64 border-r border-slate-100 bg-white flex-shrink-0 flex flex-col min-h-[calc(100vh-4rem)]">
      
      {/* Mini Profile Header */}
      {user && (
        <div className="p-6 border-b border-slate-50 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-lg overflow-hidden shadow-inner flex-shrink-0">
            {user.profileImage ? (
              <img
                src={`/uploads/${user.profileImage}`}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerText = user.name.charAt(0);
                }}
              />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-heading font-extrabold text-sm text-slate-800 truncate">{user.name}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Administrator</p>
          </div>
        </div>
      )}

      {/* Nav Menu */}
      <nav className="flex-1 p-4 flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                isActive
                  ? 'bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-500/5'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-emerald-500' : 'text-slate-400')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Log out */}
      <div className="p-4 border-t border-slate-50">
        <button
          onClick={() => {
            logout();
            addToast('Logged out successfully', 'info');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-650 hover:bg-red-50 hover:text-red-750 transition-colors text-left"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
}
