import React, { useState, useRef } from 'react';
import { Play, X, BookOpen, CheckCircle2, Award, FileText, Check, ShieldCheck } from 'lucide-react';
import cyberLogo from './cyber_emblem.png';
import { useLanguage } from '../i18n/LanguageContext';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroModal({ isOpen, onClose }: IntroModalProps) {
  const { t } = useLanguage();
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
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#091124] border border-slate-700/70 rounded-3xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden text-white font-sans space-y-0 relative animate-in fade-in zoom-in duration-200">
        
        {/* Header Branding */}
        <div className="bg-[#060c1c] p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 flex-shrink-0 p-0.5">
              <img src={cyberLogo} alt="Kiberxavfsizlik Gerbi" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                {t('departmentTitle')}
              </h3>
              <p className="text-[11px] text-indigo-400 font-medium flex items-center space-x-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('introModalTitle')}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            title="Yopish (X)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          <div className="relative bg-black rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[440px] aspect-video object-contain bg-black"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleVideoEnded}
            >
              <source src="./video_intro.mp4" type="video/mp4" />
              Sizning brauzeringiz HTML5 videoni qo'llab-quvvatlamaydi.
            </video>

            {/* Play Overlay */}
            {!isPlaying && !videoEnded && (
              <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center p-4 text-center backdrop-blur-[2px] transition-all">
                <button
                  onClick={handlePlayVideo}
                  className="w-16 h-16 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-indigo-300 hover:scale-110 active:scale-95 transition-all cursor-pointer mb-3 group"
                  title={t('watchBtn')}
                >
                  <Play className="w-7 h-7 ml-1 fill-white transition-transform" />
                </button>
                <span className="text-xs font-bold uppercase text-indigo-200 tracking-wider bg-slate-900/90 border border-indigo-400/40 px-4 py-1.5 rounded-full shadow">
                  {t('videoBannerTag')}
                </span>
                <p className="text-[11px] text-slate-300 font-medium max-w-sm mt-2">
                  {t('videoBannerTitle')}
                </p>
              </div>
            )}

            {/* Video Ended Overlay */}
            {videoEnded && (
              <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-2xl border border-emerald-300 mb-3 animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <span className="text-sm font-bold uppercase text-emerald-400 tracking-wider">
                  {t('videoEnded')}
                </span>
                <p className="text-xs text-slate-200 font-medium mt-1">
                  {t('videoEndedSub')}
                </p>
              </div>
            )}
          </div>

          {/* Official Course Information Section */}
          <div className="bg-[#050b18] border border-slate-800 p-5 rounded-2xl space-y-3.5 shadow-inner">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider border-b border-slate-800/80 pb-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>{t('introSpeechTag')}</span>
            </div>
            
            <div className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed space-y-3 max-h-52 overflow-y-auto pr-2">
              <p className="font-semibold text-white">
                {t('speechP1')}
              </p>
              <p>
                {t('speechP2')}
              </p>
              <p>
                {t('speechP3')}
              </p>
              <p className="font-semibold text-amber-400">
                {t('speechP4')}
              </p>
            </div>
          </div>

          {/* Summary Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#050b18] p-3 rounded-xl border border-slate-800 flex items-center space-x-2.5">
              <BookOpen className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="font-semibold text-slate-200">{t('modalBadge1')}</span>
            </div>
            <div className="bg-[#050b18] p-3 rounded-xl border border-slate-800 flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-semibold text-slate-200">{t('modalBadge2')}</span>
            </div>
            <div className="bg-[#050b18] p-3 rounded-xl border border-slate-800 flex items-center space-x-2.5">
              <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-semibold text-slate-200">{t('modalBadge3')}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#060c1c] p-4 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer font-medium"
          >
            {t('skipVideo')}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer active:scale-95"
          >
            {t('understandBtn')}
          </button>
        </div>

      </div>
    </div>
  );
}
