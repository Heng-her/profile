import { useEffect, useState } from "react";
import translations from "../../data/translations.json";
import { getTimeOfDay } from "../../util/translations";
import { MdKeyboardArrowDown } from "react-icons/md";

type Lang = keyof typeof translations;

export default function Greeting() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && translations[saved]) setLang(saved);
  }, []);

  // Save selected language
  const changeLang = (code: Lang) => {
    setLang(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  // Greeting
  const greeting = translations[lang].welcome[getTimeOfDay()] || "Hello";

  // Language Names
  const langNames: Record<Lang, string> = {
    en: "English",
    kh: "Khmer",
    cn: "Chinese",
    vi: "Vietnamese",
    id: "Indonesian",
    ph: "Filipino",
  };

  return (
    <div>
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-3 sticky top-0  dark:bg-background-dark/90 backdrop-blur-md border-b dark:border-gray-700 z-20">
        {/* LEFT: Create Profile */}
        <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          Create Profile
        </button>

        {/* CENTER TITLE */}
        <h2 className="text-xl font-bold flex-1 text-center">{greeting}</h2>

        {/* RIGHT: LANGUAGE DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            🌐 {langNames[lang]}
            <MdKeyboardArrowDown
              className={`transition ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border dark:border-gray-700">
              {Object.keys(translations).map((key) => (
                <li
                  key={key}
                  onClick={() => changeLang(key as Lang)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {langNames[key as Lang]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* GREETING TEXT */}
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">{greeting}</h1>
        <p className="opacity-70">{translations[lang].test}</p>
      </div>
    </div>
  );
}
