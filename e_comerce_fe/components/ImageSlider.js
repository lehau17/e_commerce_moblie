import React from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const { width: screenWidth } = Dimensions.get('window');

const ImageSlider = ({ data }) => {
  return (
    <View style={styles.container}>
      <Swiper autoplay loop autoplayTimeout={3} showsPagination>
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item.url }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  slide: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    width:"100%"
  },
  image: {
    width: screenWidth * 0.9,
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ImageSlider;
