
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, Pause, RotateCcw, FileText, ClipboardCheck, CheckCircle, Clock, BookOpen } from 'lucide-react';

interface TrainingViewerProps {
  trainingId: number;
  onBack: () => void;
  onComplete: (trainingId: number) => void;
}

const TrainingViewer = ({ trainingId, onBack, onComplete }: TrainingViewerProps) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [showExamResult, setShowExamResult] = useState(false);
  const [examScore, setExamScore] = useState(0);

  // Mock training data
  const training = {
    id: trainingId,
    title: 'Segurança no Trabalho',
    description: 'Treinamento essencial sobre normas de segurança e prevenção de acidentes no ambiente de trabalho',
    duration: '2 horas',
    modules: [
      { id: 1, title: 'Introdução à Segurança', duration: '15 min', completed: true },
      { id: 2, title: 'Equipamentos de Proteção', duration: '25 min', completed: true },
      { id: 3, title: 'Procedimentos de Emergência', duration: '30 min', completed: false },
      { id: 4, title: 'Prevenção de Acidentes', duration: '35 min', completed: false },
      { id: 5, title: 'Revisão e Conclusão', duration: '15 min', completed: false }
    ],
    document: {
      title: 'Manual de Segurança Completo',
      pages: 24,
      downloadUrl: '#'
    },
    exam: {
      title: 'Avaliação de Segurança no Trabalho',
      questions: [
        {
          id: 1,
          question: 'Qual é o principal objetivo dos Equipamentos de Proteção Individual (EPIs)?',
          options: [
            'Melhorar a produtividade',
            'Proteger a saúde e integridade física do trabalhador',
            'Reduzir custos da empresa',
            'Facilitar o trabalho'
          ],
          correct: 1
        },
        {
          id: 2,
          question: 'Em caso de incêndio, qual deve ser a primeira atitude?',
          options: [
            'Tentar apagar o fogo',
            'Acionar o alarme e evacuar o local',
            'Buscar ajuda de colegas',
            'Continuar trabalhando'
          ],
          correct: 1
        },
        {
          id: 3,
          question: 'Com que frequência devem ser realizados os treinamentos de segurança?',
          options: [
            'Uma vez por ano',
            'Apenas na admissão',
            'Periodicamente conforme necessidade',
            'Nunca'
          ],
          correct: 2
        }
      ]
    }
  };

  const totalModules = training.modules.length;
  const completedModules = training.modules.filter(m => m.completed).length;
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  useEffect(() => {
    setCurrentProgress(overallProgress);
  }, [overallProgress]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExamSubmit = () => {
    let correct = 0;
    training.exam.questions.forEach((q) => {
      if (examAnswers[q.id] === q.correct.toString()) {
        correct++;
      }
    });
    const score = Math.round((correct / training.exam.questions.length) * 100);
    setExamScore(score);
    setShowExamResult(true);
  };

  const handleCompleteTraining = () => {
    onComplete(trainingId);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar</span>
          </Button>
          <Badge variant="secondary" className="text-sm">
            Progresso: {currentProgress}%
          </Badge>
        </div>

        {/* Training Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{training.title}</CardTitle>
            <CardDescription>{training.description}</CardDescription>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {training.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {totalModules} módulos
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={currentProgress} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              {completedModules} de {totalModules} módulos concluídos
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="video">Vídeo Aula</TabsTrigger>
            <TabsTrigger value="material">Material</TabsTrigger>
            <TabsTrigger value="exam">Avaliação</TabsTrigger>
          </TabsList>

          {/* Video Tab */}
          <TabsContent value="video" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8 ml-1" />
                      )}
                    </div>
                    <p className="text-lg font-semibold">Módulo 3: Procedimentos de Emergência</p>
                    <p className="text-sm text-gray-300">Duração: 30 minutos</p>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-4 text-white text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex-1 bg-gray-700 h-1 rounded">
                        <div 
                          className="bg-blue-600 h-1 rounded transition-all duration-1000"
                          style={{ width: `${(currentTime / (30 * 60)) * 100}%` }}
                        />
                      </div>
                      <span>30:00</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentTime(0)}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reiniciar
                  </Button>
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Reproduzir
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Modules List */}
            <Card>
              <CardHeader>
                <CardTitle>Módulos do Treinamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {training.modules.map((module) => (
                    <div
                      key={module.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        module.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {module.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                        <div>
                          <p className="font-medium">{module.title}</p>
                          <p className="text-sm text-gray-600">{module.duration}</p>
                        </div>
                      </div>
                      {module.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Concluído
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Material Tab */}
          <TabsContent value="material">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Material de Estudo
                </CardTitle>
                <CardDescription>
                  Documentos e materiais complementares para seu aprendizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{training.document.title}</h3>
                      <p className="text-gray-600">{training.document.pages} páginas</p>
                    </div>
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Conteúdo do Manual:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Normas Regulamentadoras (NRs)</li>
                      <li>• Equipamentos de Proteção Individual</li>
                      <li>• Procedimentos de Emergência</li>
                      <li>• Primeiros Socorros</li>
                      <li>• Prevenção de Acidentes</li>
                      <li>• Legislação de Segurança</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exam Tab */}
          <TabsContent value="exam">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 mr-2" />
                  {training.exam.title}
                </CardTitle>
                <CardDescription>
                  Responda todas as questões para concluir o treinamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showExamResult ? (
                  <div className="space-y-6">
                    {training.exam.questions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-3">
                          {index + 1}. {question.question}
                        </h3>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <label
                              key={optionIndex}
                              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={optionIndex}
                                onChange={(e) => 
                                  setExamAnswers(prev => ({
                                    ...prev,
                                    [question.id]: e.target.value
                                  }))
                                }
                                className="text-blue-600"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      onClick={handleExamSubmit}
                      className="w-full"
                      disabled={Object.keys(examAnswers).length < training.exam.questions.length}
                    >
                      Finalizar Avaliação
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                      examScore >= 70 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {examScore >= 70 ? (
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      ) : (
                        <ClipboardCheck className="h-10 w-10 text-red-600" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold">
                        {examScore >= 70 ? 'Parabéns!' : 'Resultado'}
                      </h3>
                      <p className="text-gray-600">
                        Sua pontuação: {examScore}%
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {examScore >= 70 
                          ? 'Você foi aprovado no treinamento!' 
                          : 'Nota mínima para aprovação: 70%'
                        }
                      </p>
                    </div>

                    <div className="flex space-x-3 justify-center">
                      {examScore >= 70 ? (
                        <Button onClick={handleCompleteTraining} className="bg-green-600 hover:bg-green-700">
                          Concluir Treinamento
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => {
                            setShowExamResult(false);
                            setExamAnswers({});
                          }}
                          variant="outline"
                        >
                          Tentar Novamente
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrainingViewer;
