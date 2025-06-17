
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LoginForm from '@/components/LoginForm';
import AdminDashboard from '@/components/AdminDashboard';
import EmployeeDashboard from '@/components/EmployeeDashboard';
import CreateTraining from '@/components/CreateTraining';
import Reports from '@/components/Reports';
import { useToast } from '@/hooks/use-toast';

type Screen = 'home' | 'login' | 'admin-dashboard' | 'employee-dashboard' | 'create-training' | 'reports';

interface User {
  name: string;
  role: 'admin' | 'employee';
  accountType?: string;
  employeeLimit?: number;
  department?: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleLogin = (userData: User) => {
    setUser(userData);
    // Direciona para o dashboard correto baseado no tipo de usuário
    setCurrentScreen(userData.role === 'admin' ? 'admin-dashboard' : 'employee-dashboard');
    
    const roleText = userData.role === 'admin' ? 'Administrador' : 'Funcionário';
    const accountTypeText = userData.accountType === 'starter' ? 'Starter' : 
                           userData.accountType === 'business' ? 'Business' : 
                           userData.accountType === 'enterprise' ? 'Enterprise' : '';
    
    toast({
      title: "Login realizado com sucesso!",
      description: `Bem-vindo(a), ${userData.name}! ${userData.role === 'admin' ? `Plano: ${accountTypeText} (até ${userData.employeeLimit} funcionários)` : `Área: ${userData.department || 'Geral'}`}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  const handleCreateTraining = (training: any) => {
    console.log('Novo treinamento criado:', training);
    setCurrentScreen('admin-dashboard');
    
    let generatedContent = [];
    if (training.generateDocument) generatedContent.push('documento');
    if (training.generateExam) generatedContent.push('prova');
    
    toast({
      title: "Treinamento criado com IA!",
      description: `"${training.name}" foi criado para ${training.employees.length} funcionários. Gerando: ${generatedContent.join(' e ')}.`,
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Hero onGetStarted={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginForm onLogin={handleLogin} onBack={() => setCurrentScreen('home')} />;
      case 'admin-dashboard':
        return (
          <AdminDashboard 
            user={user}
            onCreateTraining={() => setCurrentScreen('create-training')}
            onViewReports={() => setCurrentScreen('reports')}
          />
        );
      case 'employee-dashboard':
        return <EmployeeDashboard user={user} />;
      case 'create-training':
        return (
          <CreateTraining 
            onBack={() => setCurrentScreen('admin-dashboard')}
            onCreateTraining={handleCreateTraining}
          />
        );
      case 'reports':
        return <Reports onBack={() => setCurrentScreen('admin-dashboard')} />;
      default:
        return <Hero onGetStarted={() => setCurrentScreen('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {user && <Navbar user={user} onLogout={handleLogout} />}
      {renderScreen()}
    </div>
  );
};

export default Index;
