import { View, Text } from 'react-native'
import React from 'react'
import Camera from './components/camera_comp/Camera'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './components/Home_Comp/Home'
import { Firebase_Auth } from './components/firebase_Auth/Firebase_Auth'
import FeedScreen from './components/feed_comp/FeedScreen'
import CreatePost from './components/createPost_comp/CreatePost'
import { Login } from './components/login_comp/Login'

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='SignUp' component={Firebase_Auth} />
      <Stack.Screen options={{headerShown: true, headerBackButtonMenuEnabled: false, headerBackTitleVisible: false, headerBackVisible:false}} name='feed' component={FeedScreen} />
      <Stack.Screen name='createpost' component={CreatePost} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Camera' component={Camera} options={{title: "you can write any title"}} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App