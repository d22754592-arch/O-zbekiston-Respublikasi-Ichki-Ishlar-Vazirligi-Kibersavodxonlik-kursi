import React from 'react';
import { Info, Phone, WifiOff, ShieldCheck, Landmark, ChevronRight } from 'lucide-react';

export const DiagramMod4Les3: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Telefon topildi',
      subtitle: 'Tirik holatda saqlash',
      icon: <Phone className="w-5 h-5 text-indigo-600" />,
      desc: "Qurilma ekrani ochiq bo'lsa, o'chib-bloklanib qolishining oldini olish uchun faol holatda tutiladi.",
      bg: 'bg-indigo-50/50 border-indigo-100',
      badgeColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 2,
      title: 'Samolyot rejimi',
      subtitle: 'Aloqani darhol uzish',
      icon: <WifiOff className="w-5 h-5 text-amber-600" />,
      desc: "Masofadan ma'lumotlarni o'chirish (remote wipe) xavfining oldini olish uchun Wi-Fi, Bluetooth va GSM tarmoqlari o'chiriladi.",
      bg: 'bg-amber-50/30 border-amber-100',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      id: 3,
      title: 'Faraday qopi',
      subtitle: 'Signal izolyatsiyasi',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      desc: "Qurilma radio-to'lqinlarni 100% to'suvchi maxsus Faraday qopiga joylashtiriladi, bu esa tashqi aloqalarni bloklaydi.",
      bg: 'bg-emerald-50/20 border-emerald-100',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 4,
      title: 'Ekspertizaga',
      subtitle: 'Hujjatlashtirilgan topshirish',
      icon: <Landmark className="w-5 h-5 text-blue-600" />,
      desc: 'Dalillar zanjiri bayonnomasi (Chain of Custody) bilan birga tahlil qilish uchun kiber-laboratoriyaga xavfsiz yetkaziladi.',
      bg: 'bg-blue-50/30 border-blue-100',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <div className="my-6 bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm" id="diagram-m4-l3-mobile">
      <div className="mb-5">
        <h4 className="text-[14px] font-bold text-[#0F2A4A] uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-[#B8860B]" /> Ketma-ketlik Tahlili: Mobil qurilmalardan dalil olish bosqichlari
        </h4>
        <p className="text-xs text-[#6B7280] mt-1">
          {"Kiber-jinoyatchilik sodir etilgan joyda smartfon yoki planshet topilganda kiber-detektiv amal qilishi shart bo'lgan qat'iy xronologik tartib."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 relative">
        {steps.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col justify-between">
            {/* Step card container */}
            <div className={`border ${step.bg} rounded-lg p-4 h-full flex flex-col justify-between transition-all hover:shadow-sm`}>
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm shrink-0">
                    {step.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${step.badgeColor}`}>
                    0{step.id}-Bosqich
                  </span>
                </div>
                
                <h5 className="text-[14px] font-semibold text-slate-800 tracking-tight">{step.title}</h5>
                <p className="text-[11px] text-[#B8860B] font-medium mt-0.5">{step.subtitle}</p>
                <p className="text-[11px] text-[#6B7280] leading-normal mt-2.5">{step.desc}</p>
              </div>
            </div>

            {/* Connecting Chevron on Desktop (only between steps) */}
            {idx < steps.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 bg-white border border-slate-100 rounded-full p-1 shadow-sm">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagramMod4Les3;
