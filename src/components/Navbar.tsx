import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, BookOpen, MessageSquare, TrendingUp, Video } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import inclutechLogo from "@/assets/inclutech-logo.jpg";

const Navbar = () => {
  const location = useLocation();
  const { speak, profile } = useAccessibility();

  const handleLinkHover = (text: string) => {
    if (profile.ttsEnabled) {
      speak(text);
    }
  };

  const navItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/triagem", label: "Perfil", icon: ClipboardList },
    { path: "/aprender", label: "Aprender", icon: BookOpen },
    { path: "/videoaulas", label: "Vídeo Aulas", icon: Video },
    { path: "/chat", label: "Chat IA", icon: MessageSquare },
    { path: "/progresso", label: "Progresso", icon: TrendingUp },
  ];

  return (
    <nav 
      className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity"
            aria-label="Página inicial - INCLUTECH"
            onMouseEnter={() => handleLinkHover("Página inicial, INCLUTECH")}
            onFocus={() => handleLinkHover("Página inicial, INCLUTECH")}
          >
            <img src={inclutechLogo} alt="INCLUTECH Logo" className="h-8 w-8 object-contain" />
            <span>INCLUTECH</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Ir para ${item.label}`}
                    onMouseEnter={() => handleLinkHover(item.label)}
                    onFocus={() => handleLinkHover(item.label)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu */}
          <div className="flex md:hidden gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-fit ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Ir para ${item.label}`}
                  onMouseEnter={() => handleLinkHover(item.label)}
                  onFocus={() => handleLinkHover(item.label)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
