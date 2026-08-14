import React from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

export const DiagramMod4Les1: React.FC = () => {
  return (
    <div className="my-6 bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm" id="diagram-m4-l1-evidence">
      <div className="mb-4">
        <h4 className="text-[14px] font-bold text-[#0F2A4A] uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-[#B8860B]" /> Vizual Tahlil: Raqamli dalillar bilan ishlash qoidalari (Chain of Custody)
        </h4>
        <p className="text-xs text-[#6B7280] mt-1">
          Raqamli ekspertizada dalillarni qabul qilish va saqlash jarayonidagi eng muhim amaliy farqlar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Chap Ustun - Tavsiya (Green Card) */}
        <div className="border border-emerald-200 bg-emerald-50/20 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <CheckCircle2 className="w-6 h-6 text-[#1D9E75] shrink-0" />
              <span className="text-[12px] font-mono font-bold text-[#1D9E75] tracking-widest uppercase">
                {"TO'G'RI (TAVSIYA ETILADI)"}
              </span>
            </div>
            <h5 className="text-[15px] font-semibold text-slate-800 mb-2">{"Qurilmani joriy holatda saqlab qolish"}</h5>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {"Tizim ishchi holatda bo'lsa, operativ xotirani (RAM) yuklab olish uchun o'chiq qoldiriladi. Darhol malakali kiber-ekspert chaqiriladi va dalillar zanjiri boshlanadi."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] font-mono text-[#1D9E75] font-bold">
            <span>{"✓ Ekspertizaga tayyorlash"}</span>
            <span>+300 ball</span>
          </div>
        </div>

        {/* O'ng Ustun - Taqiq (Red Card) */}
        <div className="border border-red-200 bg-red-50/10 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <XCircle className="w-6 h-6 text-red-500 shrink-0" />
              <span className="text-[12px] font-mono font-bold text-red-500 tracking-widest uppercase">
                {"NOTO'G'RI (TAQIQLANADI)"}
              </span>
            </div>
            <h5 className="text-[15px] font-semibold text-slate-800 mb-2">{"Qurilmani o'chirish yoki qayta yuklash"}</h5>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {"Quvvatni uzish operativ xotiradagi muhim vaqtinchalik ma'lumotlar (parollar, ochiq sessiyalar, virusli jarayonlar) butunlay yo'qolishiga va dalil buzilishiga olib keladi."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-red-100 flex items-center justify-between text-[11px] font-mono text-red-500 font-bold">
            <span>{"✗ Dalillarning yo'qolishi"}</span>
            <span>Xavf darajasi: Yuqori</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramMod4Les1;
