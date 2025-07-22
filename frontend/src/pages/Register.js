import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const apiBaseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : 'https://jobs-backend-uuqf.onrender.com';

    const response = await fetch(`${apiBaseUrl}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/home');
    } else {
      setError(JSON.stringify(data));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="email"
          placeholder="Email"
          className="block border p-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      </form>
    </div>
  );
}

export default Register;
