import React from 'react';

export const DiagramVPN: React.FC = () => {
  return (
    <div className="my-6 space-y-6" id="diagram-vpn-proxy-container">
      {/* A) PROXY FLOW */}
      <div className="bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm">
        <div className="mb-4">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            {"A) PROXY OQIMI (Faqat IP o'zgaradi, shifrlash yo'q)"}
          </h4>
        </div>
        <div className="overflow-x-auto">
          <svg viewBox="0 0 600 130" className="w-full max-w-2xl mx-auto block" style={{ minWidth: '450px' }}>
            {/* Background */}
            <rect x="0" y="0" width="600" height="130" fill="#0F2A4A" rx="4" />

            {/* Siz (Qurilma) */}
            <rect x="20" y="35" width="110" height="60" rx="4" fill="#1F2937" stroke="#EF4444" strokeWidth="2" />
            <text x="75" y="62" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Siz (Qurilma)
            </text>
            <text x="75" y="78" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Asl IP: 213.230.x.x
            </text>

            {/* Red Unencrypted Line 1 */}
            <g>
              <line x1="130" y1="65" x2="240" y2="65" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="240,65 232,60 232,70" fill="#EF4444" />
              <text x="185" y="52" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                SHIFRSIZ OQIM
              </text>
            </g>

            {/* Proxy Server */}
            <rect x="240" y="35" width="120" height="60" rx="4" fill="#1F2937" stroke="#B8860B" strokeWidth="2" />
            <text x="300" y="62" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Proxy Server
            </text>
            <text x="300" y="78" fill="#B8860B" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Yangi IP: 82.102.x.x
            </text>

            {/* Red Unencrypted Line 2 */}
            <g>
              <line x1="360" y1="65" x2="470" y2="65" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="470,65 462,60 462,70" fill="#EF4444" />
              <text x="415" y="52" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                SHIFRSIZ OQIM
              </text>
            </g>

            {/* Target Website */}
            <rect x="470" y="35" width="110" height="60" rx="4" fill="#111827" stroke="#9CA3AF" strokeWidth="2" />
            <text x="525" y="62" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Internet / Sayt
            </text>
            <text x="525" y="78" fill="#9CA3AF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
              {"Ko'radigan IP: 82.102.x.x"}
            </text>
          </svg>
        </div>
      </div>

      {/* B) VPN FLOW */}
      <div className="bg-white border border-[#E5E5E5] p-6 rounded-lg shadow-sm">
        <div className="mb-4">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            {"B) VPN OQIMI (Shifrlangan tunnel + IP o'zgarishi)"}
          </h4>
        </div>
        <div className="overflow-x-auto">
          <svg viewBox="0 0 600 130" className="w-full max-w-2xl mx-auto block" style={{ minWidth: '450px' }}>
            {/* Background */}
            <rect x="0" y="0" width="600" height="130" fill="#0F2A4A" rx="4" />

            {/* Siz (Qurilma) */}
            <rect x="20" y="35" width="110" height="60" rx="4" fill="#1F2937" stroke="#10B981" strokeWidth="2" />
            <text x="75" y="62" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Siz (Qurilma)
            </text>
            <text x="75" y="78" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Asl IP: 213.230.x.x
            </text>

            {/* Green Encrypted Tunnel */}
            <g>
              <rect x="130" y="45" width="110" height="40" rx="4" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="130" y1="65" x2="240" y2="65" stroke="#10B981" strokeWidth="3" />
              <polygon points="240,65 232,60 232,70" fill="#10B981" />
              <text x="185" y="58" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                SHIFRLANGAN
              </text>
              <text x="185" y="72" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                TUNNEL (TUNNEL)
              </text>
            </g>

            {/* VPN Server */}
            <rect x="240" y="35" width="120" height="60" rx="4" fill="#1F2937" stroke="#10B981" strokeWidth="2" />
            <text x="300" y="62" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              VPN Server
            </text>
            <text x="300" y="78" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Yangi IP: 45.138.x.x
            </text>

            {/* Gray External Line */}
            <g>
              <line x1="360" y1="65" x2="470" y2="65" stroke="#9CA3AF" strokeWidth="2" />
              <polygon points="470,65 462,60 462,70" fill="#9CA3AF" />
              <text x="415" y="52" fill="#9CA3AF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Tashqi Oqim
              </text>
            </g>

            {/* Target Website */}
            <rect x="470" y="35" width="110" height="60" rx="4" fill="#111827" stroke="#9CA3AF" strokeWidth="2" />
            <text x="525" y="62" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Internet / Sayt
            </text>
            <text x="525" y="78" fill="#10B981" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
              {"Ko'radigan IP: 45.138.x.x"}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DiagramVPN;
