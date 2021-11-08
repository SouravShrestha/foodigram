import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Images} from '../../resources/resources';
import {Theme} from '../Shared/Theme';

const INGREDIENTS = [
  {
    name: 'Tomato',
    qunatity: 1,
    color: Theme.ingredientRed,
  },
  {
    name: 'Greens',
    qunatity: 3,
    color: Theme.ingredientGreen,
  },
  {
    name: 'Onion',
    qunatity: 5,
    color: Theme.ingredientPurple,
  },
  {
    name: 'Cheese',
    qunatity: 1,
    color: Theme.ingredientYellow,
  },
  {
    name: 'Potato',
    qunatity: 2,
    color: Theme.ingredientGreen,
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
      color: Theme.stepNo,
      fontFamily: 'SFPro-Bold',
    },
    text_step: {
      fontSize: 16,
      color: Theme.black,
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

const WIDTH = Dimensions.get('window').width;
const IMAGE_APPHEADER_HEIGHT = 300;
const HEADER_MAX_HEIGHT = IMAGE_APPHEADER_HEIGHT;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const AppHeader = ({opacity, reverseOpacity, navigation}) => {
  function GoBack() {
    navigation.navigate('HomeScreen');
  }

  return (
    <View>
      <View style={styles.container__appHeader}>
        <Animated.View
          style={[styles.dummy_backApp]}
          onPress={() => GoBack()}></Animated.View>
        <TouchableOpacity
          style={[
            {
              padding: 10,
              borderRadius: 10,
            },
          ]}
          onPress={() => GoBack()}>
          <Image source={Images.iconBack} style={styles.img__appbar} />
        </TouchableOpacity>
        <Animated.View style={[styles.dummy_backSetting]}></Animated.View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
          }}>
          <Image
            source={Images.iconSaveOutlineWide}
            style={[
              styles.img__appbar,
              {
                marginHorizontal: 8,
              },
            ]}
          />
          <Image
            source={Images.iconShare}
            style={[
              styles.img__appbar,
              {
                marginHorizontal: 8,
              },
            ]}
          />
        </View>
      </View>
      <Animated.View
        style={[
          styles.panel__appbarDummy,
          {
            opacity: opacity,
          },
        ]}></Animated.View>
    </View>
  );
};

const IngredientView = ({name, quantity, color}) => (
  <View style={styles.container__ingredient}>
    <View style={styles.panel_ingredientImage(color)}></View>
    <Text style={styles.txt_ingredientName}>{name}</Text>
    <Text style={styles.txt_ingredientQuantity}>{quantity} items</Text>
  </View>
);

const EmptyView = () => <View style={{height: 125}}></View>;

const Paginator = ({_images, _scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container__paginator}>
      {_images.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = _scrollX.interpolate({
          inputRange,
          outputRange: [9, 20, 9],
          extrapolate: 'clamp',
        });
        const opacity = _scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}></Animated.View>
        );
      })}
    </View>
  );
};

const ImageSlider = ({images, scrollX}) => {
  const viewConf = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const slideRef = useRef(null);
  return (
    <View>
      <FlatList
        data={images}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item.id}
        style={styles.panel__slider}
        renderItem={({item}) => (
          <Image source={item.src} style={styles.img__mediaImage} />
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        viewabilityConfig={viewConf}
        scrollEventThrottle={32}
        ref={slideRef}
      />
      <Paginator _images={images} _scrollX={scrollX} />
    </View>
  );
};

const RatingView = ({navigation}) => {
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  // callbackfunc = (childData) => {
  //   setDefaultRating(childData)
  // }
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 8,
      }}>
      <Text style={styles.txt__sectionTitle}>Rate the recipe</Text>
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                navigation.navigate('ReviewAndRating', {
                  starNumber: setDefaultRating,
                });
              }}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating ? Images.filledStar : Images.cornerStar
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {/*<SafeAreaView style={styles.container_star}>
          <View style={styles.container_star}>
          <Text style={styles.txt__sectionTitle}>
          
          {defaultRating} / {Math.max.apply(null, maxRating)}
          </Text>
          <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => alert(defaultRating)}>
          <Text style={styles.buttonTextStyle}>
            Get Selected Value
          </Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>*/}
    </View>
  );
};

