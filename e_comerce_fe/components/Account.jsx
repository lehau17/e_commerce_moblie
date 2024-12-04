import React, { useState, useEffect } from "react";
import { View,FlatList, TextInput, TouchableOpacity, ScrollView, Text, KeyboardAvoidingView, Image, Platform, Animated } from "react-native";
import tw from "twrnc";
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 // Đảm bảo bạn đã cài đặt '@expo/vector-icons'
 import {fetchMyOrders, fetchMyFoodOrders} from "../redux/slices/orderSlice"

import { useDispatch, useSelector } from 'react-redux';
import Footer from "./Footer.jsx";  // Footer component, assuming it is implemented elsewhere

export default function Account({ navigation, route }) {
  const dispatch = useDispatch();
  const [footerVisible, setFooterVisible] = useState(true);

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setFooterVisible(contentOffsetY < 100);
  };

  const {myFoodOrderd} = useSelector((state)=>state.order)

  console.log(myFoodOrderd)

  useEffect(()=>{dispatch(fetchMyFoodOrders())}, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={tw`bg-white`}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={tw`relative`}>
          <View style={tw`flex-row justify-between items-center p-4 border-b border-b-slate-300`}>
            <Text style={tw`text-md font-semibold`}>Tài khoản</Text>

            {/* Icons cho Settings và Cart */}
            <View style={tw`flex-row`}>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={tw`mr-4`} onPress={()=>{
                navigation.navigate("AccountSetting")
              }}>
                <Ionicons name="settings-outline" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <Ionicons name="cart-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nội dung khác của trang Tài khoản */}
          <View style={tw`p-4 flex flex-row border-b-4 border-b-slate-300`}>
            <Image source={{ uri: "https://tse1.mm.bing.net/th?id=OIP.Wq6Kq_DS5JVcBUCIVD5JyQAAAA&pid=Api&P=0&h=180" }} style={{ width: 70, height: 70, borderRadius: 10000 }} />
            <View style={tw`flex justify-between ml-1`}>
              <Text style={tw`text-[16px] font-bold`}>Hậu lê</Text>
              <Text style={tw`text-[12px] text-[gray]`}>Thêm nickname</Text>
              <Text style={tw`text-[12px] font-bold p-1 bg-[#e3e4e5] text-center rounded-full`}>khách hàng</Text>
            </View>
          </View>
          <View style={tw`p-4 flex border-b-4 border-b-slate-300`}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate("MyOrder")
            }} style={tw`flex flex-row w-full items-center justify-between`}>
              <Text style={tw`font-bold`}>Đơn hàng của tôi</Text>
              <Ionicons name="arrow-forward-circle-outline" size={20} color="black" />
            </TouchableOpacity>
            <View style={tw`flex flex-row w-full justify-start items-start py-3`}>
              <View style={tw`flex-1 flex items-center`}>
                <MaterialIcons name="payments" size={28} color="blue" />
                <Text style={tw`text-[11px] text-center mt-1`}>Chờ thanh toán</Text>
              </View>
              <View style={tw`flex-1 flex items-center justify-center`}>
                <Entypo name="progress-full" size={28} color="blue" />
                <Text style={tw`text-[11px] text-center mt-1`}>Đang xử lý</Text>

              </View>
              <View style={tw`flex-1 flex items-center justify-center`}>
                <MaterialCommunityIcons name="truck-delivery-outline" size={28} color="blue" />
                <Text style={tw`text-[11px] text-center mt-1`}>Đang vận chuyển</Text>

              </View>
              <View style={tw`flex-1 flex items-center justify-center`}>
                <AntDesign name="checkcircleo" size={28} color="blue" />
                <Text style={tw`text-[11px] text-center mt-1`}>Đã giao</Text>

              </View>
              <View style={tw`flex-1 flex items-center justify-center`}>
                <AntDesign name="sync" size={28} color="blue" />
                <Text style={tw`text-[11px] text-center mt-1`}>Đổi trả</Text>
              </View>
            </View>

          </View>
          <View style={tw`p-4 flex border-b-4 border-b-slate-300 mb-10`}>
            <View style={tw`flex flex-row w-full items-center justify-between`}>
              <Text style={tw`font-bold`}>Đánh giá sản phẩm</Text>
              <Ionicons name="arrow-forward-circle-outline" size={20} color="black" />
            </View>
            <View>
              <FlatList showHorizontalScrollIndicator={false} data={myFoodOrderd} keyExtractor={(item)=>item.id} horizontal={true} renderItem={({item})=>{
                return <TouchableOpacity  style={tw`w-[150px] flex justity-between items-center p-2 m-2 border border-400-slate rounded-md`}>
                  <Image source={item.spu.image} style={{width:130, height:130}}/>
                  <Text style={{textAlign:"center", fontWeight:650}}>{item.sku_name}</Text>
                  <TouchableOpacity onPress={()=>{navigation.navigate("ProductComments", {id:item.spu_id})}} style={{border : "1px solid", borderRadius:5, padding:5, marginVertical:10}}>Đánh giá ngay</TouchableOpacity>
                </TouchableOpacity>
              }} />
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
