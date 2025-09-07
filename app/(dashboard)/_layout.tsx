import { Drawer } from 'expo-router/drawer';

export default function DashboardLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="applications" options={{ title: "My Applications" }} />
      <Drawer.Screen name="companies" options={{ title: "Companies" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
    </Drawer>
  );
}