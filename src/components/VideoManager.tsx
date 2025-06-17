
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Video, Sparkles, Play, Clock, FileText, ArrowLeft } from 'lucide-react';

interface VideoManagerProps {
  trainingId: number;
  onBack: () => void;
  onVideoAdded: (video: any) => void;
}

const VideoManager = ({ trainingId, onBack, onVideoAdded }: VideoManagerProps) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  // Manual upload state
  const [manualData, setManualData] = useState({
    title: '',
    description: '',
    duration: '',
    videoFile: null as File | null,
    thumbnailFile: null as File | null
  });

  // AI generation state
  const [aiData, setAiData] = useState({
    topic: '',
    duration: '15',
    style: 'professional',
    voice: 'narrator',
    language: 'portuguese',
    prompt: ''
  });

  const handleManualUpload = () => {
    if (!manualData.videoFile) {
      alert('Por favor, selecione um arquivo de vídeo');
      return;
    }

    const newVideo = {
      id: Date.now(),
      title: manualData.title,
      description: manualData.description,
      duration: manualData.duration,
      type: 'manual',
      status: 'uploaded',
      videoUrl: URL.createObjectURL(manualData.videoFile),
      thumbnailUrl: manualData.thumbnailFile ? URL.createObjectURL(manualData.thumbnailFile) : null,
      createdAt: new Date().toISOString()
    };

    onVideoAdded(newVideo);
    console.log('Vídeo manual adicionado:', newVideo);
  };

  const handleAIGeneration = () => {
    if (!aiData.topic || !aiData.prompt) {
      alert('Por favor, preencha o tópico e o prompt para geração');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulação do processo de geração
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          const newVideo = {
            id: Date.now(),
            title: aiData.topic,
            description: `Vídeo gerado por IA sobre ${aiData.topic}`,
            duration: `${aiData.duration} minutos`,
            type: 'ai-generated',
            status: 'generated',
            videoUrl: '/api/generated-video-placeholder.mp4', // Placeholder
            prompt: aiData.prompt,
            style: aiData.style,
            voice: aiData.voice,
            language: aiData.language,
            createdAt: new Date().toISOString()
          };

          onVideoAdded(newVideo);
          console.log('Vídeo gerado por IA:', newVideo);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar</span>
          </Button>
          <Badge variant="outline">Gerenciar Vídeo Aulas</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="h-5 w-5 mr-2" />
              Adicionar Vídeo Aula
            </CardTitle>
            <CardDescription>
              Faça upload manual de um vídeo ou gere automaticamente usando IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Upload Manual</TabsTrigger>
                <TabsTrigger value="ai">Geração com IA</TabsTrigger>
              </TabsList>

              {/* Manual Upload Tab */}
              <TabsContent value="manual" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="videoTitle">Título do Vídeo</Label>
                    <Input
                      id="videoTitle"
                      value={manualData.title}
                      onChange={(e) => setManualData({...manualData, title: e.target.value})}
                      placeholder="Ex: Introdução à Segurança no Trabalho"
                    />
                  </div>

                  <div>
                    <Label htmlFor="videoDescription">Descrição</Label>
                    <Textarea
                      id="videoDescription"
                      value={manualData.description}
                      onChange={(e) => setManualData({...manualData, description: e.target.value})}
                      placeholder="Descreva o conteúdo do vídeo..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="videoDuration">Duração (minutos)</Label>
                    <Input
                      id="videoDuration"
                      type="number"
                      value={manualData.duration}
                      onChange={(e) => setManualData({...manualData, duration: e.target.value})}
                      placeholder="15"
                    />
                  </div>

                  <div>
                    <Label htmlFor="videoFile">Arquivo de Vídeo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Arraste seu vídeo aqui ou clique para selecionar</p>
                      <Input
                        id="videoFile"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setManualData({...manualData, videoFile: e.target.files?.[0] || null})}
                        className="hidden"
                      />
                      <Button variant="outline" onClick={() => document.getElementById('videoFile')?.click()}>
                        Selecionar Vídeo
                      </Button>
                      {manualData.videoFile && (
                        <p className="text-sm text-green-600 mt-2">
                          Arquivo selecionado: {manualData.videoFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="thumbnailFile">Miniatura (Opcional)</Label>
                    <Input
                      id="thumbnailFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setManualData({...manualData, thumbnailFile: e.target.files?.[0] || null})}
                    />
                  </div>

                  <Button onClick={handleManualUpload} className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Fazer Upload do Vídeo
                  </Button>
                </div>
              </TabsContent>

              {/* AI Generation Tab */}
              <TabsContent value="ai" className="space-y-6">
                {!isGenerating ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="aiTopic">Tópico do Vídeo</Label>
                      <Input
                        id="aiTopic"
                        value={aiData.topic}
                        onChange={(e) => setAiData({...aiData, topic: e.target.value})}
                        placeholder="Ex: Procedimentos de Emergência"
                      />
                    </div>

                    <div>
                      <Label htmlFor="aiPrompt">Prompt Detalhado para IA</Label>
                      <Textarea
                        id="aiPrompt"
                        value={aiData.prompt}
                        onChange={(e) => setAiData({...aiData, prompt: e.target.value})}
                        placeholder="Descreva detalhadamente o que o vídeo deve abordar, incluindo exemplos, cenários e objetivos de aprendizado..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="aiDuration">Duração (minutos)</Label>
                        <Input
                          id="aiDuration"
                          type="number"
                          value={aiData.duration}
                          onChange={(e) => setAiData({...aiData, duration: e.target.value})}
                          placeholder="15"
                        />
                      </div>

                      <div>
                        <Label htmlFor="aiStyle">Estilo do Vídeo</Label>
                        <select
                          id="aiStyle"
                          value={aiData.style}
                          onChange={(e) => setAiData({...aiData, style: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="professional">Profissional</option>
                          <option value="casual">Casual</option>
                          <option value="educational">Educativo</option>
                          <option value="animated">Animado</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="aiVoice">Tipo de Voz</Label>
                        <select
                          id="aiVoice"
                          value={aiData.voice}
                          onChange={(e) => setAiData({...aiData, voice: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="narrator">Narrador</option>
                          <option value="instructor">Instrutor</option>
                          <option value="presenter">Apresentador</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="aiLanguage">Idioma</Label>
                        <select
                          id="aiLanguage"
                          value={aiData.language}
                          onChange={(e) => setAiData({...aiData, language: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="portuguese">Português</option>
                          <option value="english">Inglês</option>
                          <option value="spanish">Espanhol</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                        <h4 className="font-medium text-blue-900">O que será gerado:</h4>
                      </div>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Vídeo personalizado baseado no seu prompt</li>
                        <li>• Narração profissional no idioma selecionado</li>
                        <li>• Slides e animações automaticamente criados</li>
                        <li>• Legendas sincronizadas</li>
                        <li>• Miniatura personalizada</li>
                      </ul>
                    </div>

                    <Button onClick={handleAIGeneration} className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Gerar Vídeo com IA
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Gerando Vídeo com IA</h3>
                      <p className="text-gray-600">
                        Criando seu vídeo personalizado sobre "{aiData.topic}"
                      </p>
                    </div>
                    <div className="max-w-md mx-auto">
                      <Progress value={generationProgress} className="h-3" />
                      <p className="text-sm text-gray-500 mt-2">
                        {generationProgress}% concluído
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Analisando conteúdo...</p>
                      <p>• Criando roteiro...</p>
                      <p>• Gerando narração...</p>
                      <p>• Criando animações...</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoManager;
