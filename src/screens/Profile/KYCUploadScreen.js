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
import KycFileUpload from '../../components/KycFileUpload';
import { useAuth } from '../../context/AuthContext';

const KYCUploadScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [uploadedDocuments, setUploadedDocuments] = useState({});

  const requiredDocuments = [
    {
      id: 'nationalId',
      title: 'National ID',
      description: 'Take a clear picture of yourself holding your national ID card (front side only). Supported formats: JPEG, PNG. Maximum file size: 5MB.',
      required: true,
    },
    {
      id: 'proofOfResidence',
      title: 'Proof of Residence',
      description: 'Utility bill or bank statement (not older than 3 months). Supported formats: PDF, JPEG, PNG. Max size: 5MB',
      required: true,
    },
    {
      id: 'bankStatements',
      title: 'Bank Statements',
      description: 'Last 3 months bank statements. Supported formats: PDF, JPEG, PNG. Max size: 5MB',
      required: true,
    },
    {
      id: 'payslip',
      title: 'Payslip',
      description: 'Latest payslip or salary certificate. Supported formats: PDF, JPEG, PNG. Max size: 5MB',
      required: user?.employmentType === 'Private Sector' || user?.employmentType === 'Government',
    },
  ];

  const handleUploadSuccess = (documentId, fileData) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [documentId]: fileData,
    }));
  };

  const handleRemoveDocument = (documentId) => {
    setUploadedDocuments(prev => {
      const newState = { ...prev };
      delete newState[documentId];
      return newState;
    });
  };

  const handleSubmitKYC = async () => {
    const requiredDocs = requiredDocuments.filter(doc => doc.required);
    const allRequiredUploaded = requiredDocs.every(doc => uploadedDocuments[doc.id]);

    if (!allRequiredUploaded) {
      Alert.alert(
        'Missing Documents',
        'Please upload all required documents before submitting.',
      );
      return;
    }

    try {
      const result = await updateUser({ kycComplete: true });
      if (result.success) {
        Alert.alert(
          'Verification Submitted',
          'Your verification has been submitted successfully. You will receive a notification once it\'s reviewed.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to submit verification');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting verification');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verification Document Upload</Text>
        <Text style={styles.subtitle}>
          Please upload the required documents to complete your verification
        </Text>
      </View>

      <View style={styles.documentsContainer}>
        {requiredDocuments.map((document, index) => (
          <Card key={index} style={styles.documentCard}>
            <KycFileUpload
              documentId={document.id}
              title={document.title}
              description={document.description}
              required={document.required}
              userId={user?.id}
              onUploadSuccess={handleUploadSuccess}
              onRemove={handleRemoveDocument}
            />
          </Card>
        ))}
      </View>

      <View style={styles.submitContainer}>
        <Button
          title="Submit Verification"
          onPress={handleSubmitKYC}
          style={styles.submitButton}
        />

        <Text style={styles.note}>
          * Required documents must be uploaded before submission
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  documentsContainer: {
    padding: 16,
  },
  documentCard: {
    marginBottom: 16,
  },
  submitContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  submitButton: {
    marginBottom: 16,
  },
  note: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default KYCUploadScreen;
