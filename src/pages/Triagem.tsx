import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import Navbar from "@/components/Navbar";
import { LearningFormat, DifficultyLevel, SupportType } from "@/types/profile";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Triagem() {
  const navigate = useNavigate();
  const { updateProfile } = useSessionProfile();
  const { speak, profile: accessibilityProfile } = useAccessibility();

  // State declarations
  const [step, setStep] = useState(1);
  const [format, setFormat] = useState<LearningFormat>("texto");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("médio");
  const [needsSupport, setNeedsSupport] = useState(false);
  const [supportType, setSupportType] = useState<SupportType>("visual");
  const [interests, setInterests] = useState<string[]>([]);

  const availableInterests = [
    "Tecnologia",
    "Matemática",
    "Ciências",
    "História",
    "Idiomas",
    "Arte",
    "Música"
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Initial page announcement
  useEffect(() => {
    if (accessibilityProfile.ttsEnabled) {
      const timer = setTimeout(() => {
        speak("Página de personalização de perfil. Aqui você responderá algumas perguntas para personalizarmos sua experiência de aprendizado, incluindo formato preferido, nível de dificuldade, necessidades de acessibilidade e áreas de interesse.");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Speak questions and options when step changes
  useEffect(() => {
    if (!accessibilityProfile.ttsEnabled) return;

    const timer = setTimeout(() => {
      let message = "";
      
      if (step === 1) {
        message = "Pergunta 1 de 4: Formato de Aprendizado. Como você prefere consumir conteúdos educacionais? Pressione 1 para Texto, 2 para Áudio, 3 para Vídeo, ou 4 para Interativo.";
      } else if (step === 2) {
        message = "Pergunta 2 de 4: Nível de Dificuldade. Qual nível você se sente mais confortável começando? Pressione 1 para Fácil, 2 para Médio, ou 3 para Difícil.";
      } else if (step === 3) {
        message = "Pergunta 3 de 4: Necessidades de Acessibilidade. Você precisa de adaptações especiais? Pressione 1 para Não preciso, 2 para Visual, 3 para Auditivo, 4 para Motor, 5 para Cognitivo, ou 6 para Múltiplo.";
      } else if (step === 4) {
        message = "Pergunta 4 de 4: Áreas de Interesse. Selecione os temas que você gostaria de aprender. Pressione os números de 1 a 7 para selecionar: 1 para Tecnologia, 2 para Matemática, 3 para Ciências, 4 para História, 5 para Idiomas, 6 para Arte, 7 para Música. Pressione Enter para continuar.";
      }
      
      speak(message);
    }, 500);

    return () => clearTimeout(timer);
  }, [step, accessibilityProfile.ttsEnabled, speak]);

  // Keyboard navigation for answering
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (step === 1) {
        if (key === '1') {
          setFormat("texto");
          if (accessibilityProfile.ttsEnabled) speak("Texto selecionado. Pressione Enter para continuar.");
        } else if (key === '2') {
          setFormat("audio");
          if (accessibilityProfile.ttsEnabled) speak("Áudio selecionado. Pressione Enter para continuar.");
        } else if (key === '3') {
          setFormat("video");
          if (accessibilityProfile.ttsEnabled) speak("Vídeo selecionado. Pressione Enter para continuar.");
        } else if (key === '4') {
          setFormat("interativo");
          if (accessibilityProfile.ttsEnabled) speak("Interativo selecionado. Pressione Enter para continuar.");
        }
      } else if (step === 2) {
        if (key === '1') {
          setDifficulty("fácil");
          if (accessibilityProfile.ttsEnabled) speak("Fácil selecionado. Pressione Enter para continuar.");
        } else if (key === '2') {
          setDifficulty("médio");
          if (accessibilityProfile.ttsEnabled) speak("Médio selecionado. Pressione Enter para continuar.");
        } else if (key === '3') {
          setDifficulty("difícil");
          if (accessibilityProfile.ttsEnabled) speak("Difícil selecionado. Pressione Enter para continuar.");
        }
      } else if (step === 3) {
        if (key === '1') {
          setNeedsSupport(false);
          if (accessibilityProfile.ttsEnabled) speak("Não preciso de adaptações. Pressione Enter para continuar.");
        } else if (key === '2') {
          setNeedsSupport(true);
          setSupportType("visual");
          if (accessibilityProfile.ttsEnabled) speak("Visual selecionado. Pressione Enter para continuar.");
        } else if (key === '3') {
          setNeedsSupport(true);
          setSupportType("auditivo");
          if (accessibilityProfile.ttsEnabled) speak("Auditivo selecionado. Pressione Enter para continuar.");
        } else if (key === '4') {
          setNeedsSupport(true);
          setSupportType("motor");
          if (accessibilityProfile.ttsEnabled) speak("Motor selecionado. Pressione Enter para continuar.");
        } else if (key === '5') {
          setNeedsSupport(true);
          setSupportType("cognitivo");
          if (accessibilityProfile.ttsEnabled) speak("Cognitivo selecionado. Pressione Enter para continuar.");
        } else if (key === '6') {
          setNeedsSupport(true);
          setSupportType("múltiplo");
          if (accessibilityProfile.ttsEnabled) speak("Múltiplo selecionado. Pressione Enter para continuar.");
        }
      } else if (step === 4) {
        const interestMap: { [key: string]: string } = {
          '1': 'Tecnologia',
          '2': 'Matemática',
          '3': 'Ciências',
          '4': 'História',
          '5': 'Idiomas',
          '6': 'Arte',
          '7': 'Música'
        };
        
        if (interestMap[key]) {
          toggleInterest(interestMap[key]);
          if (accessibilityProfile.ttsEnabled) {
            const willBeSelected = !interests.includes(interestMap[key]);
            speak(willBeSelected ? `${interestMap[key]} selecionado` : `${interestMap[key]} desmarcado`);
          }
        }
      }

      // Navigate with Enter and Arrow Left
      if (key === 'Enter') {
        if (step < 4) {
          setStep(step + 1);
        } else {
          handleComplete();
        }
      } else if (key === 'ArrowLeft' && step > 1) {
        setStep(step - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step, format, difficulty, needsSupport, supportType, interests, accessibilityProfile.ttsEnabled, speak]);

  const handleComplete = () => {
    updateProfile({
      format,
      difficulty,
      needsSupport,
      supportType: needsSupport ? supportType : undefined,
      interests,
    });
    toast.success("Perfil configurado com sucesso!");
    navigate("/aprender");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Personalização de Perfil</h1>
          <p className="text-lg text-muted-foreground">
            Responda algumas perguntas para personalizarmos sua experiência
          </p>
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
                role="progressbar"
                aria-valuenow={step}
                aria-valuemin={1}
                aria-valuemax={4}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Formato de Aprendizado</CardTitle>
              <CardDescription>
                Como você prefere consumir conteúdos educacionais?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={format} onValueChange={(v) => setFormat(v as LearningFormat)}>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="texto" id="texto" />
                  <Label htmlFor="texto" className="cursor-pointer">
                    Texto - Ler artigos e materiais escritos
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="audio" id="audio" />
                  <Label htmlFor="audio" className="cursor-pointer">
                    Áudio - Ouvir explicações e podcasts
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="cursor-pointer">
                    Vídeo - Assistir aulas e tutoriais
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="interativo" id="interativo" />
                  <Label htmlFor="interativo" className="cursor-pointer">
                    Interativo - Praticar com exercícios dinâmicos
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Nível de Dificuldade</CardTitle>
              <CardDescription>
                Qual nível você se sente mais confortável começando?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={difficulty} onValueChange={(v) => setDifficulty(v as DifficultyLevel)}>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="fácil" id="facil" />
                  <Label htmlFor="facil" className="cursor-pointer">
                    Fácil - Estou começando agora
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="médio" id="medio" />
                  <Label htmlFor="medio" className="cursor-pointer">
                    Médio - Tenho algum conhecimento básico
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="difícil" id="dificil" />
                  <Label htmlFor="dificil" className="cursor-pointer">
                    Difícil - Quero desafios avançados
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Necessidades de Acessibilidade</CardTitle>
              <CardDescription>
                Você precisa de adaptações especiais para aprender melhor?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="needsSupport"
                  checked={needsSupport}
                  onCheckedChange={(checked) => setNeedsSupport(checked as boolean)}
                />
                <Label htmlFor="needsSupport" className="cursor-pointer">
                  Sim, preciso de adaptações
                </Label>
              </div>

              {needsSupport && (
                <RadioGroup value={supportType} onValueChange={(v) => setSupportType(v as SupportType)}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="visual" id="visual" />
                    <Label htmlFor="visual" className="cursor-pointer">
                      Visual - Deficiência visual ou baixa visão
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="auditivo" id="auditivo" />
                    <Label htmlFor="auditivo" className="cursor-pointer">
                      Auditivo - Deficiência auditiva
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="motor" id="motor" />
                    <Label htmlFor="motor" className="cursor-pointer">
                      Motor - Dificuldades motoras
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="cognitivo" id="cognitivo" />
                    <Label htmlFor="cognitivo" className="cursor-pointer">
                      Cognitivo - Necessidades cognitivas especiais
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="múltiplo" id="multiplo" />
                    <Label htmlFor="multiplo" className="cursor-pointer">
                      Múltiplo - Combinação de necessidades
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Áreas de Interesse</CardTitle>
              <CardDescription>
                Selecione os temas que você gostaria de aprender (opcional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {availableInterests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={interests.includes(interest)}
                      onCheckedChange={() => toggleInterest(interest)}
                    />
                    <Label htmlFor={interest} className="cursor-pointer">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4 mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-2" /> Voltar
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)} className="ml-auto">
              Próximo <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="ml-auto">
              Concluir e Começar <ArrowRight className="ml-2" />
            </Button>
          )}
        </div>

        <div className="text-center mt-6">
          <Button variant="ghost" onClick={() => navigate("/aprender")}>
            Pular triagem e explorar
          </Button>
        </div>
      </main>
    </div>
  );
}
