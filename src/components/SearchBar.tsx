
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const products = [
    {
      id: 'valorant-full',
      name: 'Echo Valorant Full',
      price: '$4.99',
      category: 'VALORANT',
      image: '/lovable-uploads/20e50704-5145-4161-8e66-06219d53effa.png'
    },
    {
      id: 'ultimate',
      name: 'Echo Ultimate',
      price: '$7.99',
      category: 'FN',
      image: '/lovable-uploads/771af544-6100-401f-a0ca-cef9313f9b22.png'
    },
    {
      id: 'unreal',
      name: 'Echo Unreal',
      price: '$4.99',
      category: 'FN',
      image: '/lovable-uploads/29651d57-006b-40d3-8caa-7e889141958b.png'
    },
    {
      id: 'temp-spoofer',
      name: 'Echo Temp Spoofer',
      price: '$2.99',
      category: 'SPOOFER',
      image: '/lovable-uploads/e361b6c2-7afd-4b48-8183-c06ae7610f22.png'
    },
    {
      id: 'perm-spoofer',
      name: 'Echo Perm Spoofer',
      price: '$19.99',
      category: 'SPOOFER',
      image: '/lovable-uploads/340a12e3-a8ad-455c-866f-ec49f380b073.png'
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredProducts.slice(0, 8));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="bg-[#121212] border-b border-[#252525] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="flex items-center bg-[#1a1a1a] border border-[#252525] rounded-xl px-4 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-3">
                <path fill="#08C422" d="M20.313 11.157a9.157 9.157 0 1 1-18.313 0a9.157 9.157 0 0 1 18.313 0" opacity="0.5"/>
                <path fill="#08C422" fillRule="evenodd" d="M18.839 18.839a.723.723 0 0 1 1.022 0l1.928 1.927a.723.723 0 0 1-1.023 1.023L18.84 19.86a.723.723 0 0 1 0-1.022" clipRule="evenodd"/>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for products..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
              />
              <button
                onClick={onClose}
                className="ml-3 text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/>
                </svg>
              </button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#252525] rounded-xl shadow-xl overflow-hidden animate-fade-in">
                <div className="p-2">
                  <div className="text-gray-400 text-sm px-3 py-2 font-medium">PRODUCTS</div>
                  <div className="custom-scrollbar max-h-80 overflow-y-auto">
                    {suggestions.map((product, index) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 hover:bg-[#252525] rounded-lg transition-all duration-300 opacity-0 animate-fade-in-up"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: 'forwards'
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover transform transition-transform duration-200 hover:scale-105"
                        />
                        <div className="flex-1">
                          <div className="text-white font-medium">{product.name}</div>
                          <div className="text-gray-400 text-sm">{product.category}</div>
                        </div>
                        <div className="text-[#08C422] font-semibold">{product.price}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* No results */}
            {searchQuery.trim() && suggestions.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#252525] rounded-xl shadow-xl animate-fade-in">
                <div className="p-6 text-center">
                  <div className="text-gray-400 text-lg mb-2">No products found</div>
                  <div className="text-gray-500 text-sm">Try searching for different keywords</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
