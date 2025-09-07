import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function DashboardPage() {
  return (
    <ScrollView style={styles.container}>
      {/* KYC Incomplete Banner */}
      <View style={styles.kycBanner}>
        <Text style={styles.kycIcon}>⚠️</Text>
        <Text style={styles.kycText}>
          <Text style={styles.kycBold}>KYC Incomplete</Text>{"\n"}
          Your profile is not fully verified. Please go to the <Text style={styles.kycLink}>Profile page</Text> to complete your KYC.
        </Text>
      </View>

      {/* Application Status Cards */}
      <View style={styles.cardsRow}>
        <View style={[styles.card, styles.cardApproved]}>
          <Text style={styles.cardTitle}>Approved</Text>
          <Text style={styles.cardCount}>3</Text>
          <Text style={styles.cardDesc}>Total approved applications</Text>
        </View>
        <View style={[styles.card, styles.cardReview]}>
          <Text style={styles.cardTitle}>In Review</Text>
          <Text style={styles.cardCount}>1</Text>
          <Text style={styles.cardDesc}>Applications currently under review</Text>
        </View>
        <View style={[styles.card, styles.cardRejected]}>
          <Text style={styles.cardTitle}>Rejected</Text>
          <Text style={styles.cardCount}>2</Text>
          <Text style={styles.cardDesc}>Applications that were rejected</Text>
        </View>
      </View>

      {/* Recommended Companies */}
      <View style={styles.recommendedContainer}>
        <Text style={styles.recommendedTitle}>Recommended Companies</Text>
        <Text style={styles.recommendedSubtitle}>
          Start a new application with one of our trusted partners.
        </Text>
        <View style={styles.companyRow}>
          <View style={styles.companyInfo}>
            <View style={styles.companyLogo} />
            <View>
              <Text style={styles.companyName}>GoldenClem Credit</Text>
              <Text style={styles.companyDesc}>Your flexible financial partner.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View Products</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.companyRow}>
          <View style={styles.companyInfo}>
            <View style={styles.companyLogo} />
            <View>
              <Text style={styles.companyName}>TV-Sales</Text>
              <Text style={styles.companyDesc}>Home appliances and electronics.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View Products</Text>
          </TouchableOpacity>
        </View>
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
  kycBanner: {
    backgroundColor: "#fffbe6",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fce588",
  },
  kycIcon: {
    fontSize: 24,
    marginRight: 10,
    marginTop: 2,
  },
  kycText: {
    flex: 1,
    color: "#7c6f3b",
    fontSize: 15,
  },
  kycBold: {
    fontWeight: "bold",
    color: "#b59f3b",
  },
  kycLink: {
    color: "#2563eb",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#ececec",
  },
  cardApproved: {},
  cardReview: {},
  cardRejected: {},
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  cardCount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: "#6b7280",
  },
  recommendedContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  recommendedTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 2,
  },
  recommendedSubtitle: {
    color: "#6b7280",
    marginBottom: 18,
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ececec",
    marginRight: 12,
  },
  companyName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  companyDesc: {
    color: "#6b7280",
    fontSize: 13,
  },
  viewBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  viewBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});