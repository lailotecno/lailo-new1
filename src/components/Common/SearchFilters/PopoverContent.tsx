import React from 'react';
import { X } from 'lucide-react';

interface PopoverState {
  isOpen: boolean;
  selectedItems: string[];
}

interface Option {
  value: string;
  label: string;
}

interface PopoverContentProps {
  type: 'origem' | 'etapa';
  options: Option[];
  state: PopoverState;
  onClose: () => void;
  onCheckboxChange: (value: string) => void;
  onToggleAll: () => void;
  onApply: () => void;
  getToggleButtonText: () => string;
}

const PopoverContent: React.FC<PopoverContentProps> = ({
  type,
  options,
  state,
  onClose,
  onCheckboxChange,
  onToggleAll,
  onApply,
  getToggleButtonText
}) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-sm z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-900 capitalize">{type}</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-2 mb-4">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={state.selectedItems.includes(option.value)}
                onChange={() => onCheckboxChange(option.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <button
            onClick={onToggleAll}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            {getToggleButtonText()}
          </button>
          <button
            onClick={onApply}
            className="py-2 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopoverContent;