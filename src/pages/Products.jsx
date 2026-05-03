import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack",
      price: 109.95,
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9 },
      count: 10
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1 },
      count: 0 
    }
  ];
  const loading = false;
  const error = null;

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); 

    return () => clearTimeout(timer);
  }, [searchTerm]);

  function handleAddToCart(product) {
    alert("Added " + product.title + " to cart!");
  }

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Products</h1>
        
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* Skeleton UI */}
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{ border: '1px solid #ccc', padding: '15px', width: '250px', height: '350px', backgroundColor: '#f0f0f0', animation: 'pulse 1.5s infinite' }}>
              Loading...
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>No products found</h2>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {filteredProducts.map(product => {
            const isOutOfStock = product.count === 0;

            return (
              <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
                  <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 5px 0' }}>{product.category}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: '10px 0' }}>${product.price}</h2>
                    <span style={{ fontSize: '0.9rem' }}>⭐ {product.rating?.rate}</span>
                  </div>
                  <p style={{ color: isOutOfStock ? 'red' : 'green', margin: '5px 0 15px 0' }}>
                    {isOutOfStock ? 'Out of Stock' : `In Stock: ${product.count}`}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  disabled={isOutOfStock}
                  style={{ 
                    padding: '10px', 
                    backgroundColor: isOutOfStock ? '#ccc' : '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
