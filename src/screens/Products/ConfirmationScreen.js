import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import Card from '../../components/Card';

const ConfirmationScreen = ({ route, navigation }) => {
  const { creditApplicationData, bankDetails } = route.params || {};

  const handleFinalSubmit = () => {
    // In a real app, submit both credit application and bank details to API
    // For demo, just show success alert
    alert('Credit application and bank details submitted successfully!');
    navigation.goBack(); // Or navigate to a success screen
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Ionicons name="checkmark-circle" size={64} color="#28A745" />
        <Text style={styles.title}>Application Summary</Text>
        <Text style={styles.subtitle}>
          Review your credit application and bank details before final submission.
        </Text>
      </View>

      {creditApplicationData && (
        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Credit Application Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Desired Amount:</Text>
            <Text style={styles.detailValue}>${creditApplicationData.desiredAmount || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Down Payment:</Text>
            <Text style={styles.detailValue}>${creditApplicationData.downPayment || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Annual Income:</Text>
            <Text style={styles.detailValue}>${creditApplicationData.annualIncome || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Credit History:</Text>
            <Text style={styles.detailValue}>{creditApplicationData.creditHistory || 'N/A'}</Text>
          </View>
        </Card>
      )}

      {bankDetails && (
        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Bank Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Name:</Text>
            <Text style={styles.detailValue}>{bankDetails.bankName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Number:</Text>
            <Text style={styles.detailValue}>{bankDetails.accountNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Type:</Text>
            <Text style={styles.detailValue}>{bankDetails.accountType}</Text>
          </View>
          {bankDetails.branchName && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Branch Name:</Text>
              <Text style={styles.detailValue}>{bankDetails.branchName}</Text>
            </View>
          )}
          {bankDetails.routingCode && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Routing/Sort Code:</Text>
              <Text style={styles.detailValue}>{bankDetails.routingCode}</Text>
            </View>
          )}
        </Card>
      )}

      <View style={styles.actionContainer}>
        <Button
          title="Submit Application"
          onPress={handleFinalSubmit}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  summaryCard: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionContainer: {
    padding: 16,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default ConfirmationScreen;
