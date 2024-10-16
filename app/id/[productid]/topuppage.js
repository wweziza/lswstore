import React, { useState, useEffect } from 'react';

import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import GameIdInput from './components/gameinput';
import SummaryDialog from './components/SummaryDialog';
import {AlertTitle, Alert, AlertDescription} from '../../components/ui'
const TopUpPage = ({ game, topUpOptions, paymentMethods }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [server, setServer] = useState('');
  const [errors, setErrors] = useState({});

  const handlePayNowClick = () => {
    const newErrors = {};

    if (!selectedOption) {
      newErrors.option = "Please select a top-up option";
    }
    if (!selectedPayment) {
      newErrors.payment = "Please select a payment method";
    }
    if (!userId) {
      newErrors.userId = "Please enter your User ID";
    }
    if (game.requiresZoneId && !zoneId) {
      newErrors.zoneId = "Please enter your Zone ID";
    }
    if (game.requiresServer && !server) {
      newErrors.server = "Please select a server";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo(0, 0);
    } else {
      setErrors({});
      setIsSummaryDialogOpen(true);
    }
  };

  const handleConfirmTransaction = async () => {
    try {
      const grossAmount = Math.ceil(selectedOption.product_price * 1.01);
      const response = await fetch('/api/midtrans/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gross_amount: grossAmount,
          order_id: `ORDER-${Date.now()}`,
          item_id: selectedOption.product_code,
          item_name: selectedOption.product_type,
          customer_name: '[CUSTOMER_NAME]',
          customer_email: '[CUSTOMER_EMAIL]@gmail.com',
          customer_phone: '[CUSTOMER_PHONE]',
          metadata: {
            userid: userId,
            zone: zoneId,
            code: selectedOption.product_code
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Snap token');
      }

      const { token } = await response.json();

      window.snap.pay(token, {
        onSuccess: function(result) {
          console.log('Payment success:', result);
        },
        onPending: function(result) {
          console.log('Payment pending:', result);
        },
        onError: function(result) {
          console.log('Payment error:', result);
        },
        onClose: function() {
          console.log('Customer closed the popup without finishing the payment');
        }
      });

    } catch (error) {
      console.error('Error creating Snap token:', error);
    }
  };

  useEffect(() => {
    const midtransScriptUrl = 'https://app.midtrans.com/snap/snap.js';
    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY; 

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
      {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
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
                {selectedPayment
                  ? `${selectedOption.product_amount + selectedOption.product_bonus} ${selectedOption.product_type}`
                  : '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price</span>
              <span className="text-lg font-semibold text-gray-800">
                {selectedPayment ? `Rp ${(selectedOption.product_price * 1.01).toLocaleString()}` : '-'}
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
    </div>
  );
};

export default TopUpPage;