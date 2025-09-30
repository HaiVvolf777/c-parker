import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container mx-auto px-6 py-24 text-white text-center">
      <h1 className="text-[48px] md:text-[64px] font-bold mb-4">404</h1>
      <p className="text-[16px] md:text-[18px] mb-8">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="inline-block relative rounded-xl p-[1px]">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#324AB9] to-[#4B158E]"></span>
        <span className="relative rounded-xl bg-gradient-to-r from-[#150F3E] via-[#200F46] to-[#3A126F] px-6 py-3 text-white keep-white font-semibold">Go Home</span>
      </Link>
    </main>
  );
};

export default NotFound;

