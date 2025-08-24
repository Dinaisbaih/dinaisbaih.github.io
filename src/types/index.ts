export interface Venue {
  id: string;
  name: string;
  description: string;
  category: VenueCategory;
  location: Location;
  contact: ContactInfo;
  images: string[];
  rating: number;
  reviewCount: number;
  priceRange: PriceRange;
  ageGroups: AgeGroup[];
  amenities: string[];
  activities: Activity[];
  operatingHours: OperatingHours;
  isPartner: boolean;
  featured: boolean;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: ActivityCategory;
  ageGroup: AgeGroup;
  duration: number; // in minutes
  price: number;
  maxParticipants: number;
  requirements: string[];
  images: string[];
  venueId: string;
  difficulty: DifficultyLevel;
  tags: string[];
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  district?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  openTime?: string; // "09:00"
  closeTime?: string; // "18:00"
  breaks?: Array<{
    start: string;
    end: string;
  }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  preferences: UserPreferences;
  children: Child[];
  favorites: string[]; // venue IDs
  bookings: Booking[];
}

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  interests: ActivityCategory[];
  allergies?: string[];
  specialNeeds?: string[];
}

export interface UserPreferences {
  maxDistance: number; // in km
  preferredCategories: ActivityCategory[];
  priceRange: PriceRange;
  notifications: {
    newActivities: boolean;
    bookingReminders: boolean;
    promotions: boolean;
  };
}

export interface Booking {
  id: string;
  venueId: string;
  activityId: string;
  userId: string;
  childrenIds: string[];
  date: string;
  time: string;
  participants: number;
  totalPrice: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  venueId: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}

export interface SearchFilters {
  query?: string;
  category?: ActivityCategory;
  ageGroup?: AgeGroup;
  location?: {
    latitude: number;
    longitude: number;
    radius: number; // in km
  };
  priceRange?: PriceRange;
  rating?: number;
  distance?: number;
  availability?: {
    date: string;
    time?: string;
  };
}

export interface PartnershipRequest {
  venueName: string;
  ownerName: string;
  email: string;
  phone: string;
  venueType: VenueCategory;
  location: Partial<Location>;
  description: string;
  website?: string;
  socialMedia?: ContactInfo['socialMedia'];
  estimatedCapacity: number;
  targetAgeGroups: AgeGroup[];
  proposedActivities: string[];
  businessLicense?: string;
  insurance?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

// Enums
export enum VenueCategory {
  INDOOR_PLAYGROUND = 'indoor-playground',
  ART_STUDIO = 'art-studio',
  SPORTS_CENTER = 'sports-center',
  MUSIC_SCHOOL = 'music-school',
  EDUCATIONAL_CENTER = 'educational-center',
  OUTDOOR_ADVENTURE = 'outdoor-adventure',
  DANCE_STUDIO = 'dance-studio',
  SWIMMING_POOL = 'swimming-pool',
  TRAMPOLINE_PARK = 'trampoline-park',
  CLIMBING_GYM = 'climbing-gym',
  MAKER_SPACE = 'maker-space',
  COOKING_SCHOOL = 'cooking-school',
  THEATER = 'theater',
  MUSEUM = 'museum',
  OTHER = 'other'
}

export enum ActivityCategory {
  SPORTS = 'sports',
  ARTS_CRAFTS = 'arts-crafts',
  MUSIC = 'music',
  DANCE = 'dance',
  EDUCATIONAL = 'educational',
  OUTDOOR = 'outdoor',
  TECHNOLOGY = 'technology',
  COOKING = 'cooking',
  THEATER = 'theater',
  SWIMMING = 'swimming',
  MARTIAL_ARTS = 'martial-arts',
  GYMNASTICS = 'gymnastics',
  SCIENCE = 'science',
  LANGUAGE = 'language',
  OTHER = 'other'
}

export enum AgeGroup {
  TODDLER = '0-3',
  PRESCHOOL = '4-5',
  EARLY_ELEMENTARY = '6-8',
  LATE_ELEMENTARY = '9-11',
  MIDDLE_SCHOOL = '12-14',
  HIGH_SCHOOL = '15-18',
  ALL_AGES = 'all'
}

export enum PriceRange {
  FREE = 'free',
  LOW = 'low', // $0-25
  MEDIUM = 'medium', // $26-50
  HIGH = 'high', // $51-100
  PREMIUM = 'premium' // $100+
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  ALL_LEVELS = 'all-levels'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no-show'
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  VenueDetails: { venueId: string };
  ActivityDetails: { activityId: string };
  Search: { filters?: Partial<SearchFilters> };
  Profile: undefined;
  Booking: { activityId: string };
  Partnership: undefined;
  Map: { venues?: Venue[] };
  Reviews: { venueId: string };
  Favorites: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Component Props Types
export interface VenueCardProps {
  venue: Venue;
  onPress: (venue: Venue) => void;
  showDistance?: boolean;
  userLocation?: Location;
}

export interface ActivityCardProps {
  activity: Activity;
  venue?: Venue;
  onPress: (activity: Activity) => void;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export interface FilterModalProps {
  visible: boolean;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClose: () => void;
  onApply: () => void;
}