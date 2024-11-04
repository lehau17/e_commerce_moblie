import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import tw from "twrnc";

export default function PaymentScreen() {
  const [selectedPayment, setSelectedPayment] = useState("visa");

  return (
    <View style={styles.container}>
      {/* Payment Header */}
      <Text style={tw`text-xl font-bold text-center mb-4`}>Payment</Text>

      {/* Total Amount */}
      <Text style={tw`text-gray-500 text-center`}>TOTAL</Text>
      <Text style={tw`text-3xl font-bold text-center mb-6`}>$3,080</Text>

      {/* Payment Methods */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPayment === "visa" && styles.selectedPaymentOption,
        ]}
        onPress={() => setSelectedPayment("visa")}
      >
        <View style={styles.paymentRow}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" }}
            style={styles.cardLogo}
          />
          <Text style={styles.cardText}>**** 2334</Text>
        </View>
        <View style={selectedPayment === "visa" ? styles.selectedCircle : styles.circle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPayment === "mastercard" && styles.selectedPaymentOption,
        ]}
        onPress={() => setSelectedPayment("mastercard")}
      >
        <View style={styles.paymentRow}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" }}
            style={styles.cardLogo}
          />
          <Text style={styles.cardText}>**** 3774</Text>
        </View>
        <View style={selectedPayment === "mastercard" ? styles.selectedCircle : styles.circle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPayment === "paypal" && styles.selectedPaymentOption,
        ]}
        onPress={() => setSelectedPayment("paypal")}
      >
        <View style={styles.paymentRow}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" }}
            style={styles.cardLogo}
          />
          <Text style={styles.cardText}>abc@gmail.com</Text>
        </View>
        <View style={selectedPayment === "paypal" ? styles.selectedCircle : styles.circle} />
      </TouchableOpacity>

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.payNowButton}>
        <Text style={tw`text-white font-semibold text-center`}>Pay now</Text>
      </TouchableOpacity>

      {/* Add New Card Link */}
      <TouchableOpacity style={tw`mt-4`}>
        <Text style={tw`text-blue-500 text-center`}>+ Add new card</Text>
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
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
  },
  selectedPaymentOption: {
    borderColor: "#00C2FF",
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLogo: {
    width: 30,
    height: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#111827",
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  selectedCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#00C2FF",
  },
  payNowButton: {
    backgroundColor: "#00C2FF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
