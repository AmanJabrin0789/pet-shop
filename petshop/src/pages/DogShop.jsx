import React, { useState } from 'react';
import Footer from '../components/Footer';
import "../assets/css/Shop.css"


function DogShop() {
  const [activeSizes, setActiveSizes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen] = useState(true);

  const handleSizeClick = (productId, size) => {
    setActiveSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // All possible sizes
  const allSizes = ['L', 'XL', '2XL', '3XL', '4XL', '5XL'];

  const products = [
    {
      id: 1,
      category: 'jackets',
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400",
      rating: 4.5,
      brand: "Dash Dog",
      name: "Swift Strides Puffer Jacket",
      tags: ["Waterproof", "Warm"],
      price: "1,679.20",
      originalPrice: "2,099",
      discount: 20,
      sizes: ["L", "XL", "2XL", "3XL" ,"4XL"],
    },
    {
      id: 2,
      category: 'jackets',
      image: "https://images.unsplash.com/photo-1583511655826-05700442b31b?auto=format&fit=crop&w=400",
      rating: 5.0,
      brand: "Heads Up For Tails",
      name: "Cosy Pupper Reversible Jacket",
      tags: ["Reversible", "Leash Opening"],
      price: "719.60",
      originalPrice: "1,799",
      discount: 60,
      sizes: ["L", "XL", "2XL", "3XL", "4XL", "5XL"],
    },
    {
      id: 3,
      category: 'sweaters',
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400",
      rating: 5.0,
      brand: "Dash Dog",
      name: "Winter Prism Sweater",
      tags: ["Stretchable", "Lightweight"],
      price: "1,189.15",
      originalPrice: "1,399",
      discount: 15,
      sizes: ["L", "XL", "2XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
    {
      id: 4,
      category: 't-shirts',
      image: "https://images.unsplash.com/photo-1575936123440-87b73b91334d?auto=format&fit=crop&w=400",
      rating: 4.0,
      brand: "Paw Style",
      name: "Cool T-Shirt for Dogs",
      tags: ["Comfortable", "Breathable"],
      price: "499.99",
      originalPrice: "799",
      discount: 38,
      sizes: ["M", "L", "XL"],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'raincoats', name: 'Raincoats' },
    { id: 't-shirts', name: 'T-shirts & Shirts' },
    { id: 'sweaters', name: 'Sweaters' },
    { id: 'sweatshirts', name: 'Sweatshirts' },
    { id: 'jackets', name: 'Jackets' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter((product) => product.category === selectedCategory);

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
            <p className="no-products-message">No products available...</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <span className="rating">★ {product.rating}</span>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <div className="brand">{product.brand}</div>
                    <h2>{product.name}</h2>
                    <div className="tags">
                      {product.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="price-container">
                      <span className="price">₹{product.price}</span>
                      <span className="original-price">₹{product.originalPrice}</span>
                      <span className="discount">{product.discount}% off</span>
                    </div>
                    <div className="sizes">
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(product.id, size)}
                          className={`sizes-button ${activeSizes[product.id] === size ? 'active' : ''} ${!product.sizes.includes(size) ? 'disabled' : ''}`}
                          disabled={!product.sizes.includes(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div className="actions">
                      <button className="add-to-cart">Add To Cart</button>
                      <button className="heart-button">❤️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );    
}

export default DogShop;