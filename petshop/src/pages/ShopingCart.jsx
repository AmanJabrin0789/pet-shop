import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../assets/css/ShopingCart.css';
import { useNavigate } from 'react-router-dom';

function ShopingCart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");
  const { setCartCount } = useCart();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/getcartuser/${userId}`);
        const formattedCart = response.data.map(item => {
          const weightVal = parseInt(item.weight) || 1;
          const unitPrice = item.product.price * weightVal;

          return {
            id: item.cartId,
            productId: item.product.id,
            name: item.product.productName,
            description: item.product.description,
            price: item.product.price,
            unitPrice: unitPrice,
            quantity: item.productQuantity,
            totalPrice: unitPrice * item.productQuantity,
            size: item.size,
            weight: item.weight,
            image: `http://localhost:8080/uploads/${item.product.productImg}`
          };
        });

        setCartItems(formattedCart);
      } catch (error) {
        console.error("❌ Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Remove item completely
  const removeItem = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/cart/removecartitem`, null, {
        params: { cartId: id }
      });

      setCartItems(items => items.filter(item => item.id !== id));

      const countRes = await axios.get(`http://localhost:8080/api/cart/getcartusercount/${userId}`);
      setCartCount(countRes.data);
    } catch (error) {
      console.error("❌ Failed to remove item:", error);
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (item) => {
    try {
      await axios.post(`http://localhost:8080/api/cart/removefromcart`, null, {
        params: {
          userId,
          productId: item.productId,
          quantityToRemove: 1
        }
      });

      const updatedCart = cartItems.map(cartItem => {
        if (cartItem.id === item.id) {
          const newQuantity = cartItem.quantity - 1;
          const newTotal = newQuantity * cartItem.unitPrice;

          return {
            ...cartItem,
            quantity: newQuantity,
            totalPrice: newTotal
          };
        }
        return cartItem;
      }).filter(cartItem => cartItem.quantity > 0);

      setCartItems(updatedCart);

      const countRes = await axios.get(`http://localhost:8080/api/cart/getcartusercount/${userId}`);
      setCartCount(countRes.data);
    } catch (error) {
      console.error("❌ Error reducing quantity:", error);
    }
  };

  // Increase quantity
  const increaseQuantity = async (item) => {
    try {
      await axios.post(`http://localhost:8080/api/cart/addtocart`, null, {
        params: {
          userId,
          productId: item.productId,
          quantity: 1,
          productPrice: item.unitPrice,
          size: item.size || "",
          weight: item.weight || ""
        }
      });

      const updatedCart = cartItems.map(cartItem => {
        if (cartItem.id === item.id) {
          const newQuantity = cartItem.quantity + 1;
          const newTotal = newQuantity * cartItem.unitPrice;

          return {
            ...cartItem,
            quantity: newQuantity,
            totalPrice: newTotal
          };
        }
        return cartItem;
      });

      setCartItems(updatedCart);

      const countRes = await axios.get(`http://localhost:8080/api/cart/getcartusercount/${userId}`);
      setCartCount(countRes.data);
    } catch (error) {
      console.error("❌ Error increasing quantity:", error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } }); // Pass cart items as state
  };


  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <ShoppingCart size={70} color="#666" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <a href="/shop" className="continue-shopping">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1><ShoppingCart size={50} /></h1>
        <i><p>{cartItems.length} items in your cart</p></i>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
                style={{
                  width: '180px',
                  height: 'auto',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginRight: '20px'
                }}
              />

              <div className="item-details" style={{ marginLeft: '70px' }}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="item-meta">
                  {item.size && <p><strong>Size:</strong> {item.size}</p>}
                  {item.weight && <p><strong>Weight:</strong> {item.weight}</p>}
                </div>
              </div>

              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => decreaseQuantity(item)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => increaseQuantity(item)}   disabled={item.quantity >= 10}>
                  <Plus size={16} />
                </button>
              </div>

              <span className="cart-price">₹{item.totalPrice.toFixed(2)}</span>

              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-summary">
        <div className="summary-row total">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default ShopingCart;
