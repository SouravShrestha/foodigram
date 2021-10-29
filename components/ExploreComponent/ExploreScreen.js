import React, {useEffect} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';

const ExploreScreen = ({route, navigation}) => {
  return (
    <View style={styles.panel__back}>
      <Text style={styles.txt_temp}>Explore Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  panel__back: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'lightblue',
  },
  txt_temp: {
    fontSize: 42,
  },
});

export default ExploreScreen;
