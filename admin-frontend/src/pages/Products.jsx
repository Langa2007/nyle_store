import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const fetchProducts = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;

      const response = await axios.get('http://localhost:5000/api/products/search', { params });
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product name..."
          className="border p-2 rounded w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white shadow p-4 rounded">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="mt-2 font-bold text-blue-600">KES {product.price}</p>
              <p className="text-sm">Stock: {product.stock}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
