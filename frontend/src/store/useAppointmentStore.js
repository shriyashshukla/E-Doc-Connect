import { create } from 'zustand';
import { appointmentService } from '@/services/api';
import { useToastStore } from './useToastStore';

export const useAppointmentStore = create((set, get) => ({
  appointments: [],
  isLoading: false,
  error: null,

  fetchAppointments: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const appointments = await appointmentService.getAll(params);
      set({ appointments, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.error || 'Failed to fetch appointments', isLoading: false });
    }
  },

  bookAppointment: async (data) => {
    set({ isLoading: true, error: null });
    const { addToast } = useToastStore.getState();
    try {
      const newAppt = await appointmentService.create(data);
      set((state) => ({
        appointments: [newAppt, ...state.appointments],
        isLoading: false
      }));
      addToast('Appointment booked successfully!', 'success');
      return newAppt;
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to book appointment';
      set({ error: errMsg, isLoading: false });
      addToast(errMsg, 'error');
      return null;
    }
  },

  updateAppointmentStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    const { addToast } = useToastStore.getState();
    try {
      const updated = await appointmentService.updateStatus(id, status);
      set((state) => ({
        appointments: state.appointments.map(appt => appt._id === id ? updated : appt),
        isLoading: false
      }));
      addToast(`Appointment status updated to ${status}!`, 'success');
      return updated;
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to update appointment';
      set({ error: errMsg, isLoading: false });
      addToast(errMsg, 'error');
      return null;
    }
  },

  cancelAppointment: async (id) => {
    return get().updateAppointmentStatus(id, 'cancelled');
  }
}));
