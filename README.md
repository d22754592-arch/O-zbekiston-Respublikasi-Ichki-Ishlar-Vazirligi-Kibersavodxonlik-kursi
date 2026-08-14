# IIB Kiberxavfsizlik Akademiyasi — O'quv Portali

Ushbu platforma O'zbekiston Respublikasi Ichki Ishlar Organlari (IIO) tezkor va tergov xodimlari uchun kiberxavfsizlik savodxonligini oshirish maqsadida yaratilgan offline ta'lim portalidir.

---

## 📌 Loyiha Maqsadi va Asosiy Qoidalar

1. **Sodda va Amaliy:** Tizim mutaxassis bo'lmagan oddiy xodimlar uchun mo'ljallangan. Darslar va testlarda matematik formulalar hamda o'ta chuqur texnik atamalarsiz, hayotiy misollar orqali kiberxavfsizlik tushuntiriladi.
2. **Qonunchilik Moddalari:** O'zbekiston Jinoyat Kodeksidagi modda raqamlari va jazo miqdorlari (jarimalar/yillar) tez-tez o'zgarishi sababli, darslarda moddalar nomi va raqamlari o'rniga faqat umumiy tamoyillar qo'llaniladi.
3. **To'liq Offline Format:** Platforma viloyatlarda va tarmoqqa ulanmagan kompyuterlarda ishlatilishi uchun barcha kutubxonalar, ikonkalar va rasmlar local shaklda saqlanadi. Ma'lumotlar bazasi vazifasini brauzerning `LocalStorage` xotirasi bajaradi.

---

## 🛠️ Loyihaning Joriy Bosqichi (Progress Log)

*   **[x] AI Xizmatlarini O'chirish:** Gemini API chaqiruvlari, `@google/genai` va server qismi (`express`) loyihadan butunlay tozalandi va pure offline frontend ilova holatiga keltirildi.
*   **[x] Shaxsiy Dashboard:** "Rahbariyat monitoringi" sahifasi foydalanuvchining shaxsiy progressini, unvonini va test ko'rsatkichlarini ko'rsatadigan "Mening Natijalarim" paneliga aylantirildi.
*   **[x] O'quv Rejasini Kengaytirish (2026-yilgi Farg'ona qo'llanmasi asosida):**
    *   *1-modul:* Aqlli uy va IoT qurilmalar xavfsizligi.
    *   *2-modul:* IP-Telefoniya va soxta raqamlar (Vishing / Caller ID Spoofing).
    *   *3-modul:* Kvant kompyuterlari tahdidi va shifrlash kelajagi.
    *   *4-modul:* O'g'irlangan pullarni droplar, Humans, MCHJ va auksionlar orqali olib chiqish tahlili.
    *   *5-modul:* Kripto-aktivlar, mayning va noqonuniy mayningga oid huquqiy tushunchalar.
    *   *6-modul:* OSINT uchun geolokatsiya va rasm bo'yicha qidiruv (Reverse Image Search).
*   **[x] Video Integratsiyasi:** Kurs boshlanishidagi kirish videosi va yakuniy sertifikat olishdagi yopish videosi uchun frontend interfeysi va video pleyer modal tizimi tayyorlandi.

---

## 📹 Kirish va Yakuniy Videolarni Sozlash

Kursning ochilish va yopilish qismlariga video joylash uchun:
1. Tayyorlangan video fayllarni local formatda (`.mp4` yoki `.webm`) `src/assets/` yoki `public/` jildiga joylashtiring.
2. [src/App.tsx](file:///c:/Users/user/Desktop/KURS/iib-kiberxavfsizlik-akademiyasi/src/App.tsx) ichidagi video `src` manzillarini mos ravishda yangilang:
   *   Kirish videosi uchun: `intro_video.mp4`
   *   Yopish videosi uchun: `outro_video.mp4`
3. Offline muhitda ishlashi uchun videolar Youtube yoki tashqi oqimli serverlardan emas, faqat mahalliy fayllardan o'qilishi shart.

---

## 🚀 Mahalliylashtirish va Offline Ishga Tushirish

Loyihani offline ishlatish uchun static bundle yaratish:
1. Kerakli paketlarni o'rnating: `npm install`
2. Loyihani yiging: `npm run build`
3. Yig'ilgan `dist/` jildini USB fleshkaga yoki local tarmoqdagi serverga nusxalang.
4. Foydalanuvchilar internet ulanmasisiz `index.html` faylini ochib darslarni boshlashlari mumkin.
