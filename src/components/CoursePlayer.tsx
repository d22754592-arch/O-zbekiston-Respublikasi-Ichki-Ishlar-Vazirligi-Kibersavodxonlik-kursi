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
  X,
  Play
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
        <div className="bg-[#0b1633]/90 border border-indigo-500/30 p-6 md:p-8 rounded-3xl text-white shadow-2xl backdrop-blur-xl transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>O'quv Moduli #{module.id} • IIB Maxsus Kursi</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
                {module.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 leading-relaxed max-w-3xl">
                {module.description}
              </p>
            </div>

            {/* Status Indicator */}
            {isCompleted && (
              <div className="flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black px-4 py-2.5 rounded-2xl self-start md:self-auto shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Modul Muvaffaqiyatli Tamomlangan ({previousScore || scorePercent}%)</span>
              </div>
            )}
          </div>

          {/* Tab Selectors - Modern Segmented Control */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('slides')}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all flex items-center space-x-2 cursor-pointer border ${
                activeTab === 'slides' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-indigo-400 shadow-lg shadow-indigo-900/50 scale-[1.02]' 
                  : 'bg-[#070e24] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-300" />
              <span>1. Taqdimot Slaydlari ({module.slideCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all flex items-center space-x-2 cursor-pointer border ${
                activeTab === 'quiz' 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/50 scale-[1.02]' 
                  : 'bg-[#070e24] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>2. Modul Testi ({module.quizQuestions.length} Savol)</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all flex items-center space-x-2 cursor-pointer border ${
                activeTab === 'overview' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-indigo-400 shadow-lg shadow-indigo-900/50 scale-[1.02]' 
                  : 'bg-[#070e24] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Info className="w-4 h-4 text-emerald-400" />
              <span>3. Qisqacha O'quv Qo'llanmasi</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 2. TAB 1: 16:9 CINEMA PRESENTATION SLIDE CANVAS (SWIPE & 100% FULLSCREEN) ── */}
      {activeTab === 'slides' && (
        <div className={isFullscreen ? "h-screen w-full flex flex-col justify-between bg-black p-2 sm:p-4" : "space-y-4"}>
          
          {/* Top Floating Control Bar */}
          <div className={`p-3 rounded-2xl flex items-center justify-between shadow-xl backdrop-blur-md sticky top-2 z-20 transition-all ${
            isFullscreen 
              ? 'bg-slate-900/90 border border-slate-700 text-white mx-2 mb-2' 
              : 'bg-[#0b1633]/90 border border-slate-800'
          }`}>
            <div className="flex items-center space-x-3 text-xs font-bold text-slate-300">
              <span className="font-mono text-white font-bold">{module.title}:</span>
              <span className="bg-indigo-600/40 border border-indigo-400/60 text-white px-3 py-1 rounded-lg font-mono font-black text-xs shadow-inner">
                Slayd {currentSlideIndex + 1} / {module.slideCount}
              </span>
              <span className="text-[11px] text-slate-400 hidden lg:inline">
                (Klaviatura strelkalari yoki mobil telefonda barmog'ingiz bilan suring)
              </span>
            </div>

            {/* Quick Slide Control Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="p-2 bg-[#070e24] hover:bg-indigo-950 disabled:opacity-30 text-white rounded-xl border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer shadow"
                title="Oldingi slayd (ArrowLeft)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.min(module.slideCount - 1, prev + 1))}
                disabled={currentSlideIndex === module.slideCount - 1}
                className="p-2 bg-[#070e24] hover:bg-indigo-950 disabled:opacity-30 text-white rounded-xl border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer shadow"
                title="Keyingi slayd (ArrowRight)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {!isFullscreen && (
                <button
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 shadow ${
                    isFocusMode 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                      : 'bg-[#070e24] border-slate-700 hover:border-slate-600 text-slate-300'
                  }`}
                  title="Fokus Rejimi (Tepalikni yashirish)"
                >
                  <span>{isFocusMode ? 'Oddiy Rejim' : 'Fokus Rejimi'}</span>
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-indigo-950/80 transition-all border border-indigo-400/30"
                title="To'liq Ekran (F)"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Chiqish' : "To'liq Ekran"}</span>
              </button>
            </div>
          </div>

          {/* 16:9 Presentation Screen Container - 100% Responsive */}
          <div 
            ref={slideContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={
              isFullscreen
                ? "flex-1 w-full h-full flex items-center justify-center relative select-none overflow-hidden my-auto"
                : "relative bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4 select-none"
            }
          >
            {/* Slide Image with 100% Screen Filling in Fullscreen */}
            <div className={
              isFullscreen
                ? "w-full h-full max-h-[86vh] flex items-center justify-center relative"
                : "w-full max-w-5xl aspect-[16/9] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl relative flex items-center justify-center"
            }>
              <img
                src={slides[currentSlideIndex].url}
                alt={`Slayd #${slides[currentSlideIndex].id}`}
                className={
                  isFullscreen
                    ? "w-auto h-auto max-w-full max-h-full object-contain block drop-shadow-2xl"
                    : "w-full h-full object-contain block transition-all duration-300"
                }
                loading="eager"
              />

              {/* Next / Prev Floating Overlay Chevrons */}
              {currentSlideIndex > 0 && (
                <button
                  onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/80 hover:bg-indigo-600 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-2xl"
                  title="Oldingi"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
              )}

              {currentSlideIndex < module.slideCount - 1 && (
                <button
                  onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/80 hover:bg-indigo-600 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-2xl"
                  title="Keyingi"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              )}
            </div>

            {/* Bottom Presentation Matrix & Progress Strip (In Normal View) */}
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
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-110'
                          : 'bg-[#070e24] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
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
                  <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${((currentSlideIndex + 1) / module.slideCount) * 100}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Fullscreen Floating Bottom Bar */}
          {isFullscreen && (
            <div className="bg-slate-900/90 border border-slate-700 p-2.5 rounded-2xl flex items-center justify-between shadow-2xl backdrop-blur-md mx-2 mt-2">
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer border ${
                      currentSlideIndex === idx
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-110'
                        : 'bg-[#070e24] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
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
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-600 cursor-pointer"
                >
                  Ekrandan Chiqish (Esc)
                </button>
              </div>
            </div>
          )}

          {/* Bottom Action / Quiz Transition Callout (In Normal View - 1-RASM TUZATILDI: YASHIL TASDIQLASH TUGMASI) */}
          {!isFullscreen && (
            <div className="bg-[#0b1633]/90 border border-emerald-500/40 p-6 sm:p-7 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5 transition-all">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Slaydlar yakunlandi</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white">Slaydlarni to'liq o'rganib bo'ldingizmi?</h4>
                <p className="text-xs text-slate-300">
                  Bilimingizni sinash va keyingi modulni ochish uchun <b>Modul Testi ({module.quizQuestions.length} ta savol)</b> topshiring.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-950/80 flex items-center justify-center space-x-2.5 cursor-pointer transition-all hover:scale-105 active:scale-95 border border-emerald-400/50 flex-shrink-0"
              >
                <span>MODUL TESTINI TOPSHIRISH</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* ── 3. TAB 2: TACTICAL ASSESSMENT QUIZ ENGINE (2-RASM TUZATILDI: NEYTRAL VA INSTITUTIONAL RANGLAR) ── */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">

          {/* Quiz Top Briefing Bar */}
          <div className="bg-[#0b1633]/90 border border-indigo-500/30 p-6 rounded-3xl shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Modul Bilim Testi</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {module.title} — Bilim Sinovi
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Modulni muvaffaqiyatli topshirish uchun kamida <b>80%</b> natija ko'rsatishingiz shart.
              </p>
            </div>

            {/* Practical Info Stats Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-[#070e24] border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Cheksiz Vaqt</span>
              </div>
              <div className="bg-[#070e24] border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cheksiz Qayta Topshirish</span>
              </div>
              <div className="bg-indigo-600/20 border border-indigo-400/40 px-3.5 py-2 rounded-xl text-xs font-mono font-black text-indigo-300">
                O'tish balli: 80%
              </div>
            </div>
          </div>

          {/* Quiz Result Celebration Banner */}
          {quizSubmitted && (
            <div className={`p-6 sm:p-8 rounded-3xl border-2 space-y-6 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200 ${
              passed
                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-100'
                : 'bg-rose-950/80 border-rose-500/80 text-rose-100'
            }`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border-2 flex-shrink-0 ${
                  passed ? 'bg-emerald-600 border-emerald-300 text-white' : 'bg-rose-600 border-rose-300 text-white'
                }`}>
                  {passed ? <CheckCircle2 className="w-10 h-10 stroke-[2.5]" /> : <XCircle className="w-10 h-10 stroke-[2.5]" />}
                </div>
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider mb-2 bg-slate-900/60 border border-white/20">
                    <span>{passed ? '🎉 Muvaffaqiyatli O\'tdingiz' : '⚠️ Sinovdan O\'tilmadi'}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {passed ? 'TABRIKLAYMIZ! MODUL TESTI MUVAFFAQIYATLI TOPSHIRILDI' : 'TEST NATIJASI YETARLI EMAS'}
                  </h4>
                  <p className="text-sm text-slate-200 mt-1">
                    Sizning yakuniy ko'rsatkichingiz: <b className="text-lg font-mono font-black text-amber-300 px-2 py-0.5 rounded bg-black/40 border border-amber-400/30">{scorePercent}%</b> (Minimal o'tish talabi: 80%)
                  </p>
                </div>
              </div>

              {passed && (
                <div className="pt-6 border-t border-emerald-500/40 space-y-4">
                  {!isLastModule ? (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-emerald-400/30">
                      <div className="text-xs font-bold text-emerald-300">
                        ✅ Ushbu modul o'zlashtirildi. Keyingi modul ochildi!
                      </div>
                      {onGoToNextModule && (
                        <button
                          onClick={onGoToNextModule}
                          className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xl cursor-pointer transition-all flex items-center justify-center space-x-2 border border-emerald-300/40 hover:scale-105"
                        >
                          <span>KEYINGI MODULGA O'TISH</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-[#070e24] border-2 border-amber-400/60 p-6 rounded-2xl space-y-4 shadow-2xl">
                      <div className="flex items-center space-x-3 text-amber-400 font-black text-base">
                        <Award className="w-7 h-7 flex-shrink-0" />
                        <span>BARCHA 7 TA MODUL TAMOMLANDI! RASMIY IIB SERTIFIKATI TAYYOR!</span>
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
                              className="w-full bg-[#0b1633] border-2 border-slate-700 focus:border-amber-400 pl-10 p-3 text-sm font-bold text-white rounded-xl focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={handleFinishAndGoToCert}
                            className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center space-x-2 cursor-pointer transition-all hover:scale-105 border border-amber-300"
                          >
                            <Award className="w-4 h-4" />
                            <span>Sertifikatni Shakllantirish</span>
                          </button>
                        </div>
                        {nameError && (
                          <p className="text-xs font-bold text-rose-400">{nameError}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!passed && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-rose-500/40">
                  <span className="text-xs text-rose-200">
                    Modul slaydlari bo'yicha bilimlarni mustahkamlab, qayta topshirishingiz mumkin.
                  </span>
                  <button
                    onClick={handleRetakeQuiz}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-all flex items-center justify-center space-x-2 border border-indigo-400/40"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Qayta Topshirish</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Interactive Question Navigator Matrix (NEYTRAL VA ANIQ RANGLAR) */}
          <div className="bg-[#0b1633]/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-slate-400">Savollar:</span>
              <div className="flex items-center space-x-1.5">
                {module.quizQuestions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = activeQuestionIndex === idx;

                  let btnColor = "bg-[#070e24] text-slate-400 border-slate-800 hover:border-slate-700";
                  if (quizSubmitted) {
                    const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                    btnColor = isCorrect ? "bg-emerald-600 text-white border-emerald-400" : "bg-rose-600 text-white border-rose-400";
                  } else if (isCurrent) {
                    btnColor = "bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/50 scale-105 shadow-md shadow-indigo-950/80";
                  } else if (isAnswered) {
                    btnColor = "bg-indigo-950/80 text-indigo-300 border-indigo-700/80";
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
            <div className="bg-[#0b1633]/90 border border-indigo-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 backdrop-blur-xl">
              
              {/* Question Header (NEYTRAL KO'K/INDIGO NISHON) */}
              <div className="border-b border-slate-800 pb-4 flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-lg flex-shrink-0 mt-0.5 border border-indigo-400/40">
                    {activeQuestionIndex + 1}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                      Savol {activeQuestionIndex + 1} / {module.quizQuestions.length}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {currentQuestion.question}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tactile Option Cards (A, B, C, D) - 2-RASM TUZATILDI: NEYTRAL INDIGO/BLUE SELECTION */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, oIdx) => {
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  const letter = optionLetters[oIdx] || `${oIdx + 1}`;
                  const isThisSelected = selectedAnswers[currentQuestion.id] === oIdx;
                  const isThisCorrect = oIdx === currentQuestion.correctAnswer;

                  let cardStyle = "bg-[#070e24] border-slate-800 text-slate-200 hover:border-indigo-500/60 hover:bg-slate-900/90";

                  if (quizSubmitted) {
                    if (isThisCorrect) {
                      cardStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950/60";
                    } else if (isThisSelected && !isThisCorrect) {
                      cardStyle = "bg-rose-950/90 border-rose-500 text-rose-100 shadow-lg shadow-rose-950/60";
                    } else {
                      cardStyle = "bg-[#070e24]/50 border-slate-900 text-slate-500 opacity-60";
                    }
                  } else if (isThisSelected) {
                    // Sokin, ishonchli va neytral ko'k-indigo tanlov foni
                    cardStyle = "bg-indigo-600/20 border-indigo-400 text-white shadow-xl shadow-indigo-950/80 ring-2 ring-indigo-400/30";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(currentQuestion.id, oIdx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between border cursor-pointer ${cardStyle} hover:scale-[1.008] active:scale-[0.99]`}
                    >
                      <div className="flex items-center space-x-3.5 pr-3">
                        <span className={`w-7 h-7 rounded-lg font-mono font-black text-xs flex items-center justify-center flex-shrink-0 border transition-all ${
                          isThisSelected 
                            ? 'bg-indigo-600 text-white border-indigo-300 shadow' 
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {letter}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>

                      {quizSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {quizSubmitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Forensic Explanation Card */}
              {quizSubmitted && (
                <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-xs text-indigo-200 leading-relaxed shadow-inner">
                  <div className="font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kiberxavfsizlik Tahlili va Asosi:</span>
                  </div>
                  {currentQuestion.explanation}
                </div>
              )}

              {/* Question Footer Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeQuestionIndex === 0}
                  className="px-4 py-2.5 bg-[#070e24] hover:bg-slate-800 disabled:opacity-30 text-xs font-bold text-slate-300 rounded-xl border border-slate-700 flex items-center space-x-2 cursor-pointer transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Oldingi savol</span>
                </button>

                {activeQuestionIndex < module.quizQuestions.length - 1 ? (
                  <button
                    onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-xs font-black text-white rounded-xl shadow-lg flex items-center space-x-2 cursor-pointer transition-all border border-indigo-400/40"
                  >
                    <span>Keyingi savol</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : !quizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={!allQuestionsAnswered}
                    className={`px-7 py-3 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-2 ${
                      allQuestionsAnswered
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/80 cursor-pointer hover:scale-105 border border-emerald-400/40'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>{allQuestionsAnswered ? 'TESTNI YAKUNLASH VA NATIJANI KO\'RISH' : 'Barcha savollarni belgilang'}</span>
                  </button>
                ) : null}
              </div>

            </div>
          )}

        </div>
      )}

      {/* ── 4. TAB 3: ESSENTIAL READING / OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div className="bg-[#0b1633]/90 border border-indigo-500/30 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Modul O'quv Rejasi va Asosiy Qoidalar</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Ushbu modul doirasida o'zlashtirilishi shart bo'lgan axborot xavfsizligi qoidalari.
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
            <div className="bg-[#070e24] p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-400">Modul Xulosasi:</h4>
              <p>{module.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#070e24] p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                  ✓ Qat'iy Tavsiyalar
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Har bir xizmat uchun alohida, kamida 12-16 belgili parol qo'llang.</li>
                  <li>2FA (Authenticator) dasturini barcha asosiy akkauntlarga ulang.</li>
                  <li>Shubhali havolalarni ochishdan oldin domen manzilini tekshiring.</li>
                </ul>
              </div>

              <div className="bg-[#070e24] p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wide">
                  ✗ Qat'iyan Taqiqlanadi
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
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
