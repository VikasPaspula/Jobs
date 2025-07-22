import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiBaseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : 'https://jobs-backend-uuqf.onrender.com';

    const response = await fetch(`${apiBaseUrl}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/home');
    } else {
      setError(data.detail || 'Login failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="block border p-2 mb-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="block border p-2 mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      </form>
      <p className="mt-4">Don't have an account? <a href="/register" className="text-blue-600 underline">Register</a></p>
    </div>
  );
}

export default Login;
