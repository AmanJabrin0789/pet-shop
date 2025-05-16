import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../assets/css/Dogcategoryslider.css';
import { Link } from 'react-router-dom';

// Sample data - replace this with your database data
const sampleCategories = [
  {
    id: 1,
    name: 'Blankets',
    imageUrl: 'https://www.charleychau.com/cdn/shop/files/charley-chau-double-fleece-dog-blanket-navy-02_f20a7ecf-6f2b-4aeb-b259-e0910544c6fa.jpg?v=1737815916&width=360',
    startingPrice: 999
  },
  {
    id: 2,
    name: 'Sweatshirts',
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2023/5/307234758/CS/MB/LI/102946811/dog-hoodie-sweatshirt-1000x1000.jpg',
    startingPrice: 799
  },
  {
    id: 3,
    name: 'Jackets',
    imageUrl: 'https://m.media-amazon.com/images/I/61j0Bn-clqL._SL1000_.jpg',
    startingPrice: 699
  },
  {
    id: 4,
    name: 'Sweaters',
    imageUrl: 'https://www-x-aircashmere-x-com.img.addlink.cn/upload/202212/06/202212061424116323.jpg',
    startingPrice: 699
  },
 
];

function Dogcategoryslider() {
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

export default Dogcategoryslider;