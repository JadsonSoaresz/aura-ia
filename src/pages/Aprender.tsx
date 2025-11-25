import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import { supabase } from "@/integrations/supabase/client";
import { ContentRecommendation } from "@/types/profile";
import { CONTENT_LIBRARY, LearningContent } from "@/lib/contentLibrary";
import { Loader2, BookOpen, Clock, BarChart, Play, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Aprender() {
  const { profile, history, addActivity } = useSessionProfile();
  const { speak, profile: accessibilityProfile } = useAccessibility();
  const [recommendation, setRecommendation] = useState<ContentRecommendation | null>(null);
  const [currentContent, setCurrentContent] = useState<LearningContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [studying, setStudying] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadRecommendation();
    
    if (accessibilityProfile.ttsEnabled) {
      const timer = setTimeout(() => {
        speak("Página de aprendizado. Aqui você encontra conteúdos personalizados com base no seu perfil, incluindo recomendações feitas por inteligência artificial e uma biblioteca completa de materiais educacionais em diversos formatos.");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const loadRecommendation = async () => {
    setLoading(true);
    try {
      console.log("Carregando recomendação...", { profile, historyLength: history.length });
      
      const { data, error } = await supabase.functions.invoke("recommend", {
        body: {
          sessionProfile: profile,
          history: history.slice(0, 5),
        },
      });

      console.log("Resposta da recomendação:", { data, error });

      if (error) {
        console.error("Erro ao invocar função:", error);
        throw error;
      }
      
      if (data) {
        setRecommendation(data);
        console.log("Recomendação carregada com sucesso:", data);
      }
    } catch (error: any) {
      console.error("Error loading recommendation:", error);
      toast.error("Erro ao carregar recomendação: " + (error.message || "Tente novamente"));
      // Set loading to false even on error
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const startContent = async (content: LearningContent) => {
    setCurrentContent(content);
    setStudying(true);
    setStartTime(Date.now());
    setLoadingQuestions(true);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResults(false);

    try {
      const { data, error } = await supabase.functions.invoke("generate-questions", {
        body: {
          topic: content.topic,
          difficulty: content.difficulty,
          title: content.title,
        },
      });

      if (error) throw error;
      if (data?.questions) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      toast.error("Erro ao carregar perguntas. Tente novamente.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast.error("Por favor, selecione uma resposta");
      return;
    }

    setAnswers([...answers, selectedAnswer]);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const correct = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    return Math.round((correct / questions.length) * 100);
  };

  const completeContent = () => {
    if (!currentContent) return;

    const score = calculateScore();
    const timeSpent = Math.round((Date.now() - startTime) / 60000);
    addActivity({
      title: currentContent.title,
      topic: currentContent.topic,
      format: currentContent.format,
      score,
      timeSpent,
      difficulty: currentContent.difficulty,
    });

    toast.success(`Atividade concluída! Pontuação: ${score}%`);
    setStudying(false);
    setCurrentContent(null);
    setQuestions([]);
    setAnswers([]);
    loadRecommendation();
  };

  if (studying && currentContent) {
    if (loadingQuestions) {
      return (
        <div className="min-h-screen bg-gradient-hero">
          <Navbar />
          <main className="container mx-auto px-4 py-12 max-w-4xl">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin mb-4" />
                <p className="text-lg">Gerando perguntas sobre {currentContent.topic}...</p>
              </CardContent>
            </Card>
          </main>
        </div>
      );
    }

    if (showResults) {
      const score = calculateScore();
      const correctCount = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

      return (
        <div className="min-h-screen bg-gradient-hero">
          <Navbar />
          <main className="container mx-auto px-4 py-12 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Resultados</CardTitle>
                <CardDescription>
                  Você acertou {correctCount} de {questions.length} perguntas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold text-primary mb-2">{score}%</div>
                    <p className="text-muted-foreground">Pontuação final</p>
                  </div>

                  <div className="space-y-4">
                    {questions.map((q, index) => {
                      const userAnswer = answers[index];
                      const isCorrect = userAnswer === q.correctAnswer;

                      return (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            {isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mt-1" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium mb-2">{q.question}</p>
                              <p className="text-sm text-muted-foreground">
                                Sua resposta: {q.options[userAnswer]}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-green-600">
                                  Resposta correta: {q.options[q.correctAnswer]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={completeContent} className="flex-1">
                    Concluir
                  </Button>
                  <Button onClick={() => setStudying(false)} variant="outline">
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{currentContent.title}</CardTitle>
              <CardDescription>
                Pergunta {currentQuestionIndex + 1} de {questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

                <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => setSelectedAnswer(parseInt(value))}>
                  <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleNextQuestion} className="flex-1" disabled={selectedAnswer === null}>
                  {currentQuestionIndex < questions.length - 1 ? "Próxima" : "Ver Resultados"}
                </Button>
                <Button onClick={() => setStudying(false)} variant="outline">
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
