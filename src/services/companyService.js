// Company Service - handles company operations
import { companies } from '../data/companies';

export const companyService = {
  // Get all companies
  async getCompanies() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          companies,
        });
      }, 500);
    });
  },

  // Get company by ID
  async getCompanyById(companyId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const company = companies.find(comp => comp.id === companyId);
        if (company) {
          resolve({
            success: true,
            company,
          });
        } else {
          resolve({
            success: false,
            error: 'Company not found',
          });
        }
      }, 500);
    });
  },

  // Search companies
  async searchCompanies(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredCompanies = companies.filter(company =>
          company.name.toLowerCase().includes(query.toLowerCase()) ||
          company.description.toLowerCase().includes(query.toLowerCase()) ||
          company.specialties.some(specialty => 
            specialty.toLowerCase().includes(query.toLowerCase())
          )
        );
        
        resolve({
          success: true,
          companies: filteredCompanies,
        });
      }, 300);
    });
  },

  // Get companies by category
  async getCompaniesByCategory(category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredCompanies = companies.filter(company =>
          company.specialties.some(specialty => 
            specialty.toLowerCase().includes(category.toLowerCase())
          )
        );
        
        resolve({
          success: true,
          companies: filteredCompanies,
        });
      }, 300);
    });
  },

  // Get company reviews
  async getCompanyReviews(companyId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reviews = [
          {
            id: '1',
            companyId,
            userName: 'John Smith',
            rating: 5,
            comment: 'Excellent service and quick approval process. Highly recommended!',
            date: '2024-01-15',
          },
          {
            id: '2',
            companyId,
            userName: 'Sarah Johnson',
            rating: 4,
            comment: 'Good experience overall. The interest rates are competitive.',
            date: '2024-01-10',
          },
          {
            id: '3',
            companyId,
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

  // Get company loan products
  async getCompanyLoanProducts(companyId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = [
          {
            id: '1',
            companyId,
            name: 'Personal Loan',
            minAmount: 10000,
            maxAmount: 500000,
            interestRate: '12.5%',
            term: '6-24 months',
            features: ['Quick approval', 'No collateral', 'Flexible terms'],
          },
          {
            id: '2',
            companyId,
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
