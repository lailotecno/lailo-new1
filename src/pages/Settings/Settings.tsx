import React from 'react';
import { Link } from 'react-router-dom';
import { Settings as SettingsIcon, User, CreditCard, Bell, FileText } from 'lucide-react';

const Settings = () => {
  const settingsOptions = [
    {
      title: 'Perfil',
      description: 'Gerencie suas informações pessoais',
      icon: User,
      path: '/configuracoes/perfil'
    },
    {
      title: 'Assinatura',
      description: 'Gerencie seu plano e pagamentos',
      icon: CreditCard,
      path: '/configuracoes/assinatura'
    },
    {
      title: 'Alertas',
      description: 'Configure notificações e alertas',
      icon: Bell,
      path: '/configuracoes/alertas'
    },
    {
      title: 'Laudos',
      description: 'Acesse seus laudos e relatórios',
      icon: FileText,
      path: '/configuracoes/laudos'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="w-8 h-8 text-gray-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <p className="text-gray-600">Gerencie suas preferências e configurações</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              key={option.path}
              to={option.path}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;