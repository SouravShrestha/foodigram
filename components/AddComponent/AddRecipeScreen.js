import React, {useRef, useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import StepOne from './AddRecipe/StepOne';
import StepTwo from './AddRecipe/StepTwo';
import StepThree from './AddRecipe/StepThree';
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {Colors, Images, DarkTheme} from '../../resources/resources';

const Stack = createStackNavigator();

const SCREEN_WIDTH = Dimensions.get('screen').width;

const AddRecipeScreen = ({_navigation}) => {
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  const [stateStep, setStateStep] = useState(0);
  const stepWidth = useRef(new Animated.Value(0)).current;

  const _stepWidth = stepWidth.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ['0%', '30%', '66%', '100%'],
  });

  function GoBack() {
    if (stateStep == 3) {
      _navigation.navigate('StepTwo');
      setStateStep(2);
    } else if (stateStep == 2) {
      _navigation.navigate('StepOne');
      setStateStep(1);
    } else {
      _navigation.navigate('HomeScreenNavigator');
    }
  }

  useEffect(() => {
    if (stateStep == 0) {
      setStateStep(1);
    }
    Animated.spring(stepWidth, {
      toValue: stateStep,
      useNativeDriver: false,
    }).start();
  }, [stateStep]);

  return (
    <View style={{flex: 1, backgroundColor: DarkTheme.colorAppBar}}>
      <FocusAwareStatusBar
        backgroundColor={DarkTheme.colorAppBar}
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: DarkTheme.colorAppBar,
          paddingVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity
            style={[
              {
                padding: 10,
                borderRadius: 10,
              },
            ]}
            onPress={() => GoBack()}>
            <Image
              source={Images.iconBack}
              style={{height: 25, width: 25, tintColor: Colors.white}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'SFPro-SemiBold',
              fontSize: 20,
              color: Colors.white,
              marginHorizontal: 5,
            }}>
            Add a new recipe
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: (SCREEN_WIDTH - SCREEN_WIDTH * 0.9) / 2,
            marginTop: 20,
          }}>
          <View
            style={{
              width: '100%',
              height: 8,
              backgroundColor: Colors.white,
              borderRadius: 20,
              opacity: 0.3,
            }}></View>
          <Animated.View
            style={{
              position: 'absolute',
              width: _stepWidth,
              height: 8,
              backgroundColor: Colors.white,
              borderRadius: 20,
            }}></Animated.View>
        </View>
        <Text
          style={{
            fontFamily: 'SFPro-Medium',
            fontSize: 14,
            color: Colors.white,
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 5,
          }}>
          Step {stateStep.toString()} of 3
        </Text>
      </View>
      <Stack.Navigator initialRouteName="StepOne" screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
        <Stack.Screen
          key={1}
          name="StepOne"
          component={StepOne}
          initialParams={{stepWidthSetter: setStateStep, stepWidth: stateStep}}
          options={{headerShown: false, presentation: 'transparentModal'}}
        />
        <Stack.Screen
          key={2}
          name="StepTwo"
          component={StepTwo}
          initialParams={{stepWidthSetter: setStateStep, stepWidth: stateStep}}
          options={{headerShown: false}}
        />
        <Stack.Screen
          key={3}
          name="StepThree"
          component={StepThree}
          initialParams={{stepWidthSetter: setStateStep, stepWidth: stateStep}}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </View>
  );
};

export default AddRecipeScreen;
