import React, {useEffect} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StepTwo = ({route, navigation}) => {
  

  return (
    <View style={styles.panel__back}>
      <Text style={styles.txt_temp}>StepTwo</Text>
      <TouchableOpacity onPress={() => navigation.navigate('StepThree')}>
        <Text style={{color: 'black', fontSize: 42}}>NEXT</Text>
      </TouchableOpacity>
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

export default StepTwo;
