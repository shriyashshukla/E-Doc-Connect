import React from 'react';
import { cn } from '@/utils/cn';

export function EmptyState({
  title = 'No records found',
  description = 'There are no items to display at this time.',
  icon: Icon,
  action,
  className
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/20 max-w-lg mx-auto my-6', className)}>
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
        {Icon ? (
          <Icon className="w-8 h-8" />
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <h3 className="font-heading font-bold text-lg text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
