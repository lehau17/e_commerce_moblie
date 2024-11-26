import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng bộ icon Ionicons
import { useDispatch, useSelector } from 'react-redux';
import { updateMe } from '../redux/slices/userProfileSlice';

export default function UpdatePatch({ navigation, route }) {
  const fullName = route.params?.field || 'Họ & Tên';
  const field_api = route.params?.field_api || 'field';
  const value = route.params?.value || '';
  const [data, setData] = useState({ [field_api]: value });
  const [isSubmitted, setIsSubmitted] = useState(false); // Cờ kiểm tra xem đã submit hay chưa
  const { loading, error } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  const handlerData = (data) => {
    setData({ [field_api]: data });
  };

  useEffect(() => {
    if (!loading && !error && isSubmitted) {
      navigation.goBack();
    }
  }, [loading, error, isSubmitted, navigation]);

  const handleSave = () => {
    setIsSubmitted(true); // Đánh dấu là đã nhấn nút lưu
    dispatch(updateMe(data));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.headerTitle}>{fullName}</Text>
      </TouchableOpacity>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>{fullName}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Nhập ${fullName}`}
            value={data[field_api]}
            onChangeText={(text) => handlerData(text)}
          />
          {data[field_api]?.length > 0 && (
            <TouchableOpacity onPress={() => handlerData('')}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.note}>{error ? error : ''}</Text>

        <TouchableOpacity
          style={[styles.saveButton]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {!loading ? 'Lưu thay đổi' : 'LOADING'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#007BFF',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    borderColor: 'white',
  },
  note: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
