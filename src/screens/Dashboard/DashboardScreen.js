import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalApplications: 0,
    approvedLoans: 0,
    pendingApplications: 0,
    totalBorrowed: 0,
  });

  useEffect(() => {
    // Simulate loading user stats
    setStats({
      totalApplications: 5,
      approvedLoans: 2,
      pendingApplications: 2,
      totalBorrowed: 650000,
    });
  }, []);

  const handleKYCAlert = () => {
    console.log('KYC button pressed');
    Alert.alert(
      'KYC Required',
      'Please complete your KYC verification to access all features.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Complete KYC',
          onPress: () => {
            console.log('Navigating to Profile');
            navigation.navigate('Profile');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    console.log('Logout button pressed');
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            console.log('Logout confirmed');
            logout();
          },
        },
      ]
    );
  };

  const quickActions = [
    {
      title: 'Apply for Loan',
      icon: 'add-circle-outline',
      color: '#007AFF',
      onPress: () => navigation.navigate('Companies'),
    },
    {
      title: 'My Applications',
      icon: 'document-text-outline',
      color: '#28A745',
      onPress: () => navigation.navigate('Applications'),
    },
    {
      title: 'Browse Products',
      icon: 'storefront-outline',
      color: '#FF6B35',
      onPress: () => navigation.navigate('Products'),
    },
    {
      title: 'Profile Settings',
      icon: 'person-outline',
      color: '#6F42C1',
      onPress: () => navigation.navigate('Profile'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="log-out-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {!user?.kycComplete && (
        <Card style={styles.kycAlert}>
          <View style={styles.kycContent}>
            <Ionicons name="warning-outline" size={24} color="#FF6B35" />
            <View style={styles.kycText}>
              <Text style={styles.kycTitle}>KYC Verification Required</Text>
              <Text style={styles.kycSubtitle}>
                Complete your KYC to access all features
              </Text>
            </View>
            <View style={styles.kycButtons}>
              <Button
                title="Complete"
                onPress={handleKYCAlert}
                size="small"
                style={styles.kycButton}
              />
            </View>
          </View>
        </Card>
      )}

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Your Statistics</Text>
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalApplications}</Text>
            <Text style={styles.statLabel}>Total Applications</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.approvedLoans}</Text>
            <Text style={styles.statLabel}>Approved Loans</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.pendingApplications}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>
              ${stats.totalBorrowed.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Borrowed</Text>
          </Card>
        </View>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={action.onPress}
            >
              <Ionicons name={action.icon} size={32} color={action.color} />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.recentActivityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Card>
          <View style={styles.activityItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28A745" />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Loan Application Approved</Text>
              <Text style={styles.activitySubtitle}>ABC Microfinance Ltd - $150,000</Text>
            </View>
            <Text style={styles.activityDate}>2 days ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Ionicons name="time-outline" size={20} color="#FF6B35" />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Application Under Review</Text>
              <Text style={styles.activitySubtitle}>XYZ Credit Union - $75,000</Text>
            </View>
            <Text style={styles.activityDate}>5 days ago</Text>
          </View>
        </Card>
        
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },

  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoutButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
    minHeight: 48,
  },
  kycAlert: {
    margin: 16,
    backgroundColor: '#FFF3CD',
    borderColor: '#FFEAA7',
  },
  kycContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kycText: {
    flex: 1,
    marginLeft: 12,
  },
  kycTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
  },
  kycSubtitle: {
    fontSize: 14,
    color: '#856404',
    marginTop: 2,
  },
  kycButtons: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  kycButton: {
    marginRight: 0,
  },

  statsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    padding: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  quickActionsContainer: {
    padding: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  recentActivityContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default DashboardScreen;
