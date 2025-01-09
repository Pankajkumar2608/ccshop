import React, { useState } from 'react'
import axios from 'axios'

const AdminDash = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);

    const updateBalance = async () => {
        try {
            setUpdateLoading(true);
            const response = await axios.post('http://localhost:3000/api/updateBalance', { amount, email });
            if (response.status === 200) {
                alert('Balance updated successfully');
                setAmount('');
                setEmail('');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Update failed. Please try again.');
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("http://localhost:3000/api/uploadcc", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: [function () {
                    return formData;
                }],
            });

            if (response.status === 200) {
                alert("File uploaded successfully");
                setFile(null);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Upload failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6 font-nunito">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* File Upload Section */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">
                        File Upload
                    </h1>

                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="file"
                                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                                accept=".txt"
                                onChange={(e) => setFile(e.target.files[0])}
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                                isLoading
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700'
                            } text-white`}
                            onClick={handleUpload}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Uploading...' : 'Upload File'}
                        </button>
                    </div>
                </div>

                {/* Balance Update Section */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Update User Balance</h2>
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder='Enter user email' 
                            className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type='number' 
                            placeholder='Enter amount' 
                            className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <button 
                            className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
                                updateLoading
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-yellow-500 hover:bg-blue-600 active:bg-yellow-700'
                            } text-white`}
                            onClick={updateBalance}
                            disabled={updateLoading}
                        >
                            {updateLoading ? 'Updating...' : 'Update Balance'}
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="max-w-6xl mx-auto mt-4">
                    <div className="text-red-500 text-sm p-2 bg-red-100/10 rounded">
                        {error}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDash;