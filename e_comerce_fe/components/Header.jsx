import React from 'react';
import { Text, TextInput, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Svg, Path } from 'react-native-svg';


export default function Header({ title, navigation }) {
  console.log("Check header", navigation)
  return (
    <View style={tw`p-4 flex bg-white flex-row items-center text-black justify-between border-b border-b-teal-300`}>
      <View style={tw`flex flex-row items-center text-black`}>
              <TouchableOpacity onPress={()=>{navigation.goBack()}}>
         <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
    <Path
      d="M15 18l-6-6 6-6"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
      </TouchableOpacity>
      <Text style={tw`text-black text-lg font-bold`}>{title}</Text>
      </View>
       <View style={tw`flex flex-row items-center`}>
        <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M7 4H3M7 4H21L19 16H7M7 4L5 16H19M5 16C4.44772 16 4 16.4477 4 17C4 17.5523 4.44772 18 5 18C5.55228 18 6 17.5523 6 17C6 16.4477 5.55228 16 5 16Z"
      stroke={"black"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 16C18.4477 16 18 16.4477 18 17C18 17.5523 18.4477 18 19 18C19.5523 18 20 17.5523 20 17C20 16.4477 19.5523 16 19 16Z"
      stroke={"black"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 2H4L6.343 10.586C6.683 11.286 7.367 12 8.157 12H18.236C19.016 12 19.709 11.308 20.059 10.586L21.123 8.751"
      stroke={"black"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
  <Image source={{uri: "https://picsum.photos/200"}} style={{width:30, height:30, marginLeft:10, borderRadius:1000}}/>
       </View>
    </View>
  );
}