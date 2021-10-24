import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {Colors} from '../../resources/resources';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

const Story = ({_image, _color, _name}) => {
  return (
    <View style={styles.container__story}>
      <View style={styles.outline__story(_color)}>
        <Image source={_image} style={styles.img__story} />
      </View>
      <Text style={styles.label__story}>{_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container__story: {
    alignItems:'center',
    marginRight: 5,
    marginLeft: 10
  },
  outline__story: _color => ({
    width: 75,
    height: 95,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: _color,
    justifyContent: 'center',
    alignItems:'center'
  }),
  img__story:{
    width: 65,
    height: 85,
    borderRadius: 10,
  },
  label__story:{
    marginTop: 5,
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'SFPro-Regular',
    textAlign: 'center',
    lineHeight: 30,
  }
});

export default Story;
