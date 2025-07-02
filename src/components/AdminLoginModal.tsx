
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string, rememberMe: boolean) => void;
}

const AdminLoginModal = ({ isOpen, onClose, onLogin }: AdminLoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password, rememberMe);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="relative bg-[#1a1a1a] rounded-2xl border border-gray-600/30 p-6 max-w-md w-full mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-400 text-sm">
            Login to manage system status updates
          </p>
        </div>
        
        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#08C422]"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#08C422]"
              placeholder="Enter password"
              required
            />
          </div>
          
          <div className="flex items-center">
            {/* Custom checkbox */}
            <div className="relative">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <label
                htmlFor="rememberMe"
                className="flex items-center cursor-pointer"
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  rememberMe 
                    ? 'bg-[#08C422] border-[#08C422]' 
                    : 'bg-[#2a2a2a] border-gray-600 hover:border-[#08C422]/50'
                }`}>
                  {rememberMe && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  )}
                </div>
                <span className="ml-3 text-sm text-gray-300">Remember me</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#08C422] to-[#07A91E] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#07A91E] hover:to-[#06951B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[#08C422]/30 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#fff" d="m17.737 14.622l-2.426 2.23a11.6 11.6 0 0 1-4.299 2.37l.644 3.004a1 1 0 0 0 1.469.661l3.905-2.202a3.035 3.035 0 0 0 1.375-3.304zM7.266 8.776l2.088-2.48l-2.604-.628a2.78 2.78 0 0 0-3.387 1.357l-2.2 3.9a1 1 0 0 0 .661 1.469l3.073.659a12.9 12.9 0 0 1 2.369-4.277m9.468.04a1.5 1.5 0 1 0-1.5-1.5a1.5 1.5 0 0 0 1.5 1.5"/>
              <path fill="#fff" d="M22.601 2.062a1 1 0 0 0-.713-.713A11.25 11.25 0 0 0 10.47 4.972L7.266 8.776a12.94 12.94 0 0 0-2.924 6.71a1 1 0 0 0 .284.837l3.1 3.1a1 1 0 0 0 .708.293l.086-.004a11.85 11.85 0 0 0 6.79-2.86l3.664-3.368A11.2 11.2 0 0 0 22.6 2.062Zm-5.867 6.754a1.5 1.5 0 1 1 1.5-1.5a1.5 1.5 0 0 1-1.5 1.5" opacity="0.5"/>
            </svg>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
