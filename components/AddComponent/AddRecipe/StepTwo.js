import React, {useEffect} from 'react';
import {View, Text, StyleSheet, BackHandler, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react/cjs/react.development';
import {Colors} from '../../../resources/resources';

const StepTwo = ({route, navigation}) => {
  const {stepWidthSetter} = route.params;

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      stepWidthSetter(1);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.panel__back}>
      <ScrollView
        style={{
          width: '100%',
          backgroundColor: Colors.white,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}>
        <TouchableOpacity
          onPress={() => {
            stepWidthSetter(3);
            navigation.navigate('StepThree');
          }}
          style={{
            backgroundColor: Colors.primary,
            width: '100%',
            paddingVertical: 15,
            alignItems: 'center',
            marginTop: 20,
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontFamily: 'SFPro-Medium',
              color: Colors.white,
              fontSize: 16,
            }}>
            Next
          </Text>
        </TouchableOpacity>
        <EmptyView />
      </ScrollView>
    </View>
  );
};

const EmptyView = () => <View style={{height: 150}}></View>;

const styles = StyleSheet.create({
  panel__back: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.primary,
  },
  input: {
    height: 50,
    borderRadius: 5,
    color: Colors.black,
    marginVertical: 15,
    fontFamily: 'SFPro-Regular',
    fontSize: 16,
    borderWidth: 2,
    padding: 15,
  },
});

export default StepTwo;
