import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

export default function StatsCard({ title, value, icon: Icon, description, color = 'emerald' }) {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <Card hover={false} className="bg-white border-slate-100">
      <CardBody className="flex items-center gap-5 p-6">
        <div className={cn('w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 shadow-inner', colorMap[color])}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{title}</p>
          <h3 className="font-heading font-extrabold text-2xl text-slate-800 mt-1 leading-none">{value}</h3>
          {description && <p className="text-xs text-slate-400 mt-1.5">{description}</p>}
        </div>
      </CardBody>
    </Card>
  );
}
