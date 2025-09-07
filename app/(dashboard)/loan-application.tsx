import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoanApplicationPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Loan Application</Text>
        <Text style={styles.subtitle}>
          Apply for a loan from GoldenClem Credit. Your personal and employment details will be taken from your profile.
        </Text>
        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="e.g. 5000" />
          <TextInput style={styles.input} placeholder="Select purpose" />
        </View>
        <View style={styles.row}>
          <TextInput style={styles.input} placeholder="Select term" />
          <TextInput style={styles.input} placeholder="e.g. Property, Vehicle" />
        </View>
        <TextInput style={styles.input} placeholder="e.g. 1500" />
        <TextInput style={styles.input} placeholder="Describe any outstanding loans or credit card debt..." multiline />
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
  row: { flexDirection: "row", gap: 12, marginBottom: 12 },
  input: { flex: 1, backgroundColor: "#f3f4f6", borderRadius: 6, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ececec", fontSize: 16 },
  button: { backgroundColor: "#2563eb", borderRadius: 6, paddingVertical: 14, alignItems: "center", marginTop: 12 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});