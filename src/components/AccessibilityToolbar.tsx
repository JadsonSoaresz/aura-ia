import { Button } from "@/components/ui/button";
import { 
  Volume2, 
  VolumeX,
  Contrast, 
  Type, 
  Keyboard,
  Settings,
  Play,
  Pause
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { toast } from "sonner";

export const AccessibilityToolbar = () => {
  const { profile, updateProfile, speak, stop, isSpeaking } = useAccessibility();

  const toggleHighContrast = () => {
    const newValue = !profile.highContrast;
    updateProfile({ highContrast: newValue });
    document.documentElement.classList.toggle("high-contrast", newValue);
    toast.success(newValue ? "Alto contraste ativado" : "Alto contraste desativado");
  };

  const changeFontSize = (size: "pequeno" | "médio" | "grande" | "extra-grande") => {
    updateProfile({ fontSize: size });
    document.documentElement.setAttribute("data-font-size", size);
    toast.success(`Tamanho de fonte: ${size}`);
  };

  const toggleTTS = () => {
    const newValue = !profile.ttsEnabled;
    updateProfile({ ttsEnabled: newValue });
    speak(newValue ? "Leitor de tela ativado" : "Leitor de tela desativado");
    toast.success(newValue ? "Leitor de tela ativado" : "Leitor de tela desativado");
  };

  const handleHelp = () => {
    const helpText = `Bem-vindo às ferramentas de acessibilidade. 
      Botão 1: Ativar ou desativar leitor de tela. Atalho: Alt + 1.
      Botão 2: Ativar ou desativar alto contraste. Atalho: Alt + 2.
      Botão 3: Ajustar tamanho da fonte. Atalho: Alt + 3.
      Botão 4: Modo de navegação por teclado. Atalho: Alt + 4.
      Pressione Escape para parar a narração a qualquer momento.`;
    speak(helpText);
  };

  const toggleKeyboardMode = () => {
    const newValue = !profile.keyboardOnly;
    updateProfile({ keyboardOnly: newValue });
    toast.success(newValue ? "Modo teclado ativado" : "Modo teclado desativado");
  };

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-card/95 backdrop-blur-sm p-3 rounded-lg shadow-glow border-2"
      role="toolbar"
      aria-label="Barra de ferramentas de acessibilidade"
    >
      <Button
        variant={profile.ttsEnabled ? "default" : "outline"}
        size="icon"
        onClick={toggleTTS}
        aria-label="Alternar leitor de tela. Atalho: Alt + 1"
        title="Leitor de tela (Alt+1)"
        onMouseEnter={() => profile.ttsEnabled && speak("Botão de leitor de tela")}
      >
        {profile.ttsEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>

      <Button
        variant={isSpeaking ? "default" : "outline"}
        size="icon"
        onClick={isSpeaking ? stop : undefined}
        aria-label="Parar narração"
        title="Parar narração (Esc)"
        disabled={!isSpeaking}
        onMouseEnter={() => profile.ttsEnabled && speak("Parar narração")}
      >
        {isSpeaking ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>

      <Button
        variant={profile.highContrast ? "default" : "outline"}
        size="icon"
        onClick={toggleHighContrast}
        aria-label="Alternar alto contraste. Atalho: Alt + 2"
        title="Alto contraste (Alt+2)"
        onMouseEnter={() => profile.ttsEnabled && speak("Botão de alto contraste")}
      >
        <Contrast className="h-5 w-5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Tamanho da fonte. Atalho: Alt + 3"
            title="Ajustar tamanho da fonte (Alt+3)"
            onMouseEnter={() => profile.ttsEnabled && speak("Botão de tamanho da fonte")}
          >
            <Type className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Tamanho da Fonte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => changeFontSize("pequeno")}
            onMouseEnter={() => profile.ttsEnabled && speak("Pequeno")}
          >
            Pequeno
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => changeFontSize("médio")}
            onMouseEnter={() => profile.ttsEnabled && speak("Médio, padrão")}
          >
            Médio (padrão)
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => changeFontSize("grande")}
            onMouseEnter={() => profile.ttsEnabled && speak("Grande")}
          >
            Grande
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => changeFontSize("extra-grande")}
            onMouseEnter={() => profile.ttsEnabled && speak("Extra Grande")}
          >
            Extra Grande
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant={profile.keyboardOnly ? "default" : "outline"}
        size="icon"
        onClick={toggleKeyboardMode}
        aria-label="Modo navegação por teclado. Atalho: Alt + 4"
        title="Navegação por teclado (Alt+4)"
        onMouseEnter={() => profile.ttsEnabled && speak("Botão de navegação por teclado")}
      >
        <Keyboard className="h-5 w-5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Mais opções de acessibilidade"
            onMouseEnter={() => profile.ttsEnabled && speak("Botão de configurações")}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Preferências</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleHelp}
            onMouseEnter={() => profile.ttsEnabled && speak("Ouvir ajuda e atalhos")}
          >
            Ouvir Ajuda (Alt+H)
          </DropdownMenuItem>
          <DropdownMenuItem
            onMouseEnter={() => profile.ttsEnabled && speak("Atalhos de teclado")}
          >
            Atalhos de Teclado
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
