import React from 'react';
import { cn } from '@/utils/cn';

export function Badge({ children, variant = 'info', className, ...props }) {
  const baseStyles = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider';
  
  const variants = {
    info: 'bg-blue-50 text-blue-700 border border-blue-100',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    danger: 'bg-red-50 text-red-700 border border-red-100',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
