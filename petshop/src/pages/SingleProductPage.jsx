import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom"; // ✅ Added useLocation
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from "../context/CartContext";
import "../assets/css/SingleProductPage.css";

// Categories for which size section should be displayed
const sizeRelevantCategories = [
  "T-Shirts & Shirts",
  "Raincoats",
  "Bow Ties & Bandanas",
  "Festive & Wedding",
  "Jackets",
  "Sweaters",
  "Sweatshirts",
];

// Breed fit data for each size
const breedData = {
  L: "Jack Russell Terrier, Lhasa Apso, Shih Tzu, Poodle",
  XL: "Pug, Pomeranian, Indian Spitz, Lhasa Apso, Dachshund",
  "2XL": "Beagle, Cocker Spaniel",
  "3XL": "Dalmatian, Indian Pariah, Pitbull, Boxer, Doberman",
  "4XL": "Rottweiler, Husky",
  "5XL": "Labrador Retriever, German Shepherd, Golden Retriever",
};

const weightOptions = ["1kg", "2kg", "5kg", "10kg", "15kg", "20kg"];

const SingleProductPage = () => {
  const { id } = useParams();
  const location = useLocation(); // ✅ to read passed weight
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedWeight, setSelectedWeight] = useState(location.state?.selectedWeight || "1kg"); // ✅ initialize from route state
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { setCartCount } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/showallproduct");
        const productData = res.data.find((item) => item.id === parseInt(id));
        if (productData) {
          setProduct(productData);
          setMainImage(`http://localhost:8080/uploads/${productData.productImg}`);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const isFoodCategory = product?.category?.catName?.toLowerCase().includes("food");

  const showSizeSection =
    product &&
    typeof product.category?.catName === "string" &&
    sizeRelevantCategories
      .map((cat) => cat.toUpperCase())
      .includes(product.category.catName.toUpperCase());

  const basePrice = product?.price || 0;
  const weightValue = isFoodCategory ? parseInt(selectedWeight) : 1;
  const finalPrice = basePrice * weightValue;
  const originalPrice = finalPrice * 1.2;

  if (!product) return <div>Loading...</div>;


  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      toast.error("Please log in to add items to your cart!");
      return;
    }
  
    const productId = product.id;
    setIsCartLoading(true);
  
    try {
      const response = await axios.post("http://localhost:8080/api/cart/addtocart", null, {
        params: {
          userId,
          productId,
          quantity,
          productPrice: finalPrice,
          size: showSizeSection ? selectedSize : "",
          weight: isFoodCategory ? selectedWeight : "",
        },
      });
  
      toast.success(response.data);
  
      const countRes = await axios.get(`http://localhost:8080/api/cart/getcartusercount/${userId}`);
      setCartCount(countRes.data);
  
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong while adding the product to the cart!");
    } finally {
      setIsCartLoading(false);
    }
  };
  



  return (
    <div className="single-product-page-container">
      <Link to="/shop" className="back-link">← Back to Shop</Link>

      <div className="single-product-page-container__product">
        {/* Product Gallery */}
        <div className="single-product-page-container__product-gallery">
          <div className="single-product-page-container__main-image">
            <img src={mainImage} alt={product.productName} />
          </div>
        </div>

        {/* Product Details */}
        <div className="single-product-page-container__product-details">
          <h1>{product.productName}</h1>

          <div className="single-product-page-container__tags">
            {product.description &&
              product.description.split(",").map((tag, idx) => (
                <span key={idx} className="single-product-page-container__tag">{tag.trim()}</span>
              ))}
          </div>

          {/* Price Section */}
          <div className="single-product-page-container__price-section">
            <div className="single-product-page-container__price-container">
              <span className="single-product-page-container__mrp">MRP:</span>
              <span className="single-product-page-container__original-price">₹{originalPrice.toFixed(2)}</span>
              <span className="single-product-page-container__price">₹{finalPrice.toFixed(2)}</span>
              <span className="single-product-page-container__discount">20% Off</span>
            </div>
            <div className="single-product-page-container__tax-info">incl. of all taxes</div>
          </div>

          {/* Size or Weight Section */}
          {isFoodCategory ? (
            <div className="single-product-page-container__size-section">
              <div className="single-product-page-container__size-header">
                <h3>Weight</h3>
              </div>
              <div className="single-product-page-container__sizes">
                {weightOptions.map((weight) => (
                  <button
                    key={weight}
                    className={`single-product-page-container__size-button ${selectedWeight === weight ? "active" : ""}`}
                    onClick={() => setSelectedWeight(weight)}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            showSizeSection && (
              <>
                <div className="single-product-page-container__size-section">
                  <div className="single-product-page-container__size-header">
                    <h3>Size</h3>
                    <button className="single-product-page-container__size-guide">Size Chart</button>
                  </div>
                  <div className="single-product-page-container__sizes">
                    {["L", "XL", "2XL", "3XL", "4XL", "5XL"].map((size) => (
                      <button
                        key={size}
                        className={`single-product-page-container__size-button ${selectedSize === size ? "active" : ""}`}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="single-product-page-container__breed-fit">
                  <h3>Fit for Breeds (Adult)</h3>
                  <div className="single-product-page-container__breed-size">
                    <span className="single-product-page-container__size-label">{selectedSize}</span>
                    <span className="single-product-page-container__breeds">{breedData[selectedSize]}</span>
                  </div>
                </div>
              </>
            )
          )}

          {/* Quantity and Purchase Section */}
          <div className="single-product-page-container__purchase-section">
            <div className="single-product-page-container__quantity-selector">
              <button className="single-product-page-container__qty-btn decrement" onClick={decrementQuantity}>-</button>
              <input type="text" value={quantity} readOnly />
              <button className="single-product-page-container__qty-btn increment" onClick={incrementQuantity}>+</button>
            </div>

            <div className="single-product-page-container__buttons-container">
              <button
                className="single-product-page-container__add-to-cart"
                onClick={handleAddToCart}
                disabled={!product || isCartLoading}
              >
               {isCartLoading ? <span className="spinner"></span> : "🛒 ADD TO CART"}
              </button>
              <button className="single-product-page-container__buy-now">⚡ BUY NOW</button>
            </div>
          </div>

          {/* Service Features */}
          <div className="single-product-page-container__service-features">
            <div className="single-product-page-container__feature">
              <span className="single-product-page-container__feature-icon">✓</span>
              COD Available
            </div>
            <div className="single-product-page-container__feature">
              <span className="single-product-page-container__feature-icon">✕</span>
              No Returns & Exchange
            </div>
            <div className="single-product-page-container__feature">
              <span className="single-product-page-container__feature-icon">✓</span>
              Secure Payments
            </div>
          </div>

          {/* Charity Info */}
          <div className="single-product-page-container__charity-info">
            This purchase will <span className="single-product-page-container__charity-highlight">Feed A Dog In Need 🐕</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingleProductPage;
