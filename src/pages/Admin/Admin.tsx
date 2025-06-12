import React from 'react';
import { Shield, Users, Building, Car, BarChart3, Settings } from 'lucide-react';

const Admin = () => {
  const stats = [
    { title: 'Total de Usuários', value: '1,234', icon: Users, color: 'blue' },
    { title: 'Imóveis Ativos', value: '456', icon: Building, color: 'green' },
    { title: 'Veículos Ativos', value: '789', icon: Car, color: 'purple' },
    { title: 'Leilões Este Mês', value: '23', icon: BarChart3, color: 'orange' }
  ];

  const adminActions = [
    { title: 'Gerenciar Usuários', description: 'Visualizar e gerenciar contas de usuários', icon: Users },
    { title: 'Gerenciar Leilões', description: 'Criar e editar leilões de imóveis e veículos', icon: Building },
    { title: 'Relatórios', description: 'Visualizar relatórios e análises do sistema', icon: BarChart3 },
    { title: 'Configurações do Sistema', description: 'Configurar parâmetros globais', icon: Settings }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie o sistema de leilões</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600'
          };

          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-900">Acesso Restrito</h4>
            <p className="text-sm text-red-700 mt-1">
              Esta área é restrita a administradores do sistema. Todas as ações são registradas e monitoradas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;