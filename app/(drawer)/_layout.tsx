import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="menu/dashboard" options={{ drawerLabel: 'Dashboard' }} />
      <Drawer.Screen name="menu/applications" options={{ drawerLabel: 'Applications' }} />
      <Drawer.Screen name="menu/companies" options={{ drawerLabel: 'Companies' }} />
      <Drawer.Screen name="menu/profile" options={{ drawerLabel: 'Profile' }} />
    </Drawer>
  );
}
