import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const [balance, setBalance] = useState('0');
  const [userName, setUserName] = useState()
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchBalance = async() => {
      try {
        const fetch = await axios.get('http://localhost:3000/api/fetchBalance', {withcredentials: true});
        setBalance(fetch.data.walletBalance);
        setUserName(fetch.data.userName)
      } catch (error) {
        if(fetch.data.status === 401){
          Navigate('/signin')
        }
        
      }
    };
    fetchBalance();

  });

  return (
    <div className="navbar bg-gradient-to-r from-black via-gray-900 to-black animate-gradient bg-[length:200%_200%]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-gray-200 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 hover:text-yellow-500 transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black rounded-xl z-[1] mt-3 w-52 p-2 shadow-xl backdrop-blur-sm border border-gray-100"
          >
            <li>
              <a className="hover:text-yellow-500 hover:bg-gray-50 transition-all duration-300 py-3" onClick={() => Navigate('/')}>Home</a>
            </li>
            <li>
              <a className="hover:text-yellow-500 hover:bg-gray-50 transition-all duration-300 py-3" onClick={() => Navigate('/shop')}>Shop</a>
            </li>
            <li>
              <a className="hover:text-yellow-500 hover:bg-gray-50 transition-all duration-300 py-3" href="https://t.me/+q4-X5LdmAfM1Zjhl">Contact</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-bold text-white hover:text-yellow-500 transition-all duration-300">
          <span className="text-yellow-500 animate-pulse">loop</span>horia
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          <li>
            <a className="text-lg font-medium text-white hover:text-yellow-500 transition-all duration-300 hover:scale-105" onClick={() => Navigate('/')}>Home</a>
          </li>
          <li>
            <a className="text-lg font-medium text-white hover:text-yellow-500 transition-all duration-300 hover:scale-105" onClick={() => Navigate('/shop')}>Shop</a>
          </li>
          <li>
            <a className="text-lg font-medium text-white hover:text-yellow-500 transition-all duration-300 hover:scale-105" href="https://t.me/+q4-X5LdmAfM1Zjhl">Contact</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="text-md flex flex-col text-gray-700 px-6 py-2  border-gray-200   animate-fadeIn  hover:text-blue-300 hover:underline transition-all duration-300 bg-gray-900/80 p-8 rounded-3xl shadow-[0_0_15px_rgba(255,0,0,0.5)] 
                          hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] 
                          transform hover:-translate-y-2 border border-yellow-500/30 " onClick={() => Navigate('/profile')}>
        <span className="text-yellow-500 hidden md:flex">{userName}</span>
        <span className="text-yellow-500 justify-center flex flex-row">${balance}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
