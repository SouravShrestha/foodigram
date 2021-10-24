import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, Images, Titles} from '../../resources/resources';

const PostScreen = ({route, navigation}) => {
  const item = route.params;

  return (
    <View style={styles.panel__back}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.container__images}>
          <Image source={item._postImages[0]} style={styles.img__post} />
        </View>
        <View style={styles.container__contents}>
          <View style={styles.container__postDetails}>
            <View
              style={{
                justifyContent: 'space-between',
                height: '100%',
                paddingVertical: 10,
                paddingLeft: 15,
                paddingRight: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Images.iconFav}
                  style={[
                    styles.img__icon,
                    item._statusLiked ? {tintColor: Colors.red} : '',
                  ]}
                />
                <Text style={styles.txt__likes}>
                  {item._counterLikes} Likes
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={item._userAvatar} style={styles.img__avatar} />
                <View style={{justifyContent: 'space-evenly'}}>
                  <Text style={styles.txt__avatar}>{item._username}</Text>
                  <Text style={styles.txt__postedOn}>2 hours ago</Text>
                </View>
              </View>
            </View>
            <View style={styles.container__postDesc}>
              <Text style={styles.txt__postdDesc}>{item._postDesc}</Text>
            </View>
          </View>
          <View style={styles.panelRecipeDetails}>
            <View style={styles.container__recipeDetails}></View>
            <View style={styles.container__backRecipeDetails}></View>
          </View>
          <View style={styles.panel__ingredients}></View>
          <View style={styles.panel__instruction}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  panel__back: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container__images: {
    height: 350,
    width: '100%',
  },
  txt__likes: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
    lineHeight: 30,
    letterSpacing: -0.1,
    marginLeft: 10,
  },
  container__contents: {
    width: '100%',
    flex: 1,
    marginTop: -35,
    alignItems: 'center',
  },
  img__post: {
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  img__icon: {
    height: 30,
    width: 30,
    tintColor: Colors.inactiveIcon,
  },
  img__avatar: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
  },
  txt__avatar: {
    fontSize: 13,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginLeft: 12,
    lineHeight: 20,
  },
  txt__postdDesc: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'SFPro-Regular',
    letterSpacing: -0.2,
    marginLeft: 12,
    lineHeight: 20,
  },
  txt__postedOn: {
    fontSize: 10,
    color: Colors.secondaryText,
    fontFamily: 'SFPro-Regular',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginLeft: 12,
    lineHeight: 20,
  },
  container__postDetails: {
    height: 100,
    width: '85%',
    backgroundColor: Colors.light,
    elevation: 3,
    borderTopColor: '#fff',
    shadowColor: '#999',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10
  },
  container__recipeDetails: {
    height: 90,
    width: '100%',
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 15,
    zIndex: 1,
  },
  container__backRecipeDetails: {
    height: 90,
    width: '100%',
    position: 'absolute',
    backgroundColor: Colors.primary,
    borderRadius: 15,
    top: 5,
    left: 5,
  },
  panelRecipeDetails: {
    width: '90%',
    marginTop: 25,
  },
  panel__ingredients: {
    width: '95%',
    height: 175,
    backgroundColor: 'red',
    marginTop: 25,
  },
  panel__instruction: {
    width: '95%',
    height: 400,
    backgroundColor: 'pink',
    marginTop: 25,
  },
  container__postDesc: {
    height: '100%',
    flex: 1,
    paddingVertical: 2,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default PostScreen;
