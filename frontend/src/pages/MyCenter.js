import React, { useEffect, useState } from 'react';
import { getUserBorrowRecords } from '../services/auth'; // 导入获取借阅记录的服务
// import {getBooks} from '../services/books';
import { useNavigate } from 'react-router-dom';
import { returnBook } from '../services/book'; // 导入获取借阅记录的服务
import '../styles/MyCenter.css'; // 引入样式文件

const MyCenter = () => {
  const [borrowRecords, setBorrowRecords] = useState([]); // 用户的借阅记录
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 获取当前用户信息
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // const BookList = () => {
  //   const [books, setBooks] = useState([]);
  //   const API_URL = "http://127.0.0.1:3030";

  //   useEffect(() => {
  //     const fetchBooks = async () => {
  //       try {
  //         const response = await axios.get(`${API_URL}/books`);
  //         console.log("Fetched Books:", response.data);
  //         setBooks(response.data);
  //       } catch (error) {
  //         console.error("Failed to fetch books:", error);
  //       }
  //     };
  //     fetchBooks();
  //   }, []);




  useEffect(() => {
    const loadBorrowRecords = async () => {
      if (!currentUser) {
        setErrorMessage('User not logged in. Please log in to view records.');
        setLoading(false);
        return;
      }

      try {
        const data = await getUserBorrowRecords(currentUser.id);
        console.log('Borrow Records:', data); // 打印借阅记录
        setBorrowRecords(data);
      } catch (error) {
        console.error('Error loading borrow records:', error);
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


  const handleReturn = async (id) => {
    try {
      await returnBook(id); // 调用后端服务更新 returnDate
      alert('Book returned successfully!');

      // 刷新借阅记录
      const updatedRecords = await getUserBorrowRecords(currentUser.id);
      setBorrowRecords(updatedRecords);
    } catch (error) {
      alert('Failed to return the book. Please try again later.');
      console.error(error);
    }
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
              {!record.returnDate && (

               <button
                className="return-button"
                onClick={() => {
                  console.log('Returning book with ID:', record.bookId); // 检查 bookId 是否存在
                  handleReturn(record.bookId);
                }}
              >
                Return
              </button>

              )}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCenter;
