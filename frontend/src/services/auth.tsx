import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000'; // 后端服务地址

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login`, {email, password});
  return response.data;
};

export const register = async (email: string, password: string, role: string = 'user') => {
  const response = await axios.post(`${API_URL}/users/register`, {email, password, role});
  return response.data;
};
