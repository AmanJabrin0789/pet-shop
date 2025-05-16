import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/Categoriesmenu.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categoriesmenu = () => {
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/showallcategorymenu');
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className="menucategory-item">
            <div className="menucategory-image">
              {/* ✅ Only the image is wrapped in Link */}
              <Link to={`/shop?search=${encodeURIComponent(category.catName)}`}>
                <img
                  src={`http://localhost:8080/uploads/${category.catImg}`}
                  alt={category.catName}
                />
              </Link>
            </div>
            {/* ❌ Text is not wrapped in Link */}
            <h3>{category.catName}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categoriesmenu;
