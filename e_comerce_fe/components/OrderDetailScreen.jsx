import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Picker, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeStateOrder } from "../redux/slices/orderSlice"; // Import the changeStateOrder action

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.order);

  // State for selected order status
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const handleStatusChange = (newStatus) => {
    console.log(newStatus)
    setSelectedStatus(newStatus);

    // Dispatch the action to update the order status
    dispatch(changeStateOrder({ orderId: order.id, status :newStatus }))
      .unwrap()
      .then(() => {
        console.log("thanh cong")
        Alert.alert("Success", "Order status updated successfully!");
      })
      .catch((error) => {
        console.log("tach")

        Alert.alert("Error", error.message || "Failed to update the order status.");
      });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chi tiết đơn hàng</Text>
      </View>

      {/* Order Details */}
      <View style={styles.orderDetail}>
        <Text style={styles.orderTitle}>Mã đơn hàng: {order.id}</Text>
        <Text style={styles.orderText}>Khách hàng: {order.address.user_received}</Text>
        <Text style={styles.orderText}>Số điện thoại: {order.address.phone}</Text>
        <Text style={styles.orderText}>Địa chỉ: {order.address.address}</Text>
        <Text style={styles.orderText}>Ngày đặt: {new Date(order.order_date).toLocaleString()}</Text>
        <Text style={styles.orderText}>Trạng thái: {selectedStatus}</Text>
        <Text style={styles.orderText}>Tổng số lượng: {order.total_quantity}</Text>
        <Text style={styles.orderText}>Tổng tiền: {order.total_amount} VND</Text>
        <Text style={styles.orderText}>Phương thức thanh toán: {order.payment_method_id}</Text>

        <Text style={styles.orderText}>Chi tiết đơn hàng:</Text>
        {order.order_details.map((detail) => (
          <View key={detail.order_detail_id} style={styles.orderItem}>
            <Text style={styles.orderText}>Sản phẩm ID: {detail.sku_id}</Text>
            <Text style={styles.orderText}>Số lượng: {detail.quantity}</Text>
            <Text style={styles.orderText}>Giá: {detail.price} VND</Text>
            <Text style={styles.orderText}>Tổng tiền: {detail.total_price} VND</Text>
          </View>
        ))}
      </View>

      {/* Status Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Chọn trạng thái đơn hàng:</Text>
        <Picker
          selectedValue={selectedStatus}
          onValueChange={handleStatusChange}
          style={styles.picker}
        >
          <Picker.Item label="Đang chờ xác nhận" value="Đang chờ xác nhận" />
          <Picker.Item label="Đang chuẩn bị" value="Đang chuẩn bị" />
          <Picker.Item label="Đã giao" value="Đã giao" />
          <Picker.Item label="Đã huỷ" value="Đã huỷ" />
        </Picker>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  header: {
    backgroundColor: "#0077B6",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  orderDetail: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 5,
    borderRadius: 5,
  },
  pickerContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default OrderDetailScreen;
