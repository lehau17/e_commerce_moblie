import React from "react"
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native"
import tw from "twrnc";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SoDiaChi({navigation, route}){
  return <ScrollView style={tw`flex flex-1 bg-white`} showsVerticalScrollIndicator={false}>
      <View style={tw`flex flex-row items-center p-5 bg-[#2f80ec]`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-center text-lg font-bold text-white`}>Sổ địa chỉ</Text>
      </View>

      <View style={tw`flex items-center my-5`}>
        <Image source={{uri:"https://www.logolynx.com/images/logolynx/c3/c315c5e06b03ca367175fa44159e09d4.png"}} style={{width:140, height:200}}/>
        <Text style={tw`p-2`}>Bạn chưa có dịa chỉ giao hàng</Text>
      </View>


      <TouchableOpacity style={tw`border-2 border-[red] p-3 m-3 rounded-2xl`}>
        <Text style={tw`text-center font-bold`}>Thêm 1 địa chỉ mới</Text>
      
      </TouchableOpacity>
     
    </ScrollView>
}