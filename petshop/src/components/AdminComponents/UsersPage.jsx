/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [orderCounts, setOrderCounts] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/showalluser');
      setUsers(response.data);

      // Fetch order counts for each user
      response.data.forEach((user) => {
        fetchOrderCount(user.id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrderCount = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/order/orderscount/${userId}`);
      setOrderCounts((prevCounts) => ({
        ...prevCounts,
        [userId]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching order count for user ${userId}:`, error);
    }
  };

  return (
    <div>
      <header className="aheader">
        <h1 className="apage-title">Users</h1>
      </header>

      <div className="atable-container">
        <table className="adata-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No users available
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.joinDate}</td>
                  <td>{orderCounts[user.id] ?? 'Loading...'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;
