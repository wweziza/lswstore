import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Card, CardHeader, CardContent, Button } from '../../components/ui';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';

const AdminPanel = () => {
  const [activeAdminTab, setActiveAdminTab] = useState('users');

  return (
    <Card className="mb-8">
      <CardHeader>
        <h2 className="text-2xl font-semibold flex items-center text-gray-800">
          <Users className="h-6 w-6 mr-2 text-indigo-500" />
          Admin Panel
        </h2>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Button 
            onClick={() => setActiveAdminTab('users')}
            variant={activeAdminTab === 'users' ? 'default' : 'outline'}
            className="mr-2"
          >
            Manage Users
          </Button>
          <Button 
            onClick={() => setActiveAdminTab('products')}
            variant={activeAdminTab === 'products' ? 'default' : 'outline'}
          >
            Manage Products
          </Button>
        </div>
        {activeAdminTab === 'users' && <UserManagement />}
        {activeAdminTab === 'products' && <ProductManagement />}
      </CardContent>
    </Card>
  );
};

export default AdminPanel;