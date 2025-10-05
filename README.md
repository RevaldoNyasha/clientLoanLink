# AlphaClientLoan - Financial System

A comprehensive React Native application built with Expo that provides a complete financial marketplace experience for loan applications and financial product management.

## Features

### Authentication System
- **Login Screen**: Email and password authentication
- **Registration Screen**: Complete user registration with conditional EC Number field
- **Form Validation**: Client-side validation for all input fields
- **Persistent Authentication**: User sessions maintained using AsyncStorage

### Dashboard
- **KYC Status Check**: Automatic redirection to profile completion if KYC is incomplete
- **Quick Actions**: Easy access to main features
- **User Statistics**: Simulated financial overview
- **Access Control**: Conditional access based on KYC completion status

### Profile Management
- **Personal Information**: Full name, National ID, Date of Birth
- **Employment Details**: Employment type with conditional EC Number
- **KYC Document Upload**: National ID, Proof of Residence, Bank Statements, Payslip
- **Profile Completion**: Automatic KYC status updates

### Company Management
- **Company Listing**: Browse available financial institutions
- **Company Details**: Detailed company information with reviews and products
- **Loan Applications**: Pre-filled application forms with user data
- **Eligibility Checks**: Automated eligibility assessment

### Application Management
- **My Applications**: View all submitted loan applications
- **Application Status**: Track application progress
- **Application Details**: Complete application information

### Product Catalog & Shopping Cart
- **Product Browsing**: Financial products catalog
- **Shopping Cart**: Add/remove products, quantity management
- **Checkout Process**: Complete application with payment details
- **Installment Plans**: Flexible payment options

##  Architecture

### Navigation Structure
- **React Navigation**: Stack and Bottom Tab navigation
- **Nested Navigators**: Each tab has its own stack navigator
- **Conditional Navigation**: Authentication-based routing

### State Management
- **Context API**: Global state management for authentication and cart
- **AsyncStorage**: Persistent user data storage
- **Local State**: Component-level state management

### Project Structure
```
src/
├── navigation/           # Navigation configuration
│   ├── AppNavigator.js   # Main app navigator
│   ├── AuthNavigator.js  # Authentication flow
│   ├── MainNavigator.js  # Main app tabs
│   └── stacks/           # Individual stack navigators
├── screens/              # All application screens
│   ├── Auth/            # Login and Registration
│   ├── Dashboard/       # Main dashboard
│   ├── Profile/         # User profile and KYC
│   ├── Companies/       # Company listing and details
│   ├── Applications/    # User applications
│   ├── Products/        # Product catalog and cart
│   └── Common/          # Shared screens
├── components/           # Reusable UI components
├── context/             # Global state management
├── services/            # API service layer
├── utils/               # Utility functions
└── data/                # Dummy data files
```

##  Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library
- **Context API**: State management
- **AsyncStorage**: Local data persistence
- **TypeScript**: Type safety (optional)

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AlphaClientLoan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

##  Testing the Application

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password123`

### Test Flow
1. **Registration**: Create a new account with complete information
2. **Login**: Use demo credentials or newly created account
3. **KYC Completion**: Upload documents in Profile section
4. **Browse Companies**: Explore available financial institutions
5. **Apply for Loan**: Submit a loan application
6. **Browse Products**: Add financial products to cart
7. **Checkout**: Complete product application

### Dummy Data
The application includes comprehensive dummy data for:
- **Companies**: 5+ financial institutions with details
- **Products**: Various financial products with pricing
- **Applications**: Sample loan applications with different statuses

##  Configuration

### Environment Setup
- No environment variables required for basic functionality
- All data is simulated using dummy JSON files
- Ready for backend integration

### Customization
- **Styling**: Modify component styles in individual files
- **Navigation**: Update navigation structure in `src/navigation/`
- **Data**: Replace dummy data in `src/data/` with real API calls
- **Validation**: Customize validation rules in `src/utils/validators.js`

##  Available Scripts

- `npm start`: Start Expo development server
- `npm run android`: Start Android development build
- `npm run ios`: Start iOS development build
- `npm run web`: Start web development build
- `npm run lint`: Run ESLint for code quality

##  Deployment

### Building for Production
```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

### App Store Submission
1. Configure app.json with production settings
2. Build production binaries
3. Submit to respective app stores

##  Enhancements

- **Backend Integration**: Replace dummy data with real API calls
- **Push Notifications**: Application status updates
- **Biometric Authentication**: Enhanced security
- **Offline Support**: Cached data for offline usage
- **Advanced Analytics**: User behavior tracking
- **Multi-language Support**: Internationalization



---

**Built with ❤️ using React Native and Expo**
