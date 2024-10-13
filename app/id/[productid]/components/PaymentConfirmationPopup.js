import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle } from 'lucide-react';

const PaymentConfirmationPopup = ({ isOpen, onClose, paymentDetails, selectedPayment }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    const checkPaymentStatus = async (orderId) => {
      try {
        const response = await fetch(`/api/midtrans/payment?orderId=${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payment status');
        }
        const data = await response.json();
        const deeplinkRedirect = data.actions?.find(action => action.name === 'deeplink-redirect')?.url;
        if (deeplinkRedirect) {
          window.location.href = deeplinkRedirect;
        }

        return data.transaction_status;
      } catch (error) {
        console.error('Error checking payment status:', error);
        return 'error';
      }
    };

    const statusCheckInterval = setInterval(async () => {
      const status = await checkPaymentStatus(paymentDetails.order_id);
      if (status === 'settlement' || status === 'capture') {
        setPaymentStatus('success');
        clearInterval(statusCheckInterval);
      } else if (status === 'cancel' || status === 'deny' || status === 'expire') {
        setPaymentStatus('failed');
        clearInterval(statusCheckInterval);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(statusCheckInterval);
    };
  }, [isOpen, paymentDetails.order_id]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderPaymentDetails = () => {
    if (paymentStatus === 'success') {
      return (
        <div className="text-center">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h3>
          <p>Thank you for your payment. Your transaction has been completed successfully.</p>
        </div>
      );
    }

    switch(paymentDetails.payment_type) {
      case 'bank_transfer':
        return (
          <>
            <p>
              <span className="font-semibold">Virtual Account Number: </span> 
              <span className="highlight-va bg-green-200 text-green-600 font-bold px-2 py-1 rounded">
                {paymentDetails.va_numbers[0].va_number}
              </span>
            </p>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Payment Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Log in to your mobile banking app or internet banking.</li>
                <li>Select &quot;Transfer&quot; or &quot;Pay&quot; option.</li>
                <li>Choose &quot;{paymentDetails.va_numbers[0].bank} Virtual Account&quot; as the destination.</li>
                <li>Enter the Virtual Account number: {paymentDetails.va_numbers[0].va_number}</li>
                <li>Enter the exact amount: Rp {parseInt(paymentDetails.gross_amount).toLocaleString()}</li>
                <li>Confirm and complete the transaction.</li>
              </ol>
            </div>
          </>
        );
      case 'gopay':
        const qrCodeUrl = paymentDetails.actions.find(action => action.name === 'generate-qr-code')?.url;
        return (
          <>
            {qrCodeUrl && (
              <div className="mt-4 flex justify-center">
                <img src={qrCodeUrl} alt="QRIS QR Code" className="w-64 h-64" />
              </div>
            )}
            <p className="mt-4 text-center font-semibold">
              Scan the QR code above with your e-wallet app to complete the payment.
            </p>
          </>
        );
      default: // For e-wallets and other payment types
        return (
          <p className="mt-4 text-center">
            Please follow the instructions in your selected payment method app to complete the transaction.
          </p>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold">Payment Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center justify-between">
            <p>
              <span className="font-semibold">Payment Method: </span> 
              {selectedPayment}
            </p>
            {paymentStatus !== 'success' && (
              <div className="flex items-center text-red-500">
                <Clock size={20} className="mr-2" />
                {formatTime(timeLeft)}
              </div>
            )}
          </div>
          <p><span className="font-semibold">Total Payment:</span> Rp {parseInt(paymentDetails.gross_amount).toLocaleString()}</p>
          
          {renderPaymentDetails()}
        </div>

        {paymentStatus !== 'success' && (
          <p className="mt-4 text-sm text-gray-600">
            Please complete the payment before the timer expires. After successful payment, it may take a few minutes for the system to process your transaction.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmationPopup;
