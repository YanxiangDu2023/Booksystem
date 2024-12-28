import axios from 'axios';

const API_URL = 'http://127.0.0.1:3030';

// 管理员查看所有图书
export const adminViewBooks = async () => {
  const response = await axios.get(`${API_URL}/admin/books`);
  return response.data;
};

// 管理员查看图书详情
export const adminGetBookDetail = async (id) => {
  const response = await axios.get(`${API_URL}/admin/books/${id}`);
  return response.data;
};

// 管理员上架图书
export const adminAddBook = async (payload) => {
  const response = await axios.post(`${API_URL}/admin/books`, payload); // 改为 POST 方法
  return response.data;
};

// 管理员下架图书
export const adminDeleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/books/${id}`); // 删除 payload
  return response.data;
};



export const adminGetBorrowRecords = async () => {
  const response = await axios.get(`${API_URL}/admin/borrow-records`);
  return response.data;
};
