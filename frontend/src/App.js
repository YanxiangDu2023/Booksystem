import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetail from './pages/BookDetail';
import BookList from './pages/BookList';
import Login from './pages/Login';
import Register from './pages/Register';


const App =() =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* 根路径匹配到 Login */}
        <Route path="/login" element={<Login />} /> {/* 添加 /login */}
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
