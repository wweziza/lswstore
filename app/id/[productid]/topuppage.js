import React, { useState } from 'react';
import { ChevronDown, Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import GameIdInput from './components/gameinput';
import SummaryDialog from './components/SummaryDialog';
import PaymentConfirmationPopup from './components/PaymentConfirmationPopup';

const TopUpPage = ({ game, topUpOptions, paymentMethods }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [server, setServer] = useState('');

  const handlePayNowClick = () => {
    setIsSummaryDialogOpen(true);
  };

  const handleConfirmTransaction = async () => {
    let endpoint = '/api/midtrans/payment';
    let paymentType = '';

    if (['BCA', 'Mandiri', 'BNI', 'BRI'].includes(selectedPayment)) {
        paymentType = 'bank_transfer';
    } else if (['ShopeePay', 'OVO', 'GoPay', 'DANA', 'LinkAja'].includes(selectedPayment)) {
        paymentType = 'ewallet';
    } else if (selectedPayment === 'QRIS') {
        paymentType = 'qris';
    } else {
        console.error('Unsupported payment method');
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gross_amount: selectedOption.product_price,
                order_id: `ORDER-${Date.now()}`,
                payment_type: paymentType,
                payment_method: selectedPayment.toLowerCase(),
                customer_name: '[CUSTOMER_NAME]',
                customer_email: '[CUSTOMER_EMAIL]',
                customer_phone: '[CUSTOMER_PHONE]',
                item_id: selectedOption.product_code,
                item_name: selectedOption.product_type,
                metadata: {
                    userid: userId, 
                    zone: zoneId,  
                    code: selectedOption.product_code 
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to generate ${paymentType} payment`);
        }

        const paymentData = await response.json();
        setPaymentDetails(paymentData);
        setIsSummaryDialogOpen(false);
        setIsPaymentPopupOpen(true);
    } catch (error) {
        console.error(`Error generating ${paymentType} payment:`, error);
    }
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-6">
            <img src={game.image} alt={game.name} className="w-16 h-16 mr-4" />
            <div>
              <h1 className="text-2xl font-bold">{game.name}</h1>
              <p className="text-gray-600">Top up {game.name} now with LSW!</p>
            </div>
          </div>

          <GameIdInput 
            game={game} 
            onUserIdChange={setUserId}
            onZoneIdChange={setZoneId}
            onServerChange={setServer}
          />

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">2. Select Amount</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {topUpOptions.map((option) => (
                <button
                  key={option.product_id}
                  className={`p-4 border rounded-lg text-left ${
                    selectedOption === option ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <div className="font-semibold">{option.product_amount} {option.product_type}</div>
                  <div className="text-sm text-gray-600">+{option.product_bonus} Bonus</div>
                  <div className="mt-2 text-blue-600">Rp {option.product_price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">3. Select Payment Method</h2>
            {paymentMethods.map((category, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">{category.category}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {category.methods.map((method, methodIndex) => (
                    <button
                      key={methodIndex}
                      className={`p-2 border rounded-lg ${
                        selectedPayment === method ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'
                      }`}
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">Checkout Summary</h2>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Total Item</span>
              <span className="text-lg font-semibold text-gray-800">
                {selectedOption
                  ? `${selectedOption.product_amount + selectedOption.product_bonus} ${selectedOption.product_type}`
                  : '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price</span>
              <span className="text-lg font-semibold text-gray-800">
                {selectedOption ? `Rp ${selectedOption.product_price.toLocaleString()}` : '-'}
              </span>
            </div>
          </div>
          <button 
            className="w-full bg-blue-500 text-white py-3 mt-6 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handlePayNowClick}
          >
            Pay Now
          </button>
        </div>


      </main>
      <Footer />
      <SummaryDialog 
        isOpen={isSummaryDialogOpen}
        onClose={() => setIsSummaryDialogOpen(false)}
        onConfirm={handleConfirmTransaction}
        game={game}
        selectedOption={selectedOption}
        selectedPayment={selectedPayment}
        userId={userId}
        zoneId={zoneId}
        server={server}
      />
      {isPaymentPopupOpen && paymentDetails && (
        <PaymentConfirmationPopup
          isOpen={isPaymentPopupOpen}
          onClose={() => setIsPaymentPopupOpen(false)}
          paymentDetails={paymentDetails}
          selectedPayment={selectedPayment}
        />
      )}
    </div>
  );
};

export default TopUpPage;