
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, BookOpen, Award, BarChart3, Calendar, Clock } from 'lucide-react';

interface AdminDashboardProps {
  onCreateTraining: () => void;
  onViewReports: () => void;
}

const AdminDashboard = ({ onCreateTraining, onViewReports }: AdminDashboardProps) => {
  const [trainings] = useState([
    {
      id: 1,
      title: 'Segurança no Trabalho',
      department: 'Geral',
      status: 'Em Andamento',
      participants: 25,
      completion: 80,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Atendimento ao Cliente',
      department: 'Vendas',
      status: 'Concluído',
      participants: 12,
      completion: 100,
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      title: 'Compliance Corporativo',
      department: 'Administrativo',
      status: 'Planejado',
      participants: 8,
      completion: 0,
      createdAt: '2024-01-20'
    }
  ]);

  const stats = [
    {
      title: 'Total de Funcionários',
      value: '45',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Treinamentos Ativos',
      value: '3',
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      title: 'Certificados Emitidos',
      value: '127',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      title: 'Taxa de Conclusão',
      value: '92%',
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Planejado':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600 mt-1">Gerencie treinamentos e acompanhe o progresso da equipe</p>
        </div>
        <Button 
          onClick={onCreateTraining}
          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Criar Novo Treinamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Training List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Treinamentos Recentes</CardTitle>
              <CardDescription>Acompanhe o status dos treinamentos criados</CardDescription>
            </div>
            <Button variant="outline" onClick={onViewReports}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver Relatórios
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainings.map((training) => (
              <div key={training.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{training.title}</h3>
                  <Badge className={getStatusColor(training.status)}>
                    {training.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {training.participants} participantes
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {training.department}
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    {training.completion}% concluído
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(training.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                {training.status === 'Em Andamento' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progresso</span>
                      <span>{training.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-blue-800 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${training.completion}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
