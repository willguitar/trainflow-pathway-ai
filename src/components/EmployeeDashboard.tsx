
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, Play, FileText, ClipboardCheck, CheckCircle } from 'lucide-react';

interface User {
  name: string;
  role: 'admin' | 'employee';
  department?: string;
}

interface EmployeeDashboardProps {
  user?: User;
}

const EmployeeDashboard = ({ user }: EmployeeDashboardProps) => {
  const [trainings] = useState([
    {
      id: 1,
      title: 'Segurança no Trabalho',
      description: 'Treinamento essencial sobre normas de segurança e prevenção de acidentes',
      status: 'Em Andamento',
      progress: 75,
      timeRemaining: '2 horas',
      dueDate: '2024-01-25',
      hasDocument: true,
      hasExam: true,
      examStatus: 'pending',
      department: 'Geral'
    },
    {
      id: 2,
      title: 'Vendas Consultivas com IA',
      description: 'Técnicas modernas de vendas utilizando inteligência artificial',
      status: 'Não Iniciado',
      progress: 0,
      timeRemaining: '4 horas',
      dueDate: '2024-02-01',
      hasDocument: true,
      hasExam: true,
      examStatus: 'not_started',
      department: 'Vendas'
    },
    {
      id: 3,
      title: 'Compliance Corporativo',
      description: 'Políticas e procedimentos de conformidade da empresa',
      status: 'Concluído',
      progress: 100,
      timeRemaining: '0 horas',
      dueDate: '2024-01-15',
      hasDocument: true,
      hasExam: true,
      examStatus: 'approved',
      department: 'Administrativo'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Não Iniciado':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'not_started':
        return <ClipboardCheck className="h-4 w-4 text-gray-600" />;
      default:
        return <ClipboardCheck className="h-4 w-4 text-gray-600" />;
    }
  };

  const stats = [
    {
      title: 'Treinamentos Ativos',
      value: trainings.filter(t => t.status === 'Em Andamento').length.toString(),
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      title: 'Concluídos',
      value: trainings.filter(t => t.status === 'Concluído').length.toString(),
      icon: Award,
      color: 'text-green-600'
    },
    {
      title: 'Pendentes',
      value: trainings.filter(t => t.status === 'Não Iniciado').length.toString(),
      icon: Clock,
      color: 'text-yellow-600'
    }
  ];

  const overallProgress = Math.round(
    trainings.reduce((acc, training) => acc + training.progress, 0) / trainings.length
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Treinamentos</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo(a), {user?.name}! Acompanhe seu progresso nos treinamentos
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {user?.department || 'Funcionário'}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Overall Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Progresso Geral</h3>
              <p className="text-sm text-gray-600">
                Sua evolução nos treinamentos atribuídos
              </p>
            </div>
            <Badge variant="secondary">
              {overallProgress}% completo
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Training List */}
      <Card>
        <CardHeader>
          <CardTitle>Treinamentos Atribuídos</CardTitle>
          <CardDescription>Continue de onde parou ou inicie novos treinamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainings.map((training) => (
              <div key={training.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{training.title}</h3>
                      <Badge className={getStatusColor(training.status)}>
                        {training.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{training.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {training.timeRemaining} restantes
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {training.department}
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Prazo: {new Date(training.dueDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      {training.hasDocument && (
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1 text-blue-600" />
                          Material de Estudo
                        </div>
                      )}
                      {training.hasExam && (
                        <div className="flex items-center">
                          {getExamStatusIcon(training.examStatus)}
                          <span className="ml-1">
                            {training.examStatus === 'approved' ? 'Prova Aprovada' :
                             training.examStatus === 'pending' ? 'Prova Pendente' :
                             'Prova Disponível'}
                          </span>
                        </div>
                      )}
                    </div>

                    {training.status !== 'Concluído' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progresso</span>
                          <span>{training.progress}%</span>
                        </div>
                        <Progress value={training.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {training.status === 'Não Iniciado' && (
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-800">
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar Treinamento
                    </Button>
                  )}
                  {training.status === 'Em Andamento' && (
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-800">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continuar
                    </Button>
                  )}
                  {training.status === 'Concluído' && (
                    <Button variant="outline">
                      <Award className="h-4 w-4 mr-2" />
                      Ver Certificado
                    </Button>
                  )}
                  
                  {training.hasDocument && (
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Material
                    </Button>
                  )}
                  
                  {training.hasExam && training.examStatus !== 'approved' && (
                    <Button variant="outline">
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      {training.examStatus === 'pending' ? 'Ver Resultado' : 'Fazer Prova'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;
