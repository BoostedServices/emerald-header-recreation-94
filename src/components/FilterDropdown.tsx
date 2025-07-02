
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  onDropdownChange?: (isOpen: boolean) => void;
}

const FilterDropdown = ({ value, onChange, selectedFilters, onFiltersChange, onDropdownChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { label: 'In stock', count: 7 },
    { label: 'Out of stock', count: 1 }
  ];

  useEffect(() => {
    if (onDropdownChange) {
      onDropdownChange(isOpen);
    }
  }, [isOpen, onDropdownChange]);

  const handleFilterToggle = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter) 
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    
    onFiltersChange(updatedFilters);
  };

  const handleReset = () => {
    onFiltersChange([]);
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
          <div className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] border border-gray-600 rounded-xl shadow-2xl shadow-black/50 z-[100001] backdrop-blur-sm overflow-hidden bg-[#2a2a2a]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Filter:</span>
                <span className="text-white font-medium">{value}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">{selectedFilters.length} selected</span>
                <button 
                  onClick={handleReset}
                  className="text-[#08C422] text-sm font-medium hover:text-[#07A91E] transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            
            {/* Options */}
            <div className="p-2">
              {options.map((option) => {
                const isSelected = selectedFilters.includes(option.label);
                return (
                  <button
                    key={option.label}
                    onClick={() => handleFilterToggle(option.label)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-[#3a3a3a] transition-all duration-200 rounded-lg"
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected 
                        ? 'bg-[#08C422] border-[#08C422]' 
                        : 'border-gray-500 hover:border-[#08C422]'
                    }`}>
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 text-left">{option.label}</span>
                    <span className="text-gray-400 text-sm">({option.count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;
