import React, { useState } from 'react';
import { Database, Table, Key, Link2, Copy, Check, Terminal, Play } from 'lucide-react';

interface Column {
  name: string;
  type: string;
  constraints: string;
  description: string;
}

interface TableSchema {
  name: string;
  description: string;
  columns: Column[];
}

export default function SchemaViewer() {
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [copied, setCopied] = useState(false);
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [activeQuery, setActiveQuery] = useState<string>('');

  const tables: Record<string, TableSchema> = {
    users: {
      name: 'users',
      description: 'IIB xodimlari va tinglovchilar hisoblari ma\'lumotlar jadvali',
      columns: [
        { name: 'id', type: 'SERIAL', constraints: 'PRIMARY KEY', description: 'Foydalanuvchining unikal identifikatori' },
        { name: 'username', type: 'VARCHAR(50)', constraints: 'UNIQUE NOT NULL', description: 'Tizimga kirish logini' },
        { name: 'password_hash', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Shifrlangan parol xeshi' },
        { name: 'full_name', type: 'VARCHAR(100)', constraints: 'NOT NULL', description: 'Xodimning to\'liq ismi (F.I.Sh.)' },
        { name: 'unvon', type: 'VARCHAR(30)', constraints: 'DEFAULT \'Leytenant\'', description: 'Kiber-unvon unvoni' },
        { name: 'current_xp', type: 'INTEGER', constraints: 'DEFAULT 0', description: 'To\'plangan umumiy tajriba ochkolari (Reyting balli)' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP', description: 'Ro\'yxatdan o\'tgan vaqti' }
      ]
    },
    courses: {
      name: 'courses',
      description: 'O\'quv modullari (kurslar) jadvali',
      columns: [
        { name: 'id', type: 'SERIAL', constraints: 'PRIMARY KEY', description: 'Modulning unikal identifikatori' },
        { name: 'title', type: 'VARCHAR(150)', constraints: 'NOT NULL', description: 'Modul nomi (o\'zbek tilida)' },
        { name: 'description', type: 'TEXT', constraints: '', description: 'Modulning qisqacha mazmuni va maqsadlari' },
        { name: 'icon_name', type: 'VARCHAR(50)', constraints: '', description: 'Interfeysda ko\'rsatiladigan ikonka nomi' },
        { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP', description: 'Yaratilgan vaqti' }
      ]
    },
    lessons: {
      name: 'lessons',
      description: 'Modullarga tegishli bo\'lgan darsliklar (nazariy qismlar)',
      columns: [
        { name: 'id', type: 'SERIAL', constraints: 'PRIMARY KEY', description: 'Darsning unikal identifikatori' },
        { name: 'course_id', type: 'INTEGER', constraints: 'REFERENCES courses(id) ON DELETE CASCADE', description: 'Tegishli bo\'lgan o\'quv moduli ID-si' },
        { name: 'title', type: 'VARCHAR(200)', constraints: 'NOT NULL', description: 'Dars sarlavhasi' },
        { name: 'content_markdown', type: 'TEXT', constraints: 'NOT NULL', description: 'Darsning matni va tushuntirishlari (Markdown formatida)' },
        { name: 'duration', type: 'VARCHAR(30)', constraints: '', description: 'O\'qish uchun tavsiya etilgan taxminiy vaqt' },
        { name: 'sequence_order', type: 'INTEGER', constraints: 'NOT NULL', description: 'Darsning modul ichidagi tap-to\'g\'ri tartibi' }
      ]
    },
    user_progress: {
      name: 'user_progress',
      description: 'Xodimlarning darslarni o\'zlashtirish va tamomlash koeffitsienti',
      columns: [
        { name: 'id', type: 'SERIAL', constraints: 'PRIMARY KEY', description: 'Yozuvning unikal identifikatori' },
        { name: 'user_id', type: 'INTEGER', constraints: 'REFERENCES users(id) ON DELETE CASCADE', description: 'Xodimning foydalanuvchi ID-si' },
        { name: 'lesson_id', type: 'INTEGER', constraints: 'REFERENCES lessons(id) ON DELETE CASCADE', description: 'Tamomlangan dars ID-si' },
        { name: 'status', type: 'VARCHAR(20)', constraints: 'DEFAULT \'completed\'', description: 'Dars holati (\'in_progress\', \'completed\')' },
        { name: 'completed_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP', description: 'Tamomlangan vaqt va sana' }
      ]
    },
    quiz_results: {
      name: 'quiz_results',
      description: 'Modul oxiridagi test sinovlarining natijalari',
      columns: [
        { name: 'id', type: 'SERIAL', constraints: 'PRIMARY KEY', description: 'Natijaning unikal identifikatori' },
        { name: 'user_id', type: 'INTEGER', constraints: 'REFERENCES users(id) ON DELETE CASCADE', description: 'Test topshirgan xodim ID-si' },
        { name: 'module_id', type: 'INTEGER', constraints: 'REFERENCES courses(id) ON DELETE CASCADE', description: 'Test topshirilgan modul ID-si' },
        { name: 'score', type: 'INTEGER', constraints: 'NOT NULL', description: 'To\'plangan foiz miqdori (0-100)' },
        { name: 'passed', type: 'BOOLEAN', constraints: 'NOT NULL', description: 'O\'tish balidan o\'tganlik holati (Succeed/Failed)' },
        { name: 'attempts', type: 'INTEGER', constraints: 'DEFAULT 1', description: 'Urinishlar soni' },
        { name: 'graded_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP', description: 'Baholangan vaqt' }
      ]
    }
  };

  const postgresDDL = `-- ==========================================================
-- IIB KIBERXAVFSIZLIK AKADEMIYASI DATABASE SCHEMA
-- RDBMS: PostgreSQL 14+ / Cloud SQL
-- ==========================================================

-- 1. F.I.Sh. va Kiber-unvon jadvallari (Users)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    unvon VARCHAR(30) DEFAULT 'Leytenant' CHECK (unvon IN ('Leytenant', 'Katta Leytenant', 'Kapitan', 'Mayor', 'Podpolkovnik', 'Polkovnik')),
    current_xp INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Kurslar / Modullar jadvali (Courses)
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Modul darslari jadvali (Lessons)
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content_markdown TEXT NOT NULL,
    duration VARCHAR(30),
    sequence_order INTEGER NOT NULL,
    CONSTRAINT unique_course_sequence UNIQUE(course_id, sequence_order)
);

-- 4. Foydalanuvchi rivojlanish tarixi (User Progress)
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed')),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_lesson UNIQUE(user_id, lesson_id)
);

-- 5. Test imtihonlari natijalari (Quiz Results)
CREATE TABLE quiz_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    passed BOOLEAN NOT NULL,
    attempts INTEGER DEFAULT 1,
    graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- Boshlang'ich ma'lumotlarni kiritish (Initial Seeding)
-- ==========================================================

INSERT INTO courses (id, title, description, icon_name) VALUES
(1, 'Kiber-gigiyena va Shaxsiy Xavfsizlik', 'Parol mantiqi, 2FA va qurilmalarni shifrlash asoslari', 'Shield'),
(2, 'Ijtimoiy Muhandislik (Social Engineering)', 'Inson manipulyatsiyasi va fishing tahlillari', 'Users'),
(3, 'Tarmoq asoslari va Internet', 'IP/MAC manzillar, VPN xizmatlari va Darknet arxitekturasi', 'Globe'),
(4, 'Raqamli Dalillar (Digital Forensics)', 'Raqamli dalillarni yig\'ish, Hashing va RAM ekspertiza', 'FileSearch'),
(5, 'O\'zbekiston Qonunchiligi', 'JK 278-moddalari, kiber-terrorizm va protsessual bayonnomalar', 'Gavel'),
(6, 'OSINT (Ochiq manbalardan qidiruv)', 'Google Dorking, rasm bo\'yicha qidiruv va Telegram botlari', 'Search');
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postgresDDL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleQueries = [
    {
      title: "Xodimlarning kiber-unvonlar bo'yicha taqsimlanish koeffitsienti",
      query: "SELECT unvon, COUNT(*), SUM(current_xp) AS jami_xp FROM users GROUP BY unvon ORDER BY jami_xp DESC;",
      result: [
        { unvon: 'Polkovnik', count: '12', jami_xp: '95,400 Reyting balli' },
        { unvon: 'Podpolkovnik', count: '28', jami_xp: '184,800 Reyting balli' },
        { unvon: 'Mayor', count: '45', jami_xp: '225,000 Reyting balli' },
        { unvon: 'Kapitan', count: '64', jami_xp: '243,200 Reyting balli' },
        { unvon: 'Katta Leytenant', count: '85', jami_xp: '255,000 Reyting balli' },
        { unvon: 'Leytenant', count: '120', jami_xp: '180,000 Reyting balli' }
      ]
    },
    {
      title: "O'rtacha o'zlashtirish ko'rsatkichlari (Modullar kesimida)",
      query: "SELECT c.title, ROUND(AVG(q.score), 2) AS ortacha_ball, COUNT(q.id) AS jami_topshirganlar FROM quiz_results q JOIN courses c ON q.module_id = c.id GROUP BY c.title ORDER BY ortacha_ball DESC;",
      result: [
        { title: 'Kiber-gigiyena va Shaxsiy Xavfsizlik', ortacha_ball: '92.4%', jami_topshirganlar: '342 xodim' },
        { title: 'O\'zbekiston Qonunchiligi', ortacha_ball: '88.1%', jami_topshirganlar: '310 xodim' },
        { title: 'Ijtimoiy Muhandislik (Social Engineering)', ortacha_ball: '85.5%', jami_topshirganlar: '335 xodim' },
        { title: 'OSINT (Ochiq manbalardan qidiruv)', ortacha_ball: '81.9%', jami_topshirganlar: '280 xodim' },
        { title: 'Tarmoq asoslari va Internet', ortacha_ball: '79.2%', jami_topshirganlar: '320 xodim' },
        { title: 'Raqamli Dalillar (Digital Forensics)', ortacha_ball: '76.4%', jami_topshirganlar: '295 xodim' }
      ]
    },
    {
      title: "Eng yaxshi natija ko'rsatgan top 3 xodim",
      query: "SELECT full_name, unvon, current_xp FROM users ORDER BY current_xp DESC LIMIT 3;",
      result: [
        { full_name: 'Mayor Jasur Baxtiyorov', unvon: 'Mayor', current_xp: '8,400 Reyting balli' },
        { full_name: 'Kapitan Dilshodbek Karimov', unvon: 'Kapitan', current_xp: '7,950 Reyting balli' },
        { full_name: 'Podpolkovnik Shaxnoza Toirova', unvon: 'Podpolkovnik', current_xp: '7,800 Reyting balli' }
      ]
    }
  ];

  const handleRunQuery = (queryObj: typeof sampleQueries[0]) => {
    setActiveQuery(queryObj.query);
    setSqlResult(queryObj.result);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-950" id="schema-viewer-container">
      {/* Sidebar Table Selector */}
      <div className="lg:col-span-4 space-y-5">
        <div className="bg-white border-2 border-slate-900 rounded-none p-4 shadow-[4px_4px_0px_rgba(15,23,42,1)]">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
            <Database className="w-4 h-4 mr-2 text-sky-600 stroke-[2.5]" /> PostgreSQL Jadvallari
          </h3>
          <div className="space-y-2">
            {Object.keys(tables).map((tableName) => (
              <button
                key={tableName}
                onClick={() => setSelectedTable(tableName)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-none transition-colors border-2 ${
                  selectedTable === tableName
                    ? 'bg-sky-500 text-slate-950 font-bold border-slate-950 shadow-[2px_2px_0px_rgba(15,23,42,1)]'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 border-transparent'
                }`}
              >
                <span className="flex items-center font-bold">
                  <Table className="w-4 h-4 mr-2" /> {tableName}
                </span>
                <span className={`text-[10px] font-mono font-bold ${selectedTable === tableName ? 'text-slate-900' : 'text-slate-400'}`}>
                  {tables[tableName].columns.length} columns
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Database ERD Relationship diagram visualizer */}
        <div className="bg-white border-2 border-slate-900 rounded-none p-4 shadow-[4px_4px_0px_rgba(15,23,42,1)]">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
            <Link2 className="w-4 h-4 mr-2 text-sky-600 stroke-[2.5]" /> ERD Bog'liqlik Sxemasi
          </h3>
          <div className="space-y-3 font-mono text-[11px] p-2.5 bg-slate-50 rounded-none border-2 border-slate-900 shadow-[inset_1.5px_1.5px_3px_rgba(0,0,0,0.05)]">
            <div className="p-2 border-2 border-sky-500 bg-sky-50 rounded-none shadow-[2px_2px_0px_rgba(14,165,233,0.15)]">
              <span className="text-sky-800 font-bold text-xs">users</span>
              <div className="text-slate-600 pl-2 font-bold mt-1">🔑 id (PK)</div>
            </div>
            
            <div className="flex justify-center text-slate-900 font-bold">▼ (1 to Many)</div>

            <div className="p-2 border-2 border-amber-500 bg-amber-50 rounded-none shadow-[2px_2px_0px_rgba(245,158,11,0.15)]">
              <span className="text-amber-800 font-bold text-xs">quiz_results</span>
              <div className="text-slate-600 pl-2 font-bold mt-1">🔑 id (PK)</div>
              <div className="text-slate-700 pl-2 mt-0.5">🔗 user_id (FK → users.id)</div>
              <div className="text-slate-700 pl-2">🔗 module_id (FK → courses.id)</div>
            </div>

            <div className="flex justify-center text-slate-900 font-bold">▲ (Many to 1)</div>

            <div className="p-2 border-2 border-emerald-500 bg-emerald-50 rounded-none shadow-[2px_2px_0px_rgba(16,185,129,0.15)]">
              <span className="text-emerald-800 font-bold text-xs">courses / modules</span>
              <div className="text-slate-600 pl-2 font-bold mt-1">🔑 id (PK)</div>
            </div>

            <div className="flex justify-center text-slate-900 font-bold">▼ (1 to Many)</div>

            <div className="p-2 border-2 border-purple-500 bg-purple-50 rounded-none shadow-[2px_2px_0px_rgba(168,85,247,0.15)]">
              <span className="text-purple-800 font-bold text-xs">lessons</span>
              <div className="text-slate-600 pl-2 font-bold mt-1">🔑 id (PK)</div>
              <div className="text-slate-700 pl-2 mt-0.5">🔗 course_id (FK → courses.id)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Schema Details / SQL Tab Panel */}
      <div className="lg:col-span-8 space-y-6">
        {/* Table Details */}
        <div className="bg-white border-2 border-slate-900 rounded-none p-5 shadow-[4px_4px_0px_rgba(15,23,42,1)]">
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4 mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 font-mono tracking-tight">
                  {tables[selectedTable].name}
                </h2>
                <span className="px-2 py-0.5 text-[10px] bg-amber-400 text-slate-950 border-2 border-slate-900 font-bold rounded-none">
                  Table
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {tables[selectedTable].description}
              </p>
            </div>
            <Database className="w-8 h-8 text-sky-600/20" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-100 text-[11px] font-mono text-slate-700 uppercase tracking-wider border-2 border-slate-900 font-bold">
                <tr>
                  <th className="px-4 py-2.5">Ustun nomi</th>
                  <th className="px-4 py-2.5">Turi (Data Type)</th>
                  <th className="px-4 py-2.5">Cheklovlar (Constraints)</th>
                  <th className="px-4 py-2.5">Izoh (Description)</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-900 border-x-2 border-b-2 border-slate-900">
                {tables[selectedTable].columns.map((column, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-sky-700 flex items-center">
                      {column.constraints.includes('PRIMARY KEY') && <Key className="w-3.5 h-3.5 mr-1 text-amber-500" />}
                      {column.constraints.includes('REFERENCES') && <Link2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />}
                      {column.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-purple-700 text-xs font-bold">
                      {column.type}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs font-semibold">
                      {column.constraints || <span className="text-slate-400">-</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-medium">
                      {column.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PostgreSQL Code Console */}
        <div className="bg-white border-2 border-slate-900 rounded-none overflow-hidden shadow-[4px_4px_0px_rgba(15,23,42,1)]">
          <div className="bg-slate-900 px-4 py-3 border-b-2 border-slate-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span className="text-xs font-mono font-bold text-white">schema.sql (PostgreSQL DDL)</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1.5 px-3 py-1 text-xs text-slate-900 bg-white border-2 border-slate-900 rounded-none font-bold hover:bg-slate-100 transition-all shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  <span className="text-emerald-700">Nusxalandi!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodni nusxalash</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 bg-slate-50 font-mono text-xs text-slate-800 overflow-y-auto max-h-[300px] leading-relaxed border-t-2 border-slate-900 scrollbar-thin">
            <pre>{postgresDDL}</pre>
          </div>
        </div>

        {/* SQL Sandbox Simulator */}
        <div className="bg-white border-2 border-slate-900 rounded-none p-5 shadow-[4px_4px_0px_rgba(15,23,42,1)]">
          <div className="flex items-center space-x-2 mb-4">
            <Play className="w-5 h-5 text-sky-600 stroke-[2.5]" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">SQL So'rovlar Simulyatori</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4 font-semibold">
            Platformadagi foydalanuvchi va natijalarni hisoblash uchun mo'ljallangan namunaviy tahliliy SQL so'rovlarni tanlang va ularning natijasini ko'ring:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleRunQuery(q)}
                className="p-3 bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 rounded-none text-left transition-all flex flex-col justify-between shadow-[2px_2px_0px_rgba(15,23,42,1)] active:translate-y-0.5"
              >
                <span className="text-xs font-bold text-slate-900 line-clamp-2">{q.title}</span>
                <span className="text-[10px] text-sky-700 font-mono font-extrabold mt-2 block hover:underline">RUN QUERY ▶</span>
              </button>
            ))}
          </div>

          {activeQuery && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border-2 border-slate-900 rounded-none font-mono text-[11px] text-slate-800">
                <span className="text-amber-600 font-bold">SQL:</span> {activeQuery}
              </div>

              {sqlResult && (
                <div className="bg-slate-50 border-2 border-slate-900 rounded-none p-3 font-mono text-xs text-slate-900 shadow-[inner_1.5px_1.5px_3px_rgba(0,0,0,0.05)]">
                  <span className="text-emerald-700 font-bold block mb-2 border-b-2 border-slate-200 pb-1">RESULT SET ROWS ({sqlResult.length}):</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b-2 border-slate-900 text-[10px] text-slate-600 uppercase font-bold">
                          {Object.keys(sqlResult[0]).map((key) => (
                            <th key={key} className="pb-1.5 pr-4">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sqlResult.map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-200 last:border-0 hover:bg-slate-150/50">
                            {Object.values(row).map((val: any, colIdx) => (
                              <td key={colIdx} className="py-1.5 pr-4 text-slate-800 font-medium">{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
