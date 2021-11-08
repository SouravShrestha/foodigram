import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
  BackHandler,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useRef} from 'react';
import SearchScreen from '../SearchComponent/SearchScreen';
import {Images, Colors, DarkTheme} from '../../resources/resources';
import ProfileScreen from '../ProfileComponent/ProfileScreen';
import AddScreenNavigator from '../AddComponent/AddScreenNavigator';
import ExploreScreen from '../ExploreComponent/ExploreScreen';
import HomeScreenNavigator from '../HomeComponent/HomeScreenNavigator';
import BottomSheet from 'reanimated-bottom-sheet';
import { Theme } from '../Shared/Theme';

const Tab = createBottomTabNavigator();
const SCREEN_HEIGHT = Dimensions.get('screen').height;
let _currentSnap = 1;
let _currentScreen = 'HomeScreenNavigator';

export default function NavigationScreen() {
  const [_navigation, setNavigation] = useState(null);

  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const tabs_data = [
    {
      id: 1,
      _name: 'HomeScreenNavigator',
      _component: HomeScreenNavigator,
      _image: Images.iconHome,
      _tintColor: Theme.colorActive,
      _style: styles.img__tab,
      _toValue: 0,
    },
    {
      id: 2,
      _name: 'SearchScreen',
      _component: SearchScreen,
      _image: Images.iconSearch,
      _tintColor: Theme.colorActive,
      _style: styles.img__tab,
      _toValue: getWidth(),
    },
    {
      id: 3,
      _name: 'AddScreenNavigator',
      _component: AddScreenNavigator,
      _image: Images.iconAdd,
      _tintColor: Theme.colorActive,
      _style: styles.img__tabaction,
      _toValue: getWidth() * 2,
    },
    {
      id: 4,
      _name: 'ExploreScreen',
      _component: ExploreScreen,
      _image: Images.iconExplore,
      _tintColor: Theme.colorActive,
      _style: styles.img__tab,
      _toValue: getWidth() * 3,
    },
    {
      id: 5,
      _name: 'ProfileScreen',
      _component: ProfileScreen,
      _image: Images.iconAvatar,
      _style: styles.img__tab,
      _tintColor: 'none',
      _toValue: getWidth() * 4,
    },
  ];

  const bottomSheetRef = React.useRef(null);
  const [showBackDrawerPanel, setShowBackDrawerPanel] = useState(false);

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
                !focused
                  ? item._tintColor != 'none'
                    ? {tintColor: Theme.colorInactive}
                    : ''
                  : item._tintColor != 'none'
                  ? styles.img__tint(item._tintColor)
                  : '',
              ]}
            />
          ),
        }}
        listeners={({navigation}) => ({
          state: () => {
            _currentScreen = item._name;
            if (item._name != 'AddScreenNavigator') {
              bottomSheetRef?.current?.snapTo(1);
              _currentSnap = 1;
              setShowBackDrawerPanel(false);
            }
            setNavigation(navigation);
            Animated.spring(tabOffsetValue, {
              toValue: item._toValue,
              useNativeDriver: true,
            }).start();
          },
          tabPress: e => {
            if (item._name == 'AddScreenNavigator') {
              e.preventDefault();
              if (_currentScreen != 'AddScreenNavigator') {
                _currentSnap = 0;
                bottomSheetRef?.current?.snapTo(0);
                setShowBackDrawerPanel(true);
              }
            } else {
              bottomSheetRef?.current?.snapTo(1);
              _currentSnap = 1;
              setShowBackDrawerPanel(false);
            }
          },
        })}></Tab.Screen>
    );
  });

  useEffect(() => {
    const backAction = () => {
      if (_currentScreen == 'HomeScreenNavigator' && _currentSnap == 1) {
        //on home screen
      }
      let retVal = _currentSnap == 0;
      if (retVal) {
        bottomSheetRef?.current?.snapTo(1);
        setShowBackDrawerPanel(false);
      }
      _currentSnap = 1;
      return retVal;
    };
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, []);

  const BottomSheetView = () => (
    <View
      style={{
        height: '100%',
      }}>
      <View style={styles.panel__bottomSheet}>
        <Text style={styles.txt_heading}>What would you like to add? 😋</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.btn__add}
          onPress={() => {
            _navigation.navigate('AddScreenNavigator', {
              toScreen: 'AddRecipeScreen',
            });
            bottomSheetRef?.current?.snapTo(1);
            setShowBackDrawerPanel(false);
            _currentSnap = 1;
          }}>
          <Text style={styles.txt_btn}>🥘 Full Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.btn__add]}
          onPress={() => {
            _navigation.navigate('AddScreenNavigator', {
              toScreen: 'AddOnlyPictureScreen',
            });
            bottomSheetRef?.current?.snapTo(1);
            setShowBackDrawerPanel(false);
            _currentSnap = 1;
          }}>
          <Text style={[styles.txt_btn]}>🖼️ Only pictures</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn__cancel}
          activeOpacity={0.6}
          onPress={() => {
            bottomSheetRef?.current?.snapTo(1);
            setShowBackDrawerPanel(false);
            _currentSnap = 1;
          }}>
          <Text style={[styles.txt_btn, {color: Colors.secondaryText}]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const [navBarBottom, setNavbarBottom] = useState(30);
  useEffect(() => {
    const handleKeyboardShow = () => {
      setNavbarBottom(-10);
    };
    const handleKeyboardHide = () => {
      setNavbarBottom(30);
    };
    let keyboardDidHide, keyboardWillShow, keyboardWillHide, keyboardDidShow;

    if (Platform.OS === 'ios') {
      keyboardWillShow = Keyboard.addListener(
        'keyboardWillShow',
        handleKeyboardShow,
      );

      keyboardWillHide = Keyboard.addListener(
        'keyboardWillHide',
        handleKeyboardHide,
      );
    } else {
      keyboardDidShow = Keyboard.addListener(
        'keyboardDidShow',
        handleKeyboardShow,
      );

      keyboardDidHide = Keyboard.addListener(
        'keyboardDidHide',
        handleKeyboardHide,
      );
    }

    return () => {
      if (Platform.OS === 'ios') {
        keyboardWillHide?.remove();
        keyboardWillShow?.remove();
      } else {
        keyboardDidShow?.remove();
        keyboardDidHide?.remove();
      }
    };
  }, []);

  return (
    <NavigationContainer style={{flex: 1}}>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: styles.nav__navigator(navBarBottom),
          keyboardHidesTabBar: true,
        }}
        backBehavior="initialRoute">
        {tabs}
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 28,
          height: 3,
          backgroundColor: Theme.colorActive,
          position: 'absolute',
          bottom: navBarBottom,
          left: 40,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
      {showBackDrawerPanel && (
        <View style={styles.panel__backTransparent}></View>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[SCREEN_HEIGHT * 0.35, 0]}
        borderRadius={10}
        initialSnap={1}
        renderContent={BottomSheetView}
      />
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
    height: 23,
    width: '100%',
    aspectRatio: 1,
  },
  img__tabaction: {
    height: 30,
    width: '100%',
    aspectRatio: 1,
  },
  nav__navigator: navBarBottom => ({
    backgroundColor: Theme.colorAppBar,
    position: 'absolute',
    bottom: navBarBottom,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,
    elevation: 10.5,
    borderTopColor: Theme.colorAppBar,
    paddingHorizontal: 5,
  }),
  img__tint: _tintColor => ({
    tintColor: _tintColor,
  }),

  panel__backTransparent: {
    backgroundColor: Theme.colorBack,
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.5,
  },
  panel__bottomSheet: {
    backgroundColor: Theme.colorAppBar,
    height: '100%',
    borderRadius: 25,
    width: '100%',
    position: 'absolute',
    paddingBottom: 35,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn__add: {
    alignItems: 'center',
    width: '85%',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    borderColor: Theme.colorBorderButton,
    borderWidth: 1.75,
    marginTop: 30,
  },
  txt_btn: {
    fontSize: 16,
    color: Theme.colorText,
    fontFamily: 'SFPro-Medium',
  },
  btn__cancel: {
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 25,
  },
  txt_heading: {
    fontSize: 19,
    color: Theme.colorText,
    fontFamily: 'SFPro-SemiBold',
    marginBottom: 15,
  },
});
