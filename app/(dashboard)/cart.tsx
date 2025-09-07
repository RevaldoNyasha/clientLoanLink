import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.qty}>Qty: {item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f9", padding: 16 },
  title: { fontWeight: "bold", fontSize: 22, marginBottom: 18 },
  empty: { color: "#6b7280", fontSize: 16, textAlign: "center", marginTop: 40 },
  item: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 10, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: "#ececec" },
  image: { width: 48, height: 48, borderRadius: 8, backgroundColor: "#ececec", marginRight: 12 },
  info: { flex: 1 },
  name: { fontWeight: "bold", fontSize: 16 },
  price: { color: "#6b7280", fontSize: 15 },
  qty: { color: "#2563eb", fontSize: 14 },
  remove: { color: "#dc2626", fontWeight: "bold", fontSize: 15, marginLeft: 12 },
});