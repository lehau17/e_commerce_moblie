import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux"
import {fetchMyProducts, deleteProduct} from  "../redux/slices/productManager"
const ProductManagementScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.productManager)

  useEffect(()=>{
    dispatch(fetchMyProducts())
  }, [])
  console.log(data)

  const [products, setProducts] = useState([
    { id: "1", name: "Gấu bông Pikachu", price: "150,000 VND", stock: 20 },
    { id: "2", name: "Thỏ bông trắng", price: "120,000 VND", stock: 15 },
    { id: "3", name: "Mèo bông Hello Kitty", price: "200,000 VND", stock: 10 },
    { id: "4", name: "Sư tử bông nhỏ", price: "180,000 VND", stock: 5 },
  ]);

  // Handle delete product
  const deleteProductSummit = (id) => {
    console.log(id)
    dispatch(deleteProduct(id))
  };

  const editProduct = (id) => {
    Alert.alert("Thông báo", `Chỉnh sửa sản phẩm có ID: ${id}`);
  };

  const addProduct = () => {
    navigation.navigate("AddProductScreen")
  };

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={{width:70, height:70, borderRadius:10}}/>
      <View style={{ flex: 1, marginLeft:10}}>
        <Text style={styles.productName}>{item.sku_name}</Text>
        <Text style={styles.productPrice}>Giá: {item.sku_price}</Text>
        <Text style={styles.productStock}>Tồn kho: {item.sku_stock}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => editProduct(item.spu_id)} style={styles.editButton}>
          <Ionicons name="create" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteProductSummit(item.spu_id)} style={styles.deleteButton}>
          <Ionicons name="trash" size={20} color="#FF6F61" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quản Lý Sản Phẩm</Text>
      </View>

      {/* Add Product Button */}
      <TouchableOpacity style={styles.addButton} onPress={addProduct}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>

      {/* Product List */}
      <FlatList
        data={data.products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
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
    backgroundColor: "#0077B6", // Xanh nước biển
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0077B6",
    padding: 10,
    margin: 15,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  productCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  productStock: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
});

export default ProductManagementScreen;
