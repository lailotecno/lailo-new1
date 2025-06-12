import React from 'react';
import { Palette } from 'lucide-react';

interface ColorOption {
  value: string;
  label: string;
  color: string;
}

interface ColorSwatchProps {
  colors: ColorOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  colors,
  value,
  onChange,
  className = ''
}) => {
  // Add "Todas as cores" option at the beginning
  const allColorsOption = {
    value: '',
    label: 'Todas as cores',
    color: 'conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)'
  };

  const allOptions = [allColorsOption, ...colors];

  return (
    <div className={`grid grid-cols-6 gap-3 ${className}`}>
      {allOptions.map((color) => (
        <button
          key={color.value}
          onClick={() => onChange(color.value)}
          className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-gray-300 ${
            value === color.value
              ? '!border-blue-600 ring-4 ring-blue-200 shadow-lg'
              : 'border-gray-300 hover:border-gray-400 shadow-sm'
          }`}
          style={{ 
            background: color.color 
          }}
          title={color.label}
          aria-label={color.label}
        >
          {value === color.value && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full shadow-md border border-gray-300" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorSwatch;