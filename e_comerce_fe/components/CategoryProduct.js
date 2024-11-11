import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import SearchIcon from '../icons/SearchIcon';
import StarIcon from '../icons/StarIcon';
import Header from './Header.jsx';
import RightArrowIcon from '../icons/RightArrowIcon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlices';
import {fetchProductsByCategory}  from "../redux/slices/productSlice"
const cate = [
  { id: 1, url: 'https://picsum.photos/200', name: 'Category' },
  { id: 1, url: 'https://picsum.photos/200', name: 'Category' },

  { id: 1, url: 'https://picsum.photos/200', name: 'Category' },

  { id: 1, url: 'https://picsum.photos/200', name: 'Category' },

  { id: 1, url: 'https://picsum.photos/200', name: 'Category' },

  // Add more categories as needed...
];
export default function CategoryProduct({ navigation, route }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories); // Lấy dữ liệu categories từ store
  const loading = useSelector((state) => state.categories.loading);
  const {data, nextCursor, filter} = useSelector((state)=> state.products.productByCate)

  const [selectedCate, setSelectedCate] = useState(0)
  const [seeAllCate, setSeeAllCate] = useState(false);
  const [seeAllProduct, setSeeAllProduct] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    setSelectedCate(categories[0]?.id|| 10)
  }, []);


  useEffect(()=>{
    dispatch(fetchProductsByCategory(selectedCate))
  }, [selectedCate])


  const typeCate = route.params?.cate || 'le trung hau';
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView
        style={tw`bg-white`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        <Header title={typeCate} navigation={navigation} />
        <View style={tw`p-3`}>
          <View style={tw`flex flex-row mb-4`}>
            <TextInput
              placeholder="Searching ......"
              placeholderTextColor="gray"
              style={tw`border-none p-2 rounded-3xl bg-[#e3e4e5] flex-1`}
            />
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                backgroundColor: '#e3e4e5',
                borderRadius: 1000,
                marginLeft: 4,
              }}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row w-full items-center  justify-between `}>
            <Text style={tw`text-xl font-bold`}>Categories</Text>
            <TouchableOpacity
              style={tw`flex flex-row items-center`}
              onPress={() => {
                setSeeAllCate(!seeAllCate);
              }}>
              {seeAllCate?"Collapse":"See all"} <RightArrowIcon />
            </TouchableOpacity>
          </View>
          <ScrollView />

          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={seeAllCate ? categories : categories.slice(0, 3)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                  onPress={()=>{
                    setSelectedCate(item.id)
                  }}
                    style={tw`w-[25] h-[100px] mt-2 mr-2 rounded-lg`}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View style={tw`flex flex-row justify-around items-center mt-3`}>
            <TouchableOpacity
              style={tw`text-[blue] p-2 bg-[#e3e4e5] rounded-full`}>
              Best Salse
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`text-[blue] p-2 bg-[#e3e4e5] rounded-full`}>
              Best Matched
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`text-[blue] p-2 bg-[#e3e4e5] rounded-full`}>
              Porpular
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={seeAllProduct ? data : data.slice(0, 6)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={tw`flex flex-row items-center justify-between p-1 my-2 w-full border border-slate-200 rounded-lg`}>
                    <View
                      style={{
                        width: '30%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: '100%', height: 80, borderRadius: 10 }}
                      />
                      <View
                        style={{
                          display: 'flex',
                          height: '100%',
                          justifyContent: 'space-around',
                          marginLeft:5
                        }}>
                        <Text>{item.product_name}</Text>
                        <View style={tw`flex flex-row`}>
                          {[1, 2, 3, 4, 5].map(() => {
                            return <StarIcon />;
                          })}
                        </View>
                      </View>
                    </View>
                    <View style={tw`flex items-center`}>
                      <TouchableOpacity
                        style={tw`py-2 px-3 rounded-full bg-[#0084FF] text-white font-bold`}>
                        +
                      </TouchableOpacity>
                      <Text style={tw`font-bold`}>{item.sku[0]?.sku_price}$</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <TouchableOpacity
            style={tw`border text-center py-2 rounded-lg bg-[pink] text-[gray]`}
            onPress={() => {
              setSeeAllProduct(true);
            }}>
            See All
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
