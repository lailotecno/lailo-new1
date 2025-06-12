import React from 'react';
import { ChevronDown, LayoutGrid, List } from 'lucide-react';

interface ListingHeaderProps {
  totalResults: number;
  totalSites: number;
  newToday: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'horizontal' | 'vertical';
  onViewModeChange: (mode: 'horizontal' | 'vertical') => void;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  totalResults,
  totalSites,
  newToday,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}) => {
  const sortOptions = [
    { value: 'recent', label: 'Mais recentes' },
    { value: 'price-asc', label: 'Menor preço' },
    { value: 'price-desc', label: 'Maior preço' },
    { value: 'discount-desc', label: 'Maior desconto' },
    { value: 'proximity', label: 'Mais próximos' }
  ];

  const selectedSort = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-gray-200">
      {/* Status Text */}
      <div className="text-sm text-gray-600">
        Encontramos{' '}
        <span className="font-bold text-gray-900 text-base">
          {totalResults.toLocaleString()}
        </span>{' '}
        leilões em{' '}
        <span className="font-bold text-gray-900">
          {totalSites}
        </span>{' '}
        sites ·{' '}
        <span className="font-bold text-blue-600">
          {newToday}
        </span>{' '}
        novos hoje
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Sort Label */}
        <span className="text-sm font-semibold text-gray-700">Ordenar por:</span>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-[44px] pl-4 pr-10 border-2 border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none cursor-pointer font-medium shadow-sm hover:border-gray-400 transition-all duration-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* View Mode Toggle */}
        <div className="flex h-[44px] rounded-lg border-2 border-gray-300 overflow-hidden shadow-sm">
          <button
            onClick={() => onViewModeChange('horizontal')}
            className={`flex items-center justify-center w-12 transition-all duration-200 ${
              viewMode === 'horizontal'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Visualização horizontal"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange('vertical')}
            className={`flex items-center justify-center w-12 border-l-2 border-gray-300 transition-all duration-200 ${
              viewMode === 'vertical'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Visualização em grade"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;