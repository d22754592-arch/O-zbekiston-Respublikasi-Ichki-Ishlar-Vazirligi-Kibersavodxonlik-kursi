/**
 * Kiberxavfsizlik Akademiyasi - Pure functions for calculation and verification
 * Built as pure functions to ease future backend migration.
 */

import { QuizQuestion, Unvon, UserProgress } from '../types';

// Secret key for tamper-proof HMAC signing (offline use, don't expose publicly)
const SECRET_KEY = 'iib-kiberxavfsizlik-2026-secret-key-for-signing-progress';

/**
 * Computes a simple HMAC-like signature for progress data using Web Crypto API (or fallback)
 */
async function computeSignature(data: string): Promise<string> {
  try {
    // Use Web Crypto API if available
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SECRET_KEY);
    const dataToSign = encoder.encode(data);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    );
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, dataToSign);
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    return signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback if Web Crypto isn't available (simple hash)
    let hash = 0;
    const str = data + SECRET_KEY;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }
}

/**
 * Saves progress with signature to localStorage (tamper-proof)
 */
export async function saveProgressWithSignature(progress: UserProgress): Promise<void> {
  const dataStr = JSON.stringify(progress);
  const signature = await computeSignature(dataStr);
  const dataToStore = {
    data: progress,
    signature,
    timestamp: Date.now()
  };
  localStorage.setItem('iib_cyber_progress', JSON.stringify(dataToStore));
}

/**
 * Loads progress from localStorage and verifies signature (tamper-proof)
 * Returns null if data is invalid or tampered
 */
export async function loadProgressWithSignature(
  defaultProgress: UserProgress
): Promise<UserProgress> {
  const stored = localStorage.getItem('iib_cyber_progress');
  if (!stored) return defaultProgress;

  try {
    const parsed = JSON.parse(stored);
    if (!parsed.data || !parsed.signature) return defaultProgress;

    const dataStr = JSON.stringify(parsed.data);
    const expectedSignature = await computeSignature(dataStr);

    if (parsed.signature === expectedSignature) {
      return parsed.data;
    } else {
      console.warn('Progress data tampered, resetting to default');
      return defaultProgress;
    }
  } catch (err) {
    console.error('Error loading progress, resetting:', err);
    return defaultProgress;
  }
}

/**
 * 1. PASSWORD CRACKER SIMULATOR UTILS
 */

export interface PasswordStrength {
  score: number; // 0 to 4
  text: string;
  color: string;
  bg: string;
  entropyBits: number;
  charsetSize: number;
  length: number;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  isDictionary: boolean;
}

/**
 * Evaluates password strength and returns score/styling (Pure function)
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  const trimmed = password.trim();
  if (!password || !trimmed) {
    return {
      score: 0,
      text: password && !trimmed ? 'Noto\'g\'ri (faqat bo\'sh joy)' : 'Kiritilmagan',
      color: password && !trimmed ? 'text-red-500' : 'text-slate-400',
      bg: password && !trimmed ? 'bg-red-500/20' : 'bg-slate-800',
      entropyBits: 0,
      charsetSize: 0,
      length: 0,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      isDictionary: false
    };
  }

  const hasUpper = /[A-Z]/.test(trimmed);
  const hasLower = /[a-z]/.test(trimmed);
  const hasNumber = /[0-9]/.test(trimmed);
  const hasSpecial = /[^A-Za-z0-9]/.test(trimmed);

  const charsetSize = [
    hasLower ? 26 : 0,
    hasUpper ? 26 : 0,
    hasNumber ? 10 : 0,
    hasSpecial ? 32 : 0
  ].reduce((sum, val) => sum + val, 0);

  const entropyBits = trimmed.length * Math.log2(Math.max(1, charsetSize));
  const weakList = ['123456', 'password', 'qwerty', 'admin', 'parol', 'toshkent', 'uzbekistan', 'iib', 'mvd', 'mvd123', 'iib2026'];
  const isDictionary = weakList.some(word => trimmed.toLowerCase().includes(word)) || trimmed.length < 5;

  let score = 0;
  if (trimmed.length >= 12) score++;
  if (charsetSize >= 52) score++;
  if (entropyBits >= 40) score++;
  if (hasUpper && hasLower && hasNumber && hasSpecial) score++;
  const finalScore = Math.min(4, score);

  switch (finalScore) {
    case 0:
    case 1:
      return {
        score: finalScore,
        text: 'O\'ta Zaif',
        color: 'text-red-500',
        bg: 'bg-red-500/20',
        entropyBits,
        charsetSize,
        length: trimmed.length,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecial,
        isDictionary
      };
    case 2:
      return {
        score: finalScore,
        text: 'Zaif',
        color: 'text-orange-500',
        bg: 'bg-orange-500/20',
        entropyBits,
        charsetSize,
        length: trimmed.length,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecial,
        isDictionary
      };
    case 3:
      return {
        score: finalScore,
        text: 'O\'rtacha',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/20',
        entropyBits,
        charsetSize,
        length: trimmed.length,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecial,
        isDictionary
      };
    case 4:
    default:
      return {
        score: finalScore,
        text: 'Kuchli',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/20',
        entropyBits,
        charsetSize,
        length: trimmed.length,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecial,
        isDictionary
      };
  }
}

/**
 * Estimates brute-force time for a given password (Pure function)
 */
