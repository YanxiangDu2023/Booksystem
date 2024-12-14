import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth'; // Import the register method
import '../styles/Register.css'; // Import the CSS file

const Register = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Add role field with default value 'user'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage('');
    try {
      await register(username, email, password, role); // Call register method with all fields
      alert('Registration successful! Please log in.');
      navigate('/'); // Navigate to login page
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Join the library and explore more</p>

        {errorMessage && <p className="register-error">{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="name" className="register-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="register-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="register-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role" className="register-label">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="register-input"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          onClick={handleRegister}
          className="register-button"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <span
              className="login-link"
              onClick={() => navigate('/')}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
