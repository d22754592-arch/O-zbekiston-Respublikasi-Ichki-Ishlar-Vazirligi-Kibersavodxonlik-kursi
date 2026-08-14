import React from 'react';
import { 
  BookOpen, 
  Award, 
  BarChart2, 
  CheckCircle2, 
  Lock, 
  ChevronRight,
  ShieldAlert,
  Home
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
    <aside className="w-full lg:w-80 bg-slate-950 text-white flex flex-col flex-shrink-0 border-r-2 border-slate-800 shadow-2xl">
      
      {/* Sidebar Header Branding - Bold White */}
      <div className="p-5 border-b-2 border-slate-800 flex items-center space-x-3 bg-black">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/50 flex-shrink-0 border border-indigo-400">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-black text-base text-white tracking-tight leading-tight uppercase font-sans">
            Kibersavodxonlik
          </h2>
          <p className="text-[11px] text-white font-mono font-black tracking-wider uppercase">
            O'quv kursi platformasi
          </p>
        </div>
      </div>

      {/* Progress Bar Summary */}
      <div className="p-4 bg-slate-900 border-b-2 border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-black">
          <span className="text-white font-black">Umumiy progress:</span>
          <span className="text-emerald-400 font-mono font-black text-sm">{completedCount} / {modules.length} Modul ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* General Views */}
        <div className="space-y-2">
          <div className="text-[11px] font-black text-white uppercase tracking-widest px-2">
            Asosiy Bo'limlar
          </div>

          <button
            onClick={onGoToWelcome}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all cursor-pointer border-2 bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
          >
            <div className="flex items-center space-x-3">
              <Home className="w-4.5 h-4.5 text-indigo-400" />
              <span className="text-white font-black">Bosh Menyuga Qaytish</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl ring-2 ring-indigo-400'
                : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <BarChart2 className="w-4.5 h-4.5 text-indigo-300" />
              <span className="text-white font-black">Natijalarim</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            disabled={!allModulesCompleted}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
              activeTab === 'certificate'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-xl ring-2 ring-emerald-400'
                : allModulesCompleted
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 hover:bg-emerald-900'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Award className={`w-4.5 h-4.5 ${allModulesCompleted ? 'text-amber-400' : 'text-slate-500'}`} />
              <span className={allModulesCompleted ? 'text-white font-black' : 'text-slate-500 font-bold'}>Sertifikat Olish</span>
            </div>
            {!allModulesCompleted ? (
              <Lock className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-emerald-300" />
            )}
          </button>
        </div>

        {/* Modules List */}
        <div className="space-y-2">
          <div className="text-[11px] font-black text-white uppercase tracking-widest px-2">
            Dars Modullari ({modules.length})
          </div>

          {modules.map((m) => {
            const modProgress = userProgress.moduleProgress[m.id];
            const isCompleted = modProgress?.completed;
            const isUnlocked = m.id === 1 || userProgress.moduleProgress[m.id - 1]?.completed;
            const isCurrentActive = activeTab === 'module' && userProgress.currentModuleId === m.id;

            return (
              <button
                key={m.id}
                onClick={() => {
                  if (isUnlocked) {
                    onSelectModule(m.id);
                  }
                }}
                disabled={!isUnlocked}
                className={`w-full text-left p-3.5 rounded-xl text-xs transition-all duration-200 flex items-center justify-between cursor-pointer border-2 focus:outline-none group ${
                  isCurrentActive
                    ? 'bg-indigo-600 border-indigo-400 text-white font-black shadow-xl ring-2 ring-indigo-400/80 scale-[1.01]'
                    : isUnlocked
                    ? isCompleted
                      ? 'bg-slate-900 border-slate-700 text-white font-black hover:bg-slate-800/90 hover:border-slate-600 active:scale-[0.98] focus:ring-2 focus:ring-indigo-400/50'
                      : 'bg-slate-900 border-slate-800 text-white font-black hover:bg-slate-800/90 hover:border-slate-700 active:scale-[0.98] focus:ring-2 focus:ring-indigo-400/50'
                    : 'bg-slate-950/80 border-slate-900 text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isUnlocked ? (
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div className="truncate">
                    <div className={`font-black truncate text-xs ${isCurrentActive ? 'text-white' : isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                      {m.title}
                    </div>
                    <div className="text-[10px] font-mono font-black mt-0.5">
                      {isCompleted ? (
                        <span className="text-emerald-400 font-black">Natija: {modProgress.scorePercent}%</span>
                      ) : isUnlocked ? (
                        <span className="text-amber-300 font-black">{m.slideCount} Slayd</span>
                      ) : (
                        <span className="text-slate-500 font-bold">Qulflangan</span>
                      )}
                    </div>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isCurrentActive ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer Info */}
      <div className="p-4 border-t-2 border-slate-800 bg-black text-center">
        <p className="text-[10px] text-white font-mono font-black">
          Kibersavodxonlik kursi v2.0
        </p>
      </div>

    </aside>
  );
}
