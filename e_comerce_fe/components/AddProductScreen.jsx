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
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categorySlices"; // Action to fetch categories
import { fetchProductsByCategory, fetchProducts, createSku } from "../redux/slices/productSlice"; // Action to fetch products by category

const AddProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([{ field: "", value: "" }]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Storing the full object
  const [selectedProduct, setSelectedProduct] = useState(null); // Storing the full object

  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products); // Get products by category

  console.log(products)

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts()) // Dispatch the action to fetch categories
  }, [dispatch]);
  console.log(products)



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
     product_name: productName,
     sku_name : productDetail,
      sku_description : description,
      sku_stock:+stock,
      sku_price: +price,
      sku_attri : {
        [features[0].field] :  features[0].value,
      }   // Full product object
    };
    console.log("new product", newProduct)
    Alert.alert("Thông báo", "Sản phẩm đã được thêm thành công!");
    dispatch(createSku(newProduct))
    navigation.goBack(); // Go back to product management screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thêm Sản Phẩm</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên sản phẩm *"
          value={productName}
          onChangeText={setProductName}
        />

        <TextInput
          style={styles.input}
          placeholder="Chi tiết sản phẩm"
          value={productDetail}
          onChangeText={setProductDetail}
        />

        <TextInput
          style={styles.input}
          placeholder="Mô tả sản phẩm"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Tồn kho *"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Giá tiền *"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.sectionTitle}>Chọn danh mục</Text>
        <Picker
          selectedValue={selectedCategory?.id}
          onValueChange={(itemValue) => {
            const category = categories.find((category) => category.id === itemValue);
            setSelectedCategory(category); // Store the whole category object
          }}
          style={styles.picker}
        >
          <Picker.Item label="Chọn danh mục" value="" />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>

        <Text style={styles.sectionTitle}>Chọn sản phẩm</Text>
        <Picker
          selectedValue={selectedProduct?.id}
          onValueChange={(itemValue) => {
            console.log(itemValue)
            const product = products.data.findIndex((product) => {
              return product.id == itemValue
            });
            setSelectedProduct(products.data[product]); // Store the whole product object
          }}
          style={styles.picker}
        >
          <Picker.Item label="Chọn sản phẩm" value="" />
          {products &&
            products?.data?.map((product) => (
                <Picker.Item key={product.id} label={product.product_name} value={product.id} />
              ))}
        </Picker>

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

        <TouchableOpacity style={styles.addFeatureButton} onPress={addFeature}>
          <Ionicons name="add-circle-outline" size={24} color="#0077B6" />
          <Text style={styles.addFeatureText}>Thêm đặc điểm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Lưu sản phẩm</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#0077B6", paddingVertical: 15, flexDirection: "row", alignItems: "center" },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  formContainer: { padding: 15 },
  input: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: "#ddd" },
  picker: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: "#ddd" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#333" },
  featureRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  featureInput: { flex: 1, marginHorizontal: 5 },
  addFeatureButton: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  addFeatureText: { fontSize: 16, color: "#0077B6", marginLeft: 5 },
  submitButton: { backgroundColor: "#0077B6", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddProductScreen;
