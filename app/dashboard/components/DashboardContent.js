import React from 'react';
import { User, ShoppingCart, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui';
import GameHistory from './GameHistory';

function formatIDR(value) {
  let [integer, decimal] = value.toFixed(2).split(".");
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${integer}.${decimal}`;
}

const DashboardCard = ({ icon, title, content }) => (
  <Card className="bg-white">
    <CardHeader>
      <div className="flex items-center">
        {icon}
        <h2 className="text-xl font-semibold ml-3 text-gray-800">{title}</h2>
      </div>
    </CardHeader>
    <CardContent>{content}</CardContent>
  </Card>
);

const DashboardContent = ({ session }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      <DashboardCard
        icon={<User className="h-8 w-8 text-blue-500" />}
        title="Account Info"
        content={
          <>
            <p>Username: {session.user.name}</p>
            <p>Account Type: {session.user.isAdmin ? 'Admin' : 'User'}</p>
          </>
        }
      />
      <DashboardCard
        icon={<ShoppingCart className="h-8 w-8 text-green-500" />}
        title="Balance"
        content={<p className="text-3xl font-bold">IDR {formatIDR(session.user.balance)}</p>}
      />
      <DashboardCard
        icon={<BarChart2 className="h-8 w-8 text-purple-500" />}
        title="Recent Activity"
        content={<p>No recent activity to display.</p>}
      />
    </div>
    <GameHistory />
  </>
);

export default DashboardContent;