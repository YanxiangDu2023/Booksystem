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

// 获取登陆用户借阅记录
export const getUserBorrowRecords = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}/borrow-records`);
  return response.data;
};

// 获取所有用户借阅记录
