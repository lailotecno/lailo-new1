import React, { useState } from 'react';
import SearchFilters from '../../components/Common/SearchFilters';
import VehicleSidebar from '../../components/ui/VehicleSidebar';
import ListingHeader from '../../components/ui/ListingHeader';
import Pagination from '../../components/ui/Pagination';
import MobileHeader from '../../components/ui/MobileHeader';
import MobileFiltersModal from '../../components/ui/MobileFiltersModal';
import MobileSortModal from '../../components/ui/MobileSortModal';
import { AuctionCard } from '../../components/Common/AuctionCard';
import { VehicleAuctionItem } from '../../components/Common/AuctionCard/types';

const SearchVehicles = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState('carro');
  const itemsPerPage = 30;
  
  // Mock data - in real app this would come from API
  const [vehicles] = useState<VehicleAuctionItem[]>([
    {
      id: '1',
      type: 'vehicle',
      title: 'Honda Civic 2020 - Automático',
      brand: 'Honda',
      model: 'Civic',
      year: 2020,
      color: 'Prata',
      city: 'São Paulo',
      state: 'SP',
      price: 85000,
      images: ['https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'],
      auctionDate: '2024-02-18T16:00:00Z',
      isFavorite: false,
      dataScraped: '2024-01-10T08:00:00Z',
      appraisedValue: 95000,
      initialBidValue: 85000,
      tags: ['Judicial', '1ª Praça']
    },
    {
      id: '2',
      type: 'vehicle',
      title: 'Porsche Boxster 718',
      brand: 'Porsche',
      model: 'Boxster 718',
      year: 2023,
      color: 'Branco',
      city: 'São Paulo',
      state: 'SP',
      price: 350000,
      images: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
      auctionDate: '2024-02-22T14:30:00Z',
      isFavorite: true,
      dataScraped: new Date().toISOString(), // New item
      appraisedValue: 420000,
      initialBidValue: 350000,
      tags: ['Judicial', '2ª Praça']
    },
    // Add more mock items to demonstrate pagination
    ...Array.from({ length: 68 }, (_, i) => ({
      id: `${i + 3}`,
      type: 'vehicle' as const,
      title: `Veículo ${i + 3} - Exemplo`,
      brand: i % 3 === 0 ? 'Honda' : i % 3 === 1 ? 'Toyota' : 'Volkswagen',
      model: i % 3 === 0 ? 'Civic' : i % 3 === 1 ? 'Corolla' : 'Golf',
      year: 2015 + (i % 8),
      color: i % 4 === 0 ? 'Branco' : i % 4 === 1 ? 'Prata' : i % 4 === 2 ? 'Preto' : 'Azul',
      city: 'São Paulo',
      state: 'SP',
      price: 50000 + (i * 2000),
      images: ['https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'],
      auctionDate: '2024-02-25T16:00:00Z',
      isFavorite: false,
      dataScraped: '2024-01-10T08:00:00Z',
      appraisedValue: 60000 + (i * 2000),
      initialBidValue: 50000 + (i * 2000),
      tags: ['Judicial', '1ª Praça']
    }))
  ]);

  // Calculate pagination
  const totalItems = vehicles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVehicles = vehicles.slice(startIndex, endIndex);

  const handleSearch = (filters: any) => {
    console.log('Filtros aplicados:', filters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCategoryChange = (category: string) => {
    console.log('Categoria selecionada:', category);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string) => {
    console.log('Tipo selecionado:', type);
    setSelectedVehicleType(type);
    setCurrentPage(1);
  };

  const handleToggleFavorite = (id: string) => {
    console.log('Toggle favorite:', id);
  };

  const handleViewDetails = (id: string) => {
    console.log('View details:', id);
  };

  const handleFiltersChange = (filters: any) => {
    console.log('Filtros aplicados:', filters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    document.querySelector('.flex-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMobileFiltersApply = (filters: any) => {
    console.log('Mobile filters applied:', filters);
    setCurrentPage(1);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader
        onFilterClick={() => setIsFiltersModalOpen(true)}
        onSortClick={() => setIsSortModalOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Desktop Filters */}
      <div className="hidden lg:block px-4 md:px-6 pt-2">
        <SearchFilters 
          type="vehicle" 
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onTypeChange={handleTypeChange}
        />
      </div>

      <div className="px-4 lg:px-6 pb-6">
        <div className="flex gap-6 mt-6 lg:mt-0">
          {/* Vehicle Sidebar - Desktop only */}
          <div className="hidden lg:block w-2/5">
            <VehicleSidebar 
              onFiltersChange={handleFiltersChange}
              selectedVehicleType={selectedVehicleType}
            />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/5">
            {/* Status Text - Mobile */}
            <div className="lg:hidden mb-4 text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-200">
              Encontramos{' '}
              <span className="font-bold text-gray-900 text-base">
                {totalItems.toLocaleString()}
              </span>{' '}
              leilões em{' '}
              <span className="font-bold text-gray-900">62</span>{' '}
              sites ·{' '}
              <span className="font-bold text-blue-600">7</span>{' '}
              novos hoje
            </div>

            {/* Desktop Listing Header */}
            <div className="hidden lg:block">
              <ListingHeader
                totalResults={totalItems}
                totalSites={62}
                newToday={7}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
            
            <div className={viewMode === 'vertical' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6' : 'space-y-4'}>
              {currentVehicles.map((vehicle) => (
                <AuctionCard
                  key={vehicle.id}
                  item={vehicle}
                  variant={viewMode}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>

      {/* Mobile Modals */}
      <MobileFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        type="vehicle"
        onApplyFilters={handleMobileFiltersApply}
        selectedVehicleType={selectedVehicleType}
      />

      <MobileSortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
};

export default SearchVehicles;