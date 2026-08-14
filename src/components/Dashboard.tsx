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
  RefreshCw
} from 'lucide-react';
import { ModuleData, UserProgress } from '../types';
import { logger } from '../utils/logger';

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
  onResetProgress,
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
    <div className="space-y-6">

      {/* Hero Welcome Banner */}
      <div className="bg-slate-900 border-b-4 border-indigo-500 p-6 md:p-8 rounded-xl text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/30 border border-indigo-400/40 px-3.5 py-1 rounded-full text-indigo-300 text-xs font-mono font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-white font-black">Kibersavodxonlik O'quv Kursi</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Natijalar va O'zlashtirish Paneli
          </h1>

          <p className="text-sm text-white font-black leading-relaxed">
            Kibersavodxonlik kursining 7 ta moduli bo'yicha slaydlarni o'rganing va testlarni topshiring. Barcha modullar yakunlangach, rasmiy sertifikat taqdim etiladi.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            {allModulesCompleted ? (
              <button
                onClick={onGoToCertificate}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center space-x-2 transition-all cursor-pointer active:translate-y-px border-2 border-emerald-400"
              >
                <Award className="w-4.5 h-4.5 text-slate-950" />
                <span className="text-slate-950 font-black">Sertifikatni yuklab olish</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectModule(userProgress.currentModuleId || 1)}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center space-x-2 transition-all cursor-pointer active:translate-y-px border-2 border-indigo-400"
              >
                <BookOpen className="w-4.5 h-4.5 text-white" />
                <span className="text-white font-black">Darslarni davom ettirish</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid - Enhanced UI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white border-2 border-slate-300 hover:border-indigo-500 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center space-x-4 group">
          <div className="w-12 h-12 bg-indigo-100 border border-indigo-300 rounded-xl flex items-center justify-center text-indigo-700 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <CheckCircle2 className="w-6 h-6 text-indigo-700" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-700 uppercase tracking-wider">Tugatilgan Modullar</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {completedCount} / {totalModules}
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-300 hover:border-emerald-500 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center space-x-4 group">
          <div className="w-12 h-12 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <BarChart2 className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-700 uppercase tracking-wider">Umumiy Progress</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {overallPercent}%
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-300 hover:border-amber-500 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center space-x-4 group">
          <div className="w-12 h-12 bg-amber-100 border border-amber-300 rounded-xl flex items-center justify-center text-amber-700 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Award className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-700 uppercase tracking-wider">O'rtacha Natija</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {averageScore > 0 ? `${averageScore}%` : '—'}
            </div>
          </div>
        </div>

      </div>

      {/* Progress Backup & Data Safety Tools */}
      <div className="bg-slate-950 border-2 border-slate-800 p-5 rounded-xl text-white space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h4 className="text-sm font-black uppercase text-white">Natijalarni Zaxiralash (Backup & Restore)</h4>
          </div>
          <span className="text-[11px] text-amber-300 font-mono font-bold">Ma'lumotlar Xavfsizligi</span>
        </div>

        <p className="text-xs text-slate-200 font-bold leading-relaxed">
          Boshqa kompyuterga o'tsangiz yoki brauzer keshini tozalagan taqdirda ham natijalaringiz yo'qolmasligi uchun progressni JSON fayl shaklida kompyuteringizga yuklab olishingiz va keyinchalik qayta tiklashingiz mumkin.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleExportProgress}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow flex items-center space-x-2 cursor-pointer border border-indigo-400"
          >
            <Download className="w-4 h-4 text-white" />
            <span className="text-white font-black">Natijalarni Saqlab Olish (.json)</span>
          </button>

          <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow flex items-center space-x-2 cursor-pointer border border-slate-600">
            <Upload className="w-4 h-4 text-white" />
            <span className="text-white font-black">JSON Fayldan Qayta Tiklash</span>
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>
        </div>

        {importError && (
          <p className="text-xs font-black text-rose-400 mt-2">
            ⚠ Fayldan o'qishda xatolik yuz berdi. Natija fayli yaroqsiz!
          </p>
        )}
      </div>

      {/* Modules Detailed Status Table */}
      <div className="bg-white border-2 border-slate-300 rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-slate-300 flex items-center justify-between bg-slate-50">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Modullar bo'yicha natijalar</span>
          </h3>
          <span className="text-xs text-indigo-950 font-black bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
            Minimal o'tish balli: 65%
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {modules.map((m) => {
            const modProgress = userProgress.moduleProgress[m.id];
            const isCompleted = modProgress?.completed;
            const isUnlocked = m.id === 1 || userProgress.moduleProgress[m.id - 1]?.completed;

            return (
              <div 
                key={m.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      #{m.id}
                    </span>
                    <h4 className="text-sm font-black text-slate-900">{m.title}</h4>
                  </div>
                  <p className="text-xs text-slate-700 font-bold pl-8">{m.subtitle}</p>
                </div>

                <div className="flex items-center space-x-4 pl-8 sm:pl-0">
                  {isCompleted ? (
                    <div className="flex items-center space-x-2">
                      <span className="px-3.5 py-1 bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-xs rounded-full font-mono">
                        {modProgress.scorePercent}%
                      </span>
                      <span className="text-xs font-black text-emerald-700 flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>O'tdi</span>
                      </span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => onSelectModule(m.id)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow cursor-pointer transition-all flex items-center space-x-1"
                    >
                      <span className="text-white font-black">Boshlash</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  ) : (
                    <span className="px-4 py-1.5 bg-slate-100 text-slate-500 font-bold text-xs rounded-full border border-slate-300">
                      Qulflangan
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
