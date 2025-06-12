import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { AuctionCardProps, PropertyAuctionItem, VehicleAuctionItem } from './types';
import DiscountBadge from './DiscountBadge';
import NewBadge from './NewBadge';

const AuctionCardHorizontal: React.FC<AuctionCardProps> = ({
  item,
  onToggleFavorite,
  onViewDetails
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    }) + ' • ' + date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const renderPropertyContent = (property: PropertyAuctionItem) => (
    <>
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-x-1 text-2 font-bold truncate">
          <span className="truncate">{property.propertyType}</span>
          <span className="text-gray-500">•</span>
          <span className="whitespace-nowrap text-1 text-gray-600 font-semibold">{property.area}m²</span>
        </div>
        <button 
          onClick={() => onToggleFavorite(property.id)}
          className="h-8 w-8 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label={property.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart 
            className="w-5 h-5" 
            fill={property.isFavorite ? "currentColor" : "none"}
            color={property.isFavorite ? "#ef4444" : "#9ca3af"}
          />
        </button>
      </div>

      <div className="text-1 text-gray-600 line-clamp-1 font-medium">
        {property.address} – {property.city}/{property.state}
      </div>

      <div className="flex items-center gap-x-[8px] mt-3">
        <div className="text-3 font-bold text-gray-900">
          {formatPrice(property.price)}
        </div>
        <DiscountBadge 
          appraisedValue={property.appraisedValue}
          initialBidValue={property.initialBidValue}
        />
      </div>
    </>
  );

  const renderVehicleContent = (vehicle: VehicleAuctionItem) => (
    <>
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-x-1 text-2 font-bold truncate">
          <span className="truncate">{vehicle.brand}</span>
          <span className="whitespace-nowrap text-1 text-gray-600 font-semibold">{vehicle.model}</span>
        </div>
        <button 
          onClick={() => onToggleFavorite(vehicle.id)}
          className="h-8 w-8 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label={vehicle.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart 
            className="w-5 h-5" 
            fill={vehicle.isFavorite ? "currentColor" : "none"}
            color={vehicle.isFavorite ? "#ef4444" : "#9ca3af"}
          />
        </button>
      </div>

      <div className="text-1 text-gray-600 line-clamp-1 font-medium">
        {vehicle.color} • {vehicle.year} • {vehicle.city}/{vehicle.state}
      </div>

      <div className="flex items-center gap-x-[8px] mt-3">
        <div className="text-3 font-bold text-gray-900">
          {formatPrice(vehicle.price)}
        </div>
        <DiscountBadge 
          appraisedValue={vehicle.appraisedValue}
          initialBidValue={vehicle.initialBidValue}
        />
      </div>
    </>
  );

  return (
    <div className="rounded-lg shadow-sm hover:shadow-md transition-all duration-200 bg-white p-5 border border-gray-200 hover:border-gray-300">
      {/* Parte superior: Imagem + conteúdo */}
      <div className="flex items-stretch gap-x-4">
        {/* Imagem fixa à esquerda */}
        <div className="w-[120px] shrink-0 relative">
          <img
            src={item.images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
            alt="Imagem do item"
            className="w-full h-full object-cover rounded-lg aspect-video"
          />
          <NewBadge dataScraped={item.dataScraped} />
        </div>

        {/* Bloco de conteúdo à direita */}
        <div className="flex flex-col justify-between flex-1">
          {item.type === 'property' 
            ? renderPropertyContent(item as PropertyAuctionItem)
            : renderVehicleContent(item as VehicleAuctionItem)
          }
        </div>
      </div>

      {/* Divider atravessando o card */}
      <div className="h-px w-full bg-gray-200 my-4" />

      {/* Parte inferior: Tags + Data e botão */}
      <div className="flex justify-between items-center gap-x-3">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-x-3">
          <span className="text-1 text-gray-600 font-medium">{formatDate(item.auctionDate)}</span>
          <button 
            onClick={() => onViewDetails(item.id)}
            className="h-8 w-8 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Ver detalhes do leilão"
          >
            <ExternalLink className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCardHorizontal;