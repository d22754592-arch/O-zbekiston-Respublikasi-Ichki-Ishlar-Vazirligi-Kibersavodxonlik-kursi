import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Award, ArrowRight, User, CheckCircle2, Video } from 'lucide-react';
import iibLogo from './iib.jpg';
import IntroModal from './IntroModal';

interface WelcomeScreenProps {
  initialName?: string;
  onStartCourse: (fullName: string) => void;
}

export default function WelcomeScreen({ initialName = '', onStartCourse }: WelcomeScreenProps) {
  const [fullName, setFullName] = useState(initialName);
  const [error, setError] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  const handleStart = () => {
    if (!fullName.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onStartCourse(fullName.trim());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Main Professional Container */}
      <div className="w-full max-w-4xl bg-slate-900 border-4 border-indigo-600 rounded-2xl shadow-2xl p-6 md:p-10 space-y-8 relative overflow-hidden">
        
        {/* Top Header Branding - 100% Bold White Text */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-slate-800 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-400 shadow-xl flex-shrink-0">
              <img src={iibLogo} alt="IIB Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase font-sans">
                O'zbekiston Respublikasi Ichki Ishlar Vazirligi
              </h1>
              <p className="text-xs text-white font-mono font-black tracking-widest uppercase mt-0.5">
                Kibersavodxonlik Maxsus O'quv Kursi
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsIntroOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-indigo-400 px-4 py-2 rounded-xl text-xs font-black text-white font-mono flex items-center space-x-2 shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Video className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Video Instruksiya</span>
            </button>

            <div className="hidden sm:flex bg-indigo-600 border-2 border-indigo-400 px-4 py-2 rounded-xl text-xs font-black text-white font-mono items-center space-x-2 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="text-white font-black">Rasmiy Ta'lim</span>
            </div>
          </div>
        </div>

        {/* Hero Section - All Pure Bold White Text */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight font-sans">
                Kibersavodxonlik kursiga Xush kelibsiz!
              </h2>
              <p className="text-xs font-mono font-bold text-indigo-400 mt-1">
                Farg'ona viloyati IIB Kiberjinoyatlarga qarshi kurashish boshqarmasi
              </p>
            </div>

            <button
              onClick={() => setIsIntroOpen(true)}
              className="bg-indigo-600/90 hover:bg-indigo-500 border-2 border-indigo-400 text-white font-black text-xs px-4 py-3 rounded-xl flex items-center justify-center space-x-2 shadow-xl cursor-pointer transition-all hover:scale-105"
            >
              <Video className="w-4.5 h-4.5 text-white" />
              <span>🎬 AI Avatar Tanishtiruv Videosi</span>
            </button>
          </div>

          <p className="text-sm md:text-base text-white font-black leading-relaxed max-w-3xl">
            Ushbu kurs 7 ta maxsus dars modulidan iborat bo'lib, axborot xavfsizligi, parollar gigiyenasi, 
            2FA autentifikatsiya, ijtimoiy muhandislik va kiber-firibgarliklardan himoyalanish bo'yicha amaliy bilimlarni beradi.
          </p>
        </div>

        {/* Features Checklist - Enhanced UI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950/80 border-2 border-slate-700 hover:border-indigo-500 hover:bg-slate-900/90 p-4 rounded-xl flex items-center space-x-3 shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
            <BookOpen className="w-8 h-8 text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wide">7 Ta Dars Moduli</div>
              <div className="text-xs font-black text-slate-300 mt-0.5">70 Ta Tayyor Slaydlar</div>
            </div>
          </div>

          <div className="bg-slate-950/80 border-2 border-slate-700 hover:border-emerald-500 hover:bg-slate-900/90 p-4 rounded-xl flex items-center space-x-3 shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wide">Bilim Testi</div>
              <div className="text-xs font-black text-slate-300 mt-0.5">65% O'tish Balli</div>
            </div>
          </div>

          <div className="bg-slate-950/80 border-2 border-slate-700 hover:border-amber-500 hover:bg-slate-900/90 p-4 rounded-xl flex items-center space-x-3 shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
            <Award className="w-8 h-8 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wide">Rasmiy Sertifikat</div>
              <div className="text-xs font-black text-slate-300 mt-0.5">F.I.Sh Bilan Generatsiya</div>
            </div>
          </div>
        </div>

        {/* Mandatory F.I.Sh Input & Start Button */}
        <div className="bg-slate-950 border-2 border-indigo-500 p-6 rounded-xl space-y-4 shadow-2xl">
          <div>
            <label className="block text-xs font-black text-white uppercase tracking-wider mb-2 flex items-center space-x-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span className="text-white font-black">F.I.Sh (Ismi Sharifingiz): *</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (e.target.value.trim()) setError(false);
              }}
              placeholder="Masalan: Toshpulatov Behruz Alisherovich"
              className="w-full bg-slate-900 border-2 border-slate-600 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/25 p-4 text-sm font-black text-white placeholder-slate-400 rounded-xl focus:outline-none transition-all duration-200 shadow-inner"
            />
            {error && (
              <div className="p-3 bg-rose-950/80 border-2 border-rose-500 rounded-lg mt-3">
                <p className="text-xs font-black text-rose-300 flex items-center space-x-2">
                  <span>⚠ Diqqat: Kursni boshlash va sertifikat rasmiylashtirish uchun Ismi Sharifingizni kiritishingiz SHART!</span>
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.01] active:scale-[0.99] focus:ring-4 focus:ring-indigo-400/40 text-white font-black text-base uppercase tracking-widest rounded-xl shadow-2xl flex items-center justify-center space-x-3 cursor-pointer transition-all duration-200 border-2 border-indigo-400 group"
          >
            <span className="text-white font-black">KURSNI BOSHLASH</span>
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="text-center text-xs font-mono font-black text-white">
          O'zbekiston Respublikasi IIB — Kiberxavfsizlik Akademiyasi v2.0
        </div>

      </div>

      {/* Intro Modal Component */}
      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />

    </div>
  );
}
