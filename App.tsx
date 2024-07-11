import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './src/screens/MenuScreen';
import PostsScreen from './src/screens/PostsScreen';
import PostDetails from './src/screens/PostDetails';
import UserDetails from './src/screens/UserDetails';
import PostForm from './src/components/PostForm';
import AboutScreen from './src/screens/AboutScreen';
import { RootStackParamList } from './src/types/navigationTypes';
import { PostsProvider } from './src/context/PostsContext';
import { LocalPostsProvider } from './src/context/LocalPostsContext';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <PostsProvider>
        <LocalPostsProvider>
          <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#6200ee' }, headerTintColor: '#fff' }}>
            <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
            <Stack.Screen name="Posts" component={PostsScreen} options={{ title: 'Postagens' }} />
            <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Detalhes do Post' }} />
            <Stack.Screen name="UserDetails" component={UserDetails} options={{ title: 'Detalhes do Usuário' }} />
            <Stack.Screen name="PostForm" component={PostForm} options={{ title: 'Nova Postagem' }} />
            <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre' }} />
          </Stack.Navigator>
        </LocalPostsProvider>
      </PostsProvider>
    </NavigationContainer>
  );
};

export default App;
