import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Award, 
  ArrowRight, 
  User, 
  CheckCircle2, 
  Play, 
  Lock, 
  Sparkles, 
  AlertCircle, 
  Info 
} from 'lucide-react';
import iibLogo from './iib.jpg';
import IntroModal from './IntroModal';
import { validateFullName } from '../utils/cyberUtils';

interface WelcomeScreenProps {
  initialName?: string;
  onStartCourse: (fullName: string) => void;
  onInstallApp?: () => void;
  isInstallable?: boolean;
}

export default function WelcomeScreen({ 
  initialName = '', 
  onStartCourse,
  onInstallApp,
  isInstallable = false
}: WelcomeScreenProps) {
  const [fullName, setFullName] = useState(initialName);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  const handleStart = () => {
    const validation = validateFullName(fullName);
    if (!validation.isValid) {
      setErrorMessage(validation.error || "Iltimos, Ism va Familiyangizni to'g'ri kiriting.");
      return;
    }
    setErrorMessage(null);
    onStartCourse(fullName.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Background Ambience Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main SaaS Container - Clean whitespace, minimal borders */}
      <div className="w-full max-w-5xl bg-[#091124]/90 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 space-y-8 relative">
        
        {/* Top Header Branding - Perfectly aligned single horizontal bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b border-slate-800/60 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-slate-700/60 bg-[#050b18] shadow-md flex-shrink-0 flex items-center justify-center">
              <img src={iibLogo} alt="IIB Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-[10px] font-mono font-semibold text-indigo-300 uppercase tracking-widest mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>O'zbekiston Respublikasi IIV</span>
              </div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight uppercase">
                Kiberjinoyatlarga Qarshi Kurashish Boshqarmasi
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Kibersavodxonlik Maxsus O'quv Portali
              </p>
            </div>
          </div>

          {/* Quick Action Badges - Aligned horizontally */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end flex-wrap gap-2">
            {isInstallable && onInstallApp && (
              <button
                onClick={onInstallApp}
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer border border-slate-700/50"
              >
                <span>📲 Ilovani O'rnatish</span>
              </button>
            )}
            <button
              onClick={() => setIsIntroOpen(true)}
              className="bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              title="Rasmiy Video Darslikni Ko'rish"
            >
              <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center flex-shrink-0">
                <Play className="w-2.5 h-2.5 ml-0.5 fill-white" />
              </div>
              <span>Video Darslik</span>
            </button>
          </div>
        </div>

        {/* PROMINENT VIDEO DARSLIK CALLOUT BANNER */}
        <div 
          onClick={() => setIsIntroOpen(true)}
          className="bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-indigo-500/20 hover:border-indigo-500/40 p-4 sm:p-5 rounded-2xl shadow-lg flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-indigo-500/10 text-[10px] font-mono font-medium text-indigo-300 uppercase tracking-wider mb-1">
                <span>🎬 Rasmiy Video Yo'riqnoma</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                Kursni boshlashdan oldin video darslikni tomosha qiling
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                O'quv kursi tuzilishi, modullar tartibi va imtihon talablari bo'yicha ko'rsatmalar.
              </p>
            </div>
          </div>
          
          <button className="hidden sm:flex px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm flex-shrink-0 items-center space-x-1.5 transition-all">
            <span>Ko'rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2-Column Hero & Registration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Left Column: Course Highlights & Pitch */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rasmiy O'quv Dasturi</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
              Raqamli Xavfsizlik va <span className="text-indigo-400">Kibersavodxonlik</span> Maxsus Kursi
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Ushbu platforma xodimlarning axborot xavfsizligi madaniyatini oshirish, zamonaviy kiber-hujumlar (fishing, ijtimoiy muhandislik, troyanlar va moliyaviy firibgarliklar) dan himoyalanish bo'yicha amaliy bilimlarni beradi.
            </p>

            {/* Informational Stats - No False Button Affordance, High Contrast */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/50 rounded-2xl p-4 space-y-1">
                <div className="flex items-center space-x-2 text-indigo-400">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-base sm:text-lg font-bold text-white">8 Modul</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">80 Ta Slayd</div>
              </div>
              <div className="bg-slate-900/50 rounded-2xl p-4 space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-base sm:text-lg font-bold text-white">80%</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">O'tish Balli</div>
              </div>
              <div className="bg-slate-900/50 rounded-2xl p-4 space-y-1">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Award className="w-4 h-4" />
                  <span className="text-base sm:text-lg font-bold text-white">Sertifikat</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">Rasmiy IIB Hujjati</div>
              </div>
            </div>
          </div>

          {/* Right Column: F.I.Sh Registration Card */}
          <div className="lg:col-span-5 bg-slate-900/60 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
            
            <div className="border-b border-slate-800/60 pb-3">
              <div className="text-[11px] font-mono font-semibold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Tinglovchi Ro'yxatdan O'tishi</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                F.I.Sh (Ism, Familiya, Sharifingiz)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Kiritilgan ma'lumotlar yakuniy rasmiy sertifikatda aks ettiriladi.
              </p>
            </div>

            {/* F.I.Sh Input Form */}
            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-300 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>To'liq F.I.Sh: <span className="text-rose-400">*</span></span>
              </label>

              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Masalan: Toshpulatov Behruz Alisherovich"
                  className={`w-full bg-[#050b18] border ${
                    errorMessage ? 'border-rose-500/80 focus:ring-rose-500/20' : 'border-slate-700/80 focus:border-indigo-500 focus:ring-indigo-500/20'
                  } p-3.5 text-sm font-medium text-white placeholder:text-slate-500 placeholder:font-normal rounded-xl focus:outline-none focus:ring-2 transition-all duration-150`}
                />
              </div>

              {/* Validation Error Message */}
              {errorMessage && (
                <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl flex items-start space-x-2 text-xs text-rose-200 animate-in fade-in duration-150">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Eslatma notice with perfect vertical baseline alignment */}
              <div className="flex items-start space-x-2 text-xs text-slate-400 pt-1">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="leading-normal">
                  Faqat lotin yoki kirill harflaridan foydalaning. Raqam va belgilar kiritilmaydi.
                </p>
              </div>
            </div>

            {/* Start CTA Button with Clean SVG Arrow */}
            <button
              onClick={handleStart}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-950/60 flex items-center justify-center space-x-2 cursor-pointer transition-all duration-150 active:scale-[0.98] group"
            >
              <span>KURSNI BOSHLASH</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

        {/* Footer Institutional Note */}
        <div className="text-center border-t border-slate-800/60 pt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 font-medium">
          <div>O'zbekiston Respublikasi IIB — Kiberxavfsizlik Akademiyasi</div>
          <div className="flex items-center space-x-1.5 text-indigo-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kibersavodxonlik Maxsus O'quv Kursi</span>
          </div>
        </div>

      </div>

      {/* Intro Video Modal */}
      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />

    </div>
  );
}
