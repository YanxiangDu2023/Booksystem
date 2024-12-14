import axios from 'axios';

const API_URL = 'http://127.0.0.1:3030'; // Backend service URL

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data;
};

export const register = async (username, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {

      username,
      email,
      password,
      role, // 添加 role
    });
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.response?.data?.message || error.message);
    throw error;
  }
};

