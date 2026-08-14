import React, { useMemo, useState } from 'react';
import { 
  ShieldAlert, BadgeCheck, HelpCircle, Key, Cpu, Gavel, FileText, CheckCircle2, 
  ArrowRight, Award, RefreshCw, Smartphone, Clipboard, Search, Check, Download 
} from 'lucide-react';
import { finalExamScenario } from '../modulesData';
import { UserProgress } from '../types';

interface ExamQuestProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export default function ExamQuest({ userProgress, setUserProgress }: ExamQuestProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [stepSuccess, setStepSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copierState, setCopierState] = useState(false);
  
  // Custom states
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [downloadingCert, setDownloadingCert] = useState(false);
  const [downloadCertSuccess, setDownloadCertSuccess] = useState(false);

  const startCertDownload = () => {
    setDownloadingCert(true);
    setDownloadCertSuccess(false);
    setTimeout(() => {
      setDownloadingCert(false);
      setDownloadCertSuccess(true);
      setTimeout(() => setDownloadCertSuccess(false), 3500);
    }, 1800);
  };

  const scenarioSteps = finalExamScenario.steps;
  const currentStep = scenarioSteps[currentStepIdx];
  const finalCertificateId = useMemo(() => {
    const seed = `${userProgress.unvon}-${userProgress.xp}-${userProgress.finalExamCompleted ? 'completed' : 'pending'}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return `IIB-EXAM-${Math.abs(hash).toString().slice(0, 6).padStart(6, '0')}`;
  }, [userProgress.finalExamCompleted, userProgress.unvon, userProgress.xp]);

  const handleVerifyAnswer = () => {
    let isCorrect = false;

    if (currentStep.options) {
      if (selectedOptionIdx !== null) {
        const chosenOpt = currentStep.options[selectedOptionIdx];
        if (chosenOpt === currentStep.correctAnswer) {
          isCorrect = true;
        }
      }
    } else {
      if (userAnswer.trim().toLowerCase() === (currentStep.correctAnswer as string).toLowerCase()) {
        isCorrect = true;
      }
    }

    if (isCorrect) {
      setStepSuccess(true);
      setShowHint(false);
      setErrorAlert(null);

      setUserProgress(prev => {
        const newXp = prev.xp + 500;
        let newUnvon = prev.unvon;
        if (newXp >= 5000) newUnvon = 'Polkovnik';
        else if (newXp >= 4000) newUnvon = 'Podpolkovnik';
        else if (newXp >= 3000) newUnvon = 'Mayor';
        else if (newXp >= 2000) newUnvon = 'Kapitan';
        else if (newXp >= 1000) newUnvon = 'Katta Leytenant';

        return {
          ...prev,
          xp: newXp,
          unvon: newUnvon
        };
      });
    } else {
      setErrorAlert("XATO JAVOB. Detektiv, dalillarni zudlik bilan boshqatdan o'rganib chiqing yoki maslahat (hint) oling.");
      setTimeout(() => setErrorAlert(null), 5000);
    }
  };

  const handleNextStep = () => {
    setStepSuccess(false);
    setUserAnswer('');
    setSelectedOptionIdx(null);
    
    if (currentStepIdx < scenarioSteps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      setUserProgress(prev => ({ ...prev, finalExamCompleted: true }));
    }
  };

  const handleRestartExam = () => {
    setCurrentStepIdx(0);
    setUserAnswer('');
    setSelectedOptionIdx(null);
    setStepSuccess(false);
    setUserProgress(prev => ({ ...prev, finalExamCompleted: false }));
  };

  return (
    <div className="space-y-6 text-[#1A1A1A] relative" id="exam-quest-room">
      {/* Downloading indicator */}
      {downloadingCert && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2A4A] border border-[#E5E5E5] text-white rounded-lg px-5 py-4 shadow-2xl flex items-center space-x-3 animate-pulse">
          <RefreshCw className="w-5 h-5 text-[#B8860B] animate-spin" />
          <div>
            <p className="text-xs font-bold text-slate-100">Sertifikat tayyorlanmoqda...</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Yuqori aniqlikdagi PDF generatsiya qilinmoqda...</p>
          </div>
        </div>
      )}

      {/* Download success indicator */}
      {downloadCertSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2A4A] border border-[#1D9E75] text-white rounded-lg px-5 py-4 shadow-2xl flex items-center space-x-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#1D9E75]" />
          <div>
            <p className="text-xs font-bold text-slate-100">Sertifikat yuklandi!</p>
            <p className="text-[10px] text-slate-400 mt-0.5">IIB_Cyber_Certificate.pdf muvaffaqiyatli saqlandi.</p>
          </div>
        </div>
      )}

      {/* Inline Incorrect Answer Warning */}
      {errorAlert && (
        <div className="p-4 bg-red-900 border border-red-500 rounded-lg text-white flex items-center space-x-3 shadow-lg">
          <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-red-200">Tekshiruv xatosi</h5>
            <p className="text-xs text-red-350 font-semibold mt-0.5">{errorAlert}</p>
          </div>
        </div>
      )}

      {/* Intro details */}
      <div className="bg-white border border-[#E5E5E5] p-6 rounded-lg">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-8 h-8 text-[#D85A30] animate-pulse stroke-[2.5]" />
          <div>
            <h2 className="text-[20px] font-bold text-[#0F2A4A] tracking-tight">{finalExamScenario.title}</h2>
            <p className="text-xs text-[#6B7280] mt-1 font-semibold leading-relaxed">
              Bu shunchaki test emas, balki real voqelikka asoslangan kiber-jinoyatni ochish bo'yicha kompleks kiber-detektivlik operatsiyasi.
            </p>
          </div>
        </div>
        <p className="text-xs text-[#6B7280] mt-3.5 leading-relaxed bg-slate-50 p-4 rounded-lg border border-[#E5E5E5] font-medium">
          {finalExamScenario.description}
        </p>
      </div>

      {!userProgress.finalExamCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Step Panel */}
          <div className="lg:col-span-8 bg-white border border-[#E5E5E5] rounded-lg p-6 space-y-6">
            {/* Horizontal Timeline Stepper */}
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E5]">
              {scenarioSteps.map((step, idx) => {
                const isActive = idx === currentStepIdx;
                const isPassed = idx < currentStepIdx;
                return (
                  <div key={step.id} className="flex items-center space-x-1.5 flex-1 last:flex-initial">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                      isActive 
                        ? 'bg-[#0F2A4A] border-[#0F2A4A] text-white' 
                        : isPassed 
                        ? 'bg-[#1D9E75]/10 border-[#1D9E75]/30 text-[#1D9E75]' 
                        : 'bg-white border-[#E5E5E5] text-slate-450'
                    }`}>
                      {step.id}
                    </div>
                    {idx < scenarioSteps.length - 1 && (
                      <div className={`h-1 flex-1 ${idx < currentStepIdx ? 'bg-[#1D9E75]' : 'bg-slate-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step info */}
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E5E5E5] bg-slate-50 px-4 py-3">
                <span className="text-[10px] font-mono text-[#6B7280] block uppercase font-bold tracking-[0.18em]">BOSQICH {currentStep.id} • TERGOV</span>
                <h3 className="mt-2 text-[18px] font-bold text-[#0F2A4A] tracking-tight leading-snug">{currentStep.title}</h3>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed bg-slate-50 p-4 rounded-lg border border-[#E5E5E5] font-medium">
                {currentStep.task}
              </p>

              {/* Step specific clues / visualization templates */}
              {currentStep.id === 1 && currentStep.clues && (
                <div className="p-4 bg-slate-50 rounded-lg border border-[#E5E5E5] space-y-2 text-xs font-mono text-slate-700">
                  <span className="text-[#B8860B] font-bold block">KELIB TUSHGAN FISHING XAT HEADERS:</span>
                  <p><span className="text-slate-500 font-bold">Sender:</span> {currentStep.clues.sender}</p>
                  <p><span className="text-slate-500 font-bold">Subject:</span> {currentStep.clues.subject}</p>
                  <p className="text-slate-800 bg-white p-3 rounded-lg border border-[#E5E5E5] mt-1 whitespace-pre-wrap leading-relaxed">{currentStep.clues.content}</p>
                </div>
              )}

              {currentStep.id === 2 && currentStep.ipInfo && (
                <div className="p-4 bg-slate-50 rounded-lg border border-[#E5E5E5] space-y-1.5 text-xs font-mono text-slate-700">
                  <span className="text-[#0F2A4A] font-bold block mb-1">IP WHOIS DETECTS:</span>
                  <p><span className="text-slate-500 font-bold">IP ADDRESS:</span> {currentStep.ipInfo.ip}</p>
                  <p><span className="text-slate-500 font-bold">COUNTRY:</span> {currentStep.ipInfo.country}</p>
                  <p><span className="text-slate-500 font-bold">ISP PROVIDER:</span> {currentStep.ipInfo.isp}</p>
                  <p><span className="text-slate-500 font-bold">TYPE:</span> {currentStep.ipInfo.type}</p>
                </div>
              )}

              {currentStep.id === 3 && currentStep.osintLogs && (
                <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden text-xs">
                  <div className="bg-slate-100 px-3 py-1.5 text-[10px] font-mono text-[#6B7280] uppercase font-bold border-b border-[#E5E5E5]">OSINT Sherlock Database Sweep results</div>
                  <div className="divide-y divide-[#E5E5E5]">
                    {currentStep.osintLogs.map((log, i) => (
                      <div key={i} className="p-3 flex items-center justify-between">
                        <span className="font-mono text-slate-900 font-bold">{log.network}</span>
                        <span className="text-[#0F2A4A] font-semibold">{log.profile}</span>
                        <span className="text-[11px] text-slate-500 font-bold">{log.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep.id === 5 && currentStep.calculatedHash && (
                <div className="space-y-2.5">
                  <div className="bg-slate-50 border border-[#E5E5E5] rounded-lg p-4 text-xs font-mono text-slate-700">
                    <span className="text-[#1D9E75] font-bold block mb-1">PROTSESSUAL BAYONNOMA HTML FAILI MANBA KODI:</span>
                    <p className="p-3 bg-white border border-[#E5E5E5] rounded-lg select-all break-all text-[11px] leading-relaxed">{currentStep.fileToHash}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E5E5]">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-bold">SHA-256 HASH CALCULATED VALUE</span>
                        <span className="text-[#1D9E75] font-bold">{currentStep.calculatedHash}</span>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(currentStep.calculatedHash!);
                          setCopierState(true);
                          setTimeout(() => setCopierState(false), 2000);
                        }}
                        className="p-1 px-3 bg-white hover:bg-slate-50 rounded-lg text-[11px] border border-[#0F2A4A] text-[#0F2A4A] font-bold transition-all flex items-center space-x-1 cursor-pointer"
                      >
                        {copierState ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#1D9E75] stroke-[2.5]" />
                            <span className="text-[#1D9E75]">Nusxalandi!</span>
                          </>
                        ) : (
                          <>
                            <Clipboard className="w-3.5 h-3.5" />
                            <span>Nusxalash</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Answer input/option fields */}
              <div className="pt-3 border-t border-[#E5E5E5]">
                <label className="text-xs font-bold text-[#1A1A1A] block mb-2">{currentStep.question}</label>

                {!stepSuccess ? (
                  currentStep.options ? (
                    /* Multiple choices format */
                    <div className="space-y-2">
                      {currentStep.options.map((opt, oIdx) => {
                        const isSelected = selectedOptionIdx === oIdx;
                        return (
                          <label 
                            key={oIdx} 
                            className={`flex items-center space-x-2.5 p-3.5 rounded-lg border text-xs text-slate-900 transition-colors cursor-pointer ${
                              isSelected 
                                ? 'bg-[#0F2A4A]/5 border-[#0F2A4A] text-[#0F2A4A] font-semibold' 
                                : 'bg-white border-[#E5E5E5] hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="exam-opt"
                              checked={isSelected}
                              onChange={() => setSelectedOptionIdx(oIdx)}
                              className="rounded-full border-[#E5E5E5] text-[#0F2A4A] focus:ring-[#0F2A4A] w-3.5 h-3.5"
                            />
                            <span className="font-semibold">{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    /* Text input format */
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Dalil qiymatini kiriting..."
                        className="flex-1 bg-white border border-[#E5E5E5] focus:border-[#0F2A4A] rounded-lg px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none font-mono"
                      />
                      <button
                        onClick={handleVerifyAnswer}
                        className="bg-[#0F2A4A] hover:bg-[#0b1e35] text-white h-10 px-4 rounded-lg text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer border-0"
                      >
                        Tekshirish
                      </button>
                    </div>
                  )
                ) : (
                  /* Success indicator step feedback */
                  <div className="p-4 bg-[#1D9E75]/5 border border-[#1D9E75]/30 rounded-lg text-xs space-y-2.5">
                    <p className="text-[#1D9E75] font-bold flex items-center text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 stroke-[2.5]" /> MUVAFFAQIYATLI JAVOB!
                    </p>
                    <p className="text-[#1A1A1A] leading-relaxed font-semibold">{currentStep.successMessage}</p>
                    
                    <button
                      onClick={handleNextStep}
                      className="mt-2 bg-[#1D9E75] hover:bg-[#157a5a] text-white h-10 px-4 rounded-lg text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer border-0 gap-1.5"
                    >
                      <span>Keyingi bosqichga o'tish</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                )}

                {/* Multiple choice verify button */}
                {currentStep.options && !stepSuccess && (
                  <button
                    disabled={selectedOptionIdx === null}
                    onClick={handleVerifyAnswer}
                    className="mt-4 w-full bg-[#0F2A4A] hover:bg-[#0b1e35] text-white h-10 px-4 rounded-lg text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer border-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Javobni tasdiqlash
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stepper info/hints right sidebar */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-[#E5E5E5] p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-[#6B7280] tracking-wider font-sans">Tergov Qo'llanmasi</h4>
              
              <div className="p-4 bg-slate-50 border border-[#E5E5E5] rounded-lg text-xs text-[#6B7280] leading-normal space-y-1.5 font-medium">
                <p className="font-bold text-[#0F2A4A]">Vaziyat:</p>
                <p>Kiber-tovlamachilik ishida har bir dalil zanjiri keyingi ssenariyga yo'l ochadi. Hujjat va xat sarlavhalarini sinchkovlik bilan nusxalang.</p>
              </div>

              {/* Collapsible Help hint */}
              <div className="border-t border-[#E5E5E5] pt-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="w-full flex items-center justify-between text-xs text-[#0F2A4A] hover:text-[#0b1e35] font-semibold"
                >
                  <span>{showHint ? "Yordamni yopish" : "Tergovchidan yordam (Maslahat)"}</span>
                  <HelpCircle className="w-4 h-4 stroke-[2.5]" />
                </button>
                {showHint && (
                  <p className="mt-2 p-3 bg-[#0F2A4A]/5 border border-[#0F2A4A]/20 rounded-lg text-[11px] text-[#0F2A4A] leading-relaxed font-semibold animate-fade-in">
                    {currentStep.hint}
                  </p>
                )}
              </div>
            </div>


          </div>

        </div>
      ) : (
        /* GRADUATION CERTIFICATE GENERATOR PANEL */
        <div className="space-y-6" id="academy-graduation-view">
          {/* Visual Certificate Card in Geometric style */}
          <div className="bg-white border-4 border-[#B8860B]/30 p-8 sm:p-12 rounded-lg text-center relative overflow-hidden shadow-sm max-w-2xl mx-auto">
            {/* Background watermarks decorative borders */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-[#B8860B]/25 pointer-events-none rounded-lg" />
            
            <div className="space-y-6 relative z-10">
              <Award className="w-16 h-16 text-[#B8860B] mx-auto stroke-[2]" />
              
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#6B7280] tracking-widest uppercase block font-bold">O'ZBEKISTON RESPUBLIKASI ICHKI ISHLAR VAZIRLIGI</span>
                <h3 className="text-[22px] font-bold text-[#0F2A4A] tracking-tight">KIBERXAVFSIZLIK AKADEMIYASI</h3>
                <span className="bg-[#B8860B] text-white px-3 py-1 text-xs font-mono font-bold uppercase inline-block rounded-md">
                  Kurs uchun sertifikat
                </span>
              </div>

              <div className="w-24 h-0.5 bg-[#B8860B]/20 mx-auto" />

              <p className="text-xs text-[#6B7280] italic font-semibold max-w-sm mx-auto">
                Ushbu diplom bilan kiber-surishtiruv hamda barcha kiber-operatsiyalar kvestini 100% bajarganligi munosabati bilan tinglovchi:
              </p>
              
              <h2 className="text-2xl font-bold text-[#0F2A4A] tracking-tight font-sans uppercase">
                {userProgress.unvon === 'Polkovnik' ? 'Kiber-Polkovnik' : userProgress.unvon} Tinglovchi
              </h2>
              
              <p className="text-xs text-[#6B7280] max-w-md mx-auto leading-relaxed font-medium">
                Kiber-gigiyena, Ijtimoiy muhandislik mudofaasi, Tarmoq havfsizligi, Raqamli dalillar yig'ish (Forensika), Kiber-Sud va OSINT yo'nalishlari bo'yicha to'liq ta'lim kursini muvaffaqiyatli yakunlab, barcha amaliy imtihonlarni topshirdi.
              </p>

              <div className="flex justify-between items-end pt-6 max-w-md mx-auto text-left text-[10px] font-mono text-[#6B7280] font-bold border-t border-[#E5E5E5]">
                <div>
                  <p>Sana: {new Date().toLocaleDateString('uz-UZ')}</p>
                  <p>Sertifikat ID: {finalCertificateId}</p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-700 uppercase">Akademiya boshlig'i:</span>
                  <span className="italic font-bold text-[#0F2A4A]">Kiber-Polkovnik M. To'rayev</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action links */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={startCertDownload}
              className="flex items-center space-x-1.5 bg-[#B8860B] hover:bg-[#996f09] text-white h-10 px-5 rounded-lg text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer border-0"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Sertifikatni Yuklab Olish (PDF)</span>
            </button>
            <button
              onClick={handleRestartExam}
              className="flex items-center space-x-1 bg-white hover:bg-slate-50 text-[#0F2A4A] border border-[#0F2A4A] h-10 px-5 rounded-lg text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Kvestni Qaytadan Boshlash</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
