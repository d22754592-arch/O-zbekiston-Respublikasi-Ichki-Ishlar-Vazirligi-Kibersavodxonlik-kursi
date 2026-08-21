import { ModuleData, Language } from './types';

const modulesUz: ModuleData[] = [
  {
    id: 1,
    title: "1-Modul: Kiberfiribgarlardan Himoyalanishning 5 Oltin Qoidasi",
    subtitle: "IIV rasmiy ogohlantiruvi, 5 ta oltin qoida va firibgarlarni aniqlash",
    description: "O'zbekiston Respublikasi Ichki ishlar vazirligi tomonidan ishlab chiqilgan kiberfiribgarlardan himoyalanishning 5 ta oltin qoidasi: begona qo'ng'iroqlar, noma'lum havolalar, Telegramdagi xavfli fayllar, soxta investitsiyalar va oldindan to'lov qilmaslik tamoyillari.",
    iconName: "ShieldAlert",
    slideCount: 10,
    slideFolder: "./slides/module_1",
    overview: {
      summary: "O'zbekiston Respublikasi IIV tomonidan tasdiqlangan ushbu 5 ta oltin qoida — barcha xodimlar va fuqarolar uchun kiberfiribgarlik tuzoqlariga tushib qolmaslikning eng samarali amaliy qo'llanmasidir.",
      keyRule: "Firibgarlar shoshiltiradi — siz esa To'xtang, O'ylang va Tekshiring!",
      dos: [
        "Begona qo'ng'iroq bo'lganda darhol aloqani to'xtatib, bank yoki davlat idorasining rasmiy raqamiga o'zingiz qayta qo'ng'iroq qiling.",
        "Har qanday kelgan havolaning domen manzilini (URL) bosishdan oldin sinchkovlik bilan tekshiring.",
        "Telegramda notanish yoki tanish akkauntdan yuborilgan fayllarni (APK, ZIP, EXE) ochishdan oldin yuboruvchini boshqa kanal orqali tasdiqlang.",
        "Kiberfiribgarlikka duch kelsangiz, skrinshotlarni saqlab darhol 1102 — IIV Ishonch telefoniga xabar bering."
      ],
      donts: [
        "Hech kimga, hatto o'zini bank xodimi yoki tergovchi deb tanishtirganlarga ham PIN-kod, SMS-tasdiq kodi va parollarni bermang.",
        "'Pulingizni 2 barobarga ko'paytirib beramiz' degan kafolatlangan katta daromad va'dalariga aslo aldanmang.",
        "Mahsulot qo'lingizga yetib kelmasdan va ko'rmasdan turib begonalarga oldindan to'lov qilmang.",
        "Noma'lum Telegram botlar va shubhali guruhlardagi havolalarga bank karta ma'lumotlarini kiritmang."
      ]
    },
    quizQuestions: [
      {
        id: 101,
        question: "Kiberfiribgarlarning psixologik bosimiga duch kelganda IIV tomonidan tavsiya etilgan asosiy himoya tamoyili qaysi?",
        options: [
          "Zudlik bilan pul o'tkazish",
          "To'xtang — O'ylang — Tekshiring",
          "Xabarni guruhlarga tarqatish",
          "Parolni o'chirib tashlash"
        ],
        correctAnswer: 1,
        explanation: "Slayd 2 va 10 ga ko'ra: Kiberxavfsizlikning eng muhim shiori: To'xtang — O'ylang — Tekshiring."
      },
      {
        id: 102,
        question: "1-Qoida: Telefon orqali o'zini bank yoki davlat organi vakili deb tanishtirgan shaxsga qanday ma'lumotlarni aytish qat'iyan taqiqlanadi?",
        options: [
          "Faqat o'z ism-familiyasini",
          "PIN-kod, SMS-tasdiq kodi, parollar va pasport ma'lumotlarini",
          "Faqat ob-havo haqida",
          "Tashkilotning rasmiy manzilini"
        ],
        correctAnswer: 1,
        explanation: "Slayd 3 ga ko'ra: Hech bir rasmiy tashkilot telefon orqali PIN-kod, SMS-kod yoki parollarni so'ramaydi."
      },
      {
        id: 103,
        question: "2-Qoida: Shubhali havola (link) kelganda uni bosishdan oldin birinchi navbatda nima tekshirilishi shart?",
        options: [
          "Kompyuter monitori",
          "Havolaning domen manzili (URL) rasmiy saytga mosligi",
          "Telefon quvvati",
          "Internet tezligi"
        ],
        correctAnswer: 1,
        explanation: "Slayd 4 ga ko'ra: Havolani bosishdan oldin uning domen manzilini sinchkovlik bilan tekshirish shart."
      },
      {
        id: 104,
        question: "3-Qoida: Telegramda notanish yoki tanish akkauntdan 'rasmingiz tarqaldi', 'sovrin yutdingiz' deb yuborilgan APK yoki ZIP fayllar bo'yicha qat'iy qoida qanday?",
        options: [
          "Faylni zudlik bilan ochib ko'rish",
          "Faylni ochmaslik, yuboruvchini boshqa kanal orqali tasdiqlash va xavfli bo'lsa darhol o'chirish",
          "Faylni barcha tanishlarga ulashish",
          "Telefonni qayta yoqish"
        ],
        correctAnswer: 1,
        explanation: "Slayd 5 ga ko'ra: APK, EXE, ZIP fayllar zararli dastur bo'lishi mumkin. Faylni ochmasdan tekshirish va o'chirish shart."
      },
      {
        id: 105,
        question: "4-Qoida: 'Pulingizni 2 barobarga ko'paytirib beraman', kafolatlangan katta daromad yoki soxta investitsiya takliflari nimaning belgisidir?",
        options: [
          "Haqiqiy davlat subsidiyasi",
          "Klassik kiberfiribgarlikning qizil bayrog'i (aldov)",
          "Xayriya aksiyasi",
          "Bank krediti"
        ],
        correctAnswer: 1,
        explanation: "Slayd 6 ga ko'ra: Hech kim pulingizni osonlikcha ko'paytirib bermaydi. Kafolatlangan katta daromad va'dasi — bu 100% firibgarlikdir."
      },
      {
        id: 106,
        question: "5-Qoida: Onlayn savdoda (masalan, OLX yoki Telegram bozorlarida) firibgarlarga aldanib qolmaslikning oltin qoidasi qanday?",
        options: [
          "Oldindan to'liq to'lov qilish",
          "Tovarni ko'rmay, tekshirmay va qo'lga yetmasdan turib oldindan pul o'tkazmaslik",
          "Karta PIN-kodini sotuvchiga yuborish",
          "Har qanday havolaga karta ma'lumotlarini kiritish"
        ],
        correctAnswer: 1,
        explanation: "Slayd 7 ga ko'ra: Mahsulot qo'lingizga tegmasdan turib hech qachon oldindan to'lov qilmang."
      },
      {
        id: 107,
        question: "Firibgarlarning jabrlanuvchini tez xatoga yo'llashdagi asosiy psixologik taktikasi nima?",
        options: [
          "Kitob o'qishni tavsiya qilish",
          "'Hozir harakat qilmasangiz hisobingiz bloklanadi' deb shoshiltirish va qo'rqitish",
          "Uzoq o'ylab qaror chiqarishni so'rash",
          "Rasm chizish"
        ],
        correctAnswer: 1,
        explanation: "Slayd 8 ga ko'ra: Firibgarlar shoshiltiradi va qo'rqitadi, maqsad — sizni tekshirishga vaqt topolmasdan xato qilishga undash."
      },
      {
        id: 108,
        question: "Kiberfiribgarlarga duch kelganda yoki zarar ko'rganda dalillarni (skrinshotlarni) saqlab qaysi IIV ishonch telefoniga murojaat qilinadi?",
        options: [
          "101",
          "102",
          "1102 — IIV Ishonch telefoni",
          "104"
        ],
        correctAnswer: 2,
        explanation: "Slayd 9 ga ko'ra: 1102 — O'zbekiston Respublikasi IIV Ishonch telefoni orqali kiberjinoyatlar bo'yicha murojaat qilinadi."
      }
    ]
  },
  {
    id: 2,
    title: "2-Modul: Parollar xavfsizligi va boshqaruvi",
    subtitle: "Kuchli parollar yaratish, parol iboralari va parol menejerlari",
    description: "Ushbu modulda kuchli parollar yaratish, parol iboralari (Passphrase) tamoyili hamda Bitwarden va KeePassXC kabi parol menejerlaridan foydalanishni o'rganasiz.",
    iconName: "KeyRound",
    slideCount: 10,
    slideFolder: "./slides/module_2",
    overview: {
      summary: "Parollar — shaxsiy va ishchi ma'lumotlarning birinchi mudofaa chizig'idir. Zamonaviy kiber-xavfsizlikda oddiy parollardan voz kechib, uzun parol iboralari (Passphrase) va parol menejerlariga o'tish talab etiladi.",
      keyRule: "Har bir xizmat uchun alohida, kamida 12-16 belgili kuchli parol va Passphrase qo'llang!",
      dos: [
        "Parol uzunligini kamida 12-16 ta belgi qilib belgilang (harflar, raqamlar va maxsus belgilar).",
        "Bir-biri bilan bog'liq bo'lmagan so'zlardan iborat 'Passphrase' (masalan: kitob-osmon-qush-daryo) tamoyilidan foydalaning.",
        "Parollarni shifrlangan Bitwarden yoki offline KeePassXC parol menejerlarida saqlang.",
        "Muntazam ravishda parollaringiz ochiq bazalarga sizdirilmaganligini tekshirib turing."
      ],
      donts: [
        "Tug'ilgan yil, ism, telefon raqami yoki '123456', 'password' kabi oddiy parollarni ishlatmang.",
        "Bir xil parolni bir nechta turli akkauntlarda takroran ishlatmang.",
        "Parollarni kompyuter monitoriga stiker qilib yopishtirish yoki oddiy bloknotda ochiq saqlashdan saqlaning.",
        "Parollaringizni messenjerlar orqali birovga yubormang."
      ]
    },
    quizQuestions: [
      {
        id: 201,
        question: "Slaydga ko'ra, kuchli parol kamida nechta belgidan iborat bo'lishi shart?",
        options: [
          "Kamida 6 ta belgi",
          "Kamida 8 ta belgi",
          "Kamida 12 ta belgi",
          "Faqat 16 ta belgi"
        ],
        correctAnswer: 2,
        explanation: "Slayd 3 ga ko'ra: Parol uzunligi kamida 12 ta belgi bo'lishi shart. Qancha uzun bo'lsa, parol shuncha mustahkam bo'ladi."
      },
      {
        id: 202,
        question: "Zaif parollar (masalan: '123456', 'password') qaysi hujum turlari orqali soniyalar ichida buzilishi mumkin?",
        options: [
          "Brute-force va Dictionary (lug'at) hujumlari",
          "Faqat virusli USB disklari orqali",
          "Faqat kompyuter o'chiq bo'lganida",
          "Doxxing va Vishing hujumlari"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 ga ko'ra: Zaif parollar brute-force va dictionary hujumlari orqali avtomatik dasturlarda soniyalar ichida buziladi."
      },
      {
        id: 203,
        question: "Slaydda tavsiya etilgan 'Tasodifiy so'zlar kombinatsiyasi' (Passphrase) paroli qanday ko'rinishda bo'ladi?",
        options: [
          "admin12345",
          "kitob-osmon-qush-daryo",
          "Toshkent1995!",
          "qwertyuiop"
        ],
        correctAnswer: 1,
        explanation: "Slayd 5 da keltirilgan misol: Bir-biri bilan bog'liq bo'lmagan 4-6 ta so'zni birlashtirish (masalan: kitob-osmon-qush-daryo) juda kuchli va esda qolishi oson."
      },
      {
        id: 204,
        question: "KeePassXC dasturining Bitwarden dasturidan asosiy texnik farqi nimada?",
        options: [
          "KeePassXC parollarni internetga chiqarmasdan to'liq lokal (offline) kompyuterda shifrlab saqlaydi",
          "KeePassXC faqat smartfonlarda ishlaydi",
          "Bitwarden ma'lumotlarni shifrlamaydi",
          "Ikkala dastur ham faqat SMS kod jo'natadi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 6 ga ko'ra: KeePassXC — lokal (offline) parol menejeri, Bitwarden esa bulutli sinxronizatsiyaga ega."
      },
      {
        id: 205,
        question: "Kuchli parol tarkibida qanday belgilar aralashmasi bo'lishi kerak?",
        options: [
          "Faqat kichik harflar va raqamlar",
          "Katta va kichik harflar, raqamlar (0-9) hamda maxsus belgilar (@, #, $, !)",
          "Faqat tug'ilgan yil va ism",
          "Faqat 4 xonali PIN kod"
        ],
        correctAnswer: 1,
        explanation: "Slayd 3 ga ko'ra: Murakkablik uchun katta/kichik harflar, raqamlar va maxsus belgilar (@, #, $, !) aralashmasi shart."
      },
      {
        id: 206,
        question: "Bir xil parolni barcha ijtimoiy tarmoq va ishchi akkauntlarda ishlatish qanday oqibatga olib keladi?",
        options: [
          "Kompyuter xotirasi to'lib qoladi",
          "Internet tezligi sekinlashadi",
          "Biror bir tizim paroli sizdirilsa, barcha akkauntlaringiz zanjirli ravishda buziladi",
          "Hech qanday oqibati yo'q"
        ],
        correctAnswer: 2,
        explanation: "Slayd 7 ga ko'ra: Parollarni takrorlash barcha akkauntlarni bitta zaiflik bilan xavf ostiga qo'yadi."
      },
      {
        id: 207,
        question: "Parollarni xavfsiz saqlash va eslab qolish majburiyatidan qutulish uchun nima ishlatiladi?",
        options: [
          "Ekranga stiker qog'oz yopishtirish",
          "Do'stlarga aytib qo'yish",
          "Har kuni parolni o'chirish",
          "Parol menejerlari (Password Managers)"
        ],
        correctAnswer: 3,
        explanation: "Slayd 6 ga ko'ra: Parol menejerlari barcha murakkab parollarni shifrlangan ma'lumotlar bazasida saqlaydi."
      },
      {
        id: 208,
        question: "Akkaunt xavfsizligini ta'minlashda birinchi mudofaa chizig'i (First line of defense) nima hisoblanadi?",
        options: [
          "Monitor o'lchami",
          "Kuchli va noyob parol",
          "Klaviatura brendi",
          "Sichqoncha tezligi"
        ],
        correctAnswer: 1,
        explanation: "Slayd 2 ga ko'ra: Parol — raqamli dunyoda shaxsiy ma'lumotlar va akkauntlarning birinchi mudofaa chizig'idir."
      }
    ]
  },
  {
    id: 3,
    title: "3-Modul: Ikki Faktorli Autentifikatsiya (2FA)",
    subtitle: "2FA, Authenticator ilovalari va zaxira kalitlari",
    description: "Ushbu modulda ikki faktorli autentifikatsiya (2FA) ishlash tamoyili, Authenticator ilovalari va zaxira kalitlari haqida bilim olasiz.",
    iconName: "ShieldCheck",
    slideCount: 10,
    slideFolder: "./slides/module_3",
    overview: {
      summary: "Ikki faktorli autentifikatsiya (2FA) parolingiz o'g'irlangan taqdirda ham akkauntingizga begonalarning kirishini 99% holatda to'xtatib qoluvchi eng ishonchli himoya mexanizmidir.",
      keyRule: "Barcha Telegram, pochta va bank ilovalariga zudlik bilan 2FA (Ikki bosqichli tasdiqlash) ni yoqing!",
      dos: [
        "Google Authenticator, Microsoft Authenticator kabi vaqtga asoslangan (TOTP) dasturlardan foydalaning.",
        "Telegramda Sozlamalar > Maxfiylik > Ikki bosqichli tasdiqlash (Bulutli parol) ni yoqing.",
        "2FA yoqilganda beriladigan bir martalik zaxira kodlarini (Backup codes) xavfsiz offline joyda saqlang.",
        "Telegram va boshqa tarmoqlardagi 'Faol seanslar' (Active Sessions) ro'yxatini vaqti-vaqti bilan tekshirib turing."
      ],
      donts: [
        "Telefoningizga kelgan 2FA tasdiq kodini hech kimga va hech qachon bermang.",
        "SIM-karta o'g'irlanishi yoki klonlanishi xavfi sababli faqat SMS-kodga tayanib qolmang.",
        "Zaxira kodlarini telefon galereyasida ochiq skrinshot holatida saqlamang.",
        "Begona yoki jamoat kompyuterlarida 'Meni eslab qol' (Remember me) katakchasini belgilamang."
      ]
    },
    quizQuestions: [
      {
        id: 301,
        question: "Ikki faktorli autentifikatsiya (2FA) qaysi ikki bosqichga asoslanadi?",
        options: [
          "Faqat ikkita har xil parol",
          "Biror narsa bilasiz (parol) va biror narsaga egasiz (kod/qurilma)",
          "Faqat ikkita har xil email",
          "Ism va familiya"
        ],
        correctAnswer: 1,
        explanation: "Slayd 2 ga ko'ra: 2FA — biror narsa bilasiz (parol) va biror narsaga egasiz (bir martalik kod yoki qurilma) tamoyiliga asoslanadi."
      },
      {
        id: 302,
        question: "Slaydga ko'ra, SMS orqali keladigan 2FA kodi qanday kiber-tahdidga zaif hisoblanadi?",
        options: [
          "Faqat Wi-Fi o'chib qolishiga",
          "Faqat kompyuter ekranining sinishiga",
          "SIM-swapping va SMS ushlab qolish hujumlari",
          "Hech qanday zaifligi yo'q"
        ],
        correctAnswer: 2,
        explanation: "Slayd 4 ga ko'ra: SMS kodlar SIM-swapping va simsiz aloqada SMS ushlab qolish hujumlariga zaifdir."
      },
      {
        id: 303,
        question: "Google Authenticator va Microsoft Authenticator ilovalarining SMS dan ustunligi nimada?",
        options: [
          "Ular parollarni o'chiradi",
          "Ular pul beradi",
          "Ular SMS jo'natadi",
          "Ular offline ishlaydi va vaqtga asoslangan (TOTP) kodlarni xavfsiz generatsiya qiladi"
        ],
        correctAnswer: 3,
        explanation: "Slayd 4 ga ko'ra: Authenticator ilovalari internetga bog'lanmagan holda vaqtga asoslangan offline TOTP kodlar yaratadi."
      },
      {
        id: 304,
        question: "2FA yoqilganda beriladigan 'Zaxira kalitlari' (Backup codes) qayerda saqlanishi kerak?",
        options: [
          "Xavfsiz, offline joyda (masalan, qog'ozda yoki shifrlangan faylda)",
          "Ijtimoiy tarmoqdagi ochiq postda",
          "Telefon galereyasida ochiq rasmda",
          "Ekranga stiker qilib yopishtirib"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 ga ko'ra: Zaxira kalitlari bir martalik bo'lib, telefon yo'qolganda kirishni tiklash uchun offline xavfsiz joyda saqlanadi."
      },
      {
        id: 305,
        question: "Telegramda 2FA ni yoqish uchun ilovaning qaysi bo'limiga kiriladi?",
        options: [
          "Calls > Recent",
          "Chats > Archive",
          "Settings > Privacy and Security > Two-Step Verification (Bulutli parol)",
          "Stickers and Emoji"
        ],
        correctAnswer: 2,
        explanation: "Slayd 6 ga ko'ra: Telegramda 2FA Sozlamalar > Maxfiylik va Xavfsizlik > Ikki bosqichli tasdiqlash bo'limidan yoqiladi."
      },
      {
        id: 306,
        question: "Telegramdagi 'Active Sessions' (Faol seanslar) bo'limi nima uchun tekshirib turiladi?",
        options: [
          "Akkauntingizga kirgan notanish qurilmalarni aniqlash va ularni zudlik bilan o'chirish uchun",
          "Musiqa tinglash uchun",
          "Rasmlar hajmini kichraytirish uchun",
          "Stikerlar yuklash uchun"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 (Telegram) ga ko'ra: Faol seanslarda notanish qurilmalar yoki joylashuvlar aniqlansa, seans darhol yakunlanadi."
      },
      {
        id: 307,
        question: "Instagramda kirish joylari va qurilmalarni tekshirish uchun qaysi bo'limga kiriladi?",
        options: [
          "Edit Profile > Bio",
          "Settings > Security > Login Activity",
          "Close Friends",
          "Notifications > Pause All"
        ],
        correctAnswer: 1,
        explanation: "Slayd 7 (Instagram) ga ko'ra: Login Activity bo'limida barcha shubhali kirishlar ko'rinadi."
      },
      {
        id: 308,
        question: "Telefoningizga kutilmaganda 2FA SMS kodi kelsa va birov uni so'rasa nima qilish kerak?",
        options: [
          "SMS ni guruhga tashlash kerak",
          "Zudlik bilan berish kerak",
          "Do'stlarga ulashish kerak",
          "Hech qachon va hech kimga 2FA kodini bermaslik kerak"
        ],
        correctAnswer: 3,
        explanation: "Slayd 8 ga ko'ra: SMS 2FA kodini birovga berish akkauntdan to'liq mahrum bo'lishga olib keladi."
      }
    ]
  },
  {
    id: 4,
    title: "4-Modul: Ijtimoiy muhandislik va psixologik tuzoqlar",
    subtitle: "Manipulyatsiya usullari, shoshilinchlik va ishonchni suiiste'mol qilish",
    description: "Ushbu modulda ijtimoiy muhandislik hujumlarining 4 ta asosiy psixologik quroli va ulardan himoyalanish usullarini o'rganasiz.",
    iconName: "UserX",
    slideCount: 10,
    slideFolder: "./slides/module_4",
    overview: {
      summary: "Ijtimoiy muhandislik — texnik zaifliklardan emas, balki insonning ishonchi, qo'rquvi, shoshqaloqligi va his-tuyg'ularidan foydalanib maxfiy ma'lumotlarni o'g'irlash usulidir.",
      keyRule: "Har qanday shoshilinchlik, qo'rquv yoki soxta obro' bosimi ostida qaror chiqarmang — rasmiy manba orqali tekshiring!",
      dos: [
        "Sizni shoshiltirishganida suhbatni to'xtating va 'Menga 10 daqiqa vaqt bering' deb o'ylab ko'ring.",
        "Telefon qo'ng'irog'i (Vishing) qilgan shaxsning shaxsiyatini rasmiy tashkilot bilan bog'lanib aniqlang.",
        "Ko'chada yoki ofisda topib olingan notanish USB-fleshkalarni to'g'ridan-to'g'ri ishchi kompyuterga ulamang.",
        "Har qanday kutilmagan favqulodda xabarni sovuqqonlik bilan mantiqiy tahlil qiling."
      ],
      donts: [
        "'Hisobingiz 10 daqiqada bloklanadi!' degan qo'rqituvlarga uchib, shoshilinch ravishda ma'lumot bermang.",
        "'Siz 1,000,000 so'm yutdingiz' kabi soxta mukofot va'da qiluvchi havolalarni bosmang.",
        "O'zini IIV xodimi, bank xavfsizligi yoki IT-mutaxassis deb tanishtirganlarning har bir gapiga tekshirmasdan ishonmang.",
        "Ishxonadagi parollaringiz va xizmat ma'lumotlarini hamkasblar nomidan yozgan notanish profillarga yubormang."
      ]
    },
    quizQuestions: [
      {
        id: 401,
        question: "Ijtimoiy muhandislik (Social Engineering) ning asosiy ta'rifi nima?",
        options: [
          "Kompyuter platasini kavsharlash",
          "Texnik zaifliklardan emas, balki inson psixologiyasidan foydalanib maxfiy ma'lumotlarni qo'lga kiritish usuli",
          "Dasturlash tillarini o'rganish",
          "Tarmoq kabelini tortish"
        ],
        correctAnswer: 1,
        explanation: "Slayd 1-2 ga ko'ra: Ijtimoiy muhandislik — inson psixologiyasidan (ishonch, qo'rquv, shoshqaloqlik) foydalanadigan hujumdir."
      },
      {
        id: 402,
        question: "Psixologik qurol #1 — 'Shoshilinchlik' (Urgency) taktikasi qanday ishlaydi?",
        options: [
          "Kitob o'qishni so'raydi",
          "Sekin qaror qabul qilishni maslahat beradi",
          "'Hozir harakat qilmasangiz, 10 daqiqada o'chiriladi!' deb mantiqiy o'ylashga vaqt qoldirmaydi",
          "Faqat sovg'alar beradi"
        ],
        correctAnswer: 2,
        explanation: "Slayd 4 ga ko'ra: Shoshilinchlik vaqt bosimini sun'iy yaratib, qurbonni diqqatni chalg'itib xatoga undaydi."
      },
      {
        id: 403,
        question: "Psixologik qurol #2 — 'Qo'rquv' (Fear) ta'siri ostida inson miyasida nima sodir bo'ladi?",
        options: [
          "Parol avtomatik o'zgaradi",
          "Mantiqiy fikrlash 10 baravar oshadi",
          "Kompyuter o'zi o'chadi",
          "Miya 'kurash yoki qochish' rejimiga o'tadi va tanqidiy tahlil hamda mantiqiy fikrlash susayadi"
        ],
        correctAnswer: 3,
        explanation: "Slayd 5 ga ko'ra: Qo'rquv hissiy bosim yaratib, mantiqiy fikrlashni to'xtatadi va shoshqaloq qaror qildiradi."
      },
      {
        id: 404,
        question: "Psixologik qurol #3 — 'Ochko'zlik' (Greed) tuzog'ida qanday xabarlar ishlatiladi?",
        options: [
          "'Siz 1,000,000 so'm yutdingiz!' yoki '90% chegirma!' kabi soxta mukofot va'dalari",
          "Jarima to'lash haqida bildirishnoma",
          "Kompyuterni o'chirish buyrug'i",
          "Ob-havo ma'lumoti"
        ],
        correctAnswer: 0,
        explanation: "Slayd 6 ga ko'ra: Ochko'zlik soxta sovrinlar va katta foyda va'dasi bilan ehtiyotkorlikni susaytiradi."
      },
      {
        id: 405,
        question: "Psixologik qurol #4 — 'Obro'' (Authority) taktikasi nima?",
        options: [
          "Virus yaratish",
          "Faqat do'stlar nomidan yozish",
          "Jinoyatchi o'zini bank xodimi, IT mutaxassisi yoki davlat amaldori sifatida ko'rsatib itoat qildirishga urinadi",
          "Reklama tarqatish"
        ],
        correctAnswer: 2,
        explanation: "Slayd 7 ga ko'ra: Odamlar rasmiy shaxslarga avtomatik itoat etishga moyilligidan foydalaniladi."
      },
      {
        id: 406,
        question: "Telefon qo'ng'irog'i orqali o'zini bank yoki politsiya xodimi deb taqdim etuvchi firibgarlik turi nima deyiladi?",
        options: [
          "Vishing (Ovozli firibgarlik)",
          "Smishing",
          "Doxxing",
          "Skimming"
        ],
        correctAnswer: 0,
        explanation: "Slayd 8 ga ko'ra: Vishing — telefon qo'ng'iroqlari orqali soxta shaxsiyat bilan ma'lumot o'g'irlash."
      },
      {
        id: 407,
        question: "Zararli dastur yuklatish uchun ko'chada tashlab ketilgan shubhali USB-fleshka qaysi usulga kiradi?",
        options: [
          "Phishing",
          "Baiting (Xo'rak tashlash)",
          "Vishing",
          "Passphrase"
        ],
        correctAnswer: 1,
        explanation: "Slayd 8 ga ko'ra: Baiting — qiziqish uyg'otuvchi fiziki vositalar (USB) orqali kiberhujum qilish."
      },
      {
        id: 408,
        question: "Ijtimoiy muhandislik hujumlarining birinchi bosqichi nima hisoblanadi?",
        options: [
          "Kompyuterni buzish",
          "Zudlik bilan pul talab qilish",
          "Parolni o'zgartirish",
          "Ma'lumot yig'ish — qurbonni o'rganish va zaif joylarni aniqlash"
        ],
        correctAnswer: 3,
        explanation: "Slayd 3 ga ko'ra: Birinchi bosqich — Ma'lumot yig'ish va qurbonning zaif joylarini o'rganishdir."
      }
    ]
  },
  {
    id: 5,
    title: "5-Modul: Shaxsiy ma'lumotlar va ijtimoiy tarmoqlar xavfsizligi",
    subtitle: "Pasport, JSHSHIR (PINFL), Doxxing va maxfiylik",
    description: "Ushbu modulda pasport va PINFL ma'lumotlarini himoyalash, Doxxing xavfi hamda ijtimoiy tarmoqlardagi maxfiylik qoidalarini o'rganasiz.",
    iconName: "Lock",
    slideCount: 10,
    slideFolder: "./slides/module_5",
    overview: {
      summary: "Pasport, JSHSHIR (PINFL) va shaxsiy ma'lumotlar — sizning raqamli shaxsingizdir. Ularning tarmoqqa sizdirilishi noqonuniy kreditlar rasmiylashtirilishi va shaxsiy daxlsizlikning buzilishiga olib keladi.",
      keyRule: "Pasportingiz, PINFL raqamingiz va shaxsiy hujjatlaringizni hech qachon ochiq ijtimoiy tarmoqlarga yuklamang!",
      dos: [
        "JSHSHIR (PINFL) raqamingizni faqat rasmiy davlat portallari (my.gov.uz) da kiriting.",
        "Ijtimoiy tarmoqlarda profilingizni faqat yaqin tanishlar uchun yopiq (Private) holatga o'tkazing.",
        "Messenjerlarda telefon raqamingiz va so'nggi faollik vaqtingizni begonalar ko'rmaydigan qilib sozlang.",
        "Shaxsiy ma'lumotlaringiz sizdirilganini bilsangiz, zudlik bilan huquqni muhofaza qiluvchi organlarga murojaat qiling."
      ],
      donts: [
        "Pasport, haydovchilik guvohnomasi yoki aviachipta suratlarini Instagram, Facebook yoki Telegram kanallarga yuklamang.",
        "Shubhali so'rovnomalar yoki notanish guruhlarda o'zingiz va oilangiz haqidagi ma'lumotlarni qoldirmang.",
        "Begona shaxslarning ruxsatisiz ularning ma'lumotlarini tarmoqda tarqatmang (Doxxing jinoyat hisoblanadi).",
        "Geolokatsiyangizni (qayerda ekanligingizni) real vaqtda ochiq postlarda e'lon qilmang."
      ]
    },
    quizQuestions: [
      {
        id: 501,
        question: "JSHSHIR (PINFL) nima va u nechta raqamli noyob identifikatordir?",
        options: [
          "8 raqamli karta PIN kodi",
          "14 raqamli fuqarolik identifikatsiyalash kodi",
          "16 raqamli karta raqami",
          "4 raqamli SMS kod"
        ],
        correctAnswer: 1,
        explanation: "Slayd 3 ga ko'ra: JSHSHIR (PINFL) — har bir fuqaroga beriladigan 14 raqamli noyob identifikator."
      },
      {
        id: 502,
        question: "Pasport rasmi yoki PINFL raqami internetga tushib qolsa firibgarlar undan qanday foydalanishi mumkin?",
        options: [
          "Internet tezligini oshirish uchun",
          "Faqat ob-havoni ko'rish uchun",
          "Soxta hujjat yasash, bank kreditlari olish va shartnomalar tuzish uchun",
          "Hech narsada foydalana olmaydi"
        ],
        correctAnswer: 2,
        explanation: "Slayd 4 ga ko'ra: Pasport va PINFL soxta kredit va moliyaviy aldovlar uchun asosiy vositadir."
      },
      {
        id: 503,
        question: "'Doxxing' (Doksing) atamasi nimani anglatadi?",
        options: [
          "Dasturiy ta'minotni yangilash",
          "Kompyuterni antivirus bilan tozalash",
          "Hujjatlarni chop etish",
          "Shaxsning shaxsiy ma'lumotlarini uning roziligisiz ommaga oshkor qilish"
        ],
        correctAnswer: 3,
        explanation: "Slayd 5 ga ko'ra: Doxxing — shaxsiy ma'lumotlarni roziliksiz tarqatib ta'qib va zarar yetkazishdir."
      },
      {
        id: 504,
        question: "Doxxing hujumining salbiy oqibatlariga qaysilar kiradi?",
        options: [
          "Ta'qib, tahdidlar, psixologik zarar va obro'ga putur yetish",
          "Telefon quvvati oshishi",
          "Faqat layklar ko'payishi",
          "Internet tekin bo'lishi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 ga ko'ra: Doxxing ta'qib, tahdid va jiddiy ruhiy va jismoniy zarar keltiradi."
      },
      {
        id: 505,
        question: "Ijtimoiy tarmoqlarda eng ko'p uchraydigan xavfli xatolardan biri nima?",
        options: [
          "Profil rasmini yangilash",
          "Tungi rejimni yoqish",
          "Pasport va shaxsiy hujjatlar suratlarini ochiq postlarga yuklash",
          "Musiqa ulashish"
        ],
        correctAnswer: 2,
        explanation: "Slayd 7-9 da ko'rsatilganidek: Shaxsiy hujjatlarni internetda ulashish og'ir oqibatlarga olib keladi."
      },
      {
        id: 506,
        question: "Ijtimoiy tarmoqlardagi 'Maxfiylik Sozlamalari' (Privacy Settings) nima uchun kerak?",
        options: [
          "Post va ma'lumotlarni notanish shaxslardan yashirish va faqat do'stlar uchun cheklash",
          "Klaviatura rangini o'zgartirish",
          "Kamera sifatini oshirish",
          "Parolni bekor qilish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 (Telegram/Instagram) ga ko'ra: Maxfiylik sozlamalari shaxsiy doirani himoyalaydi."
      },
      {
        id: 507,
        question: "Shaxsiy ma'lumotlar xavfsizligining oltin qoidasi nima?",
        options: [
          "Har kuni pasportni almashtirish",
          "Pasport, PINFL va karta ma'lumotlarini hech qachon tarmoqda ochiq ulashmaslik",
          "Telefonni o'chirib qo'yish",
          "Faqat bitta paroldan foydalanish"
        ],
        correctAnswer: 1,
        explanation: "Slayd 10 ga ko'ra: Pasportingiz va PINFL raqamingizni hech kim bilan ulashmang."
      },
      {
        id: 508,
        question: "Slayddagi hayotiy misolda foydalanuvchi pasport suratini ulashgach nima sodir bo'lgan?",
        options: [
          "Hech narsa bo'lmagan",
          "Unga pul sovg'a qilishgan",
          "Akkaunti bloklangan",
          "Firibgarlar uning nomidan kredit rasmiylashtirgan"
        ],
        correctAnswer: 3,
        explanation: "Slayd 9 dagi real holat: Pasport surati tarqalgach, firibgarlar u inson nomidan kredit olgan."
      }
    ]
  },
  {
    id: 6,
    title: "6-Modul: Bank kartalari va moliyaviy kiber-firibgarlik",
    subtitle: "Skimming, OTP firibgarligi va soxta investitsiya platformalari",
    description: "Ushbu modulda ATM skimming, OTP kodlar o'g'riligi, Telegram soxta treyderlari va STOP metodikasi bo'yicha bilimlaringizni sinaysiz.",
    iconName: "CreditCard",
    slideCount: 10,
    slideFolder: "./slides/module_6",
    overview: {
      summary: "Bank kartalari va mobil to'lov ilovalari orqali pul o'g'irlash holatlari asosan foydalanuvchining ehtiyotsizligi (SMS-kodni aytish yoki soxta saytga kartani kiritish) tufayli sodir bo'ladi.",
      keyRule: "Karta orqasidagi CVV kodini va SMS orqali kelgan OTP parolini hech kimga bermang!",
      dos: [
        "Bankomatdan pul yechishdan oldin karta qabul qilgich va klaviaturada shubhali qurilma (Skimmer) yo'qligini tekshiring.",
        "Mobil bank ilovangizda kunlik sarflash limitlarini o'rnating va SMS-xabarnoma xizmatini yoqing.",
        "Har qanday to'lovdan oldin 4 bosqichli tekshiruvdan o'ting: TASDIQLA -> TAQQOSLA -> TEKSHIR -> TO'LOV QIL.",
        "Kartangiz ma'lumotlari sizdirilganini sezsangiz, zudlik bilan mobil ilovadan kartani bloklang."
      ],
      donts: [
        "Bank xodimi yoki operator so'ragan taqdirda ham OTP SMS-kodini aslo aytmang.",
        "Telegramdagi 'Kafolatlangan daromad beruvchi treyder' kanallariga pul o'tkazmang.",
        "Kartangizning old va orqa tomoni suratini messenjerlarda boshqalarga yubormang.",
        "Notanish kishilar yuborgan havola orqali 'Karta raqamingiz va kodni kiriting, pul tushirib beraman' degan aldovga ishonmang."
      ]
    },
    quizQuestions: [
      {
        id: 601,
        question: "ATM yoki POS-terminalga maxsus noqonuniy qurilma o'rnatib karta ma'lumotlarini o'g'irlash usuli nima deyiladi?",
        options: [
          "Phishing",
          "Skimming Hujumi",
          "Doxxing",
          "Passphrase"
        ],
        correctAnswer: 1,
        explanation: "Slayd 2 ga ko'ra: Skimming — ATM qurilmalariga yashirin o'quvchi o'rnatib karta va PIN nusxalashdir."
      },
      {
        id: 602,
        question: "Bank kartasining orqa tarafidagi 3 xonali maxfiy kod nima deyiladi?",
        options: [
          "OTP kod",
          "PINFL",
          "CVV / CVC kodi",
          "IP manzil"
        ],
        correctAnswer: 2,
        explanation: "Slayd 3 ga ko'ra: Karta orqasidagi CVV raqami onlayn to'lovlarni tasdiqlash vositasidir."
      },
      {
        id: 603,
        question: "Soxta investitsiya platformalari va moliyaviy piramidalarning asosiy belgilariga qaysilar kiradi?",
        options: [
          "Past daromad stavkasi",
          "Rasmiy bank litsenziyasi va davlat kafolati",
          "Faqat rasmiy davlat sayti bo'lishi",
          "Litsenziyasiz platforma, Piramidasimon tuzilma va 'Kafolatlangan daromad' va'dasi"
        ],
        correctAnswer: 3,
        explanation: "Slayd 4 ga ko'ra: Litsenziyasiz faoliyat va 100% kafolatlangan daromad va'dasi piramida belgisidir."
      },
      {
        id: 604,
        question: "Telegramdagi soxta treyderlar ishonch qozonish uchun qanday hiylalardan foydalanadi?",
        options: [
          "Soxta daromad skrinshotlari, admin firibgarligi va pullik signal guruhlari",
          "Rasmiy hujjatlar ko'rsatish",
          "Shartnoma tuzish",
          "Bank litsenziyasini taqdim etish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 ga ko'ra: Soxta skrinshotlar va fake botlar orqali odamlar aldab kelinadi."
      },
      {
        id: 605,
        question: "Firibgarlikni aniqlashning 4 bosqichli metodikasi tartibi qanday?",
        options: [
          "Faqat to'lov qil",
          "To'lov qil -> Keyin tekshir -> Afsuslan",
          "TASDIQLA -> TAQQOSLA -> TEKSHIR -> TO'LOV QIL",
          "Do'stingga ayt -> To'lov qil"
        ],
        correctAnswer: 2,
        explanation: "Slayd 7 ga ko'ra: Tasdiqla, taqqosla va tekshir bosqichlaridan o'tgachgina to'lov qilinadi."
      },
      {
        id: 606,
        question: "Qaysi va'da 100% moliyaviy firibgarlikning yaqqol belgisidir?",
        options: [
          "'100% daromad kafolati' va 'Faqat bugun ulgurib qoling!'",
          "Xavf xatarlar haqida ogohlantirish",
          "Shartnoma tuzish taklifi",
          "Bank litsenziyasi raqami"
        ],
        correctAnswer: 0,
        explanation: "Slayd 6 ga ko'ra: Hech bir qonuniy investitsiya 100% kafolatlangan daromad bermaydi."
      },
      {
        id: 607,
        question: "Bank kartasidan SMS orqali keladigan OTP bir martalik parolni kimgadir aytish mumkinmi?",
        options: [
          "Faqat bank xodimi so'rasa mumkin",
          "ASLO MUMKIN EMAS! U faqat sizga tegishli shaxsiy kalit",
          "Faqat telegram adminga mumkin",
          "Ha, agar u do'stingiz bo'lsa"
        ],
        correctAnswer: 1,
        explanation: "Slayd 9 ga ko'ra: OTP SMS kodini hech kimga berish mumkin emas."
      },
      {
        id: 608,
        question: "Onlayn kartangiz shubhali saytda osilib qolganini bilsangiz nima qilish kerak?",
        options: [
          "Saytga rahmat aytish",
          "Erta tungacha kutish",
          "Telefonni zaryadga qo'yish",
          "Mobil bank ilovasidan kartani zudlik bilan bloklash va 2FA/limit qo'yish"
        ],
        correctAnswer: 3,
        explanation: "Slayd 9 ga ko'ra: Karta limitlarini qo'yish va bloklash pul yechilishini to'xtatadi."
      }
    ]
  },
  {
    id: 7,
    title: "7-Modul: Phishing va soxta havolalarni aniqlash",
    subtitle: "Fishing turlari, soxta domenlar va STOP metodikasi",
    description: "Ushbu modulda soxta havolalarni aniqlash, domen nomlarini taqqoslash (Typosquatting) va STOP metodikasini o'rganasiz.",
    iconName: "Fish",
    slideCount: 10,
    slideFolder: "./slides/module_7",
    overview: {
      summary: "Fishing (Phishing) — rasmiy tashkilotlar (banklar, davlat idoralari, to'lov tizimlari) nomidan soxta veb-sahifalar yaratib, foydalanuvchilarning login va parollarini o'g'irlash usulidir.",
      keyRule: "Havolani bosishdan oldin uning manzilini sichqoncha bilan ko'rib chiqing va rasmiy domen bilan taqqoslang!",
      dos: [
        "Havolaning boshida 'https://' protokoli va qulf belgisi borligini, SSL sertifikati haqiqiyligini tekshiring.",
        "Domen nomidagi harflar almashinuviga (Typosquatting) e'tibor bering (masalan: payme-verify.xyz yoki cIick.uz).",
        "Fishingdan himoyalanishda 'STOP' metodikasiga amal qiling: S - To'xta, T - Tekshir, O - O'yla, P - Keyin bos.",
        "Shubhali havola kelganda sayt manzilini brauzer qidiruviga to'g'ridan-to'g'ri o'zingiz yozib kiring."
      ],
      donts: [
        "SMS, email yoki Telegramda kelgan 'Hisobingizni tasdiqlang' degan havolalarni o'ylamasdan bosmang.",
        "Domen manzili xatolari (masalan, qo'shimcha defislar yoki boshqa domen zonalari) bo'lgan saytlarga parolingizni kiritmang.",
        "Telegramda 'Telegram Premium sovg'a qilishdi' degan soxta bot havolalariga kirmang.",
        "Qisqartirilgan (bit.ly, tinyurl) noma'lum havolalarni tekshirmasdan ochmang."
      ]
    },
    quizQuestions: [
      {
        id: 701,
        question: "Fishing (Phishing) hujumining asosiy maqsadi nima?",
        options: [
          "Kompyuter ekranini tozalash",
          "Foydalanuvchilarni soxta sahifalar bilan aldab shaxsiy ma'lumotlar va parollarni o'g'irlash",
          "Faqat ob-havoni ko'rsatish",
          "Internet tezligini oshirish"
        ],
        correctAnswer: 1,
        explanation: "Slayd 2 ga ko'ra: Fishing — ishonchli tashkilotlar nomidan aldadab ma'lumot o'g'irlashdir."
      },
      {
        id: 702,
        question: "SMS xabarlari orqali zudlik bilan havolaga bosishga undaydigan fishing turi nima deyiladi?",
        options: [
          "Skimming",
          "Vishing",
          "Smishing (SMS Fishing)",
          "Doxxing"
        ],
        correctAnswer: 2,
        explanation: "Slayd 3 ga ko'ra: Smishing — SMS xabarlar orqali amalga oshiriladigan fishing hujumidir."
      },
      {
        id: 703,
        question: "Soxta saytni aniqlashda qaysi texnik belgilarga e'tibor berish shart?",
        options: [
          "Faqat kompyuter brendiga",
          "Faqat sayt rangiga",
          "Faqat brauzer versiyasiga",
          "HTTPS va qulf belgisi, SSL sertifikati, sayt dizayni va URL domen manziliga"
        ],
        correctAnswer: 3,
        explanation: "Slayd 4 ga ko'ra: HTTP = xavfli. SSL sertifikati va domen nomi sinchkovlik bilan tekshiriladi."
      },
      {
        id: 704,
        question: "Quyidagi domen juftligida qaysi biri soxta domen (Typosquatting) hisoblanadi?",
        options: [
          "payme-verify.xyz (Rasmiy domen: payme.uz)",
          "my.gov.uz",
          "id.egov.uz",
          "uzcard.uz"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 ga ko'ra: payme-verify.xyz — soxta domen, rasmiysi esa payme.uz."
      },
      {
        id: 705,
        question: "Click.uz domenini soxtalashtirishda harflar o'rnini almashtirish (cIick.uz) harfiy hiylasi nima deyiladi?",
        options: [
          "Vishing",
          "Skimming",
          "Typosquatting (Katta 'I' harfini kichik 'l' ga o'xshatish)",
          "Passphrase"
        ],
        correctAnswer: 2,
        explanation: "Slayd 5 da keltirilgan misol: cIick.uz (I -> l almashtirish) ko'z aldash uchun ishlatiladi."
      },
      {
        id: 706,
        question: "Telegramdagi fishing hujumlarining keng tarqalgan turlariga qaysilar kiradi?",
        options: [
          "Soxta botlar, Premium sovg'a aldovlari, Zararli APK/ZIP fayllar va Noma'lum qisqartirilgan havolalar",
          "Faqat ovozli xabarlar",
          "Faqat stikerlar",
          "Faqat guruh nomlari"
        ],
        correctAnswer: 0,
        explanation: "Slayd 6 ga ko'ra: Telegramda soxta botlar va Premium sovg'alar asosiy fishing vositalaridir."
      },
      {
        id: 707,
        question: "Fishingni aniqlash bo'yicha 'STOP' metodikasidagi 'T' harfi nimani anglatadi?",
        options: [
          "TO'LOV QIL",
          "TEKSHIR — URL, domen nomi va sertifikatni diqqat bilan tekshir",
          "TELEFON QIL",
          "TAKRORLA"
        ],
        correctAnswer: 1,
        explanation: "Slayd 8 ga ko'ra: S - STOP (To'xta), T - TEKSHIR, O - O'YLA/TASDIQLA, P - KEYIN BOS."
      },
      {
        id: 708,
        question: "Havolaga bormasdan (click qilmasdan) uning haqiqiy manzilini ko'rish usuli qanday?",
        options: [
          "Brauzerni yopish",
          "Havolani rasmini olish",
          "Kompyuterni o'chirish",
          "Sichqoncha ko'rsatkichini havola ustiga olib borish (Hover qilish)"
        ],
        correctAnswer: 3,
        explanation: "Slayd 4-8 ga ko'ra: Hover qilinganda brauzer pastida haqiqiy yo'naltirilgan URL ko'rinadi."
      }
    ]
  },
  {
    id: 8,
    title: "8-Modul: Troyan, APK va zararli fayllar xavfsizligi",
    subtitle: "Zararli dasturlar, APK xavflari va operatsion tizim yangilanishi",
    description: "Ushbu modulda troyan dasturlari, Android APK fayllari xavfi, Ransomware shifrlagichlar va antivirus himoyasini o'rganasiz.",
    iconName: "Bug",
    slideCount: 10,
    slideFolder: "./slides/module_8",
    overview: {
      summary: "Zararli dasturlar (Troyanlar, Ransomware shifrlagichlar, josus dasturlar) qurilmadagi ma'lumotlarni o'g'irlash, shifrlab tovlamachilik qilish yoki bank ilovalarini nazoratga olish uchun ishlatiladi.",
      keyRule: "Faqat rasmiy ilovalar do'konidan (Play Market / App Store) foydalaning va muhim fayllarni muntazam zaxiralang (Backup)!",
      dos: [
        "Android qurilmalarga ilovalarni faqat Google Play Market yoki App Store dan o'rnating.",
        "Muhim ishchi va shaxsiy hujjatlaringizning offline zaxira nusxalarini (Tashqi diskda Backup) saqlang.",
        "Operatsion tizim va antivirus dasturlarini muntazam ravishda eng so'nggi yangilanishlarga (Update) o'tkazing.",
        "Telegram orqali kelgan har qanday noma'lum `.apk`, `.exe`, `.scr` kengaytmali fayllarni darhol o'chirib tashlang."
      ],
      donts: [
        "Telegram kanallari yoki shubhali saytlardan yuklab olingan `.APK` fayllarni telefonga o'rnatmang.",
        "Ilovalar o'rnatilayotganda ularga SMS o'qish, kontaktlar va galereyaga asossiz ruxsatlar bermang.",
        "Ransomware hujumiga uchraganda firibgarlarga pul to'lamang (bu fayllar qaytarilishini kafolatlamaydi).",
        "Noma'lum fleshkalarni xizmat kompyuterlariga tekshiruvsiz ulamang."
      ]
    },
    quizQuestions: [
      {
        id: 801,
        question: "Troyan (Trojan) dasturining asosiy yashirin xususiyati nimada?",
        options: [
          "Kompyuterni tezlashtiradi",
          "O'zini zararsiz yoki foydali dastur ko'rinishida ko'rsatib, orqa fonda zararli kodni ishga tushiradi",
          "Faqat fayllarni chop etadi",
          "Ekran rangini chiroyli qiladi"
        ],
        correctAnswer: 1,
        explanation: "Slayd 4 ga ko'ra: Troyan foydali ilova niqobida kirib keladi va ma'lumotlarni o'g'irlaydi."
      },
      {
        id: 802,
        question: "Android telefonlarga Play Market bo'lmagan shubhali saytlardan `.APK` yuklash nima uchun o'ta xavfli?",
        options: [
          "Faqat batareya sekin zaryad oladi",
          "Faqat xotira to'ladi",
          "APK ichida troyan bo'lib, u SMS, galereya va bank ilovalariga yashirin ruxsat olishi mumkin",
          "Hech qanday xavfi yo'q"
        ],
        correctAnswer: 2,
        explanation: "Slayd 5 ga ko'ra: Noma'lum APK fayllar qurilmaga to'liq kiber-tovlamachilik huquqini berib qo'yishi mumkin."
      },
      {
        id: 803,
        question: "Ransomware (Tovlamachi-shifrlagich) dasturi kompyuterga tushsa nima sodir bo'ladi?",
        options: [
          "Faqat musiqani o'chiradi",
          "Windows ni yangilaydi",
          "Ekran rasmini o'zgartiradi",
          "Fayllarni shifrlab qo'yadi va ularni ochish uchun to'lov (kriptovalyuta) talab qiladi"
        ],
        correctAnswer: 3,
        explanation: "Slayd 6 ga ko'ra: Ransomware barcha hujjat va rasmlarni shifrlab blocklaydi."
      },
      {
        id: 804,
        question: "Ransomware hujumidan himoyalanishning eng birinchi va samarali chorasi nima?",
        options: [
          "Muhim ma'lumotlarning muntazam zaxira nusxalarini (Backup) offline saqlash",
          "Kompyuter simini sug'urish",
          "Parolni osonlashtirish",
          "Antivirusni o'chirib qo'yish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 6 ga ko'ra: Offline zaxira nusxasi (Backup) shifrlangan fayllarni tiklashning yagona kafolatidir."
      },
      {
        id: 805,
        question: "Operatsion tizim va antivirus dasturlarini muntazam yangilab (Update) turishning asosiy maqsadi nima?",
        options: [
          "Klaviatura chirog'ini yoqish",
          "Faqat yangi o'yinlar yuklash",
          "Tizimdagi aniqlangan yangi xavfsizlik tirqishlari (Vulnerabilities) va zaifliklarni yopish",
          "Ekran sig'imini oshirish"
        ],
        correctAnswer: 2,
        explanation: "Slayd 7 ga ko'ra: Yangilanishlar (Updates) yangi topilgan zaiflik tirqishlarini yopadi."
      },
      {
        id: 806,
        question: "Telegram yoki emailingizga kelgan shubhali `.exe`, `.vbs`, `.scr` yoki `.apk` fayllarga qanday munosabatda bo'lish kerak?",
        options: [
          "Aslo ishga tushirmaslik, tekshirish yoki darhol o'chirib tashlash",
          "Ustiga bosib ochish",
          "Do'stga jo'natish",
          "Fayl kengaytmasini ko'rmay ochish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 3-5 ga ko'ra: Bular ijro etiluvchi (executable) zararli fayllardir."
      },
      {
        id: 807,
        question: "Zararli dasturlarga qarshi raqamli mudofaa zanjirida eng birinchi o'rinda nima turadi?",
        options: [
          "Faqat antivirus narxi",
          "Insonning kiber-ongliligi va ehtiyotkorligi",
          "Kompyuter rangi",
          "Internet tezligi"
        ],
        correctAnswer: 1,
        explanation: "Slayd 10 ga ko'ra: Eng kuchli himoyachi — foydalanuvchining bilimi va hushyorligidir."
      },
      {
        id: 808,
        question: "Mobil ilovalarni yuklashda qaysi qoidaga qat'iy amal qilish shart?",
        options: [
          "SMS dagi havoladan yuklash",
          "Har qanday Telegram kanaldan yuklash",
          "Forumlardagi havola orqali yuklash",
          "Faqat rasmiy do'konlardan (Google Play Market / App Store) yuklash"
        ],
        correctAnswer: 3,
        explanation: "Slayd 9 ga ko'ra: Faqat tekshirilgan rasmiy dasturlar do'konidan ilova o'rnatish shart."
      }
    ]
  }
];

const modulesOz: ModuleData[] = [
  {
    id: 1,
    title: "1-Модул: Киберфирибгарлардан Ҳимояланишнинг 5 Олтин Қоидаси",
    subtitle: "ИИВ расмий огоҳлантируви, 5 та олтин қоида ва фирибгарларни аниқлаш",
    description: "Ўзбекистон Республикаси Ички ишлар вазирлиги томонидан ишлаб чиқилган киберфирибгарлардан ҳимояланишнинг 5 та олтин қоидаси: бегона қўнғироқлар, номаълум ҳаволалар, Телеграмдаги хавфли файллар, сохта инвестициялар ва олдиндан тўлов қилмаслик тамойиллари.",
    iconName: "ShieldAlert",
    slideCount: 10,
    slideFolder: "./slides/module_1",
    overview: {
      summary: "Ўзбекистон Республикаси ИИВ томонидан тасдиқланган ушбу 5 та олтин қоида — барча ходимлар ва фуқаролар учун киберфирибгарлик тузоқларига тушиб қолмасликнинг энг самарали амалий қўлланмасидир.",
      keyRule: "Фирибгарлар шошилтиради — сиз эса Тўхтанг, Ўйланг ва Текширинг!",
      dos: [
        "Бегона қўнғироқ бўлганда дарҳол алоқани тўхтатиб, банк ёки давлат идорасининг расмий рақамига ўзингиз қайта қўнғироқ қилинг.",
        "Ҳар қандай келган ҳаволанинг домен манзилини (URL) босишдан олдин синчковлик билан текширинг.",
        "Телеграмда нотаниш ёки таниш аккаунтдан юборилган файлларни (APK, ZIP, EXE) очишдан олдин юборувчини бошқа канал орқали тасдиқланг.",
        "Киберфирибгарликка дуч келсангиз, скриншотларни сақлаб дарҳол 1102 — ИИВ Ишонч телефонига хабар беринг."
      ],
      donts: [
        "Ҳеч кимга, ҳатто ўзини банк ходими ёки терговчи деб таништирганларга ҳам PIN-код, SMS-тасдиқ коди ва паролларни берманг.",
        "'Пулингизни 2 баробарга кўпайтириб берамиз' деган кафолатланган катта даромад ваъдаларига асло алданманг.",
        "Маҳсулот қўлингизга етиб келмасдан ва кўрмасдан туриб бегоналарга олдиндан тўлов қилманг.",
        "Номаълум Telegram ботлар ва шубҳали гуруҳлардаги ҳаволаларга банк карта маълумотларини киритманг."
      ]
    },
    quizQuestions: [
      {
        id: 101,
        question: "Киберфирибгарларнинг психологик босимига дуч келганда ИИВ томонидан тавсия этилган асосий ҳимоя тамойили қайси?",
        options: [
          "Зудлик билан пул ўтказиш",
          "Тўхтанг — Ўйланг — Текширинг",
          "Хабарни гуруҳларга тарқатиш",
          "Паролни ўчириб ташлаш"
        ],
        correctAnswer: 1,
        explanation: "Слайд 2 ва 10 га кўра: Киберхавфсизликнинг энг муҳим шиори: Тўхтанг — Ўйланг — Текширинг."
      },
      {
        id: 102,
        question: "1-Қоида: Телефон орқали ўзини банк ёки давлат органи вакили деб таништирган шахсга қандай маълумотларни айтиш қатъиян тақиқланади?",
        options: [
          "Фақат ўз исм-фамилиясини",
          "PIN-код, SMS-тасдиқ коди, пароллар ва паспорт маълумотларини",
          "Фақат об-ҳаво ҳақида",
          "Ташкилотнинг расмий манзилини"
        ],
        correctAnswer: 1,
        explanation: "Слайд 3 га кўра: Ҳеч бир расмий ташкилот телефон орқали PIN-код, SMS-код ёки паролларни сўрамайди."
      },
      {
        id: 103,
        question: "2-Қоида: Шубҳали ҳавола (линк) келганда уни босишдан олдин биринчи навбатда нима текширилиши шарт?",
        options: [
          "Компьютер монитори",
          "Ҳаволанинг домен манзили (URL) расмий сайтга мослиги",
          "Телефон қуввати",
          "Интернет тезлиги"
        ],
        correctAnswer: 1,
        explanation: "Слайд 4 га кўра: Ҳаволани босишдан олдин унинг домен манзилини синчковлик билан текшириш шарт."
      },
      {
        id: 104,
        question: "3-Қоида: Телеграмда нотаниш ёки таниш аккаунтдан 'расмингиз тарқалди', 'соврин ютдингиз' деб юборилган APK ёки ZIP файллар бўйича қатъий қоида қандай?",
        options: [
          "Файлни зудлик билан очиб кўриш",
          "Файлни очмаслик, юборувчини бошқа канал орқали тасдиқлаш ва хавфли бўлса дарҳол ўчириш",
          "Файлни барча танишларга улашиш",
          "Телефонни қайта ёқиш"
        ],
        correctAnswer: 1,
        explanation: "Слайд 5 га кўра: APK, EXE, ZIP файллар зарарли дастур бўлиши мумкин. Файлни очмасдан текшириш ва ўчириш шарт."
      },
      {
        id: 105,
        question: "4-Қоида: 'Пулингизни 2 баробарга кўпайтириб бераман', кафолатланган катта даромад ёки сохта инвестиция таклифлари ниманинг белгисидир?",
        options: [
          "Ҳақиқий давлат субсидияси",
          "Классик киберфирибгарликнинг қизил байроғи (алдов)",
          "Хайрия акцияси",
          "Банк кредити"
        ],
        correctAnswer: 1,
        explanation: "Слайд 6 га кўра: Ҳеч ким пулингизни осонликча кўпайтириб бермайди. Кафолатланган катта даромад ваъдаси — бу 100% фирибгарликдир."
      },
      {
        id: 106,
        question: "5-Қоида: Онлайн савдода (масалан, OLX ёки Telegram бозорларида) фирибгарларга алданиб қолмасликнинг олтин қоидаси қандай?",
        options: [
          "Олдиндан тўлиқ тўлов қилиш",
          "Товарни кўрмай, текширмай ва қўлга етмасдан туриб олдиндан пул ўтказмаслик",
          "Карта PIN-кодини сотувчига юбориш",
          "Ҳар қандай ҳаволага карта маълумотларини киритиш"
        ],
        correctAnswer: 1,
        explanation: "Слайд 7 га кўра: Маҳсулот қўлингизга тегмасдан туриб ҳеч қачон олдиндан тўлов қилманг."
      },
      {
        id: 107,
        question: "Фирибгарларнинг жабрланувчини тез хатога йўллашдаги асосий психологик тактикаси нима?",
        options: [
          "Китоб ўқишни тавсия қилиш",
          "'Ҳозир ҳаракат қилмасангиз ҳисобингиз блокланади' деб шошилтириш ва қўрқитиш",
          "Узоқ ўйлаб қарор чиқаришни сўраш",
          "Расм чизиш"
        ],
        correctAnswer: 1,
        explanation: "Слайд 8 га кўра: Фирибгарлар шошилтиради ва қўрқитади, мақсад — сизни текширишга вақт тополмасдан хато қилишга ундаш."
      },
      {
        id: 108,
        question: "Киберфирибгарларга дуч келганда ёки зарар кўрганда далилларни (скриншотларни) сақлаб қайси ИИВ ишонч телефонига мурожаат қилинади?",
        options: [
          "101",
          "102",
          "1102 — ИИВ Ишонч телефони",
          "104"
        ],
        correctAnswer: 2,
        explanation: "Слайд 9 га кўра: 1102 — Ўзбекистон Республикаси ИИВ Ишонч телефони орқали кибержиноятлар бўйича мурожаат қилинади."
      }
    ]
  },
  {
    id: 2,
    title: "2-Модул: Пароллар хавфсизлиги ва бошқаруви",
    subtitle: "Кучли пароллар яратиш, парол иборалари ва парол менежерлари",
    description: "Ушбу модулда кучли пароллар яратиш, парол иборалари (Passphrase) тамойили ҳамда Bitwarden ва KeePassXC каби парол менежерларидан фойдаланишни ўрганасиз.",
    iconName: "KeyRound",
    slideCount: 10,
    slideFolder: "./slides/module_2",
    overview: {
      summary: "Пароллар — шахсий ва ишчи маълумотларнинг биринчи мудофаа чизиғидир. Замонавий кибер-хавфсизликда оддий пароллардан воз кечиб, узун парол иборалари (Passphrase) ва парол менежерларига ўтиш талаб этилади.",
      keyRule: "Ҳар бир хизмат учун алоҳида, камида 12-16 белгили кучли парол ва Passphrase қўлланг!",
      dos: [
        "Парол узунлигини камида 12-16 та белги қилиб белгиланг (ҳарфлар, рақамлар ва махсус белгилар).",
        "Бир-бири билан боғлиқ бўлмаган сўзлардан иборат 'Passphrase' (масалан: kitob-osmon-qush-daryo) тамойилидан фойдаланинг.",
        "Паролларни шифрланган Bitwarden ёки offline KeePassXC парол менежерларида сақланг.",
        "Мунтазам равишда паролларингиз очиқ базаларга сиздирилмаганлигини текшириб туринг."
      ],
      donts: [
        "Туғилган йил, исм, телефон рақами ёки '123456', 'password' каби оддий паролларни ишлатманг.",
        "Бир хил паролни бир нечта турли аккаунтларда такроран ишлатманг.",
        "Паролларни компьютер мониторига стикер қилиб ёпиштириш ёки оддий блокнотда очиқ сақлашдан сақланинг.",
        "Паролларингизни мессенжерлар орқали бировга юборманг."
      ]
    },
    quizQuestions: [
      {
        id: 201,
        question: "Слайдга кўра, кучли парол камида нечта белгидан иборат бўлиши шарт?",
        options: [
          "Камида 6 та белги",
          "Камида 8 та белги",
          "Камида 12 та белги",
          "Фақат 16 та белги"
        ],
        correctAnswer: 2,
        explanation: "Слайд 3 га кўра: Парол узунлиги камида 12 та белги бўлиши шарт. Қанча узун бўлса, парол шунча мустаҳкам бўлади."
      },
      {
        id: 202,
        question: "Заиф пароллар (масалан: '123456', 'password') қайси ҳужум турлари орқали сониялар ичида бузилиши мумкин?",
        options: [
          "Brute-force ва Dictionary (луғат) ҳужумлари",
          "Фақат вирусли USB дисклари орқали",
          "Фақат компьютер ўчиқ бўлганида",
          "Doxxing ва Vishing ҳужумлари"
        ],
        correctAnswer: 0,
        explanation: "Слайд 4 га кўра: Заиф пароллар brute-force ва dictionary ҳужумлари орқали автоматик дастурларда сониялар ичида бузилади."
      },
      {
        id: 203,
        question: "Слайдда тавсия этилган 'Тасодифий сўзлар комбинацияси' (Passphrase) пароли қандай кўринишда бўлади?",
        options: [
          "admin12345",
          "kitob-osmon-qush-daryo",
          "Toshkent1995!",
          "qwertyuiop"
        ],
        correctAnswer: 1,
        explanation: "Слайд 5 да келтирилган мисол: Бир-бири билан боғлиқ бўлмаган 4-6 та сўзни бирлаштириш жуда кучли ва эсда қолиши осон."
      },
      {
        id: 204,
        question: "KeePassXC дастурининг Bitwarden дастуридан асосий техник фарқи нимада?",
        options: [
          "KeePassXC паролларни интернетга чиқармасдан тўлиқ локал (offline) компьютерда шифрлаб сақлайди",
          "KeePassXC фақат смартфонларда ишлайди",
          "Bitwarden маълумотларни шифрламайди",
          "Иккала дастур ҳам фақат SMS код жўнатади"
        ],
        correctAnswer: 0,
        explanation: "Слайд 6 га кўра: KeePassXC — локал (offline) парол менежери, Bitwarden эса булутли синхронизацияга эга."
      },
      {
        id: 205,
        question: "Кучли парол таркибида қандай белгилар аралашмаси бўлиши керак?",
        options: [
          "Фақат кичик ҳарфлар ва рақамлар",
          "Катта ва кичик ҳарфлар, рақамлар (0-9) ҳамда махсус белгилар (@, #, $, !)",
          "Фақат туғилган йил ва исм",
          "Фақат 4 хонали PIN код"
        ],
        correctAnswer: 1,
        explanation: "Слайд 3 га кўра: Мураккаблик учун катта/кичик ҳарфлар, рақамлар ва махсус белгилар аралашмаси шарт."
      },
      {
        id: 206,
        question: "Бир хил паролни барча ижтимоий тармоқ ва ишчи аккаунтларда ишлатиш қандай оқибатга олиб келади?",
        options: [
          "Компьютер хотираси тўлиб қолади",
          "Интернет тезлиги секинлашади",
          "Бирор бир тизим пароли сиздирилса, барча аккаунтларингиз занжирли равишда бузилади",
          "Ҳеч қандай оқибати йўқ"
        ],
        correctAnswer: 2,
        explanation: "Слайд 7 га кўра: Паролларни такрорлаш барча аккаунтларни битта заифлик билан хавф остига қўяди."
      },
      {
        id: 207,
        question: "Паролларни хавфсиз сақлаш ва эслаб қолиш мажбуриятидан қутулиш учун нима ишлатилади?",
        options: [
          "Экранга стикер қоғоз ёпиштириш",
          "Дўстларга айтиб қўйиш",
          "Ҳар куни паролни ўчириш",
          "Парол менежерлари (Password Managers)"
        ],
        correctAnswer: 3,
        explanation: "Слайд 6 га кўра: Парол менежерлари барча мураккаб паролларни шифрланган маълумотлар базасида сақлайди."
      },
      {
        id: 208,
        question: "Аккаунт хавфсизлигини таъминлашда биринчи мудофаа чизиғи (First line of defense) нима ҳисобланади?",
        options: [
          "Монитор ўлчами",
          "Кучли ва ноёб парол",
          "Клавиатура бренди",
          "Сичқонча тезлиги"
        ],
        correctAnswer: 1,
        explanation: "Слайд 2 га кўра: Парол — рақамли дунёда шахсий маълумотлар ва аккаунтларнинг биринчи мудофаа чизиғидир."
      }
    ]
  },
  {
    id: 3,
    title: "3-Модул: Икки Факторли Аутентификация (2FA)",
    subtitle: "2FA, Authenticator иловалари ва захира калитлари",
    description: "Ушбу модулда икки факторли аутентификация (2FA) ишлаш тамойили, Authenticator иловалари ва захира калитлари ҳақида билим оласиз.",
    iconName: "ShieldCheck",
    slideCount: 10,
    slideFolder: "./slides/module_3",
    overview: {
      summary: "Икки факторли аутентификация (2FA) паролингиз ўғирланган тақдирда ҳам аккаунтингизга бегоналарнинг киришини 99% ҳолатда тўхтатиб қолувчи энг ишончли ҳимоя механизмидир.",
      keyRule: "Барча Telegram, почта ва банк иловаларига зудлик билан 2FA (Икки босқичли тасдиқлаш) ни ёқинг!",
      dos: [
        "Google Authenticator, Microsoft Authenticator каби вақтга асосланган (TOTP) дастурлардан фойдаланинг.",
        "Telegramда Созламалар > Махфийлик > Икки босқичли тасдиқлаш (Булутли парол) ни ёқинг.",
        "2FA ёқилганда бериладиган бир марталик захира кодларини (Backup codes) хавфсиз offline жойда сақланг.",
        "Telegram ва бошқа тармоқлардаги 'Фаол сеанслар' (Active Sessions) рўйхатини вақти-вақти билан текшириб туринг."
      ],
      donts: [
        "Телефонингизга келган 2FA тасдиқ кодини ҳеч кимга ва ҳеч қачон берманг.",
        "SIM-карта ўғирланиши ёки клонланиши хавфи сабабли фақат SMS-кодга таяниб қолманг.",
        "Захира кодларини телефон галереясида очиқ скриншот ҳолатида сақламанг.",
        "Бегона ёки жамоат компьютерларида 'Мени эслаб қол' (Remember me) катакчасини белгиламанг."
      ]
    },
    quizQuestions: [
      {
        id: 301,
        question: "Икки факторли аутентификация (2FA) қайси икки босқичга асосланади?",
        options: [
          "Фақат иккита ҳар хил парол",
          "Бирор нарса биласиз (парол) ва бирор нарсага эгасиз (код/қурилма)",
          "Фақат иккита ҳар хил email",
          "Исм ва фамилия"
        ],
        correctAnswer: 1,
        explanation: "Слайд 2 га кўра: 2FA — бирор нарса биласиз (парол) ва бирор нарсага эгасиз тамойилига асосланади."
      },
      {
        id: 302,
        question: "Слайдга кўра, SMS орқали келадиган 2FA коди қандай кибер-таҳдидга заиф ҳисобланади?",
        options: [
          "Фақат Wi-Fi ўчиб қолишига",
          "Фақат компьютер экранининг синишига",
          "SIM-swapping ва SMS ушлаб қолиш ҳужумлари",
          "Ҳеч қандай заифлиги йўқ"
        ],
        correctAnswer: 2,
        explanation: "Слайд 4 га кўра: SMS кодлар SIM-swapping ва симсиз алоқада SMS ушлаб қолиш ҳужумларига заифдир."
      },
      {
        id: 303,
        question: "Google Authenticator ва Microsoft Authenticator иловаларининг SMS дан устунлиги нимада?",
        options: [
          "Улар паролларни ўчиради",
          "Улар пул беради",
          "Улар SMS жўнатади",
          "Улар offline ишлайди ва вақтга асосланган (TOTP) кодларни хавфсиз генерация қилади"
        ],
        correctAnswer: 3,
        explanation: "Слайд 4 га кўра: Authenticator иловалари интернетга боғланмаган ҳолда вақтга асосланган offline TOTP кодлар яратади."
      },
      {
        id: 304,
        question: "2FA ёқилганда бериладиган 'Захира калитлари' (Backup codes) қаерда сақланиши керак?",
        options: [
          "Хавфсиз, offline жойда (масалан, қоғозда ёки шифрланган файлда)",
          "Ижтимоий тармоқдаги очиқ постда",
          "Телефон галереясида очиқ расмда",
          "Экранга стикер қилиб ёпиштириб"
        ],
        correctAnswer: 0,
        explanation: "Слайд 5 га кўра: Захира калитлари бир марталик бўлиб, телефон йўқолганда киришни тиклаш учун offline сақланади."
      },
      {
        id: 305,
        question: "Телеграмда 2FA ни ёқиш учун илованинг қайси бўлимига кирилади?",
        options: [
          "Calls > Recent",
          "Chats > Archive",
          "Settings > Privacy and Security > Two-Step Verification (Булутли парол)",
          "Stickers and Emoji"
        ],
        correctAnswer: 2,
        explanation: "Слайд 6 га кўра: Телеграмда 2FA Созламалар > Махфийлик ва Хавфсизлик > Икки босқичли тасдиқлаш бўлимидан ёқилади."
      },
      {
        id: 306,
        question: "Телеграмдаги 'Active Sessions' (Фаол сеанслар) бўлими нима учун текшириб турилади?",
        options: [
          "Аккаунтингизга кирган нотаниш қурилмаларни аниқлаш ва уларни зудлик билан ўчириш учун",
          "Мусиқа тинглаш учун",
          "Расмлар ҳажмини кичрайтириш учун",
          "Стикерлар юклаш учун"
        ],
        correctAnswer: 0,
        explanation: "Слайд 5 га кўра: Фаол сеансларда нотаниш қурилмалар аниқланса, сеанс дарҳол якунланади."
      },
      {
        id: 307,
        question: "Instagramда кириш жойлари ва қурилмаларни текшириш учун қайси бўлимга кирилади?",
        options: [
          "Edit Profile > Bio",
          "Settings > Security > Login Activity",
          "Close Friends",
          "Notifications > Pause All"
        ],
        correctAnswer: 1,
        explanation: "Слайд 7 га кўра: Login Activity бўлимида барча шубҳали киришлар кўринади."
      },
      {
        id: 308,
        question: "Телефонингизга кутилмаганда 2FA SMS коди келса ва биров уни сўраса нима қилиш керак?",
        options: [
          "SMS ни гуруҳга ташлаш керак",
          "Зудлик билан бериш керак",
          "Дўстларга улашиш керак",
          "Ҳеч қачон ва ҳеч кимга 2FA кодини бермаслик керак"
        ],
        correctAnswer: 3,
        explanation: "Слайд 8 га кўра: SMS 2FA кодини бировга бериш аккаунтдан тўлиқ маҳрум бўлишга олиб келади."
      }
    ]
  },
  {
    id: 4,
    title: "4-Модул: Ижтимоий муҳандислик ва психологик тузоқлар",
    subtitle: "Манипуляция усуллари, шошилинчлик ва ишончни суиистеъмол қилиш",
    description: "Ушбу модулда ижтимоий муҳандислик ҳужумларининг 4 та асосий психологик қуроли ва улардан ҳимояланиш усулларини ўрганасиз.",
    iconName: "UserX",
    slideCount: 10,
    slideFolder: "./slides/module_4",
    overview: {
      summary: "Ижтимоий муҳандислик — техник заифликлардан эмас, балки инсоннинг ишончи, қўрқуви, шошқалоқлиги ва ҳис-туйғуларидан фойдаланиб махфий маълумотларни ўғирлаш усулидир.",
      keyRule: "Ҳар қандай шошилинчлик, қўрқув ёки сохта обрў босими остида қарор чиқарманг — расмий манба орқали текширинг!",
      dos: [
        "Сизни шошилтиришганида суҳбатни тўхтатинг ва 'Менга 10 дақиқа вақт беринг' деб ўйлаб кўринг.",
        "Телефон қўнғироғи (Vishing) қилган шахснинг шахсиятини расмий ташкилот билан боғланиб аниқланг.",
        "Кўчада ёки офисда топиб олинган нотаниш USB-флешкаларни тўғридан-тўғри ишчи компьютерга уламанг.",
        "Ҳар қандай кутилмаган фавқулодда хабарни совуққонлик билан мантиқий таҳлил қилинг."
      ],
      donts: [
        "'Ҳисобингиз 10 дақиқада блокланади!' деган қўрқитувларга учиб, шошилинч равишда маълумот берманг.",
        "'Сиз 1,000,000 сўм ютдингиз' каби сохта мукофот ваъда қилувчи ҳаволаларни босманг.",
        "Ўзини ИИВ ходими, банк хавфсизлиги ёки IT-мутахассис деб таништирганларнинг ҳар бир гапига текширмасдан ишонманг.",
        "Ишхонадаги паролларингиз ва хизмат маълумотларини ҳамкасблар номидан ёзган нотаниш профилларга юборманг."
      ]
    },
    quizQuestions: [
      {
        id: 401,
        question: "Ижтимоий муҳандислик (Social Engineering) нинг асосий таърифи нима?",
        options: [
          "Компьютер платасини кавшарлаш",
          "Техник заифликлардан эмас, балки инсон психологиясидан фойдаланиб махфий маълумотларни қўлга киритиш усули",
          "Дастурлаш тилларини ўрганиш",
          "Тармоқ кабелини тортиш"
        ],
        correctAnswer: 1,
        explanation: "Слайд 1-2 га кўра: Ижтимоий муҳандислик — инсон психологиясидан фойдаланадиган ҳужумдир."
      },
      {
        id: 402,
        question: "Психологик қурол #1 — 'Шошилинчлик' (Urgency) тактикаси қандай ишлайди?",
        options: [
          "Китоб ўқишни сўрайди",
          "Секин қарор қабул қилишни маслаҳат беради",
          "'Ҳозир ҳаракат қилмасангиз, 10 дақиқада ўчирилади!' деб мантиқий ўйлашга вақт қолдирмайди",
          "Фақат совғалар беради"
        ],
        correctAnswer: 2,
        explanation: "Слайд 4 га кўра: Шошилинчлик вақт босимини сунъий яратиб, қурбонни хатога ундайди."
      },
      {
        id: 403,
        question: "Психологик қурол #2 — 'Қўрқув' (Fear) таъсири остида инсон миясида нима содир бўлади?",
        options: [
          "Парол автоматик ўзгаради",
          "Мантиқий фикрлаш 10 баравар ошади",
          "Компьютер ўзи ўчади",
          "Мия 'кураш ёки қочиш' режимига ўтади ва танқидий таҳлил ҳамда мантиқий фикрлаш сусаяди"
        ],
        correctAnswer: 3,
        explanation: "Слайд 5 га кўра: Қўрқув ҳиссий босим яратиб, мантиқий фикрлашни тўхтатади."
      },
      {
        id: 404,
        question: "Психологик қурол #3 — 'Очкўзлик' (Greed) тузоғида қандай хабарлар ишлатилади?",
        options: [
          "'Сиз 1,000,000 сўм ютдингиз!' ёки '90% чегирма!' каби сохта мукофот ваъдалари",
          "Жарима тўлаш ҳақида билдиришнома",
          "Компьютерни ўчириш буйруғи",
          "Об-ҳаво маълумоти"
        ],
        correctAnswer: 0,
        explanation: "Слайд 6 га кўра: Очкўзлик сохта совринлар ва катта фойда ваъдаси билан эҳтиёткорликни сусайтиради."
      },
      {
        id: 405,
        question: "Психологик қурол #4 — 'Обрў' (Authority) тактикаси нима?",
        options: [
          "Вирус яратиш",
          "Фақат дўстлар номидан ёзиш",
          "Жиноятчи ўзини банк ходими, IT мутахассиси ёки давлат амалдори сифатида кўрсатиб итоат қилдиришга уринади",
          "Реклама тарқатиш"
        ],
        correctAnswer: 2,
        explanation: "Слайд 7 га кўра: Одамлар расмий шахсларга автоматик итоат этишга мойиллигидан фойдаланилади."
      },
      {
        id: 406,
        question: "Телефон қўнғироғи орқали ўзини банк ёки полиция ходими деб тақдим этувчи фирибгарлик тури нима дейилади?",
        options: [
          "Vishing (Овозли фирибгарлик)",
          "Smishing",
          "Doxxing",
          "Skimming"
        ],
        correctAnswer: 0,
        explanation: "Слайд 8 га кўра: Vishing — телефон қўнғироқлари орқали сохта шахсият билан маълумот ўғирлаш."
      },
      {
        id: 407,
        question: "Зарарли дастур юклатиш учун кўчада ташлаб кетилган шубҳали USB-флешка қайси усулга киради?",
        options: [
          "Phishing",
          "Baiting (Хўрак ташлаш)",
          "Vishing",
          "Passphrase"
        ],
        correctAnswer: 1,
        explanation: "Слайд 8 га кўра: Baiting — қизиқиш уйғотувчи физики воситалар (USB) орқали киберҳужум қилиш."
      },
      {
        id: 408,
        question: "Ижтимоий муҳандислик ҳужумларининг биринчи босқичи нима ҳисобланади?",
        options: [
          "Компьютерни бузиш",
          "Зудлик билан пул талаб қилиш",
          "Паролни ўзгартириш",
          "Маълумот йиғиш — қурбонни ўрганиш ва заиф жойларни аниқлаш"
        ],
        correctAnswer: 3,
        explanation: "Слайд 3 га кўра: Биринчи босқич — Маълумот йиғиш ва қурбоннинг заиф жойларини ўрганишдир."
      }
    ]
  },
  {
    id: 5,
    title: "5-Модул: Шахсий маълумотлар ва ижтимоий тармоқлар хавфсизлиги",
    subtitle: "Паспорт, ЖШШИР (PINFL), Doxxing ва махфийлик",
    description: "Ушбу модулда паспорт ва PINFL маълумотларини ҳимоялаш, Doxxing хавфи ҳамда ижтимоий тармоқлардаги махфийлик қоидаларини ўрганасиз.",
    iconName: "Lock",
    slideCount: 10,
    slideFolder: "./slides/module_5",
    overview: {
      summary: "Паспорт, ЖШШИР (PINFL) ва шахсий маълумотлар — сизнинг рақамли шахсингиздир. Уларнинг тармоққа сиздирилиши ноқонуний кредитлар расмийлаштирилиши ва шахсий дахлсизликнинг бузилишига олиб келади.",
      keyRule: "Паспортингиз, PINFL рақамингиз ва шахсий ҳужжатларингизни ҳеч қачон очиқ ижтимоий тармоқларга юкламанг!",
      dos: [
        "ЖШШИР (PINFL) рақамингизни фақат расмий давлат порталлари (my.gov.uz) да киритинг.",
        "Ижтимоий тармоқларда профилингизни фақат яқин танишлар учун ёпиқ (Private) ҳолатга ўтказинг.",
        "Мессенжерларда телефон рақамингиз ва сўнгги фаоллик вақтингизни бегоналар кўрмайдиган қилиб созланг.",
        "Шахсий маълумотларингиз сиздирилганини билсангиз, зудлик билан ҳуқуқни муҳофаза қилувчи органларга мурожаат қилинг."
      ],
      donts: [
        "Паспорт, ҳайдовчилик гувоҳномаси ёки авиачипта суратларини Instagram, Facebook ёки Telegram каналларга юкламанг.",
        "Шубҳали сўровномалар ёки нотаниш гуруҳларда ўзингиз ва оилангиз ҳақидаги маълумотларни қолдирманг.",
        "Бегона шахсларнинг рухсатисиз уларнинг маълумотларини тармоқда тарқатманг (Doxxing жиноят ҳисобланади).",
        "Геолокациянгизни (қаерда эканлигингизни) реал вақтда очиқ постларда эълон қилманг."
      ]
    },
    quizQuestions: [
      {
        id: 501,
        question: "ЖШШИР (PINFL) нима ва у нечта рақамли ноёб идентификатордир?",
        options: [
          "8 рақамли карта PIN коди",
          "14 рақамли фуқаролик идентификациялаш коди",
          "16 рақамли карта рақами",
          "4 рақамли SMS код"
        ],
        correctAnswer: 1,
        explanation: "Слайд 3 га кўра: ЖШШИР (PINFL) — ҳар бир фуқарога бериладиган 14 рақамли ноёб идентификатор."
      },
      {
        id: 502,
        question: "Паспорт расми ёки PINFL рақами интернетга тушиб қолса фирибгарлар ундан қандай фойдаланиши мумкин?",
        options: [
          "Интернет тезлигини ошириш учун",
          "Фақат об-ҳавони кўриш учун",
          "Сохта ҳужжат ясаш, банк кредитлари олиш ва шартномалар тузиш учун",
          "Ҳеч нарсада фойдалана олмайди"
        ],
        correctAnswer: 2,
        explanation: "Слайд 4 га кўра: Паспорт ва PINFL сохта кредит ва молиявий алдовлар учун асосий воситадир."
      },
      {
        id: 503,
        question: "'Doxxing' (Доксинг) атамаси нимани англатади?",
        options: [
          "Дастурий таъминотни янгилаш",
          "Компьютерни антивирус билан тозалаш",
          "Ҳужжатларни чоп этиш",
          "Шахснинг шахсий маълумотларини унинг розилигисиз оммага ошкор қилиш"
        ],
        correctAnswer: 3,
        explanation: "Слайд 5 га кўра: Doxxing — шахсий маълумотларни розиликсиз тарқатиб таъқиб ва зарар етказишдир."
      },
      {
        id: 504,
        question: "Doxxing ҳужумининг салбий оқибатларига қайсилар киради?",
        options: [
          "Таъқиб, таҳдидлар, психологик зарар ва обрўга путур етиш",
          "Телефон қуввати ошиши",
          "Фақат лайклар кўпайиши",
          "Интернет текин бўлиши"
        ],
        correctAnswer: 0,
        explanation: "Слайд 5 га кўра: Doxxing таъқиб, таҳдид ва жиддий руҳий ва жисмоний зарар келтиради."
      },
      {
        id: 505,
        question: "Ижтимоий тармоқларда энг кўп учрайдиган хавфли хатолардан бири нима?",
        options: [
          "Профил расмини янгилаш",
          "Тунги режимни ёқиш",
          "Паспорт ва шахсий ҳужжатлар суратларини очиқ постларга юклаш",
          "Мусиқа улашиш"
        ],
        correctAnswer: 2,
        explanation: "Слайд 7-9 да кўрсатилганидек: Шахсий ҳужжатларни интернетда улашиш оғир оқибатларга олиб келади."
      },
      {
        id: 506,
        question: "Ижтимоий тармоқлардаги 'Махфийлик Созламалари' (Privacy Settings) нима учун керак?",
        options: [
          "Пост ва маълумотларни нотаниш шахслардан яшириш ва фақат дўстлар учун чеклаш",
          "Клавиатура рангини ўзгартириш",
          "Камера сифатини ошириш",
          "Паролни бекор қилиш"
        ],
        correctAnswer: 0,
        explanation: "Слайд 4 га кўра: Махфийлик созламалари шахсий доирани ҳимоялайди."
      },
      {
        id: 507,
        question: "Шахсий маълумотлар хавфсизлигининг олтин қоидаси нима?",
        options: [
          "Ҳар куни паспортни алмаштириш",
          "Паспорт, PINFL ва карта маълумотларини ҳеч қачон тармоқда очиқ улашмаслик",
          "Телефонни ўчириб қўйиш",
          "Фақат битта паролдан фойдаланиш"
        ],
        correctAnswer: 1,
        explanation: "Слайд 10 га кўра: Паспортингиз ва PINFL рақамингизни ҳеч ким билан улашманг."
      },
      {
        id: 508,
        question: "Слайддаги ҳаётий мисолда фойдаланувчи паспорт суратини улашгач нима содир бўлган?",
        options: [
          "Ҳеч нарса бўлмаган",
          "Унга пул совға қилишган",
          "Аккаунти блокланган",
          "Фирибгарлар унинг номидан кредит расмийлаштирган"
        ],
        correctAnswer: 3,
        explanation: "Слайд 9 даги реал ҳолат: Паспорт сурати тарқалгач, фирибгарлар у инсон номидан кредит олган."
      }
    ]
  },
  {
    id: 6,
    title: "6-Модул: Банк карталари ва молиявий кибер-фирибгарлик",
    subtitle: "Skimming, OTP фирибгарлиги ва сохта инвестиция платформалари",
    description: "Ушбу модулда ATM skimming, OTP кодлар ўғрилиги, Telegram сохта трейдерлари ва STOP методикаси бўйича билимларингизни синайсиз.",
    iconName: "CreditCard",
    slideCount: 10,
    slideFolder: "./slides/module_6",
    overview: {
      summary: "Банк карталари ва мобил тўлов иловалари орқали пул ўғирлаш ҳолатлари асосан фойдаланувчининг эҳтиётсизлиги (SMS-кодни айтиш ёки сохта сайтга картани киритиш) туфайли содир бўлади.",
      keyRule: "Карта орқасидаги CVV кодини ва SMS орқали келган OTP паролини ҳеч кимга берманг!",
      dos: [
        "Банкоматдан пул ечишдан олдин карта қабул қилгич ва клавиатурада шубҳали қурилма (Skimmer) йўқлигини текширинг.",
        "Мобил банк иловангизда кунлик сарфлаш лимитларини ўрнатинг ва SMS-хабарнома хизматини ёқинг.",
        "Ҳар қандай тўловдан олдин 4 босқичли текширувдан ўтинг: ТАСДИҚЛА -> ТАҚҚОСЛА -> ТЕКШИР -> ТЎЛОВ ҚИЛ.",
        "Картангиз маълумотлари сиздирилганини сезсангиз, зудлик билан мобил иловадан картани блокланг."
      ],
      donts: [
        "Банк ходими ёки оператор сўраган тақдирда ҳам OTP SMS-кодини асло айтманг.",
        "Telegramдаги 'Кафолатланган даромад берувчи трейдер' каналларига пул ўтказманг.",
        "Картангизнинг олд ва орқа томони суратини мессенжерларда бошқаларга юборманг.",
        "Нотаниш кишилар юборган ҳавола орқали 'Карта рақамингиз ва кодни киритинг, пул тушириб бераман' деган алдовга ишонманг."
      ]
    },
    quizQuestions: [
      {
        id: 601,
        question: "ATM ёки POS-терминалга махсус ноқонуний қурилма ўрнатиб карта маълумотларини ўғирлаш усули нима дейилади?",
        options: [
          "Phishing",
          "Skimming Ҳужуми",
          "Doxxing",
          "Passphrase"
        ],
        correctAnswer: 1,
        explanation: "Слайд 2 га кўра: Skimming — ATM қурилмаларига яширин ўқувчи ўрнатиб карта ва PIN нусхалашдир."
      },
      {
        id: 602,
        question: "Банк картасининг орқа тарафидаги 3 хонали махфий код нима дейилади?",
        options: [
          "OTP код",
          "PINFL",
          "CVV / CVC коди",
          "IP манзил"
        ],
        correctAnswer: 2,
        explanation: "Слайд 3 га кўра: Карта орқасидаги CVV рақами онлайн тўловларни тасдиқлаш воситасидир."
      },
      {
        id: 603,
        question: "Сохта инвестиция платформалари ва молиявий пирамидаларнинг асосий белгиларига қайсилар киради?",
        options: [
          "Паст даромад ставкаси",
          "Расмий банк лицензияси ва давлат кафолати",
          "Фақат расмий давлат сайти бўлиши",
          "Лицензиясиз платформа, Пирамидасимон тузилма ва 'Кафолатланган даромад' ваъдаси"
        ],
        correctAnswer: 3,
        explanation: "Слайд 4 га кўра: Лицензиясиз фаолият ва 100% кафолатланган даромад ваъдаси пирамида белгисидир."
      },
      {
        id: 604,
        question: "Телеграмдаги сохта трейдерлар ишонч қозониш учун қандай ҳийлалардан фойдаланади?",
        options: [
          "Сохта даромад скриншотлари, админ фирибгарлиги ва пуллик сигнал гуруҳлари",
          "Расмий ҳужжатлар кўрсатиш",
          "Шартнома тузиш",
          "Банк лицензиясини тақдим этиш"
        ],
        correctAnswer: 0,
        explanation: "Слайд 5 га кўра: Сохта скриншотлар ва fake ботлар орқали одамлар алдаб келинади."
      },
      {
        id: 605,
        question: "Фирибгарликни аниқлашнинг 4 босқичли методикаси тартиби қандай?",
        options: [
          "Фақат тўлов қил",
          "Тўлов қил -> Кейин текшир -> Афсуслан",
          "ТАСДИҚЛА -> ТАҚҚОСЛА -> ТЕКШИР -> ТЎЛОВ ҚИЛ",
          "Дўстингга айт -> Тўлов қил"
        ],
        correctAnswer: 2,
        explanation: "Слайд 7 га кўра: Тасдиқла, таққосла ва текшир босқичларидан ўтгачгина тўлов қилинади."
      },
      {
        id: 606,
        question: "Қайси ваъда 100% молиявий фирибгарликнинг яққол белгисидир?",
        options: [
          "'100% даромад кафолати' ва 'Фақат бугун улгуриб қолинг!'",
          "Хавф хатарлар ҳақида огоҳлантириш",
          "Шартнома тузиш таклифи",
          "Банк лицензияси рақами"
        ],
        correctAnswer: 0,
        explanation: "Слайд 6 га кўра: Ҳеч бир қонуний инвестиция 100% кафолатланган даромад бермайди."
      },
      {
        id: 607,
        question: "Банк картасидан SMS орқали келадиган OTP бир марталик паролни кимгадир айтиш мумкинми?",
        options: [
          "Фақат банк ходими сўраса мумкин",
          "АСЛО МУМКИН ЭМАС! У фақат сизга тегишли шахсий калит",
          "Фақат телеграм админга мумкин",
          "Ҳа, агар у дўстингиз бўлса"
        ],
        correctAnswer: 1,
        explanation: "Слайд 9 га кўра: OTP SMS кодини ҳеч кимга бериш мумкин эмас."
      },
      {
        id: 608,
        question: "Онлайн картангиз шубҳали сайтда осилиб қолганини билсангиз нима қилиш керак?",
        options: [
          "Сайтга раҳмат айтиш",
          "Эрта тунгача кутиш",
          "Телефонни зарядга қўйиш",
          "Мобил банк иловасидан картани зудлик билан блоклаш ва 2FA/лимит қўйиш"
        ],
        correctAnswer: 3,
        explanation: "Слайд 9 га кўра: Карта лимитларини қўйиш ва блоклаш пул ечилишини тўхтатади."
      }
    ]
  },
  {
    id: 7,
    title: "7-Модул: Фишинг ва сохта ҳаволаларни аниқлаш",
    subtitle: "Фишинг турлари, сохта доменлар ва STOP методикаси",
    description: "Ушбу модулда сохта ҳаволаларни аниқлаш, домен номларини таққослаш (Typosquatting) ва STOP методикасини ўрганасиз.",
    iconName: "Fish",
    slideCount: 10,
    slideFolder: "./slides/module_7",
    overview: {
      summary: "Фишинг (Phishing) — расмий ташкилотлар (банклар, давлат идоралари, тўлов тизимлари) номидан сохта веб-саҳифалар яратиб, фойдаланувчиларнинг логин ва паролларини ўғирлаш усулидир.",
      keyRule: "Ҳаволани босишдан олдин унинг манзилини сичқонча билан кўриб чиқинг ва расмий домен билан таққосланг!",
      dos: [
        "Ҳаволанинг бошида 'https://' протоколи ва қулф белгиси борлигини, SSL сертификати ҳақиқийлигини текширинг.",
        "Домен номидаги ҳарфлар алмашинувига (Typosquatting) эътибор беринг (масалан: payme-verify.xyz ёки cIick.uz).",
        "Фишингдан ҳимояланишда 'STOP' методикасига амал қилинг: S - Тўхта, T - Текшир, O - Ўйла, P - Кейин бос.",
        "Шубҳали ҳавола келганда сайт манзилини браузер қидирувига тўғридан-тўғри ўзингиз ёзиб киринг."
      ],
      donts: [
        "SMS, email ёки Telegramда келган 'Ҳисобингизни тасдиқланг' деган ҳаволаларни ўйламасдан босманг.",
        "Домен манзили хатолари (масалан, қўшимча дефислар ёки бошқа домен зоналари) бўлган сайтларга паролингизни киритманг.",
        "Telegramда 'Telegram Premium совға қилишди' деган сохта бот ҳаволаларига кирманг.",
        "Қисқартирилган (bit.ly, tinyurl) номаълум ҳаволаларни текширмасдан очманг."
      ]
    },
    quizQuestions: [
      {
        id: 701,
        question: "Фишинг (Phishing) ҳужумининг асосий мақсади нима?",
        options: [
          "Компьютер экранини тозалаш",
          "Фойдаланувчиларни сохта саҳифалар билан алдаб шахсий маълумотлар ва паролларни ўғирлаш",
          "Фақат об-ҳавони кўрсатиш",
          "Интернет тезлигини ошириш"
        ],
        correctAnswer: 1,
        explanation: "Слайд 2 га кўра: Фишинг — ишончли ташкилотлар номидан алдаб маълумот ўғирлашдир."
      },
      {
        id: 702,
        question: "SMS хабарлари орқали зудлик билан ҳаволага босишга ундайдиган фишинг тури нима дейилади?",
        options: [
          "Skimming",
          "Vishing",
          "Smishing (SMS Фишинг)",
          "Doxxing"
        ],
        correctAnswer: 2,
        explanation: "Слайд 3 га кўра: Smishing — SMS хабарлар орқали амалга ошириладиган фишинг ҳужумидир."
      },
      {
        id: 703,
        question: "Сохта сайтни аниқлашда қайси техник белгиларга эътибор бериш шарт?",
        options: [
          "Фақат компьютер брендига",
          "Фақат сайт рангига",
          "Фақат браузер версиясига",
          "HTTPS ва қулф белгиси, SSL сертификати, сайт дизайни ва URL домен манзилига"
        ],
        correctAnswer: 3,
        explanation: "Слайд 4 га кўра: HTTP = хавфли. SSL сертификати ва домен номи синчковлик билан текширилади."
      },
      {
        id: 704,
        question: "Қуйидаги домен жуфтлигида қайси бири сохта домен (Typosquatting) ҳисобланади?",
        options: [
          "payme-verify.xyz (Расмий домен: payme.uz)",
          "my.gov.uz",
          "id.egov.uz",
          "uzcard.uz"
        ],
        correctAnswer: 0,
        explanation: "Слайд 5 га кўра: payme-verify.xyz — сохта домен, расмийси эса payme.uz."
      },
      {
        id: 705,
        question: "Click.uz доменини сохталаштиришда ҳарфлар ўрнини алмаштириш (cIick.uz) ҳарфий ҳийласи нима дейилади?",
        options: [
          "Vishing",
          "Skimming",
          "Typosquatting (Катта 'I' ҳарфини кичик 'l' га ўхшатиш)",
          "Passphrase"
        ],
        correctAnswer: 2,
        explanation: "Слайд 5 да келтирилган мисол: cIick.uz кўз алдаш учун ишлатилади."
      },
      {
        id: 706,
        question: "Телеграмдаги фишинг ҳужумларининг кенг тарқалган турларига қайсилар киради?",
        options: [
          "Сохта ботлар, Premium совға алдовлари, Зарарли APK/ZIP файллар ва Номаълум қисқартирилган ҳаволалар",
          "Фақат овозли хабарлар",
          "Фақат стикерлар",
          "Фақат гуруҳ номлари"
        ],
        correctAnswer: 0,
        explanation: "Слайд 6 га кўра: Телеграмда сохта ботлар ва Premium совғалар асосий фишинг воситаларидир."
      },
      {
        id: 707,
        question: "Фишингни аниқлаш бўйича 'STOP' методикасидаги 'Т' ҳарфи нимани англатади?",
        options: [
          "ТЎЛОВ ҚИЛ",
          "ТЕКШИР — URL, домен номи ва сертификатни диққат билан текшир",
          "ТЕЛЕФОН ҚИЛ",
          "ТАКРОРЛА"
        ],
        correctAnswer: 1,
        explanation: "Слайд 8 га кўра: S - STOP (Тўхта), T - ТЕКШИР, O - ЎЙЛА, P - КЕЙИН БОС."
      },
      {
        id: 708,
        question: "Ҳаволага бормасдан (click қилмасдан) унинг ҳақиқий манзилини кўриш усули қандай?",
        options: [
          "Браузерни ёпиш",
          "Ҳаволани расмини олиш",
          "Компьютерни ўчириш",
          "Сичқонча кўрсаткичини ҳавола устига олиб бориш (Hover қилиш)"
        ],
        correctAnswer: 3,
        explanation: "Слайд 4-8 га кўра: Hover қилинганда браузер пастида ҳақиқий URL кўринади."
      }
    ]
  },
  {
    id: 8,
    title: "8-Модул: Троян, APK ва зарарли файллар хавфсизлиги",
    subtitle: "Зарарли дастурлар, APK хавфлари ва операцион тизим янгиланиши",
    description: "Ушбу модулда троян дастурлари, Android APK файллари хавфи, Ransomware шифрлагичлар ва антивирус ҳимоясини ўрганасиз.",
    iconName: "Bug",
    slideCount: 10,
    slideFolder: "./slides/module_8",
    overview: {
      summary: "Зарарли дастурлар (Троянлар, Ransomware шифрлагичлар, жосус дастурлар) қурилмадаги маълумотларни ўғирлаш, шифрлаб товламачилик қилиш ёки банк иловаларини назоратга олиш учун ишлатилади.",
      keyRule: "Фақат расмий иловалар дўконидан (Play Market / App Store) фойдаланинг ва муҳим файлларни мунтазам захираланг (Backup)!",
      dos: [
        "Android қурилмаларга иловаларни фақат Google Play Market ёки App Store дан ўрнатинг.",
        "Муҳим ишчи ва шахсий ҳужжатларингизнинг offline захира нусхаларини (Ташқи дискда Backup) сақланг.",
        "Операцион тизим ва антивирус дастурларини мунтазам равишда энг сўнгги янгиланишларга (Update) ўтказинг.",
        "Telegram орқали келган ҳар қандай номаълум `.apk`, `.exe`, `.scr` кенгайтмали файлларни дарҳол ўчириб ташланг."
      ],
      donts: [
        "Telegram каналлари ёки шубҳали сайтлардан юклаб олинган `.APK` файлларни телефонга ўрнатманг.",
        "Иловалар ўрнатилаётганда уларга SMS ўқиш, контактлар ва галереяга асоссиз рухсатлар берманг.",
        "Ransomware ҳужумига учраганда фирибгарларга пул тўламанг (бу файллар қайтарилишини кафолатламайди).",
        "Номаълум флешкаларни хизмат компьютерларига текширувсиз уламанг."
      ]
    },
    quizQuestions: [
      {
        id: 801,
        question: "Троян (Trojan) дастурининг асосий яширин хусусияти нимада?",
        options: [
          "Компьютерни тезлаштиради",
          "Ўзини зарарсиз ёки фойдали дастур кўринишида кўрсатиб, орқа фонда зарарли кодни ишга туширади",
          "Фақат файлларни чоп этади",
          "Экран рангини чиройли қилади"
        ],
        correctAnswer: 1,
        explanation: "Слайд 4 га кўра: Троян фойдали илова ниқобида кириб келади ва маълумотларни ўғирлайди."
      },
      {
        id: 802,
        question: "Android телефонларга Play Market бўлмаган шубҳали сайтлардан `.APK` юклаш нима учун ўта хавфли?",
        options: [
          "Фақат батарея секин заряд олади",
          "Фақат хотира тўлади",
          "APK ичида троян бўлиб, у SMS, галерея ва банк иловаларига яширин рухсат олиши мумкин",
          "Ҳеч қандай хавфи йўқ"
        ],
        correctAnswer: 2,
        explanation: "Слайд 5 га кўра: Номаълум APK файллар қурилмага тўлиқ кибер-товламачилик ҳуқуқини бериб қўйиши мумкин."
      },
      {
        id: 803,
        question: "Ransomware (Товламачи-шифрлагич) дастури компьютергa тушса нима содир бўлади?",
        options: [
          "Фақат мусиқани ўчиради",
          "Windows ни янгилайди",
          "Экран расмини ўзгартиради",
          "Файлларни шифрлаб қўяди ва уларни очиш учун тўлов (криптовалюта) талаб қилади"
        ],
        correctAnswer: 3,
        explanation: "Слайд 6 га кўра: Ransomware барча ҳужжат ва расмларни шифрлаб блоклайди."
      },
      {
        id: 804,
        question: "Ransomware ҳужумидан ҳимояланишнинг энг биринчи ва самарали чораси нима?",
        options: [
          "Муҳим маълумотларнинг мунтазам захира нусхаларини (Backup) offline сақлаш",
          "Компьютер симини суғуриш",
          "Паролни осонлаштириш",
          "Антивирусни ўчириб қўйиш"
        ],
        correctAnswer: 0,
        explanation: "Слайд 6 га кўра: Offline захира нусхаси (Backup) шифрланган файлларни тиклашнинг ягона кафолатидир."
      },
      {
        id: 805,
        question: "Операцион тизим ва антивирус дастурларини мунтазам янгилаб (Update) туришнинг асосий мақсади нима?",
        options: [
          "Клавиатура чироғини ёқиш",
          "Фақат янги ўйинлар юклаш",
          "Тизимдаги аниқланган янги хавфсизлик тирқишлари (Vulnerabilities) ва заифликларни ёпиш",
          "Экран сиғимини ошириш"
        ],
        correctAnswer: 2,
        explanation: "Слайд 7 га кўра: Янгиланишлар (Updates) янги топилган заифлик тирқишларини ёпади."
      },
      {
        id: 806,
        question: "Телеграм ёки эмаилингизга келган шубҳали `.exe`, `.vbs`, `.scr` ёки `.apk` файлларга қандай муносабатда бўлиш керак?",
        options: [
          "Асло ишга туширмаслик, текшириш ёки дарҳол ўчириб ташлаш",
          "Устига босиб очиш",
          "Дўстга жўнатиш",
          "Файл кенгайтмасини кўрмай очиш"
        ],
        correctAnswer: 0,
        explanation: "Слайд 3-5 га кўра: Булар ижро этилувчи (executable) зарарли файллардир."
      },
      {
        id: 807,
        question: "Зарарли дастурларга қарши рақамли мудофаа занжирида энг биринчи ўринда нима туради?",
        options: [
          "Фақат антивирус нархи",
          "Инсоннинг кибер-онглилиги ва эҳтиёткорлиги",
          "Компьютер ранги",
          "Интернет тезлиги"
        ],
        correctAnswer: 1,
        explanation: "Слайд 10 га кўра: Энг кучли ҳимоячи — фойдаланувчининг билими ва ҳушёрлигидир."
      },
      {
        id: 808,
        question: "Мобил иловаларни юклашда қайси қоидага қатъий амал қилиш шарт?",
        options: [
          "SMS даги ҳаволадан юклаш",
          "Ҳар қандай Telegram каналдан юклаш",
          "Форумлардаги ҳавола орқали юклаш",
          "Фақат расмий дўконлардан (Google Play Market / App Store) юклаш"
        ],
        correctAnswer: 3,
        explanation: "Слайд 9 га кўра: Фақат текширилган расмий дастурлар дўконидан илова ўрнатиш шарт."
      }
    ]
  }
];

const modulesRu: ModuleData[] = [
  {
    id: 1,
    title: "1-Модуль: 5 Золотых Правил Защиты от Кибермошенников",
    subtitle: "Официальное предупреждение МВД, 5 правил и выявление мошенников",
    description: "5 золотых правил защиты от кибермошенников, разработанных Министерством внутренних дел Республики Узбекистан: звонки от незнакомцев, подозрительные ссылки, опасные файлы в Telegram, псевдоинвестиции и отказ от предоплаты.",
    iconName: "ShieldAlert",
    slideCount: 10,
    slideFolder: "./slides/module_1",
    overview: {
      summary: "Утвержденные МВД Республики Узбекистан 5 золотых правил кибербезопасности — это универсальный фундаментальный щит для каждого сотрудника и гражданина против любых видов цифрового мошенничества и социальной инженерии.",
      keyRule: "Мошенники торопят — вы же Остановитесь, Подумайте и Проверьте!",
      dos: [
        "При любом подозрительном звонке немедленно завершите разговор и самостоятельно перезвоните по официальному номеру ведомства или банка.",
        "Внимательно проверяйте адрес доменного имени (URL) перед каждым переходом по внешним ссылкам.",
        "При получении файлов в мессенджерах от знакомых или незнакомцев перепроверяйте подлинность отправки по альтернативному каналу связи.",
        "При столкновении с мошенниками сохраните скриншоты переписки и немедленно обратитесь по номеру 1102 (горячая линия МВД РУз)."
      ],
      donts: [
        "Категорически запрещено сообщать кому-либо PIN-коды, пароли и разовые SMS-коды подтверждения (даже сотрудникам банка или правоохранителям).",
        "Не переводите средства в сомнительные инвестиционные проекты с обещаниями гарантированного удвоения капитала.",
        "Никогда не вносите предоплату продавцам на онлайн-площадках до фактического получения и осмотра товара.",
        "Не вводите реквизиты банковских карт по ссылкам из непроверенных Telegram-ботов и рекламных групп."
      ]
    },
    quizQuestions: [
      {
        id: 101,
        question: "Какой главный принцип защиты рекомендует МВД при столкновении с психологическим давлением кибермошенников?",
        options: [
          "Срочно перевести деньги",
          "Остановитесь — Подумайте — Проверьте",
          "Разослать сообщение по группам",
          "Удалить пароль"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайдам 2 и 10: Главный девиз кибербезопасности: Остановитесь — Подумайте — Проверьте."
      },
      {
        id: 102,
        question: "Правило 1: Какую информацию категорически запрещено сообщать лицу, представившемуся сотрудником банка или госоргана по телефону?",
        options: [
          "Только свои имя и фамилию",
          "PIN-код, SMS-код подтверждения, пароли и паспортные данные",
          "Только прогноз погоды",
          "Официальный адрес организации"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 3: Ни одна официальная организация никогда не запрашивает PIN-код, SMS-код или пароли по телефону."
      },
      {
        id: 103,
        question: "Правило 2: Что необходимо проверить в первую очередь перед переходом по подозрительной ссылке?",
        options: [
          "Монитор компьютера",
          "Соответствие доменного адреса (URL) официальному сайту",
          "Уровень заряда телефона",
          "Скорость интернета"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 4: Перед переходом обязательно внимательно проверьте доменное имя ссылки."
      },
      {
        id: 104,
        question: "Правило 3: Каково строгое правило в отношении файлов APK или ZIP, присланных в Telegram под предлогом 'ваше фото слили' или 'вы выиграли приз'?",
        options: [
          "Немедленно открыть файл",
          "Не открывать файл, перепроверить отправителя по другому каналу и при подозрении сразу удалить",
          "Переслать файл всем контактам",
          "Перезагрузить телефон"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 5: Файлы APK, EXE, ZIP могут быть вредоносными программами. Их нельзя открывать."
      },
      {
        id: 105,
        question: "Правило 4: Признаком чего являются предложения 'удвоить ваши деньги', гарантированная сверхприбыль или инвестиционные схемы?",
        options: [
          "Реальной государственной субсидии",
          "Классического признака мошенничества (обмана)",
          "Благотворительной акции",
          "Банковского кредита"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 6: Никто не будет легко приумножать ваши деньги. Обещание гарантированной сверхприбыли — это 100% мошенничество."
      },
      {
        id: 106,
        question: "Правило 5: Каково золотое правило безопасности при онлайн-покупках (например, на OLX или в Telegram)?",
        options: [
          "Вносить 100% предоплату",
          "Не переводить деньги до тех пор, пока товар не проверен и не получен лично в руки",
          "Отправить PIN-код карты продавцу",
          "Вводить данные карты по любой присланной ссылке"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 7: Никогда не вносите предоплату, пока товар не окажется у вас в руках."
      },
      {
        id: 107,
        question: "В чем заключается основная психологическая тактика мошенников для принуждения жертвы к ошибке?",
        options: [
          "Рекомендация почитать книгу",
          "Искусственная спешка и запугивание ('Если не сделаете сейчас — счет заблокируют!')",
          "Просьба долго подумать перед решением",
          "Рисование картинок"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 8: Мошенники торопят и запугивают, чтобы жертва не успела проверить информацию и совершила ошибку."
      },
      {
        id: 108,
        question: "По какому номеру горячей линии МВД следует обращаться при столкновении с кибермошенниками, сохранив скриншоты доказательств?",
        options: [
          "101",
          "102",
          "1102 — Горячая линия МВД РУз",
          "104"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 9: 1102 — телефон доверия МВД Республики Узбекистан по вопросам киберпреступлений."
      }
    ]
  },
  {
    id: 2,
    title: "2-Модуль: Безопасность и управление паролями",
    subtitle: "Создание надежных паролей, парольные фразы и менеджеры паролей",
    description: "В этом модуле вы научитесь создавать надежные пароли, применять принцип парольных фраз (Passphrase) и использовать менеджеры паролей Bitwarden и KeePassXC.",
    iconName: "KeyRound",
    slideCount: 10,
    slideFolder: "./slides/module_2",
    overview: {
      summary: "Пароли являются первой линией обороны цифровых данных. В современной кибербезопасности простой пароль уязвим, поэтому стандартом стало использование длинных парольных фраз (Passphrase) и специализированных менеджеров паролей.",
      keyRule: "Используйте для каждого сервиса уникальный пароль длиной не менее 12-16 символов или кодовую фразу!",
      dos: [
        "Устанавливайте длину паролей от 12 до 16 символов, сочетая заглавные и строчные буквы, цифры и спецсимволы.",
        "Используйте мнемонические фразы из 4-6 несвязанных слов (например: kitob-osmon-qush-daryo).",
        "Храните все сложные пароли в зашифрованных хранилищах Bitwarden или локальном KeePassXC.",
        "Периодически проверяйте свои учетные записи на предмет утечек в открытые базы данных."
      ],
      donts: [
        "Не используйте даты рождения, имена родственников, номера телефонов и простые последовательности ('123456', 'qwerty').",
        "Категорически запрещено дублировать один и тот же пароль для нескольких рабочих и личных аккаунтов.",
        "Не записывайте пароли на стикерах, приклеенных к монитору, и не храните их в открытых текстовых файлах.",
        "Никогда не пересылайте пароли в открытых сообщениях мессенджеров и соцсетей."
      ]
    },
    quizQuestions: [
      {
        id: 201,
        question: "Согласно слайдам, из скольких символов минимум должен состоять надежный пароль?",
        options: [
          "Минимум 6 символов",
          "Минимум 8 символов",
          "Минимум 12 символов",
          "Только 16 символов"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 3: Длина пароля должна составлять не менее 12 символов."
      },
      {
        id: 202,
        question: "С помощью каких атак слабые пароли (например: '123456', 'password') взламываются за считанные секунды?",
        options: [
          "Атаки методом подбора (Brute-force) и по словарю (Dictionary)",
          "Только через вирусные USB-флешки",
          "Только когда компьютер выключен",
          "Атаки Doxxing и Vishing"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 4: Слабые пароли мгновенно взламываются автоматизированными программами методом Brute-force и по словарю."
      },
      {
        id: 203,
        question: "Как выглядит рекомендуемая в слайдах 'Парольная фраза' (Passphrase)?",
        options: [
          "admin12345",
          "kitob-osmon-qush-daryo (книга-небо-птица-река)",
          "Toshkent1995!",
          "qwertyuiop"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 5: Сочетание 4-6 несвязанных слов крайне устойчиво к взлому и легко запоминается."
      },
      {
        id: 204,
        question: "В чем главное техническое отличие KeePassXC от Bitwarden?",
        options: [
          "KeePassXC хранит пароли полностью локально (офлайн) в зашифрованном файле на компьютере",
          "KeePassXC работает только на смартфонах",
          "Bitwarden не шифрует данные",
          "Обе программы лишь отправляют SMS"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 6: KeePassXC — автономный локальный менеджер, а Bitwarden поддерживает облачную синхронизацию."
      },
      {
        id: 205,
        question: "Какая комбинация символов должна присутствовать в надежном пароле?",
        options: [
          "Только строчные буквы и цифры",
          "Заглавные и строчные буквы, цифры (0-9) и спецсимволы (@, #, $, !)",
          "Только год рождения и имя",
          "Только 4-значный PIN-код"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 3: Для максимальной сложности необходима смесь заглавных/строчных букв, цифр и спецсимволов."
      },
      {
        id: 206,
        question: "К чему приводит использование одного и того же пароля во всех аккаунтах?",
        options: [
          "Переполняется память компьютера",
          "Замедляется скорость интернета",
          "При утечке пароля в одном сервисе злоумышленники получают доступ ко всем вашим аккаунтам",
          "Никаких последствий нет"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 7: Повторное использование паролей подвергает опасности все учетные записи из-за единой уязвимости."
      },
      {
        id: 207,
        question: "Что используется для безопасного хранения сложных паролей без необходимости их запоминания?",
        options: [
          "Наклейка стикеров на монитор",
          "Сообщение паролей друзьям",
          "Ежедневное удаление паролей",
          "Менеджеры паролей (Password Managers)"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 6: Менеджеры паролей надежно хранят все уникальные пароли в зашифрованном хранилище."
      },
      {
        id: 208,
        question: "Что является первой линией обороны (First line of defense) учетной записи в цифровом мире?",
        options: [
          "Размер монитора",
          "Надежный и уникальный пароль",
          "Бренд клавиатуры",
          "Скорость мыши"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 2: Пароль — это первая линия защиты ваших данных и учетных записей."
      }
    ]
  },
  {
    id: 3,
    title: "3-Модуль: Двухфакторная аутентификация (2FA)",
    subtitle: "2FA, приложения Authenticator и резервные ключи",
    description: "В этом модуле вы изучите принцип работы 2FA, приложения генерации кодов Authenticator и использование резервных кодов доступа.",
    iconName: "ShieldCheck",
    slideCount: 10,
    slideFolder: "./slides/module_3",
    overview: {
      summary: "Двухфакторная аутентификация (2FA) предотвращает несанкционированный вход в 99% случаев, даже если злоумышленники узнали ваш основной пароль.",
      keyRule: "Обязательно включите двухэтапную аутентификацию (2FA) на всех аккаунтах Telegram, почте и в онлайн-банках!",
      dos: [
        "Используйте приложения генерации временных кодов (Google Authenticator, Microsoft Authenticator) вместо SMS.",
        "Включите в Telegram меню 'Настройки' -> 'Конфиденциальность' -> 'Двухэтапная аутентификация' (облачный пароль).",
        "Сохраните резервные коды восстановления (Backup codes) в надежном офлайн месте на случай утери телефона.",
        "Периодически проверяйте меню 'Активные сеансы' (Active Sessions) и завершайте незнакомые подключения."
      ],
      donts: [
        "Никогда и никому не диктуйте поступающие на телефон одноразовые коды авторизации.",
        "Не полагайтесь исключительно на SMS из-за риска перехвата радиосигнала и клонирования SIM-карт.",
        "Не сохраняйте скриншоты резервных кодов в открытой галерее смартфона или облаке.",
        "Не нажимайте 'Запомнить меня' на чужих или общедоступных рабочих компьютерах."
      ]
    },
    quizQuestions: [
      {
        id: 301,
        question: "На каких двух факторах основана двухфакторная аутентификация (2FA)?",
        options: [
          "Только два разных пароля",
          "То, что вы знаете (пароль), и то, чем владеете (одноразовый код/устройство)",
          "Только две разные электронные почты",
          "Имя и фамилия"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 2: 2FA базируется на знании пароля и владении подтверждающим устройством/кодом."
      },
      {
        id: 302,
        question: "К каким киберугрозам уязвимы SMS-коды подтверждения 2FA?",
        options: [
          "Только к отключению Wi-Fi",
          "Только к поломке экрана",
          "К атакам перехвата SMS и подмены SIM-карты (SIM-swapping)",
          "SMS не имеют уязвимостей"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 4: SMS-сообщения уязвимы к перехвату по протоколам связи и атакам клонирования SIM-карт."
      },
      {
        id: 303,
        question: "В чем преимущество приложений Google Authenticator и Microsoft Authenticator перед SMS?",
        options: [
          "Они удаляют пароли",
          "Они платят деньги",
          "Они отправляют SMS",
          "Они работают полностью офлайн и генерируют временные коды (TOTP) без передачи по сети"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 4: Приложения-аутентификаторы генерируют локальные TOTP-коды автономно без сети."
      },
      {
        id: 304,
        question: "Где следует сохранять резервные коды (Backup codes), выдаваемые при включении 2FA?",
        options: [
          "В надежном офлайн месте (на бумаге или в зашифрованном файле)",
          "В открытом посте в соцсетях",
          "В открытом фото в галерее смартфона",
          "На стикере, наклеенном на экран"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 5: Резервные коды используются для восстановления доступа и должны храниться в безопасном месте."
      },
      {
        id: 305,
        question: "В каком разделе настроек Telegram включается двухэтапная аутентификация (2FA / Облачный пароль)?",
        options: [
          "Звонки > Недавние",
          "Чаты > Архив",
          "Настройки > Конфиденциальность > Двухэтапная аутентификация (Облачный пароль)",
          "Стикеры и эмодзи"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 6: В Telegram 2FA настраивается в меню 'Конфиденциальность' -> 'Двухэтапная аутентификация'."
      },
      {
        id: 306,
        question: "Зачем необходимо периодически проверять раздел 'Активные сеансы' (Active Sessions) в Telegram?",
        options: [
          "Чтобы выявить неизвестные устройства и немедленно завершить подозрительные сеансы",
          "Для прослушивания музыки",
          "Для сжатия размера фотографий",
          "Для загрузки стикеров"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 5: Проверка активных сеансов позволяет обнаружить несанкционированный вход злоумышленников."
      },
      {
        id: 307,
        question: "В каком разделе Instagram можно проверить список устройств и мест входа в ваш аккаунт?",
        options: [
          "Редактировать профиль",
          "Настройки > Безопасность > Входы в аккаунт (Login Activity)",
          "Близкие друзья",
          "Уведомления > Приостановить все"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 7: В разделе 'Входы в аккаунт' (Login Activity) отображается вся история активности."
      },
      {
        id: 308,
        question: "Что делать, если вам неожиданно пришел SMS-код 2FA и кто-то просит его продиктовать?",
        options: [
          "Скинуть SMS в группу",
          "Срочно продиктовать код",
          "Переслать знакомым",
          "Никогда и ни при каких обстоятельствах не сообщать никому коды подтверждения"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 8: Передача кода подтверждения третьим лицам приводит к полной потере доступа к аккаунту."
      }
    ]
  },
  {
    id: 4,
    title: "4-Модуль: Социальная инженерия и психологические ловушки",
    subtitle: "Методы манипуляции, срочность и злоупотребление доверием",
    description: "В этом модуле вы изучите 4 главных психологических оружия атак социальной инженерии и способы защиты от манипуляций.",
    iconName: "UserX",
    slideCount: 10,
    slideFolder: "./slides/module_4",
    overview: {
      summary: "Социальная инженерия — это манипулирование психологией человека (страхом, спешкой, жаждой выгоды или авторитетом) с целью выманивания конфиденциальных данных и обхода технических средств защиты.",
      keyRule: "Не принимайте поспешных решений под давлением эмоций — всегда берите паузу и перепроверяйте информацию!",
      dos: [
        "При возникновении ощущения искусственной спешки возьмите паузу: 'Мне нужно время проверить информацию'.",
        "Проверяйте личность звонящего по официальным справочным телефонам государственных ведомств или банков.",
        "Передавайте найденные на территории организации неизвестные USB-накопители сотрудникам отдела кибербезопасности.",
        "Сохраняйте хладнокровие и критическое мышление при получении любых экстренных известий."
      ],
      donts: [
        "Не поддавайтесь на угрозы немедленной блокировки счетов или уголовного преследования по телефону.",
        "Не переходите по ссылкам с обещаниями внезапных денежных призов или грантов.",
        "Не доверяйте слепо звонящим, даже если они обращаются по званию, имени и отчеству.",
        "Не разглашайте рабочие учетные данные и структуру внутренней сети в телефонных разговорах."
      ]
    },
    quizQuestions: [
      {
        id: 401,
        question: "Что является основным определением социальной инженерии (Social Engineering)?",
        options: [
          "Пайка компьютерных плат",
          "Метод получения конфиденциальной информации путем манипулирования психологией человека, а не взлома систем",
          "Изучение языков программирования",
          "Прокладка сетевого кабеля"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайдам 1-2: Социальная инженерия эксплуатирует человеческие эмоции (страх, доверие, спешку)."
      },
      {
        id: 402,
        question: "Как работает психологическое оружие №1 — тактика 'Срочности' (Urgency)?",
        options: [
          "Предлагает почитать книгу",
          "Советует медленно обдумать решение",
          "Создает иллюзию дефицита времени ('Действуйте прямо сейчас, иначе заблокируют через 10 минут!'), отключая логику",
          "Дарит подарки"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 4: Срочность создает искусственное давление, провоцируя жертву на необдуманные действия."
      },
      {
        id: 403,
        question: "Что происходит в мозге человека под воздействием психологического оружия №2 — 'Страха' (Fear)?",
        options: [
          "Пароль меняется автоматически",
          "Логическое мышление усиливается в 10 раз",
          "Компьютер выключается сам",
          "Мозг переходит в режим 'бей или беги', критический анализ и логика притупляются"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 5: Страх блокирует рациональное мышление и вынуждает подчиниться требованиям злоумышленника."
      },
      {
        id: 404,
        question: "Какие сообщения используются в психологической ловушке №3 — 'Жадность' (Greed)?",
        options: [
          "Обещания легких денег: 'Вы выиграли 1,000,000 сум!' или 'Скидка 90% только сегодня!'",
          "Уведомления об оплате штрафа",
          "Команда выключения компьютера",
          "Прогноз погоды"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 6: Жадность и жажда легкой наживы усыпляют бдительность и осторожность."
      },
      {
        id: 405,
        question: "В чем суть тактики №4 — 'Авторитет' (Authority)?",
        options: [
          "Создание вирусов",
          "Переписка только от имени друзей",
          "Злоумышленник выдает себя за сотрудника банка, службы безопасности или госоргана, требуя подчинения",
          "Рассылка спама"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 7: Эксплуатируется склонность людей автоматически подчиняться официальным лицам."
      },
      {
        id: 406,
        question: "Как называется вид телефонного мошенничества с выдачей себя за сотрудников банка или полиции?",
        options: [
          "Вишинг (Vishing — голосовой фишинг)",
          "Смишинг (Smishing)",
          "Доксинг (Doxxing)",
          "Скимминг (Skimming)"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 8: Вишинг — кража данных через телефонные звонки с использованием поддельных личностей."
      },
      {
        id: 407,
        question: "К какому методу относится подброшенная на улице зараженная USB-флешка для привлечения любопытства?",
        options: [
          "Фишинг",
          "Бейтинг (Baiting — ловля на приманку)",
          "Вишинг",
          "Парольная фраза"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 8: Бейтинг — использование физических носителей (USB) в качестве приманки для заражения сети."
      },
      {
        id: 408,
        question: "Что является первым этапом атак социальной инженерии?",
        options: [
          "Взлом компьютера",
          "Срочное требование денег",
          "Смена пароля",
          "Сбор информации — изучение жертвы и поиск ее уязвимых мест"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 3: Первый шаг — сбор разведывательной информации о жертве через открытые источники."
      }
    ]
  },
  {
    id: 5,
    title: "5-Модуль: Защита персональных данных и безопасность в соцсетях",
    subtitle: "Паспортные данные, ПИНФЛ (JSHSHIR), Доксинг и приватность",
    description: "В этом модуле вы научитесь защищать паспортные данные и ПИНФЛ, узнаете об угрозе доксинга и правилах конфиденциальности в соцсетях.",
    iconName: "Lock",
    slideCount: 10,
    slideFolder: "./slides/module_5",
    overview: {
      summary: "Паспортные данные и ПИНФЛ (JSHSHIR) — это ваш цифровой идентификатор. Их компрометация позволяет преступникам оформлять кредиты, поддельные контракты и осуществлять шантаж.",
      keyRule: "Никогда не публикуйте фотографии паспорта, ПИНФЛ и служебных удостоверений в интернете!",
      dos: [
        "Вводите номер ПИНФЛ исключительно на защищенных государственных ресурсах (my.gov.uz, id.egov.uz).",
        "Настройте приватность своих профилей в соцсетях, ограничив доступ только проверенным контактам.",
        "Скройте отображение своего номера телефона и сетевого статуса в настройках мессенджера Telegram.",
        "Немедленно обращайтесь в органы внутренних дел при обнаружении несанкционированного использования ваших данных."
      ],
      donts: [
        "Не выкладывайте фото билетов с QR-кодами, служебных пропусков и паспортов в социальные сети.",
        "Не участвуйте в сомнительных интернет-опросах, требующих указания персональных сведений.",
        "Не распространяйте чужие персональные данные без согласия владельца (доксинг преследуется по закону).",
        "Не делитесь геолокацией своего дома и постоянных служебных маршрутов в открытых постах."
      ]
    },
    quizQuestions: [
      {
        id: 501,
        question: "Что такое ПИНФЛ (JSHSHIR) и из скольких цифр состоит этот уникальный идентификатор гражданина?",
        options: [
          "8-значный PIN-код карты",
          "14-значный персональный идентификационный номер физического лица",
          "16-значный номер карты",
          "4-значный SMS-код"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 3: ПИНФЛ — это уникальный 14-значный номер каждого гражданина."
      },
      {
        id: 502,
        question: "Как мошенники могут использовать фото паспорта или номер ПИНФЛ при утечке в сеть?",
        options: [
          "Для ускорения интернета",
          "Только для просмотра погоды",
          "Для оформления онлайн-микрозаймов, кредитов, поддельных договоров и сим-карт",
          "Никак не могут использовать"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 4: Паспортные данные и ПИНФЛ используются злоумышленниками для мошеннических кредитов и финансовых афер."
      },
      {
        id: 503,
        question: "Что означает термин 'Доксинг' (Doxxing)?",
        options: [
          "Обновление программного обеспечения",
          "Проверка компьютера антивирусом",
          "Печать документов",
          "Публикация персональных данных человека в открытом доступе без его согласия с целью травли или давления"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 5: Доксинг — это несанкционированная деанонимизация и слив личных данных человека в сеть."
      },
      {
        id: 504,
        question: "Что относится к негативным последствиям доксинг-атаки?",
        options: [
          "Преследование, угрозы, психологический ущерб и подрыв репутации",
          "Увеличение заряда батареи",
          "Рост количества лайков",
          "Бесплатный интернет"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 5: Доксинг влечет за собой шантаж, угрозы, физическую опасность и разрушение репутации."
      },
      {
        id: 505,
        question: "Какая распространенная ошибка в социальных сетях представляет наибольшую угрозу безопасности?",
        options: [
          "Обновление фото профиля",
          "Включение темного режима",
          "Публикация в открытых постах фото паспорта, билетов, банковских карт и документов",
          "Репост музыки"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайдам 7-9: Выкладывание документов в соцсети предоставляет готовые данные злоумышленникам."
      },
      {
        id: 506,
        question: "Для чего нужны 'Настройки конфиденциальности' (Privacy Settings) в мессенджерах и соцсетях?",
        options: [
          "Чтобы скрыть свои посты, номер телефона и личные данные от посторонних лиц",
          "Для смены цвета клавиатуры",
          "Для улучшения камеры",
          "Для отмены пароля"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 4: Настройки приватности ограничивают доступ посторонних к вашим персональным данным."
      },
      {
        id: 507,
        question: "Каково золотое правило защиты персональных данных?",
        options: [
          "Каждый день менять паспорт",
          "Никогда и ни при каких условиях не публиковать фото паспорта, ПИНФЛ и данные карт в открытом доступе",
          "Выключить телефон навсегда",
          "Использовать один пароль везде"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 10: Берегите паспорт и ПИНФЛ как зеницу ока — не делитесь ими в сети."
      },
      {
        id: 508,
        question: "Что произошло в реальном примере из слайда, когда пользователь опубликовал фото паспорта в сети?",
        options: [
          "Ничего не произошло",
          "Ему подарили деньги",
          "Его аккаунт заблокировали",
          "Мошенники оформили на его имя онлайн-кредиты в микрофинансовых организациях"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 9: По фото паспорта мошенники оформили незаконные финансовые займы."
      }
    ]
  },
  {
    id: 6,
    title: "6-Модуль: Банковские карты и финансовое кибермошенничество",
    subtitle: "Скимминг, мошенничество с OTP и фейковые инвестиционные платформы",
    description: "В этом модуле вы изучите банкоматный скимминг, кражу кодов OTP, схемы лжетрейдеров в Telegram и методику STOP.",
    iconName: "CreditCard",
    slideCount: 10,
    slideFolder: "./slides/module_6",
    overview: {
      summary: "Хищения с банковских карт происходят в подавляющем большинстве случаев из-за передачи одноразового SMS-кода (OTP) или ввода данных карты на поддельных платежных шлюзах.",
      keyRule: "Никогда и никому не передавайте CVV-код на обороте карты и разовые SMS-пароли подтверждения операций!",
      dos: [
        "Перед снятием наличных в банкомате осмотрите картоприемник и клавиатуру на предмет накладных скиммеров.",
        "Установите в мобильном банке суточные лимиты на интернет-платежи и подключите SMS-информирование.",
        "Применяйте 4-этапный алгоритм: ПОДТВЕРДИ -> СРАВНИ -> ПРОВЕРЬ -> ОПЛАТИ.",
        "При малейшем подозрении на компрометацию немедленно заблокируйте карту через приложение банка."
      ],
      donts: [
        "Не сообщайте SMS-коды подтверждения даже лицам, представляющимся службой безопасности банка.",
        "Не переводите средства псевдотрейдерам в Telegram, обещающим гарантированное приумножение депозита.",
        "Не пересылайте фотографии лицевой и оборотной стороны карты в мессенджерах.",
        "Не вводите реквизиты карты на сомнительных сайтах для получения мнимых 'компенсаций' или 'выигрышей'."
      ]
    },
    quizQuestions: [
      {
        id: 601,
        question: "Как называется способ кражи данных карты путем установки шпионских накладок на банкомат (ATM) или POS-терминал?",
        options: [
          "Фишинг",
          "Скимминг (Skimming)",
          "Доксинг",
          "Парольная фраза"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 2: Скимминг — это аппаратное считывание магнитной полосы и PIN-кода через накладки на банкомат."
      },
      {
        id: 602,
        question: "Как называется 3-значный секретный защитный код на обратной стороне банковской карты?",
        options: [
          "Код OTP",
          "ПИНФЛ",
          "Код CVV / CVC",
          "IP-адрес"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 3: Код CVV/CVC на обороте карты используется для верификации онлайн-платежей."
      },
      {
        id: 603,
        question: "Что относится к ключевым признакам финансовых пирамид и фальшивых инвестиционных платформ?",
        options: [
          "Низкая ставка доходности",
          "Официальная лицензия ЦБ и государственная гарантия вкладов",
          "Наличие только официального государственного домена",
          "Отсутствие лицензии, пирамидальная структура рефералов и обещания '100% гарантированного дохода'"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 4: Отсутствие лицензий и гарантии огромной прибыли — верный признак финансовой пирамиды."
      },
      {
        id: 604,
        question: "Какие уловки используют лжетрейдеры в Telegram для входа в доверие?",
        options: [
          "Фальшивые скриншоты выплат, фейковые отзывы ботов и платные закрытые VIP-каналы с 'сигналами'",
          "Показ официальных банковских лицензий",
          "Заключение нотариального договора",
          "Прием оплат только через расчетный счет"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 5: Мошенники создают иллюзию успеха с помощью фальшивых скриншотов балансов."
      },
      {
        id: 605,
        question: "Каков порядок 4-этапной методики проверки перед совершением платежа?",
        options: [
          "Сразу плати",
          "Заплати -> Потом проверь -> Сожалей",
          "ПОДТВЕРДИ -> СРАВНИ -> ПРОВЕРЬ -> ОПЛАТИ",
          "Спроси друга -> Оплати"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 7: Оплата производится только после прохождения этапов подтверждения и тщательной проверки."
      },
      {
        id: 606,
        question: "Какое обещание является 100% признаком финансового обмана?",
        options: [
          "'100% гарантия высокой прибыли' и 'Успейте только сегодня!'",
          "Предупреждение о рыночных рисках",
          "Предложение подписать договор",
          "Номер официальной лицензии банка"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 6: Никакие легальные инвестиции не дают 100% гарантии сверхприбыли."
      },
      {
        id: 607,
        question: "Можно ли передавать кому-либо одноразовый SMS-код (OTP), поступивший от банка?",
        options: [
          "Можно, если просит сотрудник банка",
          "КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО! Это персональный ключ к вашим деньгам",
          "Можно только администратору Telegram",
          "Да, если это близкий знакомый"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 9: OTP-код — это ваш персональный ключ подписи перевода денег, его нельзя называть никому."
      },
      {
        id: 608,
        question: "Что необходимо сделать немедленно, если данные вашей карты были введены на сомнительном сайте?",
        options: [
          "Поблагодарить сайт",
          "Подождать до завтра",
          "Поставить телефон на зарядку",
          "Срочно заблокировать карту через мобильное приложение банка, снизить лимиты и обратиться в банк"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 9: Мгновенная блокировка карты через банковское приложение предотвратит списание средств."
      }
    ]
  },
  {
    id: 7,
    title: "7-Модуль: Фишинг и распознавание поддельных ссылок",
    subtitle: "Виды фишинга, тайпосквоттинг и методика STOP",
    description: "В этом модуле вы изучите распознавание поддельных ссылок, подмену букв в доменах (Typosquatting) и методику STOP.",
    iconName: "Fish",
    slideCount: 10,
    slideFolder: "./slides/module_7",
    overview: {
      summary: "Фишинг — это метод выманивания паролей и платежных реквизитов через визуально неотличимые клоны официальных сайтов платежных систем и банков.",
      keyRule: "Всегда наводите курсор на ссылку перед кликом и проверяйте доменное имя в адресной строке браузера!",
      dos: [
        "Проверяйте наличие защищенного соединения HTTPS, действующего сертификата и корректного написания домена.",
        "Обращайте внимание на подмену похожих символов в домене (Typosquatting, например: payme-auth.xyz или cIick.uz).",
        "Применяйте формулу STOP: S - Stop (Остановись), T - Tekshir (Проверь URL), O - O'yla (Подумай), P - Pay (Действуй).",
        "Вводите адреса важных порталов вручную или сохраняйте их в закладках браузера."
      ],
      donts: [
        "Не переходите по ссылкам из тревожных SMS или писем с требованием 'срочно подтвердить аккаунт'.",
        "Не вводите учетные данные на сайтах с лишними символами, дефисами и сторонними доменными зонами.",
        "Не переходите по ссылкам в Telegram от имени поддельных ботов с раздачами подписок Premium.",
        "Не открывайте сокращенные ссылки (bit.ly, is.gd) без предварительной проверки сервисами предпросмотра."
      ]
    },
    quizQuestions: [
      {
        id: 701,
        question: "В чем заключается главная цель фишинговой (Phishing) атаки?",
        options: [
          "Очистка экрана компьютера",
          "Обман пользователей с помощью поддельных страниц для кражи логинов, паролей и данных карт",
          "Показ прогноза погоды",
          "Увеличение скорости интернета"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 2: Фишинг — это выманивание конфиденциальных данных через клоны известных сайтов."
      },
      {
        id: 702,
        question: "Как называется вид фишинга, при котором вредоносные ссылки рассылаются через SMS-сообщения?",
        options: [
          "Скимминг",
          "Вишинг",
          "Смишинг (Smishing — SMS-фишинг)",
          "Доксинг"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 3: Смишинг — это фишинговые атаки, проводимые через SMS-сообщения."
      },
      {
        id: 703,
        question: "На какие технические признаки сайта необходимо обращать внимание для выявления подделки?",
        options: [
          "Только на бренд компьютера",
          "Только на цвет сайта",
          "Только на версию браузера",
          "Протокол HTTPS, значок замка, SSL-сертификат, дизайн и точное написание доменного имени (URL)"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 4: Протокол HTTP без шифрования и искаженный домен — главные признаки опасности."
      },
      {
        id: 704,
        question: "Какой из представленных доменов является поддельным (Typosquatting)?",
        options: [
          "payme-verify.xyz (Официальный: payme.uz)",
          "my.gov.uz",
          "id.egov.uz",
          "uzcard.uz"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 5: payme-verify.xyz — мошеннический домен-клон."
      },
      {
        id: 705,
        question: "Как называется прием подмены букв в домене (например, замена буквы 'l' на большую 'I' — cIick.uz)?",
        options: [
          "Вишинг",
          "Скимминг",
          "Тайпосквоттинг (Typosquatting)",
          "Парольная фраза"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 5: Тайпосквоттинг эксплуатирует визуальное сходство символов для обмана взгляда."
      },
      {
        id: 706,
        question: "Что относится к распространенным видам фишинга в Telegram?",
        options: [
          "Фейковые боты, обещания 'Telegram Premium в подарок', вредоносные APK/ZIP и сокращенные ссылки",
          "Только голосовые сообщения",
          "Только стикеры",
          "Только названия групп"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 6: Фальшивые раздачи Premium и поддельные боты — частый инструмент фишеров в Telegram."
      },
      {
        id: 707,
        question: "Что означает буква 'T' в методике защиты от фишинга 'STOP'?",
        options: [
          "ТОЛЬКО ПЛАТИ",
          "ТЕКШИР (ПРОВЕРЬ) — внимательно проверь URL, доменное имя и сертификат",
          "ТЕЛЕФОНИРУЙ",
          "ПОВТОРИ"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 8: S - Stop (Остановись), T - Tekshir (Проверь), O - O'yla (Подумай), P - Pay (Действуй)."
      },
      {
        id: 708,
        question: "Как увидеть реальный адрес ссылки перед кликом, не переходя по ней?",
        options: [
          "Закрыть браузер",
          "Сфотографировать ссылку",
          "Выключить компьютер",
          "Навести курсор мыши на ссылку (Hover) и посмотреть реальный URL в левом нижнем углу браузера"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайдам 4-8: При наведении мыши строка состояния браузера показывает истинный адрес назначения."
      }
    ]
  },
  {
    id: 8,
    title: "8-Модуль: Трояны, APK и безопасность вредоносных файлов",
    subtitle: "Вредоносное ПО, угрозы APK и своевременное обновление систем",
    description: "В этом модуле вы узнаете о троянских программах, рисках установки сторонних файлов APK на Android, вымогателях Ransomware и антивирусах.",
    iconName: "Bug",
    slideCount: 10,
    slideFolder: "./slides/module_8",
    overview: {
      summary: "Вредоносные программы (трояны, шифровальщики Ransomware, шпионское ПО) используются для перехвата управления устройством, кражи конфиденциальных данных и вымогательства.",
      keyRule: "Устанавливайте приложения только из официальных магазинов (Google Play / App Store) и регулярно создавайте резервные копии (Backup)!",
      dos: [
        "Загружайте приложения для Android и iOS исключительно из официальных магазинов Google Play и App Store.",
        "Регулярно создавайте автономные резервные копии (Backup) важных файлов на изолированных внешних дисках.",
        "Своевременно устанавливайте обновления операционной системы и баз антивирусного ПО.",
        "Немедленно удаляйте любые файлы с подозрительными расширениями (`.apk`, `.exe`, `.scr`), присланные в мессенджерах."
      ],
      donts: [
        "Категорически запрещено устанавливать сторонние файлы `.APK` из Telegram-каналов и непроверенных сайтов.",
        "Не предоставляйте установленным приложениям избыточные разрешения на чтение SMS, контактов и доступ к спецвозможностям.",
        "Никогда не платите выкуп злоумышленникам при заражении вирусом-шифровальщиком (это не гарантирует возврат файлов).",
        "Не подключайте найденные неизвестные флеш-накопители к служебным компьютерам."
      ]
    },
    quizQuestions: [
      {
        id: 801,
        question: "В чем заключается главная скрытая особенность троянских программ (Trojan)?",
        options: [
          "Они ускоряют работу компьютера",
          "Они маскируются под полезные или безвредные программы, выполняя вредоносный код в фоновом режиме",
          "Они только распечатывают файлы",
          "Они меняют цвет экрана"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 4: Троян проникает под видом легитимного приложения и крадет пароли и файлы."
      },
      {
        id: 802,
        question: "Почему крайне опасно устанавливать файлы `.APK` из неофициальных источников на телефоны Android?",
        options: [
          "Только медленно заряжается аккумулятор",
          "Только переполняется память",
          "APK может содержать троян, получающий полный доступ к SMS, камере, галерее и банковским приложениям",
          "Никакой опасности нет"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 5: Сторонние APK способны перехватывать SMS от банков и управлять устройством."
      },
      {
        id: 803,
        question: "Что происходит при заражении компьютера вирусом-вымогателем (Ransomware)?",
        options: [
          "Удаляется только музыка",
          "Обновляется Windows",
          "Меняются обои рабочего стола",
          "Все документы и файлы необратимо шифруются, а за расшифровку вымогают выкуп в криптовалюте"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 6: Ransomware блокирует доступ ко всем файлам пользователя криптографическим шифрованием."
      },
      {
        id: 804,
        question: "Что является самым надежным и главным средством защиты от атак программ-вымогателей (Ransomware)?",
        options: [
          "Регулярное создание автономных резервных копий (Backup) важных данных на внешнем носителе",
          "Выдергивание провода питания",
          "Упрощение пароля",
          "Отключение антивируса"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайду 6: Наличие офлайн-бэкапа — единственная гарантия восстановления данных без уплаты выкупа."
      },
      {
        id: 805,
        question: "В чем основная цель регулярного обновления (Update) операционной системы и антивирусных баз?",
        options: [
          "Включение подсветки клавиатуры",
          "Загрузка новых игр",
          "Закрытие обнаруженных брешей безопасности (уязвимостей / Vulnerabilities)",
          "Увеличение разрешения экрана"
        ],
        correctAnswer: 2,
        explanation: "Согласно слайду 7: Обновления устраняют критические уязвимости, через которые проникают хакеры."
      },
      {
        id: 806,
        question: "Как следует поступить с подозрительными файлами `.exe`, `.vbs`, `.scr` или `.apk`, полученными в Telegram или по почте?",
        options: [
          "Ни в коем случае не запускать, проверить или немедленно удалить",
          "Открыть кликом",
          "Переслать другу",
          "Запустить без проверки расширения"
        ],
        correctAnswer: 0,
        explanation: "Согласно слайдам 3-5: Это исполняемые файлы, способные мгновенно заразить операционную систему."
      },
      {
        id: 807,
        question: "Что находится на первом месте в цепочке цифровой обороны от вредоносных программ?",
        options: [
          "Только стоимость антивируса",
          "Цифровая грамотность, осведомленность и бдительность самого человека",
          "Цвет корпуса компьютера",
          "Скорость интернет-соединения"
        ],
        correctAnswer: 1,
        explanation: "Согласно слайду 10: Главный рубеж защиты — это знания и осторожность пользователя."
      },
      {
        id: 808,
        question: "Какому правилу необходимо строго следовать при установке мобильных приложений?",
        options: [
          "Устанавливать по ссылкам из SMS",
          "Скачивать из любых Telegram-каналов",
          "Загружать по ссылкам с форумов",
          "Устанавливать приложения исключительно из официальных магазинов (Google Play Market / App Store)"
        ],
        correctAnswer: 3,
        explanation: "Согласно слайду 9: Установка приложений только из официальных маркетов минимизирует риск заражения."
      }
    ]
  }
];

export function getModules(lang: Language = 'uz'): ModuleData[] {
  switch (lang) {
    case 'oz':
      return modulesOz;
    case 'ru':
      return modulesRu;
    case 'uz':
    default:
      return modulesUz;
  }
}

export const modules: ModuleData[] = modulesUz;
