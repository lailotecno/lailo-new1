import React, { useState, useEffect } from 'react';
import Combobox from './Combobox';
import Slider from './Slider';
import { getStates, getCitiesByState, StateOption, CityOption } from '../../services/ibgeApi';

interface PropertySidebarProps {
  onFiltersChange?: (filters: any) => void;
}

const PropertySidebar: React.FC<PropertySidebarProps> = ({ onFiltersChange }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states] = useState<StateOption[]>(getStates());
  const [cities, setCities] = useState<CityOption[]>([{ value: '', label: 'Todas as cidades' }]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 500]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  const handleStateChange = async (state: string) => {
    setSelectedState(state);
    setSelectedCity(''); // Reset city when state changes
    
    if (state) {
      setLoadingCities(true);
      try {
        const citiesData = await getCitiesByState(state);
        setCities(citiesData);
      } catch (error) {
        console.error('Error loading cities:', error);
        setCities([{ value: '', label: 'Todas as cidades' }]);
      } finally {
        setLoadingCities(false);
      }
    } else {
      setCities([{ value: '', label: 'Todas as cidades' }]);
    }
  };

  // Apply filters automatically when any filter changes
  useEffect(() => {
    const filters = {
      state: selectedState,
      city: selectedCity,
      areaRange,
      priceRange
    };
    onFiltersChange?.(filters);
  }, [selectedState, selectedCity, areaRange, priceRange, onFiltersChange]);

  const handleClearFilters = () => {
    setSelectedState('');
    setSelectedCity('');
    setCities([{ value: '', label: 'Todas as cidades' }]);
    setAreaRange([0, 500]);
    setPriceRange([0, 2000000]);
    onFiltersChange?.({});
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filtros Avançados</h2>
        <button 
          onClick={handleClearFilters}
          className="py-2 px-3 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors text-sm font-semibold rounded-lg"
        >
          Limpar Filtros
        </button>
      </div>
      
      {/* Localização */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Localização</h3>
        <div className="space-y-4">
          <Combobox
            options={states}
            value={selectedState}
            onChange={handleStateChange}
            placeholder="Selecione um estado"
            searchable
          />
          <Combobox
            options={cities}
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder={loadingCities ? "Carregando cidades..." : "Selecione uma cidade"}
            searchable
            disabled={!selectedState || loadingCities}
          />
        </div>
      </div>

      {/* Área */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Área (m²)</h3>
        <Slider
          min={0}
          max={500}
          step={10}
          value={areaRange}
          onChange={setAreaRange}
          suffix="m²"
        />
      </div>

      {/* Valor do Lance */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Valor do lance</h3>
        <Slider
          min={0}
          max={2000000}
          step={10000}
          value={priceRange}
          onChange={setPriceRange}
          suffix="R$"
        />
      </div>

    </div>
  );
};

export default PropertySidebar;