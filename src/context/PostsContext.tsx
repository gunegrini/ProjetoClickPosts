import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Post } from '../types/Post';

interface PostsContextProps {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
}

interface PostsProviderProps {
  children: ReactNode;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextProps => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
