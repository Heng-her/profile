import React, { useState } from "react";
import { VscLoading } from "react-icons/vsc";

export type Sex = "M" | "F" | "Other" | "";

export interface RegisterData {
  id?: string; // Optional for register, required for update
  username: string;
  sex: Sex;
  age: number;
}

interface RegisterFormProps {
  mode: "register" | "update";
  initialData?: RegisterData;
  onRegister: (data: RegisterData) => void;
  onClose: () => void;
  loading: boolean;
}

export default function RegisterForm({
  mode,
  initialData,
  onRegister,
  onClose,
  loading,
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterData>(
    initialData || {
      username: "",
      sex: "",
      age: 0,
    }
  );

  const [msg, setMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.sex && formData.age > 0 && formData.age < 50) {
      onRegister({ ...formData });
    } else {
      if (formData.age >= 50) setMsg(true);
      setTimeout(() => setMsg(false), 4000);
    }
  };

  return (
    <div className="p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-200/50 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {mode === "register" ? "Register" : "Update Profile"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Hidden ID field for update */}
        {mode === "update" && formData.id && (
          <input type="hidden" name="id" value={formData.id} />
        )}

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-amber-50/50 rounded-xl outline-none "
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === " ") e.preventDefault();
            }}
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium">Age</label>
          {msg && (
            <span className="text-red-500 text-xs block mb-1">
              Age must be between 1 and 49
            </span>
          )}
          <input
            type="number"
            inputMode="numeric"
            required
            min="1"
            max="49"
            className="w-full px-3 py-2 border border-amber-50/50 rounded-xl outline-none"
            value={formData.age || ""}
            onChange={(e) => {
              const val = e.target.value;
              const num = val === "" ? 0 : Number(val);
              if (num >= 50) {
                setMsg(true);
                setTimeout(() => setMsg(false), 3000);
                return;
              }
              setFormData({ ...formData, age: num });
            }}
          />
        </div>

        {/* Sex */}
        <div>
          <label className="block text-sm font-medium mb-2">Sex</label>
          <div className="flex gap-4">
            {(["M", "F", "Other"] as const).map((option) => (
              <label key={option} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="sex"
                  required
                  value={option}
                  checked={formData.sex === option}
                  onChange={(e) =>
                    setFormData({ ...formData, sex: e.target.value as Sex })
                  }
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm group-hover:text-gray-900">
                  {option === "M" ? "Male" : option === "F" ? "Female" : "Other"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || (formData.age >= 50)}
          className={`w-full py-2 rounded-md font-semibold transition ${
            loading || formData.age >= 50
              ? "bg-gray-400 cursor-not-allowed"
              : mode === "register"
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-green-600 hover:bg-green-700"
          } flex items-center justify-center`}
        >
          {loading ? (
            <VscLoading className="animate-spin" />
          ) : mode === "register" ? (
            "Create Account"
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
}