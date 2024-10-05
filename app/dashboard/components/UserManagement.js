import React, { useState, useEffect } from 'react';
import { Edit, Trash, ChevronUp, ChevronDown } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Input, Button } from '../../components/ui';
import { fetchUsers, updateUser, deleteUser } from './utils/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('username');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editBalance, setEditBalance] = useState({});
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(Array.isArray(data.accounts) ? data.accounts : []);
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
        setUsers([]); 
      });
  }, []);

  const handleUpdateUser = (userId, updates) => {
    const userToUpdate = users.find(user => user.id === userId);
    const updatedUser = {
      ...userToUpdate,
      ...updates,
    };
    updateUser(userId, updatedUser).then(() => {
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
    });
  };
  

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then(() => {
      setUsers(users.filter(user => user.id !== userId));
    });
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleBalanceChange = (userId, balance) => {
    setEditBalance({ ...editBalance, [userId]: balance });
  };

  const sortedUsers = Array.isArray(users) ? [...users].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  }) : [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('id')}>
              ID
              {sortColumn === 'id' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            {['Username', 'Email', 'Is Admin', 'Balance'].map((header, index) => (
              <TableHead key={index} onClick={() => handleSort(['username', 'email', 'admin', 'balance'][index])}>
                {header}
                {sortColumn === ['username', 'email', 'admin', 'balance'][index] && (
                  sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                )}
              </TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={user.admin === 1} 
                  onChange={(e) => handleUpdateUser(user.id, { admin: e.target.checked ? 1 : 0 })}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={editBalance[user.id] !== undefined ? editBalance[user.id] : user.balance}
                  onChange={(e) => handleBalanceChange(user.id, parseFloat(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleUpdateUser(user.id, { balance: editBalance[user.id] })}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
          <Button key={index} onClick={() => paginate(index + 1)} className="mx-1">
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default UserManagement;
