'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { SPECIALIZATIONS, TIME_SLOTS } from '@/lib/constants';
import { useToastStore } from '@/store/useToastStore';
import { Plus, X, Calendar, Clock, Trash } from 'lucide-react';

export default function DoctorForm({ doctor, onSubmitSuccess, onClose }) {
  const { addToast } = useToastStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Availability state
  const [availabilities, setAvailabilities] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [newSlots, setNewSlots] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      doctorName: '',
      specialization: '',
      qualification: '',
      experience: 1,
      consultationFee: 50,
      hospital: '',
      bio: ''
    }
  });

  // Populate form if editing
  useEffect(() => {
    if (doctor) {
      reset({
        doctorName: doctor.doctorName || '',
        specialization: doctor.specialization || '',
        qualification: doctor.qualification || '',
        experience: doctor.experience || 1,
        consultationFee: doctor.consultationFee || 50,
        hospital: doctor.hospital || '',
        bio: doctor.bio || ''
      });
      setAvailabilities(doctor.availability || []);
      if (doctor.profileImage) {
        setPreviewUrl(`/uploads/${doctor.profileImage}`);
      }
    } else {
      // Default availability for a new doctor to make it easy
      const todayStr = new Date().toISOString().split('T')[0];
      setAvailabilities([
        { date: todayStr, timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] }
      ]);
    }
  }, [doctor, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleSlotSelection = (slot) => {
    if (newSlots.includes(slot)) {
      setNewSlots(newSlots.filter(s => s !== slot));
    } else {
      setNewSlots([...newSlots, slot]);
    }
  };

  const addAvailabilityDate = () => {
    if (!newDate) {
      addToast('Please select a date', 'warning');
      return;
    }
    if (newSlots.length === 0) {
      addToast('Please select at least one time slot', 'warning');
      return;
    }

    // Check if date already exists
    if (availabilities.some(a => a.date === newDate)) {
      addToast('Availability for this date already exists. Remove it first to update.', 'warning');
      return;
    }

    setAvailabilities([...availabilities, { date: newDate, timeSlots: newSlots }]);
    setNewDate('');
    setNewSlots([]);
    addToast('Availability slot added!', 'success');
  };

  const removeAvailabilityDate = (date) => {
    setAvailabilities(availabilities.filter(a => a.date !== date));
  };

  const onFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('doctorName', data.doctorName);
      formData.append('specialization', data.specialization);
      formData.append('qualification', data.qualification);
      formData.append('experience', Number(data.experience));
      formData.append('consultationFee', Number(data.consultationFee));
      formData.append('hospital', data.hospital);
      formData.append('bio', data.bio);
      formData.append('availability', JSON.stringify(availabilities));
      
      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      }

      await onSubmitSuccess(formData);
    } catch (err) {
      console.error(err);
      addToast('Failed to save doctor record', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-6">
      
      {/* Photo upload */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div className="w-16 h-16 rounded-xl bg-slate-200 border overflow-hidden flex items-center justify-center flex-shrink-0 text-slate-400 font-extrabold text-xl relative">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            'D'
          )}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-xs font-heading font-semibold text-slate-700">Doctor Profile Photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
          />
        </div>
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Doctor Name"
          placeholder="e.g. Dr. Aisha Khan"
          error={errors.doctorName}
          {...register('doctorName', { required: 'Doctor name is required' })}
        />

        <Select
          label="Specialization"
          options={SPECIALIZATIONS}
          placeholder="Choose specialization"
          error={errors.specialization}
          {...register('specialization', { required: 'Specialization is required' })}
        />

        <Input
          label="Qualification"
          placeholder="e.g. MBBS, MD (Cardiology)"
          error={errors.qualification}
          {...register('qualification', { required: 'Qualification is required' })}
        />

        <Input
          label="Hospital Name"
          placeholder="e.g. Metro Cardiac Institute"
          error={errors.hospital}
          {...register('hospital', { required: 'Hospital is required' })}
        />

        <Input
          label="Years Experience"
          type="number"
          error={errors.experience}
          {...register('experience', {
            required: 'Experience is required',
            min: { value: 0, message: 'Cannot be negative' }
          })}
        />

        <Input
          label="Consultation Fee ($)"
          type="number"
          error={errors.consultationFee}
          {...register('consultationFee', {
            required: 'Fee is required',
            min: { value: 0, message: 'Cannot be negative' }
          })}
        />
      </div>

      <Textarea
        label="Professional Bio"
        placeholder="Brief description about doctor specialty history..."
        error={errors.bio}
        {...register('bio')}
      />

      {/* Availability Builder */}
      <div className="border-t border-slate-100 pt-6">
        <h4 className="font-heading font-extrabold text-slate-800 text-sm mb-4">Manage Availability Slots</h4>

        {/* Builder Inputs */}
        <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-600">Select Date</span>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="px-3 py-2 border rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-600">Select Time Slots</span>
            <div className="flex flex-wrap gap-1.5">
              {TIME_SLOTS.map((slot) => {
                const isSelected = newSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleSlotSelection(slot)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAvailabilityDate}
            className="self-start gap-1 font-bold border-slate-300"
          >
            <Plus className="w-4 h-4" /> Add Date slots
          </Button>
        </div>

        {/* Display Current Availabilities */}
        <div className="flex flex-col gap-2 mt-4 max-h-48 overflow-y-auto">
          {availabilities.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No availability slots added yet.</p>
          ) : (
            availabilities.map((avail) => (
              <div key={avail.date} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 text-xs bg-slate-50/50">
                <div>
                  <strong className="text-slate-700">{avail.date}</strong>
                  <div className="flex flex-wrap gap-1 mt-1 text-slate-550 font-semibold">
                    {avail.timeSlots.map(ts => (
                      <span key={ts} className="bg-slate-100 px-2 py-0.5 rounded">
                        {ts}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAvailabilityDate(avail.date)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={onClose} className="font-bold">
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting} className="px-8 font-bold">
          Save Doctor Profile
        </Button>
      </div>

    </form>
  );
}
