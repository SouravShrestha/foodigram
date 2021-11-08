import React, {useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PostScreen from './PostScreen';
import ReviewAndRating from './ReviewAndRating';
import {View} from 'react-native';
import { Theme } from '../Shared/Theme';

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <View style={{backgroundColor: Theme.colorBack, flex: 1}}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReviewAndRating"
          component={ReviewAndRating}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </View>
  );
};

export default HomeScreenNavigator;
