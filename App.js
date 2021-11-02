import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NavigationScreen from './components/WelcomeComponent/NavigationScreen';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['Internal React error']);
LogBox.ignoreLogs(["EventEmitter.removeListener('change', ...)"]);
LogBox.ignoreLogs(["Non-serializable values were found in the navigation state. Check"]);

const App = () => {
  return (
    <View style={styles.back__container}>
      <NavigationScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  back__container: {
    flex: 1,
  },
});

export default App;
