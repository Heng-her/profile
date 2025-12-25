import { emojiDisplay, emojiHoverColors } from "../../assets/style";
import { MdAddReaction } from "react-icons/md";

// Reaction Button Component
const ReactionButton: React.FC<{
  emojiName?: string; // optional for Add button
  count?: number; // optional for Add button
  onClick?: () => void;
  isAddButton?: boolean; // flag to render the add button
}> = ({ emojiName, count = 0, onClick, isAddButton = false }) => {
  if (isAddButton) {
    return (
      <button
        onClick={onClick}
        className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 transition-all active:scale-95"
        title="Add reaction"
      >
        <MdAddReaction className="text-[16px] text-slate-400" />
      </button>
    );
  }

  const hoverColor = emojiHoverColors[emojiName!] || "";
  const emoji = emojiDisplay[emojiName!];

  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 transition-all active:scale-95 ${hoverColor}`}
    >
      <span className="text-sm group-hover:scale-110 transition-transform">
        {emoji}
      </span>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
        {count}
      </span>
    </button>
  );
};

export { ReactionButton };
// not make it hover to show icon for post data