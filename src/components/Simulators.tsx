import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Shield, Key, Lock, Mail, AlertTriangle, Eye, Send, ArrowRight, Server, Globe,
  FileSearch, Smartphone, FolderPlus, HelpCircle, HardDrive, Cpu, Gavel, 
  MapPin, UserCheck, RefreshCw, CheckCircle2, ChevronRight, Play, Terminal, Download, ShieldCheck
} from 'lucide-react';
import { FishingMail, EvidenceItem } from '../types';
import {
  calculatePasswordStrength,
  estimateBruteForceTime,
  checkFishingClassification,
  calculateAnonymityScore,
  verifyEvidenceBagging,
  verifyKiberSudVerdict,
  calculateGeoguessScore
} from '../utils/cyberUtils';

interface SimulatorProps {
  moduleType: 'password' | 'fishing' | 'packet' | 'forensics' | 'sud' | 'footprint';
  onComplete: (score: number, xpEarned: number) => void;
}

export default function Simulators({ moduleType, onComplete }: SimulatorProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setErrorMsg(null);
    setSuccessMsg(null);
  }, []);

  useEffect(() => () => clearToast(), [clearToast]);

  const showToast = useCallback((msg: string, type: 'error' | 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setErrorMsg(type === 'error' ? msg : null);
    setSuccessMsg(type === 'success' ? msg : null);
    toastTimeoutRef.current = setTimeout(() => {
      setErrorMsg(null);
      setSuccessMsg(null);
      toastTimeoutRef.current = null;
    }, 5000);
  }, []);

  const showError = useCallback((msg: string) => showToast(msg, 'error'), [showToast]);
  const showSuccess = useCallback((msg: string) => showToast(msg, 'success'), [showToast]);

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 shadow-sm relative" id="simulators-wrapper">
      {/* Dynamic Cyber SaaS Notification Banner */}
      {errorMsg && (
        <div className="absolute top-4 left-4 right-4 z-50 p-3.5 bg-red-950/95 border border-red-500 rounded-xl text-red-200 flex items-center space-x-3 shadow-2xl animate-bounce">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider block text-[10px] text-red-300">Protsedura Xatosi</span>
            <span className="font-semibold">{errorMsg}</span>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="absolute top-4 left-4 right-4 z-50 p-3.5 bg-indigo-950/95 border border-indigo-500 rounded-xl text-indigo-100 flex items-center space-x-3 shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider block text-[10px] text-emerald-300">Muvaffaqiyatli Jarayon</span>
            <span className="font-semibold">{successMsg}</span>
          </div>
        </div>
      )}

      {moduleType === 'password' && <PasswordCrackerSimulator onComplete={onComplete} showError={showError} showSuccess={showSuccess} />}
      {moduleType === 'fishing' && <FishingMailAnalyzer onComplete={onComplete} showError={showError} showSuccess={showSuccess} />}
      {moduleType === 'packet' && <PacketTraceVisualizer onComplete={onComplete} showError={showError} showSuccess={showSuccess} />}
      {moduleType === 'forensics' && <VirtualCrimeScene onComplete={onComplete} showError={showError} showSuccess={showSuccess} />}
      {moduleType === 'sud' && <KiberSudSimulator onComplete={onComplete} showError={showError} showSuccess={showSuccess} />}
      {moduleType === 'footprint' && <DigitalFootprintHunter onComplete={onComplete} showError={showError} showSuccess={showSuccess} />}
    </div>
  );
}

