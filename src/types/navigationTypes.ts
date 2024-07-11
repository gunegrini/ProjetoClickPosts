
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Post } from './Post'; 

export type RootStackParamList = {
  Menu: undefined;
  Posts: { newPost?: Post };
  PostDetails: { postId: number };
  UserDetails: { userId: number };
  PostForm: { post?: Post };
  About: undefined;
};

export type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;
export type PostsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Posts'>;
export type PostDetailsRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;
export type UserDetailsRouteProp = RouteProp<RootStackParamList, 'UserDetails'>;
export type PostFormNavigationProp = StackNavigationProp<RootStackParamList, 'PostForm'>;
export type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'About'>; 
export type PostsScreenRouteProp = RouteProp<RootStackParamList, 'Posts'>;
