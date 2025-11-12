import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, login } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const ok = await login(password);
    if (ok) {
      const dest = location.state?.from || '/admin';
      navigate(dest);
    } else {
      setError('Invalid password');
    }
  };

  if (isAdmin) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#00000e] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl border border-[#141429] p-6 bg-white/80 dark:bg-[#0B0B1A]">
        <h1 className="text-xl font-bold text-[#0a0a0a] dark:text-white">Admin Login</h1>
        <label className="block mt-4 text-sm text-[#0a0a0a] dark:text-white">Password</label>
        <input
          type="password"
          className="mt-2 w-full rounded-md border border-[#141429] bg-white dark:bg-[#0B0B1A] px-3 py-2 text-[#0a0a0a] dark:text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button type="submit" className="mt-4 w-full rounded-md bg-[#6F23D5] hover:bg-[#5a1fb8] text-white font-bold py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;




