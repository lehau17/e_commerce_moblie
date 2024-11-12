import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, FlatList, ActivityIndicator } from 'react-native';
import tw from "twrnc";
import Footer from "./Footer.jsx"
import { useDispatch, useSelector } from "react-redux"
const SelectedPayment = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { categories, loading } = useSelector((state) => state.categories)
  console.log(categories)
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Select Address Screen */}
        <View style={styles.screen}>
          <View style={tw`py-4`}>
            <Text style={styles.screenTitle}>Danh mục loại sản phẩm</Text>
          </View>
          <View style={tw`flex bg-white rounded-t-[30px] flex-1 p-4`}>
            {loading ?
              <ActivityIndicator size="large" color="#0000ff" /> : <FlatList data={categories} numColumns={4} keyExtractor={(item)=>item.id.toString()} columnWrapperStyle={{justifyContent:"space-between", padding:5}} renderItem={({item, index})=>{
                return <TouchableOpacity style={tw`w-[23%] my-2 flex items-center`}>
                  <Image source={{uri : item.image}} style={{height:65,borderRadius:200, width:"full"}}/>
                  <Text style={tw`text-md font-bold`}>{item.name}</Text>
                </TouchableOpacity>
              }}/>
            }

          </View>









        </View>
        <Footer navigation={navigation} />

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
    marginBottom: 10,
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
