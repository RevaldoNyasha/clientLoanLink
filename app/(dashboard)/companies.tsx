import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";

const companies = [
  {
    id: "goldenclem",
    name: "GoldenClem Credit",
    desc: "Your flexible financial partner.",
    logo: "", // Add image path if available
  },
  {
    id: "tvsales",
    name: "TV-Sales",
    desc: "Home appliances and electronics.",
    logo: "",
  },
  {
    id: "jetstores",
    name: "Jet Stores",
    desc: "Fashion and household goods.",
    logo: "",
  },
  {
    id: "edgars",
    name: "Edgars Stores",
    desc: "Apparel, footwear, and accessories.",
    logo: "",
  },
];

export default function CompaniesPage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.search} placeholder="Search companies..." />
      <View style={styles.grid}>
        {companies.map((company) => (
          <TouchableOpacity
            key={company.id}
            style={styles.card}
            onPress={() => router.push(`./company/${company.id}`)}
          >
            <View style={styles.logo} />
            <View>
              <Text style={styles.name}>{company.name}</Text>
              <Text style={styles.desc}>{company.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8f9", padding: 16 },
  search: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ececec",
    fontSize: 16,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    marginRight: 16,
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ececec",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ececec",
    marginRight: 12,
  },
  name: { fontWeight: "bold", fontSize: 17 },
  desc: { color: "#6b7280", fontSize: 14 },
});