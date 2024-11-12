import React from "react"
import { View, Text, FlatList, ScrollView , TouchableOpacity} from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from "twrnc";

export default function AccountSetting({ navigation, route }) {
  return <View style={tw`flex flex-1 bg-white`}>
    <View style={tw`flex flex-row items-center p-5 bg-[#2f80ec]`}>
      <TouchableOpacity style={tw``} onPress={()=>{navigation.goBack()}}>
        <AntDesign name="leftcircleo" size={24} color="white" />
      </TouchableOpacity>
      <Text style={tw`flex-1 text-center text-lg font-bold text-white`}>Thiết Lập Tài Khoản</Text>
    </View>
    <ScrollView style={{borderTopColor: "#e3e4e5", borderTopWidth:10, backgroundColor:"white"}}>
      <View style={tw`flex flex-row items-center justify-between border-b border-b-slate-300 p-3`}>
        <Text>Thông tin tài khoản</Text>
        <AntDesign name="right" size={20} color="blue" />
      </View>
      <View style={tw`flex flex-row items-center justify-between border-b border-b-slate-300 p-3`}>
        <Text>Số địa chỉ</Text>
        <AntDesign name="right" size={20} color="blue" />
      </View>
            <View style={tw`flex flex-row items-center justify-between border-b border-b-slate-300 p-3`}>
        <Text>Thông tin thanh toán</Text>
        <AntDesign name="right" size={20} color="blue" />
      </View>
      <View style={tw`flex flex-row items-center justify-between border-b border-b-slate-300 p-3`}>
        <Text>Yêu cầu xóa tài khoản</Text>
        <AntDesign name="right" size={20} color="blue" />
      </View>
       <View style={tw`flex flex-row items-center justify-between border-b border-b-slate-300 p-3`}>
        <Text>Phiên bản</Text>
        <Text>1.000.11.0101.1</Text>
      </View>
    </ScrollView>
    <TouchableOpacity style={tw`bg-white  p-4 border-2 border-red m-4 text-center font-bold text-[red] rounded-2xl`}>
      Đăng xuất
    </TouchableOpacity>

  </View>
}