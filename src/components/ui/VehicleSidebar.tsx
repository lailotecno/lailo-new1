import React, { useState, useEffect } from 'react';
import Combobox from './Combobox';
import Slider from './Slider';
import ColorSwatch from './ColorSwatch';
import { getBrandsByVehicleType, modelsByBrand, vehicleColors } from '../../data/mockData';
import { getStates, getCitiesByState, StateOption, CityOption } from '../../services/ibgeApi';

interface VehicleSidebarProps {
  onFiltersChange?: (filters: any) => void;
  selectedVehicleType?: string;
}

const VehicleSidebar: React.FC<VehicleSidebarProps> = ({ 
  onFiltersChange,
  selectedVehicleType = 'carro'
}) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states] = useState<StateOption[]>(getStates());
  const [cities, setCities] = useState<CityOption[]>([{ value: '', label: 'Todas as cidades' }]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [yearRange, setYearRange] = useState<[number, number]>([1990, 2024]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  // Get brands based on selected vehicle type
  const availableBrands = getBrandsByVehicleType(selectedVehicleType);
  const availableModels = selectedBrand ? modelsByBrand[selectedBrand] || [] : [];

  // Reset brand and model when vehicle type changes
  useEffect(() => {
    setSelectedBrand('');
    setSelectedModel('');
  }, [selectedVehicleType]);

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

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(''); // Reset model when brand changes
  };

  // Apply filters automatically when any filter changes
  useEffect(() => {
    const filters = {
      state: selectedState,
      city: selectedCity,
      brand: selectedBrand,
      model: selectedModel,
      color: selectedColor,
      yearRange,
      priceRange
    };
    onFiltersChange?.(filters);
  }, [selectedState, selectedCity, selectedBrand, selectedModel, selectedColor, yearRange, priceRange, onFiltersChange]);

  const handleClearFilters = () => {
    setSelectedState('');
    setSelectedCity('');
    setCities([{ value: '', label: 'Todas as cidades' }]);
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedColor('');
    setYearRange([1990, 2024]);
    setPriceRange([0, 500000]);
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

      {/* Marca e Modelo */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Marca e Modelo</h3>
        <div className="space-y-4">
          <Combobox
            options={availableBrands}
            value={selectedBrand}
            onChange={handleBrandChange}
            placeholder="Selecione uma marca"
            searchable
          />
          <Combobox
            options={availableModels}
            value={selectedModel}
            onChange={setSelectedModel}
            placeholder="Selecione um modelo"
            searchable
          />
        </div>
      </div>

      {/* Cor */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Cor</h3>
        <ColorSwatch
          colors={vehicleColors}
          value={selectedColor}
          onChange={setSelectedColor}
        />
      </div>

      {/* Ano */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Ano</h3>
        <Slider
          min={1990}
          max={2024}
          step={1}
          value={yearRange}
          onChange={setYearRange}
        />
      </div>

      {/* Valor do Lance */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Valor do lance</h3>
        <Slider
          min={0}
          max={500000}
          step={5000}
          value={priceRange}
          onChange={setPriceRange}
          suffix="R$"
        />
      </div>

    </div>
  );
};

export default VehicleSidebar;