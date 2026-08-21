export type Language = 'uz' | 'oz' | 'ru';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface LessonData {
  id: number;
  title: string;
  duration: string;
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
