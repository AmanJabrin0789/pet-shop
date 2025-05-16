/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import "../assets/css/Shop.css";

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for updating URL programmatically

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search') || '';
    setSearchQuery(query); // Set the search query from the URL

    const fetchData = async () => {
      try {
        const catResponse = await axios.get("http://localhost:8080/api/admin/showallcategory");
        const fetchedCategories = catResponse.data.map((cat) => ({
          id: cat.id,
          name: cat.catName
        }));
        setCategories([{ id: 'all', name: 'All PRODUCTS' }, ...fetchedCategories]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }

      try {
        const prodResponse = await axios.get("http://localhost:8080/api/admin/showallproduct");
        const fetchedProducts = prodResponse.data.map((prod) => ({
          id: prod.id,
          category: prod.category.catName,
          categoryId: prod.category.id,
          image: `http://localhost:8080/uploads/${prod.productImg}`,
          rating: 4.5,
          brand: prod.brandName || "Brand Name",
          name: prod.productName,
          tags: prod.description ? prod.description.split(',') : [],
          price: prod.price.toFixed(2),
          originalPrice: (prod.price * 1.2).toFixed(2),
          discount: 20
        }));
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchData();
  }, [location.search]); // Re-fetch data when the search query changes

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery(''); // Clear the search query when a new category is selected
    navigate('/shop'); // Reset URL to show only the category page without search query
  };

  const filteredProducts = selectedCategory === 'all'
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) // Now includes category in search
      )
    : products.filter((product) =>
        product.categoryId === selectedCategory &&
        (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) // Now includes category in search
        )
      );


      const userId = localStorage.getItem("userId"); 

      const handleAddToWishlist = async (productId) => {
        try {
          const res = await axios.get(`http://localhost:8080/api/wishlist/${userId}`);
          const existing = res.data.find(item => item.product.id === productId);
          if (existing) {
            toast.warning("Already in wishlist!");
            return;
          }
      
          const result = await axios.post("http://localhost:8080/api/wishlist/add", {
            user: { id: userId },
            product: { id: productId }
          });
      
          toast.success("Added to wishlist!");
        } catch (err) {
          console.error("Error adding to wishlist", err);
        }
      };
      


  return (
    <>
      <div className="shop-container">
        <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={selectedCategory === category.id ? 'active' : ''}>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-content">
          {filteredProducts.length === 0 ? (
            <p className="no-products-message">No products available...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
                  <div className="product-card">
                    <div className="product-image">
                      <span className="rating">★ {product.rating}</span>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <div className="brand">{product.brand}</div>
                      <h2>{product.name}</h2>
                      <div className="price-container">
                        <span className="price">₹{product.price}</span>
                        <span className="original-price">₹{product.originalPrice}</span>
                      </div>
                      <div className="actions">
                        <button
                          className="add-to-cart"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Redirect to the product detail page
                            navigate(`/product/${product.id}`);
                          }}>
                          Add To Cart
                        </button>
                        <button
                          className="heart-button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToWishlist(product.id);
                            console.log("Liked");
                          }}>
                          ❤️
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
         <ToastContainer />
      </div>

      <Footer />
    </>
  );
}

export default Shop;
