import axios from 'axios';

// const token = localStorage.getItem('dallUserToken')
const token = typeof window !== 'undefined' ? localStorage.getItem('dallUserToken')?.replace(/"/g, '') : null;

const api = axios.create({
  baseURL: 'https://dall.app/api',
  // withCredentials: true,
  headers: {
    'Authorization': `Bearer ${token}`,
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json',
  },
})

export default api;