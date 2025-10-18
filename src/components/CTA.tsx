import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Pronto para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Revolucionar
            </span>{" "}
            a Educação?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Junte-se a nós na missão de criar uma educação verdadeiramente inclusiva, 
            acessível e preparada para o futuro.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" className="group shadow-glow hover:shadow-glow/70">
              Agendar Demonstração
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Mail className="mr-2 w-4 h-4" />
              Entrar em Contato
            </Button>
          </div>
          
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-muted-foreground">Inclusivo</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                3
              </div>
              <div className="text-sm text-muted-foreground">Tecnologias</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-sm text-muted-foreground">Possibilidades</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PCD
              </div>
              <div className="text-sm text-muted-foreground">Acessível</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
