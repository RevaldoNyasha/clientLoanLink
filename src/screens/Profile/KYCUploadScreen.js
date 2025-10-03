import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';

const KYCUploadScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [uploadedDocuments, setUploadedDocuments] = useState({
    nationalId: false,
    proofOfResidence: false,
    bankStatements: false,
    payslip: false,
  });

  const requiredDocuments = [
    {
      id: 'nationalId',
      title: 'National ID',
      description: 'Front and back of your national ID card',
      icon: 'card-outline',
      required: true,
    },
    {
      id: 'proofOfResidence',
      title: 'Proof of Residence',
      description: 'Utility bill or bank statement (not older than 3 months)',
      icon: 'home-outline',
      required: true,
    },
    {
      id: 'bankStatements',
      title: 'Bank Statements',
      description: 'Last 3 months bank statements',
      icon: 'document-text-outline',
      required: true,
    },
    {
      id: 'payslip',
      title: 'Payslip',
      description: 'Latest payslip or salary certificate',
      icon: 'receipt-outline',
      required: user?.employmentType === 'Private Sector' || user?.employmentType === 'Government',
    },
  ];

  const handleDocumentUpload = (documentId) => {
    // Simulate document upload
    Alert.alert(
      'Upload Document',
      `Upload ${requiredDocuments.find(doc => doc.id === documentId)?.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Upload',
          onPress: () => {
            setUploadedDocuments(prev => ({
              ...prev,
              [documentId]: true,
            }));
            Alert.alert('Success', 'Document uploaded successfully');
          },
        },
      ]
    );
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
          'KYC Submitted',
          'Your KYC verification has been submitted successfully. You will receive a notification once it\'s reviewed.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to submit KYC verification');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting KYC');
    }
  };

  const getDocumentStatus = (documentId) => {
    const doc = requiredDocuments.find(d => d.id === documentId);
    if (!doc.required) return 'optional';
    return uploadedDocuments[documentId] ? 'uploaded' : 'pending';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return '#28A745';
      case 'pending': return '#FF6B35';
      case 'optional': return '#6C757D';
      default: return '#6C757D';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded': return 'checkmark-circle';
      case 'pending': return 'warning';
      case 'optional': return 'help-circle';
      default: return 'help-circle';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>KYC Document Upload</Text>
        <Text style={styles.subtitle}>
          Please upload the required documents to complete your KYC verification
        </Text>
      </View>

      <View style={styles.documentsContainer}>
        {requiredDocuments.map((document, index) => {
          const status = getDocumentStatus(document.id);
          const statusColor = getStatusColor(status);
          const statusIcon = getStatusIcon(status);

          return (
            <Card key={index} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <View style={styles.documentInfo}>
                  <Ionicons name={document.icon} size={24} color="#007AFF" />
                  <View style={styles.documentText}>
                    <Text style={styles.documentTitle}>
                      {document.title}
                      {document.required && <Text style={styles.required}> *</Text>}
                    </Text>
                    <Text style={styles.documentDescription}>
                      {document.description}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.statusContainer}>
                  <Ionicons name={statusIcon} size={20} color={statusColor} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </View>
              </View>

              {status !== 'uploaded' && (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={() => handleDocumentUpload(document.id)}
                >
                  <Ionicons name="cloud-upload-outline" size={20} color="#007AFF" />
                  <Text style={styles.uploadButtonText}>
                    {status === 'pending' ? 'Upload Document' : 'Upload (Optional)'}
                  </Text>
                </TouchableOpacity>
              )}
            </Card>
          );
        })}
      </View>

      <View style={styles.submitContainer}>
        <Button
          title="Submit KYC Verification"
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
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  documentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  documentText: {
    marginLeft: 12,
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  required: {
    color: '#FF6B35',
  },
  documentDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
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
