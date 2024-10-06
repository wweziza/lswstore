import React, { useState, useEffect } from 'react';
import { Edit, Trash, ChevronUp, ChevronDown } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Input, Button } from '../../components/ui';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './utils/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('product_id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [newProduct, setNewProduct] = useState({
    product_name: '', // Changed from product_id to product_name
    product_type: '',
    product_amount: 0,
    product_bonus: 0,
    product_price: 0,
    product_code: '',
  });

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(Array.isArray(data.products) ? data.products : []);
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
        setProducts([]); 
      });
  }, []);

  const handleAddProduct = () => {
    addProduct(newProduct).then((addedProduct) => {
      setProducts([...products, addedProduct]);
      setNewProduct({
        product_name: '', // Reset to empty string
        product_type: '',
        product_amount: 0,
        product_bonus: 0,
        product_price: 0,
        product_code: '',
      });
    });
  };

  const handleUpdateProduct = (productId, updates) => {
    const productToUpdate = products.find(product => product.product_id === productId);
    const updatedProduct = {
      ...productToUpdate,
      ...updates,
    };
    updateProduct(productId, updatedProduct).then(() => {
      setProducts(products.map(product => product.product_id === productId ? updatedProduct : product));
    });
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId).then(() => {
      setProducts(products.filter(product => product.product_id !== productId));
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

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Product Name"
          value={newProduct.product_name} 
          onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Product Type"
          value={newProduct.product_type}
          onChange={(e) => setNewProduct({ ...newProduct, product_type: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Product Amount"
          value={newProduct.product_amount}
          onChange={(e) => setNewProduct({ ...newProduct, product_amount: parseInt(e.target.value) })}
        />
        <Input
          type="number"
          placeholder="Product Bonus"
          value={newProduct.product_bonus}
          onChange={(e) => setNewProduct({ ...newProduct, product_bonus: parseInt(e.target.value) })}
        />
        <Input
          type="number"
          placeholder="Product Price"
          value={newProduct.product_price}
          onChange={(e) => setNewProduct({ ...newProduct, product_price: parseInt(e.target.value) })}
        />
          <Input
          type="text"
          placeholder="Product Code"
          value={newProduct.product_code}
          onChange={(e) => setNewProduct({ ...newProduct, product_code: e.target.value })}
        />
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('product_id')}>
              Product ID
              {sortColumn === 'product_id' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('product_name')}> {/* Changed to product_name */}
              Product Name
              {sortColumn === 'product_name' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('product_type')}>
              Product Type
              {sortColumn === 'product_type' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('product_amount')}>
              Product Amount
              {sortColumn === 'product_amount' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('product_bonus')}>
              Product Bonus
              {sortColumn === 'product_bonus' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('product_price')}>
              Product Price
              {sortColumn === 'product_price' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('product_price')}>
              Product Code
              {sortColumn === 'product_code' && (sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />)}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProducts.map(product => (
            <TableRow key={product.product_id}>
              <TableCell>{product.product_id}</TableCell>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.product_type}</TableCell>
              <TableCell>{product.product_amount}</TableCell>
              <TableCell>{product.product_bonus}</TableCell>
              <TableCell>{product.product_price}</TableCell>
              <TableCell>{product.product_code}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleUpdateProduct(product.product_id, { product_bonus: product.product_bonus })} // example update, adjust as needed
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500"
                  onClick={() => handleDeleteProduct(product.product_id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        {[...Array(Math.ceil(products.length / productsPerPage))].map((_, index) => (
          <Button key={index} onClick={() => paginate(index + 1)} className="mx-1">
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ProductManagement;
