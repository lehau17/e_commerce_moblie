import React from "react";
import { View, TextInput, Image, TouchableOpacity, ScrollView, Text, KeyboardAvoidingView, Platform, FlatList} from "react-native";
import tw from "twrnc";
import SearchIcon from "../icons/SearchIcon";
import StarIcon from "../icons/StarIcon"



const cate = [
  { id: 1, url: "https://picsum.photos/200", name: "Category" },
  { id: 1, url: "https://picsum.photos/200", name: "Category" },

  { id: 1, url: "https://picsum.photos/200", name: "Category" },

  { id: 1, url: "https://picsum.photos/200", name: "Category" },

  { id: 1, url: "https://picsum.photos/200", name: "Category" },
  
  // Add more categories as needed...
];

export default function Home({navigation, route}) {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={tw`bg-white`} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={tw`p-3`}>
          <View style={tw`flex flex-row mb-4`}>
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

          {/* Category list */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row `}>
            {cate.map((item) => (
              <TouchableOpacity key={item.id} style={{ padding: 10 }} onPress={()=>{
                navigation.navigate("CategoryList", {cate : item.name})
              }}>
                <Image source={{ uri: item.url }} style={{ width: 70, height: 70, borderRadius: 35 }} />
                <Text style={{ textAlign: "center", marginTop: 5, fontSize: 16, fontWeight: "700" }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Ad section */}
          <View style={tw`flex flex-row p-5 bg-[#CCCCFF] items-center justify-between rounded-lg mt-4`}>
            <View>
              <Text style={{ fontWeight: "700", fontSize: 30, color: "blue" }}>Shoes</Text>
              <Text style={{ fontSize: 25, fontWeight: "300" }}>Save off 50%</Text>
              <TouchableOpacity style={{ padding: 10, backgroundColor: "black", marginTop: 5 }}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "500" }}>Buy now</Text>
              </TouchableOpacity>
            </View>
            <Image source={{ uri: "https://picsum.photos/200" }} style={{ width: 100, height: 100 }} />
          </View>

         {/* Hình ảnh sản phẩm */}
        {[1].map((_, idx) => (
          <View key={idx} style={tw`flex flex-row items-center justify-between mt-4`}>
            <View style={tw`w-[48%] relative`}>
              <Text style={tw`absolute top-5 left-0 rounded-r-xl bg-red-500 text-black px-2 py-1 z-10`}>50% Off</Text>
              <Image source={{ uri: "https://picsum.photos/200" }} style={{ height: 200, borderRadius: 10 }} />
            </View>
            <View style={tw`w-[48%] relative`}>
              <Text style={tw`absolute top-5 rounded-r-xl left-0 bg-red-500 text-black px-2 py-1 z-10`}>50% Off</Text>
              <Image source={{ uri: "https://picsum.photos/200" }} style={{ height: 200, borderRadius: 10 }} />
            </View>
          </View>
        ))}
        <View style={tw`flex flex-row w-full items-center  justify-between mt-3 `}>
          <Text style={tw`text-lg font-medium`}>Recomend for you</Text>
          <TouchableOpacity>View all</TouchableOpacity>
        </View>

        <View >
        
                   <FlatList showsHorizontalScrollIndicator={false} data={cate} horizontal keyExtractor={(item)=>item.id.toString()} renderItem={({item,index})=>{
           return <TouchableOpacity  style={tw`px-2 p pt-2 pb-5 bg-[#e3e4e5] w-[35] h-[200px] rounded-lg mr-3`}>
            <Image source={{uri : "https://picsum.photos/200"}} style={{ height:"70%",width:"100%", borderRadius: 10 }}/>
              <Text style={tw`mt-3 font-bold text-lg`}>{item.name}</Text>
              <View style={tw`flex flex-row items-center justify-between`}>
                <View style={tw`flex flex-row items-center justify-between`}>
                  <StarIcon />
                  <Text>4.5</Text>
                </View>
                <Text>995$</Text>
              </View>
           </TouchableOpacity>
         }}/>
        </View>




        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
