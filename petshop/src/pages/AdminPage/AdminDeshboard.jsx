import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import { LayoutDashboard, ShoppingBag, Users, Package } from 'lucide-react';
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GrBladesVertical } from "react-icons/gr";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdContactSupport } from "react-icons/md";
import "../../components/AdminComponents/css/Admin.css";
import Dashboard from '../../components/AdminComponents/Dashboard';
import Products from '../../components/AdminComponents/Products';
import PCategories from '../../components/AdminComponents/PCategories';
import Orders from '../../components/AdminComponents/Orders';
import AddProduct from '../../components/AdminComponents/AddProduct';
import AddCategory from '../../components/AdminComponents/AddCategory';
import UsersPage from '../../components/AdminComponents/UsersPage';
import { Link, useNavigate } from 'react-router-dom';
import ContactAdmin from '../../components/AdminComponents/ContactAdmin';
import EditCategory from '../../components/AdminComponents/EditCategory';
import AddCategoryMenu from '../../components/AdminComponents/AddCategoryMenu';
import MenuCategory from '../../components/AdminComponents/MenuCategory';
import EditMenuCategory from '../../components/AdminComponents/EditMenuCategory';
import EditProduct from '../../components/AdminComponents/EditProduct';
import OrderPrint from '../../components/AdminComponents/OrderPrint';

function AdminDeshboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  const adminName = localStorage.getItem("adminName");
  const adminEmail = localStorage.getItem("adminEmail");

  // Capture orderId for dynamic route
  const { orderId } = useParams();

  const renderContent = () => {
    if (orderId) {  // Check if orderId is present
      return <OrderPrint orderId={orderId} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products onAddClick={() => setCurrentPage('add-product')} onEditClick={(productId) => { setSelectedProductId(productId); setCurrentPage('edit-product') }} />;
      case 'categories':
        return <PCategories onAddClick={() => setCurrentPage('add-category')} onEditClick={(categoryId) => { setSelectedCategoryId(categoryId); setCurrentPage('edit-category'); }} />;
      case 'categorymenu':
        return <MenuCategory onAddClick={() => setCurrentPage('add-category-menu')} onEditClick={(categoryId) => { setSelectedCategoryId(categoryId); setCurrentPage('edit-category-menu'); }} />;
      case 'users':
        return <UsersPage />;
      case 'orders':
        return <Orders />;
      case 'add-product':
        return <AddProduct onBack={() => setCurrentPage('products')} />;
      case 'add-category':
        return <AddCategory onBack={() => setCurrentPage('categories')} />;
      case 'edit-category':
        return <EditCategory categoryId={selectedCategoryId} onBack={() => setCurrentPage('categories')} />;
      case 'add-category-menu':
        return <AddCategoryMenu onBack={() => setCurrentPage('categorymenu')} />;
      case 'edit-category-menu':
        return <EditMenuCategory categoryId={selectedCategoryId} onBack={() => setCurrentPage('categorymenu')} />;
      case 'edit-product':
        return <EditProduct productId={selectedProductId} onBack={() => setCurrentPage('products')} />;
      case 'contact':
        return <ContactAdmin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="adashboard">
      <aside className="asidebar">
        <div className="asidebar-logo">
          <ShoppingBag size={28} />
          <span>Admin Panel</span>
        </div>

        <div className="aadmin-profile">
          <div className="aadmin-avatar">
            <FaUserCircle size={24} />
          </div>
          <div className="aadmin-info">
            <div className="aadmin-name">{adminName}</div>
            <div className="aadmin-email">{adminEmail}</div>
          </div>
        </div>

        <nav>
          <ul className="anav-list">
            <li className="anav-item">
              <Link
                to="/admin/dashboard"
                className={`anav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentPage('dashboard')}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
            </li>
            <li className="anav-item">
              <Link
                to="/admin/products"
                className={`anav-link ${currentPage === 'products' || currentPage === 'add-product' ? 'active' : ''}`}
                onClick={() => setCurrentPage('products')}
              >
                <Package size={20} />
                Products
              </Link>
            </li>
            <li className="anav-item">
              <Link
                to="/admin/categorymenu"
                className={`anav-link ${currentPage === 'categorymenu' || currentPage === 'add-category-menu' ? 'active' : ''}`}
                onClick={() => setCurrentPage('categorymenu')}
              >
                <GrBladesVertical size={20} />
                Categories Menu
              </Link>
            </li>
            <li className="anav-item">
              <Link
                to="/admin/categories"
                className={`anav-link ${currentPage === 'categories' || currentPage === 'add-category' ? 'active' : ''}`}
                onClick={() => setCurrentPage('categories')}
              >
                <GrBladesVertical size={20} />
                Categories
              </Link>
            </li>
            <li className="anav-item">
              <Link
                to="/admin/users"
                className={`anav-link ${currentPage === 'users' ? 'active' : ''}`}
                onClick={() => setCurrentPage('users')}
              >
                <Users size={20} />
                Users
              </Link>
            </li>
            <li className="anav-item">
              <Link
                to="/admin/orders"
                className={`anav-link ${currentPage === 'orders' ? 'active' : ''}`}
                onClick={() => setCurrentPage('orders')}
              >
                <CiDeliveryTruck size={20} />
                Orders
              </Link>
            </li>
            <li className="anav-item">
              <Link
                to="/admin/contact"
                className={`anav-link ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => setCurrentPage('contact')}
              >
                <MdContactSupport size={20} />
                Contact
              </Link>
            </li>
            <li className="anav-item" style={{ marginTop: 'auto' }}>
              <Link className="anav-link" onClick={() => { localStorage.removeItem("isAdminAuthenticated"); localStorage.removeItem("adminName"); localStorage.removeItem("adminEmail"); navigate("/adminlogin") }}>
                <IoMdLogOut size={20} />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="amain">{renderContent()}</div>
    </div>
  );
}

export default AdminDeshboard;
