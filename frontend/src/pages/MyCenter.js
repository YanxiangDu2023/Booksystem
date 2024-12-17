import React, { useState, useEffect } from 'react';
import { getUserBorrowRecords } from '../services/auth'; // 导入获取借阅记录的服务
import '../styles/MyCenter.css'; // 引入样式文件
import { useNavigate } from 'react-router-dom';

const MyCenter = () => {
  const [borrowRecords, setBorrowRecords] = useState([]); // 用户的借阅记录
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 获取当前用户信息
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const loadBorrowRecords = async () => {
      if (!currentUser) {
        setErrorMessage('User not logged in. Please log in to view records.');
        setLoading(false);
        return;
      }

      try {
        const data = await getUserBorrowRecords(currentUser.id);
        setBorrowRecords(data);
      } catch (error) {
        setErrorMessage('Failed to load borrow records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadBorrowRecords();
  }, [currentUser]);

  const handleBackToList = () => {
    navigate('/books'); // 返回到书籍列表页面
  };

  return (
    <div className="my-center">
      <h1>My Center</h1>
      <button className="back-button" onClick={handleBackToList}>
        Back to Book List
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      ) : borrowRecords.length === 0 ? (
        <p>No borrow records found.</p>
      ) : (
        <ul className="borrow-records">
          {borrowRecords.map((record, index) => (
            <li key={index} className="record-item">
              <h3>{record.title}</h3>
      <p>Author: {record.author}</p>
      <p>Genre: {record.genre}</p>
      <p>Borrow Date: {new Date(record.borrowDate).toLocaleString()}</p>
      <p>
                Return Date:{' '}
                {record.returnDate
                  ? new Date(record.returnDate).toLocaleDateString()
                  : 'Not Returned'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCenter;
