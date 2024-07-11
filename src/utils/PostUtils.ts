// src/utils/PostUtils.ts
import { Post } from '../types/Post';

let lastId = 0;

export const generateUniqueId = (): number => {
  return ++lastId;
};

export const generateUniqueKey = (): string => {
  return `post-${Date.now()}-${Math.random()}`;
};

export const ensureUniquePosts = (posts: Post[]): Post[] => {
  const seenIds = new Set<number>();
  return posts.filter(post => {
    if (seenIds.has(post.id)) {
      return false;
    } else {
      seenIds.add(post.id);
      return true;
    }
  });
};
