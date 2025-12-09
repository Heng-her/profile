import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLanguageSharp } from "react-icons/io5";
import { useTranslation } from "./TranslationContext";
import { getTimeOfDay } from "../util/translations";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const { t, setLang } = useTranslation();
  const [openLang, setOpenLang] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  const token = getCookie("access_token");
  const greeting = t(`welcome.${getTimeOfDay()}`);

  return (
    <div
      className="flex items-center justify-between px-4 py-3 sticky top-0 
      dark:bg-background-dark/90 backdrop-blur-sm z-20"
    >
      {/* LEFT: PROFILE MENU BUTTON */}
      <div className="relative">
        <button
          onClick={() => setOpenMenu((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg 
          bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
          dark:hover:bg-gray-600 transition"
        >
          <FaHome />
          <span className="hidden sm:inline">{t("createProfile")}</span>
          <MdKeyboardArrowDown
            className={`transition ${openMenu ? "rotate-180" : ""}`}
          />
        </button>

        {openMenu && (
          <ul
            className="absolute mt-2 w-40 bg-white dark:bg-gray-800 
            shadow-lg rounded-lg overflow-hidden animate-fade-in"
          >
            {/* Logged-in options */}
            {token && (
              <>
                <li
                  onClick={() => navigate("/update")}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Update
                </li>
                <li
                  onClick={() => {
                    document.cookie =
                      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    navigate("/");
                    window.location.reload();
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </li>
              </>
            )}

            {/* Global menu items */}
            <li
              onClick={() => navigate("/")}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Home
            </li>

            {/* <li
              onClick={() => navigate("/about")}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              About
            </li> */}

            {/* Not logged-in options */}
            {!token && (
              <>
                <li
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </li>

                <li
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Register
                </li>
              </>
            )}
          </ul>
        )}
      </div>

      {/* CENTER */}
      <h2 className="text-xl font-bold flex-1 text-center khmer-regular">
        {greeting}
      </h2>

      {/* RIGHT: LANGUAGE DROPDOWN */}
      <div className="relative">
        <button
          onClick={() => setOpenLang((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg 
          bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
          dark:hover:bg-gray-600 transition"
        >
          <IoLanguageSharp />
          <MdKeyboardArrowDown
            className={`transition ${openLang ? "rotate-180" : ""}`}
          />
        </button>

        {openLang && (
          <ul
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 
            shadow-lg rounded-lg overflow-hidden animate-fade-in"
          >
            {["en", "kh", "cn", "vi", "id", "ph"].map((lang) => (
              <li
                key={lang}
                onClick={() => {
                  setLang(lang as any);
                  setOpenLang(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 
                dark:hover:bg-gray-700"
              >
                {lang.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
