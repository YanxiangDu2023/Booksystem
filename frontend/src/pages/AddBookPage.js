import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAddBook } from '../services/adminmanage';
import '../styles/addbook.css'; // 导入样式

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'publishedYear' ? Number(value) : value, // 确保 publishedYear 是数字
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAddBook(formData); // 调用上架图书的服务
      setMessage('Book added successfully!');
      setFormData({ title: '', author: '', genre: '', publishedYear: '' });
    } catch (err) {
      setMessage('Failed to add the book. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Published Year:</label>
          <input
            type="number"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
      {message && <p>{message}</p>}

      <button onClick={() => navigate('/admin')} style={{ marginTop: '20px' }}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default AddBookPage;
