import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">← Back to Products</Link>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">${product.price}</p>
          
          <div className="product-rating">
            <span className="rating-stars">
              {'★'.repeat(Math.round(product.rating?.rate || 0))}
              {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
            </span>
            <span className="rating-count">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>
          
          <p className="product-description">{product.description}</p>
          
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;