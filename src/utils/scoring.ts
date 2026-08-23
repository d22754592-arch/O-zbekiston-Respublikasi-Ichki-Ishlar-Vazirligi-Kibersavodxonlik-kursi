import { Unvon, QuizQuestion } from '../types';

/**
 * Hisoblangan ballar (XP) asosida unvonni aniqlaydi.
 * Pure function - global state va tashqi o'zgaruvchilardan mutlaqo mustaqil.
 */
export function calculateFinalRank(xp: number): Unvon {
  if (xp >= 5000) return 'Polkovnik';
  if (xp >= 4000) return 'Podpolkovnik';
  if (xp >= 3000) return 'Mayor';
  if (xp >= 2000) return 'Kapitan';
  if (xp >= 1000) return 'Katta Leytenant';
  return 'Leytenant';
}

/**
 * Simulyatorda to'plangan ball uchun beriladigan XP miqdorini hisoblaydi.
 */
export function calculateSimulatorXP(score: number, baseXP: number = 300): number {
  // Masalan, score foiz yoki ochko bo'lsa, unga proporsional hisoblash mumkin
  // Hozirgi o'yin mantiqi bo'yicha yakunlangan simulyator uchun qat'iy 300 XP beriladi
  return baseXP;
}

/**
 * Quiz (o'zlashtirish testi) topshirganda beriladigan XPni hisoblaydi.
 * Agar ball 80% yoki undan yuqori bo'lsa 400 XP, aks holda 0 XP.
 */
export function calculateQuizXP(scorePercent: number, rewardXP: number = 400): number {
  return scorePercent >= 80 ? rewardXP : 0;
}

/**
 * Foydalanuvchining test savoliga bergan javobi to'g'ri yoki noto'g'riligini tekshiradi.
 */
export function checkQuizAnswer(q: QuizQuestion, userAns: any): boolean {
  if (userAns === undefined || userAns === null) return false;

  if (!q.type || q.type === 'choice') {
    return userAns === q.correctAnswer;
  }

  if (q.type === 'drag-drop') {
    if (typeof q.correctAnswer !== 'object' || typeof userAns !== 'object' || !q.correctAnswer) return false;
    
    const correctKeys = Object.keys(q.correctAnswer as any);
    if (correctKeys.length === 0) return false;

    let allMatch = true;
    for (const key of correctKeys) {
      if (userAns[key] !== (q.correctAnswer as any)[key]) {
        allMatch = false;
        break;
      }
    }
    return allMatch;
  }

  if (q.type === 'hotspot') {
    // Hotspot koordinatalari uchun: userAns = { r, c }
    if (typeof userAns === 'object' && q.correctAnswer && typeof q.correctAnswer === 'object') {
      const correctAns = q.correctAnswer as any;
      return userAns.r === correctAns.r && userAns.c === correctAns.c;
    }
  }

  return false;
}

/**
 * Modulning umumiy o'zlashtirish foizini hisoblab chiqadi.
 */
export function calculateModulePercent(correctAnswers: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.floor((correctAnswers / totalQuestions) * 100);
}

