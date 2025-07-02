import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems, openCart } = useCart();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Status', path: '/status' },
    { name: 'Discord', path: 'https://discord.gg/dM672qYTEQ', external: true }
  ];
  
  return (
    <>
      <header className="bg-[#121212] border-b border-[#252525]" data-animate="slide-in-down" data-delay="0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Navigation Menu */}
            <nav className="flex items-center space-x-8 mt-2" data-animate="fade-in-left" data-delay="100">
              {navItems.map((item, index) => (
                item.external ? (
                  <a 
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-md text-gray-300 hover:text-[#08C422]"
                    data-animate="fade-in-up"
                    data-delay={150 + (index * 50)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-md ${
                      location.pathname === item.path
                        ? 'text-[#08C422] bg-[#08C422] bg-opacity-20' 
                        : 'text-gray-300 hover:text-[#08C422]'
                    }`}
                    data-animate="fade-in-up"
                    data-delay={150 + (index * 50)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Logo - Centered */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
              data-animate="scale-in"
              data-delay="200"
            >
              <img src="/lovable-uploads/9adeff6f-a289-44db-bb22-7b540ba1b6be.png" alt="Logo" className="h-12 w-auto" />
            </div>

            {/* Right Side Icons */}
            <div 
              className="flex items-center space-x-4 mt-2"
              data-animate="fade-in-right"
              data-delay="300"
            >
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                data-animate="scale-in"
                data-delay="350"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10 20h3.627a5.25 5.25 0 1 1 8.369-6.34Q22 12.9 22 12c0-.442 0-1.608-.002-2H2.002C2 10.392 2 11.558 2 12c0 3.771 0 5.657 1.172 6.828S6.229 20 10 20" opacity="0.5" />
                  <path fill="currentColor" d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75" />
                  <path fill="currentColor" fillRule="evenodd" d="M17.75 14.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M14 16.75a3.75 3.75 0 1 1 6.879 2.068l.901.902a.75.75 0 1 1-1.06 1.06l-.902-.901A3.75 3.75 0 0 1 14 16.75" clipRule="evenodd" />
                  <path fill="currentColor" d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4" />
                </svg>
              </button>
              <button 
                onClick={openCart}
                className="text-gray-400 hover:text-white transition-colors duration-200 relative"
                data-animate="scale-in"
                data-delay="450"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10 2a1.75 1.75 0 1 0 0 3.5h4A1.75 1.75 0 1 0 14 2zM3.863 16.205c-.858-3.432-1.287-5.147-.386-6.301S6.147 8.75 9.684 8.75h4.63c3.538 0 5.307 0 6.208 1.154s.472 2.87-.386 6.301c-.546 2.183-.819 3.274-1.633 3.91c-.813.635-1.938.635-4.188.635h-4.63c-2.25 0-3.376 0-4.19-.635c-.813-.636-1.086-1.727-1.632-3.91" opacity="0.5" />
                  <path fill="currentColor" d="M15.58 4.502a1.74 1.74 0 0 0 .002-1.501c.683.005 1.216.036 1.692.222a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.047.17l.512 2.964c-.408-.282-.935-.45-1.617-.55l-.361-2.087c-.284-1.04-.387-1.367-.561-1.601a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118M8.418 3a1.74 1.74 0 0 0 .002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.174.234-.277.561-.56 1.6l-.362 2.089c-.681.1-1.208.267-1.617.548l.512-2.962l.047-.17c.237-.872.41-1.506.776-2a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.332 9.749a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM16 12a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 16 12m-3.25.75a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#08C422] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
