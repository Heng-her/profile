const emojiDisplay: { [key: string]: string } = {
  love: "❤️",
  like: "👍",
  angry: "😠",
  haha: "😆",
  cry: "😢",
};

const emojiHoverColors: { [key: string]: string } = {
  love: "hover:bg-red-50 dark:hover:bg-red-900/20 group-hover:text-red-500",
  like: "hover:bg-blue-50 dark:hover:bg-blue-900/20 group-hover:text-blue-500",
  angry:
    "hover:bg-orange-50 dark:hover:bg-orange-900/20 group-hover:text-orange-500",
  haha: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20 group-hover:text-yellow-600",
  cry: "hover:bg-gray-50 dark:hover:bg-gray-900/20 group-hover:text-gray-500",
};
const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  ];
export { emojiDisplay, emojiHoverColors, gradients };
