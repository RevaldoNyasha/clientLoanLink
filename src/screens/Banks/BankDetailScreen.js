import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/AuthContext';
import { bankService } from '../../services/bankService';

const BankDetailScreen = ({ route, navigation }) => {
  const { bank: initialBank } = route.params;
  const { user } = useAuth();
  const [bank, setBank] = useState(initialBank);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBankDetails();
  }, []);

  const loadBankDetails = async () => {
    setLoading(true);
    try {
      const [reviewsResult, productsResult] = await Promise.all([
        bankService.getBankReviews(bank.id),
        bankService.getBankLoanProducts(bank.id),
      ]);

      if (reviewsResult.success) {
        setReviews(reviewsResult.reviews);
      }
      if (productsResult.success) {
        setProducts(productsResult.products);
      }
    } catch (error) {
      console.error('Error loading bank details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyForLoan = () => {
    navigation.navigate('LoanApplication', { bank });
  };

  const renderReview = (review, index) => (
    <View key={index} style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{review.userName}</Text>
        <View style={styles.reviewRating}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < review.rating ? 'star' : 'star-outline'}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
      <Text style={styles.reviewDate}>{review.date}</Text>
    </View>
  );

  const renderProduct = (product, index) => (
    <Card key={index} style={styles.productCard}>
      <View style={styles.productHeader}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productRate}>{product.interestRate}</Text>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productDetail}>
          Amount: ${product.minAmount.toLocaleString()} - ${product.maxAmount.toLocaleString()}
        </Text>
        <Text style={styles.productDetail}>
          Term: {product.term}
        </Text>
      </View>
      <View style={styles.productFeatures}>
        {product.features.map((feature, i) => (
          <View key={i} style={styles.featureTag}>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </Card>
  );

  if (loading) {
    return <Loader text="Loading bank details..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bankName}>{bank.name}</Text>
        <View style={styles.bankRating}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{bank.rating}</Text>
          <Text style={styles.reviewsCount}>({bank.reviews} reviews)</Text>
        </View>
      </View>

      <Card style={styles.descriptionCard}>
        <Text style={styles.description}>{bank.description}</Text>
      </Card>

      <Card style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Loan Details</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Ionicons name="trending-up" size={20} color="#28A745" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Interest Rate</Text>
              <Text style={styles.detailValue}>{bank.interestRate}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={20} color="#007AFF" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Loan Amount</Text>
              <Text style={styles.detailValue}>
                ${bank.minLoanAmount.toLocaleString()} - ${bank.maxLoanAmount.toLocaleString()}
              </Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={20} color="#FF6B35" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Repayment Term</Text>
              <Text style={styles.detailValue}>{bank.loanTerm}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="business-outline" size={20} color="#6F42C1" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Established</Text>
              <Text style={styles.detailValue}>{bank.establishedYear}</Text>
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.requirementsCard}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {bank.requirements.map((requirement, index) => (
          <View key={index} style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={16} color="#28A745" />
            <Text style={styles.requirementText}>{requirement}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.specialtiesCard}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <View style={styles.specialtiesList}>
          {bank.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </Card>

      {products.length > 0 && (
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Available Products</Text>
          {products.map(renderProduct)}
        </View>
      )}

      {reviews.length > 0 && (
        <Card style={styles.reviewsCard}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          {reviews.map(renderReview)}
        </Card>
      )}

      <View style={styles.actionContainer}>
        <Button
          title="Apply for Loan"
          onPress={handleApplyForLoan}
          style={styles.applyButton}
        />
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
  bankName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bankRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  descriptionCard: {
    margin: 16,
    marginBottom: 0,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailsCard: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailContent: {
    marginLeft: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  requirementsCard: {
    margin: 16,
    marginBottom: 0,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  specialtiesCard: {
    margin: 16,
    marginBottom: 0,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: '#666',
  },
  productsSection: {
    padding: 16,
  },
  productCard: {
    marginBottom: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
  productDetails: {
    marginBottom: 8,
  },
  productDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  productFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
  },
  reviewsCard: {
    margin: 16,
    marginBottom: 0,
  },
  reviewItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  actionContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  applyButton: {
    marginTop: 16,
  },
});

export default BankDetailScreen;
