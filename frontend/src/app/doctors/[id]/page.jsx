'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { doctorService, reviewService } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { useToastStore } from '@/store/useToastStore';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate } from '@/utils/formatDate';
import {
  Star,
  MapPin,
  Briefcase,
  DollarSign,
  GraduationCap,
  Building,
  Calendar,
  Clock,
  MessageSquare,
  FileText,
  AlertCircle
} from 'lucide-react';

function DoctorDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoFocusBook = searchParams.get('book') === 'true';

  const { user } = useAuthStore();
  const { bookAppointment } = useAppointmentStore();
  const { addToast } = useToastStore();

  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Booking Form State
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  // Review Form State
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Fetch Doctor & Reviews
  const loadData = async () => {
    try {
      const [docData, reviewData] = await Promise.all([
        doctorService.getById(id),
        reviewService.getByDoctorId(id)
      ]);
      setDoctor(docData);
      setReviews(reviewData);

      // Pre-select first date if available
      if (docData.availability && docData.availability.length > 0) {
        setSelectedDate(docData.availability[0].date);
      }
    } catch (err) {
      console.error('Failed to load doctor details:', err);
      addToast('Failed to load doctor details', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  // Focus booking widget if requested
  useEffect(() => {
    if (!isLoading && autoFocusBook) {
      const el = document.getElementById('booking-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isLoading, autoFocusBook]);

  // Get available slots for currently selected date
  const activeAvailability = doctor?.availability?.find(a => a.date === selectedDate);
  const timeSlots = activeAvailability?.timeSlots || [];

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please login/switch to a patient role to book.', 'warning');
      return;
    }
    if (!selectedDate || !selectedTimeSlot) {
      addToast('Please select a date and a time slot', 'warning');
      return;
    }

    setIsBooking(true);
    try {
      const appt = await bookAppointment({
        patientId: user._id,
        doctorId: doctor._id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTimeSlot,
        notes
      });
      if (appt) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsBooking(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please login/switch role to write reviews.', 'warning');
      return;
    }
    if (!reviewText.trim()) return;

    setIsSubmittingReview(true);
    try {
      await reviewService.create({
        patientId: user._id,
        doctorId: doctor._id,
        rating,
        reviewText
      });
      addToast('Review submitted successfully!', 'success');
      setReviewText('');
      setRating(5);
      // Reload reviews
      const reviewData = await reviewService.getByDoctorId(id);
      setReviews(reviewData);
    } catch (err) {
      console.error(err);
      addToast('Failed to submit review.', 'error');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Doctor Not Found</h2>
        <p className="text-slate-400 mt-1">The specialist you are looking for does not exist.</p>
        <Button className="mt-6" onClick={() => router.push('/doctors')}>
          Back to Doctors
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/30 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Columns (Doctor Profile & Reviews) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Doctor Info Card */}
            <Card hover={false} className="bg-white border-slate-100 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-emerald-400 to-teal-500/80" />
              
              <div className="px-6 pb-6 relative">
                {/* Profile Photo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-emerald-50 text-emerald-700 font-extrabold text-3xl sm:text-4xl flex items-center justify-center -mt-12 sm:-mt-14 shadow-md overflow-hidden relative">
                  {doctor.profileImage ? (
                    <img
                      src={`/uploads/${doctor.profileImage}`}
                      alt={doctor.doctorName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerText = doctor.doctorName.charAt(0);
                      }}
                    />
                  ) : (
                    doctor.doctorName.charAt(0)
                  )}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
                        {doctor.doctorName}
                      </h1>
                      <Badge variant="success" className="text-[10px] font-bold">
                        {doctor.specialization}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 font-semibold mt-1">
                      {doctor.qualification}
                    </p>
                  </div>

                  <div className="flex items-center text-amber-500 gap-1 text-sm font-bold bg-amber-50 px-3 py-1 rounded-xl self-start sm:self-auto">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.9 ({reviews.length} Verified Reviews)</span>
                  </div>
                </div>

                {/* Info row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-50 mt-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Experience</p>
                      <p className="text-sm font-bold text-slate-700">{doctor.experience} Years</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <Building className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hospital</p>
                      <p className="text-sm font-bold text-slate-700 truncate">{doctor.hospital}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Consult Fee</p>
                      <p className="text-sm font-bold text-slate-700">${doctor.consultationFee}</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6 pt-6 border-t border-slate-50">
                  <h3 className="font-heading font-extrabold text-sm text-slate-800 uppercase tracking-wider mb-2">
                    Professional Biography
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {doctor.bio}
                  </p>
                </div>

              </div>
            </Card>

            {/* Reviews list & Review writing form */}
            <Card hover={false} className="bg-white border-slate-100 p-6">
              <h2 className="font-heading text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                Patient Reviews & Feedback
              </h2>

              {/* Add review form */}
              {user && user.role !== 'admin' && (
                <form onSubmit={handleAddReview} className="mb-8 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col gap-4">
                  <h4 className="font-heading font-bold text-sm text-slate-700">Write a Review</h4>
                  
                  {/* Rating Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Your Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="text-amber-400 focus:outline-none transition-transform active:scale-125"
                        >
                          <Star className={`w-5 h-5 ${star <= rating ? 'fill-current' : 'opacity-30'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    placeholder="Describe your consultation experience, waiting times, and results..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={3}
                    className="bg-white"
                  />

                  <Button
                    type="submit"
                    isLoading={isSubmittingReview}
                    size="sm"
                    className="self-end px-6 font-bold"
                  >
                    Submit Review
                  </Button>
                </form>
              )}

              {/* Reviews Stack */}
              {reviews.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">
                  No patient reviews listed yet. Be the first to consult and leave feedback!
                </p>
              ) : (
                <div className="flex flex-col gap-6">
                  {reviews.map((rev) => (
                    <div key={rev._id} className="pb-6 border-b border-slate-100 last:border-b-0 last:pb-0 flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0">
                        {rev.patient?.name ? rev.patient.name.charAt(0) : 'P'}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-heading font-bold text-sm text-slate-800">
                            {rev.patient?.name || 'Anonymous Patient'}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {formatDate(rev.createdAt)}
                          </span>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex gap-0.5 text-amber-400 mt-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed mt-2">
                          {rev.reviewText}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

          </div>

          {/* Right Column (Booking Widget) */}
          <div className="lg:col-span-1" id="booking-card">
            <Card hover={false} className="bg-white border-slate-100 p-6 sticky top-24 shadow-lg shadow-slate-100">
              <h2 className="font-heading text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Book Consultation
              </h2>

              {doctor.availability && doctor.doctorName && doctor.availability.length > 0 ? (
                <form onSubmit={handleBook} className="flex flex-col gap-5">
                  
                  {/* Select Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-heading font-semibold text-slate-600 uppercase tracking-wider">
                      1. Choose Date
                    </label>
                    <div className="relative flex items-center">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
                      <select
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setSelectedTimeSlot(''); // reset slot
                        }}
                        className="w-full pl-11 pr-10 py-3 border border-slate-200 bg-slate-50/50 hover:bg-slate-50 rounded-xl text-sm transition-all focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 appearance-none text-slate-700 font-medium"
                      >
                        {doctor.availability.map((avail) => (
                          <option key={avail.date} value={avail.date}>
                            {formatDate(avail.date)}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 text-slate-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Select Time Slot */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading font-semibold text-slate-600 uppercase tracking-wider">
                      2. Choose Time Slot
                    </label>
                    {timeSlots.length === 0 ? (
                      <p className="text-xs text-red-500 bg-red-50/50 p-3 rounded-lg border border-red-100 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        No slots available on this date.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                                isSelected
                                  ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/10'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:border-slate-350'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <Textarea
                    label="3. Clinical Notes (Optional)"
                    placeholder="Briefly describe your symptoms or medical concern..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />

                  {/* Pricing Overview */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-500">Consultation Fee</span>
                    <span className="text-slate-800 font-extrabold text-base">${doctor.consultationFee}</span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    isLoading={isBooking}
                    disabled={!selectedDate || !selectedTimeSlot}
                    className="w-full font-bold py-3.5 text-base gap-2 rounded-xl mt-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Slots Now
                  </Button>

                </form>
              ) : (
                <p className="text-sm text-slate-400 text-center py-6">
                  This doctor has no available scheduling slots at this time.
                </p>
              )}
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function DoctorDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500" />
      </div>
    }>
      <DoctorDetailsContent />
    </Suspense>
  );
}
