import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import tw from "twrnc";
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, resetProfile, updateMe } from '../redux/slices/userProfileSlice';

export default function UserInfo({ navigation }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getMyProfile());
    return () => {
      dispatch(resetProfile());
    };
  }, [dispatch]);

  // Hàm xử lý điều hướng đến màn hình cập nhật
  const handleUpdate = (field, value, fieldApi) => {
    navigation.navigate("UpdatePatch", {
      field,
      value,
      field_api: fieldApi,
      handler: (updatedData) => {
        dispatch(updateMe(updatedData));
      },
    });
  };

  return (
    <ScrollView style={tw`flex flex-1 bg-white`} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={tw`flex flex-row items-center p-5 bg-[#2f80ec]`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-center text-lg font-bold text-white`}>Thông tin tài khoản</Text>
      </View>

      {/* Avatar */}
      <View style={tw`bg-[#2f80ec] flex items-center`}>
        <Image
          source={{ uri: "https://tse3.mm.bing.net/th?id=OIP.dCpgPQ0i-xX2gZ-yonm54gHaHa&pid=Api&P=0&h=180" }}
          style={{ width: 150, height: 150, borderRadius: 1000, position: "relative", bottom: -50 }}
        />
      </View>

      {/* Họ và tên */}
      <TouchableOpacity
        style={tw`flex flex-row items-center mt-15 border-t-4 border-t-slate-300 p-3`}
        onPress={() => handleUpdate("Họ và tên", data?.full_name, "full_name")}
      >
        <AntDesign name="user" size={24} color="black" />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-[16px] font-bold`}>Họ và tên</Text>
          <Text style={tw`mt-2`}>{data?.full_name || "Thêm tên "}</Text>
        </View>
        <AntDesign name="right" size={20} color="blue" />
      </TouchableOpacity>

      {/* Nick name */}
      <TouchableOpacity
        style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}
        onPress={() => handleUpdate("Nick name", data?.nick_name, "nick_name")}
      >
        <FontAwesome5 name="user-edit" size={24} color="black" />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-[16px] font-bold`}>Nick name</Text>
          <Text style={tw`mt-2`}>{data?.nick_name || "Thêm nickname"}</Text>
        </View>
        <AntDesign name="right" size={20} color="blue" />
      </TouchableOpacity>

      {/* Ngày sinh */}
      <TouchableOpacity
        style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}
        onPress={() => handleUpdate("Ngày sinh", data?.dob, "dob")}
      >
        <FontAwesome5 name="birthday-cake" size={24} color="black" />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-[16px] font-bold`}>Ngày sinh</Text>
          <Text style={tw`mt-2`}>{data?.dob || "01/01/2024"}</Text>
        </View>
        <AntDesign name="right" size={20} color="blue" />
      </TouchableOpacity>

      {/* Giới tính */}
      <TouchableOpacity
        style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}
        onPress={() => handleUpdate("Giới tính", data?.gender, "gender")}
      >
        <FontAwesome5 name="venus-mars" size={24} color="black" />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-[16px] font-bold`}>Giới tính</Text>
          <Text style={tw`mt-2`}>{data?.gender || "Nam"}</Text>
        </View>
        <AntDesign name="right" size={20} color="blue" />
      </TouchableOpacity>

      {/* Số điện thoại */}
      <TouchableOpacity
        style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}
        onPress={() => handleUpdate("Số điện thoại", data?.phone_number, "phone_number")}
      >
        <FontAwesome5 name="phone" size={24} color="black" />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-[16px] font-bold`}>Số điện thoại</Text>
          <Text style={tw`mt-2`}>{data?.phone_number || "+84 123456789"}</Text>
        </View>
        <AntDesign name="right" size={20} color="blue" />
      </TouchableOpacity>

      {/* Địa chỉ email */}
      <TouchableOpacity
        style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}
        onPress={() => handleUpdate("Địa chỉ email", data?.email, "email")}
      >
        <MaterialIcons name="email" size={24} color="black" />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-[16px] font-bold`}>Địa chỉ email</Text>
          <Text style={tw`mt-2`}>{data?.email || "lehau@example.com"}</Text>
        </View>
        <AntDesign name="right" size={20} color="blue" />
      </TouchableOpacity>

      {/* Thiết lập mật khẩu */}
      <TouchableOpacity
        style={tw`flex flex-row items-center border-t-4 border-t-slate-300 p-3`}
        onPress={() => handleUpdate("Thiết lập mật khẩu", "******", "password")}
      >
        <AntDesign name="lock" size={24} color="black" />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-[16px] font-bold`}>Thiết lập mật khẩu</Text>
          <Text style={tw`mt-2`}>******</Text>
        </View>
        <AntDesign name="right" size={20} color="blue" />
      </TouchableOpacity>
    </ScrollView>
  );
}
