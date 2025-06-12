import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Building, Home, Factory, TreePine, Hotel, Car, Truck, Bike, Bus, ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentType } from '../../types';
import PageToggle from '../ui/PageToggle';
import PopoverContent from './SearchFilters/PopoverContent';

interface SearchFiltersProps {
  type: ContentType;
  onSearch: (filters: any) => void;
  onCategoryChange?: (category: string) => void;
  onTypeChange?: (type: string) => void;
}

interface PopoverState {
  isOpen: boolean;
  selectedItems: string[];
}

interface CategoryOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface TypeOption {
  value: string;
  label: string;
}

interface CategoryTypeMap {
  [key: string]: TypeOption[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  type, 
  onSearch, 
  onCategoryChange, 
  onTypeChange 
}) => {
  const isProperty = type === 'property';
  
  const [selectedFormato, setSelectedFormato] = useState<string>('');
  
  const [origemState, setOrigemState] = useState<PopoverState>({
    isOpen: false,
    selectedItems: []
  });
  
  const [etapaState, setEtapaState] = useState<PopoverState>({
    isOpen: false,
    selectedItems: []
  });

  // Category and Type states
  const [selectedCategory, setSelectedCategory] = useState(
    isProperty ? 'residenciais' : 'veiculos-leves'
  );
  const [selectedType, setSelectedType] = useState(isProperty ? 'todos' : 'carro');

  const origemRef = useRef<HTMLDivElement>(null);
  const etapaRef = useRef<HTMLDivElement>(null);
  const typesContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Data for Properties
  const propertyCategories: CategoryOption[] = [
    { value: "residenciais", label: "Residenciais", icon: <Home className="h-4 w-4" /> },
    { value: "comerciais", label: "Comerciais", icon: <Building className="h-4 w-4" /> },
    { value: "rurais", label: "Rurais", icon: <TreePine className="h-4 w-4" /> },
    { value: "industriais", label: "Industriais", icon: <Factory className="h-4 w-4" /> },
    { value: "hospedagem", label: "Hospedagem", icon: <Hotel className="h-4 w-4" /> },
    { value: "outros", label: "Outros", icon: <Building className="h-4 w-4" /> },
  ];

  const propertyTypesByCategory: CategoryTypeMap = {
    residenciais: [
      { value: "todos", label: "Todos" },
      { value: "apartamento", label: "Apartamento" },
      { value: "casa", label: "Casa" },
      { value: "cobertura", label: "Cobertura" },
      { value: "condominio-residencial", label: "Condomínio Residencial" },
      { value: "conjunto-residencial", label: "Conjunto Residencial" },
      { value: "edificio-residencial", label: "Edifício Residencial" },
      { value: "flat", label: "Flat" },
      { value: "kitnet", label: "Kitnet" },
      { value: "loft", label: "Loft" },
      { value: "loteamento-residencial", label: "Loteamento Residencial" },
      { value: "lote-residencial", label: "Lote Residencial" },
      { value: "predio-residencial", label: "Prédio Residencial" },
      { value: "sobrado", label: "Sobrado" },
      { value: "studio", label: "Studio" },
      { value: "terreno-residencial", label: "Terreno Residencial" },
      { value: "triplex", label: "Triplex" },
    ],
    comerciais: [
      { value: "todos", label: "Todos" },
      { value: "condominio-comercial", label: "Condomínio Comercial" },
      { value: "conjunto-comercial", label: "Conjunto Comercial" },
      { value: "deposito", label: "Depósito" },
      { value: "escritorio", label: "Escritório" },
      { value: "loteamento-comercial", label: "Loteamento Comercial" },
      { value: "lote-comercial", label: "Lote Comercial" },
      { value: "loja", label: "Loja" },
      { value: "ponto-comercial", label: "Ponto Comercial" },
      { value: "predio-comercial", label: "Prédio Comercial" },
      { value: "sala", label: "Sala" },
      { value: "terreno-comercial", label: "Terreno Comercial" },
    ],
    rurais: [
      { value: "todos", label: "Todos" },
      { value: "chacara", label: "Chácara" },
      { value: "fazenda", label: "Fazenda" },
      { value: "loteamento-rural", label: "Loteamento Rural" },
      { value: "lote-rural", label: "Lote Rural" },
      { value: "sitio", label: "Sítio" },
      { value: "terreno-rural", label: "Terreno Rural" },
    ],
    industriais: [
      { value: "todos", label: "Todos" },
      { value: "galpao", label: "Galpão" },
      { value: "lote-industrial", label: "Lote Industrial" },
      { value: "predio-industrial", label: "Prédio Industrial" },
      { value: "terreno-industrial", label: "Terreno Industrial" },
    ],
    hospedagem: [
      { value: "todos", label: "Todos" },
      { value: "hotel", label: "Hotel" },
      { value: "motel", label: "Motel" },
      { value: "pousada", label: "Pousada" },
    ],
    outros: [
      { value: "todos", label: "Todos" },
      { value: "imovel-misto", label: "Imóvel Misto" },
      { value: "outros", label: "Outros" },
      { value: "vagas-garagem", label: "Vagas de Garagem" },
    ],
  };

  // Data for Vehicles
  const vehicleCategories: CategoryOption[] = [
    { value: "veiculos-leves", label: "Veículos Leves", icon: <Car className="h-4 w-4" /> },
    { value: "veiculos-pesados", label: "Veículos Pesados", icon: <Truck className="h-4 w-4" /> },
    { value: "apoio-reboque", label: "Apoio e Reboque", icon: <Truck className="h-4 w-4" /> },
    { value: "lazer-recreacao", label: "Lazer e Recreação", icon: <Bike className="h-4 w-4" /> },
    { value: "veiculos-aquaticos", label: "Veículos Aquáticos", icon: <Car className="h-4 w-4" /> },
    { value: "veiculos-aereos", label: "Veículos Aéreos", icon: <Car className="h-4 w-4" /> },
    { value: "maquinas-agricolas", label: "Máquinas Agrícolas", icon: <Factory className="h-4 w-4" /> },
    { value: "maquinas-construcao", label: "Máquinas de Construção", icon: <Factory className="h-4 w-4" /> },
    { value: "outros", label: "Outros", icon: <Car className="h-4 w-4" /> },
  ];

  const vehicleTypesByCategory: CategoryTypeMap = {
    "veiculos-leves": [
      { value: "carro", label: "Carro" },
      { value: "moto", label: "Moto" },
    ],
    "veiculos-pesados": [
      { value: "caminhao", label: "Caminhão" },
      { value: "carreta", label: "Carreta" },
      { value: "cavalo-mecanico", label: "Cavalo Mecânico" },
      { value: "micro-onibus", label: "Micro-ônibus" },
      { value: "motorhome", label: "Motorhome" },
      { value: "onibus", label: "Ônibus" },
    ],
    "apoio-reboque": [
      { value: "reboque-semi-reboque", label: "Reboque e semi-reboque" },
      { value: "trailer", label: "Trailer" },
    ],
    "lazer-recreacao": [
      { value: "bicicleta", label: "Bicicleta" },
      { value: "buggy", label: "Buggy" },
      { value: "ciclomotor", label: "Ciclomotor" },
      { value: "kart", label: "Kart" },
      { value: "monocielo", label: "Monociclo" },
      { value: "patinete", label: "Patinete" },
      { value: "quadriciclo", label: "Quadriciclo" },
      { value: "scooter", label: "Scooter" },
      { value: "segway", label: "Segway" },
      { value: "triciclo", label: "Triciclo" },
      { value: "utv", label: "UTV" },
    ],
    "veiculos-aquaticos": [
      { value: "barco", label: "Barco" },
      { value: "lancha", label: "Lancha" },
      { value: "jet-ski", label: "Jet Ski" },
    ],
    "veiculos-aereos": [
      { value: "aviao", label: "Avião" },
      { value: "helicoptero", label: "Helicóptero" },
      { value: "drone", label: "Drone" },
    ],
    "maquinas-agricolas": [
      { value: "colheitadeira", label: "Colheitadeira" },
      { value: "plantadeira", label: "Plantadeira" },
      { value: "trator", label: "Trator" },
      { value: "rocadeira", label: "Roçadeira" },
      { value: "semeadora", label: "Semeadora" },
    ],
    "maquinas-construcao": [
      { value: "retroescavadeira", label: "Retroescavadeira" },
      { value: "motoniveladora", label: "Motoniveladora" },
      { value: "guindaste", label: "Guindaste" },
      { value: "pa-carregadeira", label: "Pá Carregadeira" },
    ],
    "outros": [
      { value: "ambulancia", label: "Ambulância" },
      { value: "sucata", label: "Sucata" },
      { value: "viatura", label: "Viatura" },
    ],
  };

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

  // Get data based on type
  const categories = isProperty ? propertyCategories : vehicleCategories;
  const typesByCategory = isProperty ? propertyTypesByCategory : vehicleTypesByCategory;
  const availableTypes = typesByCategory[selectedCategory] || [];

  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (origemRef.current && !origemRef.current.contains(event.target as Node)) {
        setOrigemState(prev => ({ ...prev, isOpen: false }));
      }
      if (etapaRef.current && !etapaRef.current.contains(event.target as Node)) {
        setEtapaState(prev => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset category and type when type changes
  useEffect(() => {
    setSelectedCategory(isProperty ? 'residenciais' : 'carros');
    // For vehicles, set first available type instead of 'todos'
    if (isProperty) {
      setSelectedType('todos');
    } else {
      const firstCategory = 'veiculos-leves';
      const firstType = vehicleTypesByCategory[firstCategory]?.[0]?.value || 'carro';
      setSelectedCategory(firstCategory);
      setSelectedType(firstType);
    }
  }, [isProperty]);

  const togglePopover = (popoverType: 'origem' | 'etapa') => {
    if (popoverType === 'origem') {
      setOrigemState(prev => ({ ...prev, isOpen: !prev.isOpen }));
      setEtapaState(prev => ({ ...prev, isOpen: false }));
    } else {
      setEtapaState(prev => ({ ...prev, isOpen: !prev.isOpen }));
      setOrigemState(prev => ({ ...prev, isOpen: false }));
    }
  };

  const handleCheckboxChange = (popoverType: 'origem' | 'etapa', value: string) => {
    const setState = popoverType === 'origem' ? setOrigemState : setEtapaState;
    
    setState(prev => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(value)
        ? prev.selectedItems.filter(item => item !== value)
        : [...prev.selectedItems, value]
    }));
  };

  const handleToggleAll = (popoverType: 'origem' | 'etapa') => {
    const options = popoverType === 'origem' ? origemOptions : etapaOptions;
    const state = popoverType === 'origem' ? origemState : etapaState;
    const setState = popoverType === 'origem' ? setOrigemState : setEtapaState;
    
    // If all are selected or some are selected, clear all. If none are selected, select all.
    const shouldSelectAll = state.selectedItems.length === 0;
    
    setState(prev => ({
      ...prev,
      selectedItems: shouldSelectAll ? options.map(option => option.value) : []
    }));
  };

  const handleApply = (popoverType: 'origem' | 'etapa') => {
    const state = popoverType === 'origem' ? origemState : etapaState;
    const setState = popoverType === 'origem' ? setOrigemState : setEtapaState;
    
    // Close the popover
    setState(prev => ({ ...prev, isOpen: false }));
    
    // Apply filters
    onSearch({
      [popoverType]: state.selectedItems
    });
  };

  const handleFormatoChange = (formato: string) => {
    setSelectedFormato(formato);
    onSearch({ formato });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // For vehicles, set first available type instead of 'todos'
    const firstType = isProperty ? 'todos' : (typesByCategory[category]?.[0]?.value || '');
    setSelectedType(firstType);
    onCategoryChange?.(category);
    onTypeChange?.(firstType);
  };

  const handleTypeChange = (typeValue: string) => {
    setSelectedType(typeValue);
    onTypeChange?.(typeValue);
  };

  const checkScrollButtons = () => {
    if (typesContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = typesContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollTypes = (direction: 'left' | 'right') => {
    if (typesContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? typesContainerRef.current.scrollLeft - scrollAmount
        : typesContainerRef.current.scrollLeft + scrollAmount;
      
      typesContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = typesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [availableTypes]);

  useEffect(() => {
    // Check scroll buttons when types change
    setTimeout(checkScrollButtons, 100);
  }, [selectedCategory]);
  const getSelectedText = (popoverType: 'origem' | 'etapa') => {
    const state = popoverType === 'origem' ? origemState : etapaState;
    const options = popoverType === 'origem' ? origemOptions : etapaOptions;
    
    if (state.selectedItems.length === 0) {
      return popoverType === 'origem' ? 'Selecione uma origem' : 'Selecione uma etapa';
    }
    
    if (state.selectedItems.length === 1) {
      const option = options.find(opt => opt.value === state.selectedItems[0]);
      return option?.label || '';
    }
    
    return `${state.selectedItems.length} selecionados`;
  };

  const getToggleButtonText = (popoverType: 'origem' | 'etapa') => {
    const state = popoverType === 'origem' ? origemState : etapaState;
    return state.selectedItems.length === 0 ? 'Marcar Todos' : 'Limpar';
  };

  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      {/* Main Filters Row */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr_1fr] gap-6">
          {/* Page Toggle */}
          <PageToggle />
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar por palavra-chave"
              className="w-full h-[44px] pl-11 pr-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
            />
          </div>

          {/* Formato Segmented Control */}
          <div className="relative">
            <div className="flex h-[44px] rounded-lg border-2 border-gray-300 overflow-hidden">
              <button
                onClick={() => handleFormatoChange('leilao')}
                className={`flex-1 px-4 text-sm font-semibold transition-all duration-200 ${
                  selectedFormato === 'leilao'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Leilão
              </button>
              <button
                onClick={() => handleFormatoChange('venda-direta')}
                className={`flex-1 px-4 text-sm font-semibold border-l-2 border-gray-300 transition-all duration-200 ${
                  selectedFormato === 'venda-direta'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Venda Direta
              </button>
            </div>
          </div>

          {/* Origem Popover */}
          <div className="relative" ref={origemRef}>
            <button
              onClick={() => togglePopover('origem')}
              className="w-full h-[44px] px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white text-left flex items-center justify-between transition-all duration-200 hover:border-gray-400"
            >
              <span className={`text-sm ${origemState.selectedItems.length === 0 ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                {getSelectedText('origem')}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${origemState.isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {origemState.isOpen && (
              <PopoverContent
                type="origem"
                options={origemOptions}
                state={origemState}
                onClose={() => togglePopover('origem')}
                onCheckboxChange={(value) => handleCheckboxChange('origem', value)}
                onToggleAll={() => handleToggleAll('origem')}
                onApply={() => handleApply('origem')}
                getToggleButtonText={() => getToggleButtonText('origem')}
              />
            )}
          </div>

          {/* Etapa Popover */}
          <div className="relative" ref={etapaRef}>
            <button
              onClick={() => togglePopover('etapa')}
              className="w-full h-[44px] px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white text-left flex items-center justify-between transition-all duration-200 hover:border-gray-400"
            >
              <span className={`text-sm ${etapaState.selectedItems.length === 0 ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                {getSelectedText('etapa')}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${etapaState.isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {etapaState.isOpen && (
              <PopoverContent
                type="etapa"
                options={etapaOptions}
                state={etapaState}
                onClose={() => togglePopover('etapa')}
                onCheckboxChange={(value) => handleCheckboxChange('etapa', value)}
                onToggleAll={() => handleToggleAll('etapa')}
                onApply={() => handleApply('etapa')}
                getToggleButtonText={() => getToggleButtonText('etapa')}
              />
            )}
          </div>
        </div>
      </div>

      {/* Category and Type Filters Row */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="h-[44px] pl-4 pr-10 border-2 border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none cursor-pointer font-medium hover:border-gray-400 transition-all duration-200 min-w-[160px]"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Type Toggle Buttons */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-1 min-w-0 relative">
              {/* Left scroll button - Desktop only */}
              {canScrollLeft && (
                <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-20">
                  <button
                    onClick={() => scrollTypes('left')}
                    className="h-10 w-10 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-gray-50 hover:border-gray-400 flex items-center justify-center transition-all duration-200"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
              
              {/* Types container */}
              <div 
                ref={typesContainerRef}
                className={`flex gap-2 overflow-x-auto scroll-smooth transition-all duration-200 ${
                  canScrollLeft ? 'lg:pl-12' : ''
                } ${
                  canScrollRight ? 'lg:pr-12' : ''
                }`}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                onScroll={checkScrollButtons}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {availableTypes.map((typeOption) => (
                  <button
                    key={typeOption.value}
                    onClick={() => handleTypeChange(typeOption.value)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      selectedType === typeOption.value
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    {typeOption.label}
                  </button>
                ))}
              </div>
              
              {/* Right scroll button - Desktop only */}
              {canScrollRight && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
                  <button
                    onClick={() => scrollTypes('right')}
                    className="h-10 w-10 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-gray-50 hover:border-gray-400 flex items-center justify-center transition-all duration-200"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;