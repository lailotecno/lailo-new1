import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building, Car, SlidersHorizontal, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

interface MobileHeaderProps {
  onFilterClick: () => void;
  onSortClick: () => void;
  viewMode: 'horizontal' | 'vertical';
  onViewModeChange: (mode: 'horizontal' | 'vertical') => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  onFilterClick,
  onSortClick,
  viewMode,
  onViewModeChange
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isVehiclePage = location.pathname.includes('veiculos');
  
  const handleToggle = (type: 'property' | 'vehicle') => {
    if (type === 'property') {
      navigate('/buscador/imoveis');
    } else {
      navigate('/buscador/veiculos');
    }
  };

  return (
    <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Main header */}
      <div className="flex items-center p-4">
        {/* Property/Vehicle Toggle */}
        <div className="flex h-9 w-20 rounded-lg border-2 border-gray-300 overflow-hidden">
          <button
            onClick={() => handleToggle('property')}
            className={`flex-1 flex items-center justify-center transition-all duration-200 ${
              !isVehiclePage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700'
            }`}
            title="Imóveis"
          >
            <Building className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToggle('vehicle')}
            className={`flex-1 flex items-center justify-center border-l-2 border-gray-300 transition-all duration-200 ${
              isVehiclePage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700'
            }`}
            title="Veículos"
          >
            <Car className="w-4 h-4" />
          </button>
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onSortClick}
            className="h-9 w-9 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            title="Ordenar"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
          
          <button
            onClick={onFilterClick}
            className="h-9 w-9 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            title="Filtros"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onViewModeChange(viewMode === 'horizontal' ? 'vertical' : 'horizontal')}
            className="h-9 w-9 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            title={viewMode === 'horizontal' ? 'Visualização em grade' : 'Visualização horizontal'}
          >
            {viewMode === 'horizontal' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;