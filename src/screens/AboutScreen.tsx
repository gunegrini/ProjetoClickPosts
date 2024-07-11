// src/screens/AboutScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/fotogu.png')} style={styles.profileImage} />
      <Text style={styles.title}>Gustavo Negrini Miranda</Text>
      <Text style={styles.subtitle}>Desenvolvedor de Software</Text>
      <Text style={styles.info}>Formado em Análise e Desenvolvimento de Sistemas pela Uniso</Text>
      <Text style={styles.info}>Cursando Técnico em Desenvolvimento de Sistemas pela Etec</Text>
      <Text style={styles.info}>Experiência em Java, C#, .NET, React Native, e mais</Text>
      <Text style={styles.info}>Contato: gustavo.negrini7@gmail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AboutScreen;
