import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Car, Search, TrendingUp } from 'lucide-react';

const SearchMain = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Buscar Leilões</h1>
            <p className="text-gray-600">Encontre as melhores oportunidades em leilões</p>
          </div>
        </div>
      </div>

      {/* Main Search Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/buscador/imoveis"
          className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Building className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-bold">Imóveis</h3>
              <p className="text-blue-100">Casas, apartamentos e terrenos</p>
            </div>
          </div>
          <p className="text-blue-100 text-sm">
            Encontre imóveis residenciais e comerciais em leilão com ótimas oportunidades de investimento.
          </p>
        </Link>

        <Link
          to="/buscador/veiculos"
          className="group bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Car className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-bold">Veículos</h3>
              <p className="text-green-100">Carros, motos e utilitários</p>
            </div>
          </div>
          <p className="text-green-100 text-sm">
            Descubra veículos de todas as categorias com preços abaixo do mercado em leilões judiciais.
          </p>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-gray-600">Imóveis disponíveis</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">567</p>
              <p className="text-sm text-gray-600">Veículos disponíveis</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-600">Leilões esta semana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Leilões em Destaque</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Apartamento 3 quartos - Copacabana</p>
                <p className="text-sm text-gray-600">Leilão: 25/02 às 14h</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">R$ 450.000</p>
              <p className="text-sm text-green-600">-15% do valor de avaliação</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Car className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Honda Civic 2020 - Automático</p>
                <p className="text-sm text-gray-600">Leilão: 26/02 às 16h</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">R$ 85.000</p>
              <p className="text-sm text-green-600">-12% do valor de avaliação</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMain;