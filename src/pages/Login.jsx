import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); 
    
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = existingUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert("Login successful! Welcome " + user.name);
      navigate('/products');
    } else {
      alert("Invalid email or password!");
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="email" 
          placeholder='Email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder='Password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Login
        </button>
      </form>
    </div>
  )
}