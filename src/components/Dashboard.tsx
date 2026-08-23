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
  Clock, 
  Layers,
  AlertCircle,
  Check
} from 'lucide-react';
import { ModuleData, UserProgress } from '../types';
import { logger } from '../utils/logger';
import { formatStudyTime, formatStudyTimeShort } from '../utils/timeTracker';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

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
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

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
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userProgress, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `kibersavodxonlik_progress_${userProgress.fullName || 'user'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      logger.info('Progress exported to JSON file');
      showNotification('success', t('exportSuccessMsg'));
    } catch (e) {
      showNotification('error', 'Eksport jarayonida xatolik yuz berdi.');
    }
  };

  // Import progress from JSON file
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && typeof parsed === 'object' && parsed.moduleProgress && onRestoreProgress) {
            onRestoreProgress(parsed);
            showNotification('success', t('importSuccessMsg'));
            logger.info('Progress restored from JSON file');
          } else {
            showNotification('error', t('importErrorMsg'));
          }
        } catch (err) {
          showNotification('error', t('importErrorMsg'));
        }
      };
    }
  };

  const cardBg = isDark ? 'bg-[#091124]/90 border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm';
  const subText = isDark ? 'text-slate-300' : 'text-slate-600';
  const metricCardBg = isDark ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-50 border-slate-200';


  return (
    <div className="space-y-6 font-sans">

      {/* Hero Welcome Banner */}
      <div className={`${cardBg} border p-6 sm:p-7 rounded-3xl shadow-xl backdrop-blur-xl space-y-2.5`}>
        <div className="inline-flex items-center space-x-1.5 bg-indigo-500/10 px-3 py-1 rounded-full text-indigo-500 text-xs font-mono font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t('studentCabinet')}</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          {userProgress.fullName ? t('greeting', { name: userProgress.fullName }) : t('resultsPanel')}
        </h1>

        <p className={`text-xs sm:text-sm leading-relaxed font-normal max-w-3xl ${subText}`}>
          {t('dashboardDesc')}
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className={`${metricCardBg} border p-5 rounded-2xl space-y-2 shadow-sm`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{t('completedModules')}</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-500">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-black font-mono">{completedCount}</span>
            <span className="text-sm font-medium text-slate-400 font-mono">/ {totalModules}</span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className={`${metricCardBg} border p-5 rounded-2xl space-y-2 shadow-sm`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{t('averageScore')}</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-500 font-mono">
            {averageScore}%
          </div>
          <div className="text-xs text-slate-400 font-medium">
            {completedCount > 0 ? `${completedCount} ta modul` : "0%"}
          </div>
        </div>

        {/* Metric 3: Active Study Time Tracker */}
        <div className={`${metricCardBg} border p-5 rounded-2xl space-y-2 shadow-sm`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{t('totalStudyTime')}</span>
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono">
            {formatStudyTime(userProgress.totalStudySeconds || 0)}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            {t('activeStudyTime')}
          </div>
        </div>

        {/* Metric 4: Certificate Status */}
        <div className={`${metricCardBg} border p-5 rounded-2xl space-y-2 shadow-sm`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{t('certificateStatus')}</span>
            <div className="w-7 h-7 rounded-lg bg-amber-600/20 flex items-center justify-center text-amber-500">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-base sm:text-lg font-bold font-mono">
            {allModulesCompleted ? (
              <span className="text-amber-500 font-bold">{t('certReady')}</span>
            ) : (
              <span className="font-medium text-slate-400">{t('modulesLeft', { count: totalModules - completedCount })}</span>
            )}
          </div>
          <div className="text-xs text-slate-400">
            {allModulesCompleted ? t('goToCertTab') : t('completeAllTests')}
          </div>
        </div>

      </div>

      {/* Modules Detailed Breakdown */}
      <div className={`${cardBg} border p-6 sm:p-7 rounded-3xl shadow-xl backdrop-blur-xl space-y-4`}>
        <div className={`border-b pb-3 flex items-center justify-between ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
          <div>
            <h3 className="text-base font-bold flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>{t('modulesBreakdown')}</span>
            </h3>
            <p className={`text-xs mt-0.5 ${subText}`}>
              {t('modulesBreakdownDesc')}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {modules.map((m) => {
            const isCompleted = userProgress.moduleProgress[m.id]?.completed;
            const score = userProgress.moduleProgress[m.id]?.scorePercent || 0;
            const isUnlocked = m.id === 1 || userProgress.moduleProgress[m.id - 1]?.completed;
            const modTime = userProgress.moduleStudySeconds?.[m.id] || 0;

            return (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isCompleted
                    ? isDark ? 'bg-slate-900/40 border-emerald-500/20' : 'bg-emerald-50/50 border-emerald-200'
                    : isUnlocked
                    ? isDark ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    : isDark ? 'bg-slate-900/20 border-slate-800/40 opacity-70' : 'bg-slate-100 border-slate-200 opacity-70'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : isUnlocked ? (
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-xs sm:text-sm">
                      {m.title}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5 font-mono">
                      <span>{t('slidesAndQuestions', { slides: m.slideCount, questions: m.quizQuestions.length })}</span>
                      {modTime > 0 && (
                        <span className="text-indigo-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatStudyTimeShort(modTime)}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  {isCompleted && (
                    <div className="text-right font-mono">
                      <span className="text-emerald-500 font-bold text-xs sm:text-sm">{score}%</span>
                      <span className="text-[10px] text-slate-400 block">{t('completed')}</span>
                    </div>
                  )}

                  {isUnlocked && (
                    <button
                      onClick={() => onSelectModule(m.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                        isCompleted
                          ? isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                      }`}
                    >
                      <span>{isCompleted ? t('reviewLesson') : t('startLesson')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Toast Banner */}
      {notification && (
        <div className={`p-4 rounded-2xl border flex items-center space-x-3 text-xs font-semibold shadow-lg transition-all animate-in fade-in slide-in-from-top-2 ${
          notification.type === 'success'
            ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
            : 'bg-rose-950/80 border-rose-500/60 text-rose-200'
        }`}>
          {notification.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Data Backup / Export / Import Controls */}
      <div className={`${cardBg} border p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${subText}`}>
        <div>
          <span className="font-semibold block">{t('backupProgress')}</span>
          <span>{t('backupDesc')}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportProgress}
            className={`px-3.5 py-2 rounded-xl border flex items-center space-x-1.5 cursor-pointer transition-colors ${
              isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700/60' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('downloadJson')}</span>
          </button>

          <label className={`px-3.5 py-2 rounded-xl border flex items-center space-x-1.5 cursor-pointer transition-colors ${
            isDark ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700/60' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
          }`}>
            <Upload className="w-3.5 h-3.5" />
            <span>{t('restoreJson')}</span>
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
