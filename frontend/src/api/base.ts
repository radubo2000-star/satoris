// API Base URL helper - needs /api prefix for backend routing
const API_BASE = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL + '/api' 
  : '/api';

export default API_BASE;