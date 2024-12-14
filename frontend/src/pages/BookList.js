import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../services/book';
import '../styles/BookList.css'; // 引入样式文件

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        setErrorMessage('Failed to load book list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/books/${id}`); // Navigate to the book detail page
  };

  return (
    <div>
      <h1>Book List</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              style={{ cursor: 'pointer' }}
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
