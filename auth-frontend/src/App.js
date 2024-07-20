import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setAndStoreToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setAndStoreToken} />} />
          <Route path="/register" element={<Register setToken={setAndStoreToken} />} />
          <Route path="/dashboard" element={token ? <Dashboard token={token} logout={logout} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={token ? <AdminDashboard token={token} logout={logout} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;