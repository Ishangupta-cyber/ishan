
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Inventory from '../pages/Inventory';
import Login from '../pages/Login';
import Signup from '../pages/Signup';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      
      <Route 
        path="/cart" 
        element={<Cart />} 
      />
      
      <Route 
        path="/inventory" 
        element={<Inventory />} 
      />
    </Routes>
  );
}
