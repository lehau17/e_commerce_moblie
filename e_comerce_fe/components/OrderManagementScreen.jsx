import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderManagementScreen = ({ navigation }) => {
  // Dữ liệu đơn hàng mẫu
  const [orders, setOrders] = useState([
    { id: "1", customer: "Nguyễn Văn A", status: "Đang chờ xác nhận", totalAmount: "300,000 VND" },
    { id: "2", customer: "Trần Thị B", status: "Đã xác nhận", totalAmount: "500,000 VND" },
    { id: "3", customer: "Lê Văn C", status: "Đang giao hàng", totalAmount: "250,000 VND" },
    { id: "4", customer: "Phạm Thị D", status: "Đã giao", totalAmount: "150,000 VND" },
  ]);

  const [selectedStatus, setSelectedStatus] = useState("Đang chờ xác nhận");

  // Hàm thay đổi trạng thái đơn hàng
  const changeOrderStatus = (id) => {
    const orderIndex = orders.findIndex((order) => order.id === id);
    const newOrders = [...orders];
    const currentStatus = newOrders[orderIndex].status;

    // Định nghĩa các trạng thái có thể thay đổi
    const statusList = ["Đang chờ xác nhận", "Đã xác nhận", "Đang giao hàng", "Đã giao"];
    const currentIndex = statusList.indexOf(currentStatus);

    // Tiến hành thay đổi trạng thái đơn hàng
    const nextStatus = statusList[(currentIndex + 1) % statusList.length];
    newOrders[orderIndex].status = nextStatus;
    setOrders(newOrders);
  };

  // Xóa đơn hàng
  const deleteOrder = (id) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa đơn hàng này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => setOrders(orders.filter((order) => order.id !== id)),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  // Lọc đơn hàng theo trạng thái đã chọn
  const filteredOrders = orders.filter((order) => order.status === selectedStatus);

  // Render mỗi đơn hàng
  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate("OrderDetails", { orderId: item.id })}
    >
      <View style={styles.orderInfo}>
        <Text style={styles.orderCustomer}>{item.customer}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
        <Text style={styles.orderAmount}>{item.totalAmount}</Text>
      </View>
      <View style={styles.orderActions}>
        <TouchableOpacity onPress={() => changeOrderStatus(item.id)}>
          <Ionicons name="refresh" size={24} color="#0077B6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteOrder(item.id)}>
          <Ionicons name="trash" size={24} color="#FF6F61" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quản Lý Đơn Hàng</Text>
      </View>

      {/* FlatList cho trạng thái đơn hàng (Ngang) */}
    <View>
            <FlatList
            showsHorizontalScrollIndicator={false}
        horizontal
        data={["Đang chờ xác nhận", "Đã xác nhận", "Đang giao hàng", "Đã giao"]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.statusButton,
              selectedStatus === item && styles.selectedStatus,
            ]}
            onPress={() => setSelectedStatus(item)}
          >
            <Text style={styles.statusText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.statusList}
      />
    </View>

      {/* Danh sách đơn hàng dựa trên trạng thái đã chọn */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Nút thêm đơn hàng */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddOrder")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
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
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  listContainer: {
    padding: 15,
  },
  statusList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#0077B6",
  },
  selectedStatus: {
    backgroundColor: "#0077B6",
  },
  statusText: {
    color: "black",
    fontWeight: "bold",
  },
  orderCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderInfo: {
    flex: 1,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderStatus: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  orderAmount: {
    fontSize: 14,
    color: "#0077B6",
    marginTop: 5,
  },
  orderActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#0077B6",
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderManagementScreen;
