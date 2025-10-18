import { Button } from "@/components/ui/button";
import { 
  Volume2, 
  Contrast, 
  Type, 
  Keyboard,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import { toast } from "sonner";

export const AccessibilityToolbar = () => {
  const { profile, updateProfile } = useSessionProfile();

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
    toast.success(newValue ? "Leitor de tela ativado" : "Leitor de tela desativado");
  };

  const toggleKeyboardMode = () => {
    const newValue = !profile.keyboardOnly;
    updateProfile({ keyboardOnly: newValue });
    toast.success(newValue ? "Modo teclado ativado" : "Modo teclado desativado");
  };

  return (
    <div 
      className="fixed top-4 right-4 z-50 flex gap-2 bg-card/95 backdrop-blur-sm p-2 rounded-lg shadow-soft border"
      role="toolbar"
      aria-label="Barra de ferramentas de acessibilidade"
    >
      <Button
        variant={profile.ttsEnabled ? "default" : "outline"}
        size="icon"
        onClick={toggleTTS}
        aria-label="Alternar leitor de tela"
        title="Leitor de tela (Alt+1)"
      >
        <Volume2 className="h-4 w-4" />
      </Button>

      <Button
        variant={profile.highContrast ? "default" : "outline"}
        size="icon"
        onClick={toggleHighContrast}
        aria-label="Alternar alto contraste"
        title="Alto contraste (Alt+2)"
      >
        <Contrast className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Tamanho da fonte"
            title="Ajustar tamanho da fonte (Alt+3)"
          >
            <Type className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Tamanho da Fonte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => changeFontSize("pequeno")}>
            Pequeno
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeFontSize("médio")}>
            Médio (padrão)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeFontSize("grande")}>
            Grande
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeFontSize("extra-grande")}>
            Extra Grande
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant={profile.keyboardOnly ? "default" : "outline"}
        size="icon"
        onClick={toggleKeyboardMode}
        aria-label="Modo navegação por teclado"
        title="Navegação por teclado (Alt+4)"
      >
        <Keyboard className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Mais opções de acessibilidade"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Preferências</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ver Tutorial</DropdownMenuItem>
          <DropdownMenuItem>Atalhos de Teclado</DropdownMenuItem>
          <DropdownMenuItem>Redefinir Configurações</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
