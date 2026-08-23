import React from 'react';
import { X, ShieldCheck, Award, Code2, Cpu, UserCheck, CheckCircle2, Lock } from 'lucide-react';
import cyberLogo from './cyber_emblem.png';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0d182e] via-[#091124] to-[#050b18] border border-slate-700/70 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500" />
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 flex items-center justify-center shadow-lg p-0.5">
              <img 
                src={cyberLogo} 
                alt="IIB Kiberxavfsizlik" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-400 uppercase">
                  {t('aboutSystemTitle')}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  v2.0.0
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                {t('aboutPlatformName')}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all flex items-center justify-center cursor-pointer border border-slate-700/50 active:scale-95"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Institutional Official Statement Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/60 border border-indigo-500/30 shadow-inner space-y-2.5">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>{t('aboutSystemOrg')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              «{t('aboutOfficialStatement')}»
            </p>
          </div>

          {/* Structured Roles & Leadership Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Leadership Box */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{t('aboutLeadershipTitle')}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                {t('aboutLeadershipValue')}
              </p>
              <span className="text-[11px] text-slate-400">
                {t('aboutSystemDept')}
              </span>
            </div>

            {/* Author / Developer Box */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('aboutAuthorTitle')}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                {t('aboutAuthorName')}
              </p>
              <span className="text-[11px] text-emerald-400/90 font-medium">
                {t('aboutAuthorRole')}
              </span>
            </div>

          </div>

          {/* Technical Specifications & Architecture */}
          <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800/80 space-y-2.5">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>{t('aboutTechTitle')}</span>
            </div>
            <p className="text-xs text-slate-300 font-mono bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              {t('aboutTechStack')}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Offline PWA qo'llab-quvvatlash</span>
              </span>
              <span className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Maxfiy lokal xotira (Encrypted Storage)</span>
              </span>
            </div>
          </div>

          {/* Copyright Footer */}
          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-500 font-mono">
              © 2026 {t('aboutSystemOrg')} • {t('aboutVersion')}
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-indigo-950/50 active:scale-95"
          >
            {t('aboutClose')}
          </button>
        </div>

      </div>
    </div>
  );
}
