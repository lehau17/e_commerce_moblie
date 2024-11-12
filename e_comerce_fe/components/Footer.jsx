import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import { Ionicons, MaterialIcons, Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';  // Sử dụng thư viện icon

const Footer = ({ scrollY, navigation }) => {
  const footerTranslateY = useRef(new Animated.Value(0)).current; // Animation để di chuyển footer lên xuống

  // Cập nhật trạng thái vị trí của footer khi cuộn
  useEffect(() => {
    // Khi cuộn xuống, footer sẽ di chuyển lên, và khi cuộn lên, footer sẽ di chuyển xuống.
    Animated.timing(footerTranslateY, {
      toValue: scrollY > 100 ? 100 : 0,  // Nếu scrollY > 100 thì di chuyển lên 100px, nếu không thì trở lại vị trí ban đầu
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [scrollY]); // Chạy lại khi scrollY thay đổi

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 2, // Thêm border trên cùng
        borderTopColor: 'gray', // Màu của border trên cùng
        transform: [{ translateY: footerTranslateY }],  // Điều khiển vị trí theo scrollY
      }}
    >
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { navigation.navigate("Home") }}>
        <Ionicons name="home-outline" size={20} color="black" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <MaterialIcons name="search" size={20} color="black" />
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Entypo name="heart-outlined" size={20} color="black" />
        <Text>Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { navigation.navigate("Carts") }}>
        <FontAwesome5 name="shopping-cart" size={20} color="black" />
        <Text>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <AntDesign name="user" size={24} color="black" />
        <Text>Profile</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Footer;
