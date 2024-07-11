import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../types/Post';

interface LocalPostsContextProps {
  localPosts: Post[];
  localUsers: { id: number; name: string; email: string; phone: string }[];
  addLocalPost: (post: Post) => void;
  addLocalUser: (user: { id: number; name: string; email: string; phone: string }) => void;
  deleteLocalPost: (postId: number) => void;
  setLocalPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

interface LocalPostsProviderProps {
  children: ReactNode;
}

const LocalPostsContext = createContext<LocalPostsContextProps | undefined>(undefined);

export const LocalPostsProvider: React.FC<LocalPostsProviderProps> = ({ children }) => {
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [localUsers, setLocalUsers] = useState<{ id: number; name: string; email: string; phone: string }[]>([]);

  useEffect(() => {
    const loadLocalData = async () => {
      const storedPosts = await AsyncStorage.getItem('localPosts');
      if (storedPosts) {
        setLocalPosts(JSON.parse(storedPosts));
      }
      const storedUsers = await AsyncStorage.getItem('localUsers');
      if (storedUsers) {
        setLocalUsers(JSON.parse(storedUsers));
      }
    };

    loadLocalData();
  }, []);

  const addLocalPost = async (post: Post) => {
    const updatedPosts = [post, ...localPosts];
    setLocalPosts(updatedPosts);
    await AsyncStorage.setItem('localPosts', JSON.stringify(updatedPosts));
  };

  const addLocalUser = async (user: { id: number; name: string; email: string; phone: string }) => {
    const updatedUsers = [user, ...localUsers];
    setLocalUsers(updatedUsers);
    await AsyncStorage.setItem('localUsers', JSON.stringify(updatedUsers));
  };

  const deleteLocalPost = async (postId: number) => {
    const updatedPosts = localPosts.filter(post => post.id !== postId);
    setLocalPosts(updatedPosts);
    await AsyncStorage.setItem('localPosts', JSON.stringify(updatedPosts));
  };

  return (
    <LocalPostsContext.Provider value={{ localPosts, localUsers, addLocalPost, addLocalUser, deleteLocalPost, setLocalPosts }}>
      {children}
    </LocalPostsContext.Provider>
  );
};

export const useLocalPosts = (): LocalPostsContextProps => {
  const context = useContext(LocalPostsContext);
  if (!context) {
    throw new Error('useLocalPosts must be used within a LocalPostsProvider');
  }
  return context;
};
