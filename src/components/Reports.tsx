
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, TrendingUp, Users, Award, Clock } from 'lucide-react';

interface ReportsProps {
  onBack: () => void;
}

const Reports = ({ onBack }: ReportsProps) => {
  const reportData = {
    totalEmployees: 45,
    activeTrainings: 3,
    completedTrainings: 12,
    certificatesIssued: 127,
    averageCompletionTime: '2.5 dias',
    completionRate: 92
  };

  const departmentData = [
    { department: 'Vendas', employees: 12, completed: 11, rate: 92 },
    { department: 'Produção', employees: 18, completed: 16, rate: 89 },
    { department: 'Administrativo', employees: 8, completed: 8, rate: 100 },
    { department: 'RH', employees: 7, completed: 7, rate: 100 }
  ];

  const topPerformers = [
    { name: 'Ana Lima', department: 'RH', trainingsCompleted: 8, certificates: 8 },
    { name: 'João Silva', department: 'Vendas', trainingsCompleted: 7, certificates: 7 },
    { name: 'Maria Santos', department: 'Administrativo', trainingsCompleted: 6, certificates: 6 }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h1>
              <p className="text-gray-600">Acompanhe o desempenho dos treinamentos</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-800">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Funcionários</p>
                  <p className="text-3xl font-bold text-gray-900">{reportData.totalEmployees}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Treinamentos Concluídos</p>
                  <p className="text-3xl font-bold text-gray-900">{reportData.completedTrainings}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Certificados Emitidos</p>
                  <p className="text-3xl font-bold text-gray-900">{reportData.certificatesIssued}</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conclusão</p>
                  <p className="text-3xl font-bold text-gray-900">{reportData.completionRate}%</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Departamento</CardTitle>
              <CardDescription>Taxa de conclusão de treinamentos por área</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{dept.department}</p>
                      <p className="text-sm text-gray-600">{dept.completed}/{dept.employees} funcionários</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            dept.rate === 100 ? 'bg-green-500' : dept.rate >= 90 ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${dept.rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{dept.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Melhores Desempenhos</CardTitle>
              <CardDescription>Funcionários com mais treinamentos concluídos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-gray-600">{performer.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{performer.trainingsCompleted}</p>
                      <p className="text-xs text-gray-600">treinamentos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completion Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo Executivo</CardTitle>
            <CardDescription>Principais métricas e insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Desempenho Geral</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de Conclusão Média:</span>
                    <span className="font-medium">{reportData.completionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tempo Médio de Conclusão:</span>
                    <span className="font-medium">{reportData.averageCompletionTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificados por Funcionário:</span>
                    <span className="font-medium">{Math.round(reportData.certificatesIssued / reportData.totalEmployees)}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Recomendações</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Foco em treinamentos para área de Produção</li>
                  <li>• Implementar programa de reconhecimento</li>
                  <li>• Criar lembretes automáticos para pendências</li>
                  <li>• Desenvolver treinamentos mais interativos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
