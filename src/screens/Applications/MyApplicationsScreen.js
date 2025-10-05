import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import { applications } from '../../data/applications';
import { loanService } from '../../services/loanService';

const MyApplicationsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      // Simulate loading user applications
      const result = await loanService.getUserApplications(user?.id);
      if (result.success) {
        setUserApplications(result.applications);
      } else {
        // Fallback to dummy data for demo
        setUserApplications(applications);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      // Fallback to dummy data
      setUserApplications(applications);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return '#28A745';
      case 'pending': return '#FF6B35';
      case 'under review': return '#007AFF';
      case 'rejected': return '#DC3545';
      default: return '#6C757D';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'checkmark-circle';
      case 'pending': return 'time-outline';
      case 'under review': return 'eye-outline';
      case 'rejected': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const handleApplicationPress = (application) => {
    // Navigate to application details if needed
    console.log('Application pressed:', application);
  };

  const renderApplicationCard = ({ item: application }) => (
    <TouchableOpacity onPress={() => handleApplicationPress(application)}>
      <Card style={styles.applicationCard}>
        <View style={styles.applicationHeader}>
          <View style={styles.applicationInfo}>
            <Text style={styles.companyName}>{application.companyName}</Text>
            <Text style={styles.loanAmount}>
              RTGS ${application.loanAmount.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <Ionicons 
              name={getStatusIcon(application.status)} 
              size={20} 
              color={getStatusColor(application.status)} 
            />
            <Text style={[
              styles.statusText,
              { color: getStatusColor(application.status) }
            ]}>
              {application.status}
            </Text>
          </View>
        </View>

        <View style={styles.applicationDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Purpose:</Text>
            <Text style={styles.detailValue}>{application.purpose}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Term:</Text>
            <Text style={styles.detailValue}>{application.repaymentTerm} months</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monthly Payment:</Text>
            <Text style={styles.detailValue}>RTGS ${application.monthlyPayment.toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Applied:</Text>
            <Text style={styles.detailValue}>{application.appliedDate}</Text>
          </View>
        </View>

        {application.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>{application.notes}</Text>
          </View>
        )}

        <View style={styles.applicationFooter}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: application.status === 'Approved' ? '100%' : 
                          application.status === 'Under Review' ? '60%' : 
                          application.status === 'Pending' ? '30%' : '0%'
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {application.status === 'Approved' ? 'Complete' : 
               application.status === 'Under Review' ? 'In Progress' : 
               application.status === 'Pending' ? 'Processing' : 'Not Started'}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <Loader text="Loading applications..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Applications</Text>
        <Text style={styles.subtitle}>
          Track your loan applications and their status
        </Text>
      </View>

      {userApplications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Applications Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start by applying for a loan with one of our partner companies
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Companies')}
          >
            <Text style={styles.browseButtonText}>Browse Companies</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={userApplications}
          renderItem={renderApplicationCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  applicationCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  applicationInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  loanAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
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
  applicationDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  notesContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  applicationFooter: {
    marginTop: 8,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default MyApplicationsScreen;
