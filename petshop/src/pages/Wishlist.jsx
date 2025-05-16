/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import "../assets/css/Wishlist.css";
import { Link ,useNavigate} from 'react-router-dom';

function Wishlist() {
  const userId = localStorage.getItem("userId"); 
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate(); 


  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/wishlist/${userId}`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Error loading wishlist:", err);
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      await axios.delete(`http://localhost:8080/api/wishlist/remove/${wishlistId}`);
      fetchWishlist(); // Refresh list
    } catch (err) {
      console.error("Error removing wishlist item:", err);
    }
  };

  return (
    <div className="container">
      <header className="wheader">
        <h1><Heart size={36} style={{ color: '#e74c3c' }} /> My Wishlist</h1>
      </header>

      {/* Conditional Rendering for Empty Wishlist */}
      {wishlist.length === 0 ? (
        <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
          Wishlist is empty.
        </p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div className="wishlist-item" key={item.id}>
            <Link to={`/product/${item.product.id}`}  className="product-card-link">
              <img 
                src={`http://localhost:8080/uploads/${item.product.productImg}`} 
                alt={item.product.productName}
                className="item-image"
              />
            </Link>
              <div className="item-content">
                <h2 className="item-title">{item.product.productName}</h2>
                <p className="item-price">₹{item.product.price.toFixed(2)}</p>
                <div className="item-actions">
                  <button className="btn btn-primary" 
                   onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Redirect to the product detail page
                    navigate(`/product/${item.product.id}`);
                  }}>
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button className="btn btn-danger" onClick={() => removeFromWishlist(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
