import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CoursePlayer from './components/CoursePlayer';
import Certificate from './components/Certificate';
import WelcomeScreen from './components/WelcomeScreen';
import VerificationModal from './components/VerificationModal';
import AboutModal from './components/AboutModal';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { getModules } from './modulesData';
import { UserProgress } from './types';
import { logger } from './utils/logger';
import { usePWAInstall } from './utils/usePWAInstall';
import { formatStudyTimeShort } from './utils/timeTracker';
import cyberLogo from './components/cyber_emblem.png';
import { 
  ShieldCheck, 
  Home, 
  BarChart2, 
  Award, 
  Sparkles,
  Sun,
  Moon,
  Clock,
  DownloadCloud,
  Info
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'kibersavodxonlik_user_progress_v2';

function AppContent() {
  const { language, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { isInstallable, installApp } = usePWAInstall();

  const modules = getModules(language);

  const [showVerificationModal, setShowVerificationModal] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('verify=1');
  });

  const [viewMode, setViewMode] = useState<'welcome' | 'app'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fullName && parsed.hasStarted) {
          return 'app';
        }
      }
    } catch (e) {}
    return 'welcome';
  });

  const [activeTab, setActiveTab] = useState<'module' | 'dashboard' | 'certificate'>('module');
  const [currentModuleId, setCurrentModuleId] = useState<number>(1);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      logger.error('Failed to load user progress from localStorage', e);
    }
    return {
      fullName: '',
      completedDate: '',
      moduleProgress: {
        1: { moduleId: 1, completed: false, scorePercent: 0, attempts: 0 },
      },
      currentModuleId: 1,
      totalStudySeconds: 0,
      moduleStudySeconds: { 1: 0 },
      hasStarted: false,
    };
  });

  // Active Learning Time Tracker (counts seconds only when page is focused)
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible' && viewMode === 'app') {
        setUserProgress(prev => {
          const totalSecs = (prev.totalStudySeconds || 0) + 1;
          const modSecsMap = { ...(prev.moduleStudySeconds || {}) };
          modSecsMap[currentModuleId] = (modSecsMap[currentModuleId] || 0) + 1;

          return {
            ...prev,
            totalStudySeconds: totalSecs,
            moduleStudySeconds: modSecsMap,
          };
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [viewMode, currentModuleId]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProgress));
    } catch (e) {
      logger.error('Failed to save progress to localStorage', e);
    }
  }, [userProgress]);

  const allModulesCompleted = modules.every(
    m => userProgress.moduleProgress[m.id]?.completed
  );

  const handleStartCourse = (fullName: string) => {
    setUserProgress(prev => ({
      ...prev,
      fullName,
      hasStarted: true,
    }));
    setViewMode('app');
    setActiveTab('module');
    setCurrentModuleId(1);
    logger.info(`Course started for user: ${fullName}`);
  };

  const handleSelectModule = (moduleId: number) => {
    setCurrentModuleId(moduleId);
    setActiveTab('module');
    setUserProgress(prev => ({
      ...prev,
      currentModuleId: moduleId,
    }));
    logger.info(`Switched to module #${moduleId}`);
  };

  const handleCompleteModule = (moduleId: number, scorePercent: number) => {
    setUserProgress(prev => {
      const updatedModuleProgress = {
        ...prev.moduleProgress,
        [moduleId]: {
          moduleId,
          completed: true,
          scorePercent: Math.max(prev.moduleProgress[moduleId]?.scorePercent || 0, scorePercent),
          attempts: (prev.moduleProgress[moduleId]?.attempts || 0) + 1,
          timeSpentSeconds: prev.moduleStudySeconds?.[moduleId] || 0,
        },
      };

      const nextId = moduleId + 1;
      if (nextId <= modules.length && !updatedModuleProgress[nextId]) {
        updatedModuleProgress[nextId] = {
          moduleId: nextId,
          completed: false,
          scorePercent: 0,
          attempts: 0,
        };
      }

      logger.info(`Module #${moduleId} completed with score ${scorePercent}%`);

      const allDone = modules.every(m => m.id === moduleId ? true : updatedModuleProgress[m.id]?.completed);
      let certDate = prev.completedDate;
      if (allDone && (!certDate || !certDate.trim())) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        certDate = `${yyyy}-${mm}-${dd}`;
      }

      return {
        ...prev,
        completedDate: certDate,
        moduleProgress: updatedModuleProgress,
      };
    });
  };

  const handleGoToNextModule = () => {
    const nextId = currentModuleId + 1;
    if (nextId <= modules.length) {
      handleSelectModule(nextId);
    } else {
      setActiveTab('certificate');
    }
  };

  const handleNameChange = (name: string) => {
    setUserProgress(prev => ({
      ...prev,
      fullName: name,
    }));
  };

  const handleDateChange = (date: string) => {
    setUserProgress(prev => ({
      ...prev,
      completedDate: date,
    }));
  };

  const handleRestoreProgress = (restored: UserProgress) => {
    setUserProgress({
      ...restored,
      hasStarted: true,
    });
    setViewMode('app');
    setActiveTab('dashboard');
    logger.info('Progress restored successfully');
  };

  const currentModule = modules.find(m => m.id === currentModuleId) || modules[0];

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-200 ${
      isDark 
        ? 'bg-[#060d1f] text-slate-100 selection:bg-indigo-500 selection:text-white' 
        : 'bg-slate-100 text-slate-900 selection:bg-indigo-500 selection:text-white'
    }`}>
      
      {/* Verification Modal (Triggers when QR code is scanned) */}
      {showVerificationModal && (
        <VerificationModal onClose={() => setShowVerificationModal(false)} />
      )}

      {viewMode === 'welcome' ? (
        <WelcomeScreen
          initialName={userProgress.fullName}
          onStartCourse={handleStartCourse}
          onInstallApp={installApp}
          isInstallable={isInstallable}
        />
      ) : (
        <>
          {/* Executive Top Header */}
          <header className={`px-4 py-3 shadow-xl backdrop-blur-xl sticky top-0 z-30 print:hidden border-b transition-colors duration-200 ${
            isDark 
              ? 'bg-[#0b1633]/90 border-slate-800/80 text-white' 
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/50'
          }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-md flex-shrink-0 p-0.5">
                  <img src={cyberLogo} alt="Kiberxavfsizlik Gerbi" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-base font-bold tracking-tight uppercase font-sans">
                    {t('courseTitle')}
                  </h1>
                  <p className={`text-[10px] font-mono font-medium tracking-wider uppercase ${
                    isDark ? 'text-amber-400' : 'text-indigo-600'
                  }`}>
                    {t('iibTitle')}
                  </p>
                </div>
              </div>

              {/* Top Action & Quick Navigation */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                
                {/* Language Switcher */}
                <LanguageSelector />

                {/* Active Learning Timer Badge */}
                <div className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
                  isDark 
                    ? 'bg-[#070e24] border-slate-800 text-slate-300' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`} title={t('activeStudyTime')}>
                  <Clock className="w-3.5 h-3.5 text-indigo-500 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>{formatStudyTimeShort(userProgress.totalStudySeconds || 0)}</span>
                </div>

                {/* 1-Click PWA App Install Button */}
                {isInstallable && (
                  <button
                    onClick={installApp}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md cursor-pointer flex items-center space-x-1.5 border border-emerald-400/40 animate-pulse hover:scale-105 transition-all"
                    title={t('installApp')}
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{t('installApp')}</span>
                  </button>
                )}

                {/* About System Button */}
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center space-x-1.5 shadow-sm ${
                    isDark
                      ? 'bg-slate-900/40 text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 border-slate-800/60'
                      : 'bg-white text-indigo-700 hover:text-indigo-900 hover:bg-slate-50 border-slate-200'
                  }`}
                  title={t('aboutSystem')}
                >
                  <Info className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="hidden sm:inline">{t('aboutSystem')}</span>
                </button>

                {/* Light / Dark Mode Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl border transition-all cursor-pointer shadow-sm ${
                    isDark
                      ? 'bg-[#070e24] border-slate-800 text-amber-400 hover:bg-slate-800'
                      : 'bg-slate-100 border-slate-300 text-indigo-700 hover:bg-slate-200'
                  }`}
                  title={isDark ? t('lightMode') : t('darkMode')}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setViewMode('welcome')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center space-x-1.5 ${
                    isDark
                      ? 'bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800/60'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-sm'
                  }`}
                  title={t('home')}
                >
                  <Home className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="hidden sm:inline">{t('home')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 border ${
                    activeTab === 'dashboard'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-bold'
                      : isDark
                      ? 'bg-slate-900/40 text-slate-300 border-slate-800/60 hover:bg-slate-800 hover:text-white'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>{t('dashboard')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('certificate')}
                  disabled={!allModulesCompleted}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 border ${
                    activeTab === 'certificate'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                      : allModulesCompleted
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/40 hover:bg-amber-500/20 cursor-pointer'
                      : isDark
                      ? 'bg-slate-900/40 text-slate-500 border-slate-800/60 cursor-not-allowed'
                      : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('certificate')}</span>
                  {allModulesCompleted && <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />}
                </button>
              </div>

            </div>
          </header>

          {/* Main Full-Bleed Layout */}
          <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 gap-6">
            
            {/* Sidebar */}
            <Sidebar
              modules={modules}
              userProgress={userProgress}
              activeTab={activeTab === 'module' ? `module-${currentModuleId}` : activeTab}
              setActiveTab={(tab) => {
                if (tab === 'dashboard' || tab === 'certificate') {
                  setActiveTab(tab as any);
                }
              }}
              onSelectModule={handleSelectModule}
              onGoToWelcome={() => setViewMode('welcome')}
              allModulesCompleted={allModulesCompleted}
              onOpenAbout={() => setIsAboutOpen(true)}
            />

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
              {activeTab === 'module' && (
                <CoursePlayer
                  module={currentModule}
                  onCompleteModule={handleCompleteModule}
                  onGoToNextModule={handleGoToNextModule}
                  isCompleted={!!userProgress.moduleProgress[currentModuleId]?.completed}
                  previousScore={userProgress.moduleProgress[currentModuleId]?.scorePercent || 0}
                  isLastModule={currentModuleId === modules.length}
                  userName={userProgress.fullName}
                  onSaveUserName={handleNameChange}
                  onGoToCertificate={() => setActiveTab('certificate')}
                />
              )}

              {activeTab === 'dashboard' && (
                <Dashboard
                  modules={modules}
                  userProgress={userProgress}
                  onSelectModule={handleSelectModule}
                  onGoToCertificate={() => setActiveTab('certificate')}
                  allModulesCompleted={allModulesCompleted}
                  onRestoreProgress={handleRestoreProgress}
                />
              )}

              {activeTab === 'certificate' && (
                <Certificate
                  fullName={userProgress.fullName}
                  defaultName="Toshpulatov Behruz Alisherovich"
                  completedDate={userProgress.completedDate}
                  onNameChange={handleNameChange}
                  onDateChange={handleDateChange}
                  onBackToCourse={() => setActiveTab('module')}
                />
              )}
            </main>

          </div>
        </>
      )}

      {/* About System Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
