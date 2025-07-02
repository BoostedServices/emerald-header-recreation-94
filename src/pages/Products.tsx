import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BundlePopup from '../components/BundlePopup';
import { usePageAnimation } from '../hooks/usePageAnimation';
import { useCart } from '../contexts/CartContext';
import { toastAddToCart } from '../components/CustomToast';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Products = () => {
  usePageAnimation();
  
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState('Alphabetically, A-Z');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { addItem } = useCart();

  // Handle URL category parameter
  useEffect(() => {
    const category = searchParams.get('category');
    setCategoryFilter(category);
  }, [searchParams]);

  const products = [
    {
      id: 'valorant-full',
      name: 'Echo Valorant Full',
      price: '$4.99',
      originalPrice: '$23.00',
      discount: null,
      stock: 13,
      image: '/EchoUploads/20e50704-5145-4161-8e66-06219d53effa.png',
      category: 'VALORANT',
      priceValue: 4.99,
      type: 'product'
    },
    {
      id: 'ultimate',
      name: 'Echo Ultimate',
      price: '$7.99',
      originalPrice: '$15.00',
      discount: null,
      stock: 60,
      image: '/EchoUploads/771af544-6100-401f-a0ca-cef9313f9b22.png',
      category: 'FN',
      priceValue: 7.99,
      type: 'product'
    },
    {
      id: 'unreal',
      name: 'Echo Unreal',
      price: '$4.99',
      originalPrice: null,
      discount: null,
      stock: 70,
      image: '/EchoUploads/29651d57-006b-40d3-8caa-7e889141958b.png',
      category: 'FN',
      priceValue: 4.99,
      type: 'product'
    },
    {
      id: 'temp-spoofer',
      name: 'Echo Temp Spoofer',
      price: '$2.99',
      originalPrice: null,
      discount: null,
      stock: 28,
      image: '/EchoUploads/e361b6c2-7afd-4b48-8183-c06ae7610f22.png',
      category: 'SPOOFER',
      priceValue: 2.99,
      type: 'product'
    },
    {
      id: 'perm-spoofer',
      name: 'Echo Perm Spoofer',
      price: '$19.99',
      originalPrice: null,
      discount: null,
      stock: null,
      image: '/EchoUploads/340a12e3-a8ad-455c-866f-ec49f380b073.png',
      category: 'SPOOFER',
      priceValue: 19.99,
      type: 'product'
    },
    // Bundles
    {
      id: 'unreal-bundle',
      name: 'Unreal Bundle',
      price: '$104.98',
      originalPrice: '$161.50',
      discount: 35,
      stock: 50,
      image: '/EchoUploads/29651d57-006b-40d3-8caa-7e889141958b.png',
      category: 'FN',
      priceValue: 104.98,
      type: 'bundle'
    },
    {
      id: 'champion-bundle',
      name: 'Champion Bundle',
      price: '$68.98',
      originalPrice: '$91.97',
      discount: 25,
      stock: 30,
      image: '/EchoUploads/771af544-6100-401f-a0ca-cef9313f9b22.png',
      category: 'SPOOFER',
      priceValue: 68.98,
      type: 'bundle'
    },
    {
      id: 'diamond-bundle',
      name: 'Diamond Bundle',
      price: '$34.98',
      originalPrice: '$43.73',
      discount: 20,
      stock: 25,
      image: '/EchoUploads/340a12e3-a8ad-455c-866f-ec49f380b073.png',
      category: 'SPOOFER',
      priceValue: 34.98,
      type: 'bundle'
    }
  ];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toastAddToCart(product.name);
  };

  const getBundleItems = (bundleId: string) => {
    switch (bundleId) {
      case 'unreal-bundle':
        return [
          {
            name: 'Lifetime License (Unlimited hours)',
            description: 'Echo Unreal',
            price: '$69.99',
            originalPrice: '$0.00',
            duration: 'Lifetime License (Unlimited hours)',
            image: '/EchoUploads/29651d57-006b-40d3-8caa-7e889141958b.png'
          },
          {
            name: 'Lifetime License (Unlimited hours)',
            description: 'Echo Temp Spoofer',
            price: '$34.99',
            originalPrice: '$0.00',
            duration: 'Lifetime License (Unlimited hours)',
            image: '/EchoUploads/e361b6c2-7afd-4b48-8183-c06ae7610f22.png'
          }
        ];
      case 'diamond-bundle':
        return [
          {
            name: '1 Week License (168 hours)',
            description: 'Echo Unreal',
            price: '$14.99',
            originalPrice: '$0.00',
            duration: '1 Week License (168 hours)',
            image: '/EchoUploads/20e50704-5145-4161-8e66-06219d53effa.png'
          },
          {
            name: 'One Time Usage (48 hours)',
            description: 'Echo Perm Spoofer',
            price: '$19.99',
            originalPrice: '$0.00',
            duration: 'One Time Usage (48 hours)',
            image: '/EchoUploads/340a12e3-a8ad-455c-866f-ec49f380b073.png'
          }
        ];
      case 'champion-bundle':
        return [
          {
            name: 'Lifetime usage (Unlimited hours)',
            description: 'Echo Perm Spoofer',
            price: '$34.99',
            originalPrice: '$0.00',
            duration: 'Lifetime usage (Unlimited hours)',
            image: '/EchoUploads/340a12e3-a8ad-455c-866f-ec49f380b073.png'
          },
          {
            name: '1 Month License (730 hours)',
            description: 'Echo Unreal',
            price: '$33.99',
            originalPrice: '$0.00',
            duration: '1 Month License (730 hours)',
            image: '/EchoUploads/20e50704-5145-4161-8e66-06219d53effa.png'
          }
        ];
      default:
        return [];
    }
  };

  const handleProductClick = (product: any) => {
    if (product.type === 'bundle') {
      setSelectedBundle(product.id);
    }
    // For regular products, we'll let the Link handle navigation
  };

  const handleClosePopup = () => {
    setSelectedBundle(null);
  };

  const handleFilterChange = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter) 
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    
    setSelectedFilters(updatedFilters);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter from URL
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Apply availability filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(product => {
        const inStock = product.stock !== null && product.stock > 0;
        const outOfStock = product.stock === null || product.stock === 0;
        
        return selectedFilters.some(filter => {
          if (filter === 'In stock') return inStock;
          if (filter === 'Out of stock') return outOfStock;
          return false;
        });
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'Alphabetically, A-Z':
          return a.name.localeCompare(b.name);
        case 'Alphabetically, Z-A':
          return b.name.localeCompare(a.name);
        case 'Price, low to high':
          return a.priceValue - b.priceValue;
        case 'Price, high to low':
          return b.priceValue - a.priceValue;
        case 'Date, old to new':
        case 'Date, new to old':
          // For now, keep original order since we don't have date data
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, selectedFilters, sort, categoryFilter]);

  const selectedBundleData = products.find(product => product.id === selectedBundle);

  const getCategoryDisplayName = (category: string | null) => {
    switch (category) {
      case 'FN':
        return 'Fortnite';
      case 'VALORANT':
        return 'Valorant';
      case 'SPOOFER':
        return 'Spoofer';
      default:
        return 'All';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category display */}
        {categoryFilter && (
          <div className="mb-6" data-animate="fade-in-up" data-delay="100">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-[#08C422]">{getCategoryDisplayName(categoryFilter)}</span> Products
            </h1>
          </div>
        )}

        {/* Header with filters - Mobile responsive */}
        <div 
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
          data-animate="fade-in-up"
          data-delay="200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-white text-sm font-medium">Filter by availability:</span>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="in-stock"
                  checked={selectedFilters.includes('In stock')}
                  onCheckedChange={() => handleFilterChange('In stock')}
                  className="border-gray-400 data-[state=checked]:bg-[#08C422] data-[state=checked]:border-[#08C422]"
                />
                <label htmlFor="in-stock" className="text-white text-sm cursor-pointer">
                  In stock (7)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="out-of-stock"
                  checked={selectedFilters.includes('Out of stock')}
                  onCheckedChange={() => handleFilterChange('Out of stock')}
                  className="border-gray-400 data-[state=checked]:bg-[#08C422] data-[state=checked]:border-[#08C422]"
                />
                <label htmlFor="out-of-stock" className="text-white text-sm cursor-pointer">
                  Out of stock (1)
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-white text-sm font-medium">Sort by:</span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[200px] bg-[#2a2a2a] border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-gray-600">
                  <SelectItem value="Alphabetically, A-Z" className="text-white focus:bg-[#3a3a3a] focus:text-white">
                    Alphabetically, A-Z
                  </SelectItem>
                  <SelectItem value="Alphabetically, Z-A" className="text-white focus:bg-[#3a3a3a] focus:text-white">
                    Alphabetically, Z-A
                  </SelectItem>
                  <SelectItem value="Price, low to high" className="text-white focus:bg-[#3a3a3a] focus:text-white">
                    Price, low to high
                  </SelectItem>
                  <SelectItem value="Price, high to low" className="text-white focus:bg-[#3a3a3a] focus:text-white">
                    Price, high to low
                  </SelectItem>
                  <SelectItem value="Date, old to new" className="text-white focus:bg-[#3a3a3a] focus:text-white">
                    Date, old to new
                  </SelectItem>
                  <SelectItem value="Date, new to old" className="text-white focus:bg-[#3a3a3a] focus:text-white">
                    Date, new to old
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-white text-sm">{filteredAndSortedProducts.length} products</span>
          </div>
        </div>

        {/* Products Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-0"
          data-animate="fade-in-up"
          data-delay="300"
        >
          {filteredAndSortedProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="group relative z-0"
              data-animate="scale-in"
              data-delay={300 + (index * 50)}
            >
              {product.type === 'bundle' ? (
                <div>
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    {/* Bundle Card Content */}
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 h-64 mb-4 transition-transform duration-300 hover:scale-105">
                      {/* Save Badge for bundles only */}
                      {product.type === 'bundle' && product.discount && (
                        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#08C422] to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                            <path fill="#fff" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity="0.5"/>
                            <path fill="#fff" d="m10.413 8.498l.164-.294C11.21 7.068 11.527 6.5 12 6.5s.79.568 1.423 1.704l.164.294c.18.323.27.484.41.59c.14.107.316.147.665.226l.318.072c1.23.278 1.845.417 1.991.888c.147.47-.273.96-1.111 1.941l-.217.254c-.238.278-.357.418-.41.59c-.055.172-.037.358 0 .73l.032.338c.127 1.308.19 1.962-.193 2.253c-.383.29-.958.026-2.11-.504l-.298-.138c-.327-.15-.49-.226-.664-.226c-.173 0-.337.076-.664.226l-.298-.138c-1.152.53-1.727.795-2.11.504c-.383-.29-.32-.945-.193-2.253l.032-.338c.037-.372.055-.558 0-.73c-.053-.172-.172-.312-.41-.59l-.217-.254c-.838-.98-1.258-1.47-1.111-1.941c.146-.47.76-.61 1.99-.888l.319-.072c.35-.08.524-.119.665-.225c.14-.107.23-.268.41-.59"/>
                          </svg>
                          SAVE {product.discount}%
                        </div>
                      )}

                      {/* Bundle Label for bundles */}
                      {product.type === 'bundle' && (
                        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#08C422] to-[#07A91E] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Bundle
                        </div>
                      )}
                      
                      {/* Stock Status */}
                      {product.stock === 0 && (
                        <div className="absolute top-3 right-3 z-10 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Sold out
                        </div>
                      )}
                      
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
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#08C422] text-lg font-bold">From {product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full mt-3 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      product.stock === 0
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-[#08C422] text-white hover:bg-[#07A91E] hover:scale-105'
                    }`}
                  >
                    {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                  </button>
                </div>
              ) : (
                <div>
                  <Link to={`/products/${product.id}`} className="block">
                    {/* Product Card Content */}
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 h-64 mb-4 transition-transform duration-300 hover:scale-105">
                      {/* Stock Status */}
                      {product.stock === 0 && (
                        <div className="absolute top-3 right-3 z-10 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Sold out
                        </div>
                      )}
                      
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
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#08C422] text-lg font-bold">From {product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full mt-3 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      product.stock === 0
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-[#08C422] text-white hover:bg-[#07A91E] hover:scale-105'
                    }`}
                  >
                    {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bundle Popup */}
      {selectedBundle && selectedBundleData && (
        <BundlePopup
          isOpen={!!selectedBundle}
          onClose={handleClosePopup}
          bundleName={selectedBundleData.name}
          items={getBundleItems(selectedBundle)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Products;
