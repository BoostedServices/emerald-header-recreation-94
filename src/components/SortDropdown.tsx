
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  onDropdownChange?: (isOpen: boolean) => void;
}

const SortDropdown = ({ value, onChange, onDropdownChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    'Alphabetically, A-Z',
    'Alphabetically, Z-A',
    'Price, low to high',
    'Price, high to low',
    'Date, old to new',
    'Date, new to old'
  ];

  useEffect(() => {
    if (onDropdownChange) {
      onDropdownChange(isOpen);
    }
  }, [isOpen, onDropdownChange]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative z-[100000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-[#08C422] transition-colors duration-300"
      >
        <span className="font-medium">{value}</span>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[99998]" 
            onClick={handleClose}
          />
          <div className="absolute top-full right-0 mt-2 w-64 max-w-[90vw] border border-gray-600 rounded-xl shadow-2xl shadow-black/50 z-[100001] backdrop-blur-sm overflow-hidden bg-[#2a2a2a]">
            <div className="p-2">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    value === option 
                      ? 'bg-[#08C422] text-white' 
                      : 'text-white hover:bg-[#3a3a3a]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;
