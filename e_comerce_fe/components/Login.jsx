import React, { useEffect } from 'react';
import { Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlices'; // Import your login action
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Use the navigation hook

  // Accessing Redux state for loading, error, and token
  const { loading, error, accessToken } = useSelector(state => state.auth);

  useEffect(() => {
    if (accessToken) {
      // Navigate to Home screen when login is successful
      navigation.navigate("Home");
    }
  }, [accessToken, navigation]);

  const onSubmit = (data) => {
    // Dispatch the login action with the form data (username and password)
    dispatch(login({
      username: data.username,
      password: data.password
    }));
  };

  // Show error if exists
  useEffect(() => {
    if (error) {
      Alert.alert("Login Error", error);
    }
  }, [error]);

  return (
    <View style={tw`flex-1 justify-center px-6 bg-gradient-to-b from-blue-500 to-blue-300`}>
      <Text style={tw`text-3xl font-bold text-dark text-center mb-8`}>Welcome to HT </Text>

      {/* Username Field */}
      <Controller
        control={control}
        name="username"
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters"
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#B0BEC5" // Light gray for placeholder
              style={tw`border border-gray-300 p-4 mb-4 rounded-lg bg-white shadow-md`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.username && <Text style={tw`text-red-500 mb-4`}>{errors.username.message}</Text>}
          </>
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#B0BEC5" // Light gray for placeholder
              style={tw`border border-gray-300 p-4 mb-4 rounded-lg bg-white shadow-md`}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.password && <Text style={tw`text-red-500 mb-4`}>{errors.password.message}</Text>}
          </>
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={tw`bg-white p-3 rounded-lg shadow-md`}
        onPress={handleSubmit(onSubmit)}
        disabled={loading} // Disable button when loading
      >
        <Text style={tw`text-blue-500 text-center text-lg font-semibold`}>Login</Text>
      </TouchableOpacity>

      {/* Loading indicator */}
      {loading && <Text style={tw`text-white text-center mt-4`}>Loading...</Text>}

      {/* Forgot Password */}
      <TouchableOpacity style={tw`mt-4`}>
        <Text style={tw`text-blue-400 text-center`}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}
