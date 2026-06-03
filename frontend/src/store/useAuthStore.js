import { create } from 'zustand';
import { userService } from '@/services/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.mockAuth(email);
      set({ user, isAuthenticated: true, isLoading: false });
      if (typeof window !== 'undefined') {
        localStorage.setItem('edoc_user_email', email);
      }
      return user;
    } catch (err) {
      set({ error: err.response?.data?.error || 'Failed to authenticate', isLoading: false });
      return null;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('edoc_user_email');
    }
  },

  updateProfile: async (formData) => {
    const { user } = get();
    if (!user) return null;
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userService.update(user._id, formData);
      set({ user: updatedUser, isLoading: false });
      return updatedUser;
    } catch (err) {
      set({ error: err.response?.data?.error || 'Failed to update profile', isLoading: false });
      return null;
    }
  },

  initialize: async () => {
    if (typeof window === 'undefined') return;
    const storedEmail = localStorage.getItem('edoc_user_email') || 'john.doe@gmail.com';
    await get().login(storedEmail);
  }
}));
