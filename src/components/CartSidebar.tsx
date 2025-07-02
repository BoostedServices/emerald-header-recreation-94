
import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartSidebar = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice 
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-[#1a1a1a] border-l border-[#2a2a2a] transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-4 bg-[#2a2a2a] rounded-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm mb-1">{item.name}</h3>
                    <p className="text-[#08C422] font-semibold">{item.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#3a3a3a] rounded transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-400" />
                      </button>
                      
                      <span className="text-white px-2">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#3a3a3a] rounded transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors self-start"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2a2a2a] p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-semibold">Total:</span>
              <span className="text-[#08C422] font-bold text-lg">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <button className="w-full bg-[#08C422] text-white py-3 rounded-lg font-semibold hover:bg-[#07A91E] transition-colors duration-200">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
