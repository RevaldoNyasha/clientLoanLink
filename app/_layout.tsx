import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from './context/CartContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <CartProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer>
          <Drawer.Screen name="dashboard" options={{ drawerLabel: 'Dashboard' }} />
          <Drawer.Screen name="applications" options={{ drawerLabel: 'Applications' }} />
          <Drawer.Screen name="companies" options={{ drawerLabel: 'Companies' }} />
          <Drawer.Screen name="profile" options={{ drawerLabel: 'Profile' }} />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </CartProvider>
  );
}
