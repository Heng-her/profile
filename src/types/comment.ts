export interface Emoji {
  [key: string]: string;
}

export interface User {
  id: number;
  username: string;
  sex: string;
  age: number;
}

export interface Reaction {
  userId: number;
  emojiId: number;
}

export interface Comment {
  id: number;
  parentId: number | null;
  userId: number;
  text: string;
  date: string;
  reactions: Reaction[];
}

export interface CommentData {
  emojis: Emoji;
  users: User[];
  comments: Comment[];
}

export interface CommentTreeNode extends Comment {
  user: User;
  replies: CommentTreeNode[];
}
