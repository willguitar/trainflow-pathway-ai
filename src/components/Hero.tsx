
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Users, BookOpen, Award, BarChart3 } from 'lucide-react';
import Logo from '@/components/Logo';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const features = [
    {
      icon: Users,
      title: 'Gestão de Usuários',
      description: 'Cadastre e gerencie funcionários e administradores'
    },
    {
      icon: BookOpen,
      title: 'Treinamentos Personalizados',
      description: 'Crie treinamentos customizados com templates'
    },
    {
      icon: Award,
      title: 'Certificações',
      description: 'Gere certificados automaticamente'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Detalhados',
      description: 'Acompanhe o progresso e desempenho'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme o treinamento corporativo com{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Inteligência Artificial
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma completa para criação, gestão e acompanhamento de treinamentos corporativos. 
            Automatize processos, personalize conteúdos e acompanhe resultados em tempo real.
          </p>
          <Button size="lg" onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 text-lg">
            Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para revolucionar seus treinamentos?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Junte-se às empresas que já confiam no TrainHub para desenvolver seus colaboradores
          </p>
          <Button size="lg" variant="secondary" onClick={onGetStarted} className="bg-white text-blue-800 hover:bg-blue-50">
            Iniciar Teste Gratuito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
