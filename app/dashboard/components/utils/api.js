export const fetchUsers = async (page = 1, limit = 10, sort = 'id', order = 'ASC') => {
    const response = await fetch(`/api/accounts/index?page=${page}&limit=${limit}&sort=${sort}&order=${order}`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  };
  
  export const updateUser = async (userId, updates) => {
    const response = await fetch(`/api/accounts/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
  
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  };
  
  export const deleteUser = async (userId) => {
    const response = await fetch(`/api/accounts/${userId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  };
  
  export const fetchProducts = async (page = 1, limit = 10, sort = 'product_id', order = 'ASC') => {
    const response = await fetch(`/api/products/index?page=${page}&limit=${limit}&sort=${sort}&order=${order}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  };
  
  export const addProduct = async (product) => {
    const response = await fetch('/api/products/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  
    if (!response.ok) throw new Error('Failed to add product');
    return response.json();
  };
  
  export const updateProduct = async (productId, updates) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
  
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  };
  
  export const deleteProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  };
  