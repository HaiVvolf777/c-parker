import React from 'react';
import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext.jsx';

const Purchase = () => {
  const navigate = useNavigate();
  const { purchased, purchaseAccess } = useProgress();

  const handlePurchase = () => {
    purchaseAccess();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#00000e] transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen py-8 px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Purchase Access</h1>
          <p className="mt-3 text-gray-600 dark:text-[#bdbdbd] max-w-2xl">
            Buy access to unlock level 1 for all progression flows. You can then progress levels by completing actions.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handlePurchase}
              disabled={purchased}
              className={`text-white font-bold text-[18px] bg-[#6F23D5] hover:bg-[#5a1fb8] disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 leading-[100%] rounded-[10px] cursor-pointer transition-all duration-300`}
            >
              {purchased ? 'Access Purchased' : 'Purchase for 10 CCT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;


