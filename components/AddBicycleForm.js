import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addDonut, fetchDonuts } from '../features/donutSlice';

const AddDonutForm = () => {
  const dispatch = useDispatch();

  // State để lưu trữ thông tin sản phẩm
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  // Hàm xử lý submit form
  const handleSubmit = async () => {
    if (name && price && image && category) {
      const newDonut = {
        name,
        price,
        image,
        category,
      };

      try {
        // Gửi sản phẩm mới vào API
        await dispatch(addDonut(newDonut));

        // Sau khi thêm thành công, lấy lại danh sách donuts
        dispatch(fetchDonuts());

        // Reset form sau khi thêm sản phẩm thành công
        setName('');
        setPrice('');
        setImage('');
        setCategory('');

        // Hiển thị thông báo thành công
        Alert.alert('Success', 'Bicycle added successfully!', [
          {
            text: 'OK',
            onPress: () => console.log('Product added'),
          },
        ]);
      } catch (error) {
        // Nếu có lỗi khi thêm sản phẩm
        Alert.alert('Error', 'Failed to add bicycle. Please try again.');
      }
    } else {
      // Thông báo nếu có trường thông tin trống
      Alert.alert('Warning', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Bicycle</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., RoadBike, Mountain)"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Bicycle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#f5a623',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddDonutForm;
