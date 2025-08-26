import {
  Venue,
  Activity,
  VenueCategory,
  ActivityCategory,
  AgeGroup,
  PriceRange,
  DifficultyLevel,
  Location,
} from '@types/index';

// Mock locations around different areas
const mockLocations: Location[] = [
  {
    latitude: 40.7589,
    longitude: -73.9851,
    address: '123 Kids Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    district: 'Manhattan',
  },
  {
    latitude: 40.7614,
    longitude: -73.9776,
    address: '456 Fun Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'USA',
    district: 'Manhattan',
  },
  {
    latitude: 40.7505,
    longitude: -73.9934,
    address: '789 Play Boulevard',
    city: 'New York',
    state: 'NY',
    zipCode: '10003',
    country: 'USA',
    district: 'Manhattan',
  },
  {
    latitude: 40.7282,
    longitude: -73.7949,
    address: '321 Adventure Lane',
    city: 'Queens',
    state: 'NY',
    zipCode: '11375',
    country: 'USA',
    district: 'Queens',
  },
  {
    latitude: 40.6892,
    longitude: -74.0445,
    address: '654 Creative Circle',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11201',
    country: 'USA',
    district: 'Brooklyn',
  },
];

export const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Rainbow Kids Playground',
    description: 'A vibrant indoor playground featuring colorful play structures, ball pits, and interactive games perfect for toddlers and young children.',
    category: VenueCategory.INDOOR_PLAYGROUND,
    location: mockLocations[0],
    contact: {
      phone: '+1-555-0101',
      email: 'info@rainbowkids.com',
      website: 'https://rainbowkids.com',
      socialMedia: {
        facebook: 'rainbowkidsnyc',
        instagram: '@rainbowkidsplayground',
      },
    },
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    ],
    rating: 4.8,
    reviewCount: 124,
    priceRange: PriceRange.LOW,
    ageGroups: [AgeGroup.TODDLER, AgeGroup.PRESCHOOL, AgeGroup.EARLY_ELEMENTARY],
    amenities: ['Free WiFi', 'Parking', 'Café', 'Birthday Parties', 'Restrooms'],
    activities: [],
    operatingHours: {
      monday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      tuesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      wednesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      thursday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      friday: { isOpen: true, openTime: '09:00', closeTime: '20:00' },
      saturday: { isOpen: true, openTime: '08:00', closeTime: '20:00' },
      sunday: { isOpen: true, openTime: '08:00', closeTime: '19:00' },
    },
    isPartner: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Little Artists Studio',
    description: 'A creative space where children can explore various art mediums including painting, sculpting, and crafting in a safe, inspiring environment.',
    category: VenueCategory.ART_STUDIO,
    location: mockLocations[1],
    contact: {
      phone: '+1-555-0102',
      email: 'hello@littleartists.com',
      website: 'https://littleartists.com',
      socialMedia: {
        instagram: '@littleartistsstudio',
        facebook: 'littleartistsnyc',
      },
    },
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800',
    ],
    rating: 4.9,
    reviewCount: 89,
    priceRange: PriceRange.MEDIUM,
    ageGroups: [AgeGroup.PRESCHOOL, AgeGroup.EARLY_ELEMENTARY, AgeGroup.LATE_ELEMENTARY],
    amenities: ['Art Supplies Included', 'Aprons Provided', 'Display Gallery', 'Take Home Artwork'],
    activities: [],
    operatingHours: {
      monday: { isOpen: false },
      tuesday: { isOpen: true, openTime: '10:00', closeTime: '17:00' },
      wednesday: { isOpen: true, openTime: '10:00', closeTime: '17:00' },
      thursday: { isOpen: true, openTime: '10:00', closeTime: '17:00' },
      friday: { isOpen: true, openTime: '10:00', closeTime: '18:00' },
      saturday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
      sunday: { isOpen: true, openTime: '10:00', closeTime: '16:00' },
    },
    isPartner: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Champions Sports Center',
    description: 'A comprehensive sports facility offering various athletic programs for children of all ages, from beginner to competitive levels.',
    category: VenueCategory.SPORTS_CENTER,
    location: mockLocations[2],
    contact: {
      phone: '+1-555-0103',
      email: 'info@championssports.com',
      website: 'https://championssports.com',
    },
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    rating: 4.7,
    reviewCount: 156,
    priceRange: PriceRange.MEDIUM,
    ageGroups: [AgeGroup.EARLY_ELEMENTARY, AgeGroup.LATE_ELEMENTARY, AgeGroup.MIDDLE_SCHOOL],
    amenities: ['Professional Equipment', 'Certified Coaches', 'Locker Rooms', 'Snack Bar'],
    activities: [],
    operatingHours: {
      monday: { isOpen: true, openTime: '15:00', closeTime: '21:00' },
      tuesday: { isOpen: true, openTime: '15:00', closeTime: '21:00' },
      wednesday: { isOpen: true, openTime: '15:00', closeTime: '21:00' },
      thursday: { isOpen: true, openTime: '15:00', closeTime: '21:00' },
      friday: { isOpen: true, openTime: '15:00', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '08:00', closeTime: '20:00' },
      sunday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    },
    isPartner: true,
    featured: false,
  },
  {
    id: '4',
    name: 'Melody Music Academy',
    description: 'A music school dedicated to nurturing young musicians through individual and group lessons in various instruments and vocals.',
    category: VenueCategory.MUSIC_SCHOOL,
    location: mockLocations[3],
    contact: {
      phone: '+1-555-0104',
      email: 'info@melodyacademy.com',
      website: 'https://melodyacademy.com',
      socialMedia: {
        youtube: 'MelodyMusicAcademy',
        instagram: '@melodyacademynyc',
      },
    },
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    ],
    rating: 4.6,
    reviewCount: 73,
    priceRange: PriceRange.HIGH,
    ageGroups: [AgeGroup.PRESCHOOL, AgeGroup.EARLY_ELEMENTARY, AgeGroup.LATE_ELEMENTARY, AgeGroup.MIDDLE_SCHOOL],
    amenities: ['Instrument Rentals', 'Practice Rooms', 'Recital Hall', 'Music Library'],
    activities: [],
    operatingHours: {
      monday: { isOpen: true, openTime: '14:00', closeTime: '20:00' },
      tuesday: { isOpen: true, openTime: '14:00', closeTime: '20:00' },
      wednesday: { isOpen: true, openTime: '14:00', closeTime: '20:00' },
      thursday: { isOpen: true, openTime: '14:00', closeTime: '20:00' },
      friday: { isOpen: true, openTime: '14:00', closeTime: '19:00' },
      saturday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
      sunday: { isOpen: false },
    },
    isPartner: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Discovery Learning Hub',
    description: 'An educational center focused on STEM learning through hands-on experiments, coding classes, and interactive workshops.',
    category: VenueCategory.EDUCATIONAL_CENTER,
    location: mockLocations[4],
    contact: {
      phone: '+1-555-0105',
      email: 'learn@discoveryhub.com',
      website: 'https://discoveryhub.com',
    },
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800',
    ],
    rating: 4.8,
    reviewCount: 92,
    priceRange: PriceRange.HIGH,
    ageGroups: [AgeGroup.EARLY_ELEMENTARY, AgeGroup.LATE_ELEMENTARY, AgeGroup.MIDDLE_SCHOOL],
    amenities: ['Computer Lab', 'Science Equipment', 'Library', 'Project Showcase'],
    activities: [],
    operatingHours: {
      monday: { isOpen: true, openTime: '16:00', closeTime: '19:00' },
      tuesday: { isOpen: true, openTime: '16:00', closeTime: '19:00' },
      wednesday: { isOpen: true, openTime: '16:00', closeTime: '19:00' },
      thursday: { isOpen: true, openTime: '16:00', closeTime: '19:00' },
      friday: { isOpen: true, openTime: '16:00', closeTime: '18:00' },
      saturday: { isOpen: true, openTime: '10:00', closeTime: '16:00' },
      sunday: { isOpen: true, openTime: '12:00', closeTime: '16:00' },
    },
    isPartner: true,
    featured: true,
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    name: 'Free Play Session',
    description: 'Open play time in our colorful playground with slides, ball pits, and climbing structures.',
    category: ActivityCategory.SPORTS,
    ageGroup: AgeGroup.TODDLER,
    duration: 90,
    price: 15,
    maxParticipants: 20,
    requirements: ['Socks required', 'Adult supervision for children under 3'],
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
    venueId: '1',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['indoor', 'playground', 'social', 'physical'],
  },
  {
    id: '2',
    name: 'Toddler Art Class',
    description: 'Introduction to painting and finger painting for our youngest artists.',
    category: ActivityCategory.ARTS_CRAFTS,
    ageGroup: AgeGroup.TODDLER,
    duration: 45,
    price: 25,
    maxParticipants: 8,
    requirements: ['Wear old clothes', 'Parent participation required'],
    images: ['https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800'],
    venueId: '2',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['art', 'creative', 'messy', 'parent-child'],
  },
  {
    id: '3',
    name: 'Little Kickers Soccer',
    description: 'Fun introduction to soccer fundamentals with games and basic skills training.',
    category: ActivityCategory.SPORTS,
    ageGroup: AgeGroup.PRESCHOOL,
    duration: 60,
    price: 30,
    maxParticipants: 12,
    requirements: ['Soccer cleats recommended', 'Water bottle'],
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
    venueId: '3',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['soccer', 'team sport', 'outdoor', 'fitness'],
  },
  {
    id: '4',
    name: 'Piano Lessons for Beginners',
    description: 'Individual piano instruction focusing on basic technique and simple songs.',
    category: ActivityCategory.MUSIC,
    ageGroup: AgeGroup.EARLY_ELEMENTARY,
    duration: 30,
    price: 50,
    maxParticipants: 1,
    requirements: ['No prior experience needed'],
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'],
    venueId: '4',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['piano', 'individual', 'music theory', 'classical'],
  },
  {
    id: '5',
    name: 'Robotics Workshop',
    description: 'Build and program simple robots using kid-friendly programming blocks.',
    category: ActivityCategory.TECHNOLOGY,
    ageGroup: AgeGroup.LATE_ELEMENTARY,
    duration: 120,
    price: 45,
    maxParticipants: 10,
    requirements: ['Basic reading skills', 'Interest in technology'],
    images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'],
    venueId: '5',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['robotics', 'programming', 'STEM', 'hands-on'],
  },
  {
    id: '6',
    name: 'Pottery Making',
    description: 'Learn basic pottery techniques and create your own ceramic masterpiece.',
    category: ActivityCategory.ARTS_CRAFTS,
    ageGroup: AgeGroup.EARLY_ELEMENTARY,
    duration: 90,
    price: 35,
    maxParticipants: 8,
    requirements: ['Apron provided', 'Pieces need 2 weeks to fire'],
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
    venueId: '2',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['pottery', 'ceramics', 'creative', 'tactile'],
  },
  {
    id: '7',
    name: 'Basketball Fundamentals',
    description: 'Learn dribbling, shooting, and passing in a fun, non-competitive environment.',
    category: ActivityCategory.SPORTS,
    ageGroup: AgeGroup.LATE_ELEMENTARY,
    duration: 75,
    price: 35,
    maxParticipants: 15,
    requirements: ['Basketball shoes', 'Athletic wear'],
    images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'],
    venueId: '3',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['basketball', 'team sport', 'fitness', 'skills'],
  },
  {
    id: '8',
    name: 'Group Guitar Class',
    description: 'Learn guitar basics in a small group setting with other young musicians.',
    category: ActivityCategory.MUSIC,
    ageGroup: AgeGroup.MIDDLE_SCHOOL,
    duration: 60,
    price: 40,
    maxParticipants: 6,
    requirements: ['Guitar rental available', 'Basic music reading helpful'],
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'],
    venueId: '4',
    difficulty: DifficultyLevel.BEGINNER,
    tags: ['guitar', 'group', 'rock', 'acoustic'],
  },
  {
    id: '9',
    name: 'Science Experiments',
    description: 'Hands-on chemistry and physics experiments designed for young scientists.',
    category: ActivityCategory.SCIENCE,
    ageGroup: AgeGroup.LATE_ELEMENTARY,
    duration: 90,
    price: 40,
    maxParticipants: 12,
    requirements: ['Safety goggles provided', 'Lab notebook included'],
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'],
    venueId: '5',
    difficulty: DifficultyLevel.INTERMEDIATE,
    tags: ['science', 'experiments', 'chemistry', 'physics'],
  },
  {
    id: '10',
    name: 'Birthday Party Package',
    description: 'Complete birthday party experience with decorations, games, and dedicated party host.',
    category: ActivityCategory.OTHER,
    ageGroup: AgeGroup.ALL_AGES,
    duration: 120,
    price: 200,
    maxParticipants: 15,
    requirements: ['2 weeks advance booking', 'Food can be brought or ordered'],
    images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800'],
    venueId: '1',
    difficulty: DifficultyLevel.ALL_LEVELS,
    tags: ['birthday', 'party', 'celebration', 'group'],
  },
];

