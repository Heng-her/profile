import { MdArrowBack } from "react-icons/md";

export const CommentHeader: React.FC<{ onBack?: () => void }> = ({
  onBack,
}) => {
  return (
    <header className="hidden items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shrink-0 z-20 sticky top-0">
      <button
        onClick={onBack}
        className="flex items-center justify-center p-2 -ml-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <MdArrowBack className="text-xl" />
      </button>
      <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-8">
        Comments
      </h2>
    </header>
  );
};
