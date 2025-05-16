/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/css/Shop.css";

function Foodshop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState({});

  const allWeights = ['1kg', '2kg', '5kg', '10kg', '15kg', '20kg'];
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get('http://localhost:8080/api/admin/showallcategory');
        const foodCategories = catRes.data
          .filter((cat) =>
            ['dog food', 'cat food'].includes(cat.catName.toLowerCase().trim())
          )
          .map((cat) => ({
            id: cat.id,
            name: cat.catName,
          }));
        setCategories([{ id: 'all', name: 'All Food' }, ...foodCategories]);

        const prodRes = await axios.get('http://localhost:8080/api/admin/showallproduct');
        const foodProducts = prodRes.data
          .filter((prod) =>
            ['dog food', 'cat food'].includes(prod.category.catName.toLowerCase().trim())
          )
          .map((prod) => ({
            id: prod.id,
            category: prod.category.catName,
            categoryId: prod.category.id,
            image: `http://localhost:8080/uploads/${prod.productImg}`,
            rating: 4.5,
            brand: prod.brandName || 'Brand Name',
            name: prod.productName,
            tags: prod.description ? prod.description.split(',') : [],
            price: prod.price.toFixed(2),
            originalPrice: (prod.price * 1.2).toFixed(2),
            discount: 20,
            weights: allWeights,
          }));
        setProducts(foodProducts);
      } catch (err) {
        console.error('Error fetching foodshop data:', err);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleWeightClick = (productId, weight) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [productId]: weight,
    }));
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((prod) => prod.categoryId === selectedCategory);


      const userId = localStorage.getItem("userId"); // Replace with actual logged-in user ID

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
        <aside className="filter-sidebar open">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={selectedCategory === category.id ? 'active' : ''}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-content">
          {filteredProducts.length === 0 ? (
            <p className="no-products-message">No food items available...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  state={{ selectedWeight: selectedWeights[product.id] || '1kg' }}
                  key={product.id}
                  className="product-card-link"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="product-card">
                    <div className="product-image">
                      <span className="rating">★ {product.rating}</span>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <div className="brand">{product.brand}</div>
                      <h2 className="product-name">{product.name}</h2>
                      <div className="price-container">
                        <span className="price">₹{product.price}</span>
                        <span className="original-price">₹{product.originalPrice}</span>
                        <span className="discount">{product.discount}% off</span>
                      </div>
                      <div className="sizes">
                        {allWeights.map((weight) => (
                          <button
                            key={weight}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleWeightClick(product.id, weight);
                            }}
                            className={`
                              ${selectedWeights[product.id] === weight ? 'active' : ''}
                              ${!product.weights.includes(weight) ? 'disabled' : ''}
                            `}
                            disabled={!product.weights.includes(weight)}
                          >
                            {weight}
                          </button>
                        ))}
                      </div>
                      <div className="actions">
                        <button
                          className="add-to-cart"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Redirect to the product detail page
                            navigate(`/product/${product.id}`);
                          }}
                        >
                          Add To Cart
                        </button>
                        <button
                          className="heart-button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToWishlist(product.id);
                            console.log('Liked');
                          }}
                        >
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

export default Foodshop;
