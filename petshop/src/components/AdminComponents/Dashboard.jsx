import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Dashboard() {

  
  const [userCount,setUserCount] = useState(0);
  const [categoryCount,setCategoryCount] = useState(0);
  const [productCount,setProductCount] = useState(0);
  const [orderCount , setOrderCount] = useState(0);

  useEffect (()=>{
     fetchCategoryCount();
      fetchUserCount();
      fetchProductCount();
      fetchOrdertCount();
  },[]);


 const fetchCategoryCount = async () => {
    try{
         
        const response = await axios.get('http://localhost:8080/api/admin/categorycount');
        setCategoryCount(response.data)
    }catch(error){
      console.error(error)
    }
 }
 
  const fetchUserCount = async () => {

      try{
          const response = await axios.get('http://localhost:8080/api/admin/usercount');
              setUserCount(response.data);
      }catch(error){
        console.error(error)
      }

  }

const fetchProductCount = async () => {
    try{
      const response = await axios.get('http://localhost:8080/api/admin/productcount');
        setProductCount(response.data);
    }catch(error){
      console.error(error);
    }
}

const fetchOrdertCount = async () => {
  try{
    const response = await axios.get('http://localhost:8080/api/order/countorder');
      setOrderCount(response.data);
  }catch(error){
    console.error(error);
  }
}

  return (
    <div>
      <header className="aheader">
        <h1 className="apage-title">Dashboard</h1>
      </header>

      <div className="astats-grid">
        <div className="astat-card">
          <div className="astat-title">Total Products</div>
          <div className="astat-value">{productCount}</div>
        </div>
        <div className="astat-card">
          <div className="astat-title">Total Categories</div>
              <div className="astat-value">{categoryCount}</div>
        </div>
        <div className="astat-card">
          <div className="astat-title">Total Users</div>
          <div className="astat-value">{userCount}</div>
        </div>
        <div className="astat-card">
          <div className="astat-title">Total Orders</div>
          <div className="astat-value">{orderCount}</div>
        </div>
      </div>

    
    </div>
  );
}


export default Dashboard;


