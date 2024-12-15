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

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleBorrow = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // 从 localStorage 获取当前用户信息
    if (!currentUser) {
      alert('User not logged in. Please log in to borrow books.');
      return;
    }

    // 构造完整的 payload
    const payload = {
      // borrower: currentUser.username,    // 当前用户的用户名
      borrowerId: Number(currentUser.id) // 当前用户的 ID，确保为数字
    };

    console.log('Borrow payload:', payload); // 输出 payload 检查内容是否完整

    try {
      const response = await borrowBook(book.id, payload); // 调用服务发送借阅请求
      console.log('Borrow response:', response); // 打印响应
      alert('Book borrowed successfully!');
    } catch (error) {
      console.error('Borrow error:', error.response?.data || error.message); // 打印错误信息
      alert('Failed to borrow the book. Please try again later.');
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

          {/* 根据借阅状态和当前用户判断按钮显示 */}
          {book.isBorrowed && book.borrower === currentUser ? (
            <button onClick={handleReturn}>Return Book</button>
          ) : !book.isBorrowed ? (
            <button onClick={handleBorrow}>Borrow Book</button>
          ) : null}
        </>
      ) : (
        <p>No book details found</p>
      )}
    </div>
  );
};

export default BookDetail;
