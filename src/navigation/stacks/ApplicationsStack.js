import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyApplicationsScreen from '../../screens/Applications/MyApplicationsScreen';

const Stack = createNativeStackNavigator();

const ApplicationsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MyApplicationsScreen" 
        component={MyApplicationsScreen}
        options={{ title: 'My Applications' }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationsStack;
