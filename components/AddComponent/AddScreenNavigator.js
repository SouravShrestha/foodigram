import React from 'react';
import AddOnlyPictureScreen from './AddOnlyPictureScreen';
import AddRecipeScreen from './AddRecipeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react/cjs/react.development';

const Stack = createStackNavigator();

const AddScreenNavigator = ({route, navigation}) => {

  return (
    <Stack.Navigator initialRouteName={AddRecipeScreen}>
      <Stack.Screen
        name="AddRecipeScreen"
        component={AddRecipeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddOnlyPictureScreen"
        component={AddOnlyPictureScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AddScreenNavigator;
