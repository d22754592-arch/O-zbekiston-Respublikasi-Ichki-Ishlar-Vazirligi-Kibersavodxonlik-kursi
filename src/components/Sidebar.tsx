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
    <aside className="w-full lg:w-80 bg-[#060d1f] text-slate-100 flex flex-col flex-shrink-0 border-r border-slate-800/80 shadow-2xl font-sans">
      
      {/* Sidebar Header Branding */}
      <div className="p-5 border-b border-slate-800/80 flex items-center space-x-3.5 bg-[#0b1633]/60 backdrop-blur-md">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-950/80 flex-shrink-0 border border-indigo-400/40">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-black text-sm text-white tracking-tight leading-tight uppercase">
            IIB Kiberxavfsizlik
          </h2>
          <p className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase">
            Maxsus O'quv Portali
          </p>
        </div>
      </div>

      {/* Student Profile & Progress Summary Card */}
      <div className="p-4 bg-[#070e24] border-b border-slate-800/80 space-y-3">
        {userProgress.fullName && (
          <div className="flex items-center space-x-2.5 pb-2.5 border-b border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-black text-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">
                {userProgress.fullName}
              </div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Tinglovchi Faol</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Umumiy Jarayon:</span>
            <span className="text-emerald-400 font-mono font-bold">{completedCount} / {modules.length} Modul ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* General Views */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-2">
            Asosiy Bo'limlar
          </div>

          <button
            onClick={onGoToWelcome}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border bg-[#070e24] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
          >
            <div className="flex items-center space-x-2.5">
              <Home className="w-4 h-4 text-indigo-400" />
              <span>Bosh Sahifa</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950/60'
                : 'bg-[#070e24] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
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
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === 'certificate'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-950/60 font-black'
                : allModulesCompleted
                ? 'bg-[#070e24] text-amber-300 border-amber-500/40 hover:bg-amber-500/10'
                : 'bg-[#070e24] text-slate-500 border-slate-900 opacity-60'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Rasmiy Sertifikat</span>
            </div>
            {allModulesCompleted ? (
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-600" />
            )}
          </button>
        </div>

        {/* Modules List */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-2 flex items-center justify-between">
            <span>Dars Modullari ({modules.length})</span>
            <span className="text-indigo-400 font-bold">{completedCount}/{modules.length}</span>
          </div>

          <div className="space-y-1.5">
            {modules.map((m) => {
              const isModuleCompleted = userProgress.moduleProgress[m.id]?.completed;
              const isModuleActive = activeTab === `module-${m.id}`;
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
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950/80 scale-[1.02]'
                      : isModuleCompleted
                      ? 'bg-[#070e24] text-slate-200 border-emerald-500/30 hover:border-emerald-500/60'
                      : isUnlocked
                      ? 'bg-[#070e24] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white cursor-pointer'
                      : 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-start space-x-2.5 pr-2">
                    <div className="mt-0.5 flex-shrink-0">
                      {isModuleCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isUnlocked ? (
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold leading-tight line-clamp-1">
                        {m.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {isModuleCompleted ? (
                          <span className="text-emerald-400 font-bold">Natija: {score}%</span>
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
      <div className="p-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 text-center">
        IIB Kiberxavfsizlik v2.0
      </div>

    </aside>
  );
}
