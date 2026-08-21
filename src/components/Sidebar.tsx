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
  Sparkles
} from 'lucide-react';
import { ModuleData, UserProgress } from '../types';

interface SidebarProps {
  modules: ModuleData[];
  userProgress: UserProgress;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectModule: (moduleId: number) => void;
  onGoToWelcome: () => void;
  allModulesCompleted: boolean;
}

export default function Sidebar({
  modules,
  userProgress,
  activeTab,
  setActiveTab,
  onSelectModule,
  onGoToWelcome,
  allModulesCompleted,
}: SidebarProps) {

  const completedCount = modules.filter(
    m => userProgress.moduleProgress[m.id]?.completed
  ).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <aside className="w-full lg:w-80 bg-[#060c1c] text-slate-100 flex flex-col flex-shrink-0 border-r border-slate-800/70 shadow-2xl font-sans">
      
      {/* Sidebar Header Branding */}
      <div className="p-4 sm:p-5 border-b border-slate-800/70 flex items-center space-x-3 bg-[#081026]/80 backdrop-blur-md">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-xs sm:text-sm text-white tracking-tight leading-tight uppercase">
            IIB Kiberxavfsizlik
          </h2>
          <p className="text-[10px] text-slate-400 font-medium">
            Maxsus O'quv Portali
          </p>
        </div>
      </div>

      {/* Student Profile & Progress Summary Card */}
      <div className="p-4 bg-[#081026]/40 border-b border-slate-800/70 space-y-3">
        {userProgress.fullName && (
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-800/60">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-300 flex items-center justify-center flex-shrink-0 font-bold">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate" title={userProgress.fullName}>
                {userProgress.fullName}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center space-x-1 mt-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Tinglovchi Faol</span>
              </div>
            </div>
          </div>
        )}

        {/* Linear Progress Bar with high WCAG contrast */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Umumiy Jarayon:</span>
            <span className="text-white font-mono font-bold">{completedCount} / {modules.length} Modul ({progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* General Views */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Asosiy Bo'limlar
          </div>

          <button
            onClick={onGoToWelcome}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:text-white border border-slate-800/40"
          >
            <div className="flex items-center space-x-2.5">
              <Home className="w-4 h-4 text-indigo-400" />
              <span>Bosh Sahifa</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:text-white border-slate-800/40'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <BarChart2 className="w-4 h-4 text-indigo-300" />
              <span>Mening Natijalarim</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeTab === 'certificate'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                : allModulesCompleted
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-slate-900/30 text-slate-400 border-slate-800/40 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Rasmiy Sertifikat</span>
            </div>
            {allModulesCompleted ? (
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Modules List */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
            <span>Dars Modullari ({modules.length})</span>
            <span className="text-indigo-400 font-bold">{completedCount}/{modules.length}</span>
          </div>

          <div className="space-y-1.5">
            {modules.map((m) => {
              const isModuleCompleted = userProgress.moduleProgress[m.id]?.completed;
              const isModuleActive = activeTab === `module-${m.id}` || (activeTab === 'module' && userProgress.currentModuleId === m.id);
              const score = userProgress.moduleProgress[m.id]?.scorePercent;

              // Unlock logic: Module 1 is always unlocked; subsequent modules require previous module completion
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
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                      : isModuleCompleted
                      ? 'bg-slate-900/40 text-slate-200 border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer'
                      : isUnlocked
                      ? 'bg-slate-900/40 text-slate-300 border-slate-800/40 hover:bg-slate-800/60 hover:text-white cursor-pointer'
                      : 'bg-slate-900/20 text-slate-400 border-slate-800/30 cursor-not-allowed opacity-75'
                  }`}
                >
                  <div className="flex items-start space-x-2.5 pr-2">
                    <div className="mt-0.5 flex-shrink-0">
                      {isModuleCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isUnlocked ? (
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold leading-tight line-clamp-1">
                        {m.title}
                      </div>
                      <div className={`text-[11px] font-mono mt-0.5 ${
                        isModuleActive 
                          ? 'text-indigo-100 font-medium' 
                          : isModuleCompleted 
                          ? 'text-emerald-400 font-bold' 
                          : 'text-slate-400 font-medium'
                      }`}>
                        {isModuleCompleted ? (
                          <span>Natija: {score}%</span>
                        ) : isUnlocked ? (
                          <span>10 Slayd • 8 Savol</span>
                        ) : (
                          <span>Qulflangan</span>
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
      <div className="p-4 border-t border-slate-800/70 text-[11px] font-mono text-slate-400 text-center">
        IIB Kiberxavfsizlik v2.0
      </div>

    </aside>
  );
}
