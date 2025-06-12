import React from 'react';
import { CreditCard, Check, Star } from 'lucide-react';

const Subscription = () => {
  const plans = [
    {
      name: 'Gratuito',
      price: 0,
      current: true,
      features: [
        'Busca básica de leilões',
        'Até 5 favoritos',
        'Alertas básicos',
        'Suporte por email'
      ]
    },
    {
      name: 'Premium',
      price: 29.90,
      current: false,
      popular: true,
      features: [
        'Busca avançada com filtros',
        'Favoritos ilimitados',
        'Alertas personalizados',
        'Histórico de preços',
        'Relatórios detalhados',
        'Suporte prioritário'
      ]
    },
    {
      name: 'Pro',
      price: 59.90,
      current: false,
      features: [
        'Todos os recursos Premium',
        'API de acesso aos dados',
        'Análises preditivas',
        'Consultoria especializada',
        'Suporte 24/7',
        'Acesso antecipado a novos recursos'
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <CreditCard className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assinatura</h1>
            <p className="text-gray-600">Gerencie seu plano e pagamentos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-lg shadow-sm border-2 p-6 relative ${
              plan.current
                ? 'border-blue-500'
                : plan.popular
                ? 'border-green-500'
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Mais Popular</span>
                </span>
              </div>
            )}

            {plan.current && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Plano Atual
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-gray-900">
                R$ {plan.price.toFixed(2)}
                <span className="text-sm font-normal text-gray-600">/mês</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                plan.current
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={plan.current}
            >
              {plan.current ? 'Plano Atual' : 'Assinar'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Pagamentos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Data</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Plano</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Valor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">01/01/2024</td>
                <td className="py-3 px-4 text-gray-900">Gratuito</td>
                <td className="py-3 px-4 text-gray-900">R$ 0,00</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                    Ativo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscription;