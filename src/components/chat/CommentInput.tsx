import { MdSend, MdSentimentSatisfied } from "react-icons/md";
import { Avatar } from "./Avatar";
import { useState } from "react";
import { User } from "../../types/comment";

// Input Footer Component
const CommentInput: React.FC<{
  currentUser?: User;
  onSubmit?: (text: string) => void;
}> = ({ currentUser, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit?.(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <footer className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-3 sticky bottom-0 w-full z-30 shadow-[0_-8px_20px_-5px_rgba(0,0,0,0.05)]">
      <div className="flex items-end gap-3 max-w-3xl mx-auto">
        {currentUser && <Avatar user={currentUser} size="sm" />}

        <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 rounded-[20px] flex items-center px-4 py-2 min-h-11 border border-slate-200 dark:border-slate-700 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent border-none p-0 w-full text-[15px] text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 focus:outline-none"
            placeholder="Write a reply..."
            type="text"
          />
          <button className="ml-2 text-slate-400 hover:text-blue-500 transition-colors p-1">
            <MdSentimentSatisfied className="text-[20px]" />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 transition-all active:scale-90 mb-0.5"
        >
          <MdSend className="text-[20px] ml-0.5" />
        </button>
      </div>
    </footer>
  );
};
export { CommentInput };
