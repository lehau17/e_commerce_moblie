import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethods } from "../redux/slices/paymentSlice";
import {addOrder} from "../redux/slices/orderSlice"
const SelectedPayment = ({ navigation, route }) => {
const address_id = route.params.address_id
  const dispatch = useDispatch();
  const { paymentMethods, loading, error } = useSelector((state) => state.paymentMethods);
  // State to manage selected payment option
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, []);

  // Handle selection toggle
  const handleSelectPayment = (paymentType) => {
    console.log(paymentType)
    setSelectedPayment(paymentType);
  };

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
              {paymentMethods.map((item) => (
                <View style={styles.addressContainer} key={item.id}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => handleSelectPayment(item.id)} // Use method_name as identifier
                  >
                    <View style={[styles.checkbox, selectedPayment === item.method_name && styles.checkboxChecked]}>
                      {selectedPayment === item.method_name && <Text style={styles.checkboxText}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                  <Image source={{ uri: item.icon }} style={{ width: 30, height: 30, marginLeft: 5 }} />
                  <Text style={{ marginLeft: 5, fontWeight: '700' }}>{item.method_name}</Text>
                </View>
              ))}
          <TouchableOpacity onPress={()=>{
            console.log(address_id, selectedPayment)
            dispatch(addOrder({
              address_id,
              payment_method_id : selectedPayment
            }))
            navigation.navigate("OrderSuccess")}} style={{padding:15, margin:5, borderRadius:20, border:"1px solid gray", textAlign:"center", backgroundColor : "#2f80ec", color  : "white", fontWeight :700}}>Hoàn Thành</TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f80ec',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  screen: {
    borderRadius: 10,
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 5,
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
  addressContainer: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
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