// Update venues with their activities
mockVenues.forEach(venue => {
  venue.activities = mockActivities.filter(activity => activity.venueId === venue.id);
});

export const searchActivities = (query: string, category?: ActivityCategory, ageGroup?: AgeGroup): Activity[] => {
  return mockActivities.filter(activity => {
    const matchesQuery = !query || 
      activity.name.toLowerCase().includes(query.toLowerCase()) ||
      activity.description.toLowerCase().includes(query.toLowerCase()) ||
      activity.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    
    const matchesCategory = !category || activity.category === category;
    const matchesAgeGroup = !ageGroup || activity.ageGroup === ageGroup || activity.ageGroup === AgeGroup.ALL_AGES;
    
    return matchesQuery && matchesCategory && matchesAgeGroup;
  });
};

export const searchVenues = (query: string, category?: VenueCategory): Venue[] => {
  return mockVenues.filter(venue => {
    const matchesQuery = !query || 
      venue.name.toLowerCase().includes(query.toLowerCase()) ||
      venue.description.toLowerCase().includes(query.toLowerCase()) ||
      venue.location.city.toLowerCase().includes(query.toLowerCase());
    
    const matchesCategory = !category || venue.category === category;
    
    return matchesQuery && matchesCategory;
  });
};

export const getVenueById = (id: string): Venue | undefined => {
  return mockVenues.find(venue => venue.id === id);
};

