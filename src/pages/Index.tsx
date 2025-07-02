
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GameSelection from '../components/GameSelection';
import ProductsSection from '../components/ProductsSection';
import BundlesSection from '../components/BundlesSection';
import ReviewsSection from '../components/ReviewsSection';
import Footer from '../components/Footer';
import { usePageAnimation } from '../hooks/usePageAnimation';

const Index = () => {
  usePageAnimation();

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <h1 
          className="text-5xl font-bold text-center mb-8"
          data-animate="fade-in-up"
          data-delay="100"
        >
          <span className="text-[#08C422]">ECHO</span>{' '}
          <span className="text-white">SOFTWARE</span>
        </h1>
        
        <p 
          className="text-gray-300 text-lg text-center max-w-3xl mb-8"
          data-animate="fade-in-up"
          data-delay="200"
        >
          Delivering high-quality enhancement tools to elevate your experience, at competitive prices.
        </p>
        
        <div 
          className="flex gap-4 mb-6"
          data-animate="scale-in"
          data-delay="300"
        >
          <Link to="/products">
            <button className="relative overflow-hidden bg-[#08C422] text-white px-24 py-3 rounded-md font-medium text-lg transition-colors group">
              <span className="relative z-10">Purchase</span>
              <div className="absolute inset-0 bg-[#07A91E] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-out"></div>
              <div className="absolute inset-0 bg-[#08C422] scale-x-100 group-hover:scale-x-0 transition-transform duration-300 ease-out" style={{
              transformOrigin: 'left, right'
            }}></div>
            </button>
          </Link>
          <a href="https://discord.gg/dM672qYTEQ" target="_blank" rel="noopener noreferrer">
            <button className="relative overflow-hidden border-2 border-[#08C422] text-[#08C422] px-24 py-3 rounded-md font-medium text-lg transition-colors group">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Discord</span>
              <div className="absolute inset-0 bg-[#08C422] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-out"></div>
            </button>
          </a>
        </div>
        
        <div 
          className="flex items-center gap-2"
          data-animate="fade-in-up"
          data-delay="400"
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg key={index} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-[#08C422]">
                <path fill="#08C422" d="M18.483 16.767A8.5 8.5 0 0 1 8.118 7.081a1 1 0 0 1-.113.097c-.28.213-.63.292-1.33.45l-.635.144c-2.46.557-3.69.835-3.983 1.776c-.292.94.546 1.921 2.223 3.882l.434.507c.476.557.715.836.822 1.18c.107.345.071.717-.001 1.46l-.066.677c-.253 2.617-.38 3.925.386 4.506s1.918.052 4.22-1.009l.597-.274c.654-.302.981-.452 1.328-.452s.674.15 1.329.452l.595.274c2.303 1.06 3.455 1.59 4.22 1.01c.767-.582.64-1.89.387-4.507z" />
                <path fill="#08C422" d="m9.153 5.408l-.328.588c-.36.646-.54.969-.82 1.182q.06-.045.113-.097a8.5 8.5 0 0 0 10.366 9.686l-.02-.19c-.071-.743-.107-1.115 0-1.46c.107-.344.345-.623.822-1.18l.434-.507c1.677-1.96 2.515-2.941 2.222-3.882c-.292-.941-1.522-1.22-3.982-1.776l-.636-.144c-.699-.158-1.049-.237-1.33-.45c-.28-.213-.46-.536-.82-1.182l-.327-.588C13.58 3.136 12.947 2 12 2s-1.58 1.136-2.847 3.408" opacity="0.5" />
              </svg>
            ))}
          </div>
          <span className="text-gray-400 text-lg ml-2">(6283 Reviews)</span>
        </div>
      </div>
      
      {/* Game Selection Section */}
      <div data-animate="fade-in-up" data-delay="500">
        <GameSelection />
      </div>
      
      {/* Products Section */}
      <div data-animate="fade-in-up" data-delay="600">
        <ProductsSection />
      </div>
      
      {/* Bundles Section */}
      <div data-animate="fade-in-up" data-delay="700">
        <BundlesSection />
      </div>
      
      {/* Reviews Section */}
      <div data-animate="fade-in-up" data-delay="800">
        <ReviewsSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
