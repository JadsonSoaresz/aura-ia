export interface VideoLesson {
  id: string;
  title: string;
  subject: string;
  description: string;
  youtubeId: string;
  duration: string;
  level: "Básico" | "Intermediário" | "Avançado";
  tags: string[];
}

export const VIDEO_LIBRARY: VideoLesson[] = [
  // Matemática
  {
    id: "1",
    title: "Introdução à Álgebra",
    subject: "Matemática",
    description: "Conceitos básicos de álgebra e equações",
    youtubeId: "NybHckSEQBI",
    duration: "15:32",
    level: "Básico",
    tags: ["álgebra", "equações", "matemática básica"]
  },
  {
    id: "2",
    title: "Geometria - Áreas e Perímetros",
    subject: "Matemática",
    description: "Cálculo de áreas e perímetros de figuras planas",
    youtubeId: "WO0vRECEvLc",
    duration: "12:45",
    level: "Básico",
    tags: ["geometria", "áreas", "perímetros"]
  },
  {
    id: "3",
    title: "Funções Matemáticas",
    subject: "Matemática",
    description: "Entendendo funções e gráficos",
    youtubeId: "rHLEWRxRGiM",
    duration: "18:20",
    level: "Intermediário",
    tags: ["funções", "gráficos", "análise"]
  },
  
  // Programação
  {
    id: "4",
    title: "Python para Iniciantes",
    subject: "Programação",
    description: "Primeiros passos com Python",
    youtubeId: "_uQrJ0TkZlc",
    duration: "25:15",
    level: "Básico",
    tags: ["python", "programação", "iniciante"]
  },
  {
    id: "5",
    title: "JavaScript Básico",
    subject: "Programação",
    description: "Fundamentos de JavaScript",
    youtubeId: "Ptbk2af68e8",
    duration: "30:45",
    level: "Básico",
    tags: ["javascript", "web", "programação"]
  },
  {
    id: "6",
    title: "Algoritmos e Lógica",
    subject: "Programação",
    description: "Estruturas de dados e algoritmos",
    youtubeId: "8mei6uVttho",
    duration: "22:10",
    level: "Intermediário",
    tags: ["algoritmos", "lógica", "estruturas"]
  },

  // Ciências
  {
    id: "7",
    title: "Biologia - A Célula",
    subject: "Ciências",
    description: "Estrutura e função das células",
    youtubeId: "URUJD5NEXC8",
    duration: "14:30",
    level: "Básico",
    tags: ["biologia", "célula", "vida"]
  },
  {
    id: "8",
    title: "Física - Mecânica Básica",
    subject: "Ciências",
    description: "Movimento e forças",
    youtubeId: "ZM8ECpBuQYE",
    duration: "16:55",
    level: "Intermediário",
    tags: ["física", "mecânica", "movimento"]
  },
  {
    id: "9",
    title: "Química - Tabela Periódica",
    subject: "Ciências",
    description: "Entendendo os elementos químicos",
    youtubeId: "rz4Dd1I_fX0",
    duration: "13:40",
    level: "Básico",
    tags: ["química", "elementos", "tabela periódica"]
  },

  // História
  {
    id: "10",
    title: "História do Brasil - Descobrimento",
    subject: "História",
    description: "A chegada dos portugueses ao Brasil",
    youtubeId: "lJfKZHj_BVk",
    duration: "20:15",
    level: "Básico",
    tags: ["brasil", "história", "descobrimento"]
  },
  {
    id: "11",
    title: "Segunda Guerra Mundial",
    subject: "História",
    description: "Principais eventos da Segunda Guerra",
    youtubeId: "1e_dbsVQrk4",
    duration: "25:30",
    level: "Intermediário",
    tags: ["guerra", "história mundial", "século XX"]
  },

  // Inglês
  {
    id: "12",
    title: "Inglês para Iniciantes - Parte 1",
    subject: "Idiomas",
    description: "Vocabulário e frases básicas",
    youtubeId: "wDheBVw6Q5w",
    duration: "18:20",
    level: "Básico",
    tags: ["inglês", "vocabulário", "iniciante"]
  },
  {
    id: "13",
    title: "Conversação em Inglês",
    subject: "Idiomas",
    description: "Praticando diálogos do dia a dia",
    youtubeId: "LoVW_F8fwHI",
    duration: "22:45",
    level: "Intermediário",
    tags: ["inglês", "conversação", "prática"]
  },

  // Geografia
  {
    id: "14",
    title: "Geografia do Brasil",
    subject: "Geografia",
    description: "Regiões e características do Brasil",
    youtubeId: "qN9Lk8RfZzE",
    duration: "17:25",
    level: "Básico",
    tags: ["geografia", "brasil", "regiões"]
  },
  {
    id: "15",
    title: "Clima e Meio Ambiente",
    subject: "Geografia",
    description: "Mudanças climáticas e sustentabilidade",
    youtubeId: "EtW2rrLHs08",
    duration: "19:50",
    level: "Intermediário",
    tags: ["clima", "meio ambiente", "sustentabilidade"]
  }
];

export const getVideosBySubject = (subject: string): VideoLesson[] => {
  return VIDEO_LIBRARY.filter(v => v.subject === subject);
};

export const getAllSubjects = (): string[] => {
  return Array.from(new Set(VIDEO_LIBRARY.map(v => v.subject)));
};

export const getVideoById = (id: string): VideoLesson | undefined => {
  return VIDEO_LIBRARY.find(v => v.id === id);
};
