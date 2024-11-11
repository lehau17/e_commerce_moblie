import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from 'react-native';
import tw from "twrnc";

const CheckoutScreens = ({navigation, route}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleCheckboxToggle = (addressId) => {
    setSelectedAddress(selectedAddress === addressId ? null : addressId); // Chuyển đổi giữa chọn và bỏ chọn
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Select Address Screen */}
        <View style={styles.screen}>
          <View style={tw`py-4`}>
            <Text style={styles.screenTitle}>Select Address</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={tw`w-full`}>
              <View style={tw`flex flex-row w-full items-center justify-between`}>
                <View style={[styles.progressStep, styles.activeStep]}>
                  <Text style={styles.stepText}>1</Text>
                  <Text style={styles.stepLabel}>Address</Text>
                </View>
                <View style={styles.progressStep}>
                  <Text style={styles.stepText}>2</Text>
                  <Text style={styles.stepLabel}>Order Summary</Text>
                </View>
                <View style={styles.progressStep}>
                  <Text style={styles.stepText}>3</Text>
                  <Text style={styles.stepLabel}>Payment</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.addAddressButton}>
                <Text style={styles.addAddressText}>+ Add New Address</Text>
              </TouchableOpacity>
              <View style={styles.addressContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleCheckboxToggle(1)} // Sử dụng ID để chọn
                >
                  <View style={[styles.checkbox, selectedAddress === 1 && styles.checkboxChecked]}>
                    {selectedAddress === 1 && <Text style={styles.checkboxText}>✓</Text>}
                  </View>
                </TouchableOpacity>
                <View style={styles.addressInfo}>

                  <Text style={styles.addressName}>John Doe</Text>
                  <Text style={styles.addressDetails}>123, My street, Kingston, Kingston-653263, Argentina</Text>
                  <Text style={styles.addressPhone}>9876543213</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editText}>✏️</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.primaryButton} onPress={()=>{navigation.navigate("OrderCusmer")}}>
                <Text style={styles.primaryButtonText}>Deliver Here</Text>
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
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
