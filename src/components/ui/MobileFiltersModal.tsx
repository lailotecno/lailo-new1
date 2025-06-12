import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Search } from 'lucide-react';
import { ContentType } from '../../types';
import { getBrandsByVehicleType, modelsByBrand, vehicleColors } from '../../data/mockData';
import { getStates, getCitiesByState, StateOption, CityOption } from '../../services/ibgeApi';
import ColorSwatch from './ColorSwatch';
import Slider from './Slider';

interface MobileFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContentType;
  onApplyFilters: (filters: any) => void;
  selectedVehicleType?: string;
}

const MobileFiltersModal: React.FC<MobileFiltersModalProps> = ({
  isOpen,
  onClose,
  type,
  onApplyFilters,
  selectedVehicleType = 'carro'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states] = useState<StateOption[]>(getStates());
  const [cities, setCities] = useState<CityOption[]>([{ value: '', label: 'Todas as cidades' }]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 500]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, 2024]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, type === 'property' ? 2000000 : 500000]);
  const [selectedFormato, setSelectedFormato] = useState<string>('');
  const [selectedOrigem, setSelectedOrigem] = useState<string[]>([]);
  const [selectedEtapa, setSelectedEtapa] = useState<string[]>([]);

  // Get brands based on selected vehicle type
  const availableBrands = type === 'vehicle' ? getBrandsByVehicleType(selectedVehicleType) : [];
  const availableModels = selectedBrand ? modelsByBrand[selectedBrand] || [] : [];

  const origemOptions = [
    { value: 'judicial', label: 'Judicial' },
    { value: 'extrajudicial', label: 'Extrajudicial' },
    { value: 'administrativo', label: 'Administrativo' },
    { value: 'leilao-publico', label: 'Leilão Público' }
  ];

  const etapaOptions = [
    { value: 'primeira-praca', label: '1ª Praça' },
    { value: 'segunda-praca', label: '2ª Praça' },
    { value: 'terceira-praca', label: '3ª Praça' },
    { value: 'venda-direta', label: 'Venda Direta' }
  ];

  // Reset filters when type changes
  useEffect(() => {
    if (type === 'property') {
      setPriceRange([0, 2000000]);
    } else {
      setPriceRange([0, 500000]);
      setSelectedBrand('');
      setSelectedModel('');
      setSelectedColor('');
    }
  }, [type]);

  // Reset brand and model when vehicle type changes
  useEffect(() => {
    if (type === 'vehicle') {
      setSelectedBrand('');
      setSelectedModel('');
    }
  }, [selectedVehicleType, type]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
    
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

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSelectedModel('');
  };

  const handleOrigemToggle = (value: string) => {
    setSelectedOrigem(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleEtapaToggle = (value: string) => {
    setSelectedEtapa(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedCity('');
    setCities([{ value: '', label: 'Todas as cidades' }]);
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedColor('');
    setAreaRange([0, 500]);
    setYearRange([1990, 2024]);
    setPriceRange([0, type === 'property' ? 2000000 : 500000]);
    setSelectedFormato('');
    setSelectedOrigem([]);
    setSelectedEtapa([]);
  };

  const handleApply = () => {
    const filters = {
      searchTerm,
      state: selectedState,
      city: selectedCity,
      ...(type === 'property' && {
        areaRange
      }),
      ...(type === 'vehicle' && {
        brand: selectedBrand,
        model: selectedModel,
        color: selectedColor,
        yearRange
      }),
      priceRange,
      formato: selectedFormato,
      origem: selectedOrigem,
      etapa: selectedEtapa
    };
    
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 z-50 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white h-[98vh] rounded-t-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Busca
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por palavra-chave"
                className="w-full h-[44px] pl-11 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Localização
            </label>
            <div className="space-y-4">
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className="w-full h-[44px] pl-4 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white appearance-none"
                >
                  <option value="" disabled hidden style={{ color: '#6b7280' }}>
                    Selecione um estado
                  </option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value} style={{ color: '#111827' }}>
                      {state.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-[44px] pl-4 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white appearance-none"
                  disabled={!selectedState || loadingCities}
                >
                  <option value="" disabled hidden style={{ color: '#6b7280' }}>
                    {loadingCities ? "Carregando cidades..." : "Selecione uma cidade"}
                  </option>
                  {!loadingCities && cities.map((city) => (
                    <option key={city.value} value={city.value} style={{ color: '#111827' }}>
                        {city.label}
                      </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Property specific filters */}
          {type === 'property' && (
            <>
              {/* Área */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  Área (m²)
                </label>
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={areaRange}
                  onChange={setAreaRange}
                  suffix="m²"
                />
              </div>
            </>
          )}

          {/* Vehicle specific filters */}
          {type === 'vehicle' && (
            <>
              {/* Marca e Modelo */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  Marca e Modelo
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <select
                      value={selectedBrand}
                      onChange={handleBrandChange}
                     className="w-full h-[44px] pl-4 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white appearance-none"
                    >
                      <option value="" disabled hidden style={{ color: '#6b7280' }}>
                        Selecione uma marca
                      </option>
                      {availableBrands.map((brand) => (
                        <option key={brand.value} value={brand.value} style={{ color: '#111827' }}>
                          {brand.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                     className="w-full h-[44px] pl-4 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white appearance-none"
                      disabled={!selectedBrand}
                    >
                      <option value="" disabled hidden style={{ color: '#6b7280' }}>
                        Selecione um modelo
                      </option>
                      {availableModels.map((model) => (
                        <option key={model.value} value={model.value} style={{ color: '#111827' }}>
                          {model.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Cor */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  Cor
                </label>
                <ColorSwatch
                  colors={vehicleColors}
                  value={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>

              {/* Ano */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  Ano
                </label>
                <Slider
                  min={1990}
                  max={2024}
                  step={1}
                  value={yearRange}
                  onChange={setYearRange}
                />
              </div>
            </>
          )}

          {/* Valor do Lance */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Valor do lance
            </label>
            <Slider
              min={0}
              max={type === 'property' ? 2000000 : 500000}
              step={type === 'property' ? 10000 : 5000}
              value={priceRange}
              onChange={setPriceRange}
              suffix="R$"
            />
          </div>

          {/* Formato */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Formato
            </label>
            <div className="flex h-[44px] rounded-lg border-2 border-gray-300 overflow-hidden">
              <button
                onClick={() => setSelectedFormato(selectedFormato === 'leilao' ? '' : 'leilao')}
                className={`flex-1 px-4 text-sm font-semibold transition-all duration-200 ${
                  selectedFormato === 'leilao'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                Leilão
              </button>
              <button
                onClick={() => setSelectedFormato(selectedFormato === 'venda-direta' ? '' : 'venda-direta')}
                className={`flex-1 px-4 text-sm font-semibold border-l-2 border-gray-300 transition-all duration-200 ${
                  selectedFormato === 'venda-direta'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                Venda Direta
              </button>
            </div>
          </div>

          {/* Origem */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Origem
            </label>
            <div className="space-y-2">
              {origemOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedOrigem.includes(option.value)}
                    onChange={() => handleOrigemToggle(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Etapa */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
              Etapa
            </label>
            <div className="space-y-2">
              {etapaOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedEtapa.includes(option.value)}
                    onChange={() => handleEtapaToggle(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <button
            onClick={handleClearFilters}
            className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpar Filtros
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFiltersModal;