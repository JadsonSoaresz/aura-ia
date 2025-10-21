import { useEffect } from "react";

interface KeyboardShortcuts {
  [key: string]: () => void;
}

export const useKeyboardNavigation = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Create a key combination string (e.g., "Alt+1", "Ctrl+Shift+K")
      const modifiers = [];
      if (event.ctrlKey) modifiers.push('Ctrl');
      if (event.altKey) modifiers.push('Alt');
      if (event.shiftKey) modifiers.push('Shift');
      
      const key = event.key;
      const combination = modifiers.length > 0 ? `${modifiers.join('+')}+${key}` : key;

      // Check if this combination has a handler
      if (shortcuts[combination]) {
        event.preventDefault();
        shortcuts[combination]();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [shortcuts]);
};
