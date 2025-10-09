import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';

const BankDetailsScreen = ({ route, navigation }) => {
  const { creditApplicationData } = route.params || {};

  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountType: '',
    branchName: '',
    routingCode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const rules = {
      bankName: (value) => !value ? 'Bank name is required' : null,
      accountNumber: (value) => !value ? 'Account number is required' : null,
      accountType: (value) => !value ? 'Account type is required' : null,
    };

    const validationErrors = {};
    Object.keys(rules).forEach(field => {
      const error = rules[field](formData[field]);
      if (error) validationErrors[field] = error;
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Store bank details locally for demo
      const bankDetails = formData;
      // In a real app, this would be sent to API

      // Navigate to confirmation screen with both credit application and bank details
      navigation.navigate('ConfirmationScreen', {
        creditApplicationData,
        bankDetails,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to save bank details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Bank Details</Text>
          <Text style={styles.subtitle}>
            Provide your banking information to finalize your credit application. All details are securely stored.
          </Text>
        </View>

        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Banking Information</Text>

          <InputField
            label="Bank Name"
            value={formData.bankName}
            onChangeText={(value) => handleInputChange('bankName', value)}
            placeholder="e.g. ABC Bank"
            error={errors.bankName}
          />

          <InputField
            label="Account Number"
            value={formData.accountNumber}
            onChangeText={(value) => handleInputChange('accountNumber', value)}
            placeholder="e.g. 1234567890"
            keyboardType="numeric"
            error={errors.accountNumber}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Account Type</Text>
            <View style={[styles.pickerWrapper, errors.accountType && styles.errorPicker]}>
              <Picker
                selectedValue={formData.accountType}
                onValueChange={(value) => handleInputChange('accountType', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Account Type" value="" />
                <Picker.Item label="Savings" value="Savings" />
                <Picker.Item label="Current" value="Current" />
              </Picker>
            </View>
            {errors.accountType && <Text style={styles.errorText}>{errors.accountType}</Text>}
          </View>

          <InputField
            label="Branch Name (Optional)"
            value={formData.branchName}
            onChangeText={(value) => handleInputChange('branchName', value)}
            placeholder="e.g. Main Branch"
          />

          <InputField
            label="Routing/Sort Code (Optional)"
            value={formData.routingCode}
            onChangeText={(value) => handleInputChange('routingCode', value)}
            placeholder="e.g. 001122"
            keyboardType="numeric"
          />
        </Card>

        <View style={styles.actionContainer}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formCard: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    minHeight: 48,
  },
  picker: {
    height: 48,
  },
  errorPicker: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
  },
  actionContainer: {
    padding: 16,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default BankDetailsScreen;
