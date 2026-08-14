import React from 'react';

export const DiagramTroyanAPK: React.FC = () => {
  return (
    <div className="my-6 bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm" id="diagram-troyan-apk-link">
      <div className="mb-4">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          {"Vizual tahlil: Kiber-tahdidlarning 3 xil ko'rinishi"}
        </h4>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 600 250" className="w-full max-w-2xl mx-auto block" style={{ minWidth: '450px' }}>
          {/* Card 1 - Troyan */}
          <rect x="10" y="10" width="180" height="230" rx="4" fill="#0F2A4A" stroke="#B8860B" strokeWidth="2" />
          <rect x="25" y="25" width="150" height="35" fill="#B8860B" rx="3" />
          <text x="100" y="47" fill="#0F2A4A" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            TROYAN (TROJAN)
          </text>
          
          <text x="100" y="85" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Niqoblangan Dastur
          </text>
          <text x="100" y="110" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            Aslida zararli, lekin foydali
          </text>
          <text x="100" y="125" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            {"dastur yoki o'yin ko'rinishida"}
          </text>
          <text x="100" y="140" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            tizimga yashirincha kiradi.
          </text>

          <line x1="25" y1="160" x2="175" y2="160" stroke="#B8860B" strokeWidth="1" strokeDasharray="3 3" />
          
          <text x="100" y="180" fill="#9CA3AF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            Alomat: Qurilma qizishi
          </text>
          <text x="100" y="195" fill="#9CA3AF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            {"Chora: Antivirusda tozalash"}
          </text>
          <text x="100" y="215" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            {"[Xavfli: Parollar o'g'rilanadi]"}
          </text>

          {/* Card 2 - APK */}
          <rect x="210" y="10" width="180" height="230" rx="4" fill="#0F2A4A" stroke="#B8860B" strokeWidth="2" />
          <rect x="225" y="25" width="150" height="35" fill="#B8860B" rx="3" />
          <text x="300" y="47" fill="#0F2A4A" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            ZARARLI APK
          </text>
          
          <text x="300" y="85" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Android Ilova Paketi
          </text>
          <text x="300" y="110" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            Telegram yoki shubhali saytdan
          </text>
          <text x="300" y="125" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            {"tarqatiladigan o'rnatish fayli."}
          </text>
          <text x="300" y="140" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            {"Tizim ruxsatlarini so'raydi."}
          </text>

          <line x1="225" y1="160" x2="375" y2="160" stroke="#B8860B" strokeWidth="1" strokeDasharray="3 3" />
          
          <text x="300" y="180" fill="#9CA3AF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            Alomat: Telegramda kelishi
          </text>
          <text x="300" y="195" fill="#9CA3AF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            {"Chora: Aslo o'rnatmaslik"}
          </text>
          <text x="300" y="215" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            [Xavfli: SMS/Karta nazorati]
          </text>

          {/* Card 3 - Link/Silka */}
          <rect x="410" y="10" width="180" height="230" rx="4" fill="#0F2A4A" stroke="#B8860B" strokeWidth="2" />
          <rect x="425" y="25" width="150" height="35" fill="#B8860B" rx="3" />
          <text x="500" y="47" fill="#0F2A4A" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            SOXTA HAVOLA (SILKA)
          </text>
          
          <text x="500" y="85" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            {"Yo'naltiruvchi Manzil"}
          </text>
          <text x="500" y="110" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            Internetdagi soxtalashtirilgan,
          </text>
          <text x="500" y="125" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            {"harf xatosi bo'lgan veb-sayt"}
          </text>
          <text x="500" y="140" fill="#E5E7EB" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
            manzili. Phishing rejimiga ega.
          </text>

          <line x1="425" y1="160" x2="575" y2="160" stroke="#B8860B" strokeWidth="1" strokeDasharray="3 3" />
          
          <text x="500" y="180" fill="#9CA3AF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            {"Alomat: Noto'g'ri yozilgan matn"}
          </text>
          <text x="500" y="195" fill="#9CA3AF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            Chora: Bosmasdan tekshirish
          </text>
          <text x="500" y="215" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            {"[Xavfli: Ma'lumot o'g'irlanishi]"}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default DiagramTroyanAPK;
