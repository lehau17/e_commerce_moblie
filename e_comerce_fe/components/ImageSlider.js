import React from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const { width: screenWidth } = Dimensions.get('window');

const ImageSlider = ({ data }) => {
  if (!data || data.length === 0) {
    return null; // Không hiển thị gì nếu không có dữ liệu
  }

  return (
    <View style={styles.container}>
      <Swiper 
        autoplay 
        loop 
        autoplayTimeout={3} 
        showsPagination
        key={data.length}  // Đảm bảo mỗi lần thay đổi data sẽ cập nhật
      >
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
    height: 200,
    width: '100%',
  },
  slide: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: screenWidth * 0.9,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default ImageSlider;
