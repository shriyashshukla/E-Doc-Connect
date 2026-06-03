import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className,
  wrapperClassName,
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', wrapperClassName)}>
      {label && (
        <label className="text-xs font-heading font-semibold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10',
            Icon && 'pl-11',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500/10 bg-red-50/10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(({
  label,
  error,
  className,
  wrapperClassName,
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', wrapperClassName)}>
      {label && (
        <label className="text-xs font-heading font-semibold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/10 bg-red-50/10',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
