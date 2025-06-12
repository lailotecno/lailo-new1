import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Building, Car, Star } from 'lucide-react';

const FavoritesMain = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="w-8 h-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Favoritos</h1>
            <p className="text-gray-600">Seus itens salvos para acompanhar</p>
          </div>
        </div>
      </div>

      {/* Favorites Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/favoritos/imoveis"
          className="group bg-white border-2 border-gray-200 hover:border-blue-300 p-8 rounded-lg transition-all transform hover:scale-105"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Imóveis Favoritos</h3>
              <p className="text-gray-600">3 imóveis salvos</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Acompanhe seus imóveis favoritos e receba alertas sobre mudanças de preço e datas de leilão.
          </p>
        </Link>

        <Link
          to="/favoritos/veiculos"
          className="group bg-white border-2 border-gray-200 hover:border-green-300 p-8 rounded-lg transition-all transform hover:scale-105"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Car className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Veículos Favoritos</h3>
              <p className="text-gray-600">2 veículos salvos</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Monitore seus veículos de interesse e seja notificado sobre atualizações importantes.
          </p>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Star className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Configurar Alertas</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-900">Exportar Lista</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Building className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Comparar Itens</span>
          </button>
        </div>
      </div>

      {/* Recent Favorites */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Adicionados Recentemente</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Casa 3 quartos - Barra da Tijuca</p>
                <p className="text-sm text-gray-600">Adicionado há 2 horas</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">R$ 650.000</p>
              <p className="text-sm text-blue-600">Leilão em 3 dias</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Car className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Toyota Corolla 2019</p>
                <p className="text-sm text-gray-600">Adicionado ontem</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">R$ 72.000</p>
              <p className="text-sm text-green-600">Leilão em 5 dias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesMain;