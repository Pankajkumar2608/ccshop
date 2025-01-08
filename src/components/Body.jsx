import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Body = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cards/available')
        if (response.data && Array.isArray(response.data.data)) {
        setCards(response.data.data);}
        
      } catch (error) {
        setError('Error fetching cards');
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCards();
  }, []);
  const handleBuyClick = async(card) => {
    try {
      const buyCard = await axios.post('http://localhost:3000/api/buycard', { cardId: card.id });
      if (buyCard.status === 200) {
        alert('Card bought successfully');
      }
    } catch (error) {
      console.error('Error buying card:', error);
      
    }
    
  }
  
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  
  return (
    <div className="container mx-auto w-full p-6 mt-2 bg-white rounded-lg shadow-xl">
      <div className="overflow-x-auto ring-1 ring-gray-200 rounded-lg">
        <table className="w-full divide-y divide-gray-200">
          <thead>
        <tr>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">#</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">Bin</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">City</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">State</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">Country</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">ZipCode</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">Month</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">Year</th>
        
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">Tel</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">Email</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">Price</th>
        <th className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider">Cart</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y w-full  divide-gray-200">
      {cards.map((card, index) => {
        return (
          <tr key={card.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.cardNumber}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.city}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.state}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.country}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.zipCode}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.expMonth}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.expYear}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.phoneAvailable}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.emailAvailable}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button onClick={() => handleBuyClick(card)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Buy
              </button>
            </td>
          </tr>
        );
      })}

       
      </tbody>
      </table>
    </div>
    </div>
  );
};

export default Body;