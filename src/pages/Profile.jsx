import axios from 'axios';
import { useEffect, useState } from 'react'
import React from 'react';

const Profile = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [wallet, setWallet] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/profile', { withCredentials: true });
                setUserName(response.data.userName);
                setEmail(response.data.email);
                setWallet(response.data.wallet);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black font-nunito'>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96">
                    <h1 className="text-white text-3xl font-bold mb-6 text-center border-b border-gray-700 pb-4">
                        Profile
                    </h1>
                    <div className="space-y-4">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Username</p>
                            <p className="text-white font-semibold">{userName || 'Not set'}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Email</p>
                            <p className="text-white font-semibold">{email || 'Not set'}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm mb-1">Wallet</p>
                            <p className="text-white font-semibold">{wallet || 'Not set'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile