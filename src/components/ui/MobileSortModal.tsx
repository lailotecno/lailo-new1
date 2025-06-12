import React from 'react';
import { X, Check } from 'lucide-react';

interface MobileSortModalProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const MobileSortModal: React.FC<MobileSortModalProps> = ({
  isOpen,
  onClose,
  sortBy,
  onSortChange
}) => {
  const sortOptions = [
    { value: 'recent', label: 'Mais recentes' },
    { value: 'price-asc', label: 'Menor preço' },
    { value: 'price-desc', label: 'Maior preço' },
    { value: 'discount-desc', label: 'Maior desconto' },
    { value: 'proximity', label: 'Mais próximos' }
  ];

  const handleSortSelect = (value: string) => {
    onSortChange(value);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Ordenar por</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Options */}
        <div className="p-4 space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <span className={`font-medium ${sortBy === option.value ? 'text-blue-600' : 'text-gray-900'}`}>
                {option.label}
              </span>
              {sortBy === option.value && (
                <Check className="w-5 h-5 text-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Safe area for iOS */}
        <div className="h-6" />
      </div>
    </>
  );
};

export default MobileSortModal;