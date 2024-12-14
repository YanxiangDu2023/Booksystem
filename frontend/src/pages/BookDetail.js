import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookDetail, borrowBook, returnBook } from '../services/book';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookDetail = async () => {
      setLoading(true);
      try {
        const data = await getBookDetail(Number(id));
        setBook(data);
      } catch (error) {
        setErrorMessage('Failed to load book details, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadBookDetail();
  }, [id]);

  const handleBorrow = async () => {
    try {
      await borrowBook(Number(id), { borrower: 'Current User' });
      alert('Book borrowed successfully!');
      navigate('/books');
    } catch (error) {
      alert('Failed to borrow the book, please try again later.');
    }
  };

  const handleReturn = async () => {
    try {
      await returnBook(Number(id));
      alert('Book returned successfully!');
      navigate('/books');
    } catch (error) {
      alert('Failed to return the book, please try again later.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p style={{ color: 'red' }}>{errorMessage}</p>;

  return (
    <div>
      {book ? (
        <>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Published Year: {book.publishedYear}</p>
          <p>{book.isBorrowed ? 'Currently borrowed' : 'Available for borrowing'}</p>
          {book.isBorrowed ? (
            <button onClick={handleReturn}>Return Book</button>
          ) : (
            <button onClick={handleBorrow}>Borrow Book</button>
          )}
        </>
      ) : (
        <p>No book details found</p>
      )}
    </div>
  );
};

export default BookDetail;
