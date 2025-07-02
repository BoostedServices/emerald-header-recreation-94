import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Eye, ShoppingCart, Plus, Minus, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useCart } from '../contexts/CartContext';
import { toastAddToCart } from '../components/CustomToast';

const ProductDetail = () => {
  usePageAnimation();
  
  const { id } = useParams();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [bottomSelectedVariant, setBottomSelectedVariant] = useState(0);
  const [isBottomDropdownOpen, setIsBottomDropdownOpen] = useState(false);
  const { addItem } = useCart();

  // Mock product data - in a real app this would come from an API
  const products = {
    'valorant-full': {
      name: 'Echo Valorant Full',
      price: '$4.99',
      rating: 5,
      description: 'Advanced Valorant cheat with multiple bypass options',
      features: ['🔒 3 Different bypass\'s built into our software you can choose from!', '🔓 Unlock every item in the game.', '💻 Supports Windows 10-11', '⚡ Simple 5 minutes setup', '⭐ Private is undetected by vanguard', '🔧 HVCI on/off'],
      images: ['/EchoContent/EchoValFull.png', '/EchoContent/EchoValFull.png', '/EchoContent/EchoValFull.png'],
      variants: [{
        name: '1 Day License (24 hrs)',
        stock: 1,
        price: '$4.99'
      }, {
        name: '3 Day License (72 hours)',
        stock: 2,
        price: '$9.99'
      }, {
        name: '1 Week License (168 hours)',
        stock: 3,
        price: '$14.99'
      }, {
        name: '1 Month License (730 hours)',
        stock: 4,
        price: '$33.99'
      }, {
        name: 'Lifetime License (Unlimited hours)',
        stock: 3,
        price: '$69.99'
      }],
      stats: {
        viewing: 1,
        recentPurchases: 45
      },
      hasPrivateDriver: true,
      bundles: []
    },
    'ultimate': {
      name: 'Echo Ultimate',
      price: '$7.99',
      rating: 5,
      description: 'Ultimate gaming experience with advanced features',
      features: ['🎯 Advanced aimbot with smooth targeting', '🔍 ESP/Wallhack with customizable visuals', '💻 Supports Windows 10-11', '⚡ Quick 3 minutes setup', '🛡️ Undetected by anti-cheat systems', '🎮 Multiple game mode support'],
      images: ['/EchoContent/EchoUltimate.png', '/EchoContent/EchoUltimate.png', '/EchoContent/EchoUltimate.png'],
      variants: [{
        name: '1 Day License (24 hrs)',
        stock: 5,
        price: '$7.99'
      }, {
        name: '3 Day License (72 hours)',
        stock: 8,
        price: '$19.99'
      }, {
        name: '1 Week License (168 hours)',
        stock: 12,
        price: '$39.99'
      }, {
        name: '1 Month License (730 hours)',
        stock: 6,
        price: '$89.99'
      }, {
        name: 'Lifetime License (Unlimited hours)',
        stock: 4,
        price: '$199.99'
      }],
      stats: {
        viewing: 3,
        recentPurchases: 78
      },
      hasPrivateDriver: false,
      bundles: []
    },
    'unreal': {
      name: 'Echo Unreal',
      price: '$4.99',
      rating: 5,
      description: 'Unreal gaming enhancement with cutting-edge technology',
      features: ['🎮 Enhanced game mechanics', '🔧 Real-time modifications', '💻 Windows 10-11 compatible', '⚡ Easy 2 minutes installation', '🔒 Secure and private', '⭐ Regular updates included'],
      images: ['/EchoContent/EchoUnreal.png', '/EchoContent/EchoUnreal.png', '/EchoContent/EchoUnreal.png'],
      variants: [{
        name: '1 Day License (24 hrs)',
        stock: 8,
        price: '$4.99'
      }, {
        name: '3 Day License (72 hours)',
        stock: 15,
        price: '$12.99'
      }, {
        name: '1 Week License (168 hours)',
        stock: 20,
        price: '$24.99'
      }, {
        name: '1 Month License (730 hours)',
        stock: 10,
        price: '$59.99'
      }, {
        name: 'Lifetime License (Unlimited hours)',
        stock: 5,
        price: '$129.99'
      }],
      stats: {
        viewing: 2,
        recentPurchases: 92
      },
      hasPrivateDriver: true,
      bundles: [{
        name: 'Diamond Bundle',
        discount: '20% Off',
        items: [
          { name: 'Echo Unreal', variant: '1 Week License (168 hours)', price: '$11.99' },
          { name: 'Echo Perm Spoofer', variant: 'One Time Usage (48 hours)', price: '$15.99' }
        ],
        note: '*Bundles will only deliver one variant of each product variants listed above.'
      }]
    },
    'temp-spoofer': {
      name: 'Echo Temp Spoofer',
      price: '$2.99',
      rating: 5,
      description: 'Temporary hardware ID spoofing solution',
      features: ['🔄 Temporary HWID spoofing', '⏱️ Session-based protection', '💻 Windows 10-11 support', '⚡ Instant activation', '🔒 Safe and reversible', '🛠️ Easy to use interface'],
      images: ['/EchoContent/EchoTemp.png', '/EchoContent/EchoTemp.png', '/EchoContent/EchoTemp.png'],
      variants: [{
        name: '1 Day License (24 hours)',
        stock: 9,
        price: '$2.99'
      }, {
        name: '1 Week License (168 hours)',
        stock: 5,
        price: '$9.99'
      }, {
        name: '1 Month License (730 hours)',
        stock: 6,
        price: '$18.99'
      }, {
        name: 'Lifetime License (unlimited hours)',
        stock: 6,
        price: '$34.99'
      }],
      stats: {
        viewing: 5,
        recentPurchases: 156
      },
      hasPrivateDriver: true,
      bundles: []
    },
    'perm-spoofer': {
      name: 'Echo Perm Spoofer',
      price: '$19.99',
      rating: 5,
      description: 'Permanent hardware ID spoofing solution',
      features: ['🔒 Permanent HWID spoofing', '🛡️ Advanced protection methods', '💻 Windows 10-11 compatible', '⚡ One-time setup', '🔧 Multiple spoofing options', '📞 24/7 support included'],
      images: ['/EchoContent/EchoPerm.png', '/EchoContent/EchoPerm.png', '/EchoContent/EchoPerm.png'],
      variants: [{
        name: 'One Time Usage (48 hours)',
        stock: 0,
        price: '$19.99'
      }, {
        name: 'Standard License (1 week)',
        stock: 2,
        price: '$39.99'
      }, {
        name: 'Premium License (1 month)',
        stock: 1,
        price: '$79.99'
      }, {
        name: 'Lifetime License (Unlimited)',
        stock: 3,
        price: '$149.99'
      }],
      stats: {
        viewing: 7,
        recentPurchases: 23
      },
      hasPrivateDriver: true,
      bundles: []
    }
  };

  const product = products[id as keyof typeof products];
  if (!product) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>;
  }

  const currentVariant = product.variants[selectedVariant];
  const bottomCurrentVariant = product.variants[bottomSelectedVariant];
  const additionalServices = [{
    name: 'Anydesk Support',
    price: '$2.99',
    color: 'bg-red-500'
  }];

  if (product.hasPrivateDriver) {
    additionalServices.push({
      name: 'Private Driver - Lower Ban Risk',
      price: '$24.99',
      color: 'bg-orange-500'
    });
  }

  const handleAddToCart = () => {
    addItem({
      id: `${product.name}-${currentVariant.name}`,
      name: `${product.name} - ${currentVariant.name}`,
      price: currentVariant.price,
      image: product.images[0]
    });
    toastAddToCart(`${product.name} - ${currentVariant.name}`);
  };

  const handleBottomAddToCart = () => {
    addItem({
      id: `${product.name}-${bottomCurrentVariant.name}`,
      name: `${product.name} - ${bottomCurrentVariant.name}`,
      price: bottomCurrentVariant.price,
      image: product.images[0]
    });
    toastAddToCart(`${product.name} - ${bottomCurrentVariant.name}`);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      
      {/* Breadcrumb */}
      <div 
        className="max-w-7xl mx-auto px-4 py-4"
        data-animate="fade-in-up"
        data-delay="100"
      >
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-[#08C422]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#08C422]">Product</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div 
            className="space-y-4"
            data-animate="fade-in-left"
            data-delay="200"
          >
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl overflow-hidden h-96">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              {/* Navigation arrows */}
              <button 
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all"
              >
                <ArrowLeft size={20} className="rotate-180" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-[#08C422]' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div 
            className="space-y-6"
            data-animate="fade-in-right"
            data-delay="300"
          >
            {/* Additional Services */}
            <div className="flex justify-end space-x-4">
              {additionalServices.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
                  <span className="text-white text-sm">{service.name}</span>
                  <span className="text-[#08C422] font-bold">{service.price}</span>
                  <Button size="sm" className="bg-[#08C422] hover:bg-[#07A91E] text-white px-4 py-1 text-xs">
                    + Add
                  </Button>
                </div>
              ))}
            </div>

            {/* Product Title */}
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>

            {/* Features */}
            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="text-gray-300 text-sm flex items-start"
                  data-animate="fade-in-up"
                  data-delay={400 + (index * 50)}
                >
                  <span className="mr-2">{feature}</span>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#08C422] text-[#08C422]" />
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-[#08C422] text-3xl font-bold">{currentVariant.price}</span>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="w-8 h-8 p-0 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="text-gray-400 font-bold w-8 text-center">{quantity}</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="w-8 h-8 p-0 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Variants:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {product.variants.map((variant, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedVariant(index)} 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedVariant === index 
                        ? 'border-[#08C422] bg-[#08C422] bg-opacity-10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-medium">{variant.name}</h4>
                        <span className="text-[#08C422] text-sm">Stock: {variant.stock}</span>
                      </div>
                      <span className="text-[#08C422] font-bold text-lg">{variant.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div 
              className="space-y-3"
              data-animate="fade-in-up"
              data-delay="800"
            >
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-[#08C422] hover:bg-[#07A91E] text-white text-lg py-6"
              >
                ✓ Checkout
              </Button>
              <Button 
                onClick={handleAddToCart}
                variant="outline" 
                className="w-full border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white bg-transparent text-lg py-6"
              >
                <ShoppingCart className="mr-2" size={20} />
                Add To Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="mt-16 bg-[#1a1a1a] rounded-xl p-6"
          data-animate="fade-in-up"
          data-delay="400"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[#08C422] text-lg font-bold">{bottomCurrentVariant.price}</span>
                  <span className="text-red-500 line-through text-sm">$14.00</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">SAVE 21%</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsBottomDropdownOpen(!isBottomDropdownOpen)}
                  className="flex items-center justify-between w-48 px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white hover:border-[#08C422] transition-colors"
                >
                  <span>{bottomCurrentVariant.name}</span>
                  <ChevronDown size={16} className={`transition-transform ${isBottomDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isBottomDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsBottomDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-full bg-[#2a2a2a] border border-gray-600 rounded-lg shadow-lg z-50">
                      {product.variants.map((variant, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setBottomSelectedVariant(index);
                            setIsBottomDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-[#3a3a3a] transition-colors ${
                            bottomSelectedVariant === index ? 'text-[#08C422]' : 'text-white'
                          } ${index === 0 ? 'rounded-t-lg' : ''} ${index === product.variants.length - 1 ? 'rounded-b-lg' : ''}`}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <Button 
                onClick={handleBottomAddToCart}
                className="bg-[#08C422] hover:bg-[#07A91E] text-white px-8 py-2"
              >
                Add to cart
              </Button>
            </div>
          </div>

          {/* Available Bundles */}
          {product.bundles && product.bundles.length > 0 && (
            <div className="mt-8">
              <h4 className="text-white text-lg font-semibold mb-4">Available Bundles:</h4>
              {product.bundles.map((bundle, index) => (
                <div key={index} className="bg-[#2a2a2a] rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-white font-medium">{bundle.name}</h5>
                    <span className="bg-[#08C422] text-white text-sm px-3 py-1 rounded">{bundle.discount}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-gray-400 text-sm mb-3">This Bundle includes:</p>
                    {bundle.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-gray-400 text-sm">Variant: {item.variant}</p>
                        </div>
                        <span className="text-[#08C422] font-bold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-gray-500 text-xs mt-4">{bundle.note}</p>
                  
                  <div className="flex items-center justify-end mt-4">
                    <Button className="bg-[#08C422] hover:bg-[#07A91E] text-white whitespace-nowrap">
                      Add To Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
