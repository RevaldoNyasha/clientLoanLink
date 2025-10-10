import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import { bankService } from '../../services/bankService';

const BanksScreen = ({ navigation }) => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  const filters = [
    { id: 'All', label: 'All Banks' },
    { id: 'LowInterest', label: 'Low Interest' },
    { id: 'ShortTerm', label: 'Short Term' },
    { id: 'Business', label: 'Business Loans' },
    { id: 'Personal', label: 'Personal Loans' },
  ];

  const sortOptions = [
    { id: 'name', label: 'Name (A-Z)' },
    { id: 'nameDesc', label: 'Name (Z-A)' },
    { id: 'interestRate', label: 'Interest Rate (Low to High)' },
    { id: 'interestRateDesc', label: 'Interest Rate (High to Low)' },
    { id: 'maxAmount', label: 'Max Amount (High to Low)' },
    { id: 'maxAmountDesc', label: 'Max Amount (Low to High)' },
    { id: 'rating', label: 'Rating (High to Low)' },
    { id: 'ratingDesc', label: 'Rating (Low to High)' },
  ];

  useEffect(() => {
    loadBanks();
  }, []);

  useEffect(() => {
    filterAndSortBanks();
  }, [searchQuery, banks, activeFilter, sortBy]);

  const loadBanks = async () => {
    try {
      const result = await bankService.getBanks();
      if (result.success) {
        setBanks(result.banks);
      }
    } catch (error) {
      console.error('Error loading banks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBanks = () => {
    let filtered = banks;

    // Apply filter
    if (activeFilter !== 'All') {
      filtered = filtered.filter(bank => {
        switch (activeFilter) {
          case 'LowInterest': {
            const rate = parseFloat(bank.interestRate?.replace('%', ''));
            return !isNaN(rate) && rate < 10;
          }
          case 'ShortTerm': {
            const term = parseInt(bank.loanTerm?.split(' ')[0]);
            return !isNaN(term) && term < 12;
          }
          case 'Business':
            return bank.specialties?.some(s => s.toLowerCase().includes('business')) || false;
          case 'Personal':
            return bank.specialties?.some(s => s.toLowerCase().includes('personal')) || false;
          default:
            return true;
        }
      });
    }

    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(bank =>
        bank.name.toLowerCase().includes(q) ||
        bank.description.toLowerCase().includes(q) ||
        (bank.specialties || []).some(specialty => specialty.toLowerCase().includes(q))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'interestRate': {
          const rateA = parseFloat(a.interestRate?.replace('%', ''));
          const rateB = parseFloat(b.interestRate?.replace('%', ''));
          return rateA - rateB;
        }
        case 'interestRateDesc': {
          const rateA = parseFloat(a.interestRate?.replace('%', ''));
          const rateB = parseFloat(b.interestRate?.replace('%', ''));
          return rateB - rateA;
        }
        case 'maxAmount':
          return b.maxLoanAmount - a.maxLoanAmount;
        case 'maxAmountDesc':
          return a.maxLoanAmount - b.maxLoanAmount;
        case 'rating':
          return b.rating - a.rating;
        case 'ratingDesc':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredBanks(filtered);
  };

  const handleBankPress = (bank) => {
    navigation.navigate('BankDetail', { bank });
  };

  const renderBankCard = ({ item: bank }) => (
    <TouchableOpacity onPress={() => handleBankPress(bank)}>
      <Card style={styles.bankCard}>
        <View style={styles.bankHeader}>
          <View style={styles.bankInfo}>
            <Text style={styles.bankName}>{bank.name}</Text>
            <Text style={styles.bankDescription} numberOfLines={2}>
              {bank.description}
            </Text>
          </View>
          <View style={styles.bankRating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{bank.rating}</Text>
            <Text style={styles.reviewsText}>({bank.reviews})</Text>
          </View>
        </View>

        <View style={styles.bankDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="trending-up" size={16} color="#28A745" />
            <Text style={styles.detailText}>
              Interest Rate: {bank.interestRate}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={16} color="#007AFF" />
            <Text style={styles.detailText}>
              Max Amount: ${bank.maxLoanAmount.toLocaleString()}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#FF6B35" />
            <Text style={styles.detailText}>
              Term: {bank.loanTerm}
            </Text>
          </View>
        </View>

        <View style={styles.specialtiesContainer}>
          <Text style={styles.specialtiesTitle}>Specialties:</Text>
          <View style={styles.specialtiesList}>
            {bank.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bankFooter}>
          <View style={styles.bankStats}>
            <Text style={styles.statText}>
              {bank.branches} branches
            </Text>
            <Text style={styles.statText}>
              Since {bank.establishedYear}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => handleBankPress(bank)}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <Loader text="Loading banks..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Banks</Text>
        <Text style={styles.subtitle}>
          Lending Banks
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search banks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterSortContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="filter" size={16} color="#007AFF" />
          <Text style={styles.filterButtonText}>
            Filter: {filters.find(f => f.id === activeFilter)?.label || 'All Banks'}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="swap-vertical" size={16} color="#007AFF" />
          <Text style={styles.sortButtonText}>
            Sort: {sortOptions.find(s => s.id === sortBy)?.label || 'Name (A-Z)'}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBanks}
        renderItem={renderBankCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="business-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No banks found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search criteria
            </Text>
          </View>
        }
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Banks</Text>
              <TouchableOpacity
                onPress={() => setShowFilterModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {filters.map(filter => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.modalOption,
                    activeFilter === filter.id && styles.selectedOption
                  ]}
                  onPress={() => {
                    setActiveFilter(filter.id);
                    setShowFilterModal(false);
                  }}
                >
                  <Text style={[
                    styles.modalOptionText,
                    activeFilter === filter.id && styles.selectedOptionText
                  ]}>
                    {filter.label}
                  </Text>
                  {activeFilter === filter.id && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort Banks</Text>
              <TouchableOpacity
                onPress={() => setShowSortModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {sortOptions.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.modalOption,
                    sortBy === option.id && styles.selectedOption
                  ]}
                  onPress={() => {
                    setSortBy(option.id);
                    setShowSortModal(false);
                  }}
                >
                  <Text style={[
                    styles.modalOptionText,
                    sortBy === option.id && styles.selectedOptionText
                  ]}>
                    {option.label}
                  </Text>
                  {sortBy === option.id && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  bankCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  bankInfo: {
    flex: 1,
    marginRight: 12,
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bankDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bankRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  bankDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  specialtiesContainer: {
    marginBottom: 16,
  },
  specialtiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: '#666',
  },
  bankFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankStats: {
    flexDirection: 'row',
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginRight: 16,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
  },
  filterSortContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
  sortButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#f0f8ff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default BanksScreen;
