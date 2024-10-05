'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Home, LayoutDashboard, BarChart2, CreditCard, Settings, Users, LogOut, User, ShoppingCart, Edit, Trash } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {
  Button, Card, CardHeader, CardContent, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Input, Select
} from '../components/ui';

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
        {expanded ? '«' : '»'}
      </Button>
      <nav className="flex-grow">
        {sidebarItems.map((item) => (
          <div key={item.id} className="px-0.5 py-2">
            {item.isHeader ? (
              <h3
                className={`text-xs font-semibold text-gray-500 uppercase tracking-wider ${
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


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [status, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-grow">
        {!isMobile && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={session.user.isAdmin} />}
        <main className="flex-grow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome, {session.user.name}!</h1>
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

const AnalyticsContent = ({ session }) => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold">Analytics</h2>
    </CardHeader>
    <CardContent>
      <p>Your analytics data will be displayed here.</p>
    </CardContent>
  </Card>
);

const AccountsContent = ({ session }) => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold">Accounts</h2>
    </CardHeader>
    <CardContent>
      <p>Manage your accounts here, {session.user.name}.</p>
    </CardContent>
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
        content={<p className="text-3xl font-bold">${session.user.balance.toFixed(2)}</p>}
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
const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleUpdateUser = (userId, updates) => {
    updateUser(userId, updates).then(() => {
      setUsers(users.map(user => user.id === userId ? { ...user, ...updates } : user));
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Is Admin</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <input
                type="checkbox"
                checked={user.isAdmin}
                onChange={(e) => handleUpdateUser(user.id, { isAdmin: e.target.checked })}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={user.balance}
                onChange={(e) => handleUpdateUser(user.id, { balance: parseFloat(e.target.value) })}
              />
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline" className="mr-2">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="text-red-500">
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAddProduct = () => {
    addProduct(newProduct).then(product => {
      setProducts([...products, product]);
      setNewProduct({ name: '', price: 0 });
    });
  };

  const handleUpdateProduct = (productId, updates) => {
    updateProduct(productId, updates).then(() => {
      setProducts(products.map(product => product.id === productId ? { ...product, ...updates } : product));
    });
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId).then(() => {
      setProducts(products.filter(product => product.id !== productId));
    });
  };

  return (
    <>
      <div className="mb-4">
        <Input
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="mr-2"
        />
        <Input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          className="mr-2"
        />
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleUpdateProduct(product.id, { price: parseFloat(e.target.value) })}
                />
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline" className="mr-2" onClick={() => handleUpdateProduct(product.id, { name: product.name, price: product.price })}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const GameHistory = () => (
  <Card>
    <CardHeader>
      <h2 className="text-2xl font-semibold flex items-center text-gray-800">
        Game History
      </h2>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}>No game history available</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const SettingsPanel = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Profile Settings</DialogTitle>
        <DialogDescription>Update your profile information here.</DialogDescription>
      </DialogHeader>
      <Button onClick={onClose}>Save Changes</Button>
    </DialogContent>
  </Dialog>
);

// Mock API 
const fetchUsers = () => Promise.resolve([
  { id: 1, name: 'User 1', isAdmin: false, balance: 100 },
  { id: 2, name: 'Admin 1', isAdmin: true, balance: 500 },
]);

const updateUser = (userId, updates) => Promise.resolve({ id: userId, ...updates });

const fetchProducts = () => Promise.resolve([
  { id: 1, name: 'Product 1', price: 9.99 },
  { id: 2, name: 'Product 2', price: 19.99 },
]);

const addProduct = (product) => Promise.resolve({ id: Date.now(), ...product });

const updateProduct = (productId, updates) => Promise.resolve({ id: productId, ...updates });

const deleteProduct = (productId) => Promise.resolve();