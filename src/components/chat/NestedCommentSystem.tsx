import React, { useState } from "react";
import { FaReply } from "react-icons/fa";
// FaHeart, FaThumbsUp, FaAngry, FaLaughBeam, FaSadTear,
import { buildCommentTree } from "../../util/buildCommentTree";
import { formatDate } from "../../util/formatDate";
import {
  CommentData,
  CommentTreeNode,
  Emoji,
  Reaction,
} from "../../types/comment";
import { sampleData } from "../../data/simpledata";
import { CommentHeader } from "./Header";
import { Avatar } from "./Avatar";
import { CommentInput } from "./CommentInput";
import { ReactionButton } from "./Reactionbar";

// Comment Item Component
const CommentItem: React.FC<{
  comment: CommentTreeNode;
  emojis: Emoji;
  level?: number;
  onReply?: (commentId: number) => void;
}> = ({ comment, emojis, level = 0, onReply }) => {
  const [showReplies, setShowReplies] = useState(true);
  const hasReplies = comment.replies && comment.replies.length > 0;

  // Group reactions by emoji
  const reactionGroups = comment.reactions.reduce((acc, reaction) => {
    const emojiName = emojis[reaction.emojiId.toString()];
    if (!acc[emojiName]) {
      acc[emojiName] = [];
    }
    acc[emojiName].push(reaction);
    return acc;
  }, {} as { [key: string]: Reaction[] });

  const isTopLevel = level === 0;
  const avatarSize = isTopLevel ? "md" : "sm";
  const totalEmojis = Object.values(reactionGroups).reduce(
    (sum, reactions) => sum + reactions.length,
    0
  );

  // console.log(totalEmojis);
  return (
    <div className="flex flex-col relative group">
      <article
        className={`flex flex-col bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative z-10 ${
          level > 0 ? "ml-6" : ""
        }`}
      >
        {level > 0 && (
          <div className="absolute -left-6 top-5 w-6 h-6 border-l-2 border-b-2 border-slate-200 dark:border-slate-700 rounded-bl-2xl"></div>
        )}

        <div className="flex items-start gap-3">
          <Avatar
            user={comment.user}
            size={avatarSize}
            isOnline={isTopLevel && comment.userId === 1}
          />
          <div className="w-full grid">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {comment.user.username}
              </h3>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap ml-2">
                {formatDate(comment.date)}
              </span>
            </div>

            <p className="text-[15px] text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              {comment.text}
            </p>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              {Object.entries(reactionGroups).map(([emojiName, reactions]) => (
                <ReactionButton
                  key={emojiName}
                  emojiName={emojiName}
                  count={reactions.length}
                />
              ))}

              {totalEmojis <= 4 && <ReactionButton isAddButton />}
            </div>

            <div className="flex items-center">
              <button
                onClick={() => onReply?.(comment.id)}
                className="flex items-center gap-1 px-1 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:text-slate-400 dark:hover:bg-slate-700 transition-all"
              >
                <FaReply className="text-[12px]" />
                Reply
              </button>

              {hasReplies && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-xs text-nowrap font-bold text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors px-2 py-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  {showReplies ? "−" : "+"} {comment.replies.length}
                </button>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Nested Replies */}
      {hasReplies && showReplies && (
        <div className="flex flex-col pl-4 mt-4 relative">
          <div className="absolute left-0 -top-4 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 ml-5 rounded-b-full"></div>

          <div className="space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                emojis={emojis}
                level={level + 1}
                onReply={onReply}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Comment System Component
const NestedCommentSystem: React.FC<{
  data?: CommentData;
  onBack?: () => void;
  onReply?: (commentId: number) => void;
  onSubmit?: (text: string) => void;
  renderActionButton?: () => JSX.Element | undefined;

}> = ({ data = sampleData, onBack, onReply, onSubmit, renderActionButton }) => {
  const commentTree = buildCommentTree(data.comments, data.users);
  const currentUser = data.users[0]; // Assuming first user is current user

  return (
    <div className="font-sans bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col h-screen antialiased">
      <CommentHeader onBack={onBack} />

      <main className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="space-y-6">
          {commentTree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              emojis={data.emojis}
              onReply={onReply}
            />
          ))}
        </div>
      </main>
      <CommentInput
        currentUser={currentUser}
        onSubmit={onSubmit}
        renderActionButton={renderActionButton}
      />
    </div>
  );
};

export default NestedCommentSystem;

// Export individual components for custom usage
export { CommentItem, CommentHeader, CommentInput, Avatar, ReactionButton };
