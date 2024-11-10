import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BicycleHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Bicycle Shop</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddBicycleForm')} // Điều hướng đến form thêm sản phẩm
      >
        <Text style={styles.buttonText}>Add New Bicycle</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BicycleList')}
      >
        <Text style={styles.buttonText}>View Bicycle List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f5a623',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BicycleHome;
