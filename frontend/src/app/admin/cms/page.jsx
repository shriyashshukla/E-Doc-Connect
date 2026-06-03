'use client';

import React, { useEffect, useState } from 'react';
import { contactService, cmsService } from '@/services/api';
import { useToastStore } from '@/store/useToastStore';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/utils/formatDate';
import { FileText, Trash2, Mail, MessageSquare, Award, HelpCircle, ArrowRight } from 'lucide-react';

export default function AdminCmsPage() {
  const { addToast } = useToastStore();
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inquiries');

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [contactData, serviceData, testimonialData] = await Promise.all([
        contactService.getAll(),
        cmsService.getServices(),
        cmsService.getTestimonials()
      ]);
      setContacts(contactData);
      setServices(serviceData);
      setTestimonials(testimonialData);
    } catch (err) {
      console.error(err);
      addToast('Failed to load CMS data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }
    try {
      await contactService.delete(id);
      addToast('Inquiry resolved and removed successfully!', 'success');
      loadAllData();
    } catch (err) {
      console.error(err);
      addToast('Failed to delete inquiry', 'error');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-800">CMS & Inquiry Management</h1>
        <p className="text-slate-400 text-sm mt-1">
          Review support inquiries, inspect homepage services, and moderate testimonials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'inquiries' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Support Inquiries ({contacts.length})
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'services' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Homepage Services ({services.length})
        </button>
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'testimonials' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Patient Testimonials ({testimonials.length})
        </button>
      </div>

      {/* Content tabs */}
      {isLoading ? (
        <div className="h-48 bg-slate-50 animate-pulse rounded-2xl" />
      ) : activeTab === 'inquiries' ? (
        contacts.length === 0 ? (
          <EmptyState
            title="All Clear!"
            description="You have no pending support tickets or customer contact form submissions."
            icon={Mail}
          />
        ) : (
          <div className="flex flex-col gap-4 font-medium text-slate-700">
            {contacts.map((c) => (
              <Card key={c._id} hover={false} className="bg-white border-slate-100 p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Submitted: {formatDate(c.createdAt)}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-base text-slate-800">
                      Subject: {c.subject}
                    </h3>
                    
                    <div className="flex gap-4 text-xs font-semibold text-slate-400 mt-1">
                      <span>Name: <strong className="text-slate-650">{c.name}</strong></span>
                      <span>Email: <strong className="text-slate-650">{c.email}</strong></span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-2xl mt-4">
                      {c.message}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteInquiry(c._id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )
      ) : activeTab === 'services' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s, idx) => (
            <Card key={idx} hover={false} className="bg-white border-slate-100 p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-800">{s.title}</h3>
                <p className="text-xs text-slate-450 leading-relaxed mt-2">{s.description}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} hover={false} className="bg-white border-slate-100 p-6">
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(t.rating || 5)].map((_, star) => (
                  <MessageSquare key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic">"{t.review || t.quote}"</p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-xs text-emerald-700">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-850">{t.name}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Verified Contributor</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
