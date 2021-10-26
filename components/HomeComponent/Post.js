import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Images} from '../../resources/resources';
import { useNavigation } from '@react-navigation/native';

TouchableOpacity.defaultProps = {activeOpacity: 0.9};

const Post = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container__post}>
      <View style={styles.header__post}>
        <View style={{flexDirection: 'row'}}>
          <Image source={item._userAvatar} style={styles.img__avatar} />
          <Text style={styles.txt__avatar}>{item._username}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={Images.iconShare} style={styles.img__icon} />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PostScreen', item)}>
        <View style={styles.container__imgPost}>
          <Image source={item._postImages[0].src} style={styles.img__post} />
        </View>
      </TouchableOpacity>
      <View style={styles.banner__lowerPost}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={Images.iconFav}
            style={[
              styles.img__icon,
              item._statusLiked ? {tintColor: Colors.red} : '',
            ]}
          />
          <Text style={styles.txt__likes}>{item._counterLikes} Likes</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={Images.iconSave}
            style={[
              styles.img__icon,
              item._statusSaved ? {tintColor: Colors.primary} : '',
            ]}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 8, marginLeft: 8}}>
        <Text>
          <Text style={styles.txt__captionTitle}>{item._postTitle} </Text>
          <Text style={styles.txt__caption}> {item._postDesc}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container__post: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  header__post: {
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  img__avatar: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
  },
  img__icon: {
    height: 30,
    width: 30,
    tintColor: Colors.inactiveIcon,
  },
  txt__avatar: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginLeft: 12,
  },
  txt__likes: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
    lineHeight: 30,
    letterSpacing: -0.1,
    marginLeft: 10,
  },
  txt__captionTitle: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-SemiBold',
    lineHeight: 30,
    letterSpacing: -0.5,
    marginLeft: 10,
    lineHeight: 24,
  },
  txt__caption: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Regular',
    lineHeight: 30,
    letterSpacing: -0.6,
    lineHeight: 24,
  },
  img__post: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  container__imgPost: {
    height: 280,
    width: '100%',
  },
  banner__lowerPost: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default Post;
