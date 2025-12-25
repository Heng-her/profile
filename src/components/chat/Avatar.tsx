import { gradients } from "../../assets/style";
import { User } from "../../types/comment";

// Avatar Component
const Avatar: React.FC<{
  user: User;
  size?: "sm" | "md";
  isOnline?: boolean;
}> = ({ user, size = "md", isOnline = false }) => {
  const sizeClasses = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-center rounded-full ${sizeClasses} shrink-0 ring-2 ring-white dark:ring-slate-700 shadow-sm text-white font-bold`}
        style={{ backgroundImage: gradients[user.id % gradients.length] }}
      >
        {user.sex}
      </div>
      {isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
      )}
    </div>
  );
};

export { Avatar };