export const getActivityById = (id: string): Activity | undefined => {
  return mockActivities.find(activity => activity.id === id);
};

export const getFeaturedVenues = (): Venue[] => {
  return mockVenues.filter(venue => venue.featured);
};

export const getPopularActivities = (): Activity[] => {
  return mockActivities.slice(0, 6); // Return first 6 as "popular"
};

// Mock bookings data
export const mockBookings = [
  {
    id: 'booking-1',
    venueId: '1',
    activityId: '1',
    userId: 'user-1',
    childrenIds: ['child-1'],
    date: '2024-02-15',
    time: '10:00',
    participants: 2,
    totalPrice: 30,
    status: 'confirmed' as const,
    notes: 'First time visit, child is excited about the playground!',
    createdAt: '2024-02-01T09:00:00Z',
  },
  {
    id: 'booking-2',
    venueId: '2',
    activityId: '2',
    userId: 'user-1',
    childrenIds: ['child-1'],
    date: '2024-02-20',
    time: '14:30',
    participants: 1,
    totalPrice: 25,
    status: 'pending' as const,
    notes: 'Please have art smocks ready.',
    createdAt: '2024-02-05T11:30:00Z',
  },
  {
    id: 'booking-3',
    venueId: '3',
    activityId: '3',
    userId: 'user-1',
    childrenIds: ['child-2'],
    date: '2024-02-10',
    time: '16:00',
    participants: 1,
    totalPrice: 30,
    status: 'completed' as const,
    notes: 'Great session! Child loved it.',
    createdAt: '2024-01-25T14:20:00Z',
  },
  {
    id: 'booking-4',
    venueId: '4',
    activityId: '4',
    userId: 'user-1',
    childrenIds: ['child-1'],
    date: '2024-02-25',
    time: '15:30',
    participants: 1,
    totalPrice: 50,
    status: 'confirmed' as const,
    createdAt: '2024-02-08T10:15:00Z',
  },
  {
    id: 'booking-5',
    venueId: '5',
    activityId: '5',
    userId: 'user-1',
    childrenIds: ['child-2'],
    date: '2024-01-30',
    time: '13:00',
    participants: 1,
    totalPrice: 45,
    status: 'cancelled' as const,
    notes: 'Child was sick, had to cancel.',
    createdAt: '2024-01-20T16:45:00Z',
  },
];

// Mock children data
export const mockChildren = [
  {
    id: 'child-1',
    name: 'Emma',
    birthDate: '2018-03-15',
    interests: ['arts-crafts', 'music'],
    allergies: ['peanuts'],
  },
  {
    id: 'child-2',
    name: 'Liam',
    birthDate: '2016-07-22',
    interests: ['sports', 'technology'],
    specialNeeds: ['ADHD - needs frequent breaks'],
  },
];

export const getBookingById = (id: string) => {
  return mockBookings.find(booking => booking.id === id);
};

export const getUserBookings = (userId: string) => {
  return mockBookings.filter(booking => booking.userId === userId);
};

export const getChildById = (id: string) => {
  return mockChildren.find(child => child.id === id);
};