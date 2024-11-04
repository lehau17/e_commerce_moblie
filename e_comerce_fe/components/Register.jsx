import React from 'react';
import { Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import tw from 'twrnc';

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit, watch, formState: { errors } } = useForm();

  // Lấy giá trị password để xác thực confirm password
  const password = watch('password', '');

  const onSubmit = (data) => {
    console.log(data);
    Alert.alert("Registration Successful", `Email: ${data.email}`);
  };

  return (
    <View style={tw`flex-1 justify-center px-6 bg-gray-100`}>
      <Text style={tw`text-4xl font-bold text-center mb-8 text-blue-600`}>Register</Text>

      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i, // Kiểm tra định dạng email
            message: "Email is invalid"
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#B0BEC5"
              style={tw`border border-gray-300 p-4 mb-4 rounded-lg bg-white shadow-md`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.email && <Text style={tw`text-red-500 mb-4`}>{errors.email.message}</Text>}
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
              placeholderTextColor="#B0BEC5"
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

      {/* Confirm Password Field */}
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: "Confirm Password is required",
          validate: value =>
            value === password || "Passwords do not match" // So sánh confirm password với password
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#B0BEC5"
              style={tw`border border-gray-300 p-4 mb-4 rounded-lg bg-white shadow-md`}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.confirmPassword && <Text style={tw`text-red-500 mb-4`}>{errors.confirmPassword.message}</Text>}
          </>
        )}
      />

      {/* Submit Button */}
      <Button title="Register" onPress={handleSubmit(onSubmit)} color="#4F46E5" />

      {/* Already have an account? Login Link */}
      <View style={tw`flex-row justify-center mt-6`}>
        <Text style={tw`text-gray-600`}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={tw`text-blue-600 font-bold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
