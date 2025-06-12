import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

const Reports = () => {
  const reports = [
    {
      id: '1',
      title: 'Relatório de Imóveis - Janeiro 2024',
      type: 'Imóveis',
      date: '2024-01-31',
      status: 'Concluído',
      size: '2.3 MB'
    },
    {
      id: '2',
      title: 'Análise de Veículos - Janeiro 2024',
      type: 'Veículos',
      date: '2024-01-31',
      status: 'Concluído',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Laudo Técnico - Casa Barra da Tijuca',
      type: 'Laudo',
      date: '2024-01-28',
      status: 'Em Processamento',
      size: '-'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Laudos e Relatórios</h1>
            <p className="text-gray-600">Acesse seus laudos técnicos e relatórios</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Seus Documentos</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Solicitar Novo Laudo
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-6 font-medium text-gray-700">Documento</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tipo</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Data</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tamanho</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{report.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      report.type === 'Imóveis' ? 'bg-blue-100 text-blue-800' :
                      report.type === 'Veículos' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      report.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{report.size}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {report.status === 'Concluído' && (
                        <>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Sobre os Laudos Técnicos</h4>
            <p className="text-sm text-blue-700 mt-1">
              Os laudos técnicos são elaborados por profissionais qualificados e fornecem 
              informações detalhadas sobre o estado e valor dos bens em leilão.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;