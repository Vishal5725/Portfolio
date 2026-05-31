import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({ baseURL: BASE, timeout: 8000 });

export const fetchPortfolio   = () => api.get('/portfolio/');
export const fetchCertificates = () => api.get('/certificates/');
export const sendMessage = (data)  => api.post('/contact/', data);

export default api;
