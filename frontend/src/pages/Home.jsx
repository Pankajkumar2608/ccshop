import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


 
  return (
    
    <div className="min-h-screen bg-black text-gray-100 font-nunito">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       
        <div className=" text-center space-y-4">
          <h1 className="m-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 mb-4 animate-pulse sm:text-6xl">
            Welcome to LOOPHORIA Store
          </h1>
          <p className="text-2xl text-blue-400 mb-10 max-w-3xl mx-auto animate-fadeIn mt-6">
            Your One-Stop Destination for buying CC
          </p>
          
          {/* <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-lg mb-12">
            <p className="text-xl text-blue-300">
              Discover our extensive collection of premium digital products
            </p>
          </div> */}

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            
            <div className="bg-gray-900/80 p-8 rounded-xl shadow-[0_0_15px_rgba(0,0,255,0.5)] 
                          hover:shadow-[0_0_30px_rgba(0,0,255,0.8)] transition-all duration-300 
                          transform hover:-translate-y-2 border border-blue-500/30">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl text-blue-400">💬</span>
              </div>
              <h3 className="text-2xl font-semibold text-blue-400 mb-3">
                Customer Support & Feedback
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>Join our growing community and stay connected:</p>
                <ul className="list-disc pl-4 space-y-2">
                  <li>
                    <a href="https://t.me/loophorastore" 
                       className="text-blue-400 hover:text-blue-300 hover:underline transition-all duration-300">
                      Telegram channel
                    </a> for latest updates
                  </li>
                  <li className="hover:text-blue-400 transition-colors">Share your valuable experience and feedback</li>
                  <li className="hover:text-blue-400 transition-colors">24/7 support from our dedicated team</li>
                  <li className="hover:text-blue-400 transition-colors">Real-time updates on new arrivals</li>
                </ul>
                <p className="mt-4 font-semibold text-red-400">Your feedback shapes our service!</p>
              </div>
            </div>

            {/* Purchase Info Card */}
            <div className="bg-gray-900/80 p-8 rounded-xl shadow-[0_0_15px_rgba(255,0,0,0.5)] 
                          hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] transition-all duration-300 
                          transform hover:-translate-y-2 border border-red-500/30">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl text-red-400">📦</span>
              </div>
              <h3 className="text-2xl font-semibold text-red-400 mb-3">
                Purchase Guidelines
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="font-medium">Essential steps after purchase:</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li className="hover:text-red-400 transition-colors">Download content immediately after purchase</li>
                  <li className="hover:text-red-400 transition-colors">Double-check all provided information</li>
                  <li className="hover:text-red-400 transition-colors">Store your items in a secure location</li>
                  <li className="hover:text-red-400 transition-colors">Keep your purchase receipts safe</li>
                </ol>
              </div>
            </div>

            {/* Store Rules Card */}
            <div className="bg-gray-900/80 p-8 rounded-xl shadow-[0_0_15px_rgba(255,0,255,0.5)] 
                          hover:shadow-[0_0_30px_rgba(255,0,255,0.8)] transition-all duration-300 
                          transform hover:-translate-y-2 border border-purple-500/30">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl text-purple-400">📜</span>
              </div>
              <h3 className="text-2xl font-semibold text-purple-400 mb-3">
                Store Policies
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="font-medium">Our store guidelines for smooth operations:</p>
                <ul className="list-disc pl-4 space-y-2">
                  <li className="hover:text-purple-400 transition-colors">Strict no-refund policy after purchase</li>
                  <li className="hover:text-purple-400 transition-colors">By registering, you automatically agree to the rules of the store.</li>
                  <li className="hover:text-purple-400 transition-colors">Rules can be changed without notifying users.</li>
                  <li className="hover:text-purple-400 transition-colors">Please recharge your account reasonably. The user balance is not refundable.</li>
                  <li className="hover:text-purple-400 transition-colors">If you find bugs or vulnerabilities, report them via tickets.</li>
                  <li className="hover:text-purple-400 transition-colors">If you intentionally exploit bugs or vulnerabilities for profit, your account will be permanently banned.</li>
                  <li className="hover:text-purple-400 transition-colors">If you lose access to your account, the administration will not be able to restore your data and access will be lost forever.</li>
                  <li className="hover:text-purple-400 transition-colors">Single account policy per user</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg">
            <p className="text-lg text-gray-300">
              Experience the difference with LOOPHORIA Store's premium services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
