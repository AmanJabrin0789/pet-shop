import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../assets/css/Catcategoryslider.css';
import { Link } from 'react-router-dom';

// Sample data - replace this with your database data
const sampleCategories = [
  {
    id: 1,
    name: 'Cat Toy',
    imageUrl: 'https://headsupfortails.com/cdn/shop/files/Cat_Toys_55e3833b-84f5-4f1d-9114-9af992844761.webp?v=1736857743',
    startingPrice: 199
  },
  {
    id: 2,
    name: 'Litter',
    imageUrl: 'https://headsupfortails.com/cdn/shop/files/litter_03_8dd2a6fb-27b9-4b6d-952a-ae3dd04f5594.webp?v=1734086916',
    startingPrice: 399
  },
  {
    id: 3,
    name: 'Food',
    imageUrl: 'https://headsupfortails.com/cdn/shop/files/food_04.webp?v=1734086916',
    startingPrice: 100
  },
  {
    id: 4,
    name: 'Collars',
    imageUrl: 'https://headsupfortails.com/cdn/shop/files/collar_fbbe310f-8e4e-46e8-b49e-031470b648c7.webp?v=1736857204',
    startingPrice: 699
  },
 
];

function Catcategoryslider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + itemsPerView < sampleCategories.length;

  const handlePrevious = () => {
    setCurrentIndex(Math.max(currentIndex - itemsPerView, 0));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + itemsPerView, sampleCategories.length - itemsPerView));
  };

  return (
    <div className="slider-wrapper">
      <button
        onClick={handlePrevious}
        disabled={!canScrollLeft}
        className={`slider-button prev-button ${!canScrollLeft ? 'disabled' : ''}`}
      >
        <ChevronLeft />
      </button>

      <div className="slider-container">
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {sampleCategories.map((category) => (
          
          <div key={category.id} className="slider-item">
           
              <div className="category-card">
              <Link to={`/shop?search=${encodeURIComponent(category.name)}`}>
                <img 
                  src={category.imageUrl}
                  alt={category.name}
                  className="category-image"
                />
              </Link>
                <div className="price-tag">
                  Starting at ₹{category.startingPrice}
                </div>
                <div className="category-name">
                  {category.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!canScrollRight}
        className={`slider-button snext-button ${!canScrollRight ? 'disabled' : ''}`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default Catcategoryslider;