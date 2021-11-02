import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../resources/resources';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {useState} from 'react/cjs/react.development';

var radio_props = [
  {label: 'Veg', value: 0},
  {label: 'Non Veg', value: 1},
];

const StepOne = ({route, navigation}) => {
  const {stepWidthSetter} = route.params;

  const [radioValue, setRadioValue] = useState(0);

  useEffect(() => {
    const backAction = () => {
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    backHandler.remove();
  }, []);

  const onPress = i => {
    setRadioValue(i);
  };

  return (
    <View style={styles.panel__back}>
      <ScrollView
      showsHorizontalScrollIndicator={true}
        style={{
          width: '100%',
          backgroundColor: Colors.white,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'SFPro-SemiBold',
              color: Colors.black,
              fontSize: 26,
            }}>
            Recipe Info
          </Text>
          <Text
            style={{
              fontFamily: 'SFPro-Regular',
              color: Colors.secondaryText,
              fontSize: 12,
              letterSpacing: 0.5,
              marginTop: 10,
            }}>
            Please fill the basic info for the recipe you will be sharing
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'SFPro-Medium',
              color: Colors.black,
              fontSize: 14,
              marginTop: 8,
            }}>
            Dish Name
          </Text>
          <TextInput
            style={styles.input}
            placeholder="E.g. Chicken Biryani"
            placeholderTextColor={Colors.secondaryText}
            selectionColor={Colors.primary}
          />
        </View>

        <View style={{marginTop: 10}}>
          <RadioForm formHorizontal={true}>
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={radioValue === i}
                  onPress={value => onPress(value)}
                  borderWidth={2}
                  buttonInnerColor={i === 0 ? Colors.green : Colors.red}
                  buttonOuterColor={i === 0 ? Colors.green : Colors.red}
                  buttonSize={8}
                  buttonOuterSize={16}
                  buttonStyle={{}}
                  buttonWrapStyle={i === 1 ? {marginLeft: 50} : {marginLeft: 0}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={value => onPress(value)}
                  labelStyle={{
                    fontSize: 14,
                    color: Colors.black,
                    fontFamily: 'SFPro-Medium',
                  }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>

        <View style={{marginTop: 5}}>
          <Text
            style={{
              fontFamily: 'SFPro-Medium',
              color: Colors.black,
              fontSize: 14,
              marginTop: 10,
            }}>
            About the recipe
          </Text>
          <TextInput
            multiline={true}
            textAlign={'left'}
            numberOfLines={5}
            selectionColor={Colors.primary}
            style={[
              styles.input,
              {
                height: 100,
                borderColor: Colors.secondaryText,
                textAlignVertical: 'top',
              },
            ]}
            placeholder="E.g. Biryani is a mixed rice dish originating among the Muslims of the Indian subcontinent. It is made with Indian spices, rice, and meat usually that of chicken and vegetables regional varieties."
            placeholderTextColor={Colors.secondaryText}
          />
        </View>

        <View style={{marginTop: 5}}>
          <Text
            style={{
              fontFamily: 'SFPro-Medium',
              color: Colors.black,
              fontSize: 14,
            }}>
            Other Details
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={[
                styles.input,
                {width: 100, borderColor: Colors.secondaryText},
              ]}
              selectionColor={Colors.primary}
              placeholder="30"
              placeholderTextColor={Colors.secondaryText}
              keyboardType="number-pad"
            />
            <Text
              style={{
                fontFamily: 'SFPro-Medium',
                color: Colors.black,
                fontSize: 14,
                marginLeft: 14,
              }}>
              Cooking time (minutes)
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: -10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={[
                  styles.input,
                  {width: 75, borderColor: Colors.secondaryText},
                ]}
                placeholder="30"
                placeholderTextColor={Colors.secondaryText}
                keyboardType="number-pad"
                selectionColor={Colors.primary}
              />
              <Text
                style={{
                  fontFamily: 'SFPro-Medium',
                  color: Colors.black,
                  fontSize: 14,
                  marginLeft: 15,
                }}>
                Calories
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 30,
              }}>
              <TextInput
                style={[
                  styles.input,
                  {width: 50, borderColor: Colors.secondaryText},
                ]}
                selectionColor={Colors.primary}
                placeholder="30"
                placeholderTextColor={Colors.secondaryText}
                keyboardType="number-pad"
              />
              <Text
                style={{
                  fontFamily: 'SFPro-Medium',
                  color: Colors.black,
                  fontSize: 14,
                  marginLeft: 15,
                }}>
                Serves
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              stepWidthSetter(2);
              navigation.navigate('StepTwo');
            }}
            style={{
              backgroundColor: Colors.primary,
              width: '100%',
              paddingVertical: 15,
              alignItems: 'center',
              marginTop: 10,
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
        </View>
        <EmptyView />
      </ScrollView>
    </View>
  );
};

const EmptyView = () => <View style={{height: 125}}></View>;

const styles = StyleSheet.create({
  panel__back: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.primary,
  },
  input: {
    height: 45,
    borderRadius: 5,
    color: Colors.black,
    marginVertical: 15,
    fontFamily: 'SFPro-Regular',
    fontSize: 14,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
});

export default StepOne;
