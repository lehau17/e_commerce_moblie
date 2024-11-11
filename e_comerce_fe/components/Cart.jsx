import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Text style={styles.headerTitle}>Cart</Text>
        </TouchableOpacity>
        <Text style={styles.items}>Items: 04</Text>
      </View>
      <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
        <View style={styles.storeContainer}>
          <Text style={styles.storeTitle}>APPLE OFFICIAL</Text>
          <View style={styles.item}>
            <Text style={styles.itemName}>iPhone 11 Pro</Text>
            <Text style={styles.itemDetails}>Space Gray, 128 GB | Unlocked</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.itemPrice}>$999.00 x 1</Text>
              <TouchableOpacity style={styles.trashIcon}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemName}>Apple Watch Series 5</Text>
            <Text style={styles.itemDetails}>40mm Case, 145-165mm wrists</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.itemPrice}>$499.00 x 1</Text>
              <TouchableOpacity style={styles.trashIcon}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.total}>Total: $1498.00</Text>
        </View>

        <View style={styles.storeContainer}>
          <Text style={styles.storeTitle}>MAVIC STORE</Text>
          <View style={styles.item}>
            <Text style={styles.itemName}>Mavic Mini</Text>
            <Text style={styles.itemDetails}>1/2.3" CMOS, 12 MP Effective Pixels</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.itemPrice}>$399.00 x 1</Text>
              <TouchableOpacity style={styles.trashIcon}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.total}>Total: $1498.00</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: $2,816.00</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={()=>{navigation.navigate("Checkout_v2")}}>
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f80ec', // Dark blue background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  items: {
    fontSize: 16,
    padding: 7,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#777777",
    color: '#fff', // Light grey text
  },
  cartItems: {
    flex: 1,
    marginBottom: 20,
  },
  storeContainer: {
    backgroundColor: '#fff', // Darker blue for store containers
    borderRadius: 12,
    padding: 15,
    color: "#0E3251",
    marginBottom: 15,
  },
  storeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff', // Slightly lighter blue for items
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E3251',
    fontWeight: '700',
  },
  itemDetails: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 16,
    color: 'blue', // Yellow for price
    fontWeight: 'bold',
  },
  trashIcon: {
    paddingLeft: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 10,
    width: "100%",
    textAlign: "right",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
  },
  subtotal: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
  },
  checkoutButton: {
    backgroundColor: '#FFC107', // Yellow button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Dark blue text for contrast
  },
});

export default CartScreen;
