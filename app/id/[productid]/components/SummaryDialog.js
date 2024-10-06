import React from 'react';
import { X } from 'lucide-react';

const SummaryDialog = ({ isOpen, onClose, game, selectedOption, selectedPayment, userId, zoneId, server }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold">Transaction Summary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <p><span className="font-semibold">Game:</span> {game.name}</p>
          <p><span className="font-semibold">User ID:</span> {userId}</p>
          {zoneId && <p><span className="font-semibold">Zone ID:</span> {zoneId}</p>}
          {server && <p><span className="font-semibold">Server:</span> {server}</p>}
          <p><span className="font-semibold">Username:</span> [-]</p>
          <p><span className="font-semibold">Item:</span> {selectedOption?.product_amount} {selectedOption?.product_type}</p>
          <p><span className="font-semibold">Price:</span> Rp {selectedOption?.product_price.toLocaleString()}</p>
          <p><span className="font-semibold">Payment Method:</span> {selectedPayment}</p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
          <p className="font-semibold text-lg">Please confirm the details above before proceeding.</p>
          <p>By clicking &apos;Confirm Transaction&apos;, you agree that the transaction details are correct.</p>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-3 mt-6 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => {
            console.log('Transaction confirmed');
            onClose();
          }}
        >
          Confirm Transaction
        </button>
      </div>
    </div>
  );
};

export default SummaryDialog;
