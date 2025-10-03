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
import { SvgXml } from 'react-native-svg';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { useAuth } from '../../context/AuthContext';
import { validators } from '../../utils/validators';

const iconXml = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 595.3 420.9" style="enable-background:new 0 0 595.3 420.9;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#223B80;}
	.st1{fill:#F7931E;}
	.st2{fill:#FFFFFF;}
</style>
<g>
	<path class="st1" d="M387.6,81.9c-17.2-34.3-42.8-51.4-77.1-51.4h-25.7c-34.2,0-59.9,17.1-77.1,51.4L53.6,390.2h115.6l29.8-59.7
		l98.7-197.2l128.5,256.9h115.6L387.6,81.9z"/>
	<polygon class="st0" points="209.3,390.4 299.1,216.4 386,390.4 	"/>
	<g>
		<path class="st2" d="M295.5,328.5h-24.9c-0.1,0-0.1-0.1-0.1-0.1v0c0-13.8,11.2-25,25-25h0c0.1,0,0.1,0.1,0.1,0.1v24.9
			C295.7,328.5,295.6,328.5,295.5,328.5z"/>
		<path class="st2" d="M327.6,328.5h-25.1v-25.1h1.2c13.2,0,24,10.7,24,24V328.5z"/>
		<rect x="270.5" y="337.1" class="st2" width="25.1" height="25.1"/>
		<rect x="302.5" y="337.1" class="st2" width="25.1" height="25.1"/>
	</g>
</g>
</svg>`;

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'test@example.com',
    password: 'password',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const rules = {
      email: [validators.email],
      password: [validators.password],
    };
    
    const { isValid, errors: validationErrors } = validators.validateForm(formData, rules);
    setErrors(validationErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Navigation will be handled by AppNavigator based on auth state
      } else {
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <SvgXml xml={iconXml} width={120} height={80} style={styles.icon} />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
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

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <Button
              title="Sign Up"
              onPress={handleRegister}
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
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    marginBottom: 20,
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
  loginButton: {
    marginTop: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },

});

export default LoginScreen;
