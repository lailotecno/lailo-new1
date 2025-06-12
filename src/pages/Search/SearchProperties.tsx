import React, { useState } from 'react';
import SearchFilters from '../../components/Common/SearchFilters';
import PropertySidebar from '../../components/ui/PropertySidebar';
import ListingHeader from '../../components/ui/ListingHeader';
import Pagination from '../../components/ui/Pagination';
import MobileHeader from '../../components/ui/MobileHeader';
import MobileFiltersModal from '../../components/ui/MobileFiltersModal';
import MobileSortModal from '../../components/ui/MobileSortModal';
import { AuctionCard } from '../../components/Common/AuctionCard';
import { PropertyAuctionItem } from '../../components/Common/AuctionCard/types';

const SearchProperties = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const itemsPerPage = 30;
  
  // Mock data - in real app this would come from API
  const [properties] = useState<PropertyAuctionItem[]>([
    {
      id: '1',
      type: 'property',
      title: 'Casa em Condomínio Fechado - 3 Quartos',
      propertyType: 'Casa',
      area: 120,
      address: 'Rua das Flores, 123',
      city: 'Rio de Janeiro',
      state: 'RJ',
      price: 450000,
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      auctionDate: '2024-02-15T14:00:00Z',
      isFavorite: false,
      dataScraped: '2024-01-15T10:00:00Z',
      appraisedValue: 520000,
      initialBidValue: 450000,
      tags: ['Judicial', '1ª Praça']
    },
    {
      id: '2',
      type: 'property',
      title: 'Apartamento Moderno - 2 Quartos',
      propertyType: 'Apartamento',
      area: 85,
      address: 'Av. Copacabana, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      price: 320000,
      images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
      auctionDate: '2024-02-20T15:30:00Z',
      isFavorite: true,
      dataScraped: new Date().toISOString(), // New item
      appraisedValue: 380000,
      initialBidValue: 320000,
      tags: ['Judicial', '2ª Praça']
    },
    // Add more mock items to demonstrate pagination
    ...Array.from({ length: 88 }, (_, i) => ({
      id: `${i + 3}`,
      type: 'property' as const,
      title: `Imóvel ${i + 3} - Exemplo`,
      propertyType: i % 2 === 0 ? 'Casa' : 'Apartamento',
      area: 80 + (i * 5),
      address: `Rua Exemplo, ${100 + i}`,
      city: 'Rio de Janeiro',
      state: 'RJ',
      price: 300000 + (i * 10000),
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      auctionDate: '2024-02-25T14:00:00Z',
      isFavorite: false,
      dataScraped: '2024-01-15T10:00:00Z',
      appraisedValue: 350000 + (i * 10000),
      initialBidValue: 300000 + (i * 10000),
      tags: ['Judicial', '1ª Praça']
    }))
  ]);

  // Calculate pagination
  const totalItems = properties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

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
          type="property" 
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onTypeChange={handleTypeChange}
        />
      </div>

      <div className="px-4 lg:px-6 pb-6">
        <div className="flex gap-6 mt-6 lg:mt-0">
          {/* Property Sidebar - Desktop only */}
          <div className="hidden lg:block w-2/5">
            <PropertySidebar onFiltersChange={handleFiltersChange} />
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
              <span className="font-bold text-gray-900">87</span>{' '}
              sites ·{' '}
              <span className="font-bold text-blue-600">4</span>{' '}
              novos hoje
            </div>

            {/* Desktop Listing Header */}
            <div className="hidden lg:block">
              <ListingHeader
                totalResults={totalItems}
                totalSites={87}
                newToday={4}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
            
            <div className={viewMode === 'vertical' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6' : 'space-y-4'}>
              {currentProperties.map((property) => (
                <AuctionCard
                  key={property.id}
                  item={property}
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
        type="property"
        onApplyFilters={handleMobileFiltersApply}
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

export default SearchProperties;