'use client'
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Star } from 'lucide-react';
import Footer from './components/footer';
import Link from 'next/link';
import Navbar from './components/navbar';

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const fullText = 'Toopup & Get a New Experience in Gaming';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);


  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || game.type === selectedCategory.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <main>
        <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-xl mb-4 text-gray-600">Halo gamers,</h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-800">
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition transform hover:scale-105">
                Get Started
              </button>
              <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full hover:bg-blue-50 transition transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img src="/api/placeholder/600/400" alt="Gaming collage" className="rounded-lg shadow-lg w-full" />
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 md:mb-0">Popular Games</h2>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search games" 
                    className="pl-10 pr-4 py-2 border rounded-full w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <div className="relative">
                  <select 
                    className="appearance-none bg-white border rounded-full px-4 py-2 pr-8 cursor-pointer text-gray-700"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option>All</option>
                    <option>Mobile</option>
                    <option>PC</option>
                    <option>Console</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <Link href={`/id/${game.game_abr}`} key={game.game_abr}>
                  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition hover:shadow-lg cursor-pointer">
                    <img src={game.image} alt={game.name} className="w-32 h-32 object-cover rounded-lg mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{game.name}</h3>
                    <div className="flex items-center mb-2">
                      <Star className="text-yellow-400 mr-1" size={16} />
                      <span className="text-sm text-gray-600">{game.rating} ({game.players} players)</span>
                    </div>
                    <span className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition">
                      Top Up
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition">
                Load More Games
              </button>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Kenapa LSW?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500"> 
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Cepat & Aman</h3> 
                <p className="text-gray-700">Topup langsung dengan berbagai metode pembayaran secara otomatis.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Bantuan secara langsung</h3>
                <p className="text-gray-700">Tim kami selalu siap untuk membantu kamu, kapanpun.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Murah</h3>
                <p className="text-gray-700">Harga yang bersaing dan promo untuk menghemat uang kamu.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
