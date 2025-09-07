import { Link, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo/Icon */}
      <View style={styles.logoContainer}>
        {/* You can replace this with an SVG or Image */}
        <Text style={styles.logo}>🤝</Text>
      </View>
      <Text style={styles.title}>LoanLink</Text>
      <Text style={styles.subtitle}>
        Enter your email below{"\n"}to login to your account
      </Text>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="m@example.com"
          keyboardType="email-address"
        />
        <View style={styles.passwordRow}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Login button pressed");
            router.push("/dashboard");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.register}>
        Do not have an account?{" "}
        <Link href="/register" style={styles.registerLink}>
          Register now
        </Link>
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
  logoContainer: {
    marginBottom: 10,
  },
  logo: {
    fontSize: 48,
    color: "#3b82f6",
    textAlign: "center",
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
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  forgot: {
    color: "#2563eb",
    textDecorationLine: "underline",
    fontSize: 14,
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
  register: {
    textAlign: "center",
    color: "#374151",
    fontSize: 16,
    marginTop: 16,
  },
  registerLink: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
});
