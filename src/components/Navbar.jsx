import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useContext(CartContext);

  useEffect(() => {
    let savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  function handleLogout() {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login');
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#333', color: 'white' }}>
      <div>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
          React E-Commerce
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
        
        {user ? (
          <>
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart ({totalQuantity})</Link>
            
            {user.role === 'admin' && (
              <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</Link>
            )}
            
            <span style={{ color: '#ccc' }}>| Hi, {user.name}</span>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
