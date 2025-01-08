import React from 'react'
import Navbar from '../components/Navbar'


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-nunito">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
            Welcome to Our Store
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with our latest products and offers
          </p>
          <a href="/shop" 
             className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg 
                        hover:bg-blue-700 transform hover:scale-105 transition-all 
                        duration-300 shadow-lg hover:shadow-xl">
            Visit Shop
          </a>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                New Collection Arrived
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Check out our latest winter collection with exciting offers!
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Special Discount
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get 0.0% off on all products this weekend!
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Give your feedback
              </h3>
              <p className="text-gray-600 leading-relaxed">
                on our telegram channel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
