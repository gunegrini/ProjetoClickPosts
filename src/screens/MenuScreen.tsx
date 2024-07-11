import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

interface MenuScreenProps {
  navigation: MenuScreenNavigationProp;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao ClickPosts</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Posts', { newPost: undefined })}>
          <Text style={styles.buttonText}>Ver Postagens</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PostForm', { post: undefined })}>
          <Text style={styles.buttonText}>Criar Postagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttonText}>Sobre</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
