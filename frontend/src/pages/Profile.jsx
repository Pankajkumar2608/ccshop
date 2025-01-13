import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true,
        });
        if (response.status === 200) {
          return;
        }
      } catch (error) {
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };
    isAuth();
  }, [navigate]);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [wallet, setWallet] = useState("");
    const [cards, setUserCards] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/profile", {
                    withCredentials: true,
                });
                setUserName(response.data.userName);
                setEmail(response.data.email);
                setWallet(response.data.wallet);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        const userCard = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/usercard", {
                    withCredentials: true,
                });
                if (response.data.ownedCards && Array.isArray(response.data.ownedCards)) {
                    setUserCards(response.data.ownedCards);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
        userCard();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black font-nunito">
            {/* Profile Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-3xl text-white">{userName?.[0]?.toUpperCase() || '?'}</span>
                            </div>
                        </div>
                        <h1 className="text-white text-4xl font-bold mb-8 text-center">
                            Profile Details
                        </h1>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                                <p className="text-blue-400 text-sm font-medium mb-2">Username</p>
                                <p className="text-white text-lg">{userName || "Not set"}</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                                <p className="text-blue-400 text-sm font-medium mb-2">Email</p>
                                <p className="text-white text-lg">{email || "Not set"}</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                                <p className="text-blue-400 text-sm font-medium mb-2">Wallet</p>
                                <p className="text-white text-lg">{wallet || "Not set"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards Table Section */}
                <div className="max-w-7xl mx-auto mt-12 bg-white/5 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">#</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Card Number</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">City</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">State</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Country</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">ZipCode</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Month</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Year</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Tel</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">CVC</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">fullName</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Ssn</th>

                                </tr>
                            </thead>
                            <tbody>
                                {cards.map((card, index) => (
                                    <tr key={card.id} className="border-b border-gray-700 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-300">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.cardNumber}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.city}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.state}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.country}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.zipCode}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.expMonth}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.expYear}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.phoneAvailable}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.emailAvailable}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{card.price}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
