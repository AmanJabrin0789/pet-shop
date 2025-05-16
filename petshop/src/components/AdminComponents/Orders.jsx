import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('http://localhost:8080/api/order/orders/allusers');
        const data = await response.json();

        const allOrders = data.flatMap(user =>
          user.orders.map(order => ({
            ...order,
            customerName: user.name, // Assuming 'name' field is present
          }))
        );

        // Sort by order ID in descending order (latest first)
        allOrders.sort((a, b) => b.id - a.id);

        setOrders(allOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchOrders();
  }, []);

  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await fetch(`http://localhost:8080/api/order/orders/${orderId}/status?status=${newStatus}`, {
        method: 'PUT',
      });

      if (response.ok) {
        // Update local state to reflect new status
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        console.log('Status updated successfully');
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePrintClick = (orderId) => {
    if (orderId) {
      navigate(`/admin/order/print/${orderId}`);
    } else {
      console.error('Order ID is undefined');
    }
  };

  return (
    <div>
      <header className="aheader">
        <h1 className="apage-title">Orders</h1>
      </header>

      <div className="atable-container">
        <table className="adata-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>View Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.orderDate}</td>
                <td>₹{order.totalAmount}</td>
                <td
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => handlePrintClick(order.id)}
                >
                  PRINT
                </td>
                <td>
                  <span className={`astatus astatus-${order.status?.toLowerCase().replace(' ', '-')}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    className="abtn-dropdown"
                    value={order.status}
                    onChange={(e) => handleStatusChange(e, order.id)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out of Delivery">Out of Delivery</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
