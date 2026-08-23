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
  Info,
  Sun,
  Moon
} from 'lucide-react';
import cyberLogo from './cyber_emblem.png';
import IntroModal from './IntroModal';
import AboutModal from './AboutModal';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
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
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [fullName, setFullName] = useState(initialName);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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

  const containerBg = isDark 
    ? 'bg-[#091124]/90 border-slate-800/80 text-white' 
    : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl';
  const subText = isDark ? 'text-slate-300' : 'text-slate-600';
  const statBox = isDark ? 'bg-slate-900/50 border border-slate-800/80' : 'bg-slate-50 border border-slate-200';
  const rightFormBg = isDark ? 'bg-slate-900/60 border border-slate-800/80' : 'bg-slate-50/80 border border-slate-200';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#050b18] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Background Ambience Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main SaaS Container */}
      <div className={`w-full max-w-5xl ${containerBg} backdrop-blur-xl border rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 space-y-8 relative`}>
        
        {/* Top Header Branding */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b pb-6 ${
          isDark ? 'border-slate-800/60' : 'border-slate-200'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-slate-700/60 bg-[#050b18] shadow-md flex-shrink-0 flex items-center justify-center p-0.5">
              <img src={cyberLogo} alt="Kiberxavfsizlik Gerbi" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-[10px] font-mono font-semibold text-indigo-500 uppercase tracking-widest mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('iibTitle')}</span>
              </div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight uppercase">
                {t('departmentTitle')}
              </h1>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end flex-wrap gap-2">
            <LanguageSelector />
            
            {/* About System Button */}
            <button
              onClick={() => setIsAboutOpen(true)}
              className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-indigo-400 hover:bg-slate-800 hover:text-indigo-300'
                  : 'bg-slate-100 border-slate-300 text-indigo-700 hover:bg-slate-200'
              }`}
              title={t('aboutSystem')}
            >
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">{t('aboutSystem')}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-indigo-700 hover:bg-slate-200'
              }`}
              title={isDark ? t('lightMode') : t('darkMode')}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isInstallable && onInstallApp && (
              <button
                onClick={onInstallApp}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer border ${
                  isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700/50' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                <span>📲 {t('installApp')}</span>
              </button>
            )}
          </div>
        </div>

        {/* PROMINENT VIDEO TANISHTIRUV CALLOUT BANNER */}
        <div 
          onClick={() => setIsIntroOpen(true)}
          className={`border p-4 sm:p-5 rounded-2xl shadow-lg flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.005] active:scale-[0.995] transition-all duration-200 group ${
            isDark 
              ? 'bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border-indigo-500/20 hover:border-indigo-500/40' 
              : 'bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-white border-indigo-200 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-indigo-500/10 text-[10px] font-mono font-medium text-indigo-500 uppercase tracking-wider mb-1">
                <span>{t('videoBannerTag')}</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold group-hover:text-indigo-500 transition-colors">
                {t('videoBannerTitle')}
              </h4>
              <p className={`text-xs mt-0.5 line-clamp-1 ${subText}`}>
                {t('videoBannerDesc')}
              </p>
            </div>
          </div>
          
          <button className="hidden sm:flex px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm flex-shrink-0 items-center space-x-1.5 transition-all">
            <span>{t('watchBtn')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2-Column Hero & Registration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-500">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('officialCurriculum')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight">
              {t('welcomeHeading1')} <span className="text-indigo-500">{t('welcomeHeadingHighlight')}</span> {t('welcomeHeading2')}
            </h2>

            <p className={`text-sm leading-relaxed font-normal ${subText}`}>
              {t('welcomeDescription')}
            </p>

            {/* Informational Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className={`${statBox} rounded-2xl p-4 space-y-1`}>
                <div className="flex items-center space-x-2 text-indigo-500">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-base sm:text-lg font-bold">{t('modulesCount')}</span>
                </div>
                <div className={`text-xs font-medium ${subText}`}>{t('slidesCount')}</div>
              </div>
              <div className={`${statBox} rounded-2xl p-4 space-y-1`}>
                <div className="flex items-center space-x-2 text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-base sm:text-lg font-bold">{t('passingScore')}</span>
                </div>
                <div className={`text-xs font-medium ${subText}`}>{t('passingScoreLabel')}</div>
              </div>
              <div className={`${statBox} rounded-2xl p-4 space-y-1`}>
                <div className="flex items-center space-x-2 text-amber-500">
                  <Award className="w-4 h-4" />
                  <span className="text-base sm:text-lg font-bold">{t('certificateLabel')}</span>
                </div>
                <div className={`text-xs font-medium ${subText}`}>{t('certificateDesc')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: F.I.Sh Registration Card */}
          <div className={`lg:col-span-5 ${rightFormBg} rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl`}>
            
            <div className={`border-b pb-3 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
              <div className="text-[11px] font-mono font-semibold text-indigo-500 uppercase tracking-wider flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('registrationTitle')}</span>
              </div>
              <h3 className="text-base font-bold mt-1">
                {t('fullNameHeading')}
              </h3>
              <p className={`text-xs mt-0.5 ${subText}`}>
                {t('fullNameDesc')}
              </p>
            </div>

            {/* F.I.Sh Input Form */}
            <div className="space-y-3">
              <label className={`block text-xs font-medium flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('fullNameInputLabel')} <span className="text-rose-500">*</span></span>
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
                  placeholder={t('fullNamePlaceholder')}
                  className={`w-full border ${
                    errorMessage ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                  } p-3.5 text-sm font-medium ${
                    isDark ? 'bg-[#050b18] text-white' : 'bg-white text-slate-900'
                  } placeholder:text-slate-400 placeholder:font-normal rounded-xl focus:outline-none focus:ring-2 transition-all duration-150`}
                />
              </div>

              {/* Validation Error Message */}
              {errorMessage && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/40 rounded-xl flex items-start space-x-2 text-xs text-rose-600 dark:text-rose-300 animate-in fade-in duration-150">
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-start space-x-2 text-xs text-slate-400 pt-1">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="leading-normal">
                  {t('nameValidationRule')}
                </p>
              </div>
            </div>

            {/* Start CTA Button */}
            <button
              onClick={handleStart}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-950/40 flex items-center justify-center space-x-2 cursor-pointer transition-all duration-150 active:scale-[0.98] group"
            >
              <span>{t('startCourseBtn')}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

        {/* Footer */}
        <div className={`text-center border-t pt-5 flex flex-col sm:flex-row items-center justify-between text-xs gap-2 font-medium ${
          isDark ? 'border-slate-800/60 text-slate-500' : 'border-slate-200 text-slate-400'
        }`}>
          <div>{t('academyTitle')}</div>
          
          <button
            onClick={() => setIsAboutOpen(true)}
            className="hover:text-indigo-400 transition-colors cursor-pointer flex items-center space-x-1"
          >
            <Info className="w-3 h-3 text-indigo-500" />
            <span>{t('aboutSystem')} (v2.0)</span>
          </button>

          <div className="flex items-center space-x-1.5 text-indigo-500">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('courseTitle')}</span>
          </div>
        </div>

      </div>

      {/* Intro Video Modal */}
      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />

      {/* About System Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

    </div>
  );
}
