import React from 'react';
import {Animated, Dimensions, Image, StyleSheet, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRef} from 'react';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchSreen';
import {Images, Colors} from '../resources/resources';
import ProfileScreen from './ProfileScreen';
import AddScreen from './AddScreen';
import ExploreScreen from './ExploreScreen';

const Tab = createBottomTabNavigator();

export default function NavigationScreen() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const tabs_data = [
    {
      id: 1,
      _name: 'Home',
      _component: HomeScreen,
      _image: Images.iconHome,
      _tintColor: Colors.black,
      _style: styles.img__tab,
      _toValue: 0,
    },
    {
      id: 2,
      _name: 'Search',
      _component: SearchScreen,
      _image: Images.iconSearch,
      _tintColor: Colors.black,
      _style: styles.img__tab,
      _toValue: getWidth(),
    },
    {
      id: 3,
      _name: 'Action Button',
      _component: AddScreen,
      _image: Images.iconAdd,
      _tintColor: Colors.black,
      _style: styles.img__tabaction,
      _toValue: getWidth() * 2,
    },
    {
      id: 4,
      _name: 'Explore',
      _component: ExploreScreen,
      _image: Images.iconExplore,
      _tintColor: Colors.black,
      _style: styles.img__tab,
      _toValue: getWidth() * 3,
    },
    {
      id: 5,
      _name: 'Profile',
      _component: ProfileScreen,
      _image: Images.iconAvatar,
      _style: styles.img__tab,
      _tintColor: 'none',
      _toValue: getWidth() * 4,
    },
  ];
  const tabs = tabs_data.map(item => {
    return (
      <Tab.Screen
        key={item.id}
        name={item._name}
        component={item._component}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={item._image}
              style={[
                item._style,
                !focused || item._tintColor == 'none'
                  ? ''
                  : styles.img__tint(item._tintColor),
              ]}
            />
          ),
        }}
        listeners={() => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: item._toValue,
              useNativeDriver: true,
            }).start();
          },
        })}></Tab.Screen>
    );
  });
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.light} barStyle="dark-content" />
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: styles.nav__navigator,
        }}>
        {tabs}
      </Tab.Navigator>

      <Animated.View
        style={{
          width: getWidth() - 28,
          height: 3,
          backgroundColor: Colors.black,
          position: 'absolute',
          bottom: 30,
          left: 40,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </NavigationContainer>
  );
}

function getWidth() {
  let width = Dimensions.get('window').width;
  width = width - 50;
  return width / 5;
}

const styles = StyleSheet.create({
  img__tab: {
    height: 25,
    width: '100%',
    aspectRatio: 1,
  },
  img__tabaction: {
    height: 30,
    width: '100%',
    aspectRatio: 1,
  },
  nav__navigator: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 30,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,
    elevation: 10.5,
    borderTopColor: '#eee',
    shadowColor: '#999',
    paddingHorizontal: 5,
  },
  img__tint: _tintColor => ({
    tintColor: _tintColor,
  }),
});
