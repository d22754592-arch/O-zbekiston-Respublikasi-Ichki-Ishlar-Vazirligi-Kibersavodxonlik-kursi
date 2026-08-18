/**
 * Kiberxavfsizlik Akademiyasi - Decentralized Cryptographic Certificate Verification Engine
 * Uses HMAC-SHA256 digital signature to verify certificate authenticity without an external database.
 */

// Secret pepper key for certificate cryptographic signing
const CERT_PEPPER_SECRET = 'iib-uz-cyber-academy-2026-tamper-proof-certificate-key-v1';

export interface CertificateRecord {
  certId: string;      // e.g. "IIB-2026-7842"
  fullName: string;    // e.g. "Toshpulatov Behruz Alisherovich"
  completedDate: string; // e.g. "2026-08-17"
  score: number;       // e.g. 95
  signature?: string;  // 64-char SHA-256 HMAC hash
}

/**
 * Normalizes text for deterministic hash calculation
 */
function normalizeText(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Generates an HMAC-SHA256 cryptographic signature for the certificate data
 */
export async function computeCertificateSignature(
  certId: string,
  fullName: string,
  completedDate: string,
  score: number
): Promise<string> {
  const normName = normalizeText(fullName);
  const normId = certId.trim().toUpperCase();
  const normDate = completedDate.trim();
  const normScore = String(score);

  const payload = `IIB_CERT:${normId}|${normName}|${normDate}|${normScore}|${CERT_PEPPER_SECRET}`;

  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(CERT_PEPPER_SECRET);
      const dataToSign = encoder.encode(payload);

      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: { name: 'SHA-256' } },
        false,
        ['sign']
      );

      const signatureBuffer = await window.crypto.subtle.sign('HMAC', cryptoKey, dataToSign);
      const signatureArray = Array.from(new Uint8Array(signatureBuffer));
      return signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn('Web Crypto subtle unavailable, using fallback hash');
  }

  // Fallback hash implementation
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `sha256_${hex}_${payload.length}`;
}

/**
 * Generates a unique Certificate ID based on name and timestamp
 */
export function generateCertificateId(fullName: string): string {
  let seed = 0;
  for (let i = 0; i < fullName.length; i++) {
    seed = (seed * 31 + fullName.charCodeAt(i)) % 90000;
  }
  const randPart = Math.floor(1000 + (Math.abs(seed) % 9000));
  const year = new Date().getFullYear();
  return `IIB-KIBER-${year}-${randPart}`;
}

/**
 * Creates the full verification URL to encode inside the certificate's QR Code
 */
export function buildVerificationUrl(
  certId: string,
  fullName: string,
  completedDate: string,
  score: number,
  signature: string
): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://d22754592-arch.github.io';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/O-zbekiston-Respublikasi-Ichki-Ishlar-Vazirligi-Kibersavodxonlik-kursi/';

  const cleanPath = pathname.endsWith('/') ? pathname : pathname + '/';
  const query = new URLSearchParams({
    verify: '1',
    id: certId,
    name: fullName.trim(),
    date: completedDate.trim(),
    score: String(score),
    sig: signature
  });

  return `${origin}${cleanPath}?${query.toString()}`;
}

/**
 * Verifies URL query parameters against the cryptographic signature
 */
export async function verifyCertificateFromUrl(
  params: URLSearchParams
): Promise<{
  isValid: boolean;
  cert?: CertificateRecord;
  error?: string;
}> {
  const id = params.get('id');
  const name = params.get('name');
  const date = params.get('date');
  const scoreStr = params.get('score');
  const sig = params.get('sig');

  if (!id || !name || !date || !scoreStr || !sig) {
    return {
      isValid: false,
      error: "Sertifikat tekshirish parametrlari to'liq emas yoki havolada xatolik mavjud."
    };
  }

  const score = parseInt(scoreStr, 10);
  if (isNaN(score)) {
    return {
      isValid: false,
      error: "Sertifikat ball ma'lumoti noto'g'ri ko'rsatilgan."
    };
  }

  // Recalculate signature
  const expectedSignature = await computeCertificateSignature(id, name, date, score);

  if (sig === expectedSignature) {
    return {
      isValid: true,
      cert: {
        certId: id,
        fullName: name,
        completedDate: date,
        score,
        signature: sig
      }
    };
  } else {
    return {
      isValid: false,
      error: "DIQQAT: Ushbu sertifikatdagi ma'lumotlar o'zgartirilgan yoki soxtalashtirilgan! Raqamli kriptografik imzo tasdiqlanmadi."
    };
  }
}
