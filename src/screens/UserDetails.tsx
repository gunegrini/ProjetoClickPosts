import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { UserDetailsRouteProp } from '../types/navigationTypes';
import { useLocalPosts } from '../context/LocalPostsContext';

const UserDetails = () => {
  const route = useRoute<UserDetailsRouteProp>();
  const { userId } = route.params;
  const [user, setUser] = useState<{ id: number; name: string; email: string; phone: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { localUsers } = useLocalPosts();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const localUser = localUsers.find(u => u.id === userId);
        if (localUser) {
          setUser(localUser);
        } else {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, localUsers]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{user.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.value}>{user.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    marginTop: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default UserDetails;
