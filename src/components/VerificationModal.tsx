import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Calendar, 
  User, 
  Hash, 
  ArrowRight,
  Sparkles,
  Lock,
  ExternalLink
} from 'lucide-react';
import iibLogo from './iib.jpg';
import { verifyCertificateFromUrl, CertificateRecord } from '../utils/cryptoVerification';
import { useLanguage } from '../i18n/LanguageContext';

interface VerificationModalProps {
  onClose: () => void;
}

export default function VerificationModal({ onClose }: VerificationModalProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{
    isValid: boolean;
    cert?: CertificateRecord;
    error?: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    verifyCertificateFromUrl(params).then((res) => {
      setResult(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b1633] border-2 border-indigo-500/40 rounded-3xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden text-slate-100 font-sans relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Branding */}
        <div className="bg-[#070e24] p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-br from-indigo-500 to-blue-700 shadow-md flex-shrink-0">
              <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-white/20">
                <img src={iibLogo} alt="IIB Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                {t('iibTitle')}
              </div>
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                {t('verifyModalTitle')}
              </h2>
            </div>
          </div>
        </div>

        {/* Verification Status & Details */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {loading ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm font-bold text-slate-300">
                {t('verifyChecking')}
              </p>
            </div>
          ) : result?.isValid && result.cert ? (
            
            /* ── VALID CERTIFICATE BANNER ── */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Success Badge */}
              <div className="bg-emerald-950/90 border-2 border-emerald-500 p-6 rounded-2xl text-center space-y-3 shadow-xl">
                <div className="w-16 h-16 bg-emerald-600 border-2 border-emerald-300 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-950/80 animate-bounce">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-1 border border-emerald-400/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('verifySignatureValid')}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                    {t('verifyCertAuthentic')}
                  </h3>
                  <p className="text-xs text-emerald-200 mt-1 max-w-md mx-auto">
                    {t('verifyOfficialStatement')}
                  </p>
                </div>
              </div>

              {/* Certificate Metadata Grid */}
              <div className="bg-[#070e24] border border-slate-800 rounded-2xl p-5 space-y-3.5 text-xs">
                
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-slate-400 font-medium flex items-center space-x-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>{t('verifyCertHolder')}</span>
                  </span>
                  <span className="font-bold text-white text-sm sm:text-base text-right">
                    {result.cert.fullName}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-slate-400 font-medium flex items-center space-x-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{t('verifyCurriculum')}</span>
                  </span>
                  <span className="font-bold text-amber-300 text-right">
                    {t('verifyCurriculumName')}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-slate-400 font-medium flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>{t('verifyIssuedDate')}</span>
                  </span>
                  <span className="font-mono font-bold text-white text-right">
                    {result.cert.completedDate}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-slate-400 font-medium flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-indigo-400" />
                    <span>{t('verifySerialId')}</span>
                  </span>
                  <span className="font-mono font-black text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-500/30 text-right">
                    {result.cert.certId}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400 font-medium flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t('verifyFinalScore')}</span>
                  </span>
                  <span className="font-mono font-black text-emerald-400 text-sm">
                    {result.cert.score}% ({t('verifySuccessful')})
                  </span>
                </div>

              </div>

              {/* Security Hash Proof */}
              <div className="p-3 bg-black/50 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center space-x-1.5">
                  <Lock className="w-3 h-3 text-indigo-400" />
                  <span>{t('verifyCryptoProof')}</span>
                </div>
                <div className="font-mono text-[10px] text-slate-400 break-all leading-tight">
                  {result.cert.signature}
                </div>
              </div>

            </div>

          ) : (

            /* ── FORGERY DETECTED BANNER ── */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-rose-950/90 border-2 border-rose-500 p-6 rounded-2xl text-center space-y-3 shadow-xl">
                <div className="w-16 h-16 bg-rose-600 border-2 border-rose-300 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-rose-950/80">
                  <ShieldAlert className="w-9 h-9 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                    {t('verifyForgeryTitle')}
                  </h3>
                  <p className="text-xs text-rose-200 mt-2 max-w-md mx-auto leading-relaxed">
                    {result?.error || "Ushbu sertifikatdagi ma'lumotlar o'zgartirilgan yoki uning raqamli kriptografik imzosi tasdiqlanmadi."}
                  </p>
                </div>
              </div>

              <div className="bg-[#070e24] p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                ℹ️ {t('verifySecurityNotice')}
              </div>
            </div>

          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                // Clear URL query parameters and close modal
                window.history.replaceState({}, '', window.location.pathname);
                onClose();
              }}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center space-x-2 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <span>{t('verifyGoToHome')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

