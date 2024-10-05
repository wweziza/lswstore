'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import AnalyticsContent from './components/AnalyticsContent';
import AccountsContent from './components/AccountsContent';
import SettingsPanel from './components/SettingsPanel';
import AdminPanel from './components/AdminPanel';
import UltimateLoading from '../components/loading';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [status, router]);

  if (status === 'loading') {
    return <UltimateLoading />;
  }

  if (!session) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-grow">
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isAdmin={session.user.isAdmin} 
            isMobile={isMobile}
            closeSidebar={() => setSidebarOpen(false)}
          />
        </div>
        <main className="flex-grow p-4 md:p-8">
          {activeTab === 'dashboard' && <DashboardContent session={session} />}
          {activeTab === 'analytics' && <AnalyticsContent session={session} />}
          {activeTab === 'accounts' && <AccountsContent session={session} />}
          {activeTab === 'settings' && <SettingsPanel />}
          {activeTab === 'admin' && session.user.isAdmin && <AdminPanel />}
        </main>
      </div>
      <Footer />
    </div>
  );
}