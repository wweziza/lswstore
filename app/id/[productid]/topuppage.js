import React, { useState } from 'react';
import { ChevronDown, Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
const TopUpPage = ({ game, topUpOptions, paymentMethods }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-900">
        <Navbar/>

      <main className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <img src={game.image} alt={game.name} className="w-24 h-24 rounded-lg mr-6" />
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">{game.name}</h1>
              <p className="text-gray-600">Top up {game.name} {game.currency} now with LSW!</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Enter User ID</h2>
            <div className="flex space-x-4">
              <input type="text" placeholder="User ID" className="flex-1 border border-gray-300 px-4 py-2 rounded" />
              <input type="text" placeholder="Zone ID" className="w-1/4 border border-gray-300 px-4 py-2 rounded" />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Select Amount</h2>
            <div className="grid grid-cols-3 gap-4">
              {topUpOptions.map((option, index) => (
                <button
                  key={index}
                  className={`border p-4 rounded-lg text-center hover:bg-gray-100 transition ${selectedOption === option ? 'border-2 border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setSelectedOption(option)}
                >
                  <p className="font-semibold">{option.amount} {game.currency}</p>
                  <p className="text-gray-600">+{option.bonus} Bonus</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Select Payment Method</h2>
            {paymentMethods.map((category, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold mb-2 text-gray-700">{category.category}</h3>
                <div className="bg-gray-100 p-4 rounded-lg flex flex-wrap gap-4">
                  {category.methods.map((method, methodIndex) => (
                    <button
                      key={methodIndex}
                      className={`px-4 py-2 rounded transition ${selectedPayment === method ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
                      onClick={() => setSelectedPayment(method)}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Checkout Summary</h2>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold">
              {selectedOption ? `${selectedOption.amount + selectedOption.bonus} ${game.currency}` : '-'}
            </span>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Pay Now
          </button>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default TopUpPage;