import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function Homepage() {
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {username}!</h1>
      <p className="mb-4">Explore job and resume matching features.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <a href="/jobs" className="bg-blue-500 text-white p-4 rounded-lg">Job List</a>
        <a href="/upload" className="bg-green-500 text-white p-4 rounded-lg">Upload Resume</a>
        <a href="/match" className="bg-purple-500 text-white p-4 rounded-lg">Match Resume to Jobs</a>
        <a href="/post-job" className="bg-yellow-500 text-white p-4 rounded-lg">Post a Job</a>
        <a href="/resumes" className="bg-pink-500 text-white p-4 rounded-lg">Resume List</a>
        <a href="/match-resume" className="bg-indigo-500 text-white p-4 rounded-lg">Match All Resumes</a>
        <a href="/online-jobs" className="bg-red-500 text-white p-4 rounded-lg">Online Jobs</a>
        <a href="/match-online-jobs" className="bg-teal-500 text-white p-4 rounded-lg">Match Online Jobs</a>
      </div>
      <LogoutButton />
    </div>
  );
}

export default Homepage;
