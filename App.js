import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NavigationScreen from './components/WelcomeComponent/NavigationScreen';

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
