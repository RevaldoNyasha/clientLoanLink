import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const KycFileUpload = ({
  documentId,
  title,
  description,
  required = false,
  userId,
  onUploadSuccess,
  onRemove,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const allowedTypes = {
    'application/pdf': 'PDF',
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
  };

  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const validateFile = (file) => {
    setError('');

    // Check file type
    if (!allowedTypes[file.mimeType]) {
      setError('Only PDF, JPEG, and PNG files are allowed.');
      return false;
    }

    // Check file size
    if (file.size > maxFileSize) {
      setError('File size must not exceed 5MB.');
      return false;
    }

    return true;
  };

  const handleFilePick = async () => {
    try {
      setLoading(true);
      setError('');

      const result = await DocumentPicker.getDocumentAsync({
        type: Object.keys(allowedTypes),
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const { uri, name, size, mimeType } = result;

        const file = { uri, name, size, mimeType };

        if (!validateFile(file)) {
          return;
        }

        // Create unique folder for user
        const userFolder = `${FileSystem.documentDirectory}kyc_${userId || 'user'}_${Date.now()}/`;
        await FileSystem.makeDirectoryAsync(userFolder, { intermediates: true });

        // Copy file to the folder
        const newUri = `${userFolder}${name}`;
        await FileSystem.copyAsync({ from: uri, to: newUri });

        const uploadedFileData = {
          ...file,
          localUri: newUri,
          folder: userFolder,
        };

        setUploadedFile(uploadedFileData);
        onUploadSuccess?.(documentId, uploadedFileData);

        Alert.alert('Success', 'Document uploaded successfully');
      }
    } catch (error) {
      console.error('Document picker error:', error);
      setError('Failed to upload document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    if (uploadedFile) {
      // Optionally delete the file from local storage
      // FileSystem.deleteAsync(uploadedFile.folder, { idempotent: true });

      setUploadedFile(null);
      setError('');
      onRemove?.(documentId);
    }
  };

  const getFileIcon = (mimeType) => {
    switch (mimeType) {
      case 'application/pdf':
        return 'document-text-outline';
      case 'image/jpeg':
      case 'image/png':
        return 'image-outline';
      default:
        return 'document-outline';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Ionicons name="document-outline" size={20} color="#007AFF" />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {title}
              {required && <Text style={styles.required}> *</Text>}
            </Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        {uploadedFile ? (
          <View style={styles.uploadedContainer}>
            <Ionicons
              name={getFileIcon(uploadedFile.mimeType)}
              size={20}
              color="#28A745"
            />
            <Text style={styles.uploadedText} numberOfLines={1}>
              {uploadedFile.name}
            </Text>
          </View>
        ) : (
          <View style={styles.statusContainer}>
            <Ionicons name="warning" size={16} color="#FF6B35" />
            <Text style={styles.statusText}>Not uploaded</Text>
          </View>
        )}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      {uploadedFile ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.changeButton]}
            onPress={handleFilePick}
            disabled={loading}
          >
            <Ionicons name="refresh-outline" size={16} color="#007AFF" />
            <Text style={styles.changeButtonText}>Change File</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton]}
            onPress={handleRemoveFile}
          >
            <Ionicons name="trash-outline" size={16} color="#FF6B35" />
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.uploadButton, loading && styles.uploadButtonDisabled]}
          onPress={handleFilePick}
          disabled={loading}
        >
          <Ionicons
            name={loading ? "hourglass-outline" : "cloud-upload-outline"}
            size={20}
            color={loading ? "#999" : "#007AFF"}
          />
          <Text style={[styles.uploadButtonText, loading && styles.uploadButtonTextDisabled]}>
            {loading ? 'Uploading...' : 'Upload Document'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  required: {
    color: '#FF6B35',
  },
  description: {
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
    color: '#FF6B35',
    marginLeft: 4,
  },
  uploadedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 120,
  },
  uploadedText: {
    fontSize: 14,
    color: '#28A745',
    marginLeft: 4,
    flex: 1,
  },
  errorText: {
    fontSize: 14,
    color: '#DC3545',
    marginBottom: 8,
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
  uploadButtonDisabled: {
    borderColor: '#999',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  uploadButtonTextDisabled: {
    color: '#999',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  changeButton: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 6,
  },
  removeButton: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 6,
  },
});

export default KycFileUpload;
