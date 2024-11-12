import React from "react"
import { View, Text, FlatList, ScrollView , TouchableOpacity} from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from "twrnc";

export default function UserInfo({ navigation, route }) {
  return <View style={tw`flex flex-1 bg-white`}>
    <View style={tw`flex flex-row items-center p-5 bg-[#2f80ec]`}>
      <TouchableOpacity style={tw``} onPress={()=>{navigation.goBack()}}>
        <AntDesign name="leftcircleo" size={24} color="white" />
      </TouchableOpacity>
      <Text style={tw`flex-1 text-center text-lg font-bold text-white`}>Thiết Lập Tài Khoản</Text>
    </View>
    </View>}