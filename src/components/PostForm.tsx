import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { usePosts } from '../context/PostsContext';
import { useLocalPosts } from '../context/LocalPostsContext';
import { Post } from '../types/Post';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import axios from 'axios';

type PostFormNavigationProp = StackNavigationProp<RootStackParamList, 'PostForm'>;

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [apiUsers, setApiUsers] = useState<{ id: number; name: string }[]>([]);
  const navigation = useNavigation<PostFormNavigationProp>();
  const { addPost } = usePosts();
  const { addLocalPost, localUsers, addLocalUser } = useLocalPosts();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setApiUsers(response.data);
      } catch (error) {
        console.error('Error fetching users from API:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      let finalUserId = userId;
      if (isNewUser) {
        const newUserId = Date.now();
        addLocalUser({
          id: newUserId,
          name: userName,
          email: userEmail,
          phone: userPhone
        });
        finalUserId = newUserId;
      }

      const newPost: Post = {
        userId: finalUserId!,
        id: Date.now(),
        title,
        body,
        date: new Date().toISOString()
      };

      addPost(newPost);
      addLocalPost(newPost);

      Alert.alert('Sucesso', 'Postagem criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Posts', { newPost }),
        },
      ]);
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Erro', 'Não foi possível criar a postagem. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Text style={styles.label}>Novo usuário (ative o botão ao lado)</Text>
      <Switch
        value={isNewUser}
        onValueChange={setIsNewUser}
      />
      {isNewUser ? (
        <>
          <Text style={styles.label}>Nome do Novo Usuário</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
          />
          <Text style={styles.label}>Email do Novo Usuário</Text>
          <TextInput
            style={styles.input}
            value={userEmail}
            onChangeText={setUserEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Telefone do Novo Usuário</Text>
          <TextInput
            style={styles.input}
            value={userPhone}
            onChangeText={setUserPhone}
            keyboardType="phone-pad"
          />
        </>
      ) : (
        <Picker
          selectedValue={userId}
          onValueChange={(itemValue) => setUserId(itemValue as number)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um usuário" value={undefined} />
          {apiUsers.map((user) => (
            <Picker.Item key={user.id} label={user.name} value={user.id} />
          ))}
        </Picker>
      )}
      <Button title="Criar Postagem" onPress={handleSubmit} />
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
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
});

export default PostForm;
