import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building, Car } from 'lucide-react';

const PageToggle: React.FC = () => {
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
    <div className="flex h-[44px] w-[88px] rounded-lg border-2 border-gray-300 overflow-hidden shadow-sm">
      <button
        onClick={() => handleToggle('property')}
        className={`flex-1 flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
          !isVehiclePage
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700'
        }`}
        title="Imóveis"
      >
        <Building className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleToggle('vehicle')}
        className={`flex-1 flex items-center justify-center text-sm font-semibold border-l-2 border-gray-300 transition-all duration-200 ${
          isVehiclePage
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700'
        }`}
        title="Veículos"
      >
        <Car className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PageToggle;