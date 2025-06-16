
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Users, BookOpen, Award, BarChart3, Calendar, Clock, Brain, FileText, ClipboardCheck } from 'lucide-react';

interface User {
  name: string;
  role: 'admin' | 'employee';
  accountType?: string;
  employeeLimit?: number;
}

interface AdminDashboardProps {
  user?: User;
  onCreateTraining: () => void;
  onViewReports: () => void;
}

const AdminDashboard = ({ user, onCreateTraining, onViewReports }: AdminDashboardProps) => {
  const [trainings] = useState([
    {
      id: 1,
      title: 'Segurança no Trabalho',
      department: 'Geral',
      status: 'Em Andamento',
      participants: 25,
      completion: 80,
      createdAt: '2024-01-15',
      hasDocument: true,
      hasExam: true,
      aiGenerated: false
    },
    {
      id: 2,
      title: 'Vendas Consultivas com IA',
      department: 'Vendas',
      status: 'Gerando Conteúdo',
      participants: 12,
      completion: 0,
      createdAt: '2024-01-20',
      hasDocument: true,
      hasExam: true,
      aiGenerated: true
    },
    {
      id: 3,
      title: 'Compliance Corporativo',
      department: 'Administrativo',
      status: 'Concluído',
      participants: 8,
      completion: 100,
      createdAt: '2024-01-10',
      hasDocument: true,
      hasExam: false,
      aiGenerated: false
    }
  ]);

  const currentEmployees = 32; // Example current number of employees
  const employeeLimit = user?.employeeLimit || 100;
  const employeeUsage = (currentEmployees / employeeLimit) * 100;

  const stats = [
    {
      title: 'Funcionários Ativos',
      value: `${currentEmployees}/${employeeLimit}`,
      icon: Users,
      color: 'text-blue-600',
      progress: employeeUsage
    },
    {
      title: 'Treinamentos Ativos',
      value: trainings.filter(t => t.status === 'Em Andamento').length.toString(),
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      title: 'Gerados por IA',
      value: trainings.filter(t => t.aiGenerated).length.toString(),
      icon: Brain,
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
      case 'Gerando Conteúdo':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountTypeName = () => {
    switch (user?.accountType) {
      case 'starter': return 'Starter';
      case 'business': return 'Business';
      case 'enterprise': return 'Enterprise';
      default: return 'Business';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600 mt-1">
            Gerencie treinamentos com IA e acompanhe o progresso da equipe
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            Plano {getAccountTypeName()}
          </Badge>
          <Button 
            onClick={onCreateTraining}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
          >
            <Plus className="h-4 w-4 mr-2" />
            Criar Treinamento com IA
          </Button>
        </div>
      </div>

      {/* Account Usage */}
      {user?.employeeLimit && (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Uso da Conta</h3>
                <p className="text-sm text-gray-600">
                  {currentEmployees} de {user.employeeLimit} funcionários cadastrados
                </p>
              </div>
              <Badge variant={employeeUsage > 80 ? "destructive" : "secondary"}>
                {Math.round(employeeUsage)}% usado
              </Badge>
            </div>
            <Progress value={employeeUsage} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  {stat.progress !== undefined && (
                    <Progress value={stat.progress} className="h-1 mt-2" />
                  )}
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
              <CardDescription>Acompanhe o status dos treinamentos criados com IA</CardDescription>
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
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg text-gray-900">{training.title}</h3>
                    {training.aiGenerated && (
                      <Badge variant="secondary" className="text-xs">
                        <Brain className="h-3 w-3 mr-1" />
                        IA
                      </Badge>
                    )}
                  </div>
                  <Badge className={getStatusColor(training.status)}>
                    {training.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
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

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {training.hasDocument && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-blue-600" />
                      Documento
                    </div>
                  )}
                  {training.hasExam && (
                    <div className="flex items-center">
                      <ClipboardCheck className="h-4 w-4 mr-1 text-green-600" />
                      Prova
                    </div>
                  )}
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
