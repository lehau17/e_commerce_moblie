import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"; // Added FontAwesome5 for diverse icons
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quản Lý Cửa Hàng</Text>
      </View>

      {/* Body */}
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        {/* Statistics */}
        <View style={styles.statistics}>
          <View style={styles.statCard}>
            <FontAwesome5 name="box" size={32} color="#0077B6" />
            <Text style={styles.statTitle}>Sản phẩm</Text>
            <Text style={styles.statValue}>120</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="cart" size={32} color="#0077B6" />
            <Text style={styles.statTitle}>Đơn hàng</Text>
            <Text style={styles.statValue}>50</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome5 name="money-bill-wave" size={32} color="#0077B6" />
            <Text style={styles.statTitle}>Doanh thu</Text>
            <Text style={styles.statValue}>20M</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people" size={32} color="#0077B6" />
            <Text style={styles.statTitle}>Khách hàng</Text>
            <Text style={styles.statValue}>85</Text>
          </View>
        </View>

        {/* Functions */}
        <View style={styles.functions}>
          <TouchableOpacity style={styles.functionCard} onPress={()=>{navigation.navigate("ProductManagementScreen")}}>
            <Text style={styles.functionText}>Quản lý sản phẩm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.functionCard}>
            <Text style={styles.functionText}>Quản lý đơn hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.functionCard}>
            <Text style={styles.functionText}>Quản lý khách hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.functionCard}>
            <Text style={styles.functionText}>Báo cáo doanh thu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  body: {
    padding: 15,
  },
  statistics: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#fff",
    width: "48%", // 2 cards per row
    marginVertical: 8,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statTitle: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0077B6",
  },
  functions: {
    marginTop: 10,
  },
  functionCard: {
    backgroundColor: "#0077B6",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  functionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
