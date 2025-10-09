import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const CheckoutScreen = ({ navigation }) => {
  const { cart, getCartTotal } = useCart();
  const { user } = useAuth();

  const [cartExpanded, setCartExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [desiredAmount, setDesiredAmount] = useState('0.00');
  const [downPayment, setDownPayment] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [creditHistory, setCreditHistory] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Future: integrate API POST /api/credit-applications with form payload
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert('Submitted', 'Your credit application has been submitted.');
    } catch (e) {
      Alert.alert('Error', 'Failed to submit application.');
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
      <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toLocaleString()}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Credit Application</Text>
          <Text style={styles.subtitle}>
            This application finalizes products from your cart. Personal and employment details will be pulled from your profile.
          </Text>
        </View>

        <Card style={styles.orderSummaryCard}>
          <TouchableOpacity style={styles.summaryHeaderRow} onPress={() => setCartExpanded(prev => !prev)}>
            <Text style={styles.sectionTitle}>
              Cart Summary ({cart.length} item{cart.length !== 1 ? 's' : ''})
            </Text>
            <Ionicons name={cartExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="#333" />
          </TouchableOpacity>
          {cartExpanded && (
            <View style={{ marginBottom: 8 }}>
              {cart.length === 0 ? (
                <Text style={styles.emptyCart}>Your cart is empty.</Text>
              ) : (
                cart.map(renderCartItem)
              )}
            </View>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${getCartTotal().toFixed(2)}</Text>
          </View>
        </Card>

        <Card style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Desired Credit Amount</Text>
            <TextInput
              style={styles.input}
              value={desiredAmount}
              onChangeText={setDesiredAmount}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Down Payment (Optional)</Text>
            <TextInput
              style={styles.input}
              value={downPayment}
              onChangeText={setDownPayment}
              placeholder="e.g. 100"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Annual Income</Text>
            <TextInput
              style={styles.input}
              value={annualIncome}
              onChangeText={setAnnualIncome}
              placeholder="e.g. 50000"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Previous Credit History</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={creditHistory}
              onChangeText={setCreditHistory}
              placeholder="Describe any previous loans or credit card history..."
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
            />
            <Text style={styles.helperText}>
              e.g. Personal loan from ABC Bank (2020-2022), Visa credit card since 2018.
            </Text>
          </View>
        </Card>

        <View style={styles.actionContainer}>
          <Button
            title="Add Bank Details"
            onPress={() => navigation.navigate('BankDetailsScreen', {
              creditApplicationData: {
                desiredAmount,
                downPayment,
                annualIncome,
                creditHistory,
              },
            })}
            variant="outline"
            style={styles.bankDetailsButton}
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
  orderSummaryCard: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  emptyCart: {
    fontSize: 14,
    color: '#666',
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
  formCard: {
    margin: 16,
    marginBottom: 0,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  helperText: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  actionContainer: {
    padding: 16,
  },
  bankDetailsButton: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default CheckoutScreen;

// end of file
