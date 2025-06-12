import React, { useState } from 'react';
import ItemCard from '../../components/Common/ItemCard';
import { Vehicle } from '../../types';
import { Heart } from 'lucide-react';

const FavoriteVehicles = () => {
  const [favoriteVehicles] = useState<Vehicle[]>([
    {
      id: '2',
      title: 'Toyota Corolla 2019 - Manual',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2019,
      price: 72000,
      mileage: 62000,
      fuel: 'Flex',
      images: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
      auctionDate: '2024-02-22',
      description: 'Toyota Corolla bem conservado',
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
            <h1 className="text-3xl font-bold text-gray-900">Veículos Favoritos</h1>
            <p className="text-gray-600">Seus veículos salvos para acompanhar</p>
          </div>
        </div>
      </div>

      {favoriteVehicles.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum veículo favorito</h3>
          <p className="text-gray-600">Adicione veículos aos favoritos para vê-los aqui</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteVehicles.map((vehicle) => (
            <ItemCard
              key={vehicle.id}
              item={vehicle}
              type="vehicle"
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteVehicles;