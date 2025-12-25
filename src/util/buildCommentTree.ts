import type { Comment, User, CommentTreeNode } from "../types/comment";

export const buildCommentTree = (
  comments: Comment[],
  users: User[]
): CommentTreeNode[] => {
  const map = new Map<number, CommentTreeNode>();
  const roots: CommentTreeNode[] = [];

  comments.forEach((comment) => {
    const user = users.find((u) => u.id === comment.userId)!;
    map.set(comment.id, { ...comment, user, replies: [] });
  });

  comments.forEach((comment) => {
    const node = map.get(comment.id)!;
    if (comment.parentId === null) {
      roots.push(node);
    } else {
      map.get(comment.parentId)?.replies.push(node);
    }
  });

  return roots;
};
