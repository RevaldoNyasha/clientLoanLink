import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BanksScreen from '../../screens/Banks/BanksScreen';
import BankDetailScreen from '../../screens/Banks/BankDetailScreen';
import LoanApplicationScreen from '../../screens/Banks/LoanApplicationScreen';

const Stack = createNativeStackNavigator();

const BanksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BanksScreen" 
        component={BanksScreen}
        options={{ title: 'Banks' }}
      />
      <Stack.Screen 
        name="BankDetail" 
        component={BankDetailScreen}
        options={{ title: 'Bank Details' }}
      />
      <Stack.Screen 
        name="LoanApplication" 
        component={LoanApplicationScreen}
        options={{ title: 'Loan Application' }}
      />
    </Stack.Navigator>
  );
};

export default BanksStack;
