import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, FlatList } from 'react-native';
import tw from "twrnc";

const SelectedPayment = ({navigation, route}) => {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Select Address Screen */}
        <View style={styles.screen}>
          <View style={tw`py-4`}>
            <Text style={styles.screenTitle}>Hình thức thanh toán</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={tw`w-full`}>
              <View style={tw`flex flex-row w-full items-center justify-between`}>
                <View style={[styles.progressStep]}>
                  <Text style={styles.stepText}>1</Text>
                  <Text style={styles.stepLabel}>Address</Text>
                </View>
                <View style={[styles.progressStep]}>
                  <Text style={styles.stepText}>2</Text>
                  <Text style={styles.stepLabel}>Order Summary</Text>
                </View>
                <View style={[styles.progressStep, styles.activeStep]}>
                  <Text style={styles.stepText}>3</Text>
                  <Text style={styles.stepLabel}>Payment</Text>
                </View>
              </View>


              <View style={styles.addressContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                >
                  <View style={[styles.checkbox, styles.checkboxChecked]}>
                    <Text style={styles.checkboxText}>✓</Text>
                  </View>
                </TouchableOpacity>
                <Image source={{ uri: "https://tse2.mm.bing.net/th?id=OIP.v2CGEw20lkMY_CiWpZvRqgHaHa&pid=Api&P=0&h=180" }} style={{ width: 30, height: 30, marginLeft: 5 }} />
                <Text style={{ marginLeft: 5, fontWeight: 700 }}>Thẻ ghi nợ / thẻ ngân hàng</Text>
              </View>


              <View style={styles.addressContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                >
                  <View style={[styles.checkbox, styles.checkboxChecked]}>
                    <Text style={styles.checkboxText}>✓</Text>
                  </View>
                </TouchableOpacity>
                <Image source={{ uri: "https://tse2.mm.bing.net/th?id=OIP.6snL0ivARtOqr7JvjexMPQHaHa&pid=Api&P=0&h=180" }} style={{ width: 30, height: 30, marginLeft: 5 }} />
                <Text style={{ marginLeft: 5, fontWeight: 700 }}>Thẻ Visa / Ghi nợ quốc tế</Text>
              </View>
              <View style={styles.addressContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                >
                  <View style={[styles.checkbox, styles.checkboxChecked]}>
                    <Text style={styles.checkboxText}>✓</Text>
                  </View>
                </TouchableOpacity>
                <Image source={{ uri: "https://tse1.mm.bing.net/th?id=OIP.Yo_q-DsKk-TOGwhZ1UD8mgHaHa&pid=Api&P=0&h=180" }} style={{ width: 30, height: 30, marginLeft: 5 , borderRadius:1000}} />
                <Text style={{ marginLeft: 5, fontWeight: 700 }}>Thanh toán bằng tiền mặt</Text>
              </View>



              <TouchableOpacity style={styles.primaryButton} onPress={()=>{navigation.navigate("OrderSuccess")}}>
                <Text style={styles.primaryButtonText}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Đảm bảo container chiếm toàn bộ màn hình
    backgroundColor: '#2f80ec',
  },
  scrollContainer: {
    flexGrow: 1,  // Đảm bảo nội dung trong ScrollView có thể chiếm hết chiều cao
  },
  screen: {
    borderRadius: 10,
    flex: 1
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3498db',
  },
  checkboxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    flex: 1,
    height: "full",
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 5
  },
  activeStep: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  stepLabel: {
    fontSize: 12,
    color: '#555',
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productVariant: {
    fontSize: 12,
    color: '#555',
  },
  productPrice: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 12,
    color: '#555',
  },
  subtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#EEE',
  },
  subtotalText: {
    fontSize: 16,
    color: '#333',
  },
  subtotalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addAddressButton: {
    marginVertical: 15,
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addAddressText: {
    color: '#3498db',
  },
  addressContainer: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    borderBottomColor: "gray",
    borderBottomWidth: "1px"
  },
  addressInfo: {
    maxWidth: '85%',
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addressDetails: {
    fontSize: 14,
    color: '#555',
  },
  addressPhone: {
    fontSize: 14,
    color: '#555',
  },
  editButton: {
    padding: 5,
  },
  editText: {
    fontSize: 18,
    color: '#3498db',
  },
  primaryButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectedPayment;
