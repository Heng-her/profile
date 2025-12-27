import { useState } from "react";

type CircularMenuProps = {
  isLoggedIn: boolean;
  onClose: () => void;
  onConfirm: (finalSelection: string) => void;
};

export default function CircularMenuPopup({
  isLoggedIn,
  onClose,
  onConfirm,
}: CircularMenuProps) {
  const options = isLoggedIn
    ? ["Profile", "Settings", "Update", "Logout", "Support"]
    : ["Home", "About", "Login", "Register", "Contact"];

  // Default to the middle option
  const [selected, setSelected] = useState<string>(options[2]);

  //   const handleSelect = (value: string) => {
  //     setSelected(value);
  //     if (onChange) onChange(value);
  //   };
  const handleSelect = (value: string) => {
    setSelected(value);
  };
  // Map options to rotation angles (distributed from -80 to 80 degrees)
  const getAngle = (index: number) => {
    const startAngle = -80;
    const endAngle = 80;
    const step = (endAngle - startAngle) / (options.length - 1);
    return startAngle + index * step;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative w-[450px] h-[450px] bg-zinc-900 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center border border-white/10">
        {/* Navigation Label */}
        <div className="absolute top-10 text-zinc-500 uppercase tracking-[0.2em] text-xs font-bold">
          Quick Navigation
        </div>

        {/* Circular Control Area */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          {options.map((option, index) => {
            const angle = getAngle(index);
            const radius = 140; // Increased radius to give text more room
            const x = Math.sin((angle * Math.PI) / 180) * radius;
            const y = -Math.cos((angle * Math.PI) / 180) * radius;

            const isActive = selected === option;

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`absolute transition-all duration-300 ease-out flex flex-col items-center group`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {/* The Text Label */}
                <span
                  className={`text-sm font-bold tracking-wide transition-colors ${
                    isActive
                      ? "text-white scale-110"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {option}
                </span>

                {/* Visual Indicator Dot */}
                <div
                  className={`mt-2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                      : "bg-zinc-700"
                  }`}
                />
              </button>
            );
          })}

          {/* THE KNOB */}
          <div
            className="absolute w-44 h-44 rounded-full bg-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-zinc-700 flex items-center justify-center transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
            style={{
              transform: `rotate(${getAngle(options.indexOf(selected))}deg)`,
            }}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-black/20 to-white/5 pointer-events-none" />

            {/* Directional Indicator */}
            <div className="absolute top-3 w-1 h-8 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />

            {/* Center Cap */}
            <div className="w-32 h-32 rounded-full bg-zinc-900 border border-zinc-700 shadow-inner flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 shadow-xl" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-10 flex gap-6">
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className="px-10 py-3 bg-cyan-500 text-black rounded-full font-black shadow-lg"
          >
            CONFIRM {selected.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
