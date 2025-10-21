import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface AccessibleButtonProps extends ButtonProps {
  speakText?: string;
}

export const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ speakText, children, ...props }, ref) => {
    const { speak, profile } = useAccessibility();

    const handleInteraction = () => {
      if (profile.ttsEnabled && speakText) {
        speak(speakText);
      }
    };

    return (
      <Button
        ref={ref}
        onMouseEnter={handleInteraction}
        onFocus={handleInteraction}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AccessibleButton.displayName = "AccessibleButton";
