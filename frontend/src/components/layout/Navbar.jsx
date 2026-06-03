'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { HeartPulse, User, LogOut, LayoutDashboard, Settings, ChevronDown, RefreshCw } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const pathname = usePathname();
  const { user, login, logout, initialize } = useAuthStore();
  const { addToast } = useToastStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  // Initialize auth store on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Find Doctors', href: '/doctors' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const handleRoleSwitch = async (role) => {
    const email = role === 'admin' ? 'shriyash@gmail.com' : 'john.doe@gmail.com';
    const switchedUser = await login(email);
    if (switchedUser) {
      addToast(`Switched view to ${role === 'admin' ? 'Admin' : 'Patient'} (Logged in as ${switchedUser.name})`, 'success');
    }
    setRoleSwitcherOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-xl text-slate-800 tracking-tight">
            E-Doc<span className="text-emerald-500">Connect</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-emerald-600 relative py-2',
                  isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </Link>
            );
          })}
          
          {/* Dashboard route based on role */}
          {user && (
            <Link
              href={user.role === 'admin' ? '/admin' : '/dashboard'}
              className={cn(
                'text-sm font-medium transition-colors hover:text-emerald-600 flex items-center gap-1.5 py-2',
                pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
                  ? 'text-emerald-600 font-semibold'
                  : 'text-slate-600'
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              {user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
            </Link>
          )}
        </nav>

        {/* Right Side Options */}
        <div className="flex items-center gap-4">
          {/* Mock Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-600 bg-white"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-pulse-slow" />
              <span>Role: {user?.role === 'admin' ? 'Admin' : 'Patient'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {roleSwitcherOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setRoleSwitcherOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-lg z-20">
                  <div className="px-3 py-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    Quick Role Switch
                  </div>
                  <button
                    onClick={() => handleRoleSwitch('patient')}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-between',
                      user?.role !== 'admin' ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-700'
                    )}
                  >
                    Patient View (User)
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('admin')}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-between',
                      user?.role === 'admin' ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-700'
                    )}
                  >
                    Admin View
                  </button>
                </div>
              </>
            )}
          </div>

          {/* User Profile dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm overflow-hidden">
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
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl z-20">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      href={user.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Dashboard
                    </Link>
                    {user.role !== 'admin' && (
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        Edit Profile
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                        addToast('Logged out successfully', 'info');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleRoleSwitch('patient')}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
