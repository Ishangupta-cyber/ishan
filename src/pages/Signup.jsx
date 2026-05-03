import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const userData = { name, email, password };
    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = existingUsers.find(u => u.email === email);
    if (userExists) {
      alert("User with this email already exists!");
      return;
    }

  
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    alert("Signup successful! Please login.");
    navigate('/login');
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder='Name' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
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
          Sign Up
        </button>
      </form>
    </div>
  )
}