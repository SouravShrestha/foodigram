import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Images} from '../../resources/resources';
import {useNavigation} from '@react-navigation/native';

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
          <Image source={Images.iconShare} style={styles.img__icon_inactive} />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PostScreen', item)}>
        <View style={styles.container__imgPost}>
          <Image source={item._postImages[0].src} style={styles.img__post} />
        </View>
      </TouchableOpacity>
      <View style={styles.banner__lowerPost}>
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <Image
            source={item._statusLiked ? Images.iconFav : Images.iconLikeOutline}
            style={
              item._statusLiked ? [styles.img__icon, {tintColor: Colors.red}] : styles.img__icon_inactive
            }
          />
          <Text style={styles.txt__likes}>{item._counterLikes}</Text>
          <Image
            source={Images.iconStar}
            style={[
              styles.img__icon, {marginLeft: 10, tintColor: Colors.yellow}]
            }
          />
          <Text style={styles.txt__likes}>{item._ratings} <Text style={{
            color: Colors.secondaryText, fontFamily: 'SFPro-Regular', fontSize: 13
          }}>({item._peopleRated})</Text></Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={
              item._statusSaved ? Images.iconSave : Images.iconSaveOutline
            }
            style={
              item._statusSaved ? styles.img__icon : styles.img__icon_inactive
            }
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5, marginHorizontal: 15}}>
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
    marginTop: 10,
    marginBottom: 5
  },
  header__post: {
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  img__avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  img__icon: {
    height: 30,
    width: 30,
  },
  img__icon_inactive: {
    height: 30,
    width: 30,
    tintColor: Colors.black,
  },
  txt__avatar: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
    lineHeight: 28,
    letterSpacing: -0.2,
    marginLeft: 8,
  },
  txt__likes: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
    lineHeight: 30,
    letterSpacing: -0.2,
    marginLeft: 5,
  },
  txt__captionTitle: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-SemiBold',
    lineHeight: 30,
    letterSpacing: -0.2,
    marginLeft: 10,
    lineHeight: 24,
  },
  txt__caption: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Regular',
    lineHeight: 30,
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  img__post: {
    height: '100%',
    width: '100%',
  },
  container__imgPost: {
    maxHeight: 380,
    width: '100%',
  },
  banner__lowerPost: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default Post;
