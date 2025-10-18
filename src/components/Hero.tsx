import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Educação Inclusiva do Futuro</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Tecnologia que{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Transforma
              </span>{" "}
              a Educação
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Plataforma inovadora que combina Inteligência Artificial, Realidade Virtual 
              e Robótica para criar experiências de aprendizado verdadeiramente inclusivas 
              e personalizadas para todos os alunos.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group shadow-glow hover:shadow-glow/70 transition-all">
                Conhecer a Plataforma
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Ver Demonstração
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Acessível</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">IA</div>
                <div className="text-sm text-muted-foreground">Personalizada</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">AR/VR</div>
                <div className="text-sm text-muted-foreground">Imersivo</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-150">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img
                src={heroImage}
                alt="Estudantes diversos usando tecnologia educacional inclusiva"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-20" />
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
