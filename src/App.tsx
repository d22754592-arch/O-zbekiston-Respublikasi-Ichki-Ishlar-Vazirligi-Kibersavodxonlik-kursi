import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CoursePlayer from './components/CoursePlayer';
import Certificate from './components/Certificate';
import WelcomeScreen from './components/WelcomeScreen';
import { modules } from './modulesData';
import { UserProgress } from './types';
import { logger } from './utils/logger';
import iibLogo from './components/iib.jpg';

const LOCAL_STORAGE_KEY = 'kibersavodxonlik_user_progress_v2';

export default function App() {
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

  const [userProgress, setUserProgress] = useState<UserProgress & { hasStarted?: boolean }>(() => {
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
      hasStarted: false,
    };
  });

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

      return {
        ...prev,
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

  if (viewMode === 'welcome') {
    return (
      <WelcomeScreen
        initialName={userProgress.fullName}
        onStartCourse={handleStartCourse}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-900">
      
      {/* Top Header */}
      <header className="bg-white border-b-2 border-slate-300 px-4 py-3 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-300 flex-shrink-0 shadow-sm">
              <img src={iibLogo} alt="IIB Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-slate-900 uppercase font-sans">
                Kibersavodxonlik kursi
              </h1>
              <p className="text-[11px] text-slate-700 font-black">
                O'zbekiston Respublikasi Ichki Ishlar Vazirligi
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('welcome')}
              className="px-3.5 py-2 rounded-lg text-xs font-black bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300 cursor-pointer"
            >
              Bosh Menyu
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow font-black'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 font-black'
              }`}
            >
              Natijalarim
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              disabled={!allModulesCompleted}
              className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'certificate'
                  ? 'bg-emerald-600 text-white shadow font-black'
                  : allModulesCompleted
                  ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300 font-black'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              Sertifikat
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 md:p-6 gap-6">
        
        {/* Sidebar */}
        <Sidebar
          modules={modules}
          userProgress={userProgress}
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab as any)}
          onSelectModule={handleSelectModule}
          onGoToWelcome={() => setViewMode('welcome')}
          allModulesCompleted={allModulesCompleted}
        />

        {/* Content */}
        <main className="flex-1 min-w-0">
          {activeTab === 'module' && (
            <CoursePlayer
              module={currentModule}
              onCompleteModule={handleCompleteModule}
              onGoToNextModule={handleGoToNextModule}
              isCompleted={!!userProgress.moduleProgress[currentModule.id]?.completed}
              previousScore={userProgress.moduleProgress[currentModule.id]?.scorePercent || 0}
              isLastModule={currentModule.id === modules.length}
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
            allModulesCompleted ? (
              <Certificate
                defaultName={userProgress.fullName}
                onNameChange={handleNameChange}
              />
            ) : (
              <div className="bg-slate-900 border-2 border-rose-500 p-8 rounded-xl text-center space-y-4 shadow-2xl">
                <div className="w-12 h-12 bg-rose-500/20 border border-rose-400 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-wide">
                  Sertifikat Bo'limi Qulflangan
                </h3>
                <p className="text-xs text-slate-300 font-bold max-w-md mx-auto leading-relaxed">
                  Sertifikat olish uchun darslikdagi barcha 7 ta modul testlarini muvaffaqiyatli (kamida 65%) topshirishingiz shart!
                </p>
              </div>
            )
          )}
        </main>

      </div>

    </div>
  );
}
