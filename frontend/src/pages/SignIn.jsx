import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router';
axios.defaults.withCredentials = true;

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
   
    
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value.trim()
        }));
        setError('');
    }, []);

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !formData.password) {
            setError('Please enter both email and password');
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError('');
            
            const response = await axios.post(
                `http://localhost:3000/api/login`,
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true 
                }
            );

            if (response.data?.success) {
                navigate('/home');
           
             

            
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gray-900 font-nunito'>
            <div className='absolute inset-0 bg-black opacity-50 z-0'></div>
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="https://cdn.dribbble.com/users/517584/videos/32196/finish.mp4" type="video/mp4" />
            </video>
            
            <motion.form
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8 space-y-6 z-10'
            >
                <motion.h2
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className='text-4xl font-bold text-center text-white mb-8'
                >
                    Loophoria
                </motion.h2>

                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                        {error}
                    </div>
                )}

                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-white block'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className='w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-white/50'
                            placeholder='Enter your email'
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className='space-y-2'></div>
                        <label className='text-sm font-medium text-white block'>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className='w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-white/50'
                            placeholder='Enter your password'
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </motion.button>

                    <div className='text-center text-sm text-white/80 mt-4'>
                        <button 
                            type="button"
                            onClick={() => navigate('/signup')}
                            className='text-purple-300 hover:text-purple-400 transition-colors'
                        >
                            New here? Sign up
                        </button>
                    </div>
                
            </motion.form>
        </div>
    );
};

export default SignIn;
