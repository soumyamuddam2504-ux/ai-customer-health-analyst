import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '';

export function searchCustomer(name) {
  return axios.get(`${API}/api/customers/search`, { params: { name } });
}
