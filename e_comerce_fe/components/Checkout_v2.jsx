import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Modal } from 'react-native';
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAddresses } from "../redux/slices/shipping_addressesSlice";

const CheckoutScreens = ({ navigation, route }) => {
  const [selectedAddress, setSelectedAddress] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    phone: '',
  }); // State for new address fields
  const dispatch = useDispatch();
  console.log(selectedAddress)
  const { addresses } = useSelector((state) => state.addresses);

  useEffect(() => {
    dispatch(fetchMyAddresses());
  }, [dispatch]);

  const handleCheckboxToggle = (addressId) => {
    setSelectedAddress(selectedAddress === addressId ? null : addressId);
  };

  const handleAddAddress = () => {
    // Handle adding new address
    console.log(newAddress);
    setModalVisible(false); // Close the modal after adding
    // Dispatch an action to save the address to the store or backend
  };

  const handleCancel = () => {
    setModalVisible(false); // Close modal on cancel
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
              <TouchableOpacity style={styles.addAddressButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addAddressText}>+ Add New Address</Text>
              </TouchableOpacity>
              <View>
                {addresses.map((item) => (
                  <View style={styles.addressContainer} key={item.id}>
                    <TouchableOpacity
                      style={styles.checkboxContainer}
                      onPress={() => handleCheckboxToggle(item)} // Use ID to select
                    >
                      <View style={[styles.checkbox, selectedAddress.id === item.id && styles.checkboxChecked]}>
                        {selectedAddress === item.id && <Text style={styles.checkboxText}>✓</Text>}
                      </View>
                    </TouchableOpacity>
                    <View style={styles.addressInfo}>
                      <Text style={styles.addressName}>{item.user_received}</Text>
                      <Text style={styles.addressDetails}>{item.address}</Text>
                      <Text style={styles.addressPhone}>{item.phone}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                      <Text style={styles.editText}>✏️</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.primaryButton} onPress={() => { navigation.navigate("OrderCusmer", {address : selectedAddress}); }}>
                <Text style={styles.primaryButtonText}>Deliver Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal for Adding New Address */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Recipient's Name"
              value={newAddress.name}
              onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newAddress.address}
              onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newAddress.phone}
              onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
              keyboardType="phone-pad"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddAddress}>
                <Text style={styles.modalButtonText}>Add Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    flex:1
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CheckoutScreens;
