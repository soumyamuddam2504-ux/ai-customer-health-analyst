import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '';

export function login(email, password) {
  return axios.post(`${API}/api/auth/login`, { email, password });
}

export function signup(name, email, password) {
  return axios.post(`${API}/api/auth/signup`, { name, email, password });
}
