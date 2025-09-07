import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const applications = [
  {
    id: "APP-001",
    company: "Innovate Finance",
    status: "Approved",
    date: "2023-06-23",
  },
  {
    id: "APP-002",
    company: "Growth Lenders",
    status: "In Review",
    date: "2023-06-24",
  },
  {
    id: "APP-003",
    company: "Venture Partners",
    status: "Rejected",
    date: "2023-06-25",
  },
];

function getStatusStyle(status: string) {
  if (status === "Approved") return [styles.status, styles.statusApproved];
  if (status === "In Review") return [styles.status, styles.statusReview];
  if (status === "Rejected") return [styles.status, styles.statusRejected];
  return styles.status;
}

export default function ApplicationsPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>My Applications</Text>
        <Text style={styles.subtitle}>An overview of all your loan applications.</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Application ID</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Company</Text>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Status</Text>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Date</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Action</Text>
        </View>
        {applications.map((app) => (
          <View style={styles.tableRow} key={app.id}>
            <Text style={[styles.cell, styles.bold, { flex: 1.2 }]}>{app.id}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{app.company}</Text>
            {/* FIX: Move flex to parent View, only apply status style to Text */}
            <View style={{ flex: 1.2, justifyContent: "center" }}>
              <Text style={getStatusStyle(app.status)}>{app.status}</Text>
            </View>
            <Text style={[styles.cell, { flex: 1.2 }]}>{app.date}</Text>
            <View style={{ flex: 1 }}>
              <TouchableOpacity>
                <Text style={styles.action}>View Details ↗</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8f9",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 2,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 18,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ececec",
    paddingBottom: 8,
    marginBottom: 4,
  },
  headerCell: {
    color: "#6b7280",
    fontWeight: "bold",
    fontSize: 15,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
    paddingVertical: 12,
  },
  cell: {
    fontSize: 15,
    color: "#222",
  },
  bold: {
    fontWeight: "bold",
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 13,
    overflow: "hidden",
    textAlign: "center",
  },
  statusApproved: {
    backgroundColor: "#d1fae5",
    color: "#059669",
  },
  statusReview: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
  },
  statusRejected: {
    backgroundColor: "#fecaca",
    color: "#dc2626",
  },
  action: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 15,
     },
});