export function estimateBruteForceTime(password: string): string {
  const trimmed = password.trim();
  if (!trimmed) return '0 soniya';

  let poolSize = 0;
  if (/[a-z]/.test(trimmed)) poolSize += 26;
  if (/[A-Z]/.test(trimmed)) poolSize += 26;
  if (/[0-9]/.test(trimmed)) poolSize += 10;
  if (/[^A-Za-z0-9]/.test(trimmed)) poolSize += 32;

  const length = trimmed.length;
  const combinations = Math.pow(poolSize, length);
  const hashesPerSecond = 1e9;
  const seconds = combinations / hashesPerSecond;

  if (!Number.isFinite(seconds) || seconds <= 0) return '0 soniya';
  if (seconds < 1) return '0.01 soniya';
  if (seconds < 60) return `${Math.round(seconds)} soniya`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} daqiqa`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} soat`;
  const days = hours / 24;
  if (days < 365) return `${Math.round(days)} kun`;
  const years = days / 365;
  if (years < 1000) return `${Math.round(years)} yil`;
  if (years < 1e6) return `${Math.round(years / 1000)} ming yil`;
  if (years < 1e9) return `${Math.round(years / 1e6)} million yil`;
  return 'Milliardlab yil';
}

/**
 * 2. FISHING MAIL ANALYZER UTILS
 */

/**
 * Verifies if user correctly classified a mail as phishing or safe (Pure function)
 */
export function checkFishingClassification(isPhishing: boolean, userSelectedIsPhishing: boolean): boolean {
  return isPhishing === userSelectedIsPhishing;
}

/**
 * 3. PACKET TRACE VISUALIZER UTILS
 */

/**
 * Calculates anonymity score based on selected technologies (Pure function)
 */
export function calculateAnonymityScore(config: {
  isTorActive: boolean;
  isVpnActive: boolean;
  isJsDisabled: boolean;
}): number {
  let score = 10; // baseline public connection

  if (config.isVpnActive) score += 30;
  if (config.isTorActive) score += 40;
  if (config.isJsDisabled) score += 20;

  return Math.min(100, score);
}

/**
 * 4. VIRTUAL CRIME SCENE FORENSICS UTILS
 */

/**
 * Validates if the selected evidence is packed in the correct bag order (Pure function)
 */
export function verifyEvidenceBagging(
  correctBagIndex: number,
  currentBagStep: number
): boolean {
  return correctBagIndex === currentBagStep;
}

/**
 * 5. KIBER-SUD SIMULATOR UTILS
 */

/**
 * Verifies the legal article and verdict matches the actual case (Pure function)
 */
export function verifyKiberSudVerdict(config: {
  selectedArticle: string;
  selectedVerdict: string;
  correctArticle: string;
  correctVerdict: string;
}): boolean {
  return (
    config.selectedArticle === config.correctArticle &&
    config.selectedVerdict === config.correctVerdict
  );
}

/**
 * 6. OSINT / DIGITAL FOOTPRINT HUNTER UTILS
 */

/**
 * Calculates distance/score for geoguesser-style guess coordinates (Pure function)
 */
