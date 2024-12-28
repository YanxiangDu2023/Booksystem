import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminViewBooks } from '../services/adminmanage';
import '../styles/ViewBooksPage.css';

const ViewBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 搜索关键字
  const [currentPage, setCurrentPage] = useState(1); // 当前页
  const [pageSize] = useState(5); // 每页显示数量
  const [totalPages, setTotalPages] = useState(1); // 总页数
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await adminViewBooks(); // 获取所有书籍
        const filteredBooks = booksData.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTotalPages(Math.ceil(filteredBooks.length / pageSize));
        const paginatedBooks = filteredBooks.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        );
        setBooks(paginatedBooks);
      } catch (err) {
        setError('Failed to fetch books.');
      }
    };
    fetchBooks();
  }, [searchTerm, currentPage, pageSize]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // 搜索时重置到第一页
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/books/${id}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h1>All Books</h1>

      {/* 搜索栏 */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          margin: '20px auto',
          display: 'block',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      {/* 图书列表 */}
      <div className="books-container">
        {error && <p>{error}</p>}
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-card" key={book.id}>
              <div className="book-title">{book.title}</div>
              <div className="book-author">by {book.author}</div>
              <button
                className="view-details-button"
                onClick={() => handleViewDetails(book.id)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {/* 分页功能 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          classname = 'button'

        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          classname = "button"

        >
          Next
        </button>
      </div>

      {/* 返回按钮 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => navigate('/admin/dashboard')}
          classname = "return-button"

        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewBooksPage;
