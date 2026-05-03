import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <div>
              <h3 style={{ margin: '0 0 10px 0' }}>{item.title}</h3>
              <p style={{ margin: 0, color: '#666' }}>Price: ${item.price}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => decreaseQuantity(item.id)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
            <span style={{ fontSize: '1.2rem', margin: '0 10px' }}>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
            <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}>Remove</button>
          </div>

        </div>
      ))}

      <div style={{ textAlign: 'right', marginTop: '20px', borderTop: '2px solid #ccc', paddingTop: '20px' }}>
        <h2>Total Price: ${Math.round(totalPrice * 100) / 100}</h2>
      </div>
    </div>
  )
}

export default Cart;