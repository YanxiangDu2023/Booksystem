import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const getBookDetail = async (id) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  return response.data;
};

export const borrowBook = async (id, payload) => {
  const response = await axios.patch(`${API_URL}/books/${id}/borrow`, payload);
  return response.data;
};

export const returnBook = async (id) => {
  const response = await axios.patch(`${API_URL}/books/${id}/return`);
  return response.data;
};
