import * as React from "react"
import { View, TouchableOpacity, Image} from "react-native"
import tw from 'twrnc';

export default function Foodter({navigate}){
  return <View style={tw`flex flex-row items-center justify-between`}>
    <TouchableOpacity>
      <Image source={{uri: "https://picsum.photos/200"}} style={{width:30, height:30}}/>
      <Image source={{uri: "https://picsum.photos/200"}} style={{width:30, height:30}}/>
      <Image source={{uri: "https://picsum.photos/200"}} style={{width:30, height:30}}/>
      <Image source={{uri: "https://picsum.photos/200"}} style={{width:30, height:30}}/>
      <Image source={{uri: "https://picsum.photos/200"}} style={{width:30, height:30}}/>
    </TouchableOpacity>
  </View>
}