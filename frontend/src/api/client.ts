import axios from 'axios';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const getServices = () => apiClient.get('/services');
export const getServiceById = (id: number) => apiClient.get(`/services/${id}`);

// Projects API
export const getProjects = () => apiClient.get('/projects');
export const getProjectById = (id: number) => apiClient.get(`/projects/${id}`);

// Blog API
export const getBlogPosts = () => apiClient.get('/blog');
export const getBlogPostBySlug = (slug: string) => apiClient.get(`/blog/${slug}`);

// Contact API
export const submitContact = (data: { name: string; email: string; phone?: string; subject?: string; message: string }) =>
  apiClient.post('/contact', data);

// Newsletter API
export const subscribeNewsletter = (email: string) =>
  apiClient.post('/newsletter', { email });

// Testimonials API
export const getTestimonials = () => apiClient.get('/testimonials');

// Settings API
export const getSettings = () => apiClient.get('/settings');

export default apiClient;