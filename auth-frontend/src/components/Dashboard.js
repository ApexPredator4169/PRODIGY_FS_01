import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard({ token, logout }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/protected', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(response.data.message);
      } catch (error) {
        navigate('/login');
      }
    };
    fetchData();
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      if (error.response && error.response.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 font-bold">Dashboard</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-between">
          <Link
            to="/admin"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Admin Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;