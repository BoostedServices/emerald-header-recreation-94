
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface CustomToastProps {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export const showCustomToast = ({ title, description, type = 'success', duration = 3000 }: CustomToastProps) => {
  const { toast } = useToast();
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-[#08C422]" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-400" />;
      default:
        return <CheckCircle className="h-4 w-4 text-[#08C422]" />;
    }
  };

  toast({
    title: title,
    description: description,
    className: `
      bg-[#2a2a2a] 
      border-[#3a3a3a] 
      text-white
      shadow-xl 
      rounded-lg 
      animate-slide-in-right
    `,
    duration: duration,
  });
};

// Predefined toast functions for common actions
export const toastSuccess = (title: string, description?: string) => {
  showCustomToast({ title, description, type: 'success' });
};

export const toastError = (title: string, description?: string) => {
  showCustomToast({ title, description, type: 'error' });
};

export const toastInfo = (title: string, description?: string) => {
  showCustomToast({ title, description, type: 'info' });
};

// Specific toast functions for common e-commerce actions
export const toastAddToCart = (itemName: string) => {
  toastSuccess('Added to Cart', `${itemName} has been added to your cart`);
};

export const toastRemoveFromCart = (itemName: string) => {
  toastInfo('Removed from Cart', `${itemName} has been removed from your cart`);
};

export const toastAddToFavorites = (itemName: string) => {
  toastSuccess('Added to Favorites', `${itemName} has been added to your favorites`);
};

export const toastItemUpdated = (action: string) => {
  toastSuccess('Updated', `${action} completed successfully`);
};

export default showCustomToast;
