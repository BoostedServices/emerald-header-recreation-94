
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  currentStatus: string;
  onUpdateStatus: (newStatus: string) => void;
}

const StatusUpdateModal = ({ isOpen, onClose, productName, currentStatus, onUpdateStatus }: StatusUpdateModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  if (!isOpen) return null;

  const statusOptions = [
    { value: 'operational', label: 'Operational', color: 'text-[#08C422]' },
    { value: 'maintenance', label: 'Maintenance', color: 'text-amber-400' },
    { value: 'degraded', label: 'Degraded', color: 'text-orange-400' },
    { value: 'outage', label: 'Outage', color: 'text-red-400' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(selectedStatus);
    onClose();
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
          <h2 className="text-2xl font-bold text-white mb-2">Update Status</h2>
          <p className="text-gray-400 text-sm">
            Update the status for {productName}
          </p>
        </div>
        
        {/* Status selection form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select Status
            </label>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={selectedStatus === option.value}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-4 h-4 text-[#08C422] bg-[#2a2a2a] border-gray-600 focus:ring-[#08C422] focus:ring-2"
                  />
                  <span className={`text-sm font-medium ${option.color}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#2a2a2a] text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-[#3a3a3a] transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#08C422] to-[#07A91E] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#07A91E] hover:to-[#06951B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[#08C422]/30"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
