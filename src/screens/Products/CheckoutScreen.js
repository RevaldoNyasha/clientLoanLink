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
import { useCart } from '../../context/CartContext';
import { validators } from '../../utils/validators';

const CheckoutScreen = ({ navigation }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    installmentPlan: '',
    downPayment: '',
    creditHistory: '',
    paymentMethod: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const installmentPlans = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Semi-Annual', value: 'semi-annual' },
    { label: 'Annual', value: 'annual' },
  ];

  const creditHistoryOptions = [
    { label: 'Excellent (750+)', value: 'excellent' },
    { label: 'Good (700-749)', value: 'good' },
    { label: 'Fair (650-699)', value: 'fair' },
    { label: 'Poor (Below 650)', value: 'poor' },
  ];

  const paymentMethods = [
    { label: 'Bank Transfer', value: 'bank-transfer' },
    { label: 'Credit Card', value: 'credit-card' },
    { label: 'Mobile Money', value: 'mobile-money' },
    { label: 'Cash', value: 'cash' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const rules = {
      installmentPlan: [validators.required],
      downPayment: [validators.required],
      creditHistory: [validators.required],
      paymentMethod: [validators.required],
    };
    
    const { isValid, errors: validationErrors } = validators.validateForm(formData, rules);
    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmitApplication = async () => {
    if (!validateForm()) return;

    if (!formData.termsAccepted) {
      Alert.alert('Terms Required', 'Please accept the terms and conditions to proceed.');
      return;
    }

    setLoading(true);
    try {
      // Simulate application submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Application Submitted',
        'Your loan application has been submitted successfully. You will receive a confirmation email shortly.',
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('Applications');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting your application');
    } finally {
      setLoading(false);
    }
  };

  const renderCartItem = (item, index) => (
    <View key={index} style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.cartItemPrice}>
        ${(item.price * item.quantity).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Checkout</Text>
          <Text style={styles.subtitle}>Complete your loan application</Text>
        </View>

        <Card style={styles.orderSummaryCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.map(renderCartItem)}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>${getCartTotal().toLocaleString()}</Text>
          </View>
        </Card>

        <Card style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          
          <InputField
            label="Installment Plan"
            value={formData.installmentPlan}
            onChangeText={(value) => handleInputChange('installmentPlan', value)}
            placeholder="Select installment plan"
            error={errors.installmentPlan}
          />

          <InputField
            label="Down Payment"
            value={formData.downPayment}
            onChangeText={(value) => handleInputChange('downPayment', value)}
            placeholder="Enter down payment amount"
            keyboardType="numeric"
            error={errors.downPayment}
          />

          <InputField
            label="Credit History"
            value={formData.creditHistory}
            onChangeText={(value) => handleInputChange('creditHistory', value)}
            placeholder="Select your credit history"
            error={errors.creditHistory}
          />

          <InputField
            label="Payment Method"
            value={formData.paymentMethod}
            onChangeText={(value) => handleInputChange('paymentMethod', value)}
            placeholder="Select payment method"
            error={errors.paymentMethod}
          />
        </Card>

        <Card style={styles.userInfoCard}>
          <Text style={styles.sectionTitle}>Applicant Information</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Name:</Text>
            <Text style={styles.userInfoValue}>{user?.name || 'Not provided'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoValue}>{user?.email || 'Not provided'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>National ID:</Text>
            <Text style={styles.userInfoValue}>{user?.nationalId || 'Not provided'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>KYC Status:</Text>
            <View style={styles.kycStatus}>
              <Ionicons 
                name={user?.kycComplete ? "checkmark-circle" : "warning"} 
                size={16} 
                color={user?.kycComplete ? "#28A745" : "#FF6B35"} 
              />
              <Text style={[
                styles.kycText,
                { color: user?.kycComplete ? "#28A745" : "#FF6B35" }
              ]}>
                {user?.kycComplete ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>
        </Card>

        <Card style={styles.termsCard}>
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleInputChange('termsAccepted', !formData.termsAccepted)}
            >
              <Ionicons 
                name={formData.termsAccepted ? "checkbox" : "square-outline"} 
                size={24} 
                color={formData.termsAccepted ? "#007AFF" : "#666"} 
              />
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the terms and conditions and confirm that all information provided is accurate.
            </Text>
          </View>
        </Card>

        <View style={styles.actionContainer}>
          <Button
            title="Submit Application"
            onPress={handleSubmitApplication}
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
  orderSummaryCard: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  paymentCard: {
    margin: 16,
    marginBottom: 0,
  },
  userInfoCard: {
    margin: 16,
    marginBottom: 0,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  userInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  kycStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kycText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  termsCard: {
    margin: 16,
    marginBottom: 0,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionContainer: {
    padding: 16,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default CheckoutScreen;
