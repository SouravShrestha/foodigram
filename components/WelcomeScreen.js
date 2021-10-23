import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {Colors, Images, Titles } from '../resources/resources';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

const WelcomeSreen = () => {
  return (
    <View style={styles.back__container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.panel__top}>
        <Image source={Images.imgWelcome} style={styles.main__img} />
      </View>
      <View style={styles.panel__bottom}>
        <Text style={styles.large__txt}>{Titles.AppName}</Text>
        <Text style={styles.small__txt}>{Titles.WelcomeAppDesc}</Text>
        <View style={styles.panel__horizontal}>
          <TouchableOpacity onPress={DoLogin}>
            <View style={styles.panel__loginBack}></View>
            <View style={styles.btn__login}>
              <Text style={styles.txt__button}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.panel__signupBack}></View>
            <View style={styles.btn__login}>
              <Text style={styles.txt__button}>Signup</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.small__txt}>{Titles.OtherSignInOption}</Text>
        <View style={styles.panel__horizontalSocial}>
          <TouchableOpacity>
            <Image source={Images.iconFacebook} style={styles.icon__img} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.iconGoogle} style={styles.icon__img} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.iconTwitter} style={styles.icon__img} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back__container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  panel__top: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel__bottom: {
    paddingTop: 40,
    paddingBottom: 40,
    flex: 5,
    color: Colors.black,
    backgroundColor: Colors.white,
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
  },
  main__img: {
    width: undefined,
    height: '75%',
    aspectRatio: 1,
  },
  icon__img: {
    width: undefined,
    height: '90%',
    aspectRatio: 1,
    marginRight: 15,
    marginLeft: 15,
  },
  large__txt: {
    fontSize: 42,
    color: Colors.black,
    fontFamily: 'SFPro-Bold',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  small__txt: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.secondaryText,
    fontFamily: 'SFPro-Regular',
    textAlign: 'center',
    letterSpacing: 0.8,
    lineHeight: 30,
  },
  panel__horizontal: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  panel__horizontalSocial: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 75,
    padding: 5,
  },
  btn__login: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 5,
    borderColor: Colors.black,
    borderWidth: 2,
  },
  txt__button: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    fontFamily: 'SFPro-SemiBold',
    letterSpacing: 1.5,
    lineHeight: 30,
  },
  panel__loginBack: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: '100%',
    height: '100%',
    top: 5,
    left: 5,
    borderRadius: 5,
  },
  panel__signupBack: {
    position: 'absolute',
    backgroundColor: Colors.yellow,
    width: '100%',
    height: '100%',
    top: 5,
    left: 5,
    borderRadius: 5,
  },
});

const DoLogin = () => {
  console.log('Logged in')
}

export default WelcomeSreen;
