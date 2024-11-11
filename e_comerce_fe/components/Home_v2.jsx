import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header with search bar */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items, categories etc"
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories Slider */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySlider}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Image source={{ uri: category.icon }} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dynamic Slider Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
        {promotions.map((promo, index) => (
          <Image key={index} source={{ uri: promo.image }} style={styles.promoImage} />
        ))}
      </ScrollView>

      {/* Special Deals Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Deals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {specialDeals.map((deal, index) => (
            <TouchableOpacity key={index} style={styles.productCard}>
              <Image source={{ uri: deal.image }} style={styles.productImage} />
              <Text style={styles.productName}>{deal.name}</Text>
              <Text style={styles.productPrice}>${deal.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Top Sellers Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Sellers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topSellers.map((product, index) => (
            <TouchableOpacity key={index} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

// Sample data
const categories = [
  { name: 'Grocery', icon: 'https://example.com/icon1.png' },
  { name: 'Fashion', icon: 'https://example.com/icon2.png' },
  // Add more categories as needed
];

const promotions = [
  { image: 'https://example.com/promo1.png' },
  { image: 'https://example.com/promo2.png' },
  // Add more promotions as needed
];

const specialDeals = [
  { name: 'Headphones', price: '35.00', image: 'https://example.com/deal1.png' },
  { name: 'Smart Watch', price: '50.00', image: 'https://example.com/deal2.png' },
  // Add more deals as needed
];

const topSellers = [
  { name: 'Phone', price: '150.00', image: 'https://example.com/seller1.png' },
  { name: 'Backpack', price: '45.00', image: 'https://example.com/seller2.png' },
  // Add more sellers as needed
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F1F1F1',
    color: '#333',
  },
  categorySlider: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  slider: {
    height: 150,
    marginVertical: 15,
  },
  promoImage: {
    width: 300,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  section: {
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productCard: {
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6347', // Price color
  },
});

export default HomeScreen;
