import React, { useMemo, useState } from 'react';
import { Award, Printer, Calendar, User, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import iibLogo from './iib.jpg';
import { validateFullName } from '../utils/cyberUtils';
import { useLanguage } from '../i18n/LanguageContext';

interface CertificateProps {
  fullName?: string;
  defaultName?: string;
  completedDate?: string;
  onNameChange?: (name: string) => void;
  onBackToCourse?: () => void;
}

export default function Certificate({
  fullName: initialFullName = '',
  defaultName = '',
  completedDate: initialDate,
  onNameChange,
  onBackToCourse,
}: CertificateProps) {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState(initialFullName || defaultName);
  const [isGenerating, setIsGenerating] = useState(false);

  const [completedDate, setCompletedDate] = useState(() => {
    if (initialDate) return initialDate;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

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
      if (!certElem) return;

      const canvas = await html2canvas(certElem, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0,
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const sanitizedName = fullName.trim().toLowerCase().replace(/[^a-z0-9ʻ'-]/gi, '_');
      const filename = `sertifikat-${sanitizedName || 'iib'}.png`;

      const link = document.createElement('a');
      link.href = image;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('PNG generatsiyasida xatolik:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6" id="certificate-view-container">

      {/* ── Editor Panel (hidden in print) ── */}
      <div className="bg-[#091124]/90 border border-slate-800/80 p-5 shadow-xl space-y-4 print:hidden rounded-3xl backdrop-blur-xl">
        <div className="flex items-center space-x-3 border-b border-slate-800/60 pb-3">
          <div className="w-8 h-8 bg-amber-500 flex items-center justify-center rounded-xl text-slate-950 font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              {t('certificate')}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {t('verifyCertName')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1 flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t('fullNameInputLabel')} *</span>
            </label>
            <input
              id="cert-name-input"
              type="text"
              value={fullName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 p-2.5 text-sm font-semibold text-white focus:outline-none rounded-xl transition-colors"
              placeholder={t('fullNamePlaceholder')}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t('certDate')}:</span>
            </label>
            <input
              id="cert-date-input"
              type="date"
              value={completedDate}
              onChange={(e) => setCompletedDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 p-2.5 text-sm font-semibold text-white focus:outline-none rounded-xl transition-colors"
            />
          </div>
        </div>

        {!isReady && (
          <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5">
            <span className="text-amber-300 text-xs font-semibold">
              ⚠ {t('nameValidationRule')}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-end pt-1">
          <button
            onClick={handleDownloadPNG}
            disabled={!isReady || isGenerating}
            id="btn-download-png-certificate"
            className={`px-5 py-2.5 font-bold text-xs flex items-center space-x-2 rounded-xl transition-all uppercase tracking-wider ${
              isReady && !isGenerating
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
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
            onClick={() => window.print()}
            disabled={!isReady}
            id="btn-print-certificate"
            className={`px-5 py-2.5 font-bold text-xs flex items-center space-x-2 rounded-xl transition-all uppercase tracking-wider ${
              isReady
                ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-md cursor-pointer'
                : 'bg-slate-900 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>{t('printCert')}</span>
          </button>
        </div>
      </div>

      {/* ── Official High-DPI Certificate Render Container ── */}
      <div className="w-full flex justify-center overflow-x-auto py-2">
        <div
          id="official-iib-certificate"
          style={{
            width: '100%',
            maxWidth: '960px',
            minWidth: '680px',
            aspectRatio: '16 / 10.5',
            backgroundColor: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            borderRadius: '4px',
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

            {/* TOP EMBLEM & 2-LINE TITLE */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              zIndex: 10,
            }}>
              <div style={{
                width: 'clamp(44px, 7.2vw, 68px)',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 3px 12px rgba(0,0,0,0.18)',
                border: '2px solid #1e3a8a',
                background: '#ffffff',
                marginBottom: '1.5%',
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
                fontSize: 'clamp(7.5px, 1.2vw, 12px)',
                color: '#1e3a8a',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.3,
              }}>
                {t('iibTitle')}<br />
                {t('departmentTitle')}
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

          {/* Clean Gold Medal Graphic */}
          <div style={{
            position: 'absolute',
            bottom: '7%',
            right: '5%',
            width: '12%',
            aspectRatio: '1 / 1',
            zIndex: 10,
          }}>
            <svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <polygon points="43,80 47,98 50,88 53,98 57,80" fill="#d97706" />
              <circle cx="50" cy="48" r="42" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
              <circle cx="50" cy="48" r="34" fill="#f59e0b" stroke="#fffbeb" strokeWidth="1.5" />
              <circle cx="50" cy="48" r="28" fill="#ffffff" />
              <polygon
                points="50,28 53.5,39 65,39 55.5,46 59,57 50,50 41,57 44.5,46 35,39 46.5,39"
                fill="#d97706"
              />
            </svg>
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
                display: 'block',
                opacity: 0.85,
              }}>
                {t('certDate')}: {displayDate}
              </span>
            </div>
          )}

        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #official-iib-certificate,
          #official-iib-certificate * { visibility: visible !important; }
          #official-iib-certificate {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            min-width: unset !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            aspect-ratio: auto !important;
          }
        }
      `}</style>

    </div>
  );
}
