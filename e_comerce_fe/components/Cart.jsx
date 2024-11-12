import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";
import { getMyCart, removeFromCart } from "../redux/slices/cartSlice";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.carts);

  useEffect(() => {
    dispatch(getMyCart());
  }, []);


  const calculateCartDetails = (data) => {
    let totalItems = 0;
    let totalPrice = 0;

    data.forEach((shop) => {
      shop.spus.forEach((product) => {
        product?.skus.forEach((sku) => {
          totalItems += sku.quantity;
          totalPrice += parseFloat(sku.total_price);
        });
      });
    });

    return { totalItems, totalPrice };
  };

  const { totalItems, totalPrice } = calculateCartDetails(cartItems);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Text style={styles.headerTitle}>Cart</Text>
        </TouchableOpacity>
        <Text style={styles.items}>Items: {totalItems}</Text>
      </View>
      <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
        {cartItems.map((shop, index) => (
          <View key={index} style={styles.storeContainer}>
            <View style={styles.shopHeader}>
              <Image source={{ uri: shop.shop.logo_url }} style={styles.shopLogo} />
              <Text style={styles.storeTitle}>{shop.shop.shop_name}</Text>
            </View>
            {shop.spus.map((product) => (
              <View key={product.id} style={styles.productContainer}>
                <Text style={styles.productName}>{product.product_name}</Text>
                {product.skus.map((sku) => (
                  <View key={sku.id} style={styles.item}>
                    <Text style={styles.itemName}>{sku.sku_name}</Text>
                    <Text style={styles.itemDetails}>{sku.sku_description}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.itemPrice}>${sku.sku_price} x {sku.quantity}</Text>
                      <TouchableOpacity style={styles.trashIcon} onPress={()=>{
                        dispatch(removeFromCart())
                      }}>
                        <Icon name="trash" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => { navigation.navigate("Checkout_v2") }}>
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f80ec',
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
    color: '#FFFFFF',
  },
  items: {
    fontSize: 16,
    padding: 7,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#777777",
    color: '#fff',
  },
  cartItems: {
    flex: 1,
    marginBottom: 20,
  },
  storeContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  shopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  shopLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  storeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  productContainer: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0E3251',
    marginLeft: 5,
    marginBottom: 4,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E3251',
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
    color: 'blue',
    fontWeight: 'bold',
  },
  trashIcon: {
    paddingLeft: 10,
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
    fontWeight: '700',
    color: '#0E3251',
  },
  checkoutButton: {
    backgroundColor: '#2f80ec',
    padding: 10,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CartScreen;
