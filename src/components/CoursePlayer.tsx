import React, { useState, useEffect, useRef } from 'react';
import { ModuleData } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  HelpCircle, 
  Maximize2, 
  ChevronUp, 
  ChevronDown,
  Award,
  BookOpen,
  User
} from 'lucide-react';
import { logger } from '../utils/logger';

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
  const [activeTab, setActiveTab] = useState<'slides' | 'quiz'>('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [scorePercent, setScorePercent] = useState(previousScore);
  const [tempName, setTempName] = useState(userName);

  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    setActiveTab('slides');
    setCurrentSlideIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    logger.info(`Loaded module: ${module.title}`);
  }, [module.id]);

  useEffect(() => {
    setTempName(userName);
  }, [userName]);

  const slides = Array.from({ length: module.slideCount }, (_, i) => ({
    id: i + 1,
    url: `${module.slideFolder}/slide_${i + 1}.png`,
  }));

  const handleScrollToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    if (slideRefs.current[index]) {
      slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        logger.error(`Fullscreen error: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

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

    if (calculatedScore >= 65) {
      onCompleteModule(module.id, calculatedScore);
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setActiveTab('quiz');
  };

  const handleFinishAndGoToCert = () => {
    if (tempName.trim() && onSaveUserName) {
      onSaveUserName(tempName.trim());
    }
    if (onGoToCertificate) {
      onGoToCertificate();
    }
  };

  const passed = scorePercent >= 65;
  const allQuestionsAnswered = module.quizQuestions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="space-y-6" ref={containerRef}>

      {/* Module Header - 100% Bold White Text */}
      <div className="bg-slate-950 border-b-4 border-indigo-500 p-6 md:p-7 rounded-xl text-white shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-white text-xs font-mono font-black uppercase tracking-wider mb-1.5">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Dars Moduli #{module.id}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{module.title}</h1>
            <p className="text-sm text-white font-black mt-2 leading-relaxed">{module.description}</p>
          </div>

          {isCompleted && (
            <div className="flex items-center space-x-2 bg-emerald-500/30 border-2 border-emerald-400 text-emerald-300 text-xs font-black px-4 py-2.5 rounded-full self-start md:self-auto shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Yakunlangan ({previousScore || scorePercent}%)</span>
            </div>
          )}
        </div>

        {/* Tab Selectors - High Contrast Bold White */}
        <div className="flex items-center space-x-3 mt-6 border-t-2 border-slate-800 pt-4">
          <button
            onClick={() => setActiveTab('slides')}
            className={`px-5 py-3 text-xs font-black rounded-xl transition-all flex items-center space-x-2 cursor-pointer border-2 ${
              activeTab === 'slides' 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl ring-2 ring-indigo-400' 
                : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4.5 h-4.5 text-white" />
            <span className="text-white font-black">1. Dars Slaydlari ({module.slideCount} Slayd)</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-3 text-xs font-black rounded-xl transition-all flex items-center space-x-2 cursor-pointer border-2 ${
              activeTab === 'quiz' 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl ring-2 ring-indigo-400' 
                : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4.5 h-4.5 text-white" />
            <span className="text-white font-black">2. Modul Testi ({module.quizQuestions.length} Savol)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SLIDE VIEWER */}
      {activeTab === 'slides' && (
        <div className="space-y-4">
          <div className="bg-white border-2 border-slate-300 p-3.5 rounded-xl flex items-center justify-between shadow-md sticky top-2 z-20">
            <div className="flex items-center space-x-2 text-xs font-black text-slate-900">
              <span>Slaydlar:</span>
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-md font-mono font-black text-xs">
                {currentSlideIndex + 1} / {module.slideCount}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleScrollToSlide(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0}
                className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-900 rounded font-black cursor-pointer border border-slate-300"
                title="Oldingi slayd"
              >
                <ChevronUp className="w-4 h-4 text-slate-900" />
              </button>
              <button
                onClick={() => handleScrollToSlide(Math.min(module.slideCount - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === module.slideCount - 1}
                className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-900 rounded font-black cursor-pointer border border-slate-300"
                title="Keyingi slayd"
              >
                <ChevronDown className="w-4 h-4 text-slate-900" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
                title="To'liq ekranda ko'rish"
              >
                <Maximize2 className="w-4 h-4 text-white" />
                <span className="hidden sm:inline text-white font-black">Kattalashtirish</span>
              </button>
            </div>
          </div>

          <div className="bg-black p-4 md:p-6 rounded-xl shadow-2xl space-y-6 overflow-y-auto max-h-[78vh] border-2 border-slate-800">
            {slides.map((slide, idx) => (
              <div key={slide.id} className="relative flex flex-col items-center">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-slate-700">
                  <img
                    ref={el => (slideRefs.current[idx] = el)}
                    src={slide.url}
                    alt={`Slayd #${slide.id}`}
                    className="w-full h-auto object-contain block"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 text-xs font-mono font-black text-amber-300 bg-slate-900 px-3.5 py-1 rounded-full border border-slate-700 shadow">
                  Slayd #{slide.id} / {module.slideCount}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="bg-white border-2 border-slate-300 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-black text-slate-900">Slaydlarni o'rganib bo'ldingizmi?</h4>
              <p className="text-xs text-slate-800 font-bold mt-0.5">
                Bilimingizni sinash uchun modul testini topshiring (Minimal o'tish balli: 65%)
              </p>
            </div>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center space-x-2 cursor-pointer transition-all active:translate-y-px"
            >
              <span className="text-white font-black">Modul Testiga o'tish</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: MODULE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-white border-2 border-slate-300 p-6 rounded-xl shadow-lg space-y-6">

          <div className="border-b-2 border-slate-200 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span>Modul Testi ({module.quizQuestions.length} Savol)</span>
              </h3>
              <p className="text-xs font-bold text-slate-800 mt-1">
                Barcha savollarga javob bering. Modulni yakunlash uchun kamida <b>65%</b> to'g'ri topshirishingiz kerak.
              </p>
            </div>
            <div className="bg-indigo-100 border border-indigo-300 px-3.5 py-1.5 rounded-lg text-xs font-black text-indigo-950 font-mono">
              O'tish balli: 65%
            </div>
          </div>

          {/* Quiz Result Banner */}
          {quizSubmitted && (
            <div className={`p-6 rounded-xl border-2 space-y-4 shadow-md ${
              passed
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : 'bg-rose-50 border-rose-500 text-rose-950'
            }`}>
              <div className="flex items-center space-x-4">
                {passed ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-10 h-10 text-rose-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight">
                    {passed ? 'Tabriklaymiz! Test muvaffaqiyatli topshirildi' : 'Test natijasi yetarli emas'}
                  </h4>
                  <p className="text-xs font-bold mt-0.5">
                    Sizning natijangiz: <b className="text-base font-mono underline">{scorePercent}%</b> (Minimal o'tish balli: 65%)
                  </p>
                </div>
              </div>

              {passed && (
                <div className="pt-3 border-t border-emerald-300 space-y-3">
                  {!isLastModule ? (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-black text-emerald-900">
                        ✓ Keyingi modul qulfdan chiqarildi!
                      </span>
                      {onGoToNextModule && (
                        <button
                          onClick={onGoToNextModule}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all flex items-center space-x-2"
                        >
                          <span className="text-white font-black">Keyingi Modulga o'tish</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white border-2 border-emerald-400 p-5 rounded-xl space-y-3 shadow-md">
                      <div className="flex items-center space-x-2 text-emerald-950 font-black text-sm">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span>BARCHA 7 TA MODUL TAMOMLANDI! SERTIFIKAT TAYYOR!</span>
                      </div>
                      <p className="text-xs text-slate-800 font-bold">
                        Sertifikatga yoziladigan ism va familiyangizni (F.I.Sh) kiriting:
                      </p>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                          <User className="w-4 h-4 text-indigo-600 absolute left-3 top-3.5" />
                          <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            placeholder="Masalan: Toshpulatov Behruz Alisherovich"
                            className="w-full bg-slate-50 border-2 border-slate-300 focus:border-indigo-600 pl-9 p-3 text-xs font-bold text-slate-900 rounded-xl focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={handleFinishAndGoToCert}
                          disabled={!tempName.trim()}
                          className={`px-6 py-3 font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all
                            ${tempName.trim() 
                              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 border border-amber-600 font-black' 
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                        >
                          <Award className="w-4 h-4" />
                          <span>Sertifikatni shakllantirish va ko'rish</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!passed && (
                <div className="flex items-center justify-between pt-3 border-t border-rose-300">
                  <span className="text-xs font-bold text-rose-900">
                    Slaydlarni qayta o'rganib chiqing va qayta topshiring.
                  </span>
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all flex items-center space-x-1.5"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                    <span className="text-white font-black">Qayta topshirish</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Question Cards */}
          <div className="space-y-6">
            {module.quizQuestions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div 
                  key={q.id} 
                  className={`p-5 rounded-xl border-2 transition-all shadow-sm ${
                    quizSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/90 border-emerald-400'
                        : 'bg-rose-50/90 border-rose-400'
                      : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  <h4 className="text-sm font-black text-slate-900 mb-3 flex items-start space-x-3">
                    <span className="bg-indigo-600 text-white text-xs font-mono font-black w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0 mt-0.5 shadow">
                      {qIdx + 1}
                    </span>
                    <span className="leading-snug text-slate-900 font-black">{q.question}</span>
                  </h4>

                  <div className="space-y-2.5 pl-9">
                    {q.options.map((opt, oIdx) => {
                      const isThisSelected = selectedOpt === oIdx;
                      const isThisCorrect = oIdx === q.correctAnswer;

                      let btnStyle = "bg-white border-2 border-slate-300 text-slate-900 font-bold hover:border-indigo-600 hover:bg-indigo-50/80 hover:shadow-md hover:scale-[1.003] active:scale-[0.997] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200";

                      if (quizSubmitted) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-600 border-2 border-emerald-600 text-white font-black shadow-lg scale-[1.005]";
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = "bg-rose-600 border-2 border-rose-600 text-white font-black shadow-lg";
                        } else {
                          btnStyle = "bg-white border-slate-200 text-slate-400 opacity-50 font-semibold";
                        }
                      } else if (isThisSelected) {
                        btnStyle = "bg-indigo-600 border-2 border-indigo-600 text-white font-black shadow-xl ring-4 ring-indigo-400/30 scale-[1.005]";
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span className="flex-1 pr-2">{opt}</span>
                          {quizSubmitted && isThisCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                          )}
                          {quizSubmitted && isThisSelected && !isThisCorrect && (
                            <XCircle className="w-5 h-5 text-white flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-3.5 ml-9 p-3.5 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold shadow-sm">
                      <b className="text-indigo-900 uppercase">Tushuntirish:</b> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted && (
            <div className="flex justify-end pt-4 border-t-2 border-slate-200">
              <button
                onClick={handleSubmitQuiz}
                disabled={!allQuestionsAnswered}
                className={`px-8 py-3.5 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-2
                  ${allQuestionsAnswered
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl cursor-pointer active:translate-y-px'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300 font-bold'
                  }`}
              >
                <Award className="w-4 h-4 text-white" />
                <span className={allQuestionsAnswered ? 'text-white font-black' : 'text-slate-500 font-bold'}>
                  {allQuestionsAnswered ? "Natijani Hisoblash" : "Barcha savollarga javob bering"}
                </span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
