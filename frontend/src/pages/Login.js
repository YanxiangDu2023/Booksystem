import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import '../styles/Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password cannot be empty.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setError(null);
    setIsLoading(true);

    try {
      // 调用登录 API
      const data = await login(email, password);

      // 保存登录令牌和用户信息到 localStorage
      localStorage.setItem('token', data.token); // 保存 token
      localStorage.setItem('currentUser', JSON.stringify({
        id: data.user.id,          // 用户ID
        username: data.user.username, // 用户名
        role: data.user.role,      // 用户角色
      }));

      if (data.user.role === "admin"){
        navigate('/admin');
      }else{

      // 跳转到书籍列表页面
      navigate('/books');
      }
    } catch (err) {
      // 登录失败时设置错误提示
      setError('Login failed. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }

  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Log in to access your library</p>

        <div className="form-group">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button
          onClick={handleLogin}
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <span
              className="signup-link"
              onClick={() => navigate('/register')}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
