import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Colors, Images, Titles} from '../../resources/resources';
import Story from './Story';
import Post from './Post';

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
    color: Colors.red,
    image: images[1],
    name: 'souravshrestha',
  },
  {
    id: 3,
    color: Colors.red,
    image: images[2],
    name: 'sam_amir',
  },
  {
    id: 4,
    color: Colors.primary,
    image: images[3],
    name: 'joshep_90',
  },
  {
    id: 5,
    color: Colors.secondaryText,
    image: images[0],
    name: 'billy_el12',
  },
  {
    id: 6,
    color: Colors.secondaryText,
    image: images[0],
    name: 'billy_el12',
  },
  {
    id: 7,
    color: Colors.secondaryText,
    image: images[0],
    name: 'billy_el12',
  },
];

const POST_DATA = [
  {},
  {
    _username: 'sam_amir',
    _id: 1,
    _counterLikes: 121,
    _statusSaved: true,
    _postTitle: 'Green Salad',
    _postDesc:
      'Doloribus error blanditiis dolorem incidunt sed vero. Consequatur officia nemo ipsa harum architecto non cupiditate sed rerum.',
    _statusLiked: false,
    _postImages: [Images.img1, Images.img2],
    _userAvatar: Images.person3,
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
    _postImages: [Images.img2, Images.img4, , Images.img1],
    _userAvatar: Images.person2,
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
    _postImages: [Images.img3, Images.img1],
    _userAvatar: Images.person4,
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
    _postImages: [Images.img4],
    _userAvatar: Images.person1,
  },
  {},
];

const StoriesView = () => (
  <View style={styles.panel__stories}>
    <FlatList
      data={MY_DATA}
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
  // Scoll to top --> callled on clicking app name in titlebar
  const flatlistRef = useRef();
  const ScrollToTop = () => {
    flatlistRef.current.scrollToIndex({index: 0});
  };

  // Home screen view
  return (
    <View style={styles.back__container}>
      <View style={styles.panel__appBar}>
        <TouchableOpacity>
          <Image source={Images.iconMenu} style={styles.img__appbar} />
        </TouchableOpacity>
        <Text style={styles.txt__appName} onPress={ScrollToTop}>
          {Titles.AppName}
        </Text>
        <TouchableOpacity>
          <Image
            source={Images.iconSettings}
            style={styles.img__appbarSettings}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.back__container}>
        <FlatList
          ref={flatlistRef}
          data={POST_DATA}
          renderItem={({item, index}) =>
            index > 0 && index != POST_DATA.length - 1 ? (
              <Post item={item} />
            ) : index == 0 ? (
              <StoriesView />
            ) : (
              <EmptyView />
            )
          }
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back__container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.light,
  },
  panel__appBar: {
    height: 56,
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt__appName: {
    fontSize: 28,
    color: Colors.black,
    fontFamily: 'SFPro-SemiBold',
    textAlign: 'center',
    letterSpacing: -2,
  },
  img__appbar: {
    width: undefined,
    height: 18,
    aspectRatio: 1,
  },
  img__appbarSettings: {
    width: undefined,
    height: 25,
    aspectRatio: 1,
  },
  panel__stories: {
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    height: 140,
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
