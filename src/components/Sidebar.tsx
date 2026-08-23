import React from 'react';
import { 
  BookOpen, 
  Award, 
  BarChart2, 
  CheckCircle2, 
  Lock, 
  ChevronRight,
  ShieldCheck, 
  Home, 
  User, 
  Sparkles,
  Info
} from 'lucide-react';
import { ModuleData, UserProgress } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import cyberLogo from './cyber_emblem.png';

interface SidebarProps {
  modules: ModuleData[];
  userProgress: UserProgress;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectModule: (moduleId: number) => void;
  onGoToWelcome: () => void;
  allModulesCompleted: boolean;
  onOpenAbout?: () => void;
}

export default function Sidebar({
  modules,
  userProgress,
  activeTab,
  setActiveTab,
  onSelectModule,
  onGoToWelcome,
  allModulesCompleted,
  onOpenAbout,
}: SidebarProps) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const completedCount = modules.filter(
    m => userProgress.moduleProgress[m.id]?.completed
  ).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  const sidebarBg = isDark 
    ? 'bg-[#060c1c] text-slate-100 border-slate-800/70' 
    : 'bg-white text-slate-900 border-slate-200 shadow-lg';
  const headerBg = isDark 
    ? 'bg-[#081026]/80 border-slate-800/70' 
    : 'bg-slate-50 border-slate-200';
  const cardBg = isDark 
    ? 'bg-[#081026]/40 border-slate-800/70' 
    : 'bg-slate-50/60 border-slate-200';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <aside className={`w-full lg:w-80 flex flex-col flex-shrink-0 border-r shadow-2xl font-sans rounded-3xl overflow-hidden ${sidebarBg}`}>
      
      {/* Sidebar Header Branding */}
      <div className={`p-4 sm:p-5 border-b flex items-center space-x-3 backdrop-blur-md ${headerBg}`}>
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex-shrink-0 p-0.5">
          <img src={cyberLogo} alt="Kiberxavfsizlik Gerbi" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-xs sm:text-sm tracking-tight leading-tight uppercase truncate">
            {t('sidebarHeaderTitle')}
          </h2>
          <p className={`text-[10px] font-medium tracking-wide uppercase truncate ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
            {t('iibTitle')}
          </p>
        </div>
      </div>

      {/* Student Profile & Progress Summary Card */}
      <div className={`p-4 border-b space-y-3 ${cardBg}`}>
        {userProgress.fullName && (
          <div className={`flex items-center space-x-3 pb-3 border-b ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center flex-shrink-0 font-bold">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold truncate" title={userProgress.fullName}>
                {userProgress.fullName}
              </div>
              <div className="text-[10px] text-emerald-500 flex items-center space-x-1 mt-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t('activeStudent')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Linear Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className={`font-medium ${subText}`}>{t('totalProgress')}:</span>
            <span className="font-mono font-bold">{completedCount} / {modules.length} ({progressPercent}%)</span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* General Views */}
        <div className="space-y-1.5">
          <div className={`text-xs font-semibold uppercase tracking-wider px-2 mb-2 ${subText}`}>
            {t('mainSections')}
          </div>

          <button
            onClick={onGoToWelcome}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
              isDark 
                ? 'bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:text-white border-slate-800/40' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Home className="w-4 h-4 text-indigo-500" />
              <span>{t('home')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-bold'
                : isDark 
                ? 'bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:text-white border-slate-800/40' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <BarChart2 className="w-4 h-4" />
              <span>{t('dashboard')}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            disabled={!allModulesCompleted}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
              activeTab === 'certificate'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                : allModulesCompleted
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20 cursor-pointer'
                : isDark
                ? 'bg-slate-900/20 text-slate-500 border-slate-800/40 cursor-not-allowed'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t('certificate')}</span>
            </div>
            {allModulesCompleted ? (
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Modules List */}
        <div className="space-y-1.5">
          <div className={`text-xs font-semibold uppercase tracking-wider px-2 mb-2 flex items-center justify-between ${subText}`}>
            <span>{t('courseModules')} ({modules.length})</span>
            <span className="text-indigo-500 font-bold">{completedCount}/{modules.length}</span>
          </div>

          <div className="space-y-1.5">
            {modules.map((m) => {
              const isModuleCompleted = userProgress.moduleProgress[m.id]?.completed;
              const isModuleActive = activeTab === `module-${m.id}` || (activeTab === 'module' && userProgress.currentModuleId === m.id);
              const score = userProgress.moduleProgress[m.id]?.scorePercent;
              const isUnlocked = m.id === 1 || userProgress.moduleProgress[m.id - 1]?.completed;

              return (
                <button
                  key={m.id}
                  onClick={() => {
                    if (isUnlocked) {
                      onSelectModule(m.id);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all border flex items-start justify-between ${
                    isModuleActive
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-bold'
                      : isModuleCompleted
                      ? isDark 
                        ? 'bg-slate-900/40 text-slate-200 border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer' 
                        : 'bg-emerald-50/60 text-slate-800 border-emerald-200 hover:border-emerald-300 cursor-pointer'
                      : isUnlocked
                      ? isDark 
                        ? 'bg-slate-900/40 text-slate-300 border-slate-800/40 hover:bg-slate-800/60 hover:text-white cursor-pointer' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                      : isDark
                      ? 'bg-slate-900/20 text-slate-500 border-slate-800/30 cursor-not-allowed opacity-60'
                      : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-start space-x-2.5 pr-2 min-w-0">
                    <div className="mt-0.5 flex-shrink-0">
                      {isModuleCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : isUnlocked ? (
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold leading-tight line-clamp-1">
                        {m.title}
                      </div>
                      <div className={`text-[11px] font-mono mt-0.5 ${
                        isModuleActive 
                          ? 'text-indigo-100 font-medium' 
                          : isModuleCompleted 
                          ? 'text-emerald-600 dark:text-emerald-400 font-bold' 
                          : subText
                      }`}>
                        {isModuleCompleted ? (
                          <span>{t('completed')}: {score}%</span>
                        ) : isUnlocked ? (
                          <span>{t('slidesAndQuestions', { slides: m.slideCount, questions: m.quizQuestions.length })}</span>
                        ) : (
                          <span>{t('locked')}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isUnlocked && <ChevronRight className="w-3.5 h-3.5 mt-1 flex-shrink-0 opacity-60" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className={`p-3.5 border-t text-[11px] font-mono flex items-center justify-between ${isDark ? 'border-slate-800/70 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
        <span>{t('academyTitle')}</span>
        {onOpenAbout && (
          <button
            onClick={onOpenAbout}
            className="hover:text-indigo-400 transition-colors cursor-pointer flex items-center space-x-1 font-sans font-semibold text-[10px] text-indigo-500/90"
            title={t('aboutSystem')}
          >
            <Info className="w-3 h-3 text-indigo-500" />
            <span>{t('aboutSystem')}</span>
          </button>
        )}
      </div>

    </aside>
  );
}
