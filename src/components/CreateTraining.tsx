
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Users, Clock, Sparkles } from 'lucide-react';

interface CreateTrainingProps {
  onBack: () => void;
  onCreateTraining: (training: any) => void;
}

const CreateTraining = ({ onBack, onCreateTraining }: CreateTrainingProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    template: '',
    duration: '',
    selectedEmployees: [] as string[]
  });

  const [step, setStep] = useState(1);

  const templates = [
    {
      id: 'safety',
      name: 'Segurança no Trabalho',
      description: 'Template completo para treinamentos de segurança ocupacional',
      duration: '2 horas',
      topics: ['EPI', 'Procedimentos de Emergência', 'Prevenção de Acidentes']
    },
    {
      id: 'customer-service',
      name: 'Atendimento ao Cliente',
      description: 'Desenvolva habilidades de relacionamento e excelência no atendimento',
      duration: '3 horas',
      topics: ['Comunicação Efetiva', 'Resolução de Conflitos', 'Fidelização']
    },
    {
      id: 'compliance',
      name: 'Compliance e Ética',
      description: 'Normas corporativas e condutas éticas empresariais',
      duration: '1.5 horas',
      topics: ['Código de Conduta', 'Políticas Internas', 'Responsabilidade Social']
    }
  ];

  const employees = [
    { id: '1', name: 'João Silva', department: 'Vendas', role: 'Vendedor' },
    { id: '2', name: 'Maria Santos', department: 'Administrativo', role: 'Analista' },
    { id: '3', name: 'Pedro Costa', department: 'Produção', role: 'Operador' },
    { id: '4', name: 'Ana Lima', department: 'RH', role: 'Coordenadora' }
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const selectedTemplate = templates.find(t => t.id === formData.template);
    const selectedEmployeeDetails = employees.filter(e => formData.selectedEmployees.includes(e.id));
    
    const newTraining = {
      ...formData,
      template: selectedTemplate,
      employees: selectedEmployeeDetails,
      createdAt: new Date().toISOString(),
      status: 'Em Andamento'
    };
    
    onCreateTraining(newTraining);
  };

  const toggleEmployee = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeId)
        ? prev.selectedEmployees.filter(id => id !== employeeId)
        : [...prev.selectedEmployees, employeeId]
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Criar Novo Treinamento</h1>
            <p className="text-gray-600">Siga os passos para criar um treinamento personalizado</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Defina as informações principais do treinamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Nome do Treinamento</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Treinamento de Segurança Industrial"
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva os objetivos e conteúdo do treinamento..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="department">Área/Departamento</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Geral</SelectItem>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="producao">Produção</SelectItem>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                    <SelectItem value="rh">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleNext} disabled={!formData.name || !formData.department}>
                  Próximo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Template Selection */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Escolher Template
              </CardTitle>
              <CardDescription>
                Selecione um template para automatizar a criação do conteúdo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      formData.template === template.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({...formData, template: template.id})}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {template.duration}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{template.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {template.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handlePrevious}>
                  Anterior
                </Button>
                <Button onClick={handleNext} disabled={!formData.template}>
                  Próximo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Employee Selection */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Selecionar Funcionários
              </CardTitle>
              <CardDescription>
                Escolha os funcionários que participarão deste treinamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {employees.map((employee) => (
                  <div 
                    key={employee.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      formData.selectedEmployees.includes(employee.id)
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleEmployee(employee.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{employee.name}</h4>
                        <p className="text-sm text-gray-600">{employee.role} - {employee.department}</p>
                      </div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.selectedEmployees.includes(employee.id)
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {formData.selectedEmployees.includes(employee.id) && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handlePrevious}>
                  Anterior
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={formData.selectedEmployees.length === 0}
                  className="bg-gradient-to-r from-blue-600 to-blue-800"
                >
                  Criar Treinamento
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateTraining;
