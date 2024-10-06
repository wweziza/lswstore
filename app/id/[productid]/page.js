'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Search, User, Menu } from 'lucide-react';
import TopUpPage from './topuppage';

export default function ProductPage() {
  const params = useParams();
  const { productid } = params;
  const [game, setGame] = useState(null);
  const [topUpOptions, setTopUpOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameResponse = await fetch(`/api/games?query=${productid}`);
        if (!gameResponse.ok) {
          throw new Error('Game not found');
        }
        const gameData = await gameResponse.json();
        setGame(gameData[0]);

        const productsResponse = await fetch(`/api/products?query=${productid}`);
        if (!productsResponse.ok) {
          throw new Error('Products not found, the database still empty.');
        }
        const productsData = await productsResponse.json();
        setTopUpOptions(productsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [productid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  const paymentMethods = [
    { category: 'E-wallet', methods: ['ShopeePay',  'GoPay'] },
    { category: 'Transfer Bank', methods: ['BCA', 'Mandiri', 'BNI', 'BRI'] },
    //{ category: 'SMS & Seluler', methods: ['Telkomsel'] },
   // { category: 'OTC non-Bank', methods: ['Indomaret', 'Alfamart'] },
    { category: 'Others', methods: ['QRIS'] },
    //{ category: 'Debit / Credit Card', methods: ['Visa', 'Mastercard'] },
  ];

  return (
    <TopUpPage game={game} topUpOptions={topUpOptions} paymentMethods={paymentMethods} />
  );
}