import React, { useEffect, useState } from 'react';
import "../assets/css/ViewOrders.css"

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleItems = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 

    async function fetchUserOrders() {
      try {
        const response = await fetch(`http://localhost:8080/api/order/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserOrders();
  }, []);

  return (
    <div className="user-orders-container">
      <br/><br/><br/><br/>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Your Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-label">Order ID:</span> #{order.id}
                </div>
                <div>
                  <span className="order-label">Date:</span> {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="order-label">Status:</span> <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
                <div>
                  <span className="order-label">Total:</span> ₹{order.totalAmount.toFixed(2)}
                </div>
                <div>
                  <span className="order-label">Payment:</span> {order.paymentType}
                </div>
              </div>
              
              <div className="shipping-address">
                <h4>Shipping Address:</h4>
                <p>{order.orderAddress.fullName}</p>
                <p>{order.orderAddress.phone}</p>
                <p>{order.orderAddress.city}, {order.orderAddress.state} - {order.orderAddress.pinCode}</p>
                <p>{order.orderAddress.addressLine1}, {order.orderAddress.addressLine2}</p>
              </div>
              
              <div className="view-items-button">
                <button onClick={() => toggleItems(order.id)}>
                  {expandedOrderId === order.id ? 'Hide Items' : 'View Items'}
                </button>
              </div>

              {expandedOrderId === order.id && (
                <div className="order-items-scrollable">
                  <h4>Items:</h4>
                  <div className="order-items-container">
                    {order.productOrders && order.productOrders.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image">
                          <img 
                            src={`http://localhost:8080/uploads/${item.productImage}`} 
                            alt={item.productName} 
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80';
                            }}
                          />
                        </div>
                        <div className="item-details">
                          <h5>{item.productName}</h5>
                          <p>Brand: {item.brandName}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ₹{item.price.toFixed(2)}</p>
                          <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewOrders;