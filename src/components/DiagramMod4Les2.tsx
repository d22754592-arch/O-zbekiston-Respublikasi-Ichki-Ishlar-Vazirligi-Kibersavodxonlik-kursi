import React from 'react';
import { Info, ArrowRight, FileText, AlertCircle } from 'lucide-react';

export const DiagramMod4Les2: React.FC = () => {
  return (
    <div className="my-6 bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm" id="diagram-m4-l2-hash">
      <div className="mb-4">
        <h4 className="text-[14px] font-bold text-[#0F2A4A] uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-[#B8860B]" /> {"Solishtirish Tahlili: Hashing va Ko'chki (Avalanche) Effekti"}
        </h4>
        <p className="text-xs text-[#6B7280] mt-1">
          {"Raqamli dalilning butunligini (integrity) tekshirishda xesh qiymatlarini solishtirish va uning o'zgarish dinamikasi."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mt-6">
        {/* Chap Ustun - Oldin (Asl Fayl) */}
        <div className="lg:col-span-5 border border-slate-200 bg-slate-50/50 rounded-lg p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#0F2A4A]" />
              <span className="text-[11px] font-mono font-bold text-[#0F2A4A] tracking-wider uppercase">
                OLDIN (ASL FAYL)
              </span>
            </div>
            
            {/* Visual file container */}
            <div className="bg-white border border-[#E5E5E5] rounded p-3 font-mono text-xs text-slate-700 mb-4 min-h-[70px]">
              <span className="text-[10px] text-slate-400 block mb-1">shartnoma.txt</span>
              <p className="text-slate-800">
                {"To'lov 1000$ amalga oshirilsin"}<span className="bg-emerald-100 px-1 font-bold text-[#1D9E75]">.</span>
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/65">
            <span className="text-[10px] text-[#6B7280] font-bold block mb-1 uppercase tracking-wider">SHA-256 Xesh Kodi:</span>
            <span className="font-mono text-[11px] font-bold text-[#1D9E75] break-all block bg-emerald-50/50 p-2 rounded border border-emerald-100">
              e3b0c44298fc1c149afbf4c8996f92427ae41e4649b934ca495991b7852b855
            </span>
          </div>
        </div>

        {/* O'tish belgisi */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 lg:py-0">
          <div className="bg-[#0F2A4A]/5 p-2.5 rounded-full border border-[#0F2A4A]/10">
            <ArrowRight className="w-5 h-5 text-[#0F2A4A] rotate-90 lg:rotate-0" />
          </div>
          <span className="text-[9px] font-bold text-[#B8860B] uppercase tracking-wider mt-2 text-center block">
            {"1 ta belgi o'zgardi"}
          </span>
        </div>

        {/* O'ng Ustun - Keyin (O'zgartirilgan Fayl) */}
        <div className="lg:col-span-5 border border-red-200 bg-red-50/10 rounded-lg p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-red-500" />
              <span className="text-[11px] font-mono font-bold text-red-500 tracking-wider uppercase">
                KEYIN (KIBER-XURUSH)
              </span>
            </div>
            
            {/* Visual file container with altered char */}
            <div className="bg-white border border-red-100 rounded p-3 font-mono text-xs text-slate-700 mb-4 min-h-[70px]">
              <span className="text-[10px] text-slate-400 block mb-1">shartnoma.txt</span>
              <p className="text-slate-800">
                {"To'lov 1000$ amalga oshirilsin"}<span className="bg-red-100 px-1 font-bold text-red-500 animate-pulse">!</span>
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-red-100">
            <span className="text-[10px] text-red-500 font-bold block mb-1 uppercase tracking-wider">BUTUNLAY BOSHQA XESH:</span>
            <span className="font-mono text-[11px] font-bold text-red-500 break-all block bg-red-50/50 p-2 rounded border border-red-100/50">
              ef2d127de37b942baad06145147ae41e4649b934ca495991b7852b855ff4328a
            </span>
          </div>
        </div>
      </div>

      {/* Avalanche explanation block */}
      <div className="mt-5 p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          <strong className="text-[#0F2A4A]">{"Ko'chki effekti (Avalanche effect):"}</strong> {"Xesh funksiyaning eng muhim talablaridan biri. Kirish ma'lumotlarida bitta bit yoki belgi (masalan, nuqta o'rniga undov belgisi) o'zgartirilsa ham, hosil bo'ladigan xesh qiymati butunlay boshqa ko'rinishga keladi. Bu dalillarning eng kichik darajada o'zgartirilganini ham bir soniyada aniqlash imkonini beradi."}
        </p>
      </div>
    </div>
  );
};

export default DiagramMod4Les2;
