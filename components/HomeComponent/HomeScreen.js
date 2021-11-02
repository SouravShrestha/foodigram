import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {Colors, Images, Titles} from '../../resources/resources';
import Story from './Story';
import Post from './Post';
import {useState} from 'react/cjs/react.development';
import { useIsFocused } from '@react-navigation/native';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

let images = [
  require('../../assets/images/img-1.png'),
  require('../../assets/images/img-2.png'),
  require('../../assets/images/img-3.png'),
  require('../../assets/images/img-4.png'),
  require('../../assets/images/avatar-1.png'),
];

const MY_DATA = [
  {
    id: 1,
    color: Colors.secondaryText,
    image: images[4],
    name: 'Your story',
  },
  {
    id: 2,
    color: Colors.redTrans,
    image: images[1],
    name: 'souravshrestha',
  },
  {
    id: 3,
    color: Colors.redTrans,
    image: images[2],
    name: 'sam_amir',
  },
  {
    id: 4,
    color: Colors.greenTrans,
    image: images[3],
    name: 'joshep_90',
  },
  {
    id: 5,
    color: Colors.greyTrans,
    image: images[0],
    name: 'billy_el12',
  },
  {
    id: 6,
    color: Colors.greyTrans,
    image: images[0],
    name: 'billy_el12',
  },
  {
    id: 7,
    color: Colors.greyTrans,
    image: images[0],
    name: 'billy_el12',
  },
];

const POST_DATA = [
  {
    _username: 'sam_amir',
    _id: 1,
    _counterLikes: 121,
    _statusSaved: false,
    _postTitle: 'Green Salad',
    _postDesc:
      'Doloribus error blanditiis dolorem incidunt sed vero. Consequatur officia nemo ipsa harum architecto non cupiditate sed rerum.',
    _statusLiked: false,
    _postImages: [
      {
        id: 1,
        src: Images.img1,
      },
      {
        id: 2,
        src: Images.img2,
      },
    ],
    _userAvatar: Images.person3,
    _ratings: 4.8,
    _peopleRated: 140,
  },
  {
    _username: 'billy_09',
    _id: 2,
    _counterLikes: 102,
    _statusSaved: false,
    _postTitle: 'Paneer Tikka',
    _postDesc:
      'Doloribus error blanditiis dolorem incidunt sed vero. Consequatur officia nemo ipsa harum architecto non cupiditate sed rerum.',
    _statusLiked: true,
    _postImages: [
      {
        id: 1,
        src: Images.img4,
      },
    ],
    _userAvatar: Images.person2,
    _ratings: 4.0,
    _peopleRated: 65,
  },
  {
    _username: 'liligo_09',
    _id: 3,
    _counterLikes: 25,
    _statusSaved: false,
    _postTitle: 'Babycorn chilli',
    _postDesc:
      'Doloribus error blanditiis dolorem incidunt sed vero. Consequatur officia nemo ipsa harum architecto non cupiditate sed rerum.',
    _statusLiked: true,
    _postImages: [
      {
        id: 1,
        src: Images.img2,
      },
      {
        id: 2,
        src: Images.img4,
      },
      {
        id: 3,
        src: Images.img1,
      },
    ],
    _userAvatar: Images.person4,
    _ratings: 3.6,
    _peopleRated: 4,
  },
  {
    _username: 'emmapant87',
    _id: 4,
    _counterLikes: 14,
    _statusSaved: true,
    _postTitle: 'Paneer',
    _postDesc:
      'Doloribus error blanditiis dolorem incidunt sed vero. Consequatur officia nemo ipsa harum architecto non cupiditate sed rerum.',
    _statusLiked: true,
    _postImages: [
      {
        id: 1,
        src: Images.img3,
      },
      {
        id: 2,
        src: Images.img2,
      },
    ],
    _userAvatar: Images.person1,
    _ratings: 2.8,
    _peopleRated: 23,
  },
];

const DATA_TO_RENDER = [{}, ...POST_DATA, {}];

const StoriesView = () => (
  <View style={styles.panel__stories}>
    <FlatList
      data={MY_DATA}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <Story _image={item.image} _color={item.color} _name={item.name} />
      )}
      keyExtractor={(item, index) => item + index}
      horizontal={true}
    />
  </View>
);

const EmptyView = () => <View style={{height: 100}}></View>;

const HomeScreen = () => {
  const [myRenderData, setMyRenderData] = useState(DATA_TO_RENDER);

  // Scoll to top --> callled on clicking app name in titlebar
  const flatlistRef = useRef();
  const ScrollToTop = () => {
    flatlistRef.current.scrollToIndex({index: 0});
  };

  const [refreshing, setRefreshing] = useState(false);

  function handleRefresh() {
    //start refresh spinner
    setRefreshing(true);

    //Dummy data added
    setMyRenderData([
      {},
      {
        _username: 'new_user',
        _id: 12,
        _counterLikes: 12,
        _statusSaved: true,
        _postTitle: 'Green Salad New',
        _postDesc:
          'Doloribus error blanditiis dolorem incidunt sed vero. Consequatur officia nemo ipsa harum architecto non cupiditate sed rerum.',
        _statusLiked: false,
        _postImages: [
          {
            id: 1,
            src: Images.img4,
          },
          {
            id: 2,
            src: Images.img2,
          },
        ],
        _userAvatar: Images.person2,
        _ratings: 3.8,
        _peopleRated: 140,
      },
      ...POST_DATA,
      {},
    ]);

    //stop refresh spinner
    setRefreshing(false);
  }

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }

  // Home screen view
  return (
    <View style={styles.back__container}>
      <FocusAwareStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={styles.panel__appBar}>
        <TouchableOpacity>
          <Image source={Images.iconMenu} style={styles.img__appbar} />
        </TouchableOpacity>
        <Text style={styles.txt__appName} onPress={ScrollToTop}>
          {Titles.AppName}
        </Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={styles.back__container}>
        <FlatList
          ref={flatlistRef}
          data={myRenderData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) =>
            index > 0 && index != myRenderData.length - 1 ? (
              <Post item={item} />
            ) : index == 0 ? (
              <StoriesView />
            ) : (
              <EmptyView />
            )
          }
          keyExtractor={(item, index) => item + index}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back__container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
  },
  panel__appBar: {
    height: 60,
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  txt__appName: {
    fontSize: 24,
    color: Colors.black,
    fontFamily: 'SFPro-SemiBold',
    textAlign: 'center',
    letterSpacing: -1,
    marginLeft: 20,
  },
  img__appbar: {
    width: undefined,
    height: 14,
    aspectRatio: 1,
  },
  img__appbarSettings: {
    width: undefined,
    height: 25,
    aspectRatio: 1,
  },
  panel__stories: {
    paddingTop: 10,
    height: 120,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
