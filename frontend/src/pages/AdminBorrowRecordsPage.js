import React, { useState, useEffect } from 'react';
import { adminGetBorrowRecords } from '../services/adminmanage';
import '../styles/AdminBorrowRecordsPage.css';

const AdminBorrowRecordsPage = () => {
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowRecords = async () => {
      try {
        const data = await adminGetBorrowRecords();
        setBorrowRecords(data);
      } catch (err) {
        setError('Failed to fetch borrow records.');
      }
    };
    fetchBorrowRecords();
  }, []);

  return (
    <div className="table-container">
      <h1>Borrow Records</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Borrower ID</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {borrowRecords.length > 0 ? (
            borrowRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.title || 'N/A'}</td>
                <td>{record.author || 'N/A'}</td>
                <td>{record.borrowerId}</td>
                <td>{new Date(record.borrowDate).toLocaleString()}</td>
                <td>{record.returnDate ? new Date(record.returnDate).toLocaleString() : 'Not Returned'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 添加返回按钮 */}
      <div className="button-container">
        <button className="button" onClick={() => window.history.back()}>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminBorrowRecordsPage;
