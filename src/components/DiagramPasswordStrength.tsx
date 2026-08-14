import React from 'react';

export const DiagramPasswordStrength: React.FC = () => {
  return (
    <div className="my-6 bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm" id="diagram-password-strength">
      <div className="mb-4">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          {"Vizual tahlil: Parol mustahkamligi darajalari"}
        </h4>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 600 240" className="w-full max-w-2xl mx-auto block" style={{ minWidth: '450px' }}>
          {/* Background container */}
          <rect x="0" y="0" width="600" height="240" fill="#0F2A4A" rx="4" />

          {/* Level 1: Weak */}
          <g>
            {/* Title & Example */}
            <text x="30" y="45" fill="#EF4444" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              {"ZAIF: \"admin123\", \"123456\""}
            </text>
            <text x="570" y="45" fill="#9CA3AF" fontSize="11" textAnchor="end" fontFamily="sans-serif">
              Buzish vaqti: Soniyalar
            </text>
            {/* Progress Bar Background */}
            <rect x="30" y="55" width="540" height="12" fill="#1F2937" rx="6" />
            {/* Progress Bar Active */}
            <rect x="30" y="55" width="80" height="12" fill="#EF4444" rx="6" />
          </g>

          {/* Level 2: Medium */}
          <g>
            {/* Title & Example */}
            <text x="30" y="115" fill="#B8860B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              {"O'RTACHA: \"Toshkent1995!\", \"KiberXavf88\""}
            </text>
            <text x="570" y="115" fill="#9CA3AF" fontSize="11" textAnchor="end" fontFamily="sans-serif">
              Buzish vaqti: Kunlar / Oylar
            </text>
            {/* Progress Bar Background */}
            <rect x="30" y="125" width="540" height="12" fill="#1F2937" rx="6" />
            {/* Progress Bar Active */}
            <rect x="30" y="125" width="280" height="12" fill="#B8860B" rx="6" />
          </g>

          {/* Level 3: Strong */}
          <g>
            {/* Title & Example */}
            <text x="30" y="185" fill="#10B981" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              {"KUCHLI: \"olma-gilos-tarvuz-shaftoli\" (Uzun iborali)"}
            </text>
            <text x="570" y="185" fill="#9CA3AF" fontSize="11" textAnchor="end" fontFamily="sans-serif">
              Buzish vaqti: Trillion yillar
            </text>
            {/* Progress Bar Background */}
            <rect x="30" y="195" width="540" height="12" fill="#1F2937" rx="6" />
            {/* Progress Bar Active */}
            <rect x="30" y="195" width="540" height="12" fill="#10B981" rx="6" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default DiagramPasswordStrength;
