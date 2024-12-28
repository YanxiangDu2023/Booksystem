import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminGetBookDetail } from '../services/adminmanage'; // 引入获取图书详情的服务
import { adminDeleteBook } from '../services/adminmanage';

const ViewDetailsPage = () => {
  const { id } = useParams(); // 获取路由参数中的图书 ID
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 获取图书详情
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookData = await adminGetBookDetail(id);
        setBook(bookData);
      } catch (err) {
        setError('Failed to fetch book details.');
      }
    };
    fetchBookDetails();
  }, [id]);

  // 删除图书
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await adminDeleteBook(id); // 调用删除图书的 API
        alert('Book deleted successfully!');
        navigate('/admin/books'); // 跳转回图书列表
      } catch (err) {
        setError('Failed to delete the book.');
      }
    }
  };




  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>Book Details</h1>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published Year:</strong> {book.publishedYear}</p>
      <p><strong>Is Borrowed:</strong> {book.isBorrowed ? 'Yes' : 'No'}</p>

           {/* Delete 按钮 */}
           <button onClick={handleDelete} className="delete-button">
  Delete Book
</button>


      {/* 返回按钮 */}
      <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>
        Back
      </button>
    </div>
  );
};

export default ViewDetailsPage;
