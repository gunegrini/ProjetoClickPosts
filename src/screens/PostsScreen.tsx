import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { PostsScreenNavigationProp } from '../types/navigationTypes';
import { Post } from '../types/Post';
import { usePosts } from '../context/PostsContext';
import { useLocalPosts } from '../context/LocalPostsContext';

const PostsScreen = () => {
  const [deletedPosts, setDeletedPosts] = useState<Set<number>>(new Set());
  const navigation = useNavigation<PostsScreenNavigationProp>();
  const { posts, addPost } = usePosts();
  const { localPosts, deleteLocalPost } = useLocalPosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      response.data.forEach((post: Post) => {
        if (!posts.find(p => p.id === post.id)) {
          addPost(post);
        }
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setDeletedPosts(new Set(deletedPosts).add(postId));
      deleteLocalPost(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const renderItem = useCallback(({ item }: { item: Post }) => {
    if (!item.id || deletedPosts.has(item.id)) return null;

    return (
      <View style={styles.postContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('PostDetails', { postId: item.id })}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postBody}>{item.body}</Text>
          <Text style={styles.postDate}>{new Date(item.date).toLocaleString()}</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteButton}>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { userId: item.userId })}>
            <Text style={styles.userButton}>Ver Usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [deletedPosts, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={[...localPosts, ...posts]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postBody: {
    fontSize: 14,
    marginTop: 10,
  },
  postDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    color: 'red',
  },
  userButton: {
    color: 'blue',
  },
});

export default React.memo(PostsScreen);
