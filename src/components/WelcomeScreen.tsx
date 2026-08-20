import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Award, 
  ArrowRight, 
  User, 
  CheckCircle2, 
  Video, 
  Lock, 
  Clock, 
  Sparkles,
  AlertCircle,
  FileCheck2
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
    <div className="min-h-screen bg-[#060d1f] text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Background Ambience Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
      </div>

      {/* Main Executive Institutional Container */}
      <div className="w-full max-w-5xl bg-[#0b1633]/90 backdrop-blur-xl border border-indigo-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 space-y-10 relative overflow-hidden">
        
        {/* Subtle decorative grid header badge */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

        {/* Top Header Branding */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-br from-indigo-500 to-blue-700 shadow-xl shadow-indigo-950/60 flex-shrink-0">
              <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-white/20">
                <img src={iibLogo} alt="IIB Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-[11px] font-mono font-bold text-indigo-300 uppercase tracking-widest mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>O'zbekiston Respublikasi IIV</span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                Kiberjinoyatlarga Qarshi Kurashish Boshqarmasi
              </h1>
              <p className="text-xs text-amber-400 font-mono font-bold tracking-wider uppercase mt-0.5">
                Kibersavodxonlik Maxsus O'quv Portali
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {isInstallable && onInstallApp && (
              <button
                onClick={onInstallApp}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/80 hover:scale-105 border border-emerald-400/40"
              >
                <span>📲 Ilovani O'rnatish</span>
              </button>
            )}
            <button
              onClick={() => setIsIntroOpen(true)}
              className="w-full sm:w-auto bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-400/40 text-indigo-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer hover:shadow-lg hover:shadow-indigo-900/40"
            >
              <Video className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Video Instruksiya</span>
            </button>
          </div>
        </div>

        {/* 2-Column Hero & Onboarding Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Course Highlights & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Rasmiy Kiberxavfsizlik Dasturi</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
              Raqamli Xavfsizlik va <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
                Kibersavodxonlik Maxsus Kursi
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Ushbu platforma xodimlarning axborot xavfsizligi madaniyatini oshirish, zamonaviy kiber-hujumlar (fishing, ijtimoiy muhandislik, troyanlar va moliyaviy firibgarliklar) dan himoyalanish bo'yicha amaliy bilimlarni beradi.
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#070e24] border border-slate-800 p-3.5 rounded-2xl">
                <div className="text-xl font-black text-indigo-400">7 Modul</div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">70 Ta Slayd</div>
              </div>
              <div className="bg-[#070e24] border border-slate-800 p-3.5 rounded-2xl">
                <div className="text-xl font-black text-emerald-400">80%</div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">O'tish Balli</div>
              </div>
              <div className="bg-[#070e24] border border-slate-800 p-3.5 rounded-2xl">
                <div className="text-xl font-black text-amber-400">Sertifikat</div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">Mavjud</div>
              </div>
            </div>
          </div>

          {/* Right Column: F.I.Sh Registration & Digital ID Card */}
          <div className="lg:col-span-5 bg-[#070e24] border border-indigo-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <div className="border-b border-slate-800 pb-4">
              <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Tinglovchini Ro'yxatdan O'tkazish</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                F.I.Sh (Ism, Familiya, Sharifingiz)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Kiritilgan ma'lumotlar yakuniy rasmiy sertifikatda aks ettiriladi.
              </p>
            </div>

            {/* F.I.Sh Input Form */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-200 flex items-center space-x-2">
                <User className="w-4 h-4 text-indigo-400" />
                <span>To'liq F.I.Sh: <span className="text-rose-400">*</span></span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Masalan: Toshpulatov Behruz Alisherovich"
                  className={`w-full bg-[#0b1633] border-2 ${
                    errorMessage ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                  } p-4 text-sm font-bold text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200`}
                />
              </div>

              {/* Validation Error Message */}
              {errorMessage && (
                <div className="p-3.5 bg-rose-950/80 border border-rose-500/60 rounded-xl flex items-start space-x-2.5 text-xs text-rose-200 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="text-[11px] text-slate-400 leading-normal">
                ℹ️ <strong>Eslatma:</strong> Faqat lotin yoki kirill harflaridan foydalaning. Raqamlar va belgilar qabul qilinmaydi.
              </p>
            </div>

            {/* Start CTA Button */}
            <button
              onClick={handleStart}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-xl shadow-indigo-950/80 flex items-center justify-center space-x-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-indigo-400/40 group"
            >
              <span>KURSNI BOSHLASH</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

        {/* Footer Institutional Note */}
        <div className="text-center border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 font-mono">
          <div>O'zbekiston Respublikasi IIB — Kiberxavfsizlik Akademiyasi</div>
          <div className="flex items-center space-x-2 text-indigo-400/80">
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