export function calculateGeoguessScore(
  guessedRow: number,
  guessedCol: number,
  correctRow: number,
  correctCol: number
): {
  distance: number;
  score: number;
  success: boolean;
} {
  const rowDiff = Math.abs(guessedRow - correctRow);
  const colDiff = Math.abs(guessedCol - correctCol);
  const distance = Math.sqrt(rowDiff * rowDiff + colDiff * colDiff);

  let score = 100 - Math.round(distance * 25);
  score = Math.max(0, Math.min(100, score));

  return {
    distance,
    score,
    success: distance <= 1, // Success if clicked within 1 tile radius
  };
}

/**
 * 7. GENERAL COMPREHENSIVE SCORE & XP CALCULATOR
 * Standardized formula to calculate XP and Rank Progression
 */

export const UNVON_XP_THRESHOLDS: { rank: Unvon; minXp: number }[] = [
  { rank: 'Leytenant', minXp: 0 },
  { rank: 'Katta Leytenant', minXp: 1000 },
  { rank: 'Kapitan', minXp: 2500 },
  { rank: 'Mayor', minXp: 4500 },
  { rank: 'Podpolkovnik', minXp: 7000 },
  { rank: 'Polkovnik', minXp: 10000 },
];

/**
 * Resolves the rank/title of an officer based on total XP (Pure function)
 */
export function calculateRankFromXp(xp: number): Unvon {
  let currentRank: Unvon = 'Leytenant';
  for (const threshold of UNVON_XP_THRESHOLDS) {
    if (xp >= threshold.minXp) {
      currentRank = threshold.rank;
    }
  }
  return currentRank;
}

/**
 * Calculates quiz score percentage and XP rewards (Pure function)
 */
export function calculateQuizResults(
  correctAnswersCount: number,
  totalQuestions: number
): {
  score: number; // percentage, e.g. 85
  xpEarned: number;
  passed: boolean;
} {
  if (totalQuestions <= 0) return { score: 0, xpEarned: 0, passed: false };
  
  const score = Math.round((correctAnswersCount / totalQuestions) * 100);
  const passed = score >= 70; // 70% passing threshold
  
  // Base XP is 300, max XP is 500
  const xpEarned = passed ? 300 + Math.round((score - 70) * 6.6) : 0;

  return {
    score,
    xpEarned,
    passed,
  };
}

/**
 * Verifies final exam step answers and returns status (Pure function)
 */
export function checkFinalExamAnswer(
  userInput: string,
  correctAnswer: string
): boolean {
  const normUser = userInput.trim().toLowerCase().replace(/['"’`‘@\s]/g, '');
  const normCorrect = correctAnswer.trim().toLowerCase().replace(/['"’`‘@\s]/g, '');
  return normUser === normCorrect || normUser.includes(normCorrect) || normCorrect.includes(normUser);
}

/**
 * Strict Full Name (F.I.Sh) validator for IIB Cyber Academy Certificates & Profiles
 * Rules:
 * - Only Latin & Cyrillic characters (including o', g', sh, ch, ў, қ, ғ, ҳ), spaces, and standard apostrophes
 * - Absolutely no digits (0-9) or special punctuation/symbols
 * - Must contain at least 2 words (Ism va Familiya), ideally 3 words
 * - Each word must be at least 2 letters, total trimmed length >= 5
 */
export function validateFullName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: "Ism-sharifingizni kiritishingiz shart." };
  }
  
  // Check for invalid numbers or forbidden symbols
  const forbiddenCharsRegex = /[^a-zA-Zа-яА-ЯёЁўЎқҚғҒҳҲ\s'’`‘\-]/;
  if (forbiddenCharsRegex.test(trimmed)) {
    return { 
      isValid: false, 
      error: "Ism-sharifda faqat harflardan foydalaning (sonlar va maxsus belgilar kiritish taqiqlanadi)." 
    };
  }

  // Check word count
  const words = trimmed.split(/\s+/).filter(w => w.length > 0);
  if (words.length < 2) {
    return { 
      isValid: false, 
      error: "Iltimos, to'liq Ism va Familiyangizni kiriting (kamida 2 ta so'z, masalan: Aliyev Vali)." 
    };
  }

  // Each word must have at least 2 letters
  const hasTooShortWord = words.some(w => w.replace(/['’`‘\-]/g, '').length < 2);
  if (hasTooShortWord || trimmed.length < 5) {
    return { 
      isValid: false, 
      error: "Ism va familiya to'liq va to'g'ri shaklda kiritilishi lozim." 
    };
  }

  return { isValid: true };
}

