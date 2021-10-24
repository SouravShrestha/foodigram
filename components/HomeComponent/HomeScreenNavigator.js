import React, {useRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PostScreen from './PostScreen';

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Post" component={PostScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default HomeScreenNavigator;
