import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchMyOrders } from "../redux/slices/orderSlice"; // Import Thunk

const OrderManagement = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Lấy trạng thái từ Redux store
  const { orders, loading, error } = useSelector((state) => state.order);

  console.log(orders);

  // Dữ liệu mẫu cho trạng thái đơn hàng
  const orderStatuses = [
    { id: "Tất cả", status: "Tất cả" },
    { id: "Đang chờ xác nhận", status: "Đang chờ xác nhận" },
    { id: "Vận chuyển", status: "Vận chuyển" },
    { id: "Đã giao", status: "Đã giao" },
    { id: "Hủy", status: "Hủy" },
  ];

  // State quản lý trạng thái được chọn, mặc định là "Tất cả"
  const [selectedStatus, setSelectedStatus] = useState(orderStatuses[0].id);

  // Lọc danh sách đơn hàng theo trạng thái được chọn
  const filteredOrders =
    selectedStatus === "Tất cả"
      ? orders
      : orders.filter((order) =>
          order.status.toLowerCase().trim() === selectedStatus.toLowerCase().trim()
        );

  // Gọi API khi component mount
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>◀ Quay về</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Quản Lý Đơn Hàng</Text>
      </View>

      {/* Trạng thái Loading */}
      {loading && <ActivityIndicator size="large" color="#87CEEB" style={styles.loading} />}

      {/* Hiển thị lỗi nếu có */}
      {error && <Text style={styles.errorText}>Lỗi: {error}</Text>}

      {/* FlatList trạng thái đơn hàng */}
      <View style={styles.statusContainer}>
        <FlatList
          data={orderStatuses}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.statusButton,
                selectedStatus === item.id && styles.selectedStatusButton,
              ]}
              onPress={() => setSelectedStatus(item.id)}
            >
              <Text
                style={[
                  styles.statusText,
                  selectedStatus === item.id && styles.selectedStatusText,
                ]}
              >
                {item.status} 
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* FlatList danh sách đơn hàng */}
      <View style={styles.orderListContainer}>
        {filteredOrders.length > 0 ? (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Text style={styles.orderName}>Đơn hàng #{item.id}</Text>
                <Text style={styles.orderDetail}>
                  Ngày đặt: {new Date(item.order_date).toLocaleDateString()}
                </Text>
                <Text style={styles.orderDetail}>Số lượng: {item.total_quantity}</Text>
                <Text style={styles.orderDetail}>Tổng tiền: {item.total_amount} VND</Text>
                <Text style={styles.orderDetail}>
                  Địa chỉ: {item.address.address} ({item.address.user_received})
                </Text>                <Text style={{...styles.orderDetail, fontWeight:700}}>
                  Trạng thái đơn hàng: {item.status}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.placeholderText}>Không có đơn hàng trong trạng thái này</Text>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#87CEEB",
    padding: 16,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  statusContainer: {
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  statusButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedStatusButton: {
    backgroundColor: "#87CEEB",
  },
  statusText: {
    color: "#333",
  },
  selectedStatusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orderListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  orderItem: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDetail: {
    color: "#555",
    marginTop: 4,
  },
  placeholderText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});

export default OrderManagement;
