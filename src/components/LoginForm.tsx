
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Building, Crown } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: { name: string; role: 'admin' | 'employee'; accountType?: string; employeeLimit?: number }) => void;
  onBack: () => void;
}

const LoginForm = ({ onLogin, onBack }: LoginFormProps) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'admin' as 'admin' | 'employee',
    accountType: 'starter' as 'starter' | 'business' | 'enterprise'
  });

  const accountPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'R$ 197/mês',
      employeeLimit: 20,
      features: [
        'Até 20 funcionários',
        'Treinamentos com IA',
        'Documentos automáticos',
        'Relatórios básicos',
        'Suporte por email'
      ],
      icon: Users,
      popular: false
    },
    {
      id: 'business',
      name: 'Business',
      price: 'R$ 497/mês',
      employeeLimit: 100,
      features: [
        'Até 100 funcionários',
        'Treinamentos com IA',
        'Documentos automáticos',
        'Relatórios avançados',
        'Certificações personalizadas',
        'Suporte prioritário'
      ],
      icon: Building,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'R$ 997/mês',
      employeeLimit: 500,
      features: [
        'Até 500 funcionários',
        'Treinamentos com IA',
        'Documentos automáticos',
        'Relatórios completos',
        'Certificações personalizadas',
        'API personalizada',
        'Suporte 24/7'
      ],
      icon: Crown,
      popular: false
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - in real app this would authenticate with backend
    const isAdmin = loginData.email.includes('admin');
    onLogin({
      name: loginData.email.split('@')[0],
      role: isAdmin ? 'admin' : 'employee',
      accountType: 'business',
      employeeLimit: 100
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Senhas não coincidem');
      return;
    }
    
    const selectedPlan = accountPlans.find(plan => plan.id === registerData.accountType);
    
    onLogin({
      name: registerData.companyName || registerData.email.split('@')[0],
      role: registerData.userType,
      accountType: registerData.accountType,
      employeeLimit: selectedPlan?.employeeLimit || 20
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Voltar
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/98823403-2655-440f-ab64-54018ad5abba.png" 
              alt="TrainHub Logo" 
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo ao TrainHub
          </h1>
          <p className="text-gray-600">
            Plataforma de treinamentos corporativos com IA
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Criar Conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Fazer Login</CardTitle>
                <CardDescription>
                  Entre com suas credenciais para acessar a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800">
                    Entrar
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Criar Conta Empresarial</CardTitle>
                <CardDescription>
                  Cadastre sua empresa e escolha o plano ideal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      value={registerData.companyName}
                      onChange={(e) => setRegisterData({...registerData, companyName: e.target.value})}
                      placeholder="Sua Empresa Ltda"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="regEmail">E-mail Corporativo</Label>
                    <Input
                      id="regEmail"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      placeholder="admin@empresa.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="regPassword">Senha</Label>
                    <Input
                      id="regPassword"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Tipo de Usuário</Label>
                    <Select value={registerData.userType} onValueChange={(value: 'admin' | 'employee') => setRegisterData({...registerData, userType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="employee">Funcionário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Account Plans */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">Escolha seu Plano</Label>
                    <div className="grid gap-4">
                      {accountPlans.map((plan) => (
                        <div 
                          key={plan.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all relative ${
                            registerData.accountType === plan.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setRegisterData({...registerData, accountType: plan.id as any})}
                        >
                          {plan.popular && (
                            <Badge className="absolute -top-2 left-4 bg-blue-600 text-white">
                              Mais Popular
                            </Badge>
                          )}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <plan.icon className="h-6 w-6 text-blue-600" />
                              <div>
                                <h3 className="font-semibold text-lg">{plan.name}</h3>
                                <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              registerData.accountType === plan.id
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {registerData.accountType === plan.id && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-1 h-1 bg-blue-600 rounded-full mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800">
                    Criar Conta e Começar
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
