import React, { useState } from 'react';
import { Users, Star, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Auctioneer } from '../../types';

const Auctioneers = () => {
  const [auctioneers] = useState<Auctioneer[]>([
    {
      id: '1',
      name: 'João Silva',
      company: 'Silva Leilões',
      location: 'São Paulo, SP',
      rating: 4.8,
      totalAuctions: 156,
      specialties: ['Imóveis', 'Veículos'],
      contact: {
        phone: '(11) 99999-9999',
        email: 'joao@silvaleiloes.com.br',
        website: 'www.silvaleiloes.com.br'
      }
    },
    {
      id: '2',
      name: 'Maria Santos',
      company: 'Santos Leilões & Avaliações',
      location: 'Rio de Janeiro, RJ',
      rating: 4.9,
      totalAuctions: 203,
      specialties: ['Imóveis', 'Arte', 'Antiguidades'],
      contact: {
        phone: '(21) 88888-8888',
        email: 'maria@santosleiloes.com.br'
      }
    }
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leiloeiros</h1>
            <p className="text-gray-600">Encontre leiloeiros qualificados e confiáveis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctioneers.map((auctioneer) => (
          <div key={auctioneer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{auctioneer.name}</h3>
                <p className="text-gray-600">{auctioneer.company}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">{auctioneer.rating}</span>
              </div>
            </div>

            <div className="flex items-center text-gray-600 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{auctioneer.location}</span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{auctioneer.totalAuctions}</strong> leilões realizados
              </p>
              <div className="flex flex-wrap gap-2">
                {auctioneer.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{auctioneer.contact.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>{auctioneer.contact.email}</span>
              </div>
              {auctioneer.contact.website && (
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{auctioneer.contact.website}</span>
                </div>
              )}
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Ver Perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auctioneers;