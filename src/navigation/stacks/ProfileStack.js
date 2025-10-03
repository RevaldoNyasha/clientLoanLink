import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import KYCUploadScreen from '../../screens/Profile/KYCUploadScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="KYCUpload" 
        component={KYCUploadScreen}
        options={{ title: 'KYC Documents' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
