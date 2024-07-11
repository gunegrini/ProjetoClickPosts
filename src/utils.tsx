// src/utils.tsx
import { Post } from './types/Post';

export const addUniquePost = (posts: Post[], newPost: Post): Post[] => {
  const existingPost = posts.find(post => post.id === newPost.id);
  if (existingPost) {
    return posts;
  }
  return [newPost, ...posts];
};

export const addUniqueUser = (users: { id: number; name: string; email: string; phone: string }[], newUser: { id: number; name: string; email: string; phone: string }): { id: number; name: string; email: string; phone: string }[] => {
  const existingUser = users.find(user => user.id === newUser.id);
  if (existingUser) {
    return users;
  }
  return [newUser, ...users];
};
