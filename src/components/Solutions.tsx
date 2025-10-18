import { Card } from "@/components/ui/card";
import { Brain, Glasses, Bot } from "lucide-react";
import aiImage from "@/assets/ai-inclusion.jpg";
import vrImage from "@/assets/vr-learning.jpg";
import robotImage from "@/assets/robot-guide.jpg";

const solutions = [
  {
    icon: Brain,
    title: "Plataforma de IA Inclusiva",
    description: "Inteligência artificial que analisa o perfil do aluno e sugere métodos personalizados: áudio, vídeo, braile digital ou linguagem simplificada.",
    features: [
      "Personalização automática do conteúdo",
      "Detecção de dificuldades de aprendizagem",
      "Alertas para professores sobre questões emocionais",
      "Adaptação em tempo real",
    ],
    image: aiImage,
    gradient: "bg-gradient-primary",
  },
  {
    icon: Glasses,
    title: "Realidade Aumentada e Virtual",
    description: "Aulas imersivas que eliminam barreiras físicas, permitindo visitas virtuais a museus, laboratórios e locais históricos.",
    features: [
      "Experiências imersivas sem sair da sala",
      "Simulações interativas em VR",
      "Acessibilidade para mobilidade reduzida",
      "Aprendizado prático e envolvente",
    ],
    image: vrImage,
    gradient: "bg-gradient-secondary",
  },
  {
    icon: Bot,
    title: "Robôs de Inclusão",
    description: "Robótica assistiva que auxilia alunos com deficiência visual e física, facilitando a navegação e interação no ambiente escolar.",
    features: [
      "Robôs-guia para alunos cegos",
      "Assistência em tempo real",
      "Navegação autônoma pela escola",
      "Interface por voz e toque",
    ],
    image: robotImage,
    gradient: "bg-gradient-primary",
  },
];

const Solutions = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Nossa{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Solução Tecnológica
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Três pilares tecnológicos que revolucionam a educação e garantem 
            acessibilidade total para todos os estudantes.
          </p>
        </div>
        
        <div className="space-y-12 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className={`overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 0 ? "" : "lg:grid-flow-dense"}`}>
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 0 ? "" : "lg:col-start-2"}`}>
                  <div className={`inline-flex p-4 rounded-xl ${solution.gradient} w-fit mb-6 shadow-soft`}>
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-foreground">
                    {solution.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`relative ${index % 2 === 0 ? "" : "lg:col-start-1 lg:row-start-1"}`}>
                  <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${solution.gradient} opacity-20`} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
