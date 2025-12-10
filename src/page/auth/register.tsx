import { useState } from "react";
import { supabase } from "../../service/supabase";
import { Dialog } from "@headlessui/react";
import { FaCheckCircle, FaCopy, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../components/TranslationContext";
import { AiOutlineLoading } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [checked, setChecked] = useState(false);
  const username = formData.username.trim();
  const profileUrl = `${window.location.origin}/${username}`;
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setFieldErrors({});
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({
        confirmPassword: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user returned from auth");

      setSuccess("Account created! Check your email to verify.");
      setIsOpen(true);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const router = useNavigate();
  const handleConfirm = () => {
    setIsOpen(false);
    router(profileUrl);
  };

  const [googleLoading, setgoogleLoading] = useState(false);

  const handleGoogleRegister = async () => {
    setError("");
    setgoogleLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google sign-up failed");
      setgoogleLoading(false);
    }
  };

  return (
    <div className="mt-5 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Create Account
        </h2>

        {error && (
          <div
            className="flex items-center bg-red-50 border border-red-500 text-red-800 p-4 rounded-lg shadow-md mb-6"
            role="alert"
          >
            {/* Placeholder for an Error Icon (e.g., using a library like Lucide, Heroicons, etc.) */}
            <svg
              className="w-5 h-5 mr-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div
            className="flex items-center bg-green-50 border border-green-500 text-green-800 p-4 rounded-lg shadow-md mb-6"
            role="status"
          >
            {/* Placeholder for a Success Icon (e.g., using a library like Lucide, Heroicons, etc.) */}
            <svg
              className="w-5 h-5 mr-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="font-medium">{success}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-2">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full border ${
                fieldErrors.username ? "border-red-500" : "border-gray-300"
              } p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              required
              disabled={loading}
            />
            {fieldErrors.username && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                fieldErrors.email ? "border-red-500" : "border-gray-300"
              } p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              required
              disabled={loading}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* First Name (Optional) */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={loading}
            />
          </div>

          {/* Last Name (Optional) */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${
                fieldErrors.password ? "border-red-500" : "border-gray-300"
              } p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              required
              minLength={6}
              disabled={loading}
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border ${
                fieldErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              required
              disabled={loading}
            />
            {fieldErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="space-y-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <AiOutlineLoading className="animate-spin h-5 w-5" />
                  Registering...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading || googleLoading}
              className="w-full mb-4 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {googleLoading ? (
                <>
                  <AiOutlineLoading className="animate-spin h-5 w-5" />
                  <span>Signing in with Google...</span>
                </>
              ) : (
                <>
                  <FcGoogle className="w-5 h-5" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(true)}
        className="relative z-50"
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Dialog container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4">
            {/* Title */}
            <Dialog.Title>
              <div className="flex khmer-regular items-center gap-2 text-xl font-semibold text-green-600">
                <FaCheckCircle
                  className="text-green-500 khmer-regula"
                  size={24}
                />
                {t("dialog.title")}
              </div>
            </Dialog.Title>

            {/* Description */}
            <Dialog.Description>
              <p className="text-gray-600 leading-relaxed khmer-regular">
                {t("dialog.description")}
              </p>
            </Dialog.Description>

            {/* Profile link box */}
            <div className="mt-3 p-3 border rounded-lg bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700 overflow-hidden">
                <FaLink className="text-blue-600 shrink-0" />
                <span className="truncate">{profileUrl}</span>
              </div>

              <button
                onClick={handleCopy}
                className="ml-2 p-2 rounded hover:bg-gray-200 transition"
              >
                {copied ? (
                  <span className="text-green-600 khmer-regular text-sm font-semibold">
                    {t("dialog.copied")}
                  </span>
                ) : (
                  <FaCopy className="text-gray-600" />
                )}
              </button>
            </div>
            {/* Privicy and policy */}
            <p className="text-xs text-gray-500 flex items-start gap-2">
              {/* Custom checkbox */}
              <input
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="
    h-4 w-4 rounded border-gray-400 
    checked:bg-blue-600 checked:border-blue-600
    focus:ring-blue-500
  "
              />

              <label
                htmlFor="checkbox"
                className="leading-tight khmer-regular cursor-pointer select-none"
              >
                {t("dialog.agreement")}
              </label>
            </p>

            {/* Confirm Button */}
            <button
              disabled={!checked}
              onClick={() => handleConfirm()}
              className={`
        w-full mt-4 px-4 py-2 rounded-lg transition khmer-regular
        ${
          checked
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }
      `}
            >
              {t("dialog.confirm")}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Register;
