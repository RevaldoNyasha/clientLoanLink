import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const companyData = {
  goldenclem: {
    name: "GoldenClem Credit",
    desc: "Browse products available from GoldenClem Credit.",
    categories: [
      {
        name: "Home Appliances",
        products: [
          { name: "Smart Refrigerator", price: "$1200.00", image: "" },
          { name: "Microwave Oven", price: "$250.00", image: "" },
        ],
      },
      {
        name: "Computing",
        products: [
          { name: "Laptop", price: "$800.00", image: "" },
        ],
      },
    ],
  },
  tvsales: {
    name: "TV-Sales",
    desc: "Home appliances and electronics.",
    categories: [
      {
        name: "Kitchen",
        products: [
          { name: "Smart Refrigerator", price: "$1200.00", image: "" },
          { name: "Microwave Oven", price: "$250.00", image: "" },
        ],
      },
      {
        name: "Laundry",
        products: [
          { name: "Washing Machine", price: "$600.00", image: "" },
        ],
      },
    ],
  },
  // Add other companies as needed
};

export default function CompanyDetailsPage() {
  const { id } = useLocalSearchParams();
  const [expanded, setExpanded] = useState<string | null>(null);
  const router = useRouter();

  const company = companyData[id as keyof typeof companyData];

  if (!company) {
    return (
      <View style={styles.container}>
        <Text>Company not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{company.name}</Text>
        <Text style={styles.subtitle}>{company.desc}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push("../loan-application")}
          >
            <Text style={styles.actionBtnText}>Apply for Loan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.primaryBtn]}
            onPress={() => router.push("../credit-application")}
          >
            <Text style={[styles.actionBtnText, styles.primaryBtnText]}>Credit Application</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.search} placeholder="Search products..." />
      </View>
      {company.categories.map((cat) => (
        <View key={cat.name} style={styles.category}>
          <TouchableOpacity
            style={styles.categoryHeader}
            onPress={() => setExpanded(expanded === cat.name ? null : cat.name)}
          >
            <Text style={styles.categoryTitle}>{cat.name}</Text>
            <Text style={styles.arrow}>{expanded === cat.name ? "▲" : "▼"}</Text>
          </TouchableOpacity>
          {expanded === cat.name && (
            <View style={styles.productsGrid}>
              {cat.products.map((prod) => (
                <View key={prod.name} style={styles.productCard}>
                  <View style={styles.productImage}>
                    <Text style={styles.imageText}>300 × 200</Text>
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{prod.name}</Text>
                    <Text style={styles.productPrice}>{prod.price}</Text>
                    <TouchableOpacity style={styles.cartBtn}>
                      <Text style={styles.cartBtnText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f9", padding: 16 },
  header: { backgroundColor: "#fff", borderRadius: 10, padding: 18, marginBottom: 18, borderWidth: 1, borderColor: "#ececec" },
  title: { fontWeight: "bold", fontSize: 22 },
  subtitle: { color: "#6b7280", marginBottom: 12 },
  headerActions: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 12, gap: 10 },
  actionBtn: { backgroundColor: "#f3f4f6", borderRadius: 6, paddingVertical: 8, paddingHorizontal: 14 },
  actionBtnText: { color: "#222", fontWeight: "bold", fontSize: 15 },
  primaryBtn: { backgroundColor: "#2563eb" },
  primaryBtnText: { color: "#fff" },
  search: { backgroundColor: "#fff", borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: "#ececec", fontSize: 16 },
  category: { marginBottom: 18 },
  categoryHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderRadius: 8, padding: 14, borderWidth: 1, borderColor: "#ececec" },
  categoryTitle: { fontWeight: "bold", fontSize: 18 },
  arrow: { fontSize: 18, color: "#6b7280" },
  productsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 12 },
  productCard: { backgroundColor: "#fff", borderRadius: 10, width: "47%", marginBottom: 16, borderWidth: 1, borderColor: "#ececec" },
  productImage: { height: 120, backgroundColor: "#ececec", borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: "center", justifyContent: "center" },
  imageText: { color: "#bbb", fontSize: 22 },
  productInfo: { padding: 12 },
  productName: { fontWeight: "bold", fontSize: 15 },
  productPrice: { color: "#6b7280", marginBottom: 8 },
  cartBtn: { backgroundColor: "#2563eb", borderRadius: 6, paddingVertical: 10, alignItems: "center" },
  cartBtnText: { color: "#fff", fontWeight: "bold", fontSize: 15 }
});