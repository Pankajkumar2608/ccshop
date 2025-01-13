import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Body = ({ filteredData, isFiltered }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (isFiltered) {
      setCards(filteredData);
      setLoading(false);
    } else {
      const fetchCards = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/cards/available");
          if (response.data && Array.isArray(response.data.data)) {
            setCards(response.data.data);
          }
        } catch (error) {
          setError("Error fetching cards");
          console.error("Error fetching cards:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCards();
    }
  }, [filteredData, isFiltered]);

  const handleBuyNow = async (cardId) => {
    
    
    
    try {
      await axios.post("http://localhost:3000/api/buycard", { cardId }, { withCredentials: true });
      navigate("/profile");
  
    } catch (error) {
      setError("Error buying card");
      console.error("Error buying card:", error);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center p-8 bg-red-50 rounded-lg m-4">
      <p className="text-red-600 font-semibold">{error}</p>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bin</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">State</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Country</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ZipCode</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Month</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Year</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tel</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {cards.map((card, index) => (
                <tr key={card.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{card.cardNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.zipCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.expMonth}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.expYear}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.phoneAvailable}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.emailAvailable}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">${card.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 shadow-sm" onClick={() => handleBuyNow(card.id)}>
                      Buy Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



export default Body;
