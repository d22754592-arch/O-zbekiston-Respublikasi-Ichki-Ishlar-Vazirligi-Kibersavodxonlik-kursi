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
  Check,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { logger } from '../utils/logger';
import { validateFullName } from '../utils/cyberUtils';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

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
  const { t } = useLanguage();
  const { isDark } = useTheme();
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

  // Smart preloading for adjacent slides to guarantee zero latency & smooth transitions
  useEffect(() => {
    if (slides && slides.length > 0) {
      const preloadIndices = [
        currentSlideIndex + 1,
        currentSlideIndex + 2,
        currentSlideIndex - 1
      ];
      preloadIndices.forEach(idx => {
        if (idx >= 0 && idx < slides.length) {
          const img = new Image();
          img.src = slides[idx].url;
        }
      });
    }
  }, [currentSlideIndex, slides]);

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

  // Theme-derived styles
  const cardBg = isDark ? 'bg-[#091124]/90 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm';
  const subText = isDark ? 'text-slate-300' : 'text-slate-600';
  const innerCard = isDark ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-50 border-slate-200';

  return (
    <div className={`space-y-6 font-sans ${isFullscreen ? 'bg-black p-0 m-0 min-h-screen w-full flex flex-col justify-between' : ''}`} ref={containerRef}>

      {/* ── 1. MODULE EXECUTIVE HEADER (Hidden in Fullscreen or Focus Mode) ── */}
      {!isFocusMode && !isFullscreen && (
        <div className={`${cardBg} border p-6 sm:p-7 rounded-3xl shadow-xl backdrop-blur-xl transition-all space-y-5`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-indigo-500 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('moduleTag', { id: module.id })}</span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
                {module.title}
              </h1>
              <p className={`text-xs sm:text-sm font-normal mt-1.5 leading-relaxed max-w-3xl ${subText}`}>
                {module.description}
              </p>
            </div>

            {/* Status Indicator */}
            {isCompleted && (
              <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold px-3.5 py-2 rounded-xl self-start md:self-auto shadow-sm flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t('moduleCompletedBadge', { score: previousScore || scorePercent })}</span>
              </div>
            )}
          </div>

          {/* Unified Segmented Tab Bar - Connected Tab Architecture */}
          <div className={`flex items-center p-1 rounded-2xl border w-full sm:w-auto overflow-x-auto gap-1 ${
            isDark ? 'bg-[#050b18] border-slate-800/70' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setActiveTab('slides')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer flex-shrink-0 ${
                activeTab === 'slides' 
                  ? 'bg-indigo-600 text-white shadow-sm font-bold' 
                  : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t('tabSlides', { count: module.slideCount })}</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer flex-shrink-0 ${
                activeTab === 'quiz' 
                  ? 'bg-indigo-600 text-white shadow-sm font-bold' 
                  : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('tabQuiz', { count: module.quizQuestions.length })}</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer flex-shrink-0 ${
                activeTab === 'overview' 
                  ? 'bg-indigo-600 text-white shadow-sm font-bold' 
                  : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>{t('tabOverview')}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 2. TAB 1: PRESENTATION SLIDES CANVAS ── */}
      {activeTab === 'slides' && (
        <div className={isFullscreen ? "h-screen w-full flex flex-col justify-between bg-black p-2 sm:p-4" : "space-y-4"}>
          
          {/* Top Floating Control Bar */}
          <div className={`px-4 py-2.5 rounded-2xl flex items-center justify-between shadow-lg backdrop-blur-md sticky top-2 z-20 transition-all ${
            isFullscreen 
              ? 'bg-slate-900/90 border border-slate-700 text-white mx-2 mb-2' 
              : cardBg
          }`}>
            <div className="flex items-center space-x-2">
              <span className="bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-lg font-mono font-bold text-xs">
                {t('slideOf', { current: currentSlideIndex + 1, total: module.slideCount })}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className={`p-2 rounded-xl border transition-colors cursor-pointer disabled:opacity-30 ${
                  isDark ? 'bg-slate-900 hover:bg-slate-800 border-slate-700/60 text-white' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                }`}
                title="Oldingi slayd (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.min(module.slideCount - 1, prev + 1))}
                disabled={currentSlideIndex === module.slideCount - 1}
                className={`p-2 rounded-xl border transition-colors cursor-pointer disabled:opacity-30 ${
                  isDark ? 'bg-slate-900 hover:bg-slate-800 border-slate-700/60 text-white' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                }`}
                title="Keyingi slayd (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {!isFullscreen && (
                <button
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    isFocusMode 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-400' 
                      : isDark ? 'bg-slate-900 border-slate-700/60 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                  }`}
                  title={t('focusMode')}
                >
                  <span>{isFocusMode ? t('normalMode') : t('focusMode')}</span>
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center space-x-1.5 cursor-pointer border transition-colors ${
                  isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700/60' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-300'
                }`}
                title={t('fullscreen')}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isFullscreen ? t('exitFullscreen') : t('fullscreen')}</span>
              </button>
            </div>
          </div>

          {/* 16:9 Presentation Screen */}
          <div 
            ref={slideContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={
              isFullscreen
                ? "flex-1 w-full h-full flex items-center justify-center relative select-none overflow-hidden my-auto"
                : `relative border rounded-3xl shadow-xl overflow-hidden flex flex-col items-center justify-center p-3 sm:p-5 select-none ${
                    isDark ? 'bg-[#050b18] border-slate-800/80' : 'bg-slate-900 border-slate-300'
                  }`
            }
          >
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

            {!isFullscreen && (
              <div className="w-full max-w-5xl mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer border ${
                        currentSlideIndex === idx
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm scale-105'
                          : isDark ? 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-xs font-mono text-slate-400">
                    {t('slideProgress')} <span className="text-emerald-400 font-bold">{Math.round(((currentSlideIndex + 1) / module.slideCount) * 100)}%</span>
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

          {/* Bottom Action Prompt */}
          {!isFullscreen && (
            <div className={`${cardBg} border p-5 sm:p-6 rounded-3xl shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-emerald-500 text-xs font-mono font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('slidesCompletedPrompt')}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold">{t('slidesCompletedPrompt')}</h4>
                <p className={`text-xs ${subText}`}>
                  {t('slidesCompletedDesc', { count: module.quizQuestions.length })}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95 flex-shrink-0"
              >
                <span>{t('takeQuizBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* ── 3. TAB 2: QUIZ ASSESSMENT ENGINE ── */}
      {activeTab === 'quiz' && (
        <div className="space-y-5">

          {/* Quiz Briefing Bar (Clean Minimal Header) */}
          <div className={`${cardBg} border p-5 sm:p-6 rounded-3xl shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {module.title}
              </h3>
              <p className={`text-xs mt-1 ${subText}`}>
                {t('quizTestDesc')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className={`${innerCard} px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 ${subText}`}>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('unlimitedTime')}</span>
              </div>
              <div className={`${innerCard} px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 ${subText}`}>
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('unlimitedRetakes')}</span>
              </div>
              <div className="bg-indigo-600/15 text-indigo-400 px-3 py-1.5 rounded-xl text-xs font-mono font-bold">
                {t('passingRequirement')}
              </div>
            </div>
          </div>

          {/* Result Banner */}
          {quizSubmitted && (
            <div className={`p-6 sm:p-7 rounded-3xl space-y-5 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-150 ${
              passed
                ? isDark ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-100' : 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                : isDark ? 'bg-rose-950/80 border border-rose-500/60 text-rose-100' : 'bg-rose-50 border border-rose-300 text-rose-900'
            }`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                  passed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {passed ? <CheckCircle2 className="w-8 h-8 stroke-[2.5]" /> : <XCircle className="w-8 h-8 stroke-[2.5]" />}
                </div>
                <div>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider mb-1.5 bg-black/20">
                    <span>{passed ? t('quizPassedTitle') : t('quizFailedTitle')}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                    {passed ? t('quizPassed') : t('quizFailed')}
                  </h4>
                  <p className="text-xs sm:text-sm mt-1 opacity-90">
                    {t('yourScore')} <b className="font-mono font-bold px-2 py-0.5 rounded bg-black/30">{scorePercent}%</b> ({t('passingRequirement')})
                  </p>
                </div>
              </div>

              {passed && (
                <div className="pt-5 border-t border-emerald-500/30 space-y-4">
                  {!isLastModule ? (
                    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-emerald-400/20 ${
                      isDark ? 'bg-slate-900/60' : 'bg-white'
                    }`}>
                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                        {t('moduleUnlockedNext')}
                      </div>
                      {onGoToNextModule && (
                        <button
                          onClick={onGoToNextModule}
                          className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center space-x-2"
                        >
                          <span>{t('goToNextModule')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className={`border border-amber-400/40 p-5 rounded-2xl space-y-4 shadow-xl ${
                      isDark ? 'bg-[#050b18]' : 'bg-white'
                    }`}>
                      <div className="flex items-center space-x-2.5 text-amber-500 font-bold text-sm sm:text-base">
                        <Award className="w-6 h-6 flex-shrink-0" />
                        <span>{t('allModulesCompletedBanner')}</span>
                      </div>
                      <p className={`text-xs ${subText}`}>
                        {t('verifyCertName')}
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
                              placeholder={t('fullNamePlaceholder')}
                              className={`w-full border focus:border-amber-400 pl-10 p-3 text-sm font-semibold rounded-xl focus:outline-none ${
                                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>
                          <button
                            onClick={handleFinishAndGoToCert}
                            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all flex-shrink-0"
                          >
                            <Award className="w-4 h-4" />
                            <span>{t('getCertBtn')}</span>
                          </button>
                        </div>
                        {nameError && (
                          <p className="text-xs font-semibold text-rose-500">{nameError}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!passed && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-rose-500/30">
                  <span className="text-xs opacity-90">
                    {t('retakeHint')}
                  </span>
                  <button
                    onClick={handleRetakeQuiz}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t('retakeBtn')}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Questions Matrix */}
          <div className={`${cardBg} border p-4 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-3`}>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-slate-400">{t('questionsMatrix')}</span>
              <div className="flex items-center space-x-1.5">
                {module.quizQuestions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = activeQuestionIndex === idx;

                  let btnColor = isDark ? "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700" : "bg-slate-100 text-slate-600 border-slate-300 hover:border-slate-400";
                  if (quizSubmitted) {
                    const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                    btnColor = isCorrect ? "bg-emerald-600 text-white border-emerald-500" : "bg-rose-600 text-white border-rose-500";
                  } else if (isCurrent) {
                    btnColor = "bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/30 scale-105 shadow-sm";
                  } else if (isAnswered) {
                    btnColor = isDark ? "bg-slate-800 text-indigo-300 border-indigo-500/40" : "bg-indigo-50 text-indigo-700 border-indigo-300";
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
              {t('selectedCount')} <b className="text-indigo-500 font-bold">{answeredCount}</b> / {module.quizQuestions.length}
            </div>
          </div>

          {/* Single Focused Question */}
          {currentQuestion && (
            <div className={`${cardBg} border p-6 sm:p-7 rounded-3xl shadow-xl space-y-5 backdrop-blur-xl`}>
              
              <div className={`border-b pb-3 flex items-start space-x-3 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {activeQuestionIndex + 1}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-500 font-semibold uppercase tracking-wider block mb-0.5">
                    {t('questionOf', { current: activeQuestionIndex + 1, total: module.quizQuestions.length })}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold leading-snug">
                    {currentQuestion.question}
                  </h3>
                </div>
              </div>

              {/* Option Cards */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, oIdx) => {
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  const letter = optionLetters[oIdx] || `${oIdx + 1}`;
                  const isThisSelected = selectedAnswers[currentQuestion.id] === oIdx;
                  const isThisCorrect = oIdx === currentQuestion.correctAnswer;

                  let cardStyle = isDark 
                    ? "bg-slate-900/50 border-slate-800/80 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-900/80" 
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/30";

                  if (quizSubmitted) {
                    if (isThisCorrect) {
                      cardStyle = isDark ? "bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-sm" : "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm";
                    } else if (isThisSelected && !isThisCorrect) {
                      cardStyle = isDark ? "bg-rose-950/80 border-rose-500 text-rose-100 shadow-sm" : "bg-rose-50 border-rose-500 text-rose-900 shadow-sm";
                    } else {
                      cardStyle = isDark ? "bg-slate-900/20 border-slate-900 text-slate-600 opacity-40" : "bg-slate-100/50 border-slate-200 text-slate-400 opacity-50";
                    }
                  } else if (isThisSelected) {
                    cardStyle = isDark 
                      ? "bg-indigo-600/15 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/30" 
                      : "bg-indigo-50 border-indigo-500 text-indigo-950 shadow-sm ring-1 ring-indigo-500/30";
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
                            : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {letter}
                        </span>
                        <span className="leading-normal">{opt}</span>
                      </div>

                      {quizSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      )}
                      {quizSubmitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Forensic Explanation */}
              {quizSubmitted && (
                <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                  isDark ? 'bg-indigo-950/30 border-indigo-500/20 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                }`}>
                  <div className="font-bold text-amber-500 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t('cyberAnalysisTag')}</span>
                  </div>
                  {currentQuestion.explanation}
                </div>
              )}

              {/* Navigation */}
              <div className={`flex items-center justify-between pt-3 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                <button
                  onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeQuestionIndex === 0}
                  className={`px-3.5 py-2 disabled:opacity-30 text-xs font-semibold rounded-xl border flex items-center space-x-1.5 cursor-pointer transition-colors ${
                    isDark ? 'bg-slate-900 hover:bg-slate-800 border-slate-700/60 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('prevQuestion')}</span>
                </button>

                {activeQuestionIndex < module.quizQuestions.length - 1 ? (
                  <button
                    onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-sm flex items-center space-x-1.5 cursor-pointer transition-colors"
                  >
                    <span>{t('nextQuestion')}</span>
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
                    <span>{allQuestionsAnswered ? t('finishTest') : t('selectAllQuestions')}</span>
                  </button>
                ) : null}
              </div>

            </div>
          )}

        </div>
      )}

      {/* ── 4. TAB 3: ESSENTIAL READING / OVERVIEW (Rich Forensic Study Guide) ── */}
      {activeTab === 'overview' && (
        <div className={`${cardBg} border p-6 sm:p-8 rounded-3xl shadow-xl backdrop-blur-xl space-y-6`}>
          
          <div className={`border-b pb-3 flex items-start justify-between ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
            <div>
              <div className="flex items-center space-x-2 text-indigo-500 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>{t('overviewTitle')}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold">
                {module.title}
              </h3>
              <p className={`text-xs mt-0.5 ${subText}`}>
                {t('overviewDesc')}
              </p>
            </div>
          </div>

          <div className="space-y-5 text-xs sm:text-sm leading-relaxed font-normal">
            
            {/* Golden Key Rule Callout Banner */}
            {module.overview?.keyRule && (
              <div className="bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-transparent border-l-4 border-amber-500 p-4 rounded-xl flex items-start space-x-3 shadow-sm">
                <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-500 uppercase tracking-wider block mb-0.5">
                    {t('keyRuleTag')}
                  </span>
                  <p className="text-xs sm:text-sm font-bold leading-normal text-amber-400 dark:text-amber-300">
                    "{module.overview.keyRule}"
                  </p>
                </div>
              </div>
            )}

            {/* Module Core Summary Card */}
            <div className={`${innerCard} p-4 sm:p-5 rounded-2xl border space-y-2`}>
              <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>{t('moduleSummary')}</span>
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed ${subText}`}>
                {module.overview?.summary || module.description}
              </p>
            </div>

            {/* 2-Column DOs and DONTs Matrix (Dynamic Localized Content) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Strict Recommendations (DOs) */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/80 border-emerald-200'
              }`}>
                <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{t('strictRecommendations')}</span>
                </div>
                
                <ul className="space-y-2.5">
                  {(module.overview?.dos || []).map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strictly Forbidden (DONTs) */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/80 border-rose-200'
              }`}>
                <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>{t('strictlyForbidden')}</span>
                </div>

                <ul className="space-y-2.5">
                  {(module.overview?.donts || []).map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Quick Action to Quiz */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all flex items-center space-x-2"
              >
                <span>{t('takeQuizBtn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
