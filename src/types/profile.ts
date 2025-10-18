export type LearningFormat = "texto" | "audio" | "video" | "interativo";
export type DifficultyLevel = "fácil" | "médio" | "difícil";
export type SupportType = "visual" | "auditivo" | "motor" | "cognitivo" | "múltiplo";

export interface SessionProfile {
  format: LearningFormat;
  difficulty: DifficultyLevel;
  needsSupport: boolean;
  supportType?: SupportType;
  interests: string[];
  highContrast: boolean;
  fontSize: "pequeno" | "médio" | "grande" | "extra-grande";
  ttsEnabled: boolean;
  keyboardOnly: boolean;
}

export interface ActivityHistory {
  id: string;
  title: string;
  topic: string;
  format: LearningFormat;
  score: number;
  timeSpent: number;
  completedAt: Date;
  difficulty: DifficultyLevel;
}

export interface ContentRecommendation {
  title: string;
  format: LearningFormat;
  difficulty: DifficultyLevel;
  topic: string;
  duration: number;
  reason: string;
  adaptations: string[];
}

export interface PerformanceAnalysis {
  insights: string[];
  strengths: string[];
  improvements: string[];
  overallScore: number;
  recommendation?: string;
}
