'use client';

import React, { useEffect, useState } from 'react';
import { doctorService } from '@/services/api';
import { useToastStore } from '@/store/useToastStore';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import DoctorForm from '@/components/admin/DoctorForm';
import { Plus, Edit2, Trash2, Search, Stethoscope, Sparkles } from 'lucide-react';

export default function ManageDoctorsPage() {
  const { addToast } = useToastStore();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const loadDoctors = async () => {
    setIsLoading(true);
    try {
      const data = await doctorService.getAll();
      setDoctors(data);
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch doctor records', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleCreate = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor record? All associated bookings may be orphaned.')) {
      return;
    }

    try {
      await doctorService.delete(id);
      addToast('Doctor deleted successfully!', 'success');
      loadDoctors();
    } catch (err) {
      console.error(err);
      addToast('Failed to delete doctor', 'error');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingDoctor) {
        // Update
        await doctorService.update(editingDoctor._id, formData);
        addToast('Doctor details updated successfully!', 'success');
      } else {
        // Create
        await doctorService.create(formData);
        addToast('New doctor added successfully!', 'success');
      }
      setIsModalOpen(false);
      loadDoctors();
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.error || 'Failed to save doctor record', 'error');
    }
  };

  // Filter doctors list
  const filteredDoctors = doctors.filter(doc =>
    doc.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-800">Manage Doctor Records</h1>
          <p className="text-slate-400 text-sm mt-1">
            Add new specialists, edit clinical profiles, or configure available dates.
          </p>
        </div>
        
        <Button onClick={handleCreate} className="gap-2 font-bold shadow-md shadow-emerald-500/10">
          <Plus className="w-5 h-5" />
          Add New Doctor
        </Button>
      </div>

      {/* Filter widgets */}
      <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl shadow-sm max-w-md w-full">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name or specialty..."
          className="w-full pl-12 pr-4 py-3 bg-transparent rounded-2xl text-sm transition-all focus:outline-none text-slate-800"
        />
      </div>

      {/* Table view */}
      {isLoading ? (
        <div className="h-64 bg-slate-50 animate-pulse rounded-2xl" />
      ) : filteredDoctors.length === 0 ? (
        <EmptyState
          title="No Doctors Match Filters"
          description="Try writing another keyword or adding a new doctor record."
          icon={Stethoscope}
        />
      ) : (
        <Card hover={false} className="bg-white border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="px-6 py-4">Specialist Info</th>
                  <th className="px-6 py-4">Specialization</th>
                  <th className="px-6 py-4">Hospital</th>
                  <th className="px-6 py-4">Fee</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredDoctors.map((doc) => (
                  <tr key={doc._id} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* Info */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center overflow-hidden flex-shrink-0 relative shadow-inner border border-slate-100">
                        {doc.profileImage ? (
                          <img
                            src={`/uploads/${doc.profileImage}`}
                            alt={doc.doctorName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerText = doc.doctorName.charAt(0);
                            }}
                          />
                        ) : (
                          doc.doctorName.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{doc.doctorName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{doc.qualification}</p>
                      </div>
                    </td>

                    {/* Specialty */}
                    <td className="px-6 py-4">
                      <span className="bg-emerald-55/60 text-emerald-700 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                        {doc.specialization}
                      </span>
                    </td>

                    {/* Hospital */}
                    <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">{doc.hospital}</td>

                    {/* Fee */}
                    <td className="px-6 py-4 font-bold text-slate-800">${doc.consultationFee}</td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(doc)}
                          className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                        >
                          <Edit2 className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDoctor ? 'Edit Doctor Profile' : 'Register New Doctor'}
      >
        <DoctorForm
          doctor={editingDoctor}
          onSubmitSuccess={handleFormSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

    </div>
  );
}
