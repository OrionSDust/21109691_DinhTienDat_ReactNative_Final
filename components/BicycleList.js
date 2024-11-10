import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import axios from 'axios';

const DonutList = ({ navigation }) => {
  const [donuts, setDonuts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(''); // Thêm state cho tìm kiếm

  const fetchDonuts = async (category) => {
    try {
      setLoading(true); 
      let apiUrl = 'https://671d478a09103098807cb8dd.mockapi.io/bicycle';
      if (category) {
        apiUrl += `?category=${category}`; 
      }

      const response = await axios.get(apiUrl);
      setDonuts(response.data);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching donuts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonuts(selectedCategory);
  }, [selectedCategory]);

  // Hàm để lọc danh sách theo tên
  const filteredDonuts = donuts.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BicycleDetail', { bicycle: item })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: `${item.image}.jpg` }} style={styles.image} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text>Loading Bicycles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontWeight: 'bold', color: 'gray' }}>The world’s Best Bike</Text>
      </View>

      {/* Tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === '' && styles.selectedButton]}
          onPress={() => setSelectedCategory('')}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'RoadBike' && styles.selectedButton]}
          onPress={() => setSelectedCategory('RoadBike')}>
          <Text style={styles.filterText}>RoadBike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Mountain' && styles.selectedButton]} // Sửa lại từ 'Moutain' thành 'Mountain'
          onPress={() => setSelectedCategory('Mountain')}>
          <Text style={styles.filterText}>Mountain</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredDonuts} // Sử dụng danh sách lọc
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#f5a623',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F7BA8326',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
});

export default DonutList;
