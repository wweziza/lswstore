import React, { useState } from 'react';
import { LayoutDashboard, BarChart2, CreditCard, Settings, Users, X, Menu } from 'lucide-react';
import { Button } from '../../components/ui';

const Sidebar = ({ activeTab, setActiveTab, isAdmin }) => {
  const [expanded, setExpanded] = useState(true);

  const sidebarItems = [
    { label: 'Overview', id: 'overview', isHeader: true },
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', id: 'analytics' },
    { label: 'Management', id: 'management', isHeader: true },
    { icon: <CreditCard size={20} />, label: 'Accounts', id: 'accounts' },
    { icon: <Settings size={20} />, label: 'Settings', id: 'settings' },
  ];

  if (isAdmin) {
    sidebarItems.push({ icon: <Users size={20} />, label: 'Admin', id: 'admin' });
  }

  return (
    <div
      className={`bg-gray-100 border-r border-gray-200 transition-all duration-300 ease-in-out ${
        expanded ? 'w-64' : 'w-16'
      } h-screen flex flex-col`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="self-end m-2 text-gray-600"
        onClick={() => setExpanded(!expanded)}
      >
            <div className="flex items-center justify-between ml-10">
              {expanded ? (
                <X size={24} className="text-gray-600" />
              ) : (
                <Menu size={24} className="text-gray-600" />
              )}
            </div>
      </Button>
      <nav className="flex-grow">
        {sidebarItems.map((item) => (
          <div key={item.id} className="px-0.5 py-2">
            {item.isHeader ? (
              <h3
                className={`text-xs font-semibold text-gray-500 uppercase tracking-wider ml-2 ${
                  expanded ? 'block' : 'hidden'
                }`}
              >
                {item.label}
              </h3>
            ) : (
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={`w-full flex items-center justify-start ${
                  expanded ? 'px-4' : 'px-2'
                } ${
                  activeTab === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="w-6">{item.icon}</span>
                {expanded && <span className="ml-3">{item.label}</span>}
              </Button>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;