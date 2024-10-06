import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const GameIdInput = ({ game, onUserIdChange, onZoneIdChange, onServerChange }) => {
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [server, setServer] = useState('');

  useEffect(() => {
    onUserIdChange(userId);
  }, [userId, onUserIdChange]);

  useEffect(() => {
    onZoneIdChange(zoneId);
  }, [zoneId, onZoneIdChange]);

  useEffect(() => {
    onServerChange(server);
  }, [server, onServerChange]);

  const renderInputFields = () => {
    switch (game.game_abr) {
      case 'gi':
        return (
          <>
            <input
              type="text"
              placeholder="Enter your User ID"
              className="flex-grow p-2 border rounded"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <div className="relative w-1/3">
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full p-2 border rounded appearance-none"
              >
                <option value="">Select Server</option>
                <option value="america">America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="tw_hk_mo">TW/HK/MO Server</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </>
        );
      case 'mlbb':
        return (
          <>
            <input
              type="text"
              placeholder="Enter your User ID"
              className="flex-grow p-2 border rounded"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Zone ID"
              className="w-1/3 p-2 border rounded"
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
            />
          </>
        );
      case 'hok':
      default:
        return (
          <input
            type="text"
            placeholder="Enter your User ID"
            className="w-full p-2 border rounded"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">1. Enter User ID</h2>
      <div className="flex gap-4">
        {renderInputFields()}
      </div>
    </div>
  );
};

export default GameIdInput;