const ReviewsView = () => {
  return (
    <View
      style={{
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}>
      <Text style={styles.txt__sectionTitle}>Ratings and Reviews</Text>
      <View
        style={{
          width: '100%',
          flex: 1,
          marginTop: 15,
          height: 300,
          backgroundColor: 'lightblue',
        }}></View>
    </View>
  );
};

const PostScreen = ({route, navigation}) => {
  const item = route.params;

  let _showMedia = true;

  const state = {height: new Animated.Value(0), scrollY: new Animated.Value(0)};

  const maxHeight = state.height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 375],
  });

  const _opacity = state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const _reverseOpacity = state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0.3, 0],
    extrapolate: 'clamp',
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

  const scrollX = useRef(new Animated.Value(0)).current;

  const toggleMediaVisibility = () => {
    _showMedia ? showMedia() : hideMedia();
    _showMedia = !_showMedia;
  };

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <View style={styles.panel__back}>
      <FocusAwareStatusBar
        backgroundColor={Theme.colorAppBar}
        barStyle={Theme.colorStatusBarIcons}
      />
      <AppHeader
        opacity={_opacity}
        reverseOpacity={_reverseOpacity}
        navigation={navigation}
      />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: state.scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View style={styles.container__images}>
          <Image source={item._postImages[0].src} style={styles.img__post} />
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
                  marginTop: 20,
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
          <Animated.View style={styles.panel__mediaConent(maxHeight)}>
            <ImageSlider images={item._postImages} scrollX={scrollX} />
          </Animated.View>

          <View style={styles.panel__ingredients}>
            <Text style={styles.txt__sectionTitle}>Ingredients</Text>
            <View style={styles.panel__allIngredients}>
              <FlatList
                data={INGREDIENTS}
                showsHorizontalScrollIndicator={false}
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
        <RatingView navigation={navigation} />
        <ReviewsView />
        <EmptyView />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  panel__back: {
    flex: 1,
    backgroundColor: Theme.colorBack,
  },

  container__appHeader: {
    height: 70,
    width: WIDTH,
    paddingHorizontal: 15,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  panel__appbarDummy: {
    height: 70,
    width: WIDTH,
    paddingHorizontal: 15,
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colorAppBar,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dummy_backApp: {
    borderRadius: 20,
    backgroundColor: Theme.colorAppBar,
    position: 'absolute',
    height: 40,
    width: 40,
    left: 18,
  },
  dummy_backSetting: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Theme.colorAppBar,
    position: 'absolute',
    height: 40,
    width: 100,
    right: 15,
  },

  img__appbar: {
    height: 25,
    width: 25,
    tintColor: Theme.colorText,
  },

  container__images: {
    height: 250,
    width: '100%',
  },
  txt__likes: {
    fontSize: 14,
    color: Theme.colorText,
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
  },
  img__icon: {
    height: 30,
    width: 30,
  },
  img__avatar: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
  },
  txt__avatar: {
    fontSize: 13,
    color: Theme.colorText,
    fontFamily: 'SFPro-Medium',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginLeft: 12,
    lineHeight: 20,
  },
  txt__postdDesc: {
    fontSize: 12,
    color: Theme.colorText,
    fontFamily: 'SFPro-Regular',
    letterSpacing: -0.2,
    marginLeft: 12,
    lineHeight: 20,
    paddingVertical: 5,
  },
  txt__postedOn: {
    fontSize: 10,
    color: Theme.secondaryText,
    fontFamily: 'SFPro-Regular',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginLeft: 12,
    lineHeight: 20,
  },
  container__postDetails: {
    height: 100,
    width: '90%',
    backgroundColor: Theme.colorAppBar,
    elevation: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  container__recipeDetails: {
    width: '100%',
    borderColor: Theme.secondaryText,
    zIndex: 1,
    justifyContent: 'center',
  },
  txt__postTitle: {
    fontSize: 16,
    color: Theme.colorText,
    fontFamily: 'SFPro-Bold',
    lineHeight: 20,
  },
  img__time: {
    height: 15,
    width: 15,
    tintColor: Theme.colorText,
  },
  txt__time: {
    fontSize: 14,
    color: Theme.colorText,
    fontFamily: 'SFPro-Medium',
    marginLeft: 8,
  },
  panelRecipeDetails: {
    width: '90%',
    marginTop: 25,
  },

  panel__slider: {},
  dot: {
    height: '15%',
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginHorizontal: 5,
  },
  container__paginator: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '6%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    right: 7.5,
  },

  panel__media: {
    width: '100%',
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container__media: {
    backgroundColor: Theme.colorAppBar,
    borderRadius: 8,
    flexDirection: 'row',
    height: 30,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 1,
  },
  img__action: {
    height: 15,
    width: 15,
    aspectRatio: 1,
  },
  txt__media: {
    marginLeft: 10,
    fontSize: 14,
    color: Theme.colorText,
    fontFamily: 'SFPro-Medium',
  },
  inactive__media: {
    opacity: 0.7,
  },

  panel__mediaConent: maxHeight => ({
    width: '100%',
    marginTop: 25,
    alignItems: 'center',
    maxHeight: maxHeight,
    paddingLeft: 15,
  }),

  img__mediaImage: {
    height: 350,
    width: WIDTH - 30,
    borderRadius: 8,
    marginRight: 15,
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
    color: Theme.colorText,
    fontFamily: 'SFPro-Medium',
    marginTop: 10,
  },
  txt_ingredientQuantity: {
    fontSize: 11,
    color: Theme.secondaryText,
    fontFamily: 'SFPro-Medium',
    marginTop: 2,
  },
  txt__sectionTitle: {
    fontSize: 18,
    color: Theme.colorText,
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
    backgroundColor: Theme.instructionBack,
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
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  container_star: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default PostScreen;
