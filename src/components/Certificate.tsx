import React, { useMemo, useState } from 'react';
import { Award, Printer, Calendar, User, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import iibLogo from './iib.jpg';
import certQrCode from './certificate_qr.png';
import { validateFullName } from '../utils/cyberUtils';
import { useLanguage } from '../i18n/LanguageContext';

interface CertificateProps {
  fullName?: string;
  defaultName?: string;
  completedDate?: string;
  onNameChange?: (name: string) => void;
  onDateChange?: (date: string) => void;
  onBackToCourse?: () => void;
}

export default function Certificate({
  fullName: initialFullName = '',
  defaultName = '',
  completedDate: initialDate = '',
  onNameChange,
  onDateChange,
  onBackToCourse,
}: CertificateProps) {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState(initialFullName || defaultName);
  const [isGenerating, setIsGenerating] = useState(false);

  const [completedDate, setCompletedDate] = useState(() => {
    if (initialDate && initialDate.trim()) return initialDate;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    if (onDateChange) {
      onDateChange(dateStr);
    }
    return dateStr;
  });

  const handleDateChange = (val: string) => {
    setCompletedDate(val);
    if (onDateChange) {
      onDateChange(val);
    }
  };

  const displayDate = useMemo(() => {
    if (!completedDate) return '';
    const parts = completedDate.split('-');
    if (parts.length === 3) return `${parts[2]}.${parts[1]}.${parts[0]}`;
    return completedDate;
  }, [completedDate]);

  const handleNameChange = (val: string) => {
    setFullName(val);
    if (onNameChange) {
      onNameChange(val);
    }
  };

  const validation = useMemo(() => {
    return validateFullName(fullName);
  }, [fullName]);

  const isReady = validation.isValid;

  const handleDownloadPNG = async () => {
    if (!isReady || isGenerating) return;
    setIsGenerating(true);
    try {
      const certElem = document.getElementById('official-iib-certificate');
      if (!certElem) throw new Error('Sertifikat elementi topilmadi');

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(certElem, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0,
      });

      const imageURI = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Sertifikat_${fullName.trim().replace(/\s+/g, '_')}.png`;
      link.href = imageURI;
      link.click();
    } catch (err) {
      console.error('Sertifikat generatsiyasida xatolik:', err);
      alert('Sertifikatni yuklab olishda xatolik yuz berdi. Iltimos qayta urinib ko‘ring.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">

      {/* Top Action Toolbar (Print-Hidden) */}
      <div className="bg-[#091124]/90 border border-slate-800/80 p-5 sm:p-6 rounded-3xl text-white shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t('certificate')}
            </h2>
            <p className="text-xs text-slate-400">
              {t('certVerified')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={handleDownloadPNG}
            disabled={!isReady || isGenerating}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-lg ${
              isReady && !isGenerating
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Tayyorlanmoqda...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{t('downloadPng')}</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            disabled={!isReady || isGenerating}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer border ${
              isReady && !isGenerating
                ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 active:scale-95'
                : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>{t('printCert')}</span>
          </button>
        </div>
      </div>

      {/* Interactive Live Input Bar (Print-Hidden) */}
      <div className="bg-[#091124]/90 border border-slate-800/80 p-5 rounded-2xl text-white shadow-lg space-y-3 print:hidden">
        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
          <User className="w-4 h-4 text-indigo-400" />
          <span>{t('fullNameHeading')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <input
              type="text"
              value={fullName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Masalan: Toshpulatov Behruz Alisherovich"
              className="w-full bg-[#050b18] border border-slate-700 focus:border-amber-400 text-white font-bold px-4 py-2.5 text-sm rounded-xl focus:outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-4 relative">
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="date"
                value={completedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full bg-[#050b18] border border-slate-700 focus:border-amber-400 text-white font-bold pl-10 pr-3 py-2.5 text-xs rounded-xl focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {!validation.isValid && (
          <p className="text-xs text-rose-400 font-medium">
            {validation.error}
          </p>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          OFFICIAL HIGH-PRECISION CERTIFICATE CANVAS
          Aspect Ratio: 1.414:1 (A4 Landscape Standard)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="w-full overflow-x-auto flex justify-center py-2">
        <div
          id="official-iib-certificate"
          style={{
            width: '100%',
            maxWidth: '920px',
            aspectRatio: '1.414 / 1',
            position: 'relative',
            background: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.45)',
            userSelect: 'none',
            boxSizing: 'border-box',
          }}
        >
          {/* Base Background */}
          <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />

          {/* Concentric Decorative Blue Waves (Left) */}
          <div style={{
            position: 'absolute',
            left: '-18%',
            top: '-30%',
            width: '62%',
            height: '130%',
            background: 'linear-gradient(160deg, #60a5fa 0%, #2563eb 30%, #1e3a8a 70%, #172554 100%)',
            borderRadius: '50% 60% 55% 45% / 50% 50% 70% 50%',
            opacity: 0.92,
            transform: 'rotate(-8deg)',
          }} />

          <div style={{
            position: 'absolute',
            left: '-25%',
            top: '25%',
            width: '58%',
            height: '90%',
            background: 'linear-gradient(150deg, #93c5fd 0%, #3b82f6 40%, #1e3a8a 100%)',
            borderRadius: '45% 55% 60% 40% / 55% 45% 65% 35%',
            opacity: 0.75,
            transform: 'rotate(5deg)',
          }} />

          <div style={{
            position: 'absolute',
            left: '-8%',
            top: '55%',
            width: '38%',
            height: '70%',
            background: 'linear-gradient(130deg, #2563eb 0%, #1e3a8a 60%, #0b132b 100%)',
            borderRadius: '40% 60% 55% 45% / 50% 60% 40% 50%',
            opacity: 0.88,
            transform: 'rotate(-3deg)',
          }} />

          {/* Top-Right Soft Wave */}
          <div style={{
            position: 'absolute',
            right: '-30%',
            top: '-20%',
            width: '70%',
            height: '70%',
            background: 'linear-gradient(200deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
            borderRadius: '50% 50% 50% 60% / 40% 60% 40% 60%',
            opacity: 0.5,
            transform: 'rotate(15deg)',
          }} />

          {/* Main Certificate Content Area */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: '26%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3% 5% 3% 2%',
            zIndex: 10,
          }}>

            {/* TOP EMBLEM (Original IIB Gerbi - Slightly Enlarged) & 2-LINE TITLE */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              zIndex: 10,
            }}>
              <div style={{
                width: 'clamp(54px, 8.8vw, 86px)',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
                border: '2.5px solid #1e3a8a',
                background: '#ffffff',
                marginBottom: '1.5%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={iibLogo}
                  alt="IIB Gerbi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(8px, 1.3vw, 13px)',
                color: '#1e3a8a',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.35,
              }}>
                {t('certOrgTitle')}<br />
                {t('certDeptTitle')}
              </p>
            </div>

            {/* SERTIFIKAT TITLE */}
            <div style={{
              width: '100%',
              textAlign: 'center',
              marginTop: '3%',
              zIndex: 10,
            }}>
              <h1 style={{
                fontFamily: "'Arial Black', 'Arial', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(26px, 5.5vw, 50px)',
                color: '#1e3a8a',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1,
              }}>
                {t('certMainTitle')}
              </h1>
              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(7.5px, 1.2vw, 12px)',
                color: '#2563eb',
                letterSpacing: '0.12em',
                marginTop: '1%',
                textTransform: 'uppercase',
                margin: '6px 0 0 0',
              }}>
                {t('courseTitle')}
              </p>
            </div>

            {/* USHBU SERTIFIKAT TOPSHIRILADI */}
            <p style={{
              fontFamily: "'Arial', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(6.5px, 1vw, 10px)',
              color: '#334155',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '4%',
              marginBottom: 0,
              zIndex: 10,
            }}>
              {t('certAwardedTo')}
            </p>

            {/* RECIPIENT NAME */}
            <div style={{
              width: '84%',
              marginTop: '1.5%',
              zIndex: 10,
              textAlign: 'left',
              paddingLeft: '2%',
            }}>
              <h2 style={{
                fontFamily: "'Arial Black', 'Arial', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(11px, 2.6vw, 25px)',
                color: '#0f172a',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.2,
                wordBreak: 'break-word',
                minHeight: 'clamp(14px, 3vw, 30px)',
              }}>
                {fullName || (
                  <span style={{ opacity: 0.2, fontStyle: 'italic', fontWeight: 400, fontSize: '0.85em' }}>
                    [F.I.Sh Maydoni]
                  </span>
                )}
              </h2>
            </div>

            {/* Divider line (Blue to Gold) */}
            <div style={{
              width: '84%',
              height: '3px',
              background: 'linear-gradient(90deg, #1e3a8a 0%, #1e3a8a 75%, #d97706 75%, #d97706 100%)',
              marginTop: '1.5%',
              zIndex: 10,
              alignSelf: 'center',
              marginLeft: '2%',
            }} />

            {/* Course completion text */}
            <p style={{
              fontFamily: "'Arial', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(7.5px, 1.4vw, 13.5px)',
              color: '#0f172a',
              letterSpacing: '0.02em',
              marginTop: '3%',
              zIndex: 10,
              textAlign: 'center',
              width: '70%',
              lineHeight: 1.4,
            }}>
              {t('certReason')}
            </p>

          </div>

          {/* OFFICIAL HIGH-RESOLUTION QR CODE (Bottom-Right) */}
          <div style={{
            position: 'absolute',
            bottom: '6%',
            right: '5%',
            width: '12.5%',
            maxWidth: '110px',
            aspectRatio: '1 / 1',
            zIndex: 10,
            background: '#ffffff',
            padding: '1%',
            borderRadius: '10px',
            border: '2px solid #cbd5e1',
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={certQrCode}
              alt="Rasmiy Sertifikat QR Kodingiz"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* Date (Bottom-Left on Blue Wave) */}
          {displayDate && (
            <div style={{
              position: 'absolute',
              bottom: '7%',
              left: '3.5%',
              zIndex: 10,
            }}>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                fontSize: 'clamp(5px, 0.85vw, 8.5px)',
                color: '#1e3a8a',
                letterSpacing: '0.05em',
                background: 'rgba(255,255,255,0.7)',
                padding: '2px 5px',
                borderRadius: '3px',
              }}>
                {t('certDate')}: {displayDate}
              </span>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
