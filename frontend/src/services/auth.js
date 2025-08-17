import axios from 'axios';

const API_URL = 'https://contact-app-vue.onrender.com/api/auth';

// ============================
// Signup user
// ============================
export const signup = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || err.message;
  }
};

// ============================
// Login user
// ============================
export const login = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token); // store JWT
    }
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || err.message;
  }
};

// ============================
// Get Authorization header for protected routes
// ============================
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) return { Authorization: `Bearer ${token}` };
  return {}; // no token, return empty object
};

// ============================
// Logout user
// ============================
export const logout = () => {
  localStorage.removeItem('token');
};
