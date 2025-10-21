import React, { createContext, useContext, useEffect } from "react";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { toast } from "sonner";

interface AccessibilityContextType {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  profile: ReturnType<typeof useSessionProfile>['profile'];
  updateProfile: ReturnType<typeof useSessionProfile>['updateProfile'];
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, updateProfile } = useSessionProfile();
  const { speak, stop, isSpeaking } = useTextToSpeech();

  // Apply accessibility settings
  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", profile.highContrast);
    document.documentElement.setAttribute("data-font-size", profile.fontSize);
  }, [profile.highContrast, profile.fontSize]);

  // Global keyboard shortcuts
  useKeyboardNavigation({
    'Alt+1': () => {
      const newValue = !profile.ttsEnabled;
      updateProfile({ ttsEnabled: newValue });
      speak(newValue ? "Leitor de tela ativado" : "Leitor de tela desativado");
      toast.success(newValue ? "Leitor de tela ativado" : "Leitor de tela desativado");
    },
    'Alt+2': () => {
      const newValue = !profile.highContrast;
      updateProfile({ highContrast: newValue });
      speak(newValue ? "Alto contraste ativado" : "Alto contraste desativado");
      toast.success(newValue ? "Alto contraste ativado" : "Alto contraste desativado");
    },
    'Alt+3': () => {
      const sizes: Array<"pequeno" | "médio" | "grande" | "extra-grande"> = ["pequeno", "médio", "grande", "extra-grande"];
      const currentIndex = sizes.indexOf(profile.fontSize);
      const nextSize = sizes[(currentIndex + 1) % sizes.length];
      updateProfile({ fontSize: nextSize });
      speak(`Tamanho de fonte: ${nextSize}`);
      toast.success(`Tamanho de fonte: ${nextSize}`);
    },
    'Alt+4': () => {
      const newValue = !profile.keyboardOnly;
      updateProfile({ keyboardOnly: newValue });
      speak(newValue ? "Modo teclado ativado" : "Modo teclado desativado");
      toast.success(newValue ? "Modo teclado ativado" : "Modo teclado desativado");
    },
    'Escape': () => {
      stop();
    },
    'Alt+h': () => {
      const helpText = `Atalhos disponíveis:
        Alt + 1: Alternar leitor de tela.
        Alt + 2: Alternar alto contraste.
        Alt + 3: Mudar tamanho da fonte.
        Alt + 4: Alternar modo teclado.
        Escape: Parar narração.
        Alt + H: Ouvir ajuda.`;
      speak(helpText);
    }
  });

  // Auto-read page content when TTS is enabled
  useEffect(() => {
    if (profile.ttsEnabled) {
      const timer = setTimeout(() => {
        const mainContent = document.querySelector('main');
        if (mainContent) {
          const headings = mainContent.querySelectorAll('h1, h2');
          const firstHeading = headings[0]?.textContent;
          if (firstHeading) {
            speak(`Página carregada. ${firstHeading}. Pressione Alt H para ouvir os atalhos de teclado.`);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [profile.ttsEnabled, speak]);

  const contextValue: AccessibilityContextType = {
    speak,
    stop,
    isSpeaking,
    profile,
    updateProfile,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
};
