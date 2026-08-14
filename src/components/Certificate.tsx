import React, { useMemo, useState } from 'react';
import { Award, Printer, Calendar, User, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import iibLogo from './iib.jpg';

interface CertificateProps {
  defaultName?: string;
  onNameChange?: (name: string) => void;
}

export default function Certificate({
  defaultName = '',
  onNameChange,
}: CertificateProps) {
  const [fullName, setFullName] = useState(defaultName);
  const [isGenerating, setIsGenerating] = useState(false);

  const [completedDate, setCompletedDate] = useState(() => {
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

  const isReady = useMemo(() => {
    const trimmed = fullName.trim();
    const words = trimmed.split(/\s+/);
    return words.length >= 2 && trimmed.length >= 5;
  }, [fullName]);

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
      <div className="bg-white border-2 border-slate-800 p-5 shadow-md space-y-4 print:hidden">
        <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
          <div className="w-8 h-8 bg-amber-500 flex items-center justify-center rounded">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Sertifikat Ma'lumotlarini Kiritish
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Ism va sharifingizni to'g'ri kiriting, so'ng sertifikatni yuklab oling yoki chop eting
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>F.I.Sh (Ismi Sharifingiz): *</span>
            </label>
            <input
              id="cert-name-input"
              type="text"
              value={fullName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-300 focus:border-indigo-500 p-2.5 text-sm font-bold text-slate-900 focus:outline-none rounded transition-colors"
              placeholder="Masalan: Toshpulatov Behruz Alisherovich"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Tugatilgan sana:</span>
            </label>
            <input
              id="cert-date-input"
              type="date"
              value={completedDate}
              onChange={(e) => setCompletedDate(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-300 focus:border-indigo-500 p-2.5 text-sm font-bold text-slate-900 focus:outline-none rounded transition-colors"
            />
          </div>
        </div>

        {!isReady && (
          <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded p-2.5">
            <span className="text-amber-700 text-xs font-bold">
              ⚠ Sertifikatni shakllantirish uchun to'liq F.I.Sh (kamida Ismi va Familiyasi) kiritilishi shart!
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-end pt-1">
          <button
            onClick={handleDownloadPNG}
            disabled={!isReady || isGenerating}
            id="btn-download-png-certificate"
            className={`px-5 py-3 font-bold text-xs flex items-center space-x-2 rounded-lg transition-all border-2 uppercase tracking-wider ${
              isReady && !isGenerating
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-lg active:translate-y-px cursor-pointer'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
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
                <span>PNG Rasm Sifatida Yuklab Olish</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            disabled={!isReady}
            id="btn-print-certificate"
            className={`px-5 py-3 font-bold text-xs flex items-center space-x-2 rounded-lg transition-all border-2 uppercase tracking-wider ${
              isReady
                ? 'bg-slate-900 hover:bg-slate-700 text-white border-slate-900 shadow-lg active:translate-y-px cursor-pointer'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>PDF Saqlash (Chop etish)</span>
          </button>
        </div>
      </div>

      {/* ── CERTIFICATE BODY (Pure HTML/CSS layout) ── */}
      <div className="flex justify-center w-full pb-4 overflow-x-auto" id="cert-scroll-wrapper">
        <div
          id="official-iib-certificate"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '860px',
            minWidth: '660px',
            aspectRatio: '1.414 / 1',
            background: '#ffffff',
            overflow: 'hidden',
            fontFamily: "'Arial', sans-serif",
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          }}
        >
          {/* Base Background */}
          <div style={{ position: 'absolute', inset: 0, background: '#fff' }} />

          {/* Decorative Waves (Updated to IIB Officer Navy & Gold Palette) */}
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

          {/* CONTENT LAYER */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

            {/* TOP SECTION: IIB Logo + Org Name */}
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '5%',
              zIndex: 10,
            }}>
              <div style={{
                width: '13%',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(30,58,138,0.25)',
                boxShadow: '0 2px 12px rgba(30,58,138,0.25)',
                flexShrink: 0,
              }}>
                <img
                  src={iibLogo}
                  alt="IIB Gerbi"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(5px, 1.1vw, 11px)',
                color: '#172554',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '1.2%',
                textAlign: 'center',
                lineHeight: 1.4,
              }}>
                O'ZBEKISTON RESPUBLIKASI<br />
                ICHKI ISHLAR VAZIRLIGI
              </p>
            </div>

            {/* CERTIFICATE TITLE (Uzbek) */}
            <div style={{
              width: '60%',
              textAlign: 'center',
              marginTop: '1.5%',
              zIndex: 10,
            }}>
              <h1 style={{
                fontFamily: "'Arial Black', 'Arial', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(20px, 5.5vw, 52px)',
                color: '#1e3a8a',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1,
              }}>
                SERTIFIKAT
              </h1>
              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(6px, 1.2vw, 12px)',
                color: '#2563eb',
                letterSpacing: '0.1em',
                marginTop: '0.4%',
                textTransform: 'uppercase',
              }}>
                Kibersavodxonlik o'quv kursi
              </p>
            </div>

            {/* Award Label (Uzbek) */}
            <p style={{
              fontFamily: "'Arial', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(6px, 1.1vw, 11px)',
              color: '#1e3a8a',
              letterSpacing: '0.05em',
              marginTop: '4.5%',
              zIndex: 10,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
              Ushbu sertifikat topshiriladi:
            </p>

            {/* STUDENT FULL NAME */}
            <div style={{
              width: '64%',
              zIndex: 10,
              marginTop: '1.5%',
              textAlign: 'left',
              paddingLeft: '2%',
            }}>
              <h2 style={{
                fontFamily: "'Arial Black', 'Arial', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(10px, 2.4vw, 24px)',
                color: '#0b132b',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.15,
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

            {/* Divider line */}
            <div style={{
              width: '64%',
              height: '2.5px',
              background: 'linear-gradient(90deg, #1e3a8a 0%, #d97706 100%)',
              marginTop: '1.5%',
              zIndex: 10,
              alignSelf: 'center',
              marginLeft: '2%',
            }} />

            {/* Course completion text (Uzbek) */}
            <p style={{
              fontFamily: "'Arial', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(7px, 1.4vw, 14px)',
              color: '#0b132b',
              letterSpacing: '0.02em',
              marginTop: '2.5%',
              zIndex: 10,
              textAlign: 'center',
              width: '58%',
              lineHeight: 1.4,
            }}>
              Kibersavodxonlik kursini muvaffaqiyatli<br />
              tamomlagani uchun
            </p>

          </div>

          {/* Medal Graphic */}
          <div style={{
            position: 'absolute',
            bottom: '5%',
            right: '4%',
            width: '13%',
            aspectRatio: '1 / 1',
            zIndex: 10,
          }}>
            <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <polygon points="35,75 45,95 50,70 55,95 65,75 50,65" fill="#f59e0b" />
              <polygon points="35,75 45,95 50,70" fill="#d97706" />
              <polygon points="55,95 65,75 50,70" fill="#d97706" />
              <circle cx="50" cy="52" r="36" fill="#fbbf24" />
              <circle cx="50" cy="52" r="30" fill="#f59e0b" />
              <circle cx="50" cy="52" r="25" fill="#fffbeb" />
              <polygon
                points="50,30 53.5,42 65,42 55.5,49 59,61 50,54 41,61 44.5,49 35,42 46.5,42"
                fill="#d97706"
              />
            </svg>
          </div>

          {/* Date */}
          {displayDate && (
            <div style={{
              position: 'absolute',
              bottom: '9%',
              left: '4%',
              zIndex: 10,
            }}>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                fontSize: 'clamp(5px, 0.9vw, 9px)',
                color: '#1e3a8a',
                letterSpacing: '0.05em',
                display: 'block',
              }}>
                Sana: {displayDate}
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
