import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import tw from "twrnc";

const CheckIcon = () => (
  <Svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M9 12l2 2 4-4" />
  </Svg>
);

export default function OrderSuccess({navigation, route}) {
  return (
    <View style={styles.container}>
      {/* Check Icon */}
      <CheckIcon />
      
      {/* Success Message */}
      <Text style={tw`text-lg font-bold text-center text-teal-500 mt-4`}>Order placed successfully!</Text>
      <Text style={tw`text-sm text-center text-gray-500`}>Đơn hàng của bạn đang chờ xác nhận, vui lòng theo dõi trạng thái đơn hàng</Text>

      {/* Order Details */}
      <View style={styles.orderDetails}>
        <View style={styles.row}>
          <Text style={styles.label}>Tổng tiền</Text>
          <Text style={styles.value}>$2,800</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hình thức</Text>
          <Text style={styles.value}>Tiền mặt</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tổng sản phẩm</Text>
          <Text style={styles.value}>30</Text>
        </View>
        
      </View>

      {/* Rating Section */}
      <Text style={tw`text-center text-gray-500 mt-6`}>How was your experience?</Text>
      <View style={tw`flex-row justify-center mt-2`}>
        {[...Array(5)].map((_, index) => (
          <Text key={index} style={tw`text-yellow-500 text-lg`}>★</Text>
        ))}
      </View>

      {/* Back to Home Button */}
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Home")}}>
        <Text style={tw`text-white font-semibold`}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  orderDetails: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: "#6B7280",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardLogo: {
    width: 24,
    height: 16,
    resizeMode: "contain",
    marginRight: 8,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#00C2FF",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
});
