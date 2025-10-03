// Loan Service - handles loan operations
import { applications } from '../data/applications';

export const loanService = {
  // Get all loan applications for a user
  async getUserApplications(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          applications: applications.filter(app => app.userId === userId),
        });
      }, 500);
    });
  },

  // Submit a new loan application
  async submitApplication(applicationData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newApplication = {
          id: Date.now().toString(),
          ...applicationData,
          status: 'Pending',
          appliedDate: new Date().toISOString().split('T')[0],
          approvedDate: null,
          disbursedDate: null,
        };
        
        resolve({
          success: true,
          application: newApplication,
        });
      }, 1000);
    });
  },

  // Get application details by ID
  async getApplicationById(applicationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const application = applications.find(app => app.id === applicationId);
        if (application) {
          resolve({
            success: true,
            application,
          });
        } else {
          resolve({
            success: false,
            error: 'Application not found',
          });
        }
      }, 500);
    });
  },

  // Calculate loan EMI
  calculateEMI(principal, annualRate, months) {
    const monthlyRate = annualRate / 100 / 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  },

  // Get loan eligibility
  async checkEligibility(userData, loanAmount, loanTerm) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const monthlyIncome = userData.monthlyIncome || 30000;
        const monthlyExpenses = userData.monthlyExpenses || 15000;
        const availableIncome = monthlyIncome - monthlyExpenses;
        const maxEMI = availableIncome * 0.4; // 40% of available income
        
        const requestedEMI = this.calculateEMI(loanAmount, 12, loanTerm);
        
        const eligible = requestedEMI <= maxEMI && userData.kycComplete;
        
        resolve({
          success: true,
          eligible,
          maxLoanAmount: eligible ? Math.round(maxEMI * loanTerm * 0.8) : 0,
          suggestedEMI: Math.round(maxEMI),
          requestedEMI,
        });
      }, 500);
    });
  },

  // Get loan status updates
  async getLoanStatusUpdates(applicationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updates = [
          {
            id: '1',
            applicationId,
            status: 'Submitted',
            message: 'Your loan application has been submitted successfully',
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            applicationId,
            status: 'Under Review',
            message: 'Your application is being reviewed by our team',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        
        resolve({
          success: true,
          updates,
        });
      }, 500);
    });
  },
};
