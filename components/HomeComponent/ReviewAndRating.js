import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Images} from '../../resources/resources';


const ReviewAndRating = ({route, navigation}) => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    route.params.starNumber(defaultRating);
  }, [defaultRating]);
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
                setDefaultRating(item);
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});


export default ReviewAndRating;