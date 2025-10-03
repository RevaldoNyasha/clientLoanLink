import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from '../../screens/Products/CartScreen';
import CheckoutScreen from '../../screens/Products/CheckoutScreen';
import ProductCatalogScreen from '../../screens/Products/ProductCatalogScreen';

const Stack = createNativeStackNavigator();

const ProductsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProductCatalogScreen" 
        component={ProductCatalogScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen 
        name="CartScreen" 
        component={CartScreen}
        options={{ title: 'Shopping Cart' }}
      />
      <Stack.Screen 
        name="CheckoutScreen" 
        component={CheckoutScreen}
        options={{ title: 'Checkout' }}
      />
    </Stack.Navigator>
  );
};

export default ProductsStack;
