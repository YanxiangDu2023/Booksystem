import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../services/book';
import '../styles/BookList.css'; // 引入样式文件

const BookList = () => {
  const [books, setBooks] = useState([]); // 原始书籍列表
  const [filteredBooks, setFilteredBooks] = useState([]); // 过滤后的书籍列表
  const [searchTerm, setSearchTerm] = useState(''); // 搜索关键词
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data); // 初始显示全部书籍
      } catch (error) {
        setErrorMessage('Failed to load book list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // 处理搜索输入变化
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // 根据输入的关键词过滤书籍
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase()) || // 搜索标题
      book.author.toLowerCase().includes(value.toLowerCase()) || // 搜索作者
      book.genre.toLowerCase().includes(value.toLowerCase()) // 搜索类别
    );
    setFilteredBooks(filtered);
  };

  const handleBookClick = (id) => {
    navigate(`/books/${id}`); // Navigate to the book detail page
  };

  return (
    <div>
      <h1>Book List</h1>
      {/* 搜索栏 */}
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="book-list">
          {filteredBooks.map((book) => (
            <li
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className="book-item"
            >
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
