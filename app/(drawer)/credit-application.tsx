import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";

export default function CreditApplicationPage() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.quantity, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Credit Application</Text>
        <Text style={styles.subtitle}>
          Finalize your application for products from GoldenClem Credit. Your personal and employment details will be taken from your profile.
        </Text>
        <Text style={styles.sectionTitle}>Cart Summary ({cart.length} items)</Text>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text>{item.quantity} × {item.price}</Text>
            <Text style={styles.cartItemTotal}>${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Select an Installment Plan:</Text>
        <TouchableOpacity style={styles.installmentBtn}>
          <Text style={styles.installmentText}>6 Months</Text>
          <Text style={styles.installmentTextBold}>$45.00/month</Text>
        </TouchableOpacity>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="750.00" />
          <TextInput style={styles.input} placeholder="e.g. 100" />
        </View>
        <TextInput style={styles.input} placeholder="e.g. 50000" />
        <TextInput style={styles.input} placeholder="Describe any previous loans or credit card history..." multiline />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit Application</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f6f8f9", padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 24, width: "100%", maxWidth: 600, borderWidth: 1, borderColor: "#ececec" },
  title: { fontWeight: "bold", fontSize: 24, marginBottom: 8 },
  subtitle: { color: "#6b7280", marginBottom: 18 },
  sectionTitle: { fontWeight: "bold", fontSize: 17, marginTop: 12, marginBottom: 6 },
  cartItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  cartItemName: { fontWeight: "bold" },
  cartItemTotal: { fontWeight: "bold" },
  installmentBtn: { backgroundColor: "#f3f4f6", borderRadius: 6, padding: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between" },
  installmentText: { fontSize: 16 },
  installmentTextBold: { fontWeight: "bold", fontSize: 16 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10, borderTopWidth: 1, borderColor: "#ececec", paddingTop: 10 },
  totalLabel: { fontWeight: "bold", fontSize: 16 },
  totalValue: { fontWeight: "bold", fontSize: 16 },
  row: { flexDirection: "row", gap: 12, marginBottom: 12 },
  input: { flex: 1, backgroundColor: "#f3f4f6", borderRadius: 6, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ececec", fontSize: 16 },
  button: { backgroundColor: "#2563eb", borderRadius: 6, paddingVertical: 14, alignItems: "center", marginTop: 12 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});