
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, FileText, Users, Clock, Sparkles, Brain, BookOpen, ClipboardCheck } from 'lucide-react';

interface CreateTrainingProps {
  onBack: () => void;
  onCreateTraining: (training: any) => void;
}

const CreateTraining = ({ onBack, onCreateTraining }: CreateTrainingProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    niche: '',
    aiPrompt: '',
    department: '',
    template: '',
    duration: '',
    selectedEmployees: [] as string[],
    generateDocument: true,
    generateExam: true,
    examQuestions: 10
  });

  const [step, setStep] = useState(1);

  const niches = [
    'Tecnologia da Informação',
    'Recursos Humanos',
    'Vendas e Marketing',
    'Financeiro',
    'Operações e Produção',
    'Atendimento ao Cliente',
    'Segurança do Trabalho',
    'Qualidade',
    'Logística',
    'Jurídico'
  ];

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
    },
    {
      id: 'custom-ai',
      name: 'Treinamento Personalizado com IA',
      description: 'Criado automaticamente baseado no seu prompt e nicho específico',
      duration: 'Variável',
      topics: ['Conteúdo Personalizado', 'Gerado por IA', 'Específico para seu Negócio']
    }
  ];

  const employees = [
    { id: '1', name: 'João Silva', department: 'Vendas', role: 'Vendedor', area: 'Comercial' },
    { id: '2', name: 'Maria Santos', department: 'Administrativo', role: 'Analista', area: 'Administrativo' },
    { id: '3', name: 'Pedro Costa', department: 'Produção', role: 'Operador', area: 'Operacional' },
    { id: '4', name: 'Ana Lima', department: 'RH', role: 'Coordenadora', area: 'Recursos Humanos' },
    { id: '5', name: 'Carlos Oliveira', department: 'TI', role: 'Desenvolvedor', area: 'Tecnologia' },
    { id: '6', name: 'Fernanda Rocha', department: 'Marketing', role: 'Analista', area: 'Marketing' }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
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
      status: 'Gerando Conteúdo',
      documents: formData.generateDocument ? ['documento_treinamento.pdf'] : [],
      exam: formData.generateExam ? {
        questions: formData.examQuestions,
        file: 'prova_treinamento.pdf'
      } : null
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

  const groupedEmployees = employees.reduce((acc, employee) => {
    if (!acc[employee.area]) {
      acc[employee.area] = [];
    }
    acc[employee.area].push(employee);
    return acc;
  }, {} as Record<string, typeof employees>);

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
            <p className="text-gray-600">Use IA para criar treinamentos personalizados e eficazes</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Information and AI Prompt */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Informações e Prompt de IA
              </CardTitle>
              <CardDescription>
                Defina as informações básicas e como a IA deve criar o treinamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Nome do Treinamento</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Treinamento de Vendas Consultivas"
                />
              </div>
              
              <div>
                <Label htmlFor="niche">Nicho/Área de Especialização</Label>
                <Select value={formData.niche} onValueChange={(value) => setFormData({...formData, niche: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nicho" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map((niche) => (
                      <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="aiPrompt">Prompt para IA</Label>
                <Textarea
                  id="aiPrompt"
                  value={formData.aiPrompt}
                  onChange={(e) => setFormData({...formData, aiPrompt: e.target.value})}
                  placeholder="Descreva detalhadamente o que o treinamento deve abordar. Ex: 'Crie um treinamento sobre técnicas de vendas consultivas focado em identificar necessidades do cliente, fazer perguntas estratégicas e apresentar soluções personalizadas. Inclua exemplos práticos e estudos de caso.'"
                  rows={6}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Seja específico sobre objetivos, metodologia, exemplos e resultados esperados
                </p>
              </div>

              <div>
                <Label htmlFor="description">Descrição Resumida</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Resumo executivo do treinamento..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="department">Área/Departamento Alvo</Label>
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
                    <SelectItem value="ti">Tecnologia</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} disabled={!formData.name || !formData.niche || !formData.aiPrompt}>
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
                Escolher Template Base
              </CardTitle>
              <CardDescription>
                Selecione um template que servirá como base para a IA personalizar
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

        {/* Step 3: Document and Exam Generation */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Configurar Geração de Conteúdo
              </CardTitle>
              <CardDescription>
                Configure quais materiais a IA deve gerar automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="generateDocument"
                    checked={formData.generateDocument}
                    onCheckedChange={(checked) => setFormData({...formData, generateDocument: !!checked})}
                  />
                  <div>
                    <Label htmlFor="generateDocument" className="text-base font-medium">
                      Gerar Documento de Treinamento
                    </Label>
                    <p className="text-sm text-gray-600">
                      A IA criará um documento completo com todo o conteúdo do treinamento
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="generateExam"
                    checked={formData.generateExam}
                    onCheckedChange={(checked) => setFormData({...formData, generateExam: !!checked})}
                  />
                  <div>
                    <Label htmlFor="generateExam" className="text-base font-medium">
                      Gerar Prova de Avaliação
                    </Label>
                    <p className="text-sm text-gray-600">
                      Crie uma prova automaticamente baseada no conteúdo do treinamento
                    </p>
                  </div>
                </div>

                {formData.generateExam && (
                  <div className="ml-6 space-y-3">
                    <div>
                      <Label htmlFor="examQuestions">Número de Questões</Label>
                      <Select 
                        value={formData.examQuestions.toString()} 
                        onValueChange={(value) => setFormData({...formData, examQuestions: parseInt(value)})}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 questões</SelectItem>
                          <SelectItem value="10">10 questões</SelectItem>
                          <SelectItem value="15">15 questões</SelectItem>
                          <SelectItem value="20">20 questões</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <ClipboardCheck className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-blue-900">O que será gerado:</h4>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  {formData.generateDocument && (
                    <li>• Documento PDF completo do treinamento personalizado</li>
                  )}
                  {formData.generateExam && (
                    <li>• Prova com {formData.examQuestions} questões e gabarito</li>
                  )}
                  <li>• Certificado de conclusão personalizado para cada funcionário</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious}>
                  Anterior
                </Button>
                <Button onClick={handleNext}>
                  Próximo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Employee Selection by Area */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Selecionar Funcionários por Área
              </CardTitle>
              <CardDescription>
                Escolha os funcionários que participarão do treinamento, organizados por área
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedEmployees).map(([area, areaEmployees]) => (
                  <div key={area}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{area}</h3>
                      <Badge variant="outline">
                        {areaEmployees.filter(e => formData.selectedEmployees.includes(e.id)).length} / {areaEmployees.length}
                      </Badge>
                    </div>
                    <div className="grid gap-3">
                      {areaEmployees.map((employee) => (
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
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Resumo da Seleção:</h4>
                <p className="text-sm text-green-800">
                  {formData.selectedEmployees.length} funcionário(s) selecionado(s) de {Object.keys(groupedEmployees).length} área(s) diferentes
                </p>
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
                  Criar Treinamento com IA
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
