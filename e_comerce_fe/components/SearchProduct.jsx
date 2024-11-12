import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Cần cài đặt thư viện này bằng lệnh 'expo install @expo/vector-icons'
import Footer from "./Footer.jsx";

export default function SearchProduct({ navigation, route }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }} // Để không bị che khuất bởi Footer
        style={{ flex: 1 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderBottomColor: "gray", borderBottomWidth: 2, padding: 10 }}>
          {/* Nút quay lại */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Ô tìm kiếm */}
          <TextInput
            style={{
              flex: 1,
              height: 40,
              marginLeft: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              paddingLeft: 10,
              paddingRight: 35 // Để chừa khoảng trống cho icon bên phải
            }}
            placeholder="Tìm kiếm sản phẩm..."
          />

          {/* Icon tìm kiếm */}
          <Ionicons
            name="search"
            size={24}
            color="black"
            style={{ position: 'absolute', right: 10 }}
          />
        </View>

        {/* Nội dung khác của trang */}
      </ScrollView>
      
      {/* Footer cố định ở cuối */}
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </View>
    </View>
  );
}
