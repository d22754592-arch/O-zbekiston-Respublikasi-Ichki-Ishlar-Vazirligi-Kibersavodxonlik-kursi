import { ModuleData } from './types';

export const modules: ModuleData[] = [
  {
    id: 1,
    title: "1-Modul: Parollar xavfsizligi va boshqaruvi",
    subtitle: "Kuchli parollar yaratish, parol iboralari va parol menejerlari",
    description: "Ushbu modulda kuchli parollar yaratish, parol iboralari (Passphrase) tamoyili hamda Bitwarden va KeePassXC kabi parol menejerlaridan foydalanishni o'rganasiz.",
    iconName: "KeyRound",
    slideCount: 10,
    slideFolder: "./slides/module_1",
    quizQuestions: [
      {
        id: 101,
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
        id: 102,
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
        id: 103,
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
        id: 104,
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
        id: 105,
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
        id: 106,
        question: "Bir xil parolni barcha ijtimoiy tarmoq va ishchi akkauntlarda ishlatish qanday oqibatga olib keladi?",
        options: [
          "Biror bir tizim paroli sizdirilsa, barcha akkauntlaringiz zanjirli ravishda buziladi",
          "Kompyuter xotirasi to'lib qoladi",
          "Internet tezligi sekinlashadi",
          "Hech qanday oqibati yo'q"
        ],
        correctAnswer: 0,
        explanation: "Slayd 7 ga ko'ra: Parollarni takrorlash barcha akkauntlarni bitta zaiflik bilan xavf ostiga qo'yadi."
      },
      {
        id: 107,
        question: "Parollarni xavfsiz saqlash va eslab qolish majburiyatidan qutulish uchun nima ishlatiladi?",
        options: [
          "Parol menejerlari (Password Managers)",
          "Ekranga stiker qog'oz yopishtirish",
          "Do'stlarga aytib qo'yish",
          "Har kuni parolni o'chirish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 6 ga ko'ra: Parol menejerlari barcha murakkab parollarni shifrlangan ma'lumotlar bazasida saqlaydi."
      },
      {
        id: 108,
        question: "Akkaunt xavfsizligini ta'minlashda birinchi mudofaa chizig'i (First line of defense) nima hisoblanadi?",
        options: [
          "Kuchli va noyob parol",
          "Monitor o'lchami",
          "Klaviatura brendi",
          "Sichqoncha tezligi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 2 ga ko'ra: Parol — raqamli dunyoda shaxsiy ma'lumotlar va akkauntlarning birinchi mudofaa chizig'idir."
      }
    ]
  },
  {
    id: 2,
    title: "2-Modul: Ikki Faktorli Autentifikatsiya (2FA)",
    subtitle: "2FA, Authenticator ilovalari va zaxira kalitlari",
    description: "Ushbu modulda ikki faktorli autentifikatsiya (2FA) ishlash tamoyili, Authenticator ilovalari va zaxira kalitlari haqida bilim olasiz.",
    iconName: "ShieldCheck",
    slideCount: 10,
    slideFolder: "./slides/module_2",
    quizQuestions: [
      {
        id: 201,
        question: "Ikki faktorli autentifikatsiya (2FA) qaysi ikki bosqichga asoslanadi?",
        options: [
          "Biror narsa bilasiz (parol) va biror narsaga egasiz (kod/qurilma)",
          "Faqat ikkita har xil parol",
          "Faqat ikkita har xil email",
          "Ism va familiya"
        ],
        correctAnswer: 0,
        explanation: "Slayd 2 ga ko'ra: 2FA — biror narsa bilasiz (parol) va biror narsaga egasiz (bir martalik kod yoki qurilma) tamoyiliga asoslanadi."
      },
      {
        id: 202,
        question: "Slaydga ko'ra, SMS orqali keladigan 2FA kodi qanday kiber-tahdidga zaif hisoblanadi?",
        options: [
          "SIM-swapping va SMS ushlab qolish hujumlari",
          "Faqat kompyuter ekranining sinishiga",
          "Faqat Wi-Fi o'chib qolishiga",
          "Hech qanday zaifligi yo'q"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 ga ko'ra: SMS kodlar SIM-swapping va simsiz aloqada SMS ushlab qolish hujumlariga zaifdir."
      },
      {
        id: 203,
        question: "Google Authenticator va Microsoft Authenticator ilovalarining SMS dan ustunligi nimada?",
        options: [
          "Ular offline ishlaydi va vaqtga asoslangan (TOTP) kodlarni xavfsiz generatsiya qiladi",
          "Ular pul beradi",
          "Ular SMS jo'natadi",
          "Ular parollarni o'chiradi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 ga ko'ra: Authenticator ilovalari internetga bog'lanmagan holda vaqtga asoslangan offline TOTP kodlar yaratadi."
      },
      {
        id: 204,
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
        id: 205,
        question: "Telegramda 2FA ni yoqish uchun ilovaning qaysi bo'limiga kiriladi?",
        options: [
          "Settings > Privacy and Security > Two-Step Verification (Bulutli parol)",
          "Chats > Archive",
          "Calls > Recent",
          "Stickers and Emoji"
        ],
        correctAnswer: 0,
        explanation: "Slayd 6 ga ko'ra: Telegramda 2FA Sozlamalar > Maxfiylik va Xavfsizlik > Ikki bosqichli tasdiqlash bo'limidan yoqiladi."
      },
      {
        id: 206,
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
        id: 207,
        question: "Instagramda kirish joylari va qurilmalarni tekshirish uchun qaysi bo'limga kiriladi?",
        options: [
          "Settings > Security > Login Activity",
          "Edit Profile > Bio",
          "Close Friends",
          "Notifications > Pause All"
        ],
        correctAnswer: 0,
        explanation: "Slayd 7 (Instagram) ga ko'ra: Login Activity bo'limida barcha shubhali kirishlar ko'rinadi."
      },
      {
        id: 208,
        question: "Telefoningizga kutilmaganda 2FA SMS kodi kelsa va birov uni so'rasa nima qilish kerak?",
        options: [
          "Hech qachon va hech kimga 2FA kodini bermaslik kerak",
          "Zudlik bilan berish kerak",
          "Do'stlarga ulashish kerak",
          "SMS ni guruhga tashlash kerak"
        ],
        correctAnswer: 0,
        explanation: "Slayd 8 ga ko'ra: SMS 2FA kodini birovga berish akkauntdan to'liq mahrum bo'lishga olib keladi."
      }
    ]
  },
  {
    id: 3,
    title: "3-Modul: Ijtimoiy muhandislik va psixologik tuzoqlar",
    subtitle: "Manipulyatsiya usullari, shoshilinchlik va ishonchni suiiste'mol qilish",
    description: "Ushbu modulda ijtimoiy muhandislik hujumlarining 4 ta asosiy psixologik quroli va ulardan himoyalanish usullarini o'rganasiz.",
    iconName: "UserX",
    slideCount: 10,
    slideFolder: "./slides/module_3",
    quizQuestions: [
      {
        id: 301,
        question: "Ijtimoiy muhandislik (Social Engineering) ning asosiy ta'rifi nima?",
        options: [
          "Texnik zaifliklardan emas, balki inson psixologiyasidan foydalanib maxfiy ma'lumotlarni qo'lga kiritish usuli",
          "Kompyuter platasini kavsharlash",
          "Dasturlash tillarini o'rganish",
          "Tarmoq kabelini tortish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 1-2 ga ko'ra: Ijtimoiy muhandislik — inson psixologiyasidan (ishonch, qo'rquv, shoshqaloqlik) foydalanadigan hujumdir."
      },
      {
        id: 302,
        question: "Psixologik qurol #1 — 'Shoshilinchlik' (Urgency) taktikasi qanday ishlaydi?",
        options: [
          "'Hozir harakat qilmasangiz, 10 daqiqada o'chiriladi!' deb mantiqiy o'ylashga vaqt qoldirmaydi",
          "Sekin qaror qabul qilishni maslahat beradi",
          "Kitob o'qishni so'raydi",
          "Faqat sovg'alar beradi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 ga ko'ra: Shoshilinchlik vaqt bosimini sun'iy yaratib, qurbonni diqqatni chalg'itib xatoga undaydi."
      },
      {
        id: 303,
        question: "Psixologik qurol #2 — 'Qo'rquv' (Fear) ta'siri ostida inson miyasida nima sodir bo'ladi?",
        options: [
          "Miya 'kurash yoki qochish' rejimiga o'tadi va tanqidiy tahlil hamda mantiqiy fikrlash susayadi",
          "Mantiqiy fikrlash 10 baravar oshadi",
          "Kompyuter o'zi o'chadi",
          "Parol avtomatik o'zgaradi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 ga ko'ra: Qo'rquv hissiy bosim yaratib, mantiqiy fikrlashni to'xtatadi va shoshqaloq qaror qildiradi."
      },
      {
        id: 304,
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
        id: 305,
        question: "Psixologik qurol #4 — 'Obro'' (Authority) taktikasi nima?",
        options: [
          "Jinoyatchi o'zini bank xodimi, IT mutaxassisi yoki davlat amaldori sifatida ko'rsatib itoat qildirishga urinadi",
          "Faqat do'stlar nomidan yozish",
          "Virus yaratish",
          "Reklama tarqatish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 7 ga ko'ra: Odamlar rasmiy shaxslarga avtomatik itoat etishga moyilligidan foydalaniladi."
      },
      {
        id: 306,
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
        id: 307,
        question: "Zararli dastur yuklatish uchun ko'chada tashlab ketilgan shubhali USB-fleshka qaysi usulga kiradi?",
        options: [
          "Baiting (Xo'rak tashlash)",
          "Phishing",
          "Vishing",
          "Passphrase"
        ],
        correctAnswer: 0,
        explanation: "Slayd 8 ga ko'ra: Baiting — qiziqish uyg'otuvchi fiziki vositalar (USB) orqali kiberhujum qilish."
      },
      {
        id: 308,
        question: "Ijtimoiy muhandislik hujumlarining birinchi bosqichi nima hisoblanadi?",
        options: [
          "Ma'lumot yig'ish — qurbonni o'rganish va zaif joylarni aniqlash",
          "Zudlik bilan pul talab qilish",
          "Parolni o'zgartirish",
          "Kompyuterni buzish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 3 ga ko'ra: Birinchi bosqich — Ma'lumot yig'ish va qurbonning zaif joylarini o'rganishdir."
      }
    ]
  },
  {
    id: 4,
    title: "4-Modul: Shaxsiy ma'lumotlar va ijtimoiy tarmoqlar xavfsizligi",
    subtitle: "Pasport, JSHSHIR (PINFL), Doxxing va maxfiylik",
    description: "Ushbu modulda pasport va PINFL ma'lumotlarini himoyalash, Doxxing xavfi hamda ijtimoiy tarmoqlardagi maxfiylik qoidalarini o'rganasiz.",
    iconName: "Lock",
    slideCount: 10,
    slideFolder: "./slides/module_4",
    quizQuestions: [
      {
        id: 401,
        question: "JSHSHIR (PINFL) nima va u nechta raqamli noyob identifikatordir?",
        options: [
          "14 raqamli fuqarolik identifikatsiyalash kodi",
          "8 raqamli karta PIN kodi",
          "16 raqamli karta raqami",
          "4 raqamli SMS kod"
        ],
        correctAnswer: 0,
        explanation: "Slayd 3 ga ko'ra: JSHSHIR (PINFL) — har bir fuqaroga beriladigan 14 raqamli noyob identifikator."
      },
      {
        id: 402,
        question: "Pasport rasmi yoki PINFL raqami internetga tushib qolsa firibgarlar undan qanday foydalanishi mumkin?",
        options: [
          "Soxta hujjat yasash, bank kreditlari olish va shartnomalar tuzish uchun",
          "Faqat ob-havoni ko'rish uchun",
          "Internet tezligini oshirish uchun",
          "Hech narsada foydalana olmaydi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 ga ko'ra: Pasport va PINFL soxta kredit va moliyaviy aldovlar uchun asosiy vositadir."
      },
      {
        id: 403,
        question: "'Doxxing' (Doksing) atamasi nimani anglatadi?",
        options: [
          "Shaxsning shaxsiy ma'lumotlarini uning roziligisiz ommaga oshkor qilish",
          "Kompyuterni antivirus bilan tozalash",
          "Hujjatlarni chop etish",
          "Dasturiy ta'minotni yangilash"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 ga ko'ra: Doxxing — shaxsiy ma'lumotlarni roziliksiz tarqatib ta'qib va zarar yetkazishdir."
      },
      {
        id: 404,
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
        id: 405,
        question: "Ijtimoiy tarmoqlarda eng ko'p uchraydigan xavfli xatolardan biri nima?",
        options: [
          "Pasport va shaxsiy hujjatlar suratlarini ochiq postlarga yuklash",
          "Tungi rejimni yoqish",
          "Profil rasmini yangilash",
          "Musiqa ulashish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 7-9 da ko'rsatilganidek: Shaxsiy hujjatlarni internetda ulashish og'ir oqibatlarga olib keladi."
      },
      {
        id: 406,
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
        id: 407,
        question: "Shaxsiy ma'lumotlar xavfsizligining oltin qoidasi nima?",
        options: [
          "Pasport, PINFL va karta ma'lumotlarini hech qachon tarmoqda ochiq ulashmaslik",
          "Har kuni pasportni almashtirish",
          "Telefonni o'chirib qo'yish",
          "Faqat bitta paroldan foydalanish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 10 ga ko'ra: Pasportingiz va PINFL raqamingizni hech kim bilan ulashmang."
      },
      {
        id: 408,
        question: "Slayddagi hayotiy misolda foydalanuvchi pasport suratini ulashgach nima sodir bo'lgan?",
        options: [
          "Firibgarlar uning nomidan kredit rasmiylashtirgan",
          "Unga pul sovg'a qilishgan",
          "Akkaunti bloklangan",
          "Hech narsa bo'lmagan"
        ],
        correctAnswer: 0,
        explanation: "Slayd 9 dagi real holat: Pasport surati tarqalgach, firibgarlar u inson nomidan kredit olgan."
      }
    ]
  },
  {
    id: 5,
    title: "5-Modul: Bank kartalari va moliyaviy kiber-firibgarlik",
    subtitle: "Skimming, OTP firibgarligi va soxta investitsiya platformalari",
    description: "Ushbu modulda ATM skimming, OTP kodlar o'g'riligi, Telegram soxta treyderlari va STOP metodikasi bo'yicha bilimlaringizni sinaysiz.",
    iconName: "CreditCard",
    slideCount: 10,
    slideFolder: "./slides/module_5",
    quizQuestions: [
      {
        id: 501,
        question: "ATM yoki POS-terminalga maxsus noqonuniy qurilma o'rnatib karta ma'lumotlarini o'g'irlash usuli nima deyiladi?",
        options: [
          "Skimming Hujumi",
          "Phishing",
          "Doxxing",
          "Passphrase"
        ],
        correctAnswer: 0,
        explanation: "Slayd 2 ga ko'ra: Skimming — ATM qurilmalariga yashirin o'quvchi o'rnatib karta va PIN nusxalashdir."
      },
      {
        id: 502,
        question: "Bank kartasining orqa tarafidagi 3 xonali maxfiy kod nima deyiladi?",
        options: [
          "CVV / CVC kodi",
          "PINFL",
          "OTP kod",
          "IP manzil"
        ],
        correctAnswer: 0,
        explanation: "Slayd 3 ga ko'ra: Karta orqasidagi CVV raqami onlayn to'lovlarni tasdiqlash vositasidir."
      },
      {
        id: 503,
        question: "Soxta investitsiya platformalari va moliyaviy piramidalarning asosiy belgilariga qaysilar kiradi?",
        options: [
          "Litsenziyasiz platforma, Piramidasimon tuzilma va 'Kafolatlangan daromad' va'dasi",
          "Rasmiy bank litsenziyasi va davlat kafolati",
          "Faqat rasmiy davlat sayti bo'lishi",
          "Past daromad stavkasi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 ga ko'ra: Litsenziyasiz faoliyat va 100% kafolatlangan daromad va'dasi piramida belgisidir."
      },
      {
        id: 504,
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
        id: 505,
        question: "Firibgarlikni aniqlashning 4 bosqichli metodikasi tartibi qanday?",
        options: [
          "TASDIQLA -> TAQQOSLA -> TEKSHIR -> TO'LOV QIL",
          "To'lov qil -> Keyin tekshir -> Afsuslan",
          "Faqat to'lov qil",
          "Do'stingga ayt -> To'lov qil"
        ],
        correctAnswer: 0,
        explanation: "Slayd 7 ga ko'ra: Tasdiqla, taqqosla va tekshir bosqichlaridan o'tgachgina to'lov qilinadi."
      },
      {
        id: 506,
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
        id: 507,
        question: "Bank kartasidan SMS orqali keladigan OTP bir martalik parolni kimgadir aytish mumkinmi?",
        options: [
          "ASLO MUMKIN ERMAS! U faqat sizga tegishli shaxsiy kalit",
          "Faqat bank xodimi so'rasa mumkin",
          "Faqat telegram adminga mumkin",
          "Ha, agar u do'stingiz bo'lsa"
        ],
        correctAnswer: 0,
        explanation: "Slayd 9 ga ko'ra: OTP SMS kodini hech kimga berish mumkin emas."
      },
      {
        id: 508,
        question: "Onlayn kartangiz shubhali saytda osilib qolganini bilsangiz nima qilish kerak?",
        options: [
          "Mobil bank ilovasidan kartani zudlik bilan bloklash va 2FA/limit qo'yish",
          "Erta tungacha kutish",
          "Telefonni zaryadga qo'yish",
          "Saytga rahmat aytish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 9 ga ko'ra: Karta limitlarini qo'yish va bloklash pul yechilishini to'xtatadi."
      }
    ]
  },
  {
    id: 6,
    title: "6-Modul: Phishing va soxta havolalarni aniqlash",
    subtitle: "Fishing turlari, soxta domenlar va STOP metodikasi",
    description: "Ushbu modulda soxta havolalarni aniqlash, domen nomlarini taqqoslash (Typosquatting) va STOP metodikasini o'rganasiz.",
    iconName: "Fish",
    slideCount: 10,
    slideFolder: "./slides/module_6",
    quizQuestions: [
      {
        id: 601,
        question: "Fishing (Phishing) hujumining asosiy maqsadi nima?",
        options: [
          "Foydalanuvchilarni soxta sahifalar bilan aldab shaxsiy ma'lumotlar va parollarni o'g'irlash",
          "Kompyuter ekranini tozalash",
          "Faqat ob-havoni ko'rsatish",
          "Internet tezligini oshirish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 2 ga ko'ra: Fishing — ishonchli tashkilotlar nomidan aldadab ma'lumot o'g'irlashdir."
      },
      {
        id: 602,
        question: "SMS xabarlari orqali zudlik bilan havolaga bosishga undaydigan fishing turi nima deyiladi?",
        options: [
          "Smishing (SMS Fishing)",
          "Vishing",
          "Skimming",
          "Doxxing"
        ],
        correctAnswer: 0,
        explanation: "Slayd 3 ga ko'ra: Smishing — SMS xabarlar orqali amalga oshiriladigan fishing hujumidir."
      },
      {
        id: 603,
        question: "Soxta saytni aniqlashda qaysi texnik belgilarga e'tibor berish shart?",
        options: [
          "HTTPS va qulf belgisi, SSL sertifikati, sayt dizayni va URL domen manziliga",
          "Faqat sayt rangiga",
          "Faqat brauzer versiyasiga",
          "Faqat kompyuter brendiga"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 ga ko'ra: HTTP = xavfli. SSL sertifikati va domen nomi sinchkovlik bilan tekshiriladi."
      },
      {
        id: 604,
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
        id: 605,
        question: "Click.uz domenini soxtalashtirishda harflar o'rnini almashtirish (cIick.uz) harfiy hiylasi nima deyiladi?",
        options: [
          "Typosquatting (Katta 'I' harfini kichik 'l' ga o'xshatish)",
          "Skimming",
          "Vishing",
          "Passphrase"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 da keltirilgan misol: cIick.uz (I -> l almashtirish) ko'z aldash uchun ishlatiladi."
      },
      {
        id: 606,
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
        id: 607,
        question: "Fishingni aniqlash bo'yicha 'STOP' metodikasidagi 'T' harfi nimani anglatadi?",
        options: [
          "TEKSHIR — URL, domen nomi va sertifikatni diqqat bilan tekshir",
          "TO'LOV QIL",
          "TELEFON QIL",
          "TAKRORLA"
        ],
        correctAnswer: 0,
        explanation: "Slayd 8 ga ko'ra: S - STOP (To'xta), T - TEKSHIR, O - O'YLA/TASDIQLA, P - KEYIN BOS."
      },
      {
        id: 608,
        question: "Havolaga bormasdan (click qilmasdan) uning haqiqiy manzilini ko'rish usuli qanday?",
        options: [
          "Sichqoncha ko'rsatkichini havola ustiga olib borish (Hover qilish)",
          "Havolani rasmini olish",
          "Kompyuterni o'chirish",
          "Brauzerni yopish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4-8 ga ko'ra: Hover qilinganda brauzer pastida haqiqiy yo'naltirilgan URL ko'rinadi."
      }
    ]
  },
  {
    id: 7,
    title: "7-Modul: Troyan, APK va zararli fayllar xavfsizligi",
    subtitle: "Zararli dasturlar, APK xavflari va operatsion tizim yangilanishi",
    description: "Ushbu modulda troyan dasturlari, Android APK fayllari xavfi, Ransomware shifrlagichlar va antivirus himoyasini o'rganasiz.",
    iconName: "Bug",
    slideCount: 10,
    slideFolder: "./slides/module_7",
    quizQuestions: [
      {
        id: 701,
        question: "Troyan (Trojan) dasturining asosiy yashirin xususiyati nimada?",
        options: [
          "O'zini zararsiz yoki foydali dastur ko'rinishida ko'rsatib, orqa fonda zararli kodni ishga tushiradi",
          "Kompyuterni tezlashtiradi",
          "Faqat fayllarni chop etadi",
          "Ekran rangini chiroyli qiladi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 4 ga ko'ra: Troyan foydali ilova niqobida kirib keladi va ma'lumotlarni o'g'irlaydi."
      },
      {
        id: 702,
        question: "Android telefonlarga Play Market bo'lmagan shubhali saytlardan `.APK` yuklash nima uchun o'ta xavfli?",
        options: [
          "APK ichida troyan bo'lib, u SMS, galereya va bank ilovalariga yashirin ruxsat olishi mumkin",
          "Faqat xotira to'ladi",
          "Faqat batareya sekin zaryad oladi",
          "Hech qanday xavfi yo'q"
        ],
        correctAnswer: 0,
        explanation: "Slayd 5 ga ko'ra: Noma'lum APK fayllar qurilmaga to'liq kiber-tovlamachilik huquqini berib qo'yishi mumkin."
      },
      {
        id: 703,
        question: "Ransomware (Tovlamachi-shifrlagich) dasturi kompyuterga tushsa nima sodir bo'ladi?",
        options: [
          "Fayllarni shifrlab qo'yadi va ularni ochish uchun to'lov (kriptovalyuta) talab qiladi",
          "Windows ni yangilaydi",
          "Ekran rasmini o'zgartiradi",
          "Faqat musiqani o'chiradi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 6 ga ko'ra: Ransomware barcha hujjat va rasmlarni shifrlab blocklaydi."
      },
      {
        id: 704,
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
        id: 705,
        question: "Operatsion tizim va antivirus dasturlarini muntazam yangilab (Update) turishning asosiy maqsadi nima?",
        options: [
          "Tizimdagi aniqlangan yangi xavfsizlik tirqishlari (Vulnerabilities) va zaifliklarni yopish",
          "Faqat yangi o'yinlar yuklash",
          "Klaviatura chirog'ini yoqish",
          "Ekran sig'imini oshirish"
        ],
        correctAnswer: 0,
        explanation: "Slayd 7 ga ko'ra: Yangilanishlar (Updates) yangi topilgan zaiflik tirqishlarini yopadi."
      },
      {
        id: 706,
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
        id: 707,
        question: "Zararli dasturlarga qarshi raqamli mudofaa zanjirida eng birinchi o'rinda nima turadi?",
        options: [
          "Insonning kiber-ongliligi va ehtiyotkorligi",
          "Faqat antivirus narxi",
          "Kompyuter rangi",
          "Internet tezligi"
        ],
        correctAnswer: 0,
        explanation: "Slayd 10 ga ko'ra: Eng kuchli himoyachi — foydalanuvchining bilimi va hushyorligidir."
      },
      {
        id: 708,
        question: "Mobil ilovalarni yuklashda qaysi qoidaga qat'iy amal qilish shart?",
        options: [
          "Faqat rasmiy do'konlardan (Google Play Market / App Store) yuklash",
          "Har qanday Telegram kanaldan yuklash",
          "Forumlardagi havola orqali yuklash",
          "SMS dagi havoladan yuklash"
        ],
        correctAnswer: 0,
        explanation: "Slayd 9 ga ko'ra: Faqat tekshirilgan rasmiy dasturlar do'konidan ilova o'rnatish shart."
      }
    ]
  }
];
