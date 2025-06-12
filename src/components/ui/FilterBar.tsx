"use client";

import * as React from "react";
import { useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Building, Home, Factory, TreePine, Hotel, Car, Truck, Bike, Bus } from "lucide-react";
import { cn } from "@/lib/utils";

// Global styles for scrollbar hiding
const globalStyles = `
  .scrollbar-none {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
`;

// Inject global styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

// Types
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

// Select Components
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    showText?: boolean;
  }
>(({ className, children, showText = true, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-[44px] items-center justify-between whitespace-nowrap rounded-lg border-2 border-gray-300 bg-background text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all duration-200 hover:border-gray-400",
      !showText && "w-11 px-2 justify-center gap-1",
      showText ? "px-4 gap-2" : "px-2",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-3 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-50 transition-colors duration-200",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Toggle Group Components
const ToggleGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type: "single";
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, children, type, value, onValueChange, ...props }, ref) => {
  const handleClick = (itemValue: string) => {
    if (onValueChange) {
      onValueChange(itemValue);
    }
  };

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            onClick: () => handleClick(child.props.value),
            "data-state": value === child.props.value ? "on" : "off",
          });
        }
        return child;
      })}
    </div>
  );
});
ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
    "data-state"?: "on" | "off";
  }
>(({ className, children, value, "data-state": dataState, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold ring-offset-background transition-all duration-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:shadow-md",
      className
    )}
    data-state={dataState}
    {...props}
  >
    {children}
  </button>
));
ToggleGroupItem.displayName = "ToggleGroupItem";

// Main Component
interface FilterBarProps {
  type: 'property' | 'vehicle';
  onCategoryChange?: (category: string) => void;
  onTypeChange?: (type: string) => void;
  defaultCategory?: string;
  defaultType?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  type,
  onCategoryChange,
  onTypeChange,
  defaultCategory,
  defaultType = "todos",
}) => {
  // Set default categories based on type
  const getDefaultCategory = () => {
    if (defaultCategory) return defaultCategory;
    return type === 'property' ? 'residenciais' : 'veiculos-leves';
  };

  const [selectedCategory, setSelectedCategory] = useState(getDefaultCategory());
  const [selectedType, setSelectedType] = useState(
    type === 'property' ? defaultType : 'carro'
  );
  const [isMobile, setIsMobile] = useState(false);

  // Get data based on type
  const categories = type === 'property' ? propertyCategories : vehicleCategories;
  const typesByCategory = type === 'property' ? propertyTypesByCategory : vehicleTypesByCategory;

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // For vehicles, set first available type instead of 'todos'
    const firstType = type === 'property' ? 'todos' : (typesByCategory[category]?.[0]?.value || '');
    setSelectedType(firstType);
    onCategoryChange?.(category);
    onTypeChange?.(firstType);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onTypeChange?.(type);
  };

  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory);
  const availableTypes = typesByCategory[selectedCategory] || [];

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-6 px-6 py-4 overflow-x-auto">
        {/* Category Filter */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className={cn("w-auto", isMobile ? "min-w-[48px] px-2" : "min-w-[160px]")} showText={!isMobile}>
              <SelectValue>
                <div className="flex items-center gap-2">
                  {selectedCategoryData?.icon}
                  {!isMobile && <span className="font-medium">{selectedCategoryData?.label}</span>}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span className="font-medium">{category.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-1 min-w-0">
            <div 
              className="overflow-x-auto scrollbar-none scroll-smooth px-4 -mx-4 relative"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollPaddingInline: '1rem',
              }}
            >
              {/* Gradient indicator for more content */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
              
              <ToggleGroup
                type="single"
                value={selectedType}
                onValueChange={handleTypeChange}
                className="flex gap-2 w-max"
              >
                {availableTypes.map((type) => (
                  <ToggleGroupItem
                    key={type.value}
                    value={type.value}
                    className="text-sm whitespace-nowrap flex-shrink-0 border border-gray-200"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    {type.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;