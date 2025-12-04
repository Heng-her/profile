import { useState } from "react";
import { MdKeyboardArrowDown, MdEditNote } from "react-icons/md";
import { IoLanguageSharp } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa6";
import { Modalboxlogin } from "./modalboxlogin";
import { useTranslation } from "./TranslationContext";
import { getTimeOfDay } from "../util/translations";

export default function Header({ showlogin, onClick }: { showlogin?: boolean, onClick?: () => void }) {
  const { t, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const langNames = {
    en: "English",
    kh: "Khmer",
    cn: "Chinese",
    vi: "Vietnamese",
    id: "Indonesian",
    ph: "Filipino",
  };

  const greeting = t(`welcome.${getTimeOfDay()}`);

  return (
    <>
      <Modalboxlogin isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />

      <div
        className="flex items-center justify-between px-4 py-3 sticky top-0 
        dark:bg-background-dark/90 backdrop-blur-sm z-20"
      >
        {/* LEFT: CREATE PROFILE */}
        {showlogin !== false ? (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg 
            bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
            dark:hover:bg-gray-600 transition"
          >
            <FaAddressBook />
            <span className="hidden sm:inline">{t("createProfile")}</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => onClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg 
            bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
            dark:hover:bg-gray-600 transition"
            >
              <MdEditNote />
              <span className="hidden sm:inline">{t("createProfile")}</span>
            </button>
          </>
        )}

        {/* CENTER: GREETING */}
        <h2 className="text-xl font-bold flex-1 text-center khmer-regular">
          {greeting}
        </h2>

        {/* RIGHT: LANGUAGE SELECT */}
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg 
            bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
            dark:hover:bg-gray-600 transition"
          >
            <IoLanguageSharp />
            <MdKeyboardArrowDown
              className={`transition ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* DROPDOWN */}
          {open && (
            <ul
              className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 
              shadow-lg rounded-lg overflow-hidden animate-fade-in"
            >
              {Object.keys(langNames).map((key) => (
                <li
                  key={key}
                  onClick={() => {
                    setLang(key as any);
                    setOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 
                  dark:hover:bg-gray-700"
                >
                  {langNames[key as keyof typeof langNames]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
