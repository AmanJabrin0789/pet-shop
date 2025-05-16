import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./css/OrderPrint.css"

function OrderPrint() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await fetch(`http://localhost:8080/api/order/ordersid/${orderId}`);
        const data = await response.json();
        // console.log(data)
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }
    fetchOrderDetails();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (!order || !order.orderAddress) {
    return <div>Loading...</div>;
  }

  const orderDate = new Date(order.orderDate).toLocaleDateString();

  return (
    <div className="pparcel-sticker">
      <div className="pparcel-header">
        <h2>Parcel Label</h2>
        <p>Order ID: {order.id}</p>
      </div>
      <div className="pparcel-details">
        <p><strong>Customer:</strong> {order.orderAddress.fullName}</p>
        <p><strong>Address:</strong> {order.orderAddress.houseNo}, {order.orderAddress.buildingName}, {order.orderAddress.roadNameAreaColony}, {order.orderAddress.city}, {order.orderAddress.state} - {order.orderAddress.pinCode}</p>
        <p><strong>Date:</strong> {orderDate}</p>
        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
        <p><strong>Payment Type:</strong> {order.paymentType}</p>
      </div>
      <div className="pparcel-products">
        <h3>Products:</h3>
        <ul>
          {order.productOrders && order.productOrders.map((product, index) => (
            <li key={index}>
              {product.quantity} x {product.productName} - ₹{product.price}
            </li>
          ))}
        </ul>
      </div>
      <button className='btn' onClick={handlePrint}>Print</button>
    </div>
  );
}

export default OrderPrint;
