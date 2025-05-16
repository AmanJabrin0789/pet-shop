import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function ContactAdmin() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/contect/messages');
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  return (
    <div>
      <header className="aheader">
        <h1 className="apage-title">Contact Message</h1>
      </header>

      <div className="atable-container">
        <table className="adata-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.id}</td>
                <td>{msg.name}</td>
                <td>{msg.userEmail}</td>
                <td>{msg.msg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactAdmin;