// ==========================================
// 1. PASSWORD CRACKER SIMULATOR (MODUL 1)
// ==========================================
function PasswordCrackerSimulator({ onComplete, showError, showSuccess }: { onComplete: (score: number, xpEarned: number) => void; showError: (msg: string) => void; showSuccess: (msg: string) => void }) {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, text: 'Kiritilmagan', color: 'text-slate-400', bg: 'bg-slate-800' });
  const [bruteTime, setBruteTime] = useState('0 soniya');
  const [inDictionary, setInDictionary] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  const [privacyChecked, setPrivacyChecked] = useState<Record<string, boolean>>({
    telemetry: false,
    lockscreen: false,
    usbBlock: false,
    update: false
  });

  const analyzePassword = (val: string) => {
    setPassword(val);
    const trimmed = val.trim();
    if (!trimmed) {
      setStrength({
        score: 0,
        text: val && !trimmed ? 'Noto\'g\'ri (faqat bo\'sh joy)' : 'Kiritilmagan',
        color: val && !trimmed ? 'text-red-500 font-bold' : 'text-slate-400',
        bg: val && !trimmed ? 'bg-red-500/20' : 'bg-slate-800'
      });
      setBruteTime('0 soniya');
      setInDictionary(false);
      setTips(val && !trimmed ? ['Parol faqat bo\'sh joylardan iborat bo\'lishi mumkin emas.'] : []);
      return;
    }

    const result = calculatePasswordStrength(val);
    const isWeakWord = result.isDictionary;
    setInDictionary(isWeakWord);

    const currentTips: string[] = [];
    if (result.length < 12) currentTips.push('Parol uzunligi 12+ bo\'lsa, lug\'at hujumi va brute-force uchun yaxshiroq himoya beradi.');
    if (!result.hasUpper) currentTips.push('Katta harflardan ham foydalaning (A-Z).');
    if (!result.hasLower) currentTips.push('Kichik harflar ham bo\'lishi kerak (a-z).');
    if (!result.hasNumber) currentTips.push('Kamida bitta raqam ishtirok etsin (0-9).');
    if (!result.hasSpecial) currentTips.push('Maxsus belgilarni qo\'shing (masalan: !, @, #, $, %).');

    setTips(currentTips);

    let timeText = estimateBruteForceTime(val);
    if (isWeakWord) {
      timeText = '0.01 soniya (Lug\'at bo\'yicha zudlikda)';
      setStrength({ score: 1, text: 'Lug\'atdagi xavfli parol!', color: 'text-red-600 font-bold', bg: 'bg-red-600/20' });
    } else {
      setStrength({
        score: result.score,
        text: result.text,
        color: result.color,
        bg: result.bg
      });
    }

    setBruteTime(timeText);
  };

  const handleTogglePrivacy = (key: string) => {
    setPrivacyChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isAllPrivacyDone = Object.values(privacyChecked).every(v => v);
  const isPasswordValid = password.trim().length > 0;
  const canComplete = isPasswordValid && strength.score >= 4 && isAllPrivacyDone && !inDictionary;

  return (
    <div className="space-y-6" id="password-cracker-sim">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Key className="w-5 h-5 text-indigo-400 mr-2" /> 1-Simulyator: Parol Entropiyasi va OT Sozlamalari
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Parolingizni kiritib, uning lug'at hujumiga chidamliligini va operatsion tizim maxfiylik sozlamalari to'g'riligini amalda tekshiring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pass Cracker Area */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-sm font-semibold text-slate-300">A. Parol tahlilchisi</h4>
          <div className="space-y-1.5">
            <label className="text-slate-400 text-xs">Sinov parolini yozing:</label>
            <div className="relative">
              <input
                type="text"
                value={password}
                onChange={(e) => analyzePassword(e.target.value)}
                placeholder="Parolni yozing (Masalan: Uzb@k2026_iib)"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Parol mustahkamligi:</span>
              <span className={strength.color}>{strength.text}</span>
            </div>
            {/* Visual Bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex space-x-0.5">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div 
                  key={idx} 
                  className={`h-full flex-1 ${idx <= strength.score ? strength.bg : 'bg-slate-800'}`}
                />
              ))}
            </div>

            <div className="bg-slate-900/50 p-3 rounded border border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Uzunligi:</span>
                <span className="text-white font-mono font-bold">{password.length || 0} ta belgi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Entropiya:</span>
                <span className="text-white font-mono font-bold">{calculatePasswordStrength(password).entropyBits.toFixed(1)} bit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Belgilar to'plami:</span>
                <span className="text-white font-mono font-bold">{calculatePasswordStrength(password).charsetSize || 0} ta imkoniyat</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Buzishga ketadigan vaqt (Brute-Force):</span>
                <span className="text-white font-mono font-bold">{bruteTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lug'atda mavjudligi:</span>
                <span className={inDictionary ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {inDictionary ? 'HA (Kuchsiz)' : 'YO\'Q (Xavfsiz)'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {[
                ['Katta harf', /[A-Z]/.test(password)],
                ['Kichik harf', /[a-z]/.test(password)],
                ['Raqam', /[0-9]/.test(password)],
                ['Maxsus belgi', /[^A-Za-z0-9]/.test(password)]
              ].map(([label, ok]) => (
                <div key={label} className={`rounded border px-2.5 py-2 ${ok ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}>
                  <div className="font-bold">{label}</div>
                  <div className="text-[10px] mt-0.5">{ok ? 'Mavjud' : 'Yo\'q'}</div>
                </div>
              ))}
            </div>

            {tips.length > 0 && (
              <div className="space-y-1 bg-red-500/5 border border-red-500/10 p-2.5 rounded text-[11px] text-red-300">
                <p className="font-bold">Mustahkamlash bo'yicha tavsiyalar:</p>
                <ul className="list-disc list-inside space-y-0.5 pl-1.5">
                  {tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* OS Privacy Checklist */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-sm font-semibold text-slate-300">B. Operatsion Tizim Maxfiyligi (Amaliyot)</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            IIB talablariga muvofiq, ish stolidagi operatsion tizim (Windows/Linux) xavfsizligini ta'minlash uchun quyidagi maxfiylik sozlamalarini to'g'rilang:
          </p>

          <div className="space-y-2.5">
            <button 
              onClick={() => handleTogglePrivacy('telemetry')}
              className={`w-full p-2.5 rounded border text-left flex items-center justify-between text-xs transition-colors ${
                privacyChecked.telemetry ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="font-bold block">1. Diagnostika va Telemetriya ma'lumotlarini cheklash</span>
                <span className="text-[10px] text-slate-400">Microsoft/Apple serverlariga ma'lumotlar uzatilishini bloklash</span>
              </div>
              <input type="checkbox" checked={privacyChecked.telemetry} readOnly className="pointer-events-none rounded" />
            </button>

            <button 
              onClick={() => handleTogglePrivacy('lockscreen')}
              className={`w-full p-2.5 rounded border text-left flex items-center justify-between text-xs transition-colors ${
                privacyChecked.lockscreen ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="font-bold block">2. Avtomatik ekran qulflanishini sozlash</span>
                <span className="text-[10px] text-slate-400">Kompyuter ishlamay turganda 2 daqiqadan keyin qulflashni yoqish</span>
              </div>
              <input type="checkbox" checked={privacyChecked.lockscreen} readOnly className="pointer-events-none rounded" />
            </button>

            <button 
              onClick={() => handleTogglePrivacy('usbBlock')}
              className={`w-full p-2.5 rounded border text-left flex items-center justify-between text-xs transition-colors ${
                privacyChecked.usbBlock ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="font-bold block">3. USB AutoRun va ruxsatsiz port ulanishlarini taqiqlash</span>
                <span className="text-[10px] text-slate-400">Begona qurilmalardan BadUSB troyan viruslari yuqishidan saqlash</span>
              </div>
              <input type="checkbox" checked={privacyChecked.usbBlock} readOnly className="pointer-events-none rounded" />
            </button>

            <button 
              onClick={() => handleTogglePrivacy('update')}
              className={`w-full p-2.5 rounded border text-left flex items-center justify-between text-xs transition-colors ${
                privacyChecked.update ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="font-bold block">4. Avtomatik xavfsizlik yangilanishlarini faollashtirish</span>
                <span className="text-[10px] text-slate-400">OT xavfsizlik patchlarini zudlik bilan yuklashni yoqish</span>
              </div>
              <input type="checkbox" checked={privacyChecked.update} readOnly className="pointer-events-none rounded" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          onClick={() => {
            if (canComplete) {
              onComplete(100, 500); // Pass score and reward XP
            } else {
              showError("Iltimos, avval parolingizni kuchli (kamida 4 barga) qiling va barcha 4 ta maxfiylik sozlamalarini yakunlang!");
            }
          }}
          className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
            canComplete 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-lg shadow-emerald-600/10' 
              : 'bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Parol va maxfiylik simulyatsiyasini yakunlash (+500 XP)</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. FISHING MAIL ANALYZER (MODUL 2)
// ==========================================
function FishingMailAnalyzer({ onComplete, showError, showSuccess }: { onComplete: (score: number, xpEarned: number) => void; showError: (msg: string) => void; showSuccess: (msg: string) => void }) {
  const [currentMailIndex, setCurrentMailIndex] = useState(0);
  const [mails, setMails] = useState<FishingMail[]>([
    {
      id: 1,
      senderName: "Payme O'zbekiston Support",
      senderEmail: "support@payme-verification-security.xyz",
      subject: "Hisobingiz zudlik bilan cheklanishi mumkin!",
      content: "Hurmatli mijoz! Payme tizimida yangi shubhali faollik aniqlandi. Agar 24 soat ichida hisobingizni quyidagi xavfsiz havola orqali tasdiqlamasangiz, barcha plastik kartalaringiz bloklanadi: http://payme-secure-verification.ru/cabinet",
      isPhishing: true,
      clues: [
        "Yuboruvchining pochta domeni rasmiy payme.uz emas, balki shubhali payme-verification-security.xyz dir.",
        "Xat matnida foydalanuvchini qo'rqitish va shoshiltirish uslubi ('Urgency') ishlatilgan.",
        "Havola manzili 'payme.uz' emas, soxta Rossiya domeni 'payme-secure-verification.ru' saytiga yo'naltirilgan."
      ]
    },
    {
      id: 2,
      senderName: "O'zbekiston Ichki Ishlar Vazirligi",
      senderEmail: "info@mvd.uz",
      subject: "Navbatdagi kiberxavfsizlik o'quv seminari jadvali",
      content: "Assalomu alaykum xodimlar. Navbatdagi seminar 5-iyul kuni soat 10:00 da IIB akademiyasining majlislar zalida bo'lib o'tadi. Rejani ilova qilingan PDF hujjatda ko'rib chiqishingiz mumkin. Kiring va tanishing.",
      isPhishing: false,
      clues: ["Yuboruvchining domeni mvd.uz - rasmiy vazirlik pochta domeni.", "Xatda shubhali tashqi havolalar va noaniq fayllar mavjud emas."]
    },
    {
      id: 3,
      senderName: "Yandex Mail Security Team",
      senderEmail: "support@yandex-secure-auth.com",
      subject: "Zudlik bilan pochta parolingizni o'zgartiring!",
      content: "E'tibor bering! Sizning pochtangizga boshqa IP manzildan kirilgan. Hisobni saqlab qolish uchun quyidagi havolaga kiring va joriy hamda yangi parolingizni kiriting: http://yandex-auth-verification.ru/login-page",
      isPhishing: true,
      clues: [
        "Domen soxtalashtirilgan (yandex-secure-auth.com rasmiy yandex.ru o'rniga).",
        "Yo'naltirilgan havola .ru zonasidagi mutlaqo begonadir."
      ]
    },
    {
      id: 4,
      senderName: "Soliq Qo'mitasi Axborot Xizmati",
      senderEmail: "noreply@soliq.uz",
      subject: "Soliq deklaratsiyasini topshirish muddati uzaytirildi",
      content: "Hurmatli soliq to'lovchilar, deklaratsiyalarni topshirish muddati joriy yilning 15-iyuliga qadar uzaytirildi. Batafsil ma'lumot soliq.uz rasmiy portalida joylashtirilgan.",
      isPhishing: false,
      clues: ["Domen rasmiy soliq.uz domeniga tegishli. Havolalar faqat rasmiy saytga yetaklaydi."]
    },
    {
      id: 5,
      senderName: "Telegram Messenger Verification",
      senderEmail: "security@telegram-verify-auth.xyz",
      subject: "Sizning telegram hisobingiz o'chirilishi haqida ogohlantirish",
      content: "Diqqat! Sizning hisobingiz ustidan firgarlik bo'yicha ariza tushdi. Agar tizimda haqiqiy odam ekanligingizni tasdiqlamasangiz, profilingiz 1 soatda o'chiriladi. Tasdiqlash havolasi: http://telegram-verification-identity.net/verify",
      isPhishing: true,
      clues: [
        "Telegram odatda elektron pochta orqali bunday xabarlar jo'natmaydi, barcha tasdiqlar ilova ichidagi tizimli suhbatda bo'ladi.",
        "Domen telegram.org emas, soxta .xyz va .net domenlaridir."
      ]
    }
  ]);

  const [feedback, setFeedback] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [vishingChatStep, setVishingChatStep] = useState(0);
  const [vishingMessages, setVishingMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: "*Telefon jiringlaydi...* Assalomu alaykum, men Xalq Banki xavfsizlik bo'limi bosh mutaxassisi Alisherovman. Sizning plastik kartangizdan hozirgina 2,000,000 so'm pul o'tkazishga shubhali urinish bo'ldi. Uni bloklash uchun telefoningizga SMS orqali borgan 5 xonali tasdiqlash kodini ayting!" }
  ]);

  const handleIdentify = (isPhishingUserChoice: boolean) => {
    const currentMail = mails[currentMailIndex];
    const isCorrect = checkFishingClassification(currentMail.isPhishing, isPhishingUserChoice);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback("TO'G'RI! " + (currentMail.isPhishing ? "Bu haqiqatdan ham fishing xati." : "Bu xavfsiz, rasmiy xat."));
    } else {
      setFeedback("XATO. " + (currentMail.isPhishing ? "Bu aslida fishing xati edi!" : "Bu xavfsiz xat edi, asossiz shubhalandingiz."));
    }

    // Add visual clues
    const updatedMails = [...mails];
    updatedMails[currentMailIndex].userIdentifiedCorrectly = isCorrect;
    setMails(updatedMails);
  };

  const handleNextMail = () => {
    setFeedback(null);
    setCurrentMailIndex(prev => prev + 1);
  };

  // Vishing role play options
  const handleVishingOption = (optionIdx: number) => {
    if (vishingChatStep === 0) {
      if (optionIdx === 0) {
        // user gives code (wrong)
        setVishingMessages(prev => [
          ...prev,
          { sender: 'user', text: "Xo'p, mana kod: 48291. Kartani tezroq bloklang!" },
          { sender: 'bot', text: "Rahmat! *Telefon o'chadi...* TIZIM OGOHLANTIRISHI: Siz firgarga kodni berib yubordingiz! Kartangizdagi barcha mablag'lar o'g'irlandi. Kiber-gigiyena talabini buzdingiz." }
        ]);
      } else {
        // user rejects (correct)
        setVishingMessages(prev => [
          ...prev,
          { sender: 'user', text: "Hech qanday kodni aytmayman! Bank xodimlari kod so'ramaydi. Hozir vaziyatni aniqlash uchun o'zim bankka qo'ng'iroq qilaman!" },
          { sender: 'bot', text: "Ajoyib kiber-tayyorgarlik! Firgar maqsadiga erisha olmay telefonni o'chirib qo'ydi. Siz vishing hujumini muvaffaqiyatli qaytardingiz!" }
        ]);
      }
      setVishingChatStep(1);
    }
  };

  const isExamDone = currentMailIndex >= mails.length && vishingChatStep > 0;
  const totalScore = Math.floor((correctAnswers / mails.length) * 100);

  return (
    <div className="space-y-6" id="fishing-analyzer-sim">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Mail className="w-5 h-5 text-indigo-400 mr-2" /> 2-Simulyator: Fishing Xatlar Tahlili va Vishing Mudofaasi
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Ekranga keladigan xatlarni sinchkovlik bilan tekshiring, havolalar va yuboruvchi domenlaridagi xatolarni toping va telefon firgarligi bilan kurashing.
        </p>
      </div>

      {currentMailIndex < mails.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Email Area */}
          <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>XAT {currentMailIndex + 1} / {mails.length}</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">E-Mail Box</span>
            </div>

            <div className="border border-slate-850 rounded-lg overflow-hidden bg-slate-900/40">
              <div className="bg-slate-900/80 p-3.5 border-b border-slate-800 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Kimdan:</span>{' '}
                  <span className="text-slate-200 font-semibold">{mails[currentMailIndex].senderName}</span>{' '}
                  <span className="text-sky-400 font-mono">&lt;{mails[currentMailIndex].senderEmail}&gt;</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Mavzu:</span>{' '}
                  <span className="text-white font-bold">{mails[currentMailIndex].subject}</span>
                </div>
              </div>
              <div className="p-4 text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/20 whitespace-pre-wrap">
                {mails[currentMailIndex].content}
              </div>
            </div>

            {/* Actions */}
            {!feedback ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => handleIdentify(true)}
                  className="flex-1 py-2.5 bg-red-600/15 hover:bg-red-600/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  ⚠️ Bu Fishing / Soxta Xat
                </button>
                <button
                  onClick={() => handleIdentify(false)}
                  className="flex-1 py-2.5 bg-emerald-600/15 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  ✅ Bu Rasmiy / Xavfsiz Xat
                </button>
              </div>
            ) : (
              <div className="space-y-3 bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <p className={`text-xs font-bold ${feedback.includes("TO'G'RI") ? 'text-emerald-400' : 'text-red-400'}`}>
                  {feedback}
                </p>
                <div className="text-[11px] text-slate-400 space-y-1 pl-2 border-l-2 border-slate-700">
                  <p className="font-semibold text-slate-300">Tahlil dalillari:</p>
                  {mails[currentMailIndex].clues.map((clue, idx) => (
                    <p key={idx}>• {clue}</p>
                  ))}
                </div>
                <button
                  onClick={handleNextMail}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded transition-colors"
                >
                  Keyingi xatga o'tish →
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Tahlil ko'rsatmalari</h4>
              <ul className="space-y-2.5 text-[11px] text-slate-400 leading-normal list-disc list-inside">
                <li>Yuboruvchi pochta manzilini diqqat bilan solishtiring (masalan, <code className="text-sky-400 font-mono">@mvd.uz</code> bilan <code className="text-sky-400 font-mono">@mvd-verification.xyz</code>).</li>
                <li>Havolalarning yakuniy TLD (.uz, .ru, .xyz) zonalarini va soxtalashtirilgan domen nomlarini tekshiring.</li>
                <li>Hech qachon shaxsiy hisob parollari va PIN kodlarni so'raydigan havolalarga ishonmang.</li>
              </ul>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg mt-4 text-center">
              <span className="text-[10px] text-slate-400 font-mono">Tuzilgan to'g'ri javoblar: {correctAnswers} / {mails.length}</span>
            </div>
          </div>
        </div>
      ) : vishingChatStep === 0 ? (
        /* Vishing call simulation step */
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-amber-400 font-mono">
            <AlertTriangle className="w-4 h-4" />
            <span>2-Bosqich: Telefon orqali ijtimoiy muhandislik (Vishing)</span>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-850 space-y-3">
            {vishingMessages.map((msg, i) => (
              <div key={i} className={`p-3 rounded-lg text-xs leading-relaxed max-w-[85%] ${msg.sender === 'bot' ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-900/30' : 'bg-slate-850 text-slate-300 ml-auto'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 block mb-2">Quyidagi javoblardan birini tanlang (Tergov mantiqi):</span>
            <button
              onClick={() => handleVishingOption(0)}
              className="w-full text-left p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Option A: "Xo'p, hozir telefonimga kelgan SMS kodni aytaman, tezroq kartamni bloklang, u yerda oyligim bor edi!"
            </button>
            <button
              onClick={() => handleVishingOption(1)}
              className="w-full text-left p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Option B: "Hech qanday kodni aytmayman! Bank xodimi telefon orqali maxfiy tasdiq kodi va parollarni aslo so'ramaydi. Men hozir aloqani uzib, bank rasmiy koll-markaziga o'zim qo'ng'iroq qilaman."
            </button>
          </div>
        </div>
      ) : (
        /* Final results screen for Modul 2 */
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h4 className="text-lg font-bold text-white">Modul tahlillari yakunlandi!</h4>
          <p className="text-xs text-slate-400">
            Siz 5 ta xatdan <strong className="text-white">{correctAnswers} tasini</strong> to'g'ri tahlil qildingiz va Vishing hujumini munosib qaytardingiz.
          </p>
          <div className="text-xs font-mono text-slate-400">
            Yakuniy ball: <span className="text-emerald-400 font-bold">{totalScore}%</span>
          </div>

          <button
            onClick={() => onComplete(totalScore, 600)}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Modul natijasini yuborish (+600 XP)
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. PACKET TRACE VISUALIZER (MODUL 3)
// ==========================================
function PacketTraceVisualizer({ onComplete, showError, showSuccess }: { onComplete: (score: number, xpEarned: number) => void; showError: (msg: string) => void; showSuccess: (msg: string) => void }) {
  const [tracing, setTracing] = useState(false);
  const [currentHop, setCurrentHop] = useState(-1);
  const [isTorActive, setIsTorActive] = useState(false);
  const [isVpnActive, setIsVpnActive] = useState(false);
  const [isJsEnabled, setIsJsEnabled] = useState(true);
  const traceRunIdRef = useRef(0);
  const hopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hops = [
    { name: "Sizning Kompyuter", ip: "185.213.112.5", location: "Toshkent, O'zbekiston", latency: 12 },
    { name: "Uztelecom Gateway", ip: "10.0.99.1", location: "Toshkent, O'zbekiston", latency: 18 },
    { name: "Frankfurt IXP Router", ip: "80.81.192.15", location: "Frankfurt, Germaniya", latency: 34 },
    { name: "Cloudflare CDN Edge", ip: "172.67.15.111", location: "Amsterdam, Niderlandiya", latency: 41 },
    { name: "Yakuniy Server (Target)", ip: "104.22.8.5", location: "Nyu-York, AQSh", latency: 58 }
  ];

  const resetTrace = useCallback(() => {
    traceRunIdRef.current += 1;
    if (hopTimerRef.current) {
      clearTimeout(hopTimerRef.current);
      hopTimerRef.current = null;
    }
    setTracing(false);
    setCurrentHop(-1);
  }, []);

  useEffect(() => () => {
    traceRunIdRef.current += 1;
    if (hopTimerRef.current) clearTimeout(hopTimerRef.current);
  }, []);

  const handleStartTrace = () => {
    resetTrace();
    setTracing(true);
    setCurrentHop(0);
  };

  useEffect(() => {
    if (!tracing || currentHop < 0) return;

    if (currentHop >= hops.length - 1) {
      setTracing(false);
      return;
    }

    const runId = traceRunIdRef.current;
    hopTimerRef.current = setTimeout(() => {
      if (runId !== traceRunIdRef.current) return;
      setCurrentHop(prev => prev + 1);
    }, 1000);

    return () => {
      if (hopTimerRef.current) {
        clearTimeout(hopTimerRef.current);
        hopTimerRef.current = null;
      }
    };
  }, [tracing, currentHop, hops.length]);

  const isTraceComplete = currentHop === hops.length - 1;

  // Anonymity index logic using pure function
  const anonymityScore = calculateAnonymityScore({
    isTorActive,
    isVpnActive,
    isJsDisabled: !isJsEnabled
  });

  return (
    <div className="space-y-6" id="packet-trace-sim">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Globe className="w-5 h-5 text-indigo-400 mr-2" /> 3-Simulyator: Paketlar Trassirovkasi va Tor Anonimligi
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Internet orqali uzatiladigan ma'lumotlar qaysi xalqaro serverlar va davlatlar o'tib borishini ko'ring va Tor tarmog'i bilan anonimlik koeffitsientini tekshiring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hop Trace Visualizer */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-semibold text-slate-300">A. Paket yo'nalish trassirovkasi (traceroute)</h4>
            <div className="flex items-center space-x-2">
              {(tracing || isTraceComplete) && (
                <button
                  onClick={resetTrace}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded transition-all cursor-pointer flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Qayta trassirovka</span>
                </button>
              )}
              <button
                onClick={handleStartTrace}
                disabled={tracing}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded transition-all disabled:opacity-55 cursor-pointer"
              >
                {tracing ? "Trassirovka qilinmoqda..." : isTraceComplete ? "Trassirovkani qayta ishga tushirish" : "Yo'nalishni tekshirish (traceroute)"}
              </button>
            </div>
          </div>

          {/* Traceroute Visual Diagram SVG */}
          <div className="relative h-44 bg-slate-900/50 rounded-lg border border-slate-850 p-4 overflow-hidden flex flex-col justify-center">
            <div className="flex justify-between items-center relative z-10">
              {hops.map((hop, idx) => {
                const isActive = currentHop >= idx;
                const isCurrent = currentHop === idx;
                return (
                  <div key={idx} className="flex flex-col items-center space-y-2 relative group w-24">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      isCurrent 
                        ? 'bg-amber-500/20 border-amber-500 scale-110 shadow-lg shadow-amber-500/10' 
                        : isActive 
                        ? 'bg-emerald-500/20 border-emerald-500' 
                        : 'bg-slate-950 border-slate-800'
                    }`}>
                      {idx === 0 && <Cpu className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />}
                      {idx > 0 && idx < hops.length - 1 && <Server className={`w-5 h-5 ${isCurrent ? 'text-amber-400' : isActive ? 'text-emerald-400' : 'text-slate-400'}`} />}
                      {idx === hops.length - 1 && <Globe className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />}
                    </div>
                    <span className="text-[10px] text-slate-300 font-semibold block text-center truncate w-full">{hop.name}</span>
                    <span className="text-[8px] text-slate-400 font-mono block text-center truncate w-full">{hop.ip}</span>
                    <span className="text-[8px] text-indigo-400 font-medium block text-center truncate w-full">{hop.location}</span>
                  </div>
                );
              })}
            </div>
            {/* Background connecting SVG line */}
            <svg className="absolute inset-x-0 top-1/2 -translate-y-8 h-4 w-full px-12 pointer-events-none">
              <line x1="0" y1="8" x2="100%" y2="8" stroke="#1e293b" strokeWidth="2" />
              {currentHop > 0 && (
                <line 
                  x1="0" 
                  y1="8" 
                  x2={`${(currentHop / (hops.length - 1)) * 100}%`} 
                  y2="8" 
                  stroke="#10b981" 
                  strokeWidth="2" 
                  className="transition-all duration-1000" 
                />
              )}
            </svg>
          </div>

          {currentHop >= 0 && (
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono space-y-1">
              <span className="text-amber-400 font-bold block mb-1">TRACEROUTE CONSOLE OUTPUT:</span>
              <p className="text-slate-400">traceroute to 104.22.8.5 (Nyu-York, AQSh), 30 hops max, 60 byte packets</p>
              {hops.slice(0, currentHop + 1).map((hop, i) => (
                <p key={i} className="text-slate-300">
                  {i + 1}  {hop.name} ({hop.ip}) [{hop.location}]  {hop.latency} ms
                </p>
              ))}
              {currentHop === hops.length - 1 && <p className="text-emerald-400 font-bold mt-2">✓ Yo'nalish muvaffaqiyatli aniqlandi!</p>}
            </div>
          )}
        </div>

        {/* Tor browser simulator check */}
        <div className="lg:col-span-4 bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-300">B. Tor Anonimlik Darajasi</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tor brauzeridan foydalanganda ham 100% xavfsizlik kafolatlanmaydi. Tizimdagi boshqaruv tugmalarini o'zgartirib anonimlik darajasini eng xavfsiz holatga keltiring:
            </p>

            {/* Controls */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Tor tarmog'iga ulanish:</span>
                <button
                  onClick={() => setIsTorActive(!isTorActive)}
                  className={`px-3 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                    isTorActive ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isTorActive ? "YOQILGAN" : "O'CHIRILGAN"}
                </button>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">VPN Tunnel orqali o'tish:</span>
                <button
                  onClick={() => setIsVpnActive(!isVpnActive)}
                  className={`px-3 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                    isVpnActive ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isVpnActive ? "YOQILGAN" : "O'CHIRILGAN"}
                </button>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Veb-sahifada JavaScript:</span>
                <button
                  onClick={() => setIsJsEnabled(!isJsEnabled)}
                  className={`px-3 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                    !isJsEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isJsEnabled ? "YOQILGAN (Xavfli)" : "O'CHIRILGAN (Xavfsiz)"}
                </button>
              </div>
            </div>

            {/* Anonymity Score Bar */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Anonimlik koeffitsienti:</span>
                <span className={`font-bold font-mono ${anonymityScore >= 90 ? 'text-emerald-400' : anonymityScore >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {anonymityScore}% {anonymityScore >= 90 ? "(Xavfsiz)" : anonymityScore >= 50 ? "(O'rtacha)" : "(Hujumga ochiq)"}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    anonymityScore >= 90 ? 'bg-emerald-500' : anonymityScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${anonymityScore}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (isTraceComplete && anonymityScore >= 90) {
                onComplete(100, 500);
              } else {
                showError("Iltimos, avval yo'nalish trassirovkasini yakunlang va anonimlik koeffitsientini kamida 90% holatiga keltiring (Tor + VPN yoqilgan, JS o'chirilgan)!");
              }
            }}
            className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all mt-4 ${
              isTraceComplete && anonymityScore >= 90
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-lg shadow-emerald-600/10'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
            }`}
          >
            Traceroute va anonimlik simulyatsiyasini yakunlash (+500 XP)
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 4. VIRTUAL CRIME SCENE (MODUL 4)
// ==========================================
function VirtualCrimeScene({ onComplete, showError, showSuccess }: { onComplete: (score: number, xpEarned: number) => void; showError: (msg: string) => void; showSuccess: (msg: string) => void }) {
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([
    { id: 'pc', name: 'Gumondor Kompyuteri', description: 'Tizim yoniq holatda, ekran ochiq. Ekrandagi vaqtinchalik yozishmalarni ko\'rish mumkin.', icon: 'desktop', location: 'Stol usti', correctBagIndex: 0, bagged: false },
    { id: 'phone', name: 'Smartfon (Yoniq)', description: 'Android telefon, ekran bloklanmagan. Masofadan tozalab tashlash (wipe) xavfi bor.', icon: 'smartphone', location: 'Divan usti', correctBagIndex: 1, bagged: false },
    { id: 'usb', name: 'Begona USB fleshka', description: 'Qizil rangli sandisk 32GB fleshka, kompyuter portidan chiqarib olingan.', icon: 'usb', location: 'Erda', correctBagIndex: 2, bagged: false }
  ]);
  
  const [activeEvidence, setActiveEvidence] = useState<EvidenceItem | null>(null);
  const [currentBagStep, setCurrentBagStep] = useState(0);
  const [forensicLogs, setForensicLogs] = useState<string[]>([]);
  const [hashText, setHashText] = useState('kiber_dalil_2026.pdf');
  const [customHash, setCustomHash] = useState('');

  const calculateTextHash = (text: string) => {
    setHashText(text);
    if (!text) {
      setCustomHash('');
      return;
    }
    // Simple deterministic hash to look like SHA-256 for educational value
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    setCustomHash(`8f4b00ca32db${hex}f11883ea890e${hex}72a5b06${hex.substring(0,4)}`.substring(0, 64));
  };

  useEffect(() => {
    calculateTextHash('kiber_dalil_2026.pdf');
  }, []);

  const handleInspect = (item: EvidenceItem) => {
    setActiveEvidence(item);
  };

  const handleBagItem = (item: EvidenceItem) => {
    const isProcedureCorrect = verifyEvidenceBagging(item.correctBagIndex, currentBagStep);
    if (!isProcedureCorrect) {
      showError(`XATO PROTSEDURA: ${item.name}ni hozir dalil qopiga joylash mumkin emas! Zudlik bilan protsessual ketma-ketlikni ko'rib chiqing.`);
      setForensicLogs(prev => [...prev, `[XATOLIK] ${item.name}ni noto'g'ri ketma-ketlikda olishga urinildi.`]);
      return;
    }

    const updated = evidenceItems.map(ev => ev.id === item.id ? { ...ev, bagged: true } : ev);
    setEvidenceItems(updated);
    setCurrentBagStep(prev => prev + 1);
    
    let procedureNote = "";
    if (item.id === 'pc') {
      procedureNote = "Kompyuter yoniq holatida birinchi bo'lib operativ xotiradan (RAM dump) nusxa olindi. Shundan so'ng tizim to'g'ri o'chirildi.";
    } else if (item.id === 'phone') {
      procedureNote = "Smartfon blokdan chiqib ketmasligi uchun va masofaviy tozalash xavfi sababli u Faraday qopiga (tarmoqni to'suvchi maxsus qop) joylashtirildi.";
    } else if (item.id === 'usb') {
      procedureNote = "USB disk barmoq izlari shikastlanmaydigan tarzda, burchagidan ushlab, static-elektrga qarshi dalil qopiga muhrlandi.";
    }

    setForensicLogs(prev => [
      ...prev,
      `[MUVAFFAQIYATLI] ${item.name} muhrlandi. ${procedureNote}`
    ]);
    setActiveEvidence(null);
  };

  const isForensicsCompleted = currentBagStep === evidenceItems.length;

  return (
    <div className="space-y-6" id="digital-forensics-sim">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <FileSearch className="w-5 h-5 text-indigo-400 mr-2" /> 4-Simulyator: Virtual Voqea Joyi va Kriminalistik Forensika
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Kiber-jinoyatchi xonasi. Raqamli dalillarni jismonan to'g'ri protsessual tartibda yig'ing, muhrlang va ularning yaxlitlik xeshlarini hisoblang.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Crime Scene Area */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <h4 className="text-sm font-semibold text-slate-300">A. Jinoyat sodir bo'lgan joydagi buyumlar</h4>
            <span className="text-[10px] font-mono text-amber-500">PROTSEDURA BOSQICHI: {currentBagStep} / {evidenceItems.length}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4">
            {evidenceItems.map((item) => (
              <button
                key={item.id}
                disabled={item.bagged}
                onClick={() => handleInspect(item)}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center space-y-3 cursor-pointer ${
                  item.bagged 
                    ? 'bg-slate-900/55 border-slate-850 opacity-40' 
                    : 'bg-slate-900 hover:bg-slate-850 border-slate-800 hover:border-slate-700 hover:scale-102 shadow-md'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                  {item.icon === 'desktop' && <HardDrive className="w-6 h-6 text-indigo-400" />}
                  {item.icon === 'smartphone' && <Smartphone className="w-6 h-6 text-sky-400" />}
                  {item.icon === 'usb' && <Cpu className="w-6 h-6 text-amber-500" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{item.name}</span>
                  <span className="text-[9px] text-slate-400 block mt-1">{item.location}</span>
                </div>
              </button>
            ))}
          </div>

          {activeEvidence && (
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 animate-fade-in">
              <h5 className="text-xs font-bold text-white flex items-center">
                <HelpCircle className="w-4 h-4 text-indigo-400 mr-1.5" /> Dalil inspeksiyasi: {activeEvidence.name}
              </h5>
              <p className="text-xs text-slate-400 leading-normal">{activeEvidence.description}</p>
              
              <div className="flex space-x-2 pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => handleBagItem(activeEvidence)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-md transition-colors cursor-pointer"
                >
                  📥 Evidence Bag-ga muhrlash
                </button>
                <button
                  onClick={() => setActiveEvidence(null)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-755 text-slate-400 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          )}

          {/* Forensics Event log list */}
          <div className="bg-slate-900/40 p-3.5 border border-slate-850 rounded-lg space-y-2">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Ekspertiza amaliyot jurnali:</span>
            <div className="space-y-1 max-h-[120px] overflow-y-auto font-mono text-[10px] text-slate-400">
              {forensicLogs.length === 0 && <p className="text-slate-400">Jurnal bo'sh. Dalillarni tekshirib qopga muhrlang.</p>}
              {forensicLogs.map((log, idx) => (
                <p key={idx} className={log.includes('XATOLIK') ? 'text-red-400' : 'text-emerald-400'}>{log}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Forensic Hash calculator tool */}
        <div className="lg:col-span-4 bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-300">B. Hashing & Yaxlitlik kalkulyatori</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Kiber-sudda olingan raqamli faylning o'zgartirilmaganligini kafolatlash uchun uning SHA-256 xesh summasini hisoblab saqlang:
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="text-slate-400 text-[10px] block mb-1">Hujjat nomi:</label>
                <input
                  type="text"
                  value={hashText}
                  onChange={(e) => calculateTextHash(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block mb-1">Hisoblangan SHA-256 Hash qiymati:</span>
                <div className="bg-slate-900/50 p-2.5 rounded border border-slate-850 font-mono text-[10px] text-emerald-400 break-all">
                  {customHash || "-"}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (isForensicsCompleted) {
                onComplete(100, 500);
              } else {
                showError("Iltimos, avval barcha raqamli dalillarni (Kompyuter, Smartfon, USB) to'g'ri tartibda yig'ing va qoplarga joylang!");
              }
            }}
            className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all mt-4 ${
              isForensicsCompleted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
            }`}
          >
            Forensika dalil yig'ish simulyatsiyasini yakunlash (+500 Reyting balli)
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 5. KIBER-SUD SIMULATOR (MODUL 5)
// ==========================================
function KiberSudSimulator({ onComplete, showError, showSuccess }: { onComplete: (score: number, xpEarned: number) => void; showError: (msg: string) => void; showSuccess: (msg: string) => void }) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState('');
  const [selectedVerdict, setSelectedVerdict] = useState('');
  const [protocolDrafted, setProtocolDrafted] = useState(false);
  const [verdictFeedback, setVerdictFeedback] = useState<string | null>(null);

  const cases = [
    {
      title: "1-Keys: Maktab elektron kundaligini buzish",
      description: "Toshkent shahridagi maktab o'quvchisi ruxsatsiz o'qituvchining login parolini ijtimoiy muhandislik orqali topib tizimga kirgan va barcha sinf choraklik baholarini o'zgartirgan.",
      evidence: "SHA-256 xeshli ma'lumotlar bazasi loglari, o'qituvchi kompyuteridan topilgan phishing sessiyasi izlari.",
      articles: [
        { id: 'modifikatsiya', code: "Kompyuter axborotini modifikatsiyalashtirish (Ruxsatsiz baholarni o'zgartirish)", correct: true },
        { id: 'zarar', code: "Zarar keltiruvchi dasturlarni (virus, troyan) yaratish/tarqatish", correct: false },
        { id: 'tovlamachilik', code: "Tovlamachilik (Kiber-tahdid orqali talab qilish)", correct: false }
      ],
      verdicts: [
        "A. Jinoyat Kodeksining maxsus bobi (Axborot texnologiyalari sohasidagi jinoyatlar) bo'yicha jinoiy javobgarlik choralari qo'llaniladi",
        "B. Faqat ma'muriy jarima qo'llash",
        "C. Jinoiy javobgarlikka tortmasdan maktab ma'muriy jazo qo'llash"
      ],
      correctVerdictIdx: 0,
      verdictDetail: "Baholarni ruxsatsiz o'zgartirish kompyuter axborotini modifikatsiyalashtirish sifatida baholanadi hamda Jinoyat Kodeksining maxsus bobi bo'yicha tegishli jinoiy javobgarlikni keltirib chiqaradi."
    },
    {
      title: "2-Keys: Bankka Ransomware troyan dasturi hujumi",
      description: "Xalqaro kiber-jinoyatchi mahalliy bank elektron hisobchisiga fishing xat orqali troyan (ransomware) dasturini jo'natgan. Dastur bank serveridagi barcha fayllarni shifrlab, pul talab qilmoqda.",
      evidence: "Zararli kod namunasi .exe fali, Bitcoin hamyon manzili, fishing xat sarlavhasi logi.",
      articles: [
        { id: 'ruxsatsiz', code: "Kompyuter axborotidan oddiy ruxsatsiz foydalanish", correct: false },
        { id: 'zarar_tovlamachilik', code: "Zarar keltiruvchi dasturlarni tarqatish va Tovlamachilik (kombinatsiyalashgan kiber-jinoyat)", correct: true },
        { id: 'sabotaj', code: "Kompyuter sabotaji (Tizimlarni ishdan chiqarish)", correct: false }
      ],
      verdicts: [
        "A. Faqat ma'muriy jarima solish",
        "B. Jinoyat Kodeksining kiber-jinoyatlar va tovlamachilikka oid moddalar yig'indisi bo'yicha jinoiy javobgarlik choralari qo'llaniladi",
        "C. Jinoyatchini ogohlantirish va fayllarni qaytarib berishni so'rash"
      ],
      correctVerdictIdx: 1,
      verdictDetail: "Zarar yetkazuvchi dasturlardan foydalanish va moddiy foyda talab qilish og'ir jinoyat bo'lib, kiber-jinoyatlar hamda tovlamachilik moddalari yig'indisi bo'yicha jinoiy javobgarlikka sabab bo'ladi."
    }
  ];

  const handleApplyVerdict = () => {
    const currentCase = cases[activeCaseIndex];
    const correctArtId = currentCase.articles.find(a => a.correct)?.id || '';
    const correctVerdictText = currentCase.verdicts[currentCase.correctVerdictIdx];
    
    const isVerdictCorrect = verifyKiberSudVerdict({
      selectedArticle,
      selectedVerdict,
      correctArticle: correctArtId,
      correctVerdict: correctVerdictText
    });

    if (isVerdictCorrect) {
      setVerdictFeedback("TO'G'RI SUD HUKMI! Siz O'zbekiston Respublikasi Jinoyat Kodeksining tegishli bandlarini va javobgarlik choralarni mukammal aniqladingiz. Dalillarga asoslangan protsessual bayonnoma to'g'ri tuzildi.");
    } else {
      setVerdictFeedback(`HUKMDA XATOLIK BOR. To'g'ri tasniflash: ${currentCase.articles.find(a => a.correct)?.code}. Iltimos, qaytadan tahlil qiling.`);
    }
    setProtocolDrafted(true);
  };

  const handleNextCase = () => {
    setSelectedArticle('');
    setSelectedVerdict('');
    setProtocolDrafted(false);
    setVerdictFeedback(null);
    setActiveCaseIndex(prev => prev + 1);
  };

  const isSudFinished = activeCaseIndex >= cases.length;

  return (
    <div className="space-y-6" id="kiber-sud-sim">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Gavel className="w-5 h-5 text-indigo-400 mr-2" /> 5-Simulyator: 'Kiber-Sud' Amaliy Sudya Simulyatsiyasi
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Kiber-prokuror yoki kiber-sudya sifatida real jinoyat materiallarini o'rganing, Jinoyat Kodeksidan to'g'ri ayblov moddasini belgilang va sud bayonnomasini rasmiylashtiring.
        </p>
      </div>

      {!isSudFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Case Details */}
          <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>KEYS {activeCaseIndex + 1} / {cases.length}</span>
              <span className="text-indigo-400 font-bold uppercase">Sud Tergovi Bosqichi</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-sans">{cases[activeCaseIndex].title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded border border-slate-850">
                {cases[activeCaseIndex].description}
              </p>
              <div className="p-3 bg-red-950/15 border border-red-900/20 rounded text-[11px] text-red-300">
                <strong>Tekshirilgan dalillar:</strong> {cases[activeCaseIndex].evidence}
              </div>
            </div>

            {/* Verdict selectors */}
            <div className="space-y-3 pt-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1.5">1. JK tegishli moddasi bilan ayblov:</label>
                <div className="space-y-1.5">
                  {cases[activeCaseIndex].articles.map((art) => (
                    <label key={art.id} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-900 text-xs text-slate-300 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="article"
                        value={art.id}
                        checked={selectedArticle === art.id}
                        onChange={() => setSelectedArticle(art.id)}
                        className="rounded"
                      />
                      <span>{art.code}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="text-xs font-bold text-slate-400 block mb-1.5">2. Belgilanadigan qonuniy jazo yoki sanksiya:</label>
                <div className="space-y-1.5">
                  {cases[activeCaseIndex].verdicts.map((verd, idx) => (
                    <label key={idx} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-900 text-xs text-slate-300 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="verdict"
                        value={verd}
                        checked={selectedVerdict === verd}
                        onChange={() => setSelectedVerdict(verd)}
                        className="rounded"
                      />
                      <span>{verd}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {verdictFeedback && (
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1.5 animate-fade-in">
                <span className={`font-bold block ${verdictFeedback.includes("TO'G'RI") ? 'text-emerald-400' : 'text-red-400'}`}>
                  {verdictFeedback.includes("TO'G'RI") ? "✓ HUKM TASDIQLANDI" : "✗ HUKMDA XATOLIK"}
                </span>
                <p className="text-slate-300 leading-relaxed">{verdictFeedback}</p>
                <p className="text-slate-400 text-[11px] font-sans italic border-t border-slate-800 pt-1.5 mt-1.5">{cases[activeCaseIndex].verdictDetail}</p>
              </div>
            )}

            {!protocolDrafted ? (
              <button
                disabled={!selectedArticle || !selectedVerdict}
                onClick={handleApplyVerdict}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                ⚖️ Hukmni Tasdiqlash va Bayonnomani Chiqarish
              </button>
            ) : (
              <button
                onClick={handleNextCase}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all cursor-pointer"
              >
                Keyingi keysni tahlil qilish →
              </button>
            )}
          </div>

          {/* Legal references info panel */}
          <div className="lg:col-span-4 bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Normativ Ma'lumotnoma</h4>
              <div className="space-y-3 text-[11px] text-slate-400 leading-normal">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-850">
                  <span className="font-bold text-slate-200 block mb-1">Kompyuter axborotidan ruxsatsiz foydalanish:</span>
                  Tizim yoki tarmoqlarga ruxsatsiz ulanish va ma'lumot olish. Jinoyat Kodeksining tegishli bobida jinoiy javobgarlik belgilangan.
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-850">
                  <span className="font-bold text-slate-200 block mb-1">Zarar keltiruvchi dasturlar:</span>
                  Viruslar, troyanlar va ransomware yaratish, ishlatish yoki tarqatish qilmishi bo'yicha jinoiy javobgarlik choralari ko'riladi.
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-850">
                  <span className="font-bold text-slate-200 block mb-1">Kiber-tahdid va Tovlamachilik:</span>
                  Tizim yoki fayllarni shifrlab pul talab qilish harakatlari qonun bo'yicha qat'iy jinoiy javobgarlikka sabab bo'ladi.
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                showSuccess("IIB Kiber-Sud Bayonnomasi namunasi (Download_Template.docx) muvaffaqiyatli yuklab olindi.");
              }}
              className="mt-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center space-x-1.5 w-full"
            >
              <Download className="w-4 h-4" />
              <span>Bayonnoma namunasini yuklab olish (.docx)</span>
            </button>
          </div>

        </div>
      ) : (
        /* Completed court simulations */
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h4 className="text-lg font-bold text-white">Kiber-Sud tergov ishlari yakunlandi!</h4>
          <p className="text-xs text-slate-400">
            Siz barcha 2 ta jinoiy ish keyslarini o'rganib chiqdingiz, qonun moddalarini to'g'ri bog'ladingiz va rasmiy hukmlarni tasdiqladingiz.
          </p>
          <button
            onClick={() => onComplete(100, 500)}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Modul natijasini yuborish (+500 XP)
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. DIGITAL FOOTPRINT HUNTER (MODUL 6)
// ==========================================
function DigitalFootprintHunter({ onComplete, showError, showSuccess }: { onComplete: (score: number, xpEarned: number) => void; showError: (msg: string) => void; showSuccess: (msg: string) => void }) {
  const [username, setUsername] = useState('');
  const [profileFound, setProfileFound] = useState(false);
  const [selectedCoord, setSelectedCoord] = useState<{ r: number; c: number } | null>(null);
  const [gameStep, setGameStep] = useState(0); // 0: username, 1: geo search, 2: complete
  const [geoResolved, setGeoResolved] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Grid size for mock geographic map coordinate finder
  const rows = 5;
  const cols = 5;
  
  // Teleminorasi coordinate trigger index (Row 2, Col 3 - 0-indexed)
  const targetRow = 1;
  const targetCol = 3;

  const resetOsintSim = useCallback(() => {
    setUsername('');
    setProfileFound(false);
    setSelectedCoord(null);
    setGeoResolved(false);
    setIsScanning(false);
    setGameStep(0);
  }, []);

  const handleSweepUsername = () => {
    if (isScanning) return;
    const normalized = username.toLowerCase().trim();
    if (!normalized) {
      showError("Username bo'sh bo'lishi mumkin emas. Jinoyatchi taxallusini kiriting.");
      return;
    }
    setIsScanning(true);
    if (normalized === 'mr_shadow_uz' || normalized === 'mr_shadow') {
      setProfileFound(true);
      showSuccess("OSINT skanerlash muvaffaqiyatli: mr_shadow_uz profillari aniqlandi.");
    } else {
      setProfileFound(false);
      showError("Xato username! Dars materialidagidek, jinoyatchi taxallusi: 'mr_shadow_uz' yoki 'mr_shadow' bo'lishi lozim.");
    }
    setIsScanning(false);
  };

  const proceedToGeoStep = () => {
    if (gameStep !== 0 || !profileFound) return;
    setGameStep(1);
    setSelectedCoord(null);
    setGeoResolved(false);
  };

  const handleGridClick = (r: number, c: number) => {
    if (gameStep !== 1) return;
    setSelectedCoord({ r, c });
    const { success } = calculateGeoguessScore(r, c, targetRow, targetCol);
    setGeoResolved(success);
  };

  const proceedToFinalStep = () => {
    if (gameStep !== 1 || !geoResolved) return;
    setGameStep(2);
  };

  return (
    <div className="space-y-6" id="osint-footprint-sim">
      <div className="border-b border-slate-800 pb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center">
            <MapPin className="w-5 h-5 text-indigo-400 mr-2" /> 6-Simulyator: 'Digital Footprint' va Geolocation (OSINT)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Ochiq manbalardan qidiruv amaliyoti. Jinoyatchi nikneymi orqali uning izlarini toping va yuklagan rasmidagi vizual belgilar orqali geolokatsiyasini xaritada aniqlang.
          </p>
        </div>
        {gameStep > 0 && (
          <button
            onClick={resetOsintSim}
            className="shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Qayta urinish</span>
          </button>
        )}
      </div>

      {gameStep === 0 && (
        /* Step 1: Username footprint analyzer */
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>BOSQICH 1: USERNAME SWEEP</span>
            <span className="text-indigo-300">Sherlock Analyzer</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Sizga tergov doirasida jinoyatchining taxallusi qisman ma'lum: <strong>'mr_shadow_uz'</strong>. Ushbu taxallusni Sherlock OSINT tizimiga yuboring va uning izlarini toping.
          </p>

          <div className="flex space-x-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username kiriting..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
            />
            <button
              onClick={handleSweepUsername}
              disabled={isScanning}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded transition-all cursor-pointer disabled:opacity-50"
            >
              {isScanning ? 'Skanerlanmoqda...' : 'Username bo\'yicha OSINT skanerlash'}
            </button>
          </div>

          {profileFound && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 border border-emerald-500/30 rounded-lg space-y-1.5 font-mono text-[10px] text-emerald-300 animate-fade-in">
                <p className="font-bold">✓ SCANNING DONE. PROFILES IDENTIFIED:</p>
                <p>• GitHub: github.com/mr_shadow_uz (Status: Active. Project: bot_config)</p>
                <p>• Instagram: instagram.com/mr_shadow_uz (Status: 1 image uploaded)</p>
                <p>• Telegram ID: @mr_shadow_uz (Status: Joined group 'Kiber_Bozor')</p>
                <p className="text-amber-300 mt-2 block">Instagramdan yuklangan shubhali rasm aniqlandi. Geolokatsiya bosqichiga o'tish uchun tasdiqlang.</p>
              </div>
              <button
                onClick={proceedToGeoStep}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
                <span>2-bosqich: Geolokatsiyaga o'tish</span>
              </button>
            </div>
          )}
        </div>
      )}

      {gameStep === 1 && (
        /* Step 2: Geolocation photo search */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Mock suspect photo view */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Instagramdan olingan rasm</h4>
            <div className="aspect-video bg-slate-900 border border-slate-850 rounded-lg relative overflow-hidden flex flex-col justify-center items-center text-center p-4">
              {/* Teleminora graphic vector representation */}
              <div className="w-1.5 h-20 bg-slate-700 relative">
                <div className="absolute top-4 -inset-x-2 h-4 rounded-full bg-slate-600 border border-slate-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                </div>
              </div>
              <p className="text-[11px] text-indigo-300 font-bold mt-3">Vizual belgilar: Toshkent Teleminorasi (Tashkent TV Tower)</p>
              <p className="text-[10px] text-slate-400 italic">Rasm orqasidagi arxitekturaga qarab, u qaysi zonada tushirilganligini o'ng tomondagi xaritada belgilang.</p>
            </div>

            <div className="bg-slate-900/40 p-3 rounded text-[11px] text-slate-400 space-y-1">
              <strong>EXIF GPS tahlili:</strong> Rasm metama'lumotlari yuklanganda tozalangan, ammo fondagi bino Toshkent Teleminorasi ekanligi aniq. Teleminora joylashgan Yunusobod tumani koordinatalarini topish zarur.
            </div>
          </div>

          {/* Interactive Map Grid */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Yunusobod Tumani (Toshkent xaritasi)</h4>
            <div className="grid grid-cols-5 gap-1.5 bg-slate-900 p-3 rounded-lg border border-slate-850">
              {Array.from({ length: rows }).map((_, r) => (
                <div key={r} className="contents">
                  {Array.from({ length: cols }).map((_, c) => {
                    const isSelected = selectedCoord?.r === r && selectedCoord?.c === c;
                    const isCorrect = r === targetRow && c === targetCol;
                    return (
                      <button
                        key={c}
                        onClick={() => handleGridClick(r, c)}
                        className={`aspect-square rounded border font-mono text-[9px] flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected 
                            ? isCorrect 
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold' 
                              : 'bg-red-500/20 border-red-500 text-red-400'
                            : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {r + 41}°N
                        <span className="text-[8px] text-slate-400">{c + 69}°E</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {selectedCoord && (
              <div className="space-y-3">
                <div className="text-xs p-2 bg-slate-900 rounded border border-slate-800 text-center font-mono">
                  {geoResolved ? (
                    <span className="text-emerald-300 font-bold">✓ TO'G'RI! Teleminora koordinatalari (41°N, 72°E) Yunusobod bo'yicha fosh bo'ldi.</span>
                  ) : (
                    <span className="text-red-300">✗ Bu zonada Teleminora ko'rinmaydi. Yunusobod tumanini (Katta ko'cha yaqinini) qidiring.</span>
                  )}
                </div>
                {geoResolved && (
                  <button
                    onClick={proceedToFinalStep}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Geolokatsiya tasdiqlandi — yakuniy natijaga o'tish</span>
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {gameStep === 2 && (
        /* Complete results */
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h4 className="text-lg font-bold text-white">OSINT Skanerlash Muvaffaqiyatli Tamomlandi!</h4>
          <p className="text-xs text-slate-400">
            Siz mr_shadow_uz taxallusini va uning joylashgan koordinatalarini Toshkent Teleminorasi yaqinidagi nuqtadan muvaffaqiyatli aniqladingiz!
          </p>
          <button
            onClick={() => onComplete(100, 600)}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Modul natijasini yuborish (+600 XP)
          </button>
        </div>
      )}
    </div>
  );
}
