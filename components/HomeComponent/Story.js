import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {Colors, DarkTheme} from '../../resources/resources';
import { Theme } from '../Shared/Theme';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

const Story = ({_image, _color, _name}) => {
  return (
    <View style={styles.container__story}>
      <View style={styles.outline__story(_color)}>
        <Image source={_image} style={styles.img__story} />
      </View>
      <Text style={styles.label__story} numberOfLines={1}>{_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container__story: {
    alignItems:'center',
    marginLeft: 12,
    marginRight: 8,
    maxWidth: 75
  },
  outline__story: _color => ({
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: _color,
    justifyContent: 'center',
    alignItems:'center'
  }),
  img__story:{
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  label__story:{
    flex:1, 
    marginTop: 5,
    fontSize: 12,
    color: Theme.colorText,
    fontFamily: 'SFPro-Regular',
    textAlign: 'center',
    lineHeight: 30,
    overflow: 'hidden',
    letterSpacing: 0.5  
  }
});

export default Story;
