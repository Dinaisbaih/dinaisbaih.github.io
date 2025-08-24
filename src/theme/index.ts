import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    primary: '#FF6B6B', // Coral red - playful and energetic
    secondary: '#4ECDC4', // Turquoise - calming and fun
    accent: '#45B7D1', // Sky blue - friendly and trustworthy
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    textLight: '#BDC3C7',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',
    
    // Kid-friendly gradient colors
    gradient: {
      primary: ['#FF6B6B', '#FF8E53'],
      secondary: ['#4ECDC4', '#44A08D'],
      accent: ['#45B7D1', '#667eea'],
      sunset: ['#FF9A8B', '#FFA8A8', '#FCBAD3'],
      ocean: ['#667eea', '#764ba2'],
      forest: ['#56ab2f', '#a8e6cf'],
    },
    
    // Category colors
    categories: {
      sports: '#E74C3C',
      arts: '#9B59B6',
      music: '#F39C12',
      dance: '#E91E63',
      educational: '#3498DB',
      outdoor: '#27AE60',
      technology: '#34495E',
      cooking: '#FF6347',
      theater: '#8E44AD',
      swimming: '#17A2B8',
    },
    
    // Age group colors
    ageGroups: {
      toddler: '#FFB6C1',
      preschool: '#98FB98',
      elementary: '#87CEEB',
      middle: '#DDA0DD',
      high: '#F0E68C',
      all: '#D3D3D3',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  
  typography: {
    fontFamily: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 28,
      display: 32,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 36,
      xxxl: 40,
      display: 44,
    },
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 10,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10.32,
      elevation: 15,
    },
  },
  
  dimensions: {
    width,
    height,
    isSmallDevice: width < 375,
    isTablet: width > 768,
  },
  
  animation: {
    timing: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
  },
};

export type Theme = typeof theme;