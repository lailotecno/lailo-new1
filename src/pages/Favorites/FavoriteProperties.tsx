import React, { useState } from 'react';
import ItemCard from '../../components/Common/ItemCard';
import { Property } from '../../types';
import { Heart } from 'lucide-react';

const FavoriteProperties = () => {
  const [favoriteProperties] = useState<Property[]>([
    {
      id: '2',
      title: 'Apartamento Moderno - 2 Quartos',
      location: 'Copacabana, Rio de Janeiro',
      price: 320000,
      area: 85,
      bedrooms: 2,
      bathrooms: 1,
      type: 'Apartamento',
      images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
      auctionDate: '2024-02-20',
      description: 'Apartamento moderno próximo à praia',
      isFavorite: true
    }
  ]);

  const handleToggleFavorite = (id: string) => {
    console.log('Toggle favorite:', id);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <Heart className="w-8 h-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Imóveis Favoritos</h1>
            <p className="text-gray-600">Seus imóveis salvos para acompanhar</p>
          </div>
        </div>
      </div>

      {favoriteProperties.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum imóvel favorito</h3>
          <p className="text-gray-600">Adicione imóveis aos favoritos para vê-los aqui</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <ItemCard
              key={property.id}
              item={property}
              type="property"
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProperties;