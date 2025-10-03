import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CompaniesScreen from '../../screens/Companies/CompaniesScreen';
import CompanyDetailScreen from '../../screens/Companies/CompanyDetailScreen';
import LoanApplicationScreen from '../../screens/Companies/LoanApplicationScreen';

const Stack = createNativeStackNavigator();

const CompaniesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CompaniesScreen" 
        component={CompaniesScreen}
        options={{ title: 'Companies' }}
      />
      <Stack.Screen 
        name="CompanyDetail" 
        component={CompanyDetailScreen}
        options={{ title: 'Company Details' }}
      />
      <Stack.Screen 
        name="LoanApplication" 
        component={LoanApplicationScreen}
        options={{ title: 'Loan Application' }}
      />
    </Stack.Navigator>
  );
};

export default CompaniesStack;
