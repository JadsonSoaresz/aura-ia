import { Card } from "@/components/ui/card";
import { BookOpen, Briefcase, Users, Rocket, Heart } from "lucide-react";

const problems = [
  {
    icon: BookOpen,
    title: "Velocidade da Tecnologia",
    description: "A educação tradicional não acompanha a rápida evolução tecnológica do mercado.",
  },
  {
    icon: Briefcase,
    title: "Desconexão com o Mercado",
    description: "Falta de conexão entre o ambiente escolar e o mundo do trabalho criativo e empreendedor.",
  },
  {
    icon: Users,
    title: "Aprendizado Único",
    description: "Alunos têm diferentes estilos de aprendizado, mas recebem o mesmo conteúdo padronizado.",
  },
  {
    icon: Rocket,
    title: "Profissões do Futuro",
    description: "Pouca preparação para as carreiras emergentes e profissões que ainda serão criadas.",
  },
  {
    icon: Heart,
    title: "Inclusão e Acessibilidade",
    description: "Recursos inadequados para estudantes com deficiências ou em situação de vulnerabilidade social.",
  },
];

const Problems = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Os Desafios da{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Educação Atual
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Identificamos os principais obstáculos que impedem uma educação verdadeiramente 
            inclusiva e preparada para o futuro.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm group"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-primary">
                <problem.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
