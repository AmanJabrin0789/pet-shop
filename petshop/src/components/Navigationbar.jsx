import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, LogOut, Menu as MenuIcon, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTruckLoading } from "react-icons/fa";
import logo from '../assets/img/logoo.png';
import '../assets/css/Navigation.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';

function Navigation() {

  const location = useLocation();  // ✅ move this to the top
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const { cartCount, setCartCount } = useCart();


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios.get(`http://localhost:8080/api/cart/getcartusercount/${userId}`)
        .then(res => setCartCount(res.data))
        .catch(err => console.error("Cart fetch error:", err));
    }
  }, [location.pathname, setCartCount]);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      navigate(`/shop?search=${query}`);
    } else {
      navigate('/shop');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isUserAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsUserLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';
    setIsUserLoggedIn(isAuthenticated);
  }, [location.pathname]);

  return (
    <header className="main-header">
      <div className="header-top">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>

        <div className="mobile-header">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={toggleMenu} className={location.pathname === '/' ? 'active' : ''}>HOME</Link></li>
            <li><Link to="/shop" onClick={toggleMenu} className={location.pathname === '/shop' ? 'active' : ''}>SHOP</Link></li>
            <li><Link to="/toy" onClick={toggleMenu} className={location.pathname === '/toy' ? 'active' : ''}>TOY</Link></li>
            <li><Link to="/food" onClick={toggleMenu} className={location.pathname === '/food' ? 'active' : ''}>FOOD</Link></li>
            <li><Link to="/contact" onClick={toggleMenu} className={location.pathname === '/contact' ? 'active' : ''}>CONTACT</Link></li>
          </ul>
        </nav>

        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          {!searchQuery && (
            <button type="button" aria-label="Search">
              <Search />
            </button>
          )}
          <input
            type="search"
            placeholder="Search products"
            value={searchQuery}
            onChange={handleSearchInputChange}
            aria-label="Search"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
              ❌
            </button>
          )}
        </form>

        <nav className={`user-nav ${isMenuOpen ? 'open' : ''}`}>
          {isUserLoggedIn ? (
            <button onClick={handleLogout} className="nav-link logout-button">
              <LogOut />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="nav-link">
              <User />
              <span>Account</span>
            </Link>
          )}

          <Link to="/view-order" className="nav-link">
          <FaTruckLoading size={25}/>
            <span>Order</span>
          </Link>
          <Link to="/wishlist" className="nav-link">
            <Heart />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="nav-link cart">
            <ShoppingCart />
            <span>Cart</span>
            {isUserLoggedIn ? (
              <span className="cart-count">{cartCount}</span>
            ) : (
              <span className="cart-count">0</span>
            )

            }
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
