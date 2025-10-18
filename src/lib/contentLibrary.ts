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
