import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, ScrollView } from "react-native";
import tw from "twrnc";

export default function CheckoutScreen() {
  const [voucherCode, setVoucherCode] = useState("");

  const products = [
    { id: 1, name: "Headphone", description: "Consequat ex eu", price: "$500", quantity: "x1", image: "https://picsum.photos/200" },
    { id: 2, name: "Headphone", description: "Consequat ex eu", price: "$300", quantity: "x1", image: "https://picsum.photos/200" },
    { id: 3, name: "Smartphone", description: "Consequat ex eu", price: "$1000", quantity: "x1", image: "https://picsum.photos/200" },
    { id: 4, name: "Smartphone", description: "Consequat ex eu", price: "$1000", quantity: "x1", image: "https://picsum.photos/200" },
  ];

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={tw`flex-1 ml-3`}>
        <Text style={tw`font-semibold`}>{item.name}</Text>
        <Text style={tw`text-gray-400 text-sm`}>{item.description}</Text>
        <Text style={tw`text-lg font-semibold mt-2`}>{item.price}</Text>
      </View>
      <Text style={tw`text-gray-400`}>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl font-bold text-center mb-4`}>Checkout</Text>

      {/* Product List */}
      <FlatList
        data={products}
        showsVerticalScrollIndicator = {false}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Voucher Code */}
      <View style={styles.voucherContainer}>
        <TextInput
          placeholder="Enter voucher code"
          value={voucherCode}
          onChangeText={setVoucherCode}
          style={tw`flex flex-1 p-4 border-none`}
        />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={tw`text-blue-500 font-semibold`}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={tw`text-lg font-semibold`}>TOTAL</Text>
        <Text style={tw`text-2xl font-bold`}>$2,800</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={tw`text-white font-semibold text-center`}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  voucherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  voucherInput: {
    flex: 1,
    height: 40,
    border: "none"
  },
  applyButton: {
    paddingHorizontal: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#00C2FF",
    paddingVertical: 15,
    borderRadius: 10,
  },
});
