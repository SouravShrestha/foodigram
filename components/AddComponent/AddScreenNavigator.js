import React from 'react';
import {View} from 'react-native';
import AddOnlyPictureScreen from './AddOnlyPictureScreen';
import AddRecipeScreen from './AddRecipeScreen';

const AddScreenNavigator = ({route, navigation}) => {
  const screenName = route.params.toScreen;
  return screenName == 'AddRecipeScreen' ? <AddRecipeScreen /> : <AddOnlyPictureScreen />;
};

export default AddScreenNavigator;
