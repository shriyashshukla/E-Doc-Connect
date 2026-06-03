import React from 'react';
import { cn } from '@/utils/cn';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-200/80', className)}
      {...props}
    />
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 bg-white">
      <div className="flex gap-4 items-center">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-xl" />
      <div className="flex justify-between items-center mt-2 border-t border-slate-50 pt-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}
