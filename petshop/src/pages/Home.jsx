import React from 'react'
import { ShoppingCart } from 'lucide-react';
import Herosection from '../components/Herosection';
import Categoriesmenu from '../components/Categoriesmenu';
import "../assets/css/Home.css"
import Infobanner from '../components/Infobanner';
import Footer from '../components/Footer';
import Dogcategoryslider from '../components/Dogcategoryslider';
import Catcategoryslider from '../components/Catcategoryslider';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Herosection />



      <Categoriesmenu />


      <Link to="/shop">
        <button className="shop-now-button">
          <ShoppingCart style={{
            marginRight: '8px',
            verticalAlign: 'middle',
            display: 'inline-block'
          }}
            size={20}
          />
          Shop Now
        </button>
      </Link>


      <hr id='line' />
      <Dogcategoryslider />


      <hr id='line' />
      <Catcategoryslider />

      <Infobanner />

      <Footer />
    </>
  )
}

export default Home;
