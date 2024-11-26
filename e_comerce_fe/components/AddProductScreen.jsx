import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const AddProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([{ field: "", value: "" }]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Điện tử" },
    { id: 2, name: "Thời trang" },
    { id: 3, name: "Gia dụng" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([
    { id: 1, categoryId: 1, name: "Điện thoại" },
    { id: 2, categoryId: 1, name: "Máy tính xách tay" },
    { id: 3, categoryId: 2, name: "Áo thun" },
    { id: 4, categoryId: 3, name: "Máy xay sinh tố" },
  ]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    // Reset the selected product when the category changes
    setSelectedProduct("");
  }, [selectedCategory]);

  const addFeature = () => {
    setFeatures([...features, { field: "", value: "" }]);
  };

  const updateFeature = (index, key, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][key] = value;
    setFeatures(updatedFeatures);
  };

  const handleSubmit = () => {
    if (!productName || !price || !stock) {
      Alert.alert("Thông báo", "Vui lòng điền đủ thông tin bắt buộc!");
      return;
    }
    const newProduct = {
      productName,
      productDetail,
      description,
      stock,
      price,
      features,
      selectedCategory,
      selectedProduct,
    };
    Alert.alert("Thông báo", "Sản phẩm đã được thêm thành công!");
    console.log(newProduct);
    navigation.goBack(); // Quay lại giao diện quản lý sản phẩm
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thêm Sản Phẩm</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Tên sản phẩm */}
        <TextInput
          style={styles.input}
          placeholder="Tên sản phẩm *"
          value={productName}
          onChangeText={setProductName}
        />

        {/* Chi tiết sản phẩm */}
        <TextInput
          style={styles.input}
          placeholder="Chi tiết sản phẩm"
          value={productDetail}
          onChangeText={setProductDetail}
        />

        {/* Mô tả */}
        <TextInput
          style={styles.input}
          placeholder="Mô tả sản phẩm"
          value={description}
          onChangeText={setDescription}
        />

        {/* Tồn kho */}
        <TextInput
          style={styles.input}
          placeholder="Tồn kho *"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />

        {/* Giá tiền */}
        <TextInput
          style={styles.input}
          placeholder="Giá tiền *"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Chọn danh mục */}
        <Text style={styles.sectionTitle}>Chọn danh mục</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Chọn danh mục" value="" />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>

        {/* Chọn sản phẩm */}
        <Text style={styles.sectionTitle}>Chọn sản phẩm</Text>
        <Picker
          selectedValue={selectedProduct}
          onValueChange={(itemValue) => setSelectedProduct(itemValue)}
          style={styles.picker}
          enabled={selectedCategory !== ""}
        >
          <Picker.Item label="Chọn sản phẩm" value="" />
          {products
            .filter((product) => product.categoryId === selectedCategory)
            .map((product) => (
              <Picker.Item key={product.id} label={product.name} value={product.id} />
            ))}
        </Picker>

        {/* Đặc điểm */}
        <Text style={styles.sectionTitle}>Đặc điểm</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <TextInput
              style={[styles.input, styles.featureInput]}
              placeholder="Tên trường"
              value={feature.field}
              onChangeText={(value) => updateFeature(index, "field", value)}
            />
            <TextInput
              style={[styles.input, styles.featureInput]}
              placeholder="Giá trị"
              value={feature.value}
              onChangeText={(value) => updateFeature(index, "value", value)}
            />
          </View>
        ))}

        {/* Nút thêm đặc điểm */}
        <TouchableOpacity style={styles.addFeatureButton} onPress={addFeature}>
          <Ionicons name="add-circle-outline" size={24} color="#0077B6" />
          <Text style={styles.addFeatureText}>Thêm đặc điểm</Text>
        </TouchableOpacity>

        {/* Nút lưu */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Lưu sản phẩm</Text>
        </TouchableOpacity>
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
  formContainer: {
    padding: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  featureInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  addFeatureButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  addFeatureText: {
    fontSize: 16,
    color: "#0077B6",
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: "#0077B6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddProductScreen;
