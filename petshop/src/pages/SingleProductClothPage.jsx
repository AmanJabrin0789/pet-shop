import React, { useState } from "react";
import "../assets/css/SingleProductPage.css";

const SingleProductClothPage = () => {
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800"
  );

  // Data for breed sizes based on selected size
  const breedData = {
    L: "Jack Russell Terrier, Lhasa Apso, Shih Tzu, Poodle",
    XL: "Pug, Pomeranian, Indian Spitz, Lhasa Apso, Dachshund",
    "2XL": "Beagle, Cocker Spaniel",
    "3XL": "Dalmatian, Indian Pariah, Pitbull, Boxer, Doberman",
    "4XL": "Rottweiler, Husky",
    "5XL": "Labrador Retriever, German Shepherd, Golden Retriever",
  };

  // Handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // Handle quantity increment
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  // Handle quantity decrement
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle thumbnail click to change main image
  const handleThumbnailClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <div className="single-product-page-container">
      <div className="single-product-page-container__product">
        {/* Product Gallery */}
        <div className="single-product-page-container__product-gallery">
          <div className="single-product-page-container__main-image">
            <img src={mainImage} alt="Lime Green Dog Jacket" />
          </div>
          <div className="single-product-page-container__thumbnail-images">
            <img
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=200"
              alt="Lime Green Dog Jacket"
              className={mainImage.includes("1583337130417") ? "active" : ""}
              onClick={() =>
                handleThumbnailClick(
                  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800"
                )
              }
            />
            <img
              src="https://images.unsplash.com/photo-1583511655826-05700442b31b?auto=format&fit=crop&w=200"
              alt="Dog Jacket Side View"
              className={mainImage.includes("1583511655826") ? "active" : ""}
              onClick={() =>
                handleThumbnailClick(
                  "https://images.unsplash.com/photo-1583511655826-05700442b31b?auto=format&fit=crop&w=800"
                )
              }
            />
            <img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200"
              alt="Dog Jacket Back View"
              className={mainImage.includes("1583511655857") ? "active" : ""}
              onClick={() =>
                handleThumbnailClick(
                  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800"
                )
              }
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="single-product-page-container__product-details">
          <h1>HUFT Cosy Pupper Reversible Dog Jacket - Lime Green</h1>

          {/* Tags */}
          <div className="single-product-page-container__tags">
            <span className="single-product-page-container__tag">Quilted</span>
            <span className="single-product-page-container__tag">Cosy</span>
          </div>

          {/* Rating and Reviews */}
          <div className="single-product-page-container__rating-reviews">
            <span className="single-product-page-container__rating">★★★★★</span>
            <span className="single-product-page-container__rating-number">5.0/5</span>
            <a href="/#" className="single-product-page-container__reviews">
              View all Reviews
            </a>
          </div>

          {/* Price Section */}
          <div className="single-product-page-container__price-section">
            <div className="single-product-page-container__price-container">
              <span className="single-product-page-container__mrp">MRP : </span>
              <span className="single-product-page-container__original-price">₹1,999</span>
              <span className="single-product-page-container__price">₹1,399.30</span>
              <span className="single-product-page-container__discount">30% Off</span>
            </div>
            <div className="single-product-page-container__tax-info">incl. of all taxes</div>
          </div>

          {/* Size Section */}
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

          {/* Fit for Breeds Section */}
          <div className="single-product-page-container__breed-fit">
            <h3>Fit for Breeds (Adult)</h3>
            <div className="single-product-page-container__breed-size">
              <span className="single-product-page-container__size-label">{selectedSize}</span>
              <span className="single-product-page-container__breeds">{breedData[selectedSize]}</span>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="single-product-page-container__purchase-section">
            <div className="single-product-page-container__quantity-selector">
              <button className="single-product-page-container__qty-btn decrement" onClick={decrementQuantity}>
                -
              </button>
              <input
                type="text"
                value={quantity}
                min="1"
                max="10"
                id="quantity-input"
                readOnly
              />
              <button className="single-product-page-container__qty-btn increment" onClick={incrementQuantity}>
                +
              </button>
            </div>
            <div className="single-product-page-container__buttons-container">
              <button className="single-product-page-container__add-to-cart">
                <span className="single-product-page-container__cart-icon">🛒</span>
                ADD TO CART
              </button>
              <button className="single-product-page-container__buy-now">
                <span className="single-product-page-container__lightning-icon">⚡</span>
                BUY NOW
              </button>
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
            This purchase will{" "}
            <span className="single-product-page-container__charity-highlight">Feed A Dog In Need 🐕</span>
            <span className="single-product-page-container__info-icon">ⓘ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductClothPage;
