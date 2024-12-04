import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../redux/slices/orderSlice";

const OrderManagementScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  // Get orders from the Redux state
  const orders = useSelector((state) => state.orders.fullOrder);

  useEffect(() => {
    // Dispatch the action to fetch orders when the component is mounted
    dispatch(getAllOrder());
  }, [dispatch]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Đang chờ xác nhận":
        return { backgroundColor: "#ffcc00", color: "#000" }; // Yellow for pending confirmation
      case "Đang chuẩn bị":
        return { backgroundColor: "#0077B6", color: "#fff" }; // Blue for preparing
      case "Đã giao":
        return { backgroundColor: "#28a745", color: "#fff" }; // Green for delivered
      case "Đã huỷ":
        return { backgroundColor: "#dc3545", color: "#fff" }; // Red for cancelled
      default:
        return { backgroundColor: "#f8f9fa", color: "#000" }; // Default grey
    }
  };

  const handleOrderClick = (order) => {
    // Navigate to order detail screen
    navigation.navigate("OrderDetail", { orderId: order.id });
  };

  const renderOrderItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);

    return (
      <TouchableOpacity
        style={[styles.orderItem, { borderLeftColor: statusStyle.backgroundColor }]}
        onPress={() => handleOrderClick(item)}
      >
        <View style={styles.orderInfo}>
          <Text style={styles.customerName}>{`Khách hàng: ${item.address.user_received}`}</Text>
          <Text style={[styles.orderStatus, { color: statusStyle.color }]}>
            {item.status}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#0077B6" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quản lý đơn hàng</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  orderList: {
    padding: 15,
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftWidth: 5,
  },
  orderInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderStatus: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default OrderManagementScreen;
