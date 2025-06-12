import React, { useState, useRef, useEffect } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  suffix?: string;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  suffix = '',
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = min + (percentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;

    if (isDragging === 'min') {
      onChange([Math.min(steppedValue, value[1]), value[1]]);
    } else {
      onChange([value[0], Math.max(steppedValue, value[0])]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value, min, max, step]);

  const handleInputChange = (type: 'min' | 'max', inputValue: string) => {
    const numValue = parseInt(inputValue) || 0;
    if (type === 'min') {
      onChange([Math.min(numValue, value[1]), value[1]]);
    } else {
      onChange([value[0], Math.max(numValue, value[0])]);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Slider Track */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="relative h-3 bg-gray-200 rounded-full cursor-pointer"
        >
          {/* Active Range */}
          <div
            className="absolute h-3 bg-blue-600 rounded-full shadow-sm"
            style={{
              left: `${getPercentage(value[0])}%`,
              width: `${getPercentage(value[1]) - getPercentage(value[0])}%`
            }}
          />
          
          {/* Min Handle */}
          <div
            className="absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-md hover:shadow-lg transition-shadow duration-200"
            style={{ left: `${getPercentage(value[0])}%` }}
            onMouseDown={handleMouseDown('min')}
          />
          
          {/* Max Handle */}
          <div
            className="absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-md hover:shadow-lg transition-shadow duration-200"
            style={{ left: `${getPercentage(value[1])}%` }}
            onMouseDown={handleMouseDown('max')}
          />
        </div>
      </div>

      {/* Input Fields */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Mínimo</label>
          <div className="relative">
            <input
              type="number"
              value={value[0]}
              onChange={(e) => handleInputChange('min', e.target.value)}
              className="w-full h-[44px] px-4 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
              min={min}
              max={max}
              step={step}
            />
            {suffix && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-medium">
                {suffix}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Máximo</label>
          <div className="relative">
            <input
              type="number"
              value={value[1]}
              onChange={(e) => handleInputChange('max', e.target.value)}
              className="w-full h-[44px] px-4 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
              min={min}
              max={max}
              step={step}
            />
            {suffix && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-medium">
                {suffix}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;