import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Select an option',
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
        <select
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 appearance-none',
            Icon && 'pl-11',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500/10 bg-red-50/10',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const isObj = typeof opt === 'object' && opt !== null;
            const value = isObj ? opt.value : opt;
            const labelText = isObj ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {labelText}
              </option>
            );
          })}
        </select>
        <div className="absolute right-4 text-slate-400 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';
