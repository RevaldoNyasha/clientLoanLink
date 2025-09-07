import React, { useState } from "react";
import { Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const [employmentType, setEmploymentType] = useState<"private" | "public" | null>(null);

  return (
    <View style={styles.container}>
      {/* Logo/Icon */}
      <Text style={styles.logo}>🤝</Text>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>
        Enter your information to create a new client account.
      </Text>
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Shania Nyaude" />

        <Text style={styles.label}>National ID Number</Text>
        <TextInput style={styles.input} placeholder="e.g. 29-312880A13" />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder="mm/dd/yyyy" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="shanianyaude@gmail.com" keyboardType="email-address" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />

        <Text style={styles.label}>Employment Type</Text>
        <View style={styles.employmentRow}>
          <TouchableOpacity
            style={[
              styles.employmentButton,
              employmentType === "private" && styles.selectedEmploymentButton,
            ]}
            onPress={() => setEmploymentType("private")}
          >
            <Text
              style={[
                styles.employmentText,
                employmentType === "private" && styles.selectedEmploymentText,
              ]}
            >
              Private Sector
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.employmentButton,
              employmentType === "public" && styles.selectedEmploymentButtonPublic,
            ]}
            onPress={() => setEmploymentType("public")}
          >
            <Text
              style={[
                styles.employmentText,
                employmentType === "public" && styles.selectedEmploymentTextPublic,
              ]}
            >
              Public Sector (Civil Servant)
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.login}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => Linking.openURL("/login")}>
          Sign in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8f9",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 48,
    color: "#3b82f6",
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  employmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  employmentButton: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3b82f6",
    backgroundColor: "#fff",
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 8,
  },
  selectedEmploymentButton: {
    backgroundColor: "#e0edff",
    borderColor: "#3b82f6",
  },
  selectedEmploymentButtonPublic: {
    backgroundColor: "#22d3ee",
    borderColor: "#22d3ee",
  },
  employmentText: {
    color: "#3b82f6",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedEmploymentText: {
    color: "#2563eb",
  },
  selectedEmploymentTextPublic: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#3b82f6",
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  login: {
    textAlign: "center",
    color: "#374151",
    fontSize: 16,
    marginTop: 16,
  },
  loginLink: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
});