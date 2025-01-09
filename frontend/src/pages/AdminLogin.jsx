import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
  
        const handlelogin = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/adminlogin',
                    { email, password },
                    {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).then((response)=>{
                    if(response.data.success){
                        Navigate('/admindash')
                    }
                })
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please check your credentials.');
                
            }
        }


    return (
        <div className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-nunito bg-inherit '>
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="https://cdn.dribbble.com/users/517584/videos/32196/finish.mp4" type="video/mp4" />
            </video>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md bg-inherit rounded-2xl shadow-2xl p-8 space-y-6 z-10 relative'
            >
                <motion.h2
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className='text-3xl font-bold text-center text-white mb-8'
                >
                    loophoria
                </motion.h2>
                <motion.h3
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className='text-3xl font-bold text-center text-white mb-8'
                >
                    AdminLogin
                </motion.h3>

                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-white block'>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
                            placeholder='Enter your email'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-white block'>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
                            placeholder='Enter your password'
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlelogin}
                        className='w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all'
                    >
                        Sign in
                    </motion.button>

                    
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
