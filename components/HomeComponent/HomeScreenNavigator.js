import React, {useRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PostScreen from './PostScreen';
import ReviewAndRating from'./ReviewAndRating';

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReviewAndRating" component={ReviewAndRating} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default HomeScreenNavigator;
