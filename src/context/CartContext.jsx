import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let saved = localStorage.getItem('cart');
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    let itemExists = false;
    let newCart = [];

    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      if (item.id === product.id) {
        itemExists = true;
        newCart.push({ ...item, quantity: item.quantity + 1 });
      } else {
        newCart.push(item);
      }
    }

    if (itemExists == false) {
      newCart.push({ ...product, quantity: 1 });
    }

    setCartItems(newCart);
  }

  function removeFromCart(id) {
    let newCart = cartItems.filter((item) => {
      return item.id !== id;
    });
    setCartItems(newCart);
  }

  function increaseQuantity(id) {
    let newCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(newCart);
  }

  function decreaseQuantity(id) {
    let newCart = [];
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      if (item.id === id) {
        if (item.quantity > 1) {
          newCart.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        newCart.push(item);
      }
    }
    setCartItems(newCart);
  }

  let totalQuantity = 0;
  let totalPrice = 0;
  
  for (let i = 0; i < cartItems.length; i++) {
    totalQuantity = totalQuantity + cartItems[i].quantity;
    totalPrice = totalPrice + (cartItems[i].price * cartItems[i].quantity);
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      increaseQuantity, 
      decreaseQuantity,
      totalQuantity,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}
