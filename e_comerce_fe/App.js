import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tw from 'twrnc';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import CategoryProduct from "./components/CategoryProduct"
import OrderSuccess from "./components/OrderSuccess"
import Payment from "./components/PaymentScreen"
import Checkout from "./components/CheckoutScreen"
import ProductDetail from "./components/ProductDetail"
const Stack = createStackNavigator();
import { Provider } from "react-redux"
import store from "./redux/store"
import { navigationRef } from "./cofig/navigationRef"
import Cart from "./components/Cart.jsx"
import Home_v2 from "./components/Home_v2.jsx"
import Payment_v2 from "./components/Payment_v2.jsx"
import Checkout_v2 from "./components/Checkout_v2.jsx"
import OrderCusmer from "./components/OrderCusumer.jsx"
import SelectedPayment from "./components/SelectedPayment.jsx"
import SeeAllCate from "./components/SeeAllCate.jsx"
// Details Screen component
function DetailsScreen({ navigation }) {
  return (
    <View style={tw`flex-1 items-center justify-center bg-green-500`}>
      <Text style={tw`text-white text-lg font-bold`}>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="SeeAllCate"
          screenOptions={{ cardStyle: { flex: 1 } }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CategoryList"
            component={CategoryProduct}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderSuccess"
            component={OrderSuccess}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Carts"
            component={Cart}
            options={{ headerShown: false }}
          /><Stack.Screen
            name="Paymentv2"
            component={Payment_v2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home2"
            component={Home_v2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout_v2"
            component={Checkout_v2}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OrderCusmer"
            component={OrderCusmer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectedPayment"
            component={SelectedPayment}
            options={{ headerShown: false }}
          /><Stack.Screen
            name="SeeAllCate"
            component={SeeAllCate}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
