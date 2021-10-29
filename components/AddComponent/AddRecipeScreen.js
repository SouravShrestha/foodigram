import React, {useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StepOne from './AddRecipe/StepOne';
import StepTwo from './AddRecipe/StepTwo';
import StepThree from './AddRecipe/StepThree';

const Stack = createStackNavigator();

const AddRecipeScreen = ({route, navigation}) => {
  return (
    <Stack.Navigator initialRouteName="StepOne">
      <Stack.Screen
        key={1}
        name="StepOne"
        component={StepOne}
        options={{headerShown: true}}
      />
      <Stack.Screen
        key={2}
        name="StepTwo"
        component={StepTwo}
        options={{headerShown: true}}
      />
      <Stack.Screen
        key={3}
        name="StepThree"
        component={StepThree}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default AddRecipeScreen;
