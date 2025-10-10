import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BankDetailsScreen from '../../screens/Products/BankDetailsScreen';
import CartScreen from '../../screens/Products/CartScreen';
import CheckoutScreen from '../../screens/Products/CheckoutScreen';
import ConfirmationScreen from '../../screens/Products/ConfirmationScreen';
import StoreCatalogScreen from '../../screens/Store/StoreCatalogScreen';

const Stack = createNativeStackNavigator();

const ProductsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoreCatalogScreen"
        component={StoreCatalogScreen}
        options={{ title: 'Store' }}
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
      <Stack.Screen
        name="BankDetailsScreen"
        component={BankDetailsScreen}
        options={{ title: 'Bank Details' }}
      />
      <Stack.Screen
        name="ConfirmationScreen"
        component={ConfirmationScreen}
        options={{ title: 'Confirmation' }}
      />
    </Stack.Navigator>
  );
};

export default ProductsStack;
