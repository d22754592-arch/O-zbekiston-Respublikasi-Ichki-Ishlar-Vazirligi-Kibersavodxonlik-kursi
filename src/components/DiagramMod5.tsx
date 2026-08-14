import React from 'react';

export const DiagramMod5: React.FC = () => {
  return (
    <div className="my-6 bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm" id="diagram-m5-process">
      <div className="mb-4">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          {"Vizual Tahlil: Huquqbuzarlikni aniqlash va javobgarlikka tortish bosqichlari"}
        </h4>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 650 120" className="w-full max-w-2xl mx-auto block" style={{ minWidth: '450px' }}>
          {/* Background */}
          <rect x="0" y="0" width="650" height="120" fill="#0F2A4A" rx="4" />

          {/* Node 1: Voqea sodir bo'ladi */}
          <rect x="20" y="30" width="160" height="60" rx="4" fill="#1F2937" stroke="#B8860B" strokeWidth="2" />
          <text x="100" y="65" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            {"Voqea sodir bo'ladi"}
          </text>

          {/* Arrow 1 -> 2 */}
          <g>
            <line x1="180" y1="60" x2="240" y2="60" stroke="#B8860B" strokeWidth="3" />
            <polygon points="240,60 232,55 232,65" fill="#B8860B" />
          </g>

          {/* Node 2: Tergov/Tekshiruv */}
          <rect x="240" y="30" width="160" height="60" rx="4" fill="#1F2937" stroke="#B8860B" strokeWidth="2" />
          <text x="320" y="65" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Tergov / Tekshiruv
          </text>

          {/* Arrow 2 -> 3 */}
          <g>
            <line x1="400" y1="60" x2="460" y2="60" stroke="#B8860B" strokeWidth="3" />
            <polygon points="460,60 452,55 452,65" fill="#B8860B" />
          </g>

          {/* Node 3: Jinoiy javobgarlik */}
          <rect x="460" y="30" width="170" height="60" rx="4" fill="#1F2937" stroke="#B8860B" strokeWidth="2" />
          <text x="545" y="58" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Jinoiy javobgarlik
          </text>
          <text x="545" y="74" fill="#B8860B" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            {"(agar asos bo'lsa)"}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default DiagramMod5;
