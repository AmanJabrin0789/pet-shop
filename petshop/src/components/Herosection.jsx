import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../assets/css/herosection.css';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Best Destination",
    subtitle: "For Your Pets",
    description: "Find the perfect products for your furry friends",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1920&q=80",
    cta: {
      text: "SHOP NOW",
      link: "/shop"
    }
  },
  {
    id: 2,
    title: "Premium Quality",
    subtitle: "Pet Products",
    description: "Discover our collection of high-quality pet essentials",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1920",
    cta: {
      text: "SHOP NOW",
      link: "/shop"
    }
  },
  {
    id: 3,
    title: "Special Offers",  
    subtitle: "Save Up To 50%",
    description: "Great deals on selected pet products this season",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1920",
    cta: {
      text: "SHOP NOW",
      link: "/shop"
    }
  }
];

function Herosection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  function nextSlide() {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }

  function prevSlide() {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, );

  return (
    <div className="hero-slider">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <div className="offer-tag">SAVE 10 - 20% OFF</div>
              <h1>{slide.title}</h1>
              <h2>{slide.subtitle}</h2>
              <p>{slide.description}</p>
              <Link to={slide.cta.link} className="cta-button">
                {slide.cta.text}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-button prev" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="slider-button next" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Herosection;