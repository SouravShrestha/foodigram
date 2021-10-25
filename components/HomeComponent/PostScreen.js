import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, Images, Titles} from '../../resources/resources';

const INGREDIENTS = [
  {
    name: 'Tomato',
    qunatity: 1,
    color: Colors.ingredientRed,
  },
  {
    name: 'Greens',
    qunatity: 3,
    color: Colors.ingredientGreen,
  },
  {
    name: 'Onion',
    qunatity: 5,
    color: Colors.ingredientPurple,
  },
  {
    name: 'Cheese',
    qunatity: 1,
    color: Colors.ingredientYellow,
  },
  {
    name: 'Potato',
    qunatity: 2,
    color: Colors.ingredientGreen,
  },
];

const STEPS = [
  'Microwave or saute onion and bell pepper until soft; set aside to cool.',
  'In a large salad bowl, combine the onion, pepper, salad greens, deli meat and tomato. Sprinkle with the onion powder, garlic powder, black pepper and salt. Toss to mix.',
  'Pour on enough salad dressing or vinegar to coat, toss again and serve.',
];

const AllSteps = STEPS.map((item, index) => {
  const _styles = StyleSheet.create({
    text_stepNo: {
      fontSize: 16,
      color: Colors.stepNo,
      fontFamily: 'SFPro-Bold',
    },
    text_step: {
      fontSize: 16,
      color: Colors.black,
      fontFamily: 'SFPro-Regular',
      marginTop: 10,
      letterSpacing: -0.1,
      marginBottom: 20,
    },
  });
  return (
    <View key={index}>
      <Text style={_styles.text_stepNo}>Step {index + 1}</Text>
      <Text style={_styles.text_step}>{item}</Text>
    </View>
  );
});

const IngredientView = ({name, quantity, color}) => (
  <View style={styles.container__ingredient}>
    <View style={styles.panel_ingredientImage(color)}></View>
    <Text style={styles.txt_ingredientName}>{name}</Text>
    <Text style={styles.txt_ingredientQuantity}>{quantity} items</Text>
  </View>
);

const EmptyView = () => <View style={{height: 90}}></View>;

const PostScreen = ({route, navigation}) => {
  const item = route.params;

  let _showMedia = true;

  const state = {height: new Animated.Value(0)};

  const maxHeight = state.height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400],
  });

  function showMedia() {
    Animated.timing(state.height, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function hideMedia() {
    Animated.timing(state.height, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const toggleMediaVisibility = () => {
    _showMedia ? showMedia() : hideMedia();
    _showMedia = !_showMedia;
  };

  return (
    <View style={styles.panel__back}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.container__images}>
          <Image source={item._postImages[0]} style={styles.img__post} />
        </View>
        <View style={styles.container__contents}>
          <View style={styles.container__postDetails}>
            <View style={styles.container__postAbout}>
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
            <View style={styles.container__recipeDetails}>
              <Text style={styles.txt__postTitle}>{item._postTitle}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={Images.iconTimer} style={styles.img__time} />
                  <Text style={styles.txt__time}>30 mins</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={Images.iconBurn} style={styles.img__time} />
                  <Text style={styles.txt__time}>180 cal</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={Images.iconServe} style={styles.img__time} />
                  <Text style={styles.txt__time}>3 serves</Text>
                </View>
              </View>
            </View>
            <View style={styles.container__backRecipeDetails}></View>
          </View>
          <View style={styles.panel__media}>
            <TouchableOpacity
              style={styles.container__media}
              onPress={toggleMediaVisibility}>
              <Image source={Images.iconOkay} style={styles.img__action} />
              <Text style={styles.txt__media}>Pictures</Text>
            </TouchableOpacity>
            <View style={[styles.container__media, styles.inactive__media]}>
              <Image source={Images.iconCross} style={styles.img__action} />
              <Text style={styles.txt__media}>Video</Text>
            </View>
            <View style={[styles.container__media, styles.inactive__media]}>
              <Image source={Images.iconCross} style={styles.img__action} />
              <Text style={styles.txt__media}>Audio</Text>
            </View>
          </View>
          {/* Media Panel */}
          <Animated.View
            style={[
              {
                width: '100%',
                marginTop: 25,
                alignItems: 'center',
                maxHeight: maxHeight,
              },
            ]}>
            <Image
              source={item._postImages[0]}
              style={styles.img__mediaImage}
            />
          </Animated.View>
          <View style={styles.panel__ingredients}>
            <Text style={styles.txt__sectionTitle}>Ingredients</Text>
            <View style={styles.panel__allIngredients}>
              <FlatList
                data={INGREDIENTS}
                renderItem={({item, index}) => (
                  <IngredientView
                    name={item.name}
                    color={item.color}
                    quantity={item.qunatity}
                  />
                )}
                keyExtractor={(item, index) => item + index}
                horizontal={true}
              />
            </View>
          </View>
          <View style={styles.panel__instruction}>
            <Text style={styles.txt__sectionTitle}>Cooking instruction</Text>
            <View style={{alignItems: 'center'}}>
              <View style={styles.container__instruction}>{AllSteps}</View>
            </View>
          </View>
        </View>
        <EmptyView />
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
    paddingVertical: 5,
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
    paddingRight: 10,
  },
  container__recipeDetails: {
    height: 75,
    width: '100%',
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 15,
    zIndex: 1,
    justifyContent: 'center',
  },
  txt__postTitle: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'SFPro-Bold',
    lineHeight: 20,
    paddingLeft: 15,
  },
  img__time: {
    height: 15,
    width: 15,
    tintColor: Colors.black,
  },
  txt__time: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
    marginLeft: 8,
  },
  container__backRecipeDetails: {
    height: 75,
    width: '100%',
    position: 'absolute',
    backgroundColor: Colors.primary,
    borderRadius: 15,
    top: 5,
    left: 5,
    opacity: 0.7,
  },
  panelRecipeDetails: {
    width: '90%',
    marginTop: 25,
  },

  panel__media: {
    width: '100%',
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container__media: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    height: 30,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 10.5,
    borderTopColor: '#eee',
    shadowColor: '#999',
  },
  img__action: {
    height: 15,
    width: 15,
    aspectRatio: 1,
  },
  txt__media: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
  },
  inactive__media: {
    opacity: 0.7,
  },
  img__mediaImage: {
    height: '93%',
    width: 400,
    borderRadius: 8,
  },

  panel__allIngredients: {
    paddingVertical: 18,
  },
  panel__ingredients: {
    width: '100%',
    height: 175,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  container__ingredient: {
    alignItems: 'center',
    width: 75,
    marginRight: 15,
  },
  panel_ingredientImage: color => ({
    height: 75,
    width: 75,
    backgroundColor: color,
    borderRadius: 8,
  }),
  txt_ingredientName: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'SFPro-Medium',
    marginTop: 10,
  },
  txt_ingredientQuantity: {
    fontSize: 11,
    color: Colors.secondaryText,
    fontFamily: 'SFPro-Medium',
    marginTop: 2,
  },
  txt__sectionTitle: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: 'SFPro-SemiBold',
    marginLeft: 5,
  },
  panel__instruction: {
    width: '95%',
    height: 400,
    marginTop: 15,
  },
  container__instruction: {
    width: '98%',
    marginTop: 20,
    backgroundColor: Colors.instructionBack,
    borderRadius: 15,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  container__postDesc: {
    height: '100%',
    flex: 1,
    paddingVertical: 2,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  container__postAbout: {
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 10,
  },
});

export default PostScreen;
