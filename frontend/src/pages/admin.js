import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css'; // 导入样式

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome! Use the navigation below to manage the library system.</p>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/admin/books')}>View All Books</button>
        <button onClick={() => navigate('/admin/add-book')}>Add Books</button>
        <button onClick={() => navigate('/admin/borrow-records')}>Show Book Records</button>


      </div>
    </div>
  );
};

export default AdminDashboard;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { adminDeleteBook, adminGetBookDetail, adminPostBook , adminViewBooks } from '../services/adminmanage';

// import '../styles/admin.css';

// const AdminPage = () => {


//   const [books, setBooks] = useState([]);
//   const [newBook, setNewBook] = useState({
//     title: '',
//     author: '',
//     genre: '',
//     publishedYear: '',

//   });
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchBooks = async () =>{
//     try {

//       const bookList = await adminViewBooks();
//       setBooks(bookList);
//     }catch (err){
//       setError ('Failed to fetch books');


//   }
// };

// useEffect(() => {
//   fetchBooks();
// }, []);

//   // 创建新图书
//   const handleAddBook = async () => {
//     try {
//       await adminPostBook(newBook);
//       fetchBooks(); // 更新图书列表
//       alert('Book added successfully!');
//     } catch (err) {
//       setError('Failed to add book.');
//     }
//   };

//   // 查看图书详情
//   const handleViewBookDetail = async (id) => {
//     try {
//       const bookDetail = await adminGetBookDetail(id);
//       setSelectedBook(bookDetail);
//     } catch (err) {
//       setError('Failed to fetch book details.');
//     }
//   };

//   // 删除图书
//   const handleDeleteBook = async (id) => {
//     try {
//       await adminDeleteBook(id);
//       fetchBooks(); // 更新图书列表
//       alert('Book deleted successfully!');
//     } catch (err) {
//       setError('Failed to delete book.');
//     }
//   };

//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));

//   if (!currentUser || currentUser.role !== 'admin') {
//     // 如果不是管理员，重定向到登录页面
//     navigate('/login');
//     return null;
//   }


// return (
//   <div className="admin-container">
//     <h1>Admin Dashboard</h1>

//     {error && <p className="error-message">{error}</p>}

//     <div className="admin-actions">
//       <h2>View All Books</h2>
//       <ul className="book-list">
//         {books.map((book) => (
//           <li key={book.id} className="book-item">
//             <p>{book.title} by {book.author}</p>
//             <button onClick={() => handleViewBookDetail(book.id)}>View Details</button>
//             <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>

//     <div className="add-book">
//       <h2>Add New Book</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={newBook.title}
//         onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Author"
//         value={newBook.author}
//         onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Genre"
//         value={newBook.genre}
//         onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
//       />
//       <input
//         type="number"
//         placeholder="Published Year"
//         value={newBook.publishedYear}
//         onChange={(e) => setNewBook({ ...newBook, publishedYear: e.target.value })}
//       />
//       <button onClick={handleAddBook}>Add Book</button>
//     </div>

//     {selectedBook && (
//       <div className="book-detail">
//         <h2>Book Details</h2>
//         <p>Title: {selectedBook.title}</p>
//         <p>Author: {selectedBook.author}</p>
//         <p>Genre: {selectedBook.genre}</p>
//         <p>Published Year: {selectedBook.publishedYear}</p>
//       </div>
//     )}
//   </div>
// );
// };

// export default AdminPage;
