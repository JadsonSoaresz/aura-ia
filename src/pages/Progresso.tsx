import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import { supabase } from "@/integrations/supabase/client";
import { PerformanceAnalysis } from "@/types/profile";
import { ArrowLeft, TrendingUp, Award, Target, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Progresso() {
  const { profile, history } = useSessionProfile();
  const [analysis, setAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    if (history.length === 0) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-performance", {
        body: {
          history: history.slice(0, 10),
          sessionProfile: profile
        },
      });

      if (error) throw error;
      setAnalysis(data);
    } catch (error) {
      console.error("Error loading analysis:", error);
      toast.error("Erro ao carregar análise");
    } finally {
      setLoading(false);
    }
  };

  const avgScore = history.length > 0
    ? Math.round(history.reduce((sum, h) => sum + h.score, 0) / history.length)
    : 0;

  const totalTime = history.reduce((sum, h) => sum + h.timeSpent, 0);

  const topicStats = history.reduce((acc, h) => {
    if (!acc[h.topic]) {
      acc[h.topic] = { count: 0, totalScore: 0 };
    }
    acc[h.topic].count++;
    acc[h.topic].totalScore += h.score;
    return acc;
  }, {} as Record<string, { count: number; totalScore: number }>);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AccessibilityToolbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="ghost" size="icon">
            <Link to="/aprender">
              <ArrowLeft />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold">Meu Progresso</h1>
            <p className="text-muted-foreground">Acompanhe sua evolução no aprendizado</p>
          </div>
        </div>

        {history.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                Você ainda não completou nenhuma atividade.
              </p>
              <Button asChild>
                <Link to="/aprender">Começar a Aprender</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Desempenho Médio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">{avgScore}%</div>
                  <Progress value={avgScore} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-secondary" />
                    Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{history.length}</div>
                  <p className="text-sm text-muted-foreground">concluídas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Tempo Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{totalTime}</div>
                  <p className="text-sm text-muted-foreground">minutos estudados</p>
                </CardContent>
              </Card>
            </div>

            {loading ? (
              <Card>
                <CardContent className="py-12 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Analisando seu desempenho...</span>
                </CardContent>
              </Card>
            ) : analysis ? (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Análise de Desempenho</CardTitle>
                  <CardDescription>
                    Insights gerados por IA baseados no seu histórico
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Pontuação Geral
                    </h3>
                    <div className="flex items-center gap-4">
                      <Progress value={analysis.overallScore} className="flex-1 h-3" />
                      <span className="text-2xl font-bold">{analysis.overallScore}%</span>
                    </div>
                  </div>

                  {analysis.insights.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Insights</h3>
                      <ul className="space-y-2">
                        {analysis.insights.map((insight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.strengths.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-accent">Pontos Fortes</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.strengths.map((strength, idx) => (
                          <span
                            key={idx}
                            className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.improvements.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-secondary">Áreas para Melhorar</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.improvements.map((improvement, idx) => (
                          <span
                            key={idx}
                            className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                          >
                            {improvement}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.recommendation && (
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Próximo Passo Recomendado</h3>
                      <p>{analysis.recommendation}</p>
                    </div>
                  )}

                  <Button onClick={loadAnalysis} variant="outline" className="w-full">
                    Atualizar Análise
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Tópico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(topicStats).map(([topic, stats]) => (
                    <div key={topic}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{topic}</span>
                        <span className="text-sm text-muted-foreground">
                          {stats.count} atividades • {Math.round(stats.totalScore / stats.count)}%
                        </span>
                      </div>
                      <Progress value={Math.round(stats.totalScore / stats.count)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Histórico Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {history.slice(0, 10).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.topic} • {activity.timeSpent} min
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{activity.score}%</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {activity.difficulty}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
