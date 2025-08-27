import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } 
        catch (err) {
        setError(err.message);
        setLoading(false);
    }
};

fetchProducts();
}, []);
if (loading) return <div className="loading">Loading products...</div>;
if (error) return <div className="error">Error: {error}</div>;

return (
<div className="product-list">
    <h1>Our Products</h1>
    <div className="products-grid">
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>
    </div>
  );
};
export default ProductList;