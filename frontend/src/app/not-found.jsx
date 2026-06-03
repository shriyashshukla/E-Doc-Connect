'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-slate-50/20">
      <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mb-6 shadow-inner animate-bounce-short">
        <AlertCircle className="w-10 h-10" />
      </div>
      
      <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight mb-2">
        Page Not Found
      </h1>
      
      <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        The page you are trying to reach doesn't exist, has been removed, or moved to another URL routing address.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/">
          <Button className="gap-2 font-bold shadow-md shadow-emerald-500/10">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center font-heading font-medium rounded-xl transition-all duration-200 border-2 border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 text-sm gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
