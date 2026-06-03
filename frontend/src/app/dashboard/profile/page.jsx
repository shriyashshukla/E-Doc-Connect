'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { Card, CardBody } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { User, Phone, MapPin, Camera, Save, Mail } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const { addToast } = useToastStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: 'Male',
      address: ''
    }
  });

  // Sync form defaults with active user
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Male',
        address: user.address || ''
      });
      if (user.profileImage) {
        setPreviewUrl(`/uploads/${user.profileImage}`);
      }
    }
  }, [user, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('gender', data.gender);
      formData.append('address', data.address);
      if (selectedFile) {
        formData.append('profileImage', selectedFile);
      }

      const updated = await updateProfile(formData);
      if (updated) {
        addToast('Profile updated successfully!', 'success');
        setSelectedFile(null);
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to update profile.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-800">Edit Personal Profile</h1>
        <p className="text-slate-400 text-sm mt-1">
          Keep your medical record contact file and communication details up to date.
        </p>
      </div>

      <Card hover={false} className="bg-white border-slate-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          
          {/* Avatar Edit Wrapper */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-50">
            <div className="relative w-24 h-24 rounded-2xl bg-emerald-50 text-emerald-700 font-extrabold text-3xl flex items-center justify-center border border-slate-100 overflow-hidden shadow-inner flex-shrink-0">
              {previewUrl ? (
                <img src={previewUrl} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0) || 'P'
              )}
              
              <label className="absolute bottom-0 inset-x-0 bg-slate-900/60 text-white py-1 flex items-center justify-center cursor-pointer hover:bg-slate-900/80 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <div>
              <h3 className="font-heading font-bold text-slate-700 text-sm mb-1">Profile Picture</h3>
              <p className="text-xs text-slate-405">
                PNG, JPG, or GIF. Max 5MB file size. Standard image formatting applies.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              icon={User}
              placeholder="Your name"
              error={errors.name}
              {...register('name', { required: 'Name is required' })}
            />
            
            <Input
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="Your email"
              error={errors.email}
              {...register('email', { required: 'Email is required' })}
            />

            <Input
              label="Phone Number"
              icon={Phone}
              placeholder="+1 (555) 000-0000"
              error={errors.phone}
              {...register('phone')}
            />

            <Select
              label="Gender"
              options={['Male', 'Female', 'Other']}
              error={errors.gender}
              {...register('gender')}
            />
          </div>

          <Textarea
            label="Residential Address"
            placeholder="Street Address, City, State, Zip Code"
            error={errors.address}
            {...register('address')}
          />

          <Button
            type="submit"
            isLoading={isUpdating}
            className="gap-2 font-bold px-8 self-start mt-2"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </Button>

        </form>
      </Card>
    </div>
  );
}
