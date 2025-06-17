import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, Award, Plus, Video, FileText, Settings, BarChart3 } from 'lucide-react';
import CreateTraining from './CreateTraining';
import VideoManager from './VideoManager';

interface User {
  name: string;
  role: 'admin' | 'employee';
}

interface AdminDashboardProps {
  user?: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'video'>('dashboard');
  const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);
  
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      name: 'Segurança no Trabalho',
      description: 'Treinamento essencial sobre normas de segurança',
      status: 'Ativo',
      progress: 75,
      participants: 25,
      completionRate: 80,
      createdAt: '2024-01-15',
      videos: [
        { id: 1, title: 'Introdução à Segurança', type: 'manual' },
        { id: 2, title: 'EPIs Obrigatórios', type: 'ai-generated' }
      ]
    },
    {
      id: 2,
      name: 'Vendas Consultivas com IA',
      description: 'Técnicas modernas de vendas',
      status: 'Em Desenvolvimento',
      progress: 30,
      participants: 0,
      completionRate: 0,
      createdAt: '2024-01-20',
      videos: []
    },
    {
      id: 3,
      name: 'Compliance Corporativo',
      description: 'Políticas e procedimentos da empresa',
      status: 'Concluído',
      progress: 100,
      participants: 40,
      completionRate: 95,
      createdAt: '2024-01-10',
      videos: [
        { id: 3, title: 'Políticas Internas', type: 'manual' }
      ]
    }
  ]);

  const handleCreateTraining = (training: any) => {
    const newTraining = {
      id: Date.now(),
      ...training,
      progress: 0,
      participants: 0,
      completionRate: 0,
      videos: []
    };
    setTrainings([...trainings, newTraining]);
    setCurrentView('dashboard');
  };

  const handleVideoAdded = (video: any) => {
    if (selectedTrainingId) {
      setTrainings(prev => prev.map(training => 
        training.id === selectedTrainingId 
          ? { ...training, videos: [...training.videos, video] }
          : training
      ));
      setCurrentView('dashboard');
      setSelectedTrainingId(null);
    }
  };

  const handleManageVideos = (trainingId: number) => {
    setSelectedTrainingId(trainingId);
    setCurrentView('video');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedTrainingId(null);
  };

  if (currentView === 'create') {
    return (
      <CreateTraining
        onBack={handleBackToDashboard}
        onCreateTraining={handleCreateTraining}
      />
    );
  }

  if (currentView === 'video' && selectedTrainingId) {
    return (
      <VideoManager
        trainingId={selectedTrainingId}
        onBack={handleBackToDashboard}
        onVideoAdded={handleVideoAdded}
      />
    );
  }

  const stats = [
    {
      title: 'Total de Treinamentos',
      value: trainings.length.toString(),
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      title: 'Funcionários Ativos',
      value: trainings.reduce((acc, t) => acc + t.participants, 0).toString(),
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Taxa de Conclusão',
      value: Math.round(trainings.reduce((acc, t) => acc + t.completionRate, 0) / trainings.length) + '%',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      title: 'Em Desenvolvimento',
      value: trainings.filter(t => t.status === 'Em Desenvolvimento').length.toString(),
      icon: Clock,
      color: 'text-yellow-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Em Desenvolvimento':
        return 'bg-yellow-100 text-yellow-800';
      case 'Concluído':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo(a), {user?.name}! Gerencie treinamentos e acompanhe o progresso da equipe
          </p>
        </div>
        <Button 
          onClick={() => setCurrentView('create')}
          className="bg-gradient-to-r from-blue-600 to-blue-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Criar Treinamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      {/* Training Management */}
      <Card>
        <CardHeader>
          <CardTitle>Treinamentos Criados</CardTitle>
          <CardDescription>Gerencie e monitore todos os treinamentos da empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainings.map((training) => (
              <div key={training.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{training.name}</h3>
                      <Badge className={getStatusColor(training.status)}>
                        {training.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{training.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {training.participants} participantes
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        {training.completionRate}% conclusão
                      </div>
                      <div className="flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        {training.videos.length} vídeos
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Criado em {new Date(training.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    {training.status !== 'Concluído' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progresso de Desenvolvimento</span>
                          <span>{training.progress}%</span>
                        </div>
                        <Progress value={training.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline"
                    onClick={() => handleManageVideos(training.id)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Gerenciar Vídeos
                  </Button>
                  
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Material
                  </Button>
                  
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Relatórios
                  </Button>
                  
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
