# KidVenture Mobile App

A React Native TypeScript application that connects families with amazing kids activities and venues. KidVenture helps parents discover, explore, and book activities for their children while enabling venue owners to reach more families through our platform.

## 🌟 Features

### For Families
- **Discover Activities**: Browse hundreds of activities across various categories
- **Find Venues**: Locate nearby venues specializing in children's activities  
- **Smart Search**: Filter by age group, category, location, and price range
- **Interactive Map**: View venues on an interactive map with location services
- **Favorites**: Save favorite venues and activities for quick access
- **Reviews & Ratings**: Read reviews and see ratings from other families
- **Easy Booking**: Book activities directly through the app

### For Venue Owners
- **Partnership Program**: Join our network of partner venues
- **Comprehensive Application**: Easy-to-use partnership application form
- **Business Growth**: Reach thousands of families looking for activities
- **Venue Management**: Showcase your venue with photos and descriptions
- **Activity Listings**: List all your activities with detailed information

## 🏗️ Architecture

### Technology Stack
- **React Native 0.72.6**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Navigation 6**: Navigation and routing
- **React Native Paper**: Material Design components
- **React Native Maps**: Interactive maps functionality
- **React Native Vector Icons**: Beautiful iconography
- **React Native Linear Gradient**: Gradient backgrounds
- **React Native Reanimated**: Smooth animations

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── VenueCard.tsx   # Venue display card
│   ├── ActivityCard.tsx # Activity display card
│   └── SearchBar.tsx   # Search input component
├── screens/            # Screen components
│   ├── HomeScreen.tsx  # Main home screen
│   ├── SearchScreen.tsx # Search and filters
│   ├── VenueDetailsScreen.tsx # Venue details
│   ├── PartnershipScreen.tsx # Partnership form
│   └── ...
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx # Main navigation setup
├── services/          # Data services and API
│   └── mockData.ts    # Mock data for development
├── types/             # TypeScript type definitions
│   └── index.ts       # All app types and interfaces
├── theme/             # App theming and styling
│   └── index.ts       # Theme configuration
└── utils/             # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary**: `#FF6B6B` (Coral red - playful and energetic)
- **Secondary**: `#4ECDC4` (Turquoise - calming and fun)  
- **Accent**: `#45B7D1` (Sky blue - friendly and trustworthy)
- **Background**: `#FFFFFF`
- **Surface**: `#F8F9FA`

### Typography
- **Font Family**: Poppins (Regular, Medium, SemiBold, Bold)
- **Responsive**: Scales appropriately for different screen sizes
- **Accessibility**: High contrast ratios for readability

### Components
- **Cards**: Elevated cards with shadows and rounded corners
- **Buttons**: Material Design buttons with proper touch targets
- **Input Fields**: Outlined text inputs with validation states
- **Navigation**: Bottom tab navigation with stack navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (>=16)
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kidventure-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro Bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

### Development Scripts
```bash
npm run android     # Run on Android
npm run ios         # Run on iOS  
npm start          # Start Metro bundler
npm test           # Run tests
npm run lint       # Run ESLint
npm run type-check # Run TypeScript compiler
```

## 📱 Screens & Features

### Home Screen
- Welcome header with app branding
- Search bar for quick activity/venue search
- Category browsing with colorful icons
- Featured venues carousel
- Popular activities section
- Quick action buttons (Find Nearby, Favorites)
- Statistics showcase

### Partnership Screen
- Partnership benefits overview
- Comprehensive application form
- Venue type selection with visual icons
- Location input with address validation
- Age group selection with chips
- Dynamic activity list management
- Form validation and submission

### Search & Discovery
- Advanced filtering options
- Category-based browsing
- Age group filtering
- Location-based search
- Price range selection
- Real-time search results

### Venue & Activity Details
- High-quality image galleries
- Detailed descriptions
- Contact information
- Operating hours
- Reviews and ratings
- Booking functionality
- Share and favorite options

## 🔧 Configuration

### Environment Setup
Create environment-specific configuration files:

```typescript
// config/development.ts
export const config = {
  API_BASE_URL: 'https://dev-api.kidventure.com',
  MAPS_API_KEY: 'your-maps-api-key',
  // ... other config
};
```

### Theme Customization
Modify `src/theme/index.ts` to customize colors, spacing, and typography:

```typescript
export const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    // ... customize colors
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32
  },
  // ... other theme properties
};
```

## 🧪 Testing

### Running Tests
```bash
npm test                    # Run all tests
npm test -- --watch       # Run tests in watch mode
npm test -- --coverage    # Run tests with coverage
```

### Test Structure
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Screen and navigation flow tests
- **E2E Tests**: Complete user journey tests

## 📦 Building for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
1. Open `ios/KidVenture.xcworkspace` in Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Follow App Store distribution process

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add JSDoc comments for complex functions

### Pull Request Guidelines
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation as needed
- Follow semantic versioning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and feature requests on GitHub Issues
- **Discussions**: Join community discussions on GitHub Discussions

### Common Issues
1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build issues**: Clean build folder and reinstall pods
3. **Android build issues**: Clean gradle cache and rebuild

## 🗺️ Roadmap

### Upcoming Features
- [ ] Real-time booking system
- [ ] Push notifications for bookings
- [ ] Social features (friend recommendations)
- [ ] Loyalty program integration
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Offline functionality
- [ ] Calendar integration
- [ ] Payment processing
- [ ] Admin dashboard for venues

### Version History
- **v1.0.0**: Initial release with core features
- **v1.1.0**: Partnership application system
- **v1.2.0**: Enhanced search and filtering
- **v2.0.0**: Real-time features (planned)

## 👥 Team

- **Development**: React Native & TypeScript specialists
- **Design**: UX/UI designers focused on family-friendly experiences  
- **Product**: Product managers with childcare industry expertise
- **Business**: Partnership team for venue relations

---

**KidVenture** - Connecting families with amazing kids activities! 🎉👨‍👩‍👧‍👦