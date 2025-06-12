import React from 'react';
import { Heart, MapPin, Calendar, Car, Home } from 'lucide-react';
import { Property, Vehicle, ContentType } from '../../types';

interface ItemCardProps {
  item: Property | Vehicle;
  type: ContentType;
  onToggleFavorite: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, type, onToggleFavorite }) => {
  const isProperty = type === 'property';
  const property = item as Property;
  const vehicle = item as Vehicle;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={item.images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onToggleFavorite(item.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            item.isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart className="w-4 h-4" fill={item.isFavorite ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
            {isProperty ? 'Imóvel' : 'Veículo'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{isProperty ? property.location : `${vehicle.brand} ${vehicle.model}`}</span>
        </div>

        {isProperty ? (
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>{property.area}m²</span>
            {property.bedrooms && <span>{property.bedrooms} quartos</span>}
            {property.bathrooms && <span>{property.bathrooms} banheiros</span>}
          </div>
        ) : (
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>{vehicle.year}</span>
            <span>{vehicle.mileage.toLocaleString()} km</span>
            <span>{vehicle.fuel}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              R$ {item.price.toLocaleString()}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Leilão: {new Date(item.auctionDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;