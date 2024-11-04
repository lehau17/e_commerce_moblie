import React from 'react';
import TruckIcon from '../icons/TruckIcon';
import ArrowIcon from '../icons/ArrowIcon';
import LeftAltCircleIcon from '../icons/LeftAltCircleIcon';
import Star from '../icons/Star';
import AuthorizeStore from '../icons/authorizeStore';
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
import ImageSlider from './ImageSlider';
const productMock = {
  id: 1,
  name: 'Headphone',
  price: 99,
  banner: [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ],
  rating: 4.5,
  total_reviews: 99,
  top_reviews: [
    {
      id: 1,
      content: 'tay nghe chien vaidai',
      user_id: 1,
      user_img: 'https://picsum.photos/200',
      user_name: 'hau le',
      created_at: new Date(),
    },
    {
      id: 2,
      content: 'tay nghe chien vaidai',
      user_id: 1,
      user_img: 'https://picsum.photos/200',
      user_name: 'hau le',
      created_at: new Date(),
    },
    {
      id: 3,
      content: 'tay nghe chien vaidai',
      user_id: 1,
      user_img: 'https://picsum.photos/200',
      user_name: 'hau le',
      created_at: new Date(),
    },
  ],
  description:
    'Headphone được sản xuất và phát triển bởi IUH Industry. Hàng Xi da chất lượng thấp',
};

export default function ProductDetail({ navigation, route }) {
  const sliderData = productMock.banner.map((url, index) => ({
    url: url,
    title: `${productMock.name} Image ${index + 1}`,
  }));

  const product = route.params?.product || 'hehe';
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView
        style={tw`bg-white`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        <Header title={product} />
        <View style={tw`p-3`}>
          <ImageSlider data={sliderData} />
          <View
            style={tw`flex flex-row items-center justify-between pb-4 border-b border-b-slate-400`}>
            <Text style={tw`text-lg font-bold`}>{productMock.price} $</Text>
            <View style={tw`flex flex-row items-center`}>
              <StarIcon />
              <Text style={tw`text-[16px] font-medium`}>
                {productMock.rating}
              </Text>
              <Text style={tw`text-[gray]`}>
                {' '}
                ({productMock.total_reviews} reviews){' '}
              </Text>
            </View>
          </View>

          <View style={tw`mt-4`}>
            <Text style={tw`text-xl font-bold`}>Description</Text>
            <Text style={tw`mt-3`}>{productMock.description}</Text>
          </View>
          <View
            style={tw`flex-wrap flex-row justify-between border-b border-b-slate-400`}>
            <View style={tw` w-[48%]  p-4 `}>
              <View style={tw`flex flex-row items-center`}>
                <TruckIcon />{' '}
                <Text style={tw`ml-2 text-[#0284C7]`}>Express</Text>
              </View>
            </View>
            <View style={tw`w-[48%]  p-4 `}>
              <View style={tw`flex flex-row items-center`}>
                <LeftAltCircleIcon />{' '}
                <Text style={tw`ml-2 text-[#0284C7]`}>
                  30 day - free return
                </Text>
              </View>
            </View>
            <View style={tw`w-[48%]  p-4`}>
              <View style={tw`flex flex-row items-center`}>
                <Star />{' '}
                <Text style={tw`ml-2 text-[#0284C7]`}>Good Review</Text>
              </View>
            </View>
            <View style={tw`w-[48%]  p-4`}>
              <View style={tw`flex flex-row items-center`}>
                <AuthorizeStore />{' '}
                <Text style={tw`ml-2 text-[#0284C7]`}>Authorize Store</Text>
              </View>
            </View>
          </View>
          <View style={tw`flex flex-row items-center justify-between my-4`}>
            <Text style={tw`text-lg font-bold`}>Reviews</Text>
            <TouchableOpacity style={tw`text-[gray] font-bold`}>See All</TouchableOpacity>
          </View>
          <View style={tw`p-5 bg-[#e3e4e5] flex flex-row rounded-lg`}>
            <View>
              <Text>{productMock.rating}/5</Text>
              <Text>{productMock.total_reviews} reviews</Text>
              <View style={tw`flex flex-row`}>
                {[1, 2, 3, 4, 5].map(() => {
                  return <StarIcon />;
                })}
              </View>
            </View>
            <View style={tw`flex-1`}>
              <View style={tw`flex flex-row items-center `}>
                <View
                  style={tw`flex flex-row items-center bg-[yellow] w-full border rounded-lg`}>
                  <View
                    style={{
                      width: '70%',
                      padding: 3,
                      backgroundColor: 'gray',
                    }}></View>
                </View>
                <Text>5</Text>
              </View>
              <View style={tw`flex flex-row items-center `}>
                <View
                  style={tw`flex flex-row items-center bg-[yellow] w-full border rounded-lg`}>
                  <View
                    style={{
                      width: '70%',
                      padding: 3,
                      backgroundColor: 'gray',
                    }}></View>
                </View>
                <Text>5</Text>
              </View>
              <View style={tw`flex flex-row items-center `}>
                <View
                  style={tw`flex flex-row items-center bg-[yellow] w-full border rounded-lg`}>
                  <View
                    style={{
                      width: '70%',
                      padding: 3,
                      backgroundColor: 'gray',
                    }}></View>
                </View>
                <Text>5</Text>
              </View>
              <View style={tw`flex flex-row items-center `}>
                <View
                  style={tw`flex flex-row items-center bg-[yellow] w-full border rounded-lg`}>
                  <View
                    style={{
                      width: '70%',
                      padding: 3,
                      backgroundColor: 'gray',
                    }}></View>
                </View>
                <Text>5</Text>
              </View>
              <View style={tw`flex flex-row items-center `}>
                <View
                  style={tw`flex flex-row items-center bg-[yellow] w-full border rounded-lg`}>
                  <View
                    style={{
                      width: '70%',
                      padding: 3,
                      backgroundColor: 'gray',
                    }}></View>
                </View>
                <Text>5</Text>
              </View>
            </View>
          </View>
          <View style={tw`flex mt-3`}>
          {productMock.top_reviews.map((item, index)=>{
            return <View style={tw`flex flex-row items-center justify-between p-3 border-b border-b-slate-300 rounded-b-lg `}>
                <Image source={{uri : item.user_img}} style={{height:50, width:50, borderRadius:1000}}/>
                <View style={tw`flex-1 ml-2 justify-between h-full`}>
                  <Text style={tw`text-[18px] font-bold`}>{item.user_name}</Text>
                  <Text style={tw`text-[gray]`}>{item.content}</Text>
                </View>
                <View>
                  <Text style={tw`text-[gray]`}>One day ago</Text>
                </View>
            </View>
          })}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
