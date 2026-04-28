import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  is_published: boolean;
  created_at: string;
  tags?: string[];
  comments?: Comment[];
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}

export const getBlogPosts = (params?: { search?: string; category?: string; tag?: string; page?: number; limit?: number }) => 
  apiClient.get<BlogListResponse>('/blog', { params });

export const getBlogPostBySlug = (slug: string) => apiClient.get<BlogPost>(`/blog/${slug}`);

export const createBlogPost = (data: Partial<BlogPost>) => apiClient.post('/blog', data);
export const updateBlogPost = (id: number, data: Partial<BlogPost>) => apiClient.put(`/blog/${id}`, data);
export const deleteBlogPost = (id: number) => apiClient.delete(`/blog/${id}`);
export const togglePublishBlogPost = (id: number) => apiClient.post(`/blog/${id}/publish`);

// Comments API
export interface Comment {
  id: number;
  blog_post_id: number;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export const getComments = (params?: { post_id?: number; approved?: boolean }) => 
  apiClient.get<Comment[]>('/comments', { params });

export const addComment = (data: { blog_post_id: number; author_name: string; author_email: string; content: string }) =>
  apiClient.post('/comments', data);

export const approveComment = (id: number) => apiClient.put(`/comments/${id}`);
export const deleteComment = (id: number) => apiClient.delete(`/comments/${id}`);

// Tags API
export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export const getTags = () => apiClient.get<Tag[]>('/tags');
export const createTag = (name: string) => apiClient.post('/tags', { name });

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