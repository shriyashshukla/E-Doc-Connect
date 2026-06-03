'use client';

import React, { useEffect, useState } from 'react';
import { cmsService } from '@/services/api';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await cmsService.getFaqs();
        setFaqs(data);
      } catch (err) {
        console.error('Failed to load FAQs:', err);
        setFaqs([
          { question: 'How do I schedule an appointment?', answer: 'Search for a doctor on our homepage, filter by specialty, click "Book Appointment", select your date and time slot, add any clinical notes, and click confirm.' },
          { question: 'Can I cancel or reschedule my booking?', answer: 'Yes! Simply navigate to "My Dashboard", go to "Appointments", and click "Cancel". Rescheduling can be done by booking a new slot.' },
          { question: 'Is there a consultation fee?', answer: 'Yes, each doctor specifies their consultation fee which is listed directly on their profile cards and detail pages.' }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    loadFaqs();
  }, []);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Support FAQ</span>
          <h2 className="font-heading text-3xl font-extrabold text-slate-800 mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Find immediate answers regarding bookings, cancellations, dashboard settings, and clinical rules.
          </p>
        </div>

        {/* FAQs Accordion */}
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen 
                      ? 'border-emerald-100 bg-emerald-50/10 shadow-sm' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-bold text-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span className="font-heading text-base">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-550 text-sm leading-relaxed border-t border-slate-100/50 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
