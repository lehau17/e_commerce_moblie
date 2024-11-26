import React from "react"
import {View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList} from "react-native"
import tw from "twrnc";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SoDiaChi({navigation, route}){
  return <ScrollView style={tw`flex flex-1 bg-[#e3e4e5]`} showsVerticalScrollIndicator={false}>
      <View style={tw`flex flex-row items-center p-5 bg-[#2f80ec]`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-center text-lg font-bold text-white`}>Đơn hàng của tôi</Text>
      </View>

      <View style={tw`flex bg-white flex-row items-center border p-2 m-2 rounded-lg`}>
        <AntDesign name="search1" size={20} color="black" />
        <TextInput style={tw`flex-1 p-1`} placeholder="Nhập thông tin về đơn hàng" placeholderTextColor="gray" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw` bg-white`}>
        <TouchableOpacity style={tw` p-4 h-full border-b-4 border-b-[blue]`}>Tất cả đơn hàng</TouchableOpacity>
        <TouchableOpacity style={tw` p-4 h-full border-b-4`}>Chờ thanh toán</TouchableOpacity>
        <TouchableOpacity style={tw` p-4 h-full border-b-4`}>Đang xử lý</TouchableOpacity>
      </ScrollView>


     
    </ScrollView>
}