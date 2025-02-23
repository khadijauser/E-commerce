import React, { useEffect, useState } from 'react';
import ProductForm from '../Components/ProductForm';
import ProductList from '../Components/ProductList';
import './App.css'
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);

  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3440/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel - Manage Products</h1>

      
      <ProductForm fetchProducts={fetchProducts} />

     
      <ProductList products={products} fetchProducts={fetchProducts} />
    </div>
  );
};

export default AdminPage;
