import axios from 'axios';

// Since we have a Next.js rewrite configured in next.config.js,
// requests to '/api/...' will be proxied automatically to the backend on port 5001.
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const doctorService = {
  getAll: async (search = '', specialization = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (specialization) params.append('specialization', specialization);
    const res = await api.get(`/doctors?${params.toString()}`);
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/doctors/${id}`);
    return res.data;
  },
  create: async (formData) => {
    const res = await api.post('/doctors', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  update: async (id, formData) => {
    const res = await api.put(`/doctors/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/doctors/${id}`);
    return res.data;
  },
};

export const appointmentService = {
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        searchParams.append(key, params[key]);
      }
    });
    const res = await api.get(`/appointments?${searchParams.toString()}`);
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/appointments/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/appointments', data);
    return res.data;
  },
  updateStatus: async (id, status) => {
    const res = await api.put(`/appointments/${id}`, { status });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/appointments/${id}`);
    return res.data;
  },
};

export const userService = {
  getAll: async (search = '', role = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (role) params.append('role', role);
    const res = await api.get(`/users?${params.toString()}`);
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
  update: async (id, formData) => {
    const res = await api.put(`/users/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  mockAuth: async (email) => {
    const res = await api.post('/users/mock-auth', { email });
    return res.data;
  },
};

export const reviewService = {
  getAll: async () => {
    const res = await api.get('/reviews');
    return res.data;
  },
  getByDoctorId: async (doctorId) => {
    const res = await api.get(`/reviews/doctor/${doctorId}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/reviews', data);
    return res.data;
  },
};

export const contactService = {
  getAll: async () => {
    const res = await api.get('/contact');
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/contact', data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  },
};

export const cmsService = {
  getServices: async () => {
    const res = await api.get('/cms/services');
    return res.data;
  },
  getTestimonials: async () => {
    const res = await api.get('/cms/testimonials');
    return res.data;
  },
  getFaqs: async () => {
    const res = await api.get('/cms/faqs');
    return res.data;
  },
  getStats: async () => {
    const res = await api.get('/cms/stats');
    return res.data;
  },
};

export default api;
