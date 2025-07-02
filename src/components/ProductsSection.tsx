import React from 'react';
import { Link } from 'react-router-dom';

const ProductsSection = () => {
  const products = [
    {
      id: 'valorant-full',
      name: 'Echo Valorant Full',
      price: '$4.99',
      stock: 13,
      image: '/EchoContent/EchoValFull.png'
    },
    {
      id: 'ultimate',
      name: 'Echo Ultimate',
      price: '$7.99',
      stock: 60,
      image: '/EchoContent/EchoUltimate.png'
    },
    {
      id: 'unreal',
      name: 'Echo Unreal',
      price: '$4.99',
      stock: 70,
      image: '/EchoContent/EchoUnreal.png'
    },
    {
      id: 'temp-spoofer',
      name: 'Echo Temp Spoofer',
      price: '$2.99',
      stock: 28,
      image: '/EchoContent/EchoTemp.png'
    },
    {
      id: 'perm-spoofer',
      name: 'Echo Perm Spoofer',
      price: '$19.99',
      stock: null,
      image: '/EchoContent/EchoPerm.png'
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl font-bold mb-4"
            data-animate="fade-in-up"
            data-delay="100"
          >
            <span className="text-[#08C422]">Available</span>{' '}
            <span className="text-white">Products</span>
          </h2>
          <p 
            className="text-gray-400 text-lg"
            data-animate="fade-in-up"
            data-delay="200"
          >
            Explore Our extensive game selection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`} 
              className="group cursor-pointer"
              data-animate="scale-in"
              data-delay={300 + (index * 100)}
            >
              {/* Product Card */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 h-64 mb-6 transition-transform duration-300 hover:scale-105">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Slash animation overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/35 to-transparent transform -rotate-12 translate-x-[-100%] group-hover:animate-[slash_1.5s_ease-in-out_infinite]"></div>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-white text-xl font-semibold mb-2">{product.name}</h3>
                <div className="text-gray-400 text-sm mb-1">ECHO</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-[#08C422] text-lg font-bold">From {product.price}</span>
                  {product.id === 'valorant-full' && (
                    <span className="text-gray-500 line-through text-sm">$23.00</span>
                  )}
                  {product.id === 'ultimate' && (
                    <span className="text-gray-500 line-through text-sm">$15.00</span>
                  )}
                </div>
                {product.stock !== null && (
                  <div className="text-gray-400 text-sm">
                    {product.stock} in Stock
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
