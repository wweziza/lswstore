'use client'
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Search, User, Menu } from 'lucide-react';
import TopUpPage from './topuppage';
const games = [
  { id: 2, name: 'Mobile Legends: Bang Bang', image: 'https://cdn.unipin.com/images/icon_product_pages/1714098015-icon-mlbb%20icon%20200x200_11zon.png', rating: 4.6, players: '100M+', type: 'mobile', currency: 'Diamonds' },
  // ... (other games)
];

const topUpOptions = [
  { amount: 5, bonus: 0, label: '5 Diamonds + 0 Bonus' },
  { amount: 11, bonus: 1, label: '11 Diamonds + 1 Bonus' },
  { amount: 17, bonus: 2, label: '17 Diamonds + 2 Bonus' },
  { amount: 25, bonus: 3, label: '25 Diamonds + 3 Bonus' },
  { amount: 40, bonus: 4, label: '40 Diamonds + 4 Bonus' },
  { amount: 53, bonus: 6, label: '53 Diamonds + 6 Bonus' },
  { amount: 77, bonus: 8, label: '77 Diamonds + 8 Bonus' },
  { amount: 154, bonus: 16, label: '154 Diamonds + 16 Bonus' },
  { amount: 217, bonus: 23, label: '217 Diamonds + 23 Bonus' },
  { amount: 256, bonus: 40, label: '256 Diamonds + 40 Bonus' },
  { amount: 367, bonus: 41, label: '367 Diamonds + 41 Bonus' },
  { amount: 503, bonus: 65, label: '503 Diamonds + 65 Bonus' },
  { amount: 774, bonus: 101, label: '774 Diamonds + 101 Bonus' },
  { amount: 1708, bonus: 302, label: '1708 Diamonds + 302 Bonus' },
  { amount: 4003, bonus: 827, label: '4003 Diamonds + 827 Bonus' },
];

const paymentMethods = [
  { category: 'E-wallet', methods: ['ShopeePay', 'OVO', 'GoPay', 'DANA', 'LinkAja'] },
  { category: 'Transfer Bank', methods: ['BCA', 'Mandiri', 'BNI', 'BRI'] },
  { category: 'SMS & Seluler', methods: ['Telkomsel'] },
  { category: 'OTC non-Bank', methods: ['Indomaret', 'Alfamart'] },
  { category: 'Pembayaran online', methods: ['QRIS'] },
  { category: 'Debit / Credit Card', methods: ['Visa', 'Mastercard'] },
];

export default function ProductPage() {
    const params = useParams();
    const { productid } = params;
  
    const game = games.find(g => g.id === parseInt(productid));
  
    if (!game) {
      return <div>Game not found</div>;
    }
  
    return (
      <TopUpPage
        game={game}
        topUpOptions={topUpOptions}
        paymentMethods={paymentMethods}
      />
    );
}