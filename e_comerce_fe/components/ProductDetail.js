import React, { useState, useRef, useEffect } from 'react';
import TruckIcon from '../icons/TruckIcon';
import ArrowIcon from '../icons/ArrowIcon';
import LeftAltCircleIcon from '../icons/LeftAltCircleIcon';
import Star from '../icons/Star';
import AuthorizeStore from '../icons/authorizeStore';
import { fetchProductDetail } from '../redux/slices/productSlice';
import {addToCart} from "../redux/slices/cartSlice"
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Modal,
  Button,
} from 'react-native';
import tw from 'twrnc';
import SearchIcon from '../icons/SearchIcon';
import StarIcon from '../icons/StarIcon';
import Header from './Header.jsx';
import ImageSlider from './ImageSlider';

const productMock = {
  id: 1,
  name: 'Headphone',
  price: 99,
  banner: [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ],
  rating: 4.5,
  total_reviews: 99,
  top_reviews: [
    
  ],
  description:
    'Headphone được sản xuất và phát triển bởi IUH Industry. Hàng Xi da chất lượng thấp',
};

export default function ProductDetail({ navigation, route }) {
   const [selectedOptions, setSelectedOptions] = useState({});

  // Handle selection dynamically based on type (color, size, etc.)
  const handleSelection = (type, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [type]: value
    }));
  };


  const dispatch = useDispatch();
  const { productDetail, loading, error } = useSelector(state => state.products);
  const sliderData = productMock.banner.map((url, index) => ({
    url: url,
    title: `${productMock.name} Image ${index + 1}`,
  }));
  const {id} = route.params?.product || 1;

  console.log("check id", id)

  // Animated value to control the footer visibility
  const [footerVisible, setFooterVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [quantity, setQuantity] = useState(1); // Quantity selected by user
  const [price, setPrice] = useState(0)

  const scrollY = useRef(new Animated.Value(0)).current;

  // Handle scroll events
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  // Detect the scroll direction to hide/show footer
  useEffect(() => {
     if (id) {
      dispatch(fetchProductDetail(id));  // Fetch product details when component mounts
    }
    const listenerId = scrollY.addListener(({ value }) => {
      if (value > 100) {
        setFooterVisible(false); // Hide footer when scrolling down
      } else {
        setFooterVisible(true); // Show footer when scrolling up
      }
    });

    return () => {
      scrollY.removeListener(listenerId); // Clean up the listener on unmount
    };
  }, [scrollY, id, dispatch]);

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };




  const handleAddToCart = () => {
  const selectedSku = productDetail.sku.find(sku => {
    // Kiểm tra nếu tất cả thuộc tính trong selectedOptions khớp với sku_attr
    return sku.sku_attr.every(attr => {
      const attrKey = Object.keys(attr.spu_specs)[0]; // Lấy tên thuộc tính (color, size, ...)
      const attrValue = attr.spu_specs[attrKey]; // Lấy giá trị thuộc tính (Black, White, ...)
      return selectedOptions[attrKey] === attrValue; // Kiểm tra giá trị có khớp không
    });
  });

  // Nếu tìm thấy SKU phù hợp, thực hiện hành động
  if (selectedSku) {
    dispatch(addToCart({quantity, sku_id: selectedSku.id}))
    setModalVisible(false); // Đóng modal
  } else {
    console.log("No matching SKU found.");
  }
};



  if (loading) {
    return <Text>Loading...</Text>; // Show loading if data is being fetched
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Show error message if there is an error
  }

  if (!productDetail) {
    return <Text>No product details available.</Text>; // Fallback if product details are empty
  }




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView
        style={tw`bg-white`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        onScroll={onScroll}>
        <Header navigation={navigation} title={productDetail.product_name} />
        <View style={tw`p-3`}>
          <ImageSlider data={sliderData} />
          <View
            style={tw`flex flex-row items-center justify-between pb-4 border-b border-b-slate-400`}>
            <Text style={tw`text-lg font-bold`}>{productMock.price} $</Text>
            <View style={tw`flex flex-row items-center`}>
              <StarIcon />
              <Text style={tw`text-[16px] font-medium`}>
                {productMock.rating}
              </Text>
              <Text style={tw`text-[gray]`}>
                {' '}
                ({productMock.total_reviews} reviews){' '}
              </Text>
            </View>
          </View>

          <View style={tw`mt-4`}>
            <Text style={tw`text-xl font-bold`}>Description</Text>
            <Text style={tw`mt-3`}>{productDetail.description}</Text>
          </View>

          {/* Other product information */}
          <TouchableOpacity style={tw`mt-4 flex flex-row items-center justify-between`} onPress={()=>{navigation.navigate("ProductComments", {id, is : false})}}>
            <Text style={tw`text-xl font-bold`}>Reviews</Text>
            <TouchableOpacity style={tw`text-[gray] font-bold`}
              onPress={()=>{navigation.navigate("ProductComments", {id, is : false})}} >
              See All
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={tw`p-5 bg-[#e3e4e5] flex flex-row rounded-lg pb-20 mb-20`}>
            <View>
              <Text>{productMock.rating}/5</Text>
              <Text>{productMock.total_reviews} reviews</Text>
              <View style={tw`flex flex-row`}>
                {[1, 2, 3, 4, 5].map(() => {
                  return <StarIcon />;
                })}
              </View>
            </View>
          </View>

          {/* Top Reviews */}
          
        </View>
      </ScrollView>

      {/* Footer with Add to Cart and Buy Now */}
      {footerVisible && (
        <Animated.View
          style={[
            tw`flex-row justify-between p-4 bg-white border-t border-t-slate-400`,
            { position: 'absolute', bottom: 0, width: '100%' },
          ]}>
          <TouchableOpacity
            style={tw`bg-[#0284C7] p-3 rounded-md w-[48%]`}
            onPress={() => {
              setModalVisible(true); // Show the modal when clicking "Add to Cart"
            }}>
            <Text style={tw`text-white text-center font-bold`}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-[#0284C7] p-3 rounded-md w-[48%]`}
            onPress={() => {
              console.log('Bought Now');
            }}>
            <Text style={tw`text-white text-center font-bold`}>Buy Now</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-60`}>
        <View
          style={[
            tw`bg-white p-6 rounded-lg w-[90%] max-w-[350px]`,
            { shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, elevation: 10 },
          ]}
        >
          <Text style={tw`text-md font-semibold text-[#0284C7] text-center mb-4`}>
            Select Options
          </Text>

          {/* Loop through types dynamically */}
          {typeof productDetail?.types === "object" && Object.entries(productDetail?.types).map(([key, values]) => (
            <View key={key} style={tw`mb-4`}>
              <Text style={tw`text-sm font-medium text-[#333333] mb-2`}>
                Select {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text>

              <View style={tw`flex-row justify-around`}>
                {values.map((value, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      tw`px-3 py-1.5 border border-[#0284C7] rounded-sm`,
                      selectedOptions[key] === value && tw`bg-[#0284C7]`,
                    ]}
                    onPress={() => handleSelection(key, value)}
                  >
                    <Text style={tw`text-xs text-[#0284C7] ${selectedOptions[key] === value && 'text-white'}`}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Số lượng */}
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-sm font-medium text-[#333333]`}>Quantity:</Text>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity onPress={decreaseQuantity} style={tw`px-3 py-2 border border-[#0284C7] rounded-full`}>
                <Text style={tw`text-lg text-[#0284C7]`}>-</Text>
              </TouchableOpacity>

              <Text style={tw`mx-3 text-sm`}>{quantity}</Text>

              <TouchableOpacity onPress={increaseQuantity} style={tw`px-3 py-2 border border-[#0284C7] rounded-full`}>
                <Text style={tw`text-lg text-[#0284C7]`}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={() => handleAddToCart(quantity)}  // Pass quantity as a parameter
            style={tw`mt-4 bg-[#0284C7] py-2 rounded-md shadow-lg`}
          >
            <Text style={tw`text-white text-center text-xs font-bold`}>
              Add to Cart
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={tw`mt-3 text-center`}
          >
            <Text style={tw`text-[#FF6347] text-xs`}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>



    </KeyboardAvoidingView>
  );
}
