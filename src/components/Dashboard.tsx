import React, { useState } from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck,
  Download,
  Upload,
  User,
  Sparkles,
  Lock,
  Clock,
  Layers,
  Timer
} from 'lucide-react';
import { ModuleData, UserProgress } from '../types';
import { logger } from '../utils/logger';
import { formatStudyTime, formatStudyTimeShort } from '../utils/timeTracker';

interface DashboardProps {
  modules: ModuleData[];
  userProgress: UserProgress;
  onSelectModule: (moduleId: number) => void;
  onGoToCertificate: () => void;
  allModulesCompleted: boolean;
  onRestoreProgress?: (progress: UserProgress) => void;
  onResetProgress?: () => void;
}

export default function Dashboard({
  modules,
  userProgress,
  onSelectModule,
  onGoToCertificate,
  allModulesCompleted,
  onRestoreProgress,
}: DashboardProps) {
  const [importError, setImportError] = useState(false);

  const completedCount = modules.filter(
    m => userProgress.moduleProgress[m.id]?.completed
  ).length;

  const totalModules = modules.length;
  const overallPercent = Math.round((completedCount / totalModules) * 100);

  const scores = Object.values(userProgress.moduleProgress)
    .filter(p => p.completed)
    .map(p => p.scorePercent);

  const averageScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  // Export progress to JSON file
  const handleExportProgress = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userProgress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kibersavodxonlik_progress_${userProgress.fullName || 'user'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logger.info('Progress exported to JSON file');
  };

  // Import progress from JSON file
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.moduleProgress && onRestoreProgress) {
            onRestoreProgress(parsed);
            setImportError(false);
            logger.info('Progress restored from JSON file');
          } else {
            setImportError(true);
          }
        } catch (err) {
          setImportError(true);
        }
      };
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">

      {/* Hero Welcome Banner */}
      <div className="bg-[#0b1633]/90 border border-indigo-500/30 p-6 md:p-8 rounded-3xl text-white shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/15 border border-indigo-400/30 px-3.5 py-1 rounded-full text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Tinglovchi Shaxsiy Kabineti</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            {userProgress.fullName ? `Salom, ${userProgress.fullName}!` : 'O\'quv Natijalari Paneli'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Kibersavodxonlik kursidagi faolligingiz, har bir modul bo'yicha to'plangan ballaringiz va yakuniy rasmiy IIB sertifikatiga erishish holatingiz.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-[#070e24] border border-slate-800 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">O'tilgan Modullar</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {completedCount} <span className="text-base text-slate-500 font-normal">/ {totalModules}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#070e24] border border-slate-800 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">O'rtacha Natija</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {averageScore}%
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {completedCount > 0 ? `${completedCount} ta modul natijasi` : "Testlar topshirilmagan"}
          </div>
        </div>

        {/* Metric 3: Active Study Time Tracker */}
        <div className="bg-[#070e24] border border-slate-800 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Jami O'qish Vaqti</span>
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono truncate" title={formatStudyTime(userProgress.totalStudySeconds || 0)}>
            {formatStudyTime(userProgress.totalStudySeconds || 0)}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Faol o'rganilgan vaqt
          </div>
        </div>

        {/* Metric 4: Certificate Status */}
        <div className="bg-[#070e24] border border-slate-800 p-5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Sertifikat Holati</span>
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono">
            {allModulesCompleted ? (
              <span className="text-amber-400 font-black">TAYYOR (Ochiq)</span>
            ) : (
              <span className="text-slate-400">{totalModules - completedCount} modul qoldi</span>
            )}
          </div>
          <div className="text-[11px] text-slate-400">
            {allModulesCompleted ? 'Sertifikat bo\'limiga o\'ting' : 'Barcha testlarni yakunlang'}
          </div>
        </div>

      </div>

      {/* Modules Detailed Breakdown */}
      <div className="bg-[#0b1633]/90 border border-indigo-500/30 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-xl space-y-5">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Modullar Bo'yicha O'zlashtirish</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Har bir modul bo'yicha darslar, sarflangan vaqt va test ko'rsatkichlari.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {modules.map((m) => {
            const isCompleted = userProgress.moduleProgress[m.id]?.completed;
            const score = userProgress.moduleProgress[m.id]?.scorePercent || 0;
            const isUnlocked = m.id === 1 || userProgress.moduleProgress[m.id - 1]?.completed;
            const modTime = userProgress.moduleStudySeconds?.[m.id] || 0;

            return (
              <div
                key={m.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-[#070e24] border-emerald-500/30'
                    : isUnlocked
                    ? 'bg-[#070e24] border-slate-800 hover:border-slate-700'
                    : 'bg-[#070e24]/40 border-slate-900 opacity-50'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className="mt-1 flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isUnlocked ? (
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {m.title}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5 font-mono">
                      <span>{m.slideCount} ta Slayd • {m.quizQuestions.length} ta Test</span>
                      {modTime > 0 && (
                        <span className="text-indigo-300 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatStudyTimeShort(modTime)}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-center">
                  {isCompleted && (
                    <div className="text-right font-mono">
                      <span className="text-emerald-400 font-bold text-sm">{score}%</span>
                      <span className="text-[10px] text-slate-400 block">Muvaffaqiyatli</span>
                    </div>
                  )}

                  {isUnlocked && (
                    <button
                      onClick={() => onSelectModule(m.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                        isCompleted
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-950/80 border border-indigo-400/40'
                      }`}
                    >
                      <span>{isCompleted ? 'Qayta Ko\'rish' : 'Darsni Boshlash'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Backup / Export / Import Controls */}
      <div className="bg-[#070e24] border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          <span className="font-bold text-slate-300 block">Jarayonni Zaxiralash (Backup / Restore)</span>
          <span>Natijalaringiz va o'qish vaqtingizni saqlab qo'yish yoki boshqa qurilmaga ko'chirish.</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportProgress}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Yuklab Olish (JSON)</span>
          </button>

          <label className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 flex items-center space-x-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Tiklash</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

    </div>
  );
}
