import React from 'react';
import ContactSection from '@/components/home/ContactSection';

export const metadata = {
  title: 'Contact Us — E-Doc-Connect',
  description: 'Reach out to our clinical customer service and technical support teams. We answer all inquiries within 24 hours.',
};

export default function ContactPage() {
  return (
    <div className="pt-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 text-center mb-4">
        <h1 className="font-heading text-4xl font-extrabold text-slate-800 tracking-tight">
          We'd Love to Hear From You
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
          Need help booking a consultation, updating a doctor profile, or configuring administrative variables? Send us a message!
        </p>
      </div>
      <ContactSection />
    </div>
  );
}
