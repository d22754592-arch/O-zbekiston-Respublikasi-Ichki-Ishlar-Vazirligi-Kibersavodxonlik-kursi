import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ModuleData } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  FileText, 
  HelpCircle, 
  Maximize2, 
  Minimize2,
  Award, 
  BookOpen, 
  User, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Info, 
  Check 
} from 'lucide-react';
import { logger } from '../utils/logger';
import { validateFullName } from '../utils/cyberUtils';

interface CoursePlayerProps {
  module: ModuleData;
  onCompleteModule: (moduleId: number, scorePercent: number) => void;
  onGoToNextModule?: () => void;
  isCompleted: boolean;
  previousScore?: number;
  isLastModule?: boolean;
  userName?: string;
  onSaveUserName?: (name: string) => void;
  onGoToCertificate?: () => void;
}

export default function CoursePlayer({
  module,
  onCompleteModule,
  onGoToNextModule,
  isCompleted,
  previousScore = 0,
  isLastModule = false,
  userName = '',
  onSaveUserName,
  onGoToCertificate,
}: CoursePlayerProps) {
  const [activeTab, setActiveTab] = useState<'slides' | 'overview' | 'quiz'>('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Swipe gesture touch coords
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Quiz state
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [scorePercent, setScorePercent] = useState(previousScore);
  const [tempName, setTempName] = useState(userName);
  const [nameError, setNameError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab('slides');
    setCurrentSlideIndex(0);
    setActiveQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    logger.info(`Loaded module: ${module.title}`);
  }, [module.id]);

  useEffect(() => {
    setTempName(userName);
  }, [userName]);

  const slides = useMemo(() => {
    return Array.from({ length: module.slideCount }, (_, i) => ({
      id: i + 1,
      url: `${module.slideFolder}/slide_${i + 1}.png`,
    }));
  }, [module.slideCount, module.slideFolder]);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'slides') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        setCurrentSlideIndex(prev => Math.min(module.slideCount - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, module.slideCount, isFullscreen]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe && currentSlideIndex < module.slideCount - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else if (isRightSwipe && currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        logger.error(`Fullscreen error: ${err.message}`);
        setIsFullscreen(!isFullscreen);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const questions = module.quizQuestions;

    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScorePercent(calculatedScore);
    setQuizSubmitted(true);

    logger.info(`Quiz submitted for module #${module.id}. Score: ${calculatedScore}%`);

    if (calculatedScore >= 80) {
      onCompleteModule(module.id, calculatedScore);
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setActiveQuestionIndex(0);
    setActiveTab('quiz');
  };

  const handleFinishAndGoToCert = () => {
    const val = validateFullName(tempName);
    if (!val.isValid) {
      setNameError(val.error || "Ism va familiyangizni to'liq kiriting.");
      return;
    }
    setNameError(null);
    if (onSaveUserName) {
      onSaveUserName(tempName.trim());
    }
    if (onGoToCertificate) {
      onGoToCertificate();
    }
  };

  const passed = scorePercent >= 80;
  const answeredCount = module.quizQuestions.filter(q => selectedAnswers[q.id] !== undefined).length;
  const allQuestionsAnswered = answeredCount === module.quizQuestions.length;
  const currentQuestion = module.quizQuestions[activeQuestionIndex];

  return (
    <div className={`space-y-6 text-slate-100 font-sans ${isFullscreen ? 'bg-black p-0 m-0 min-h-screen w-full flex flex-col justify-between' : ''}`} ref={containerRef}>

      {/* ── 1. MODULE EXECUTIVE HEADER (Hidden in Fullscreen or Focus Mode) ── */}
      {!isFocusMode && !isFullscreen && (
        <div className="bg-[#091124]/90 border border-slate-800/80 p-6 sm:p-7 rounded-3xl text-white shadow-xl backdrop-blur-xl transition-all space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>O'quv Moduli #{module.id} • IIB Maxsus Kursi</span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white">
                {module.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1.5 leading-relaxed max-w-3xl">
                {module.description}
              </p>
            </div>

            {/* Status Indicator */}
            {isCompleted && (
              <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl self-start md:self-auto shadow-sm flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Muvaffaqiyatli O'tilgan ({previousScore || scorePercent}%)</span>
              </div>
            )}
          </div>

          {/* Unified Segmented Tab Bar - True Connected Tab Architecture */}
          <div className="flex items-center bg-[#050b18] p-1 rounded-2xl border border-slate-800/70 w-full sm:w-auto overflow-x-auto gap-1">
            <button
              onClick={() => setActiveTab('slides')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer flex-shrink-0 ${
                activeTab === 'slides' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Taqdimot Slaydlari ({module.slideCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer flex-shrink-0 ${
                activeTab === 'quiz' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>2. Modul Testi ({module.quizQuestions.length} Savol)</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer flex-shrink-0 ${
                activeTab === 'overview' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>3. Qisqacha O'quv Qo'llanmasi</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 2. TAB 1: 16:9 PRESENTATION SLIDE CANVAS ── */}
      {activeTab === 'slides' && (
        <div className={isFullscreen ? "h-screen w-full flex flex-col justify-between bg-black p-2 sm:p-4" : "space-y-4"}>
          
          {/* Top Floating Control Bar - Clean, Proportional, No Redundant Text */}
          <div className={`px-4 py-2.5 rounded-2xl flex items-center justify-between shadow-lg backdrop-blur-md sticky top-2 z-20 transition-all ${
            isFullscreen 
              ? 'bg-slate-900/90 border border-slate-700 text-white mx-2 mb-2' 
              : 'bg-[#091124]/90 border border-slate-800/80'
          }`}>
            {/* Slide Indicator Badge */}
            <div className="flex items-center space-x-2">
              <span className="bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 px-3 py-1 rounded-lg font-mono font-bold text-xs">
                Slayd {currentSlideIndex + 1} / {module.slideCount}
              </span>
            </div>

            {/* Quick Slide Navigation & Utility Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="p-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                title="Oldingi slayd (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.min(module.slideCount - 1, prev + 1))}
                disabled={currentSlideIndex === module.slideCount - 1}
                className="p-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                title="Keyingi slayd (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {!isFullscreen && (
                <button
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    isFocusMode 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                      : 'bg-slate-900 border-slate-700/60 text-slate-300 hover:text-white'
                  }`}
                  title="Fokus Rejimi"
                >
                  <span>{isFocusMode ? 'Oddiy Rejim' : 'Fokus Rejimi'}</span>
                </button>
              )}

              {/* Proportional Secondary Outlined Utility Button */}
              <button
                onClick={toggleFullscreen}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl font-semibold text-xs flex items-center space-x-1.5 cursor-pointer border border-slate-700/60 transition-colors"
                title="To'liq Ekran (F)"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Chiqish' : "To'liq Ekran"}</span>
              </button>
            </div>
          </div>

          {/* 16:9 Presentation Screen Container */}
          <div 
            ref={slideContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={
              isFullscreen
                ? "flex-1 w-full h-full flex items-center justify-center relative select-none overflow-hidden my-auto"
                : "relative bg-[#050b18] border border-slate-800/80 rounded-3xl shadow-xl overflow-hidden flex flex-col items-center justify-center p-3 sm:p-5 select-none"
            }
          >
            {/* Slide Image with 100% Screen Filling in Fullscreen */}
            <div className={
              isFullscreen
                ? "w-full h-full max-h-[86vh] flex items-center justify-center relative"
                : "w-full max-w-5xl aspect-[16/9] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center"
            }>
              <img
                src={slides[currentSlideIndex].url}
                alt={`Slayd #${slides[currentSlideIndex].id}`}
                className={
                  isFullscreen
                    ? "w-auto h-auto max-w-full max-h-full object-contain block drop-shadow-2xl"
                    : "w-full h-full object-contain block transition-all duration-200"
                }
                loading="eager"
              />

              {/* Next / Prev Floating Overlay Chevrons */}
              {currentSlideIndex > 0 && (
                <button
                  onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-indigo-600 text-white border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all opacity-70 hover:opacity-100 cursor-pointer shadow-lg"
                  title="Oldingi"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {currentSlideIndex < module.slideCount - 1 && (
                <button
                  onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-indigo-600 text-white border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all opacity-70 hover:opacity-100 cursor-pointer shadow-lg"
                  title="Keyingi"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Slide Navigator Matrix & Progress Strip */}
            {!isFullscreen && (
              <div className="w-full max-w-5xl mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                
                {/* Thumbnail Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer border ${
                        currentSlideIndex === idx
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm scale-105'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>

                {/* Progress Percentage */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-xs font-mono text-slate-400">
                    Jarayon: <span className="text-emerald-400 font-bold">{Math.round(((currentSlideIndex + 1) / module.slideCount) * 100)}%</span>
                  </div>
                  <div className="w-28 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${((currentSlideIndex + 1) / module.slideCount) * 100}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Fullscreen Floating Bottom Bar */}
          {isFullscreen && (
            <div className="bg-slate-900/90 border border-slate-700 p-2 rounded-2xl flex items-center justify-between shadow-2xl backdrop-blur-md mx-2 mt-2">
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer border ${
                      currentSlideIndex === idx
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {s.id}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-slate-300 font-bold">
                  {currentSlideIndex + 1} / {module.slideCount}
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-600 cursor-pointer"
                >
                  Ekrandan Chiqish (Esc)
                </button>
              </div>
            </div>
          )}

          {/* Bottom Action - Green Confirmation CTA */}
          {!isFullscreen && (
            <div className="bg-[#091124]/90 border border-slate-800/80 p-5 sm:p-6 rounded-3xl shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Slaydlar yakunlandi</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">Slaydlarni to'liq o'rganib bo'ldingizmi?</h4>
                <p className="text-xs text-slate-300">
                  Bilimingizni sinash va keyingi modulni ochish uchun <b>Modul Testi ({module.quizQuestions.length} ta savol)</b> topshiring.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95 flex-shrink-0"
              >
                <span>MODUL TESTINI TOPSHIRISH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* ── 3. TAB 2: QUIZ ASSESSMENT ENGINE ── */}
      {activeTab === 'quiz' && (
        <div className="space-y-5">

          {/* Quiz Top Briefing Bar - Information Chips (No False Button Affordance) */}
          <div className="bg-[#091124]/90 border border-slate-800/80 p-5 sm:p-6 rounded-3xl shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Modul Bilim Testi</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {module.title} — Bilim Sinovi
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Modulni muvaffaqiyatli topshirish uchun kamida <b>80%</b> natija ko'rsatishingiz shart.
              </p>
            </div>

            {/* Flat Informational Meta Chips (No heavy borders or button appearances) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-slate-900/60 px-3 py-1.5 rounded-lg text-xs text-slate-300 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Cheksiz Vaqt</span>
              </div>
              <div className="bg-slate-900/60 px-3 py-1.5 rounded-lg text-xs text-slate-300 flex items-center space-x-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Cheksiz Qayta Topshirish</span>
              </div>
              <div className="bg-indigo-600/15 text-indigo-300 px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
                O'tish balli: 80%
              </div>
            </div>
          </div>

          {/* Quiz Result Celebration Banner */}
          {quizSubmitted && (
            <div className={`p-6 sm:p-7 rounded-3xl space-y-5 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-150 ${
              passed
                ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-100'
                : 'bg-rose-950/80 border border-rose-500/60 text-rose-100'
            }`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                  passed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {passed ? <CheckCircle2 className="w-8 h-8 stroke-[2.5]" /> : <XCircle className="w-8 h-8 stroke-[2.5]" />}
                </div>
                <div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider mb-1.5 bg-slate-900/60">
                    <span>{passed ? '🎉 Muvaffaqiyatli O\'tdingiz' : '⚠️ Sinovdan O\'tilmadi'}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {passed ? 'Tabriklaymiz! Modul Testi Muvaffaqiyatli Topshirildi' : 'Test Natijasi Yetarli Emas'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1">
                    Sizning yakuniy ko'rsatkichingiz: <b className="font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-black/40">{scorePercent}%</b> (Minimal talab: 80%)
                  </p>
                </div>
              </div>

              {passed && (
                <div className="pt-5 border-t border-emerald-500/30 space-y-4">
                  {!isLastModule ? (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-emerald-400/20">
                      <div className="text-xs font-semibold text-emerald-300">
                        ✅ Ushbu modul o'zlashtirildi. Keyingi modul ochildi!
                      </div>
                      {onGoToNextModule && (
                        <button
                          onClick={onGoToNextModule}
                          className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center space-x-2"
                        >
                          <span>KEYINGI MODULGA O'TISH</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-[#050b18] border border-amber-400/40 p-5 rounded-2xl space-y-4 shadow-xl">
                      <div className="flex items-center space-x-2.5 text-amber-400 font-bold text-sm sm:text-base">
                        <Award className="w-6 h-6 flex-shrink-0" />
                        <span>Barcha 8 ta modul tamomlandi! Rasmiy IIB sertifikati tayyor!</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Sertifikatga yoziladigan to'liq Ism va Familiyangizni (F.I.Sh) tekshiring:
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <div className="relative flex-1">
                            <User className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
                            <input
                              type="text"
                              value={tempName}
                              onChange={(e) => {
                                setTempName(e.target.value);
                                if (nameError) setNameError(null);
                              }}
                              placeholder="Masalan: Toshpulatov Behruz Alisherovich"
                              className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 pl-10 p-3 text-sm font-semibold text-white rounded-xl focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={handleFinishAndGoToCert}
                            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all flex-shrink-0"
                          >
                            <Award className="w-4 h-4" />
                            <span>Sertifikatni Olish</span>
                          </button>
                        </div>
                        {nameError && (
                          <p className="text-xs font-semibold text-rose-400">{nameError}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!passed && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-rose-500/30">
                  <span className="text-xs text-rose-200">
                    Modul slaydlari bo'yicha bilimlarni mustahkamlab, qayta topshirishingiz mumkin.
                  </span>
                  <button
                    onClick={handleRetakeQuiz}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Qayta Topshirish</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Interactive Question Navigator Matrix (Primary Blue/Indigo, No Red) */}
          <div className="bg-[#091124]/90 border border-slate-800/80 p-4 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-slate-400">Savollar:</span>
              <div className="flex items-center space-x-1.5">
                {module.quizQuestions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = activeQuestionIndex === idx;

                  let btnColor = "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700";
                  if (quizSubmitted) {
                    const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                    btnColor = isCorrect ? "bg-emerald-600 text-white border-emerald-500" : "bg-rose-600 text-white border-rose-500";
                  } else if (isCurrent) {
                    btnColor = "bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/30 scale-105 shadow-sm";
                  } else if (isAnswered) {
                    btnColor = "bg-slate-800 text-indigo-300 border-indigo-500/40";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestionIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer border ${btnColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Belgilandi: <b className="text-indigo-400 font-bold">{answeredCount}</b> / {module.quizQuestions.length}
            </div>
          </div>

          {/* Single Focused Question Card with Tactile Options */}
          {currentQuestion && (
            <div className="bg-[#091124]/90 border border-slate-800/80 p-6 sm:p-7 rounded-3xl shadow-xl space-y-5 backdrop-blur-xl">
              
              {/* Question Header */}
              <div className="border-b border-slate-800/60 pb-3 flex items-start space-x-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {activeQuestionIndex + 1}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase tracking-wider block mb-0.5">
                    Savol {activeQuestionIndex + 1} / {module.quizQuestions.length}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {currentQuestion.question}
                  </h3>
                </div>
              </div>

              {/* Option Cards (A, B, C, D) with Perfect Vertical Centering */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, oIdx) => {
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  const letter = optionLetters[oIdx] || `${oIdx + 1}`;
                  const isThisSelected = selectedAnswers[currentQuestion.id] === oIdx;
                  const isThisCorrect = oIdx === currentQuestion.correctAnswer;

                  let cardStyle = "bg-slate-900/50 border-slate-800/80 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-900/80";

                  if (quizSubmitted) {
                    if (isThisCorrect) {
                      cardStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-sm";
                    } else if (isThisSelected && !isThisCorrect) {
                      cardStyle = "bg-rose-950/80 border-rose-500 text-rose-100 shadow-sm";
                    } else {
                      cardStyle = "bg-slate-900/20 border-slate-900 text-slate-500 opacity-50";
                    }
                  } else if (isThisSelected) {
                    cardStyle = "bg-indigo-600/15 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/30";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(currentQuestion.id, oIdx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-between border cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-center space-x-3.5 pr-3">
                        <span className={`w-6 h-6 rounded-md font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 transition-colors ${
                          isThisSelected 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {letter}
                        </span>
                        <span className="leading-normal">{opt}</span>
                      </div>

                      {quizSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      )}
                      {quizSubmitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Forensic Explanation Card */}
              {quizSubmitted && (
                <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs text-indigo-200 leading-relaxed">
                  <div className="font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kiberxavfsizlik Tahlili va Asosi:</span>
                  </div>
                  {currentQuestion.explanation}
                </div>
              )}

              {/* Question Footer Navigation */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                <button
                  onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeQuestionIndex === 0}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs font-semibold text-slate-300 rounded-xl border border-slate-700/60 flex items-center space-x-1.5 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Oldingi savol</span>
                </button>

                {activeQuestionIndex < module.quizQuestions.length - 1 ? (
                  <button
                    onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-sm flex items-center space-x-1.5 cursor-pointer transition-colors"
                  >
                    <span>Keyingi savol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : !quizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={!allQuestionsAnswered}
                    className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-2 ${
                      allQuestionsAnswered
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>{allQuestionsAnswered ? 'TESTNI YAKUNLASH' : 'Barcha savollarni belgilang'}</span>
                  </button>
                ) : null}
              </div>

            </div>
          )}

        </div>
      )}

      {/* ── 4. TAB 3: ESSENTIAL READING / OVERVIEW (No Boxiness / Clean Whitespace) ── */}
      {activeTab === 'overview' && (
        <div className="bg-[#091124]/90 border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-xl backdrop-blur-xl space-y-6">
          <div className="border-b border-slate-800/60 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Modul O'quv Rejasi va Asosiy Qoidalar</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ushbu modul doirasida o'zlashtirilishi shart bo'lgan axborot xavfsizligi qoidalari.
            </p>
          </div>

          <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            <div className="bg-slate-900/40 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Modul Xulosasi:</h4>
              <p>{module.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl space-y-2.5">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide flex items-center space-x-1.5">
                  <Check className="w-4 h-4" />
                  <span>Qat'iy Tavsiyalar</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside pl-1">
                  <li>Har bir xizmat uchun alohida, kamida 12-16 belgili parol qo'llang.</li>
                  <li>2FA (Authenticator) dasturini barcha asosiy akkauntlarga ulang.</li>
                  <li>Shubhali havolalarni ochishdan oldin domen manzilini tekshiring.</li>
                </ul>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl space-y-2.5">
                <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wide flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Qat'iyan Taqiqlanadi</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside pl-1">
                  <li>SMS orqali kelgan tasdiq kodlarini begonalarga berish.</li>
                  <li>Noma'lum Telegram bot yoki guruhlardan APK fayllarni o'rnatish.</li>
                  <li>Bir xil parolni barcha tizimlarda takrorlash.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
