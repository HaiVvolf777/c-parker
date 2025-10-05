import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white py-[30px] mt-[100px] md:mt-[150px]">
      <div>
        <h2 className="text-white font-bold text-[36px] md:text-[56px] text-center mb-[20px]">C-Parker</h2>
        <p className="text-white text-center text-[14px] md:text-[16px] mb-[30px] px-6">C-Parker is a decentralized program. Payouts are instant, secured by <br />smart contracts. DYOR before participating.</p>
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10 w-fit mx-auto mb-[30px] px-6">
          <span className="cursor-pointer">Home</span>
          <span className="cursor-pointer">About</span>
          <span className="cursor-pointer">Contact Us</span>
          <span className="cursor-pointer">Support</span>
          <Link to='/dashboard' className="cursor-pointer">Dashboard</Link>
        </div>
        <p className="text-center text-[12px] md:text-[14px]">© 2025 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;


