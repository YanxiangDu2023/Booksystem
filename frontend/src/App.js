import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetail from './pages/BookDetail';
import BookList from './pages/BookList';
import Login from './pages/Login';
import Register from './pages/Register';
import MyCenter from './pages/MyCenter';
import AdminPage from './pages/admin';

import ViewBooksPage from './pages/ViewBooksPage';
import AddBookPage from './pages/AddBookPage';
import ViewDetailsPage from './pages/ViewDetailsPage';
import AdminBorrowRecordsPage from './pages/AdminBorrowRecordsPage';
// import BorrowRecordsPage from './pages/BorrowRecordsPage';


const App =() =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* 根路径匹配到 Login */}
        <Route path="/login" element={<Login />} /> {/* 添加 /login */}
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/my-center" element={<MyCenter />} /> {/* 新增路由 */}
        <Route path="/admin" element={<AdminPage />} /> {/* 管理员页面 */}

        <Route path="/admin/books" element={<ViewBooksPage />} /> {/* 管理员页面 */}
        {/* <Route path="/admin/books/ :id" element={<AddBookPage />} /> 管理员页面 */}
        <Route path="/admin/books/:id" element={<ViewDetailsPage />} /> {/* 管理员查看页面 */}
        <Route path="/admin/add-book" element={<AddBookPage />} />
        <Route path="/admin/borrow-records" element={<AdminBorrowRecordsPage />} />


      </Routes>
    </Router>
  );
}

export default App;
