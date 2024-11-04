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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductDetail"
        screenOptions={{ cardStyle: { flex: 1 } }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: ({ navigation }) => (
              <Header title="Home" navigation={navigation} />
            ),
          }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
