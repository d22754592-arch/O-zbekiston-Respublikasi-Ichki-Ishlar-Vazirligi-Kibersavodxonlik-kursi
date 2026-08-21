export type Language = 'uz' | 'oz' | 'ru';
export type Theme = 'dark' | 'light';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface ModuleOverview {
  summary: string;
  keyRule: string;
  dos: string[];
  donts: string[];
  practicalSteps?: string[];
}

export interface ModuleData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  slideCount: number;
  slideFolder: string;
  quizQuestions: QuizQuestion[];
  overview?: ModuleOverview;
}

export interface ModuleProgress {
  moduleId: number;
  completed: boolean;
  scorePercent: number;
  attempts: number;
  timeSpentSeconds?: number;
}

export interface UserProgress {
  fullName: string;
  completedDate: string;
  moduleProgress: Record<number, ModuleProgress>;
  currentModuleId: number;
  totalStudySeconds?: number;
  moduleStudySeconds?: Record<number, number>;
  hasStarted?: boolean;
}
