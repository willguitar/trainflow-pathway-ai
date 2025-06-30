
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ClassDiagram = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Diagrama de Classes - TrainHub</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* User Classes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-blue-600">Entidades de Usuário</h3>
                
                {/* User Interface */}
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">User</CardTitle>
                    <Badge variant="outline">Interface</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Propriedades:</div>
                    <div>+ name: string</div>
                    <div>+ role: 'admin' | 'employee'</div>
                    <div>+ accountType?: string</div>
                    <div>+ employeeLimit?: number</div>
                    <div>+ department?: string</div>
                  </CardContent>
                </Card>

                {/* Admin */}
                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">AdminDashboard</CardTitle>
                    <Badge variant="outline">Component</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Props:</div>
                    <div>+ user?: User</div>
                    <div className="font-medium text-blue-600">Estados:</div>
                    <div>+ currentView: string</div>
                    <div>+ trainings: Training[]</div>
                    <div>+ selectedTrainingId: number</div>
                    <div className="font-medium text-orange-600">Métodos:</div>
                    <div>+ handleCreateTraining()</div>
                    <div>+ handleManageVideos()</div>
                    <div>+ handleVideoAdded()</div>
                  </CardContent>
                </Card>

                {/* Employee */}
                <Card className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">EmployeeDashboard</CardTitle>
                    <Badge variant="outline">Component</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Props:</div>
                    <div>+ user?: User</div>
                    <div className="font-medium text-blue-600">Estados:</div>
                    <div>+ currentView: string</div>
                    <div>+ selectedTrainingId: number</div>
                    <div>+ trainings: Training[]</div>
                    <div className="font-medium text-orange-600">Métodos:</div>
                    <div>+ handleStartTraining()</div>
                    <div>+ handleCompleteTraining()</div>
                  </CardContent>
                </Card>
              </div>

              {/* Training Classes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-purple-600">Entidades de Treinamento</h3>
                
                {/* Training */}
                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Training</CardTitle>
                    <Badge variant="outline">Interface</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Propriedades:</div>
                    <div>+ id: number</div>
                    <div>+ name: string</div>
                    <div>+ description: string</div>
                    <div>+ status: string</div>
                    <div>+ progress: number</div>
                    <div>+ participants: number</div>
                    <div>+ completionRate: number</div>
                    <div>+ createdAt: string</div>
                    <div>+ videos: Video[]</div>
                  </CardContent>
                </Card>

                {/* CreateTraining */}
                <Card className="border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">CreateTraining</CardTitle>
                    <Badge variant="outline">Component</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Props:</div>
                    <div>+ onBack: () =&gt; void</div>
                    <div>+ onCreateTraining: (data) =&gt; void</div>
                    <div className="font-medium text-blue-600">Estados:</div>
                    <div>+ formData: TrainingForm</div>
                    <div>+ selectedEmployees: User[]</div>
                  </CardContent>
                </Card>

                {/* TrainingViewer */}
                <Card className="border-cyan-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">TrainingViewer</CardTitle>
                    <Badge variant="outline">Component</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Props:</div>
                    <div>+ trainingId: number</div>
                    <div>+ onBack: () =&gt; void</div>
                    <div>+ onComplete: (id) =&gt; void</div>
                    <div className="font-medium text-blue-600">Estados:</div>
                    <div>+ currentProgress: number</div>
                    <div>+ isPlaying: boolean</div>
                    <div>+ examAnswers: Record</div>
                    <div>+ showExamResult: boolean</div>
                  </CardContent>
                </Card>
              </div>

              {/* Video and Content Classes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-orange-600">Entidades de Conteúdo</h3>
                
                {/* Video */}
                <Card className="border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Video</CardTitle>
                    <Badge variant="outline">Interface</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Propriedades:</div>
                    <div>+ id: number</div>
                    <div>+ title: string</div>
                    <div>+ type: 'manual' | 'ai-generated'</div>
                    <div>+ duration?: string</div>
                    <div>+ description?: string</div>
                    <div>+ videoUrl?: string</div>
                    <div>+ thumbnailUrl?: string</div>
                    <div>+ prompt?: string</div>
                  </CardContent>
                </Card>

                {/* VideoManager */}
                <Card className="border-red-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">VideoManager</CardTitle>
                    <Badge variant="outline">Component</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Props:</div>
                    <div>+ trainingId: number</div>
                    <div>+ onBack: () =&gt; void</div>
                    <div>+ onVideoAdded: (video) =&gt; void</div>
                    <div className="font-medium text-blue-600">Estados:</div>
                    <div>+ activeTab: string</div>
                    <div>+ isGenerating: boolean</div>
                    <div>+ manualData: ManualUpload</div>
                    <div>+ aiData: AIGeneration</div>
                  </CardContent>
                </Card>

                {/* Exam */}
                <Card className="border-yellow-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Exam</CardTitle>
                    <Badge variant="outline">Interface</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Propriedades:</div>
                    <div>+ title: string</div>
                    <div>+ questions: Question[]</div>
                  </CardContent>
                </Card>

                {/* Question */}
                <Card className="border-yellow-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Question</CardTitle>
                    <Badge variant="outline">Interface</Badge>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1">
                    <div className="font-medium text-green-600">Propriedades:</div>
                    <div>+ id: number</div>
                    <div>+ question: string</div>
                    <div>+ options: string[]</div>
                    <div>+ correct: number</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Relationships */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Relacionamentos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Composição:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• AdminDashboard contém Training[]</li>
                    <li>• Training contém Video[]</li>
                    <li>• Training contém Exam</li>
                    <li>• Exam contém Question[]</li>
                    <li>• VideoManager gerencia Video</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dependências:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• AdminDashboard → VideoManager</li>
                    <li>• EmployeeDashboard → TrainingViewer</li>
                    <li>• TrainingViewer → Training</li>
                    <li>• CreateTraining → Training</li>
                    <li>• Todos os dashboards usam User</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassDiagram;
