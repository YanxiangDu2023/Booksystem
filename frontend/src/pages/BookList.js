import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../services/book';
import { getUserBorrowRecords } from '../services/auth'; // 引入获取借阅记录的服务函数
import '../styles/BookList.css'; // 引入样式文件

const BookList = () => {
  const [books, setBooks] = useState([]); // 原始书籍列表
  const [filteredBooks, setFilteredBooks] = useState([]); // 过滤后的书籍列表
  const [searchTerm, setSearchTerm] = useState(''); // 搜索关键词
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [borrowRecords, setBorrowRecords] = useState([]); // 用户借阅记录
  const [showBorrowRecords, setShowBorrowRecords] = useState(false); // 控制借阅记录显示
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const booksPerPage = 10; // 每页显示的书籍数量

  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // 获取当前登录用户

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

  // 获取用户借阅记录
  const loadBorrowRecords = async () => {
    if (!currentUser) {
      alert('Please log in to view your borrow records.');
      return;
    }

    try {
      const data = await getUserBorrowRecords(currentUser.id); // 根据当前用户 ID 获取借阅记录
      setBorrowRecords(data);
      setShowBorrowRecords(true);
    } catch (error) {
      alert('Failed to load borrow records. Please try again later.');
    }
  };

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
    setCurrentPage(1); // 搜索时重置到第一页
  };


  const handleBookClick = (id) => {
    navigate(`/books/${id}`); // Navigate to the book detail page
  };

   // 计算当前页显示的书籍
   const indexOfLastBook = currentPage * booksPerPage;
   const indexOfFirstBook = indexOfLastBook - booksPerPage;
   const paginatedBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

   // 处理分页点击
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };

   // 计算页码
   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

   return (
    <div>
      <div className="header">
        <h1>Book List</h1>
        <button onClick={() => navigate('/my-center')} className="profile-button">
          My Center
        </button>
      </div>

      {/* 搜索栏 */}
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* 借阅记录显示 */}
      {showBorrowRecords && (
        <div className="borrow-records">
          <h2>My Center</h2>
          <ul>
            {borrowRecords.map((record, index) => (
              <li key={index}>
                <p>Book Title: {record.bookTitle}</p>
                <p>Borrow Date: {new Date(record.borrowDate).toLocaleDateString()}</p>
                <p>
                  Return Date:{' '}
                  {record.returnDate
                    ? new Date(record.returnDate).toLocaleDateString()
                    : 'Not Returned'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="book-list">
            {paginatedBooks.map((book) => (
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

          {/* 分页按钮 */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default BookList;
