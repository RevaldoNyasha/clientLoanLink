import { Ionicons } from '@expo/vector-icons';
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
import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import { useAuth } from '../../context/AuthContext';
import { loanService } from '../../services/loanService';
import { validators } from '../../utils/validators';

const LoanApplicationScreen = ({ route, navigation }) => {
  const { company } = route.params;
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    loanAmount: '',
    purpose: '',
    repaymentTerm: '',
    collateral: '',
    monthlyExpenses: user?.monthlyExpenses || '',
    monthlyIncome: user?.monthlyIncome || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [eligibility, setEligibility] = useState(null);

  const loanPurposes = [
    'Business Expansion',
    'Personal Emergency',
    'Medical Emergency',
    'Education',
    'Home Improvement',
    'Vehicle Purchase',
    'Debt Consolidation',
    'Other',
  ];

  const repaymentTerms = [
    { label: '6 months', value: 6 },
    { label: '12 months', value: 12 },
    { label: '18 months', value: 18 },
    { label: '24 months', value: 24 },
    { label: '36 months', value: 36 },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const checkEligibility = async () => {
    if (!formData.loanAmount || !formData.repaymentTerm) {
      Alert.alert('Missing Information', 'Please enter loan amount and repayment term to check eligibility');
      return;
    }

    try {
      const result = await loanService.checkEligibility(
        { ...user, ...formData },
        parseFloat(formData.loanAmount),
        parseInt(formData.repaymentTerm)
      );
      
      if (result.success) {
        setEligibility(result);
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
    }
  };

  const validateForm = () => {
    const rules = {
      loanAmount: [
        (value) => validators.amount(value, company.minLoanAmount, company.maxLoanAmount)
      ],
      purpose: [validators.required],
      repaymentTerm: [validators.required],
      monthlyExpenses: [validators.required],
      monthlyIncome: [validators.required],
    };
    
    const { isValid, errors: validationErrors } = validators.validateForm(formData, rules);
    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!eligibility || !eligibility.eligible) {
      Alert.alert(
        'Not Eligible',
        'You are not eligible for this loan amount. Please adjust your loan amount or repayment term.',
        [
          {
            text: 'Check Eligibility',
            onPress: checkEligibility,
          },
        ]
      );
      return;
    }

    setLoading(true);
    try {
      const applicationData = {
        companyId: company.id,
        companyName: company.name,
        userId: user.id,
        ...formData,
        loanAmount: parseFloat(formData.loanAmount),
        repaymentTerm: parseInt(formData.repaymentTerm),
        monthlyPayment: eligibility.requestedEMI,
        interestRate: company.interestRate,
      };

      const result = await loanService.submitApplication(applicationData);
      if (result.success) {
        Alert.alert(
          'Application Submitted',
          'Your loan application has been submitted successfully. You will receive a notification once it\'s reviewed.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to submit application');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting the application');
    } finally {
      setLoading(false);
    }
  };

  const calculateEMI = () => {
    if (formData.loanAmount && formData.repaymentTerm) {
      const principal = parseFloat(formData.loanAmount);
      const months = parseInt(formData.repaymentTerm);
      const annualRate = parseFloat(company.interestRate.replace('%', ''));
      return loanService.calculateEMI(principal, annualRate, months);
    }
    return 0;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Loan Application</Text>
          <Text style={styles.subtitle}>{company.name}</Text>
        </View>

        <Card style={styles.companyInfoCard}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.companyRate}>Interest Rate: {company.interestRate}</Text>
            <Text style={styles.companyAmount}>
              Amount Range: ${company.minLoanAmount.toLocaleString()} - ${company.maxLoanAmount.toLocaleString()}
            </Text>
          </View>
        </Card>

        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Loan Details</Text>
          
          <InputField
            label="Loan Amount"
            value={formData.loanAmount}
            onChangeText={(value) => handleInputChange('loanAmount', value)}
            placeholder="Enter loan amount"
            keyboardType="numeric"
            error={errors.loanAmount}
          />

          <InputField
            label="Purpose"
            value={formData.purpose}
            onChangeText={(value) => handleInputChange('purpose', value)}
            placeholder="Select loan purpose"
            error={errors.purpose}
          />

          <InputField
            label="Repayment Term"
            value={formData.repaymentTerm}
            onChangeText={(value) => handleInputChange('repaymentTerm', value)}
            placeholder="Select repayment term"
            error={errors.repaymentTerm}
          />

          <InputField
            label="Collateral (if any)"
            value={formData.collateral}
            onChangeText={(value) => handleInputChange('collateral', value)}
            placeholder="Describe any collateral"
            multiline
            numberOfLines={3}
          />
        </Card>

        <Card style={styles.financialCard}>
          <Text style={styles.sectionTitle}>Financial Information</Text>
          
          <InputField
            label="Monthly Income"
            value={formData.monthlyIncome}
            onChangeText={(value) => handleInputChange('monthlyIncome', value)}
            placeholder="Enter monthly income"
            keyboardType="numeric"
            error={errors.monthlyIncome}
          />

          <InputField
            label="Monthly Expenses"
            value={formData.monthlyExpenses}
            onChangeText={(value) => handleInputChange('monthlyExpenses', value)}
            placeholder="Enter monthly expenses"
            keyboardType="numeric"
            error={errors.monthlyExpenses}
          />
        </Card>

        {formData.loanAmount && formData.repaymentTerm && (
          <Card style={styles.calculationCard}>
            <Text style={styles.sectionTitle}>Loan Calculation</Text>
            <View style={styles.calculationItem}>
              <Text style={styles.calculationLabel}>Monthly Payment (EMI):</Text>
              <Text style={styles.calculationValue}>
                ${calculateEMI().toLocaleString()}
              </Text>
            </View>
            <View style={styles.calculationItem}>
              <Text style={styles.calculationLabel}>Total Amount:</Text>
              <Text style={styles.calculationValue}>
                ${(calculateEMI() * parseInt(formData.repaymentTerm || 0)).toLocaleString()}
              </Text>
            </View>
            <View style={styles.calculationItem}>
              <Text style={styles.calculationLabel}>Total Interest:</Text>
              <Text style={styles.calculationValue}>
                ${((calculateEMI() * parseInt(formData.repaymentTerm || 0)) - parseFloat(formData.loanAmount || 0)).toLocaleString()}
              </Text>
            </View>
          </Card>
        )}

        {eligibility && (
          <Card style={[
            styles.eligibilityCard,
            { backgroundColor: eligibility.eligible ? '#d4edda' : '#f8d7da' }
          ]}>
            <View style={styles.eligibilityHeader}>
              <Ionicons 
                name={eligibility.eligible ? 'checkmark-circle' : 'warning'} 
                size={24} 
                color={eligibility.eligible ? '#28A745' : '#DC3545'} 
              />
              <Text style={[
                styles.eligibilityTitle,
                { color: eligibility.eligible ? '#28A745' : '#DC3545' }
              ]}>
                {eligibility.eligible ? 'Eligible' : 'Not Eligible'}
              </Text>
            </View>
            <Text style={styles.eligibilityText}>
              {eligibility.eligible 
                ? 'You are eligible for this loan amount.'
                : `Maximum loan amount: $${eligibility.maxLoanAmount.toLocaleString()}`
              }
            </Text>
          </Card>
        )}

        <View style={styles.actionContainer}>
          <Button
            title="Check Eligibility"
            onPress={checkEligibility}
            variant="outline"
            style={styles.eligibilityButton}
          />
          <Button
            title="Submit Application"
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
  companyInfoCard: {
    margin: 16,
    marginBottom: 0,
  },
  companyInfo: {
    alignItems: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  companyRate: {
    fontSize: 16,
    color: '#28A745',
    fontWeight: '600',
    marginBottom: 4,
  },
  companyAmount: {
    fontSize: 14,
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
  financialCard: {
    margin: 16,
    marginBottom: 0,
  },
  calculationCard: {
    margin: 16,
    marginBottom: 0,
  },
  calculationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  calculationLabel: {
    fontSize: 16,
    color: '#666',
  },
  calculationValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eligibilityCard: {
    margin: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 8,
  },
  eligibilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eligibilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  eligibilityText: {
    fontSize: 14,
    color: '#666',
  },
  actionContainer: {
    padding: 16,
  },
  eligibilityButton: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default LoanApplicationScreen;
