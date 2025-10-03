// Auth Service - handles authentication operations
export const authService = {
  // Simulate login API call
  async login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password') {
          resolve({
            success: true,
            user: {
              id: '1',
              email,
              name: 'John Doe',
              nationalId: '1234567890',
              dob: '1990-01-01',
              employmentType: 'Private Sector',
              ecNumber: 'EC123456',
              kycComplete: false,
            },
          });
        } else {
          resolve({
            success: false,
            error: 'Invalid email or password',
          });
        }
      }, 1000);
    });
  },

  // Simulate registration API call
  async register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            id: Date.now().toString(),
            ...userData,
            kycComplete: false,
          },
        });
      }, 1000);
    });
  },

  // Simulate logout API call
  async logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  // Simulate password reset API call
  async resetPassword(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Password reset instructions sent to your email',
        });
      }, 1000);
    });
  },

  // Simulate profile update API call
  async updateProfile(userId, profileData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            id: userId,
            ...profileData,
          },
        });
      }, 1000);
    });
  },
};
