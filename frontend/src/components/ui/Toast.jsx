'use client';

import React from 'react';
import { useToastStore } from '@/store/useToastStore';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
            error: <AlertOctagon className="w-5 h-5 text-red-500" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
            info: <Info className="w-5 h-5 text-blue-500" />,
          };

          const borders = {
            success: 'border-emerald-100 bg-white shadow-emerald-100/30',
            error: 'border-red-100 bg-white shadow-red-100/30',
            warning: 'border-amber-100 bg-white shadow-amber-100/30',
            info: 'border-blue-100 bg-white shadow-blue-100/30',
          };

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border bg-white shadow-lg ${borders[toast.type]}`}
            >
              <div className="mt-0.5">{icons[toast.type]}</div>
              <div className="flex-1 text-sm font-medium text-slate-700">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
