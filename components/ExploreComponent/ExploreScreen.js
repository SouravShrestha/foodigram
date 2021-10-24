import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ExploreScreen = () => {
  return (
    <View style={styles.panel__back}>
      <Text style={styles.txt_temp}>Explore Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    panel__back:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'lightblue'
    },
    txt_temp: {
        fontSize: 42
    }
});

export default ExploreScreen;