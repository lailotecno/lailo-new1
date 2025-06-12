import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder,
  searchable = true,
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const comboboxRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = value ? options.find(option => option.value === value) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className={`relative ${className}`} ref={comboboxRef}>
      <button
        onClick={handleToggle}
        className={`w-full h-[44px] px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-left flex items-center justify-between text-sm transition-all duration-200 shadow-sm ${
          disabled 
            ? 'cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200' 
            : 'hover:border-gray-400'
        }`}
        disabled={disabled}
      >
        <span className={selectedOption && value ? 'text-gray-900 font-medium' : 'text-gray-500'}>
          {selectedOption && value ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
          disabled ? 'text-gray-300' : 'text-gray-400'
        } ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
          {searchable && (
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full h-[40px] pl-10 pr-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>
          )}
          
          <div className="max-h-64 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">
                Nenhuma opção encontrada
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 flex items-center justify-between transition-colors duration-200 rounded-md mx-1"
                >
                  <span className="font-medium text-gray-900">{option.label}</span>
                  {value === option.value && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Combobox;