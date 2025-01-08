import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaEye, FaEyeSlash, FaLock, FaUser, FaEnvelope } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { userName, email, password, confirmPassword } = formData;

        if (!userName || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
            return false;
        }

        if (userName.length < 3) {
            toast.error('Username must be at least 3 characters long');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            toast.error('Password must contain at least 8 characters, one letter, one number, and one special character');
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/api/signup', {
                userName: formData.userName,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201) {
                toast.success('Signup successful!');
                setTimeout(() => navigate('/signin'), 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black font-nunito'>
            <div className='absolute inset-0 bg-black opacity-70'></div>
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
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
                transition={{ duration: 0.8 }}
                className='w-full max-w-md backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-8 space-y-6 z-10'
            >
                <motion.h2
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className='text-4xl font-bold text-center text-white mb-8'
                >
                    <span className='bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text'>
                        loophoria
                    </span>
                </motion.h2>

                <form onSubmit={handleSignup} className='space-y-4'>
                    
                    <div className='relative'>
                        <FaUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className='w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white'
                            placeholder='Username'
                        />
                    </div>
                    <div className='relative'>
                        <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white'
                            placeholder='Email'
                        />
                    </div>
                    <div className='relative'>
                        <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white'
                            placeholder='password'
                        />
                    </div>
                    <div className='relative'>
                        <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white'
                            placeholder='confirm password'
                        />
                    </div>

                   

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className='w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50'
                    >
                        {loading ? 'Creating account...' : 'Sign up'}
                    </motion.button>
                </form>

                <div className='text-center text-sm text-gray-300'>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        className='text-purple-400 hover:text-purple-300 transition-colors cursor-pointer'
                        onClick={() => navigate('/signin')}
                    >
                        Already have an account? Sign in
                    </motion.a>
                </div>
            </motion.div>
            <ToastContainer position="top-right" theme="dark" />
        </div>
    );
};

export default Signup;