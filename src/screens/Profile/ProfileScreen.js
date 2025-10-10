import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    nationalId: user?.nationalId || '',
    dob: user?.dob || '',
    employmentType: user?.employmentType || '',
    ecNumber: user?.ecNumber || '',
    phone: user?.phone || '',
    address: user?.address || '',
    monthlyIncome: user?.monthlyIncome || '',
    monthlyExpenses: user?.monthlyExpenses || '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const result = await updateUser(formData);
      if (result.success) {
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating profile');
    }
  };

  const handleKYCUpload = () => {
    navigation.navigate('KYCUpload');
  };

  const profileSections = [
    {
      title: 'Personal & Contact',
      icon: 'person-outline',
      fields: [
        { label: 'Full Name', value: formData.fullName, key: 'fullName' },
        { label: 'Email', value: formData.email, key: 'email' },
        { label: 'Phone', value: formData.phone, key: 'phone' },
        { label: 'Address', value: formData.address, key: 'address' },
      ],
    },
    {
      title: 'Employment & Financials',
      icon: 'business-outline',
      fields: [
        { label: 'Employment Type', value: formData.employmentType, key: 'employmentType' },
        { label: 'EC Number', value: formData.ecNumber, key: 'ecNumber' },
        { label: 'Monthly Income', value: formData.monthlyIncome, key: 'monthlyIncome' },
        { label: 'Monthly Expenses', value: formData.monthlyExpenses, key: 'monthlyExpenses' },
      ],
    },
    {
      title: 'Identity Information',
      icon: 'card-outline',
      fields: [
        { label: 'National ID', value: formData.nationalId, key: 'nationalId' },
        { label: 'Date of Birth', value: formData.dob, key: 'dob' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#007AFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
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
                {user?.kycComplete ? 'Verified' : 'Verification Pending'}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <Button
            title={isEditing ? 'Save' : 'Edit'}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}
            size="small"
            variant={isEditing ? 'primary' : 'outline'}
          />
          {!user?.kycComplete && (
            <Button
              title="Verify Now"
              onPress={handleKYCUpload}
              size="small"
              style={styles.kycButton}
            />
          )}
        </View>
      </View>

      {profileSections.map((section, sectionIndex) => (
        <Card key={sectionIndex} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name={section.icon} size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          
          {section.fields.map((field, fieldIndex) => (
            <View key={fieldIndex} style={styles.fieldContainer}>
              {isEditing ? (
                <InputField
                  label={field.label}
                  value={field.value}
                  onChangeText={(value) => handleInputChange(field.key, value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  keyboardType={
                    field.key === 'monthlyIncome' || field.key === 'monthlyExpenses' 
                      ? 'numeric' 
                      : 'default'
                  }
                />
              ) : (
                <View style={styles.fieldDisplay}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <Text style={styles.fieldValue}>
                    {field.value || 'Not provided'}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </Card>
      ))}

      <Card style={styles.kycCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="document-outline" size={20} color="#007AFF" />
          <Text style={styles.sectionTitle}>Verification Documents</Text>
        </View>
        
        <View style={styles.kycStatus}>
          <Text style={styles.kycDescription}>
            {user?.kycComplete
              ? 'Your verification is complete. All documents have been verified.'
              : 'Complete your verification by uploading the required documents.'
            }
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kycButton: {
    marginLeft: 12,
  },
  sectionCard: {
    margin: 16,
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldDisplay: {
    paddingVertical: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  kycCard: {
    margin: 16,
    marginBottom: 32,
  },
  kycDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  uploadButton: {
    width: '100%',
    marginTop: 8,
  },
});

export default ProfileScreen;
