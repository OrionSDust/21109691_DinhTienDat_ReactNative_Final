import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store'; // Import Redux store của bạn
import BicycleList from './components/BicycleList';
import BicycleDetail from './components/BicycleDetail';
import BicycleHome from './components/BicycleHome';
import AddBicycleForm from './components/AddBicycleForm'; // Import form thêm sản phẩm

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BicycleHome">
          <Stack.Screen
            name="BicycleHome"
            component={BicycleHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BicycleList"
            component={BicycleList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BicycleDetail"
            component={BicycleDetail}
            options={{ headerShown: false }}
          />
          {/* Thêm màn hình AddBicycleForm */}
          <Stack.Screen
            name="AddBicycleForm"
            component={AddBicycleForm}
            options={{ headerShown: true, title: 'Add New Bicycle' }} // Hiển thị tiêu đề
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
