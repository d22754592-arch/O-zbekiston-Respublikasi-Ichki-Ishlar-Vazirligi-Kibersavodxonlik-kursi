import React from 'react';

export const DiagramTor: React.FC = () => {
  return (
    <div className="my-6 bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm" id="diagram-tor-flow">
      <div className="mb-4">
        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          {"Vizual tahlil: Tor tarmog'ining 3 bosqichli piyozli shifrlangan yo'li (Onion Routing)"}
        </h4>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 660 180" className="w-full max-w-3xl mx-auto block" style={{ minWidth: '550px' }}>
          {/* Background container */}
          <rect x="0" y="0" width="660" height="180" fill="#0F2A4A" rx="4" />

          {/* 1. Siz (Doira) */}
          <circle cx="50" cy="90" r="35" fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" />
          <text x="50" y="88" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Siz
          </text>
          <text x="50" y="103" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Real IP
          </text>

          {/* Line: Siz -> Entry */}
          <g>
            <line x1="85" y1="90" x2="145" y2="90" stroke="#10B981" strokeWidth="3" />
            <polygon points="145,90 137,85 137,95" fill="#10B981" />
            <text x="115" y="80" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              3 Qatlamli
            </text>
          </g>

          {/* 2. Kirish Tuguni (Katakcha) */}
          <rect x="145" y="55" width="105" height="70" rx="4" fill="#111827" stroke="#B8860B" strokeWidth="2" />
          <text x="197" y="80" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Kirish Tuguni
          </text>
          <text x="197" y="95" fill="#B8860B" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Sizni biladi
          </text>
          <text x="197" y="110" fill="#9CA3AF" fontSize="8" textAnchor="middle" fontFamily="sans-serif">
            (Entry Node)
          </text>

          {/* Line: Entry -> Middle */}
          <g>
            <line x1="250" y1="90" x2="310" y2="90" stroke="#10B981" strokeWidth="2.5" />
            <polygon points="310,90 302,85 302,95" fill="#10B981" />
            <text x="280" y="80" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              2 Qatlamli
            </text>
          </g>

          {/* 3. O'rta Tugun (Katakcha) */}
          <rect x="310" y="55" width="105" height="70" rx="4" fill="#111827" stroke="#B8860B" strokeWidth="2" />
          <text x="362" y="80" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            {"O'rta Tugun"}
          </text>
          <text x="362" y="95" fill="#B8860B" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            {"Sizni & Serverni"}
          </text>
          <text x="362" y="108" fill="#B8860B" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            aslo bilmaydi
          </text>

          {/* Line: Middle -> Exit */}
          <g>
            <line x1="415" y1="90" x2="475" y2="90" stroke="#10B981" strokeWidth="2" />
            <polygon points="475,90 467,85 467,95" fill="#10B981" />
            <text x="445" y="80" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              1 Qatlamli
            </text>
          </g>

          {/* 4. Chiqish Tuguni (Katakcha) */}
          <rect x="475" y="55" width="105" height="70" rx="4" fill="#111827" stroke="#B8860B" strokeWidth="2" />
          <text x="527" y="80" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Chiqish Tuguni
          </text>
          <text x="527" y="95" fill="#B8860B" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Shifrni yechadi
          </text>
          <text x="527" y="110" fill="#9CA3AF" fontSize="8" textAnchor="middle" fontFamily="sans-serif">
            (Exit Node)
          </text>

          {/* Line: Exit -> Server */}
          <g>
            <line x1="580" y1="90" x2="615" y2="90" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="615,90 607,85 607,95" fill="#EF4444" />
            <text x="597" y="80" fill="#EF4444" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Shifrsiz
            </text>
          </g>

          {/* 5. Server (Doira) */}
          <circle cx="630" cy="90" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" />
          <text x="630" y="88" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Server
          </text>
          <text x="630" y="100" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Sayt
          </text>
        </svg>
      </div>
    </div>
  );
};

export default DiagramTor;
