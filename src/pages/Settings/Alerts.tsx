import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState({
    newAuctions: true,
    priceChanges: false,
    favoriteUpdates: true,
    auctionReminders: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const handleToggle = (key: string) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Salvando configurações de alertas:', alerts);
  };

  const alertOptions = [
    {
      key: 'newAuctions',
      title: 'Novos Leilões',
      description: 'Receba notificações sobre novos leilões disponíveis'
    },
    {
      key: 'priceChanges',
      title: 'Mudanças de Preço',
      description: 'Seja notificado quando houver alterações nos preços'
    },
    {
      key: 'favoriteUpdates',
      title: 'Atualizações dos Favoritos',
      description: 'Receba alertas sobre itens em sua lista de favoritos'
    },
    {
      key: 'auctionReminders',
      title: 'Lembretes de Leilão',
      description: 'Lembretes antes do início dos leilões'
    }
  ];

  const notificationTypes = [
    {
      key: 'emailNotifications',
      title: 'Notificações por Email',
      description: 'Receba alertas em seu email'
    },
    {
      key: 'smsNotifications',
      title: 'Notificações por SMS',
      description: 'Receba alertas via mensagem de texto'
    },
    {
      key: 'pushNotifications',
      title: 'Notificações Push',
      description: 'Receba notificações no navegador'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <Bell className="w-8 h-8 text-yellow-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alertas</h1>
            <p className="text-gray-600">Configure suas notificações e alertas</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Alerta</h3>
          <div className="space-y-4">
            {alertOptions.map((option) => (
              <div key={option.key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{option.title}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(option.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alerts[option.key] ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alerts[option.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Notificação</h3>
          <div className="space-y-4">
            {notificationTypes.map((type) => (
              <div key={type.key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{type.title}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(type.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    alerts[type.key] ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      alerts[type.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;