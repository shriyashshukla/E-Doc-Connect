import React from 'react';
import { cn } from '@/utils/cn';

export function Card({ children, className, hover = true, glass = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        glass 
          ? 'bg-white/70 backdrop-blur-lg border-white/40 shadow-sm'
          : 'bg-white border-slate-100 shadow-card',
        hover && 'hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-5 border-b border-slate-100/80', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 bg-slate-50/50 border-t border-slate-100/80 rounded-b-2xl', className)} {...props}>
      {children}
    </div>
  );
}
