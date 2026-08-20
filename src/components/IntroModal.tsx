import React, { useState, useRef } from 'react';
import { Play, X, BookOpen, CheckCircle2, Award, FileText, Check } from 'lucide-react';
import iibLogo from './iib.jpg';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroModal({ isOpen, onClose }: IntroModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!isOpen) return null;

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setVideoEnded(false);
      }).catch((err) => {
        console.warn("Video play policy note:", err);
        setIsPlaying(true);
      });
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setVideoEnded(true);
    // Auto-close modal after video finishes, returning seamlessly to course
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border-4 border-indigo-600 rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden text-white font-sans space-y-0 relative animate-in fade-in zoom-in duration-200">
        
        {/* Header Branding */}
        <div className="bg-slate-950 p-5 border-b-2 border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-400 flex-shrink-0">
              <img src={iibLogo} alt="IIB Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-tight">
                O'ZBEKISTON RESPUBLIKASI IIB FARG'ONA VILOYATI KIBERJINOYATLARGA QARSHI KURASHISH BOSHQARMASI
              </h3>
              <p className="text-[11px] text-amber-400 font-mono font-bold tracking-wider uppercase">
                Kibersavodxonlik Maxsus O'quv Kursi — Video Instruksiya
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Yopish (X)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="relative bg-slate-950 rounded-xl border-2 border-indigo-500/80 overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="auto"
              className="w-full max-h-[460px] aspect-video object-contain bg-black"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleVideoEnded}
            >
              <source src="./video_intro.mp4" type="video/mp4" />
              Sizning brauzeringiz HTML5 videoni qo'llab-quvvatlamaydi.
            </video>

            {/* Play Overlay */}
            {!isPlaying && !videoEnded && (
              <div className="absolute inset-0 bg-slate-950/65 flex flex-col items-center justify-center p-4 text-center backdrop-blur-[2px] transition-all">
                <button
                  onClick={handlePlayVideo}
                  className="w-16 h-16 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-indigo-300 hover:scale-110 active:scale-95 transition-all cursor-pointer mb-3 group"
                  title="Videoni Ijro Etish"
                >
                  <Play className="w-8 h-8 ml-1 text-white fill-white group-hover:scale-105 transition-transform" />
                </button>
                <span className="text-xs font-black uppercase text-white tracking-widest bg-slate-900/90 border border-slate-700 px-3.5 py-1.5 rounded-full shadow">
                  🎬 RASMIY YO'RIQNOMA VIDEOSINI KO'RISH
                </span>
                <p className="text-[11px] text-slate-300 font-medium max-w-sm mt-2">
                  (Videoni ijro etish uchun Play tugmasini bosing. Video yakunlangach, avtomatik darsga o'tiladi)
                </p>
              </div>
            )}

            {/* Video Ended Overlay */}
            {videoEnded && (
              <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-emerald-300 mb-3 animate-bounce">
                  <Check className="w-9 h-9 stroke-[3]" />
                </div>
                <span className="text-sm font-black uppercase text-emerald-400 tracking-wider">
                  VIDEO-INSTRUKSIYA YAKUNLANDI!
                </span>
                <p className="text-xs text-slate-200 font-bold mt-1">
                  E'tiboringiz uchun rahmat. Endi darslarga o'tilmoqda...
                </p>
              </div>
            )}
          </div>

          {/* Official Speech Text Script Section */}
          <div className="bg-slate-950 border-2 border-slate-800 p-5 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 font-black text-xs uppercase tracking-wider border-b border-slate-800 pb-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Rasmiy Video-Instruksiya Nutqi (Matn):</span>
            </div>
            
            <div className="text-xs text-slate-200 font-medium leading-relaxed space-y-2.5 max-h-48 overflow-y-auto pr-2">
              <p className="font-bold text-white">
                "Assalomu alaykum va xush kelibsiz! Ushbu kurs O'zbekiston Respublikasi Ichki ishlar vazirligi Farg'ona viloyati Kiberjinoyatlarga qarshi kurashish boshqarmasi tomonidan xodimlarning kibersavodxonligini va raqamli xavfsizlik madaniyatini oshirish maqsadida maxsus ishlab chiqilgan."
              </p>
              <p>
                "O'quv kursi 7 ta asosiy moduldan iborat bo'lib, axborot xavfsizligi asoslari, murakkab parollar gigiyenasi, 2-bosqichli autentifikatsiya, Phishing va ijtimoiy muhandislik xujumlaridan himoyalanish hamda VPN va maxfiylik qoidalarini amaliy tarzda o'rgatadi."
              </p>
              <p>
                "Har bir modul yakunida bilimlarni sinovdan o'tkazish uchun 8 tadan test savollari beriladi. Sertifikat olish uchun barcha 7 ta modul testlarini kamida 80 foizlik natija bilan muvaffaqiyatli topshirishingiz shart."
              </p>
              <p className="font-bold text-amber-400">
                "Darslarni diqqat bilan puxta o'rganing va kiberxavfsizlik qoidalariga amalda qat'iy rioya qiling. Barchangizga muvaffaqiyat tilayman!"
              </p>
            </div>
          </div>

          {/* Summary Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center space-x-2.5">
              <BookOpen className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span className="font-bold text-slate-200">7 Ta Modul (70 Slayd)</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="font-bold text-slate-200">80% Test O'tish Balli</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center space-x-2.5">
              <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className="font-bold text-slate-200">Rasmiy IIB Sertifikati</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer font-bold"
          >
            Videoniy o'tkazib yuborish (Skip)
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer border border-indigo-400 active:scale-95"
          >
            TUSHUNDIM / DARSLARGA O'TISH
          </button>
        </div>

      </div>
    </div>
  );
}
