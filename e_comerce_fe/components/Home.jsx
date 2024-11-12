import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Image, TouchableOpacity, ScrollView, Text, KeyboardAvoidingView, Platform, FlatList, ActivityIndicator, Animated } from "react-native";
import tw from "twrnc";
import SearchIcon from "../icons/SearchIcon";
import StarIcon from "../icons/StarIcon";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlices';  // Import action
import { fetchProducts, fetchTopRecommendedProducts } from '../redux/slices/productSlice';  
import ImageSlider from "./ImageSlider";
import Footer from "./Footer.jsx";  // Footer component, assuming it is implemented elsewhere

export default function Home({ navigation, route }) {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const { topRecommended } = useSelector((state) => state.products);
  const [footerVisible, setFooterVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current; // Using Animated.Value for scroll position

  const sliderData = [
    {
      url: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/46/28/ff/cebf123f259b588ca30a767d83e4e715.jpg.webp',
      title: "hinh 1"
    },
    {
      url: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/3f/72/5c/d52bef2eb88a0d329934ef56e484528e.jpg.webp"
    }
  ];

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTopRecommendedProducts());
  }, [dispatch]);

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    // If scrolling down, hide the footer; if scrolling up, show it
    setFooterVisible(contentOffsetY < 100); // Adjust threshold as needed
  };

  // Hiển thị loading khi đang gọi API
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    console.log(error);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={tw`bg-[#2f80ec]`} 
        showsVerticalScrollIndicator={false} 
        onScroll={handleScroll}
        scrollEventThrottle={16} 
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={tw`relative`}>
          <View style={tw``}>
            <View style={tw`flex flex-row px-3 py-4`}>
              <TextInput
                placeholder="Searching ......"
                placeholderTextColor="gray"
                style={tw`border-none p-2 rounded-3xl bg-[#e3e4e5] flex-1`}
              />
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  backgroundColor: "#e3e4e5",
                  borderRadius: 1000,
                  marginLeft: 4,
                }}
              >
                <SearchIcon />
              </TouchableOpacity>
            </View>
              <View style={tw`rounded-t-[30px] bg-[#f1f2f7]`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row bg-white m-3 pb-3 rounded-[25px] p-3`}>
            <TouchableOpacity style={{
              position:"absolute",
              left:250,
              bottom:-5
            }} onPress={()=>{
              navigation.navigate("SeeAllCate")
            }}>see all</TouchableOpacity>
            {categories.map((item) => (
              <TouchableOpacity key={item.id} style={{ padding: 10 }} onPress={() => navigation.navigate("CategoryList", { cate: item.name })}>
                <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 35 }} />
                <Text style={{ textAlign: "center", marginTop: 5, fontSize: 12, fontWeight: "700" }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
              </View>
          </View>

          {/* Categories */}
            <View style={tw`bg-[#f1f2f7]`}>
              <ImageSlider data={sliderData} />
            
            </View>




          <View style={tw`p-3 bg-[#f1f2f7]`}>
            <View style={tw`rounded-lg bg-white p-1 rounded-[20px]`}>
              <View style={tw`flex flex-row w-full items-center justify-between px-3 pt-3 pb-4 border-b border-b-slate-400 mb-4`}>
                <Text style={tw`text-md font-bold`}>Dành cho bạn</Text>
                <TouchableOpacity>
                  <Text style={tw`text-[red] text-[12px]`}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
              showsHorizontalScrollIndicator={false}
              data={topRecommended.data}
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProductDetail", { product: item })}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: '49%',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    marginBottom: 10,
                    padding: 5,
                    paddingBottom: 10
                  }}
                >
                  <View style={{ height: 180, borderRadius: 5, overflow: 'hidden' }}>
                    <Image
                      source={{ uri: item.image }}
                      style={{ height: '100%', width: '100%' }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={tw`mt-1 text-[gray] text-sm px-1`}>
                    {item.product_name}
                  </Text>
                  <View style={tw`mt-1 px-1 flex flex-row items-center`}>
                    <StarIcon size={12} />
                    <StarIcon size={12} />
                    <StarIcon size={12} />
                    <StarIcon size={12} />
                    <StarIcon size={12} />
                    <Text style={tw`border-l border-l-slate-400 text-xs`}>500 đã bán</Text>
                  </View>
                  <Text style={tw`px-1 mt-2`}>500.000 VND</Text>
                </TouchableOpacity>
              )}
            />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      {footerVisible && (
        <Animated.View
          style={[
            tw`flex-row justify-between p-4 bg-white border-t border-t-slate-400`,
            { position: 'absolute', bottom: 0, width: '100%' },
          ]}
        >
          <Footer navigation={navigation} />
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
}
