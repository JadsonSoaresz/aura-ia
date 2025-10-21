import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Heart, 
  Users, 
  Sparkles,
  BookOpen,
  MessageSquare,
  BarChart3,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export default function Landing() {
  const { speak, profile } = useAccessibility();

  const handleButtonHover = (text: string) => {
    if (profile.ttsEnabled) {
      speak(text);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16 pt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Educação Inclusiva e Personalizada
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Aprenda no seu ritmo, do seu jeito. Tecnologia de IA que se adapta às suas necessidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="text-lg"
              onMouseEnter={() => handleButtonHover("Botão Começar Agora")}
              onFocus={() => handleButtonHover("Botão Começar Agora")}
            >
              <Link to="/triagem">
                Começar Agora <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-lg"
              onMouseEnter={() => handleButtonHover("Botão Explorar Conteúdos")}
              onFocus={() => handleButtonHover("Botão Explorar Conteúdos")}
            >
              <Link to="/aprender">
                Explorar Conteúdos
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <Card 
            className="border-2 hover:border-primary transition-colors"
            onMouseEnter={() => profile.ttsEnabled && speak("IA Personalizada. Conteúdo adaptado ao seu perfil, estilo de aprendizado e necessidades especiais")}
          >
            <CardHeader>
              <Brain className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>IA Personalizada</CardTitle>
              <CardDescription>
                Conteúdo adaptado ao seu perfil, estilo de aprendizado e necessidades especiais
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="border-2 hover:border-secondary transition-colors"
            onMouseEnter={() => profile.ttsEnabled && speak("100% Inclusivo. Suporte completo para PCD: leitores de tela, alto contraste, múltiplos formatos")}
          >
            <CardHeader>
              <Heart className="h-12 w-12 mb-4 text-secondary" />
              <CardTitle>100% Inclusivo</CardTitle>
              <CardDescription>
                Suporte completo para PCD: leitores de tela, alto contraste, múltiplos formatos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="border-2 hover:border-accent transition-colors"
            onMouseEnter={() => profile.ttsEnabled && speak("Acesso Livre. Sem cadastro, sem barreiras. Entre e comece a aprender imediatamente")}
          >
            <CardHeader>
              <Users className="h-12 w-12 mb-4 text-accent" />
              <CardTitle>Acesso Livre</CardTitle>
              <CardDescription>
                Sem cadastro, sem barreiras. Entre e comece a aprender imediatamente
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Recursos da Plataforma
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card onMouseEnter={() => profile.ttsEnabled && speak("Recomendações Inteligentes. IA analisa seu progresso e sugere próximos conteúdos ideais para você")}>
              <CardHeader>
                <Sparkles className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Recomendações Inteligentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  IA analisa seu progresso e sugere próximos conteúdos ideais para você
                </p>
              </CardContent>
            </Card>

            <Card onMouseEnter={() => profile.ttsEnabled && speak("Chat de Apoio. Tire dúvidas a qualquer momento com nosso tutor virtual inclusivo")}>
              <CardHeader>
                <MessageSquare className="h-8 w-8 mb-2 text-secondary" />
                <CardTitle>Chat de Apoio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tire dúvidas a qualquer momento com nosso tutor virtual inclusivo
                </p>
              </CardContent>
            </Card>

            <Card onMouseEnter={() => profile.ttsEnabled && speak("Acompanhamento. Visualize seu progresso e receba insights sobre seu aprendizado")}>
              <CardHeader>
                <BarChart3 className="h-8 w-8 mb-2 text-accent" />
                <CardTitle>Acompanhamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualize seu progresso e receba insights sobre seu aprendizado
                </p>
              </CardContent>
            </Card>

            <Card onMouseEnter={() => profile.ttsEnabled && speak("Múltiplos Formatos. Texto, áudio, vídeo e atividades interativas adaptadas para você")}>
              <CardHeader>
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Múltiplos Formatos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Texto, áudio, vídeo e atividades interativas adaptadas para você
                </p>
              </CardContent>
            </Card>

            <Card onMouseEnter={() => profile.ttsEnabled && speak("Totalmente Acessível. WCAG 2.1 AA compliant. Navegação por teclado, leitores de tela, alto contraste")}>
              <CardHeader>
                <Heart className="h-8 w-8 mb-2 text-secondary" />
                <CardTitle>Totalmente Acessível</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  WCAG 2.1 AA compliant. Navegação por teclado, leitores de tela, alto contraste
                </p>
              </CardContent>
            </Card>

            <Card onMouseEnter={() => profile.ttsEnabled && speak("Privacidade. Dados armazenados apenas localmente. Você controla suas informações")}>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-accent" />
                <CardTitle>Privacidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dados armazenados apenas localmente. Você controla suas informações
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center bg-card rounded-lg p-8 shadow-soft">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Personalize sua experiência em menos de 2 minutos
          </p>
          <Button 
            asChild 
            size="lg" 
            className="text-lg"
            onMouseEnter={() => handleButtonHover("Botão Iniciar Triagem")}
            onFocus={() => handleButtonHover("Botão Iniciar Triagem")}
          >
            <Link to="/triagem">
              Iniciar Triagem <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
