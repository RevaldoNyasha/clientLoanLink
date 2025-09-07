import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

// Simulate user data from registration
const mockUser = {
  fullName: "Shania Nyaude",
  dob: "01/01/1990",
  idNumber: "123456789",
  phone: "+1 (555) 123-4567",
  email: "shanianyaude@gmail.com",
  address: "123 Main St, Anytown, USA",
  employmentType: "Public Sector", // or "Civil Servant"
  employer: "Acme Inc.",
  jobTitle: "Software Engineer",
  years: "5",
  monthlyIncome: "5000",
  ecNumber: "EC12345", // Only for Public Sector/Civil Servant
};

export default function ProfilePage() {
  const [user] = useState(mockUser);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Profile & KYC</Text>
        <Text style={styles.subheading}>
          Verify your identity to access all features. This information will be used to pre-fill your applications.
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal & Contact Details</Text>
          <View style={styles.row}>
            <TextInput style={styles.input} value={user.fullName} placeholder="Full Name" />
            <TextInput style={styles.input} value={user.dob} placeholder="Date of Birth" />
          </View>
          <View style={styles.row}>
            <TextInput style={styles.input} value={user.idNumber} placeholder="National ID / Passport Number" />
            <TextInput style={styles.input} value={user.phone} placeholder="Phone Number" />
          </View>
          <TextInput style={styles.input} value={user.email} placeholder="Email" />
          <TextInput style={styles.input} value={user.address} placeholder="Physical Address" multiline />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employment & Financials</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.employmentBtn, user.employmentType === "Private Sector" && styles.selectedBtn]}>
              <Text>Private Sector</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.employmentBtn, (user.employmentType === "Public Sector" || user.employmentType === "Civil Servant") && styles.selectedBtn]}>
              <Text>Public Sector</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TextInput style={styles.input} value={user.employer} placeholder="Employer Name" />
            <TextInput style={styles.input} value={user.jobTitle} placeholder="Job Title" />
          </View>
          <View style={styles.row}>
            <TextInput style={styles.input} value={user.years} placeholder="Length of Employment (years)" />
            <TextInput style={styles.input} value={user.monthlyIncome} placeholder="Monthly Income" />
          </View>
          {(user.employmentType === "Public Sector" || user.employmentType === "Civil Servant") && (
            <TextInput style={styles.input} value={user.ecNumber} placeholder="EC Number" />
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KYC Document Upload</Text>
          <TextInput style={styles.input} placeholder="National ID Photo" />
          <Text style={styles.note}>Please provide a clear selfie of you holding your ID next to your face.</Text>
          <TextInput style={styles.input} placeholder="Proof of Residence" />
          <Text style={styles.note}>e.g. Utility bill, lease agreement</Text>
          <TextInput style={styles.input} placeholder="Bank Statements (Last 3 Months)" />
          <TextInput style={styles.input} placeholder="EC Number" value={user.ecNumber} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Optional Documents</Text>
          <TextInput style={styles.input} placeholder="Proof of Insurance" />
          <TextInput style={styles.input} placeholder="Title Deeds" />
          <TextInput style={styles.input} placeholder="Vehicle Registration" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>References</Text>
          <View style={styles.row}>
            <TextInput style={styles.input} placeholder="Reference 1: Full Name" />
            <TextInput style={styles.input} placeholder="Reference 1: Contact" />
          </View>
          <View style={styles.row}>
            <TextInput style={styles.input} placeholder="Reference 2: Full Name" />
            <TextInput style={styles.input} placeholder="Reference 2: Contact" />
          </View>
        </View>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f6f8f9", padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 24, width: "100%", maxWidth: 700, borderWidth: 1, borderColor: "#ececec" },
  heading: { fontWeight: "bold", fontSize: 28, marginBottom: 8 },
  subheading: { color: "#6b7280", marginBottom: 18 },
  section: { marginBottom: 24 },
  sectionTitle: { fontWeight: "bold", fontSize: 20, marginBottom: 10 },
  row: { flexDirection: "row", gap: 12, marginBottom: 12 },
  input: { flex: 1, backgroundColor: "#f3f4f6", borderRadius: 6, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ececec", fontSize: 16 },
  employmentBtn: { flex: 1, backgroundColor: "#f3f4f6", borderRadius: 6, padding: 12, alignItems: "center", borderWidth: 1, borderColor: "#ececec" },
  selectedBtn: { backgroundColor: "#dbeafe", borderColor: "#2563eb" },
  note: { color: "#6b7280", fontSize: 13, marginBottom: 8 },
  saveBtn: { backgroundColor: "#2563eb", borderRadius: 6, paddingVertical: 14, alignItems: "center", marginTop: 12 },
  saveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});