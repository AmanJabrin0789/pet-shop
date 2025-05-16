/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import "../assets/css/Toyshop.css";
import { Link , useNavigate} from 'react-router-dom';

function Toyshop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catRes = await axios.get('http://localhost:8080/api/admin/showallcategory');
        console.log("Fetched categories:", catRes.data);

        // Trim whitespace and filter for 'dog toys' and 'cat toys' categories
        const toyCategories = catRes.data
          .filter((cat) =>
            ['dog toy', 'cat toy'].includes(cat.catName.toLowerCase().trim()) // Trim and compare category names
          )
          .map((cat) => ({
            id: cat.id,
            name: cat.catName.trim(), // Ensure trimming any extra spaces
          }));

        console.log("Filtered categories:", toyCategories);

        // Set categories state
        setCategories([{ id: 'all', name: 'All Toys' }, ...toyCategories]);

        // Fetch products
        const prodRes = await axios.get('http://localhost:8080/api/admin/showallproduct');
        console.log("Fetched products:", prodRes.data);

        // Filter products for dog and cat toys, adjust this filtering based on the actual product data
        const toyProducts = prodRes.data
          .filter((prod) =>
            ['dog toy', 'cat toy'].includes(prod.category.catName.toLowerCase().trim()) // Adjust if category names are different
          )
          .map((prod) => ({
            id: prod.id,
            category: prod.category.catName, // Ensure this corresponds to the actual category field
            categoryId: prod.category.id,   // Make sure categoryId exists
            image: `http://localhost:8080/uploads/${prod.productImg}`,
            rating: 4.5,
            brand: prod.brandName || 'Brand Name',
            name: prod.productName,
            tags: prod.description ? prod.description.split(',') : [],
            price: prod.price.toFixed(2),
            originalPrice: (prod.price * 1.2).toFixed(2),
            discount: 20,
          }));

        console.log("Filtered toy products:", toyProducts);
        setProducts(toyProducts);
      } catch (err) {
        console.error('Error fetching toyshop data:', err);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on the selected category
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
              {categories.length === 0 ? (
                <p>No categories available</p>
              ) : (
                categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={selectedCategory === category.id ? 'active' : ''}
                  >
                    {category.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>

        <main className="main-content">
          {filteredProducts.length === 0 ? (
            <p className="no-products-message">No toy items available...</p>
          ) : (
            <div className="products-gridtoy">
              {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`}  className="product-card-link">
                <div key={product.id} className="product-card">
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
                      <button className="add-to-cart" 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                            console.log("Add to cart clicked");
                          }}>Add To Cart</button>
                      <button className="heart-button" 
                       onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToWishlist(product.id);
                          console.log("Liked");
                      }}>❤️</button>
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

export default Toyshop;
