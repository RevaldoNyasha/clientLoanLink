import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
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
import InputField from '../../components/InputField';
import { useAuth } from '../../context/AuthContext';
import { validators } from '../../utils/validators';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    employmentType: '',
    ecNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const employmentTypes = [
    { label: 'Public', value: 'Public' },
    { label: 'Private', value: 'Private' },
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
      fullName: [validators.name],
      nationalId: [validators.nationalId],
      dob: [validators.date, (value) => validators.age(value, 18)],
      email: [validators.email],
      password: [validators.password],
      confirmPassword: [(value) => validators.confirmPassword(formData.password, value)],
      employmentType: [validators.required],
      ecNumber: [(value) => validators.ecNumber(value, formData.employmentType)],
    };
    
    const { isValid, errors: validationErrors } = validators.validateForm(formData, rules);
    setErrors(validationErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        Alert.alert(
          'Registration Successful',
          'Your account has been created successfully. Please sign in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      } else {
        Alert.alert('Registration Failed', result.error || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our financial marketplace</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Full Name"
            value={formData.fullName}
            onChangeText={(value) => handleInputChange('fullName', value)}
            placeholder="Enter your full name"
            error={errors.fullName}
          />

          <InputField
            label="National ID"
            value={formData.nationalId}
            onChangeText={(value) => handleInputChange('nationalId', value)}
            placeholder="Enter your national ID"
            keyboardType="numeric"
            error={errors.nationalId}
          />

          <InputField
            label="Date of Birth"
            value={formData.dob}
            onChangeText={(value) => handleInputChange('dob', value)}
            placeholder="YYYY-MM-DD"
            error={errors.dob}
          />

          <InputField
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            error={errors.email}
          />

          <InputField
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Employment Type</Text>
            <View style={[styles.pickerWrapper, errors.employmentType && styles.errorBorder]}>
              <Picker
                selectedValue={formData.employmentType}
                onValueChange={(value) => handleInputChange('employmentType', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select employment type" value="" />
                {employmentTypes.map((type) => (
                  <Picker.Item key={type.value} label={type.label} value={type.value} />
                ))}
              </Picker>
            </View>
            {errors.employmentType && (
              <Text style={styles.errorText}>{errors.employmentType}</Text>
            )}
          </View>

          {formData.employmentType === 'Public' && (
            <InputField
              label="EC Number"
              value={formData.ecNumber}
              onChangeText={(value) => handleInputChange('ecNumber', value)}
              placeholder="Enter your EC number"
              error={errors.ecNumber}
            />
          )}

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="outline"
              size="small"
            />
          </View>
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
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  errorBorder: {
    borderColor: '#dc3545',
  },
  errorText: {
    fontSize: 14,
    color: '#dc3545',
    marginTop: 4,
  },
});

export default RegisterScreen;
