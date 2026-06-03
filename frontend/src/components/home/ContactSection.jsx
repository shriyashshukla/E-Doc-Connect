'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { contactService } from '@/services/api';
import { useToastStore } from '@/store/useToastStore';
import { Card, CardBody } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

export default function ContactSection() {
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      await contactService.create(data);
      addToast('Message sent successfully! We will get back to you shortly.', 'success');
      reset();
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.error || 'Failed to send message. Please try again.', 'error');
    }
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Get In Touch</span>
          <h2 className="font-heading text-3xl font-extrabold text-slate-800 mt-2 tracking-tight">
            Contact Our Support Team
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Have questions about clinical slots, doctors, or admin access? Fill out the contact form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Info Card (Left 1 col) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Card hover={false} className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-6 border-transparent shadow-xl">
              <h3 className="font-heading text-xl font-bold text-white mb-6">Clinic Information</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-200">Our Location</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      742 Evergreen Terrace, Healthcare City, HC 89104
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-200">Phone Support</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      +1 (555) 019-2834
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-200">Email Inquiries</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      support@edocconnect.com
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Card (Right 2 cols) */}
          <div className="lg:col-span-2">
            <Card hover={false} className="bg-white border-slate-100 p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Your Name"
                    placeholder="Enter your name"
                    error={errors.name}
                    {...register('name', { required: 'Name is required' })}
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    error={errors.email}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="What is this regarding?"
                  error={errors.subject}
                  {...register('subject', { required: 'Subject is required' })}
                />

                <Textarea
                  label="Message Description"
                  placeholder="Write your message here..."
                  error={errors.message}
                  {...register('message', { required: 'Message content is required' })}
                />

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="gap-2 font-bold self-start mt-2 px-8"
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </Button>
              </form>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
}
