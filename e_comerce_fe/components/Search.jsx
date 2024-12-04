import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Icon tìm kiếm từ Expo
import AsyncStorage from '@react-native-async-storage/async-storage';  // Nếu bạn dùng AsyncStorage

const ProductSearch = ({navigate}) => {
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm đã lọc
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Lỗi API
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Hàm gọi API
  const fetchProducts = async (query) => {
    setLoading(true);
    try {
       const accessToken = await AsyncStorage.getItem('accessToken'); // Giả sử bạn lưu token với tên 'access_token'
      const response = await fetch(`http://localhost:3000/spu/search?product_name=${query}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`, // Thêm Bearer token vào header
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      setProducts(data.data);
      setFilteredProducts(data.data);
      setLoading(false);
    } catch (err) {
      setError("Không thể lấy dữ liệu");
      setLoading(false);
    }
  };

  // Xử lý tìm kiếm với debounce
  const handleSearch = (query) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear timeout nếu có
    }

    const newTimeout = setTimeout(() => {
      setSearchQuery(query);
      fetchProducts(query); // Gọi API khi search query thay đổi
    }, 500); // Debounce trong 500ms

    setDebounceTimeout(newTimeout); // Cập nhật timeout mới
  };

  // Lọc sản phẩm theo searchQuery
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products); // Nếu không có search, hiển thị tất cả sản phẩm
    } else {
      const filtered = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered); // Cập nhật sản phẩm đã lọc
    }
  }, [searchQuery, products]);

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      {/* Trạng thái Loading */}
      {loading && <ActivityIndicator size="large" color="#87CEEB" style={styles.loading} />}

      {/* Hiển thị lỗi nếu có */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem}                   onPress={() => navigation.navigate("ProductDetail", { product: item })}
>
            <Image source={item.image} style={{width: 150, height:100, margin:5, borderRadius:10}} />
            <Text style={styles.productName}>{item.product_name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có sản phẩm nào tìm thấy</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 5, // Tạo bóng cho ô tìm kiếm
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  productItem: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3, // Tạo bóng cho sản phẩm
    alignItems: "center",
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#555",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});

export default ProductSearch;
