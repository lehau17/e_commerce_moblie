import React, {useEffect, useState} from "react"
import {View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Modal, TextInput} from "react-native"
import tw from "twrnc";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAddress, clearAddress } from '../redux/slices/shippingAddressSlice';
import AddressModal from "./AddressModal.jsx"
export default function SoDiaChi({navigation, route}){
   const [selectedAddress, setSelectedAddress] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    phone: '',
  }); // State for new address fields
   const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.shippingAddress);
   useEffect(() => {
    dispatch(getMyAddress());

    // Xóa địa chỉ khi component unmount (nếu cần)
    return () => {
      dispatch(clearAddress());
    };
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
  return <ScrollView style={tw`flex flex-1 bg-white`} showsVerticalScrollIndicator={false}>
      <View style={tw`flex flex-row items-center p-5 bg-[#2f80ec]`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-center text-lg font-bold text-white`}>Sổ địa chỉ</Text>
      </View>

      <View style={tw`flex items-center my-5`}>
        {data?.length != 0 ? <View>
        
          {data?.map((item) => (
                  <View style={styles.addressContainer} key={item.id}>
                    <TouchableOpacity
                      style={styles.checkboxContainer}
                      onPress={() => handleCheckboxToggle(item)} // Use ID to select
                    >
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
        </View> : <><Image source={{uri:"https://www.logolynx.com/images/logolynx/c3/c315c5e06b03ca367175fa44159e09d4.png"}} style={{width:140, height:200}}/>
        <Text style={tw`p-2`}>Bạn chưa có dịa chỉ giao hàng</Text></>}
      </View>


      <TouchableOpacity style={tw`border-2 border-[red] p-3 m-3 rounded-2xl`} onPress={() => setModalVisible(true)}>
        <Text style={tw`text-center font-bold`}>Thêm 1 địa chỉ mới</Text>
      
      </TouchableOpacity>
       <AddressModal modalVisible={modalVisible} setModalVisible={setModalVisible} handleAddAddress={handleAddAddress}/>

     
    </ScrollView>
}


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
    margin:4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Nền mờ đen
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%', // Gần full màn hình
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 10, // Đổ bóng
  },
  modalTitle: {
    fontSize: 18, // Kích thước chữ nhỏ hơn
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14, // Cỡ chữ nhỏ hơn
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#4CAF50', // Màu xanh cho nút chính
    borderRadius: 8,
    padding: 12,
    marginRight: 5,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f44336', // Màu đỏ cho nút hủy
    borderRadius: 8,
    padding: 12,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14, // Kích thước chữ nhỏ
    fontWeight: '600',
  },
});