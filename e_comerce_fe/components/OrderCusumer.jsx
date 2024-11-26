import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, FlatList } from 'react-native';
import tw from "twrnc";
import {useDispatch, useSelector} from "react-redux"
import { getMyCart, removeFromCart } from "../redux/slices/cartSlice";

const CheckoutScreens = ({navigation, route}) => {
  const address = route.params.address
  const [selectedAddress, setSelectedAddress] = useState(null);
  const handleCheckboxToggle = (addressId) => {
    setSelectedAddress(selectedAddress === addressId ? null : addressId); // Chuyển đổi giữa chọn và bỏ chọn
  };
   const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.carts);

  useEffect(() => {
    dispatch(getMyCart());
  }, []);

  const totalPrice = ()=>{
    return cartItems.reduce((shopAcc, shop) => {
  const shopTotal = shop.spus.reduce((spuAcc, spu) => {
    const spuTotal = spu.skus.reduce((skuAcc, sku) => {
      return skuAcc + parseFloat(sku.total_price);
    }, 0);
    return spuAcc + spuTotal;
  }, 0);
  return shopAcc + shopTotal;
}, 0);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Select Address Screen */}
        <View style={styles.screen}>
          <View style={tw`py-4`}>
            <Text style={styles.screenTitle}>Xem lại đơn hàng</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={tw`w-full`}>
              <View style={tw`flex flex-row w-full items-center justify-between`}>
                <View style={[styles.progressStep]}>
                  <Text style={styles.stepText}>1</Text>
                  <Text style={styles.stepLabel}>Address</Text>
                </View>
                <View style={[styles.progressStep, styles.activeStep]}>
                  <Text style={styles.stepText}>2</Text>
                  <Text style={styles.stepLabel}>Order Summary</Text>
                </View>
                <View style={styles.progressStep}>
                  <Text style={styles.stepText}>3</Text>
                  <Text style={styles.stepLabel}>Payment</Text>
                </View>
              </View>

              <View style={tw`flex flex-row items-center justify-between`}>
                <Text style={tw` ml-1 my-2 text-[16px] font-bold`}>Địa chỉ giao hàng</Text>
                <Text style={tw`text-[12px] text-[blue]`}>Thay đổi</Text>
              </View>
              <View style={styles.addressContainer}>
                <View style={styles.addressInfo}>

                  <Text style={styles.addressName}>{address.user_received}</Text>
                  <Text style={styles.addressDetails}>{address.address}</Text>
                  <Text style={styles.addressPhone}>{address.phone}</Text>
                </View>

              </View>

              <Text style={tw` ml-1 my-2 text-[16px] font-bold`}>Đơn hàng của tôi</Text>
              {cartItems?.map((item, key)=>{
               return item.spus?.map(spu=>{
                return  spu.skus.map(sku=>{
                                       return <View style={styles.orderItem}>
                  <Image source={{ uri: spu.image }} style={styles.productImage} />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{spu.product_name}</Text>
                    <Text style={styles.productVariant}>{sku.sku_name}</Text>
                    <Text style={styles.productPrice}>{sku.sku_price}</Text>
                  </View>
                  <Text style={styles.quantity}>Quantity: {sku.quantity}</Text>
                </View>
                  })
                })
              })}
              <View style={styles.subtotal}>
                <Text style={styles.subtotalText}>Subtotal:</Text>
                <Text style={styles.subtotalPrice}>{totalPrice()}</Text>
              </View>
              <TouchableOpacity style={styles.primaryButton} onPress={()=>{navigation.navigate("SelectedPayment")}}>
                <Text style={styles.primaryButtonText}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>

          </View>







        </View>

      </ScrollView>
    </View>
  );
};


// {[1, 2, 3, 5].map(() => {
//                 return <View style={styles.orderItem}>
//                   <Image source={{ uri: 'https://example.com/jacket.png' }} style={styles.productImage} />
//                   <View style={styles.productDetails}>
//                     <Text style={styles.productName}>Quilted Jacket</Text>
//                     <Text style={styles.productVariant}>Color: Black | Size: S</Text>
//                     <Text style={styles.productPrice}>$1500</Text>
//                   </View>
//                   <Text style={styles.quantity}>Quantity: 1</Text>
//                 </View>
//               })}

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
    justifyContent: 'space-between',
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

export default CheckoutScreens;
