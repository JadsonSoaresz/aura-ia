import { LearningFormat, DifficultyLevel } from "@/types/profile";

export interface LearningContent {
  id: string;
  title: string;
  description: string;
  format: LearningFormat;
  difficulty: DifficultyLevel;
  topic: string;
  duration: number;
  tags: string[];
  content: string;
  videoUrl?: string;
  audioUrl?: string;
  interactiveElements?: any;
}

export const CONTENT_LIBRARY: LearningContent[] = [
  {
    id: "1",
    title: "Introdução à Programação",
    description: "Aprenda os conceitos básicos de programação de forma acessível",
    format: "texto",
    difficulty: "fácil",
    topic: "Tecnologia",
    duration: 15,
    tags: ["programação", "iniciante", "lógica"],
    content: `# Introdução à Programação

A programação é como dar instruções para um computador seguir. É uma forma de resolver problemas usando código.

## Conceitos Básicos

**Variáveis**: São como caixas que guardam informações.

**Condicionais**: Permitem tomar decisões no código (se isso, então aquilo).

**Loops**: Repetir ações múltiplas vezes.

Vamos começar devagar e construir seu conhecimento passo a passo!`
  },
  {
    id: "2",
    title: "Matemática Básica Visual",
    description: "Aprenda operações matemáticas com exemplos visuais",
    format: "interativo",
    difficulty: "fácil",
    topic: "Matemática",
    duration: 20,
    tags: ["matemática", "visual", "básico"],
    content: "Conteúdo interativo com visualizações matemáticas"
  },
  {
    id: "3",
    title: "História do Brasil",
    description: "Descubra os principais eventos da história brasileira",
    format: "audio",
    difficulty: "médio",
    topic: "História",
    duration: 25,
    tags: ["história", "brasil", "cultura"],
    content: "Narrativa histórica sobre o Brasil"
  },
  {
    id: "4",
    title: "Ciências: O Corpo Humano",
    description: "Explore como funciona nosso corpo de forma simplificada",
    format: "video",
    difficulty: "médio",
    topic: "Ciências",
    duration: 18,
    tags: ["ciências", "biologia", "saúde"],
    content: "Vídeo educativo sobre anatomia humana",
    videoUrl: "https://example.com/corpo-humano"
  },
  {
    id: "5",
    title: "Inglês Básico para Iniciantes",
    description: "Primeiras palavras e frases em inglês",
    format: "audio",
    difficulty: "fácil",
    topic: "Idiomas",
    duration: 15,
    tags: ["inglês", "idiomas", "iniciante"],
    content: "Lições de vocabulário básico em inglês"
  },
  {
    id: "6",
    title: "Geografia Mundial: Continentes e Oceanos",
    description: "Explore a geografia do nosso planeta",
    format: "texto",
    difficulty: "médio",
    topic: "Geografia",
    duration: 22,
    tags: ["geografia", "mundo", "mapas"],
    content: "Estudo completo sobre continentes, oceanos e características geográficas"
  },
  {
    id: "7",
    title: "Física Quântica Introdutória",
    description: "Conceitos fundamentais de física moderna",
    format: "video",
    difficulty: "difícil",
    topic: "Física",
    duration: 35,
    tags: ["física", "quântica", "avançado"],
    content: "Introdução aos princípios da mecânica quântica"
  },
  {
    id: "8",
    title: "Química Orgânica Avançada",
    description: "Estruturas moleculares e reações químicas complexas",
    format: "texto",
    difficulty: "difícil",
    topic: "Química",
    duration: 40,
    tags: ["química", "orgânica", "moléculas"],
    content: "Estudo aprofundado de compostos orgânicos e suas reações"
  },
  {
    id: "9",
    title: "Literatura Brasileira: Machado de Assis",
    description: "Análise crítica das obras de Machado de Assis",
    format: "texto",
    difficulty: "difícil",
    topic: "Literatura",
    duration: 30,
    tags: ["literatura", "brasil", "análise"],
    content: "Estudo detalhado das principais obras e estilo literário machadiano"
  },
  {
    id: "10",
    title: "Filosofia: Pensadores Clássicos",
    description: "Das ideias de Platão a Aristóteles",
    format: "audio",
    difficulty: "médio",
    topic: "Filosofia",
    duration: 28,
    tags: ["filosofia", "história", "pensamento"],
    content: "Exploração das principais correntes filosóficas clássicas"
  },
  {
    id: "11",
    title: "Arte Renascentista",
    description: "Mestres da pintura e escultura do Renascimento",
    format: "video",
    difficulty: "médio",
    topic: "Arte",
    duration: 25,
    tags: ["arte", "história", "renascimento"],
    content: "Análise das obras de Leonardo da Vinci, Michelangelo e Rafael"
  },
  {
    id: "12",
    title: "Economia: Sistemas Econômicos",
    description: "Capitalismo, socialismo e economia mista",
    format: "texto",
    difficulty: "difícil",
    topic: "Economia",
    duration: 32,
    tags: ["economia", "sistemas", "política"],
    content: "Análise comparativa dos principais sistemas econômicos"
  },
  {
    id: "13",
    title: "Biologia Celular Avançada",
    description: "Processos celulares e genética molecular",
    format: "interativo",
    difficulty: "difícil",
    topic: "Biologia",
    duration: 38,
    tags: ["biologia", "células", "genética"],
    content: "Estudo aprofundado de processos celulares e DNA"
  },
  {
    id: "14",
    title: "Astronomia: O Sistema Solar",
    description: "Planetas, luas e outros corpos celestes",
    format: "video",
    difficulty: "médio",
    topic: "Astronomia",
    duration: 27,
    tags: ["astronomia", "espaço", "planetas"],
    content: "Exploração completa do nosso sistema solar"
  },
  {
    id: "15",
    title: "Espanhol Intermediário",
    description: "Conversação e gramática avançada",
    format: "audio",
    difficulty: "médio",
    topic: "Idiomas",
    duration: 23,
    tags: ["espanhol", "idiomas", "intermediário"],
    content: "Aulas de conversação e gramática em nível intermediário"
  },
  {
    id: "16",
    title: "História da Arte Contemporânea",
    description: "Movimentos artísticos do século XX",
    format: "texto",
    difficulty: "difícil",
    topic: "Arte",
    duration: 33,
    tags: ["arte", "contemporânea", "movimentos"],
    content: "Análise crítica dos principais movimentos artísticos modernos"
  },
  {
    id: "17",
    title: "Matemática: Cálculo Diferencial",
    description: "Fundamentos de derivadas e integrais",
    format: "texto",
    difficulty: "difícil",
    topic: "Matemática",
    duration: 45,
    tags: ["matemática", "cálculo", "avançado"],
    content: "Introdução ao cálculo diferencial e integral"
  },
  {
    id: "18",
    title: "Sociologia: Estruturas Sociais",
    description: "Compreendendo as dinâmicas da sociedade",
    format: "audio",
    difficulty: "médio",
    topic: "Sociologia",
    duration: 26,
    tags: ["sociologia", "sociedade", "cultura"],
    content: "Estudo das estruturas e relações sociais"
  }
];

export const getContentById = (id: string): LearningContent | undefined => {
  return CONTENT_LIBRARY.find(c => c.id === id);
};

export const getContentByTopic = (topic: string): LearningContent[] => {
  return CONTENT_LIBRARY.filter(c => c.topic === topic);
};

export const getContentByFormat = (format: LearningFormat): LearningContent[] => {
  return CONTENT_LIBRARY.filter(c => c.format === format);
};

export const getAllTopics = (): string[] => {
  return Array.from(new Set(CONTENT_LIBRARY.map(c => c.topic)));
};
