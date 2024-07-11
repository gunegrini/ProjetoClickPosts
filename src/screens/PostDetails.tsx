import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { PostDetailsRouteProp } from '../types/navigationTypes';
import { useRoute } from '@react-navigation/native';
import { Post } from '../types/Post';
import { useLocalPosts } from '../context/LocalPostsContext';
import { usePosts } from '../context/PostsContext';

const PostDetails = () => {
  const route = useRoute<PostDetailsRouteProp>();
  const { postId } = route.params;
  const { localPosts } = useLocalPosts();
  const { posts } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      // Check if the post is found locally
      const localPost = localPosts.find(p => p.id === postId);
      if (localPost) {
        setPost(localPost);
        setLoading(false);
        return;
      }

      // Check if the post is found in the API posts context
      const apiPost = posts.find(p => p.id === postId);
      if (apiPost) {
        setPost(apiPost);
        setLoading(false);
        return;
      }

      // Fetch post from the API
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post from API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, localPosts, posts]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.date}>{new Date(post.date).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default PostDetails;
