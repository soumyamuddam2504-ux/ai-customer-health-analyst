import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function searchCustomer(name) {
  return axios.get(`${API}/api/customers/search`, {
    params: { name },
    headers: authHeaders(),
  });
}

export function getAllCustomers() {
  return axios.get(`${API}/api/customers`, { headers: authHeaders() });
}
