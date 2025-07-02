
import React from 'react';
import { X } from 'lucide-react';

interface BundleItem {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  duration: string;
  image: string;
}

interface BundlePopupProps {
  isOpen: boolean;
  onClose: () => void;
  bundleName: string;
  items: BundleItem[];
}

const BundlePopup = ({ isOpen, onClose, bundleName, items }: BundlePopupProps) => {
  if (!isOpen) return null;

  const getBundleDescription = (bundleName: string) => {
    if (bundleName === 'Unreal Bundle') {
      return (
        <>
          <p className="text-gray-400 text-sm">
            1x Echo Unreal Lifetime License ---{'>'}--- (Can be switched to VAL Lifetime License)
          </p>
          <p className="text-gray-400 text-sm">
            1x Echo Perm Lifetime License ---{'>'}--- (Can be switched to TEMP Lifetime License)
          </p>
        </>
      );
    }
    return (
      <>
        <p className="text-gray-400 text-sm">
          1x Echo Week License ---{'>'}--- (Can be switched to VAL Week License) 1x Echo Perm
        </p>
        <p className="text-gray-400 text-sm">
          1 Time usage ---{'>'}--- (Can be switched to TEMP Week License)
        </p>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay with 30% opacity */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="relative bg-[#1a1a1a] rounded-2xl border border-gray-600/30 p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{bundleName}</h2>
          {getBundleDescription(bundleName)}
        </div>
        
        {/* Bundle items */}
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-[#2a2a2a]/50">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">{item.duration}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#08C422] font-bold">{item.price}</span>
                  <span className="text-gray-500 line-through text-sm">{item.originalPrice}</span>
                  <div className="w-2 h-2 bg-[#08C422] rounded-full ml-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer note */}
        <p className="text-gray-400 text-sm mb-4">
          Bundles will only deliver one variant of each product variants listed above.
        </p>
        
        {/* Coupon code input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#08C422]"
          />
        </div>
        
        {/* Add to cart button */}
        <button className="w-full bg-gradient-to-r from-[#08C422] to-[#07A91E] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#07A91E] hover:to-[#06951B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[#08C422]/30">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default BundlePopup;
