import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import { supabase } from "@/integrations/supabase/client";
import { ContentRecommendation } from "@/types/profile";
import { CONTENT_LIBRARY, LearningContent } from "@/lib/contentLibrary";
import { Loader2, BookOpen, Clock, BarChart, Play } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Aprender() {
  const { profile, history, addActivity } = useSessionProfile();
  const [recommendation, setRecommendation] = useState<ContentRecommendation | null>(null);
  const [currentContent, setCurrentContent] = useState<LearningContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [studying, setStudying] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    loadRecommendation();
  }, []);

  const loadRecommendation = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("recommend", {
        body: {
          sessionProfile: profile,
          history: history.slice(0, 5),
        },
      });

      if (error) throw error;
      setRecommendation(data);
    } catch (error) {
      console.error("Error loading recommendation:", error);
      toast.error("Erro ao carregar recomendação");
    } finally {
      setLoading(false);
    }
  };

  const startContent = (content: LearningContent) => {
    setCurrentContent(content);
    setStudying(true);
    setStartTime(Date.now());
  };

  const completeContent = (score: number) => {
    if (!currentContent) return;

    const timeSpent = Math.round((Date.now() - startTime) / 60000);
    addActivity({
      title: currentContent.title,
      topic: currentContent.topic,
      format: currentContent.format,
      score,
      timeSpent,
      difficulty: currentContent.difficulty,
    });

    toast.success("Atividade concluída!");
    setStudying(false);
    setCurrentContent(null);
    loadRecommendation();
  };

  if (studying && currentContent) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{currentContent.title}</CardTitle>
              <CardDescription className="flex items-center gap-4 text-base">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {currentContent.duration} min
                </span>
                <span className="capitalize">{currentContent.difficulty}</span>
                <span className="capitalize">{currentContent.format}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none mb-8">
                {currentContent.format === "texto" && (
                  <div dangerouslySetInnerHTML={{ __html: currentContent.content.replace(/\n/g, "<br>") }} />
                )}
                {currentContent.format === "video" && (
                  <div className="bg-muted rounded-lg p-8 text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Player de vídeo (simulado)</p>
                  </div>
                )}
                {currentContent.format === "audio" && (
                  <div className="bg-muted rounded-lg p-8 text-center">
                    <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Player de áudio (simulado)</p>
                  </div>
                )}
                {currentContent.format === "interativo" && (
                  <div className="bg-muted rounded-lg p-8 text-center">
                    <BarChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Atividade interativa (simulada)</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button onClick={() => completeContent(100)} className="flex-1">
                  Concluir com Sucesso
                </Button>
                <Button onClick={() => completeContent(50)} variant="outline" className="flex-1">
                  Concluir com Dificuldade
                </Button>
                <Button onClick={() => setStudying(false)} variant="ghost">
                  Sair
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Aprender</h1>
            <p className="text-lg text-muted-foreground">
              Conteúdos personalizados para você
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/chat">Chat de Apoio</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/progresso">Meu Progresso</Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Carregando recomendação...</span>
            </CardContent>
          </Card>
        ) : recommendation ? (
          <Card className="mb-8 border-2 border-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    Recomendação para Você
                  </CardTitle>
                  <CardDescription className="text-base">
                    {recommendation.reason}
                  </CardDescription>
                </div>
                <Button onClick={loadRecommendation} variant="ghost" size="sm">
                  Atualizar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{recommendation.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="capitalize">{recommendation.format}</span>
                    <span className="capitalize">{recommendation.difficulty}</span>
                    <span>{recommendation.duration} minutos</span>
                    <span>{recommendation.topic}</span>
                  </div>
                  {recommendation.adaptations.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {recommendation.adaptations.map((adapt, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded"
                        >
                          {adapt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button size="lg">Começar</Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <h2 className="text-2xl font-bold mb-4">Biblioteca de Conteúdos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT_LIBRARY.map((content) => (
            <Card key={content.id} className="hover:shadow-glow transition-shadow">
              <CardHeader>
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>{content.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                  <span className="capitalize">{content.format}</span>
                  <span>•</span>
                  <span className="capitalize">{content.difficulty}</span>
                  <span>•</span>
                  <span>{content.duration}min</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button onClick={() => startContent(content)} className="w-full">
                  Iniciar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
