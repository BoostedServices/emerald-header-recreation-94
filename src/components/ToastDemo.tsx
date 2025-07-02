
import React from 'react';
import { 
  toastAddToCart, 
  toastAddToFavorites, 
  toastRemoveFromCart, 
  toastSuccess, 
  toastError, 
  toastInfo 
} from './CustomToast';

const ToastDemo = () => {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-white text-lg font-semibold mb-4">Toast Notifications Demo</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => toastAddToCart('Gaming Headset')}
          className="bg-[#08C422] text-white px-4 py-2 rounded-lg hover:bg-[#07A91E] transition-colors"
        >
          Add to Cart
        </button>
        
        <button
          onClick={() => toastAddToFavorites('Gaming Mouse')}
          className="bg-[#08C422] text-white px-4 py-2 rounded-lg hover:bg-[#07A91E] transition-colors"
        >
          Add to Favorites
        </button>
        
        <button
          onClick={() => toastRemoveFromCart('Keyboard')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Remove from Cart
        </button>
        
        <button
          onClick={() => toastError('Error', 'Something went wrong!')}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Error Toast
        </button>
        
        <button
          onClick={() => toastSuccess('Success!', 'Operation completed successfully')}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Success Toast
        </button>
        
        <button
          onClick={() => toastInfo('Info', 'Here is some information')}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Info Toast
        </button>
      </div>
    </div>
  );
};

export default ToastDemo;
