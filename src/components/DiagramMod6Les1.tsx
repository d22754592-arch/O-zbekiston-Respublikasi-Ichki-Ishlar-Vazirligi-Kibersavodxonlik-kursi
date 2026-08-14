import React from 'react';

export const DiagramMod6Les1: React.FC = () => {
  return (
    <div className="my-6 bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm" id="diagram-m6-l1-dorking">
      <div className="mb-4">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          {"Vizual Tahlil: Google Dorking maxsus operatorlari vazifalari"}
        </h4>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 600 220" className="w-full max-w-2xl mx-auto block" style={{ minWidth: '450px' }}>
          {/* Background */}
          <rect x="0" y="0" width="600" height="220" fill="#0F2A4A" rx="4" />

          {/* Row 1: site: */}
          <g>
            <rect x="20" y="20" width="120" height="36" rx="4" fill="#1F2937" stroke="#B8860B" strokeWidth="2" />
            <text x="80" y="42" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              site:
            </text>
            <line x1="140" y1="38" x2="180" y2="38" stroke="#B8860B" strokeWidth="2" />
            <polygon points="180,38 172,34 172,42" fill="#B8860B" />
            <rect x="180" y="20" width="400" height="36" rx="4" fill="#111827" stroke="#374151" strokeWidth="1.5" />
            <text x="200" y="42" fill="#FFFFFF" fontSize="11" fontWeight="medium" fontFamily="sans-serif">
              Muayyan saytdan qidirish uchun
            </text>
          </g>

          {/* Row 2: filetype: */}
          <g>
            <rect x="20" y="68" width="120" height="36" rx="4" fill="#1F2937" stroke="#B8860B" strokeWidth="2" />
            <text x="80" y="90" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              filetype:
            </text>
            <line x1="140" y1="86" x2="180" y2="86" stroke="#B8860B" strokeWidth="2" />
            <polygon points="180,86 172,82 172,90" fill="#B8860B" />
            <rect x="180" y="68" width="400" height="36" rx="4" fill="#111827" stroke="#374151" strokeWidth="1.5" />
            <text x="200" y="90" fill="#FFFFFF" fontSize="11" fontWeight="medium" fontFamily="sans-serif">
              Muayyan formatdagi fayllarni qidirish
            </text>
          </g>

          {/* Row 3: intitle: */}
          <g>
            <rect x="20" y="116" width="120" height="36" rx="4" fill="#1F2937" stroke="#B8860B" strokeWidth="2" />
            <text x="80" y="138" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              intitle:
            </text>
            <line x1="140" y1="134" x2="180" y2="134" stroke="#B8860B" strokeWidth="2" />
            <polygon points="180,134 172,130 172,138" fill="#B8860B" />
            <rect x="180" y="116" width="400" height="36" rx="4" fill="#111827" stroke="#374151" strokeWidth="1.5" />
            <text x="200" y="138" fill="#FFFFFF" fontSize="11" fontWeight="medium" fontFamily="sans-serif">
              {"Sarlavhadagi kalit so'zlarni qidirish"}
            </text>
          </g>

          {/* Row 4: inurl: */}
          <g>
            <rect x="20" y="164" width="120" height="36" rx="4" fill="#1F2937" stroke="#B8860B" strokeWidth="2" />
            <text x="80" y="186" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              inurl:
            </text>
            <line x1="140" y1="182" x2="180" y2="182" stroke="#B8860B" strokeWidth="2" />
            <polygon points="180,182 172,178 172,186" fill="#B8860B" />
            <rect x="180" y="164" width="400" height="36" rx="4" fill="#111827" stroke="#374151" strokeWidth="1.5" />
            <text x="200" y="186" fill="#FFFFFF" fontSize="11" fontWeight="medium" fontFamily="sans-serif">
              {"Havoladagi so'zlarni qidirish"}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default DiagramMod6Les1;
