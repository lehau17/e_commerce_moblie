import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.totalAmount}>$2,816.00</Text>
      </View>
      
      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity style={styles.paymentMethod}>
          <Text>Nagad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.paymentMethod, styles.activeMethod]}>
          <Text>Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentMethod}>
          <Text>Other</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Card Number" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Name on Card" />
        <View style={styles.expirationRow}>
          <TextInput style={styles.expirationInput} placeholder="MM" keyboardType="numeric" />
          <TextInput style={styles.expirationInput} placeholder="YY" keyboardType="numeric" />
        </View>
        <TextInput style={styles.input} placeholder="CCV" keyboardType="numeric" />
        <TouchableOpacity style={styles.saveCardDetails}>
          <Text>Save card details</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>CONFIRM & PAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E3251', // Dark blue background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFC107', // Yellow color for total amount
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  paymentMethod: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF', // White background for inactive method
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  activeMethod: {
    backgroundColor: '#FFC107', // Yellow for active method
  },
  form: {
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  expirationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expirationInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '48%',
  },
  saveCardDetails: {
    alignItems: 'center',
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: '#FFC107', // Yellow for confirm button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E3251', // Dark blue text for contrast
  },
});

export default CheckoutScreen;
