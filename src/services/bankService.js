// Bank Service - handles bank operations
import { banks } from '../data/banks';

export const bankService = {
  // Get all banks
  async getBanks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          banks,
        });
      }, 500);
    });
  },

  // Get bank by ID
  async getBankById(bankId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bank = banks.find(b => b.id === bankId);
        if (bank) {
          resolve({
            success: true,
            bank,
          });
        } else {
          resolve({
            success: false,
            error: 'Bank not found',
          });
        }
      }, 500);
    });
  },

  // Search banks
  async searchBanks(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredBanks = banks.filter(bank =>
          bank.name.toLowerCase().includes(query.toLowerCase()) ||
          bank.description.toLowerCase().includes(query.toLowerCase()) ||
          bank.specialties.some(specialty => 
            specialty.toLowerCase().includes(query.toLowerCase())
          )
        );
        
        resolve({
          success: true,
          banks: filteredBanks,
        });
      }, 300);
    });
  },

  // Get banks by category
  async getBanksByCategory(category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredBanks = banks.filter(bank =>
          bank.specialties.some(specialty => 
            specialty.toLowerCase().includes(category.toLowerCase())
          )
        );
        
        resolve({
          success: true,
          banks: filteredBanks,
        });
      }, 300);
    });
  },

  // Get bank reviews
  async getBankReviews(bankId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reviews = [
          {
            id: '1',
            bankId,
            userName: 'John Smith',
            rating: 5,
            comment: 'Excellent service and quick approval process. Highly recommended!',
            date: '2024-01-15',
          },
          {
            id: '2',
            bankId,
            userName: 'Sarah Johnson',
            rating: 4,
            comment: 'Good experience overall. The interest rates are competitive.',
            date: '2024-01-10',
          },
          {
            id: '3',
            bankId,
            userName: 'Mike Wilson',
            rating: 5,
            comment: 'Professional staff and transparent process. Got my loan approved quickly.',
            date: '2024-01-05',
          },
        ];
        
        resolve({
          success: true,
          reviews,
        });
      }, 500);
    });
  },

  // Get bank loan products
  async getBankLoanProducts(bankId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = [
          {
            id: '1',
            bankId,
            name: 'Personal Loan',
            minAmount: 10000,
            maxAmount: 500000,
            interestRate: '12.5%',
            term: '6-24 months',
            features: ['Quick approval', 'No collateral', 'Flexible terms'],
          },
          {
            id: '2',
            bankId,
            name: 'Business Loan',
            minAmount: 50000,
            maxAmount: 2000000,
            interestRate: '10.8%',
            term: '12-60 months',
            features: ['Higher amounts', 'Business support', 'Long terms'],
          },
        ];
        
        resolve({
          success: true,
          products,
        });
      }, 500);
    });
  },
};

