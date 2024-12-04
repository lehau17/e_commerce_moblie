import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsBySpuId, createComment } from '../redux/slices/commentSlice';

export default function ProductComments({ navigation, route }) {
  const { is = true, id } = route.params;
  console.log(is)
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);

  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsBySpuId(id));
      dispatch(fetchCommentsBySpuId(id))
    }
  }, [dispatch, id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập bình luận!');
      return;
    }

    try {
      await dispatch(createComment({ spuId: id, commentText: newComment })).unwrap();
      Alert.alert('Thành công', 'Bình luận đã được thêm!');
      console.log("thanh cong")
      setNewComment('');
    } catch (err) {
      Alert.alert('Lỗi', err);
      console.log("error", err)

    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/40' }}
        style={styles.userAvatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.userName}>{item.users?.full_name || 'Ẩn danh'}</Text>
        <Text style={styles.commentText}>{item.comment_text}</Text>
        <Text style={styles.commentDate}>{new Date(item.created_at).toLocaleString()}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <Text>Đang tải bình luận...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <Text>Đã xảy ra lỗi: {error}</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4 border-b border-gray-300`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`ml-4 text-lg font-bold`}>Danh sách bình luận</Text>
      </View>

      {/* Input for Adding Comment */}
      {is===true && <View style={tw`p-4 border-b border-gray-300 bg-gray-100`}>
        <TextInput
          style={styles.input}
          placeholder="Nhập bình luận..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>}

      {/* Comment List */}
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`p-4`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
