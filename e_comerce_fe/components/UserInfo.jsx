import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import tw from "twrnc";

export default function UserInfo({ navigation }) {
  return (
    <ScrollView style={tw`flex flex-1 bg-white`} showsVerticalScrollIndicator={false}>
      <View style={tw`flex flex-row items-center p-5 bg-[#2f80ec]`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-center text-lg font-bold text-white`}>Thông tin tài khoản</Text>
      </View>
      <View style={tw`bg-[#2f80ec] flex items-center`}>
        <Image 
          source={{ uri: "https://tse3.mm.bing.net/th?id=OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa&pid=Api&P=0&h=180" }} 
          style={{ width: 150, height: 150, borderRadius: 1000, position: "relative", bottom: -50 }} 
        />
      </View>

      {/* Name */}
      <View style={tw`flex flex-row items-center mt-15 border-t-4 border-t-slate-300 p-3`}>
        <AntDesign name="user" size={24} color="black" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-[16px] font-bold`}>Họ và tên</Text>
          <Text style={tw`mt-2`}>Lê Hậu</Text>
        </View>
      </View>

      {/* Nickname */}
      <View style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}>
        <FontAwesome5 name="user-edit" size={24} color="black" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-[16px] font-bold`}>Nick name</Text>
          <Text style={tw`mt-2`}>Lê Hậu</Text>
        </View>
      </View>

      {/* Birthday */}
      <View style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}>
        <FontAwesome5 name="birthday-cake" size={24} color="black" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-[16px] font-bold`}>Ngày sinh</Text>
          <Text style={tw`mt-2`}>01/01/1990</Text>
        </View>
      </View>

      {/* Gender */}
      <View style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}>
        <FontAwesome5 name="venus-mars" size={24} color="black" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-[16px] font-bold`}>Giới tính</Text>
          <Text style={tw`mt-2`}>Nam</Text>
        </View>
      </View>

      {/* Nationality */}
      <View style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}>
        <FontAwesome5 name="flag" size={24} color="black" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-[16px] font-bold`}>Quốc tịch</Text>
          <Text style={tw`mt-2`}>Việt Nam</Text>
        </View>
      </View>

      {/* Phone Number */}
      <View style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}>
        <FontAwesome5 name="phone" size={24} color="black" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-[16px] font-bold`}>Số điện thoại</Text>
          <Text style={tw`mt-2`}>+84 123456789</Text>
        </View>
      </View>

      {/* Email */}
      <View style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}>
        <MaterialIcons name="email" size={24} color="black" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-[16px] font-bold`}>Địa chỉ email</Text>
          <Text style={tw`mt-2`}>lehau@example.com</Text>
        </View>
      </View>

      {/* Set Password */}
      <View style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}>
        <AntDesign name="lock" size={24} color="black" />
        <View style={tw`ml-4`}>
          <Text style={tw`text-[16px] font-bold`}>Thiết lập mật khẩu</Text>
          <Text style={tw`mt-2`}>******</Text>
        </View>
      </View>
    </ScrollView>
  );
}
