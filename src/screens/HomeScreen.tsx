import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '@/theme';
import { RootStackParamList, Venue, Activity, ActivityCategory } from '@types/index';
import { mockVenues, mockActivities, getUserBookings } from '@services/mockData';
import VenueCard from '@components/VenueCard';
import ActivityCard from '@components/ActivityCard';
import SearchBar from '@components/SearchBar';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredVenues, setFeaturedVenues] = useState<Venue[]>([]);
  const [popularActivities, setPopularActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Load featured venues and popular activities
    setFeaturedVenues(mockVenues.filter(venue => venue.featured).slice(0, 5));
    setPopularActivities(mockActivities.slice(0, 10));
  }, []);

  const handleSearch = () => {
    navigation.navigate('Search', { 
      filters: { query: searchQuery } 
    });
  };

  const handleVenuePress = (venue: Venue) => {
    navigation.navigate('VenueDetails', { venueId: venue.id });
  };

  const handleActivityPress = (activity: Activity) => {
    navigation.navigate('ActivityDetails', { activityId: activity.id });
  };

  const handleCategoryPress = (category: ActivityCategory) => {
    navigation.navigate('Search', { 
      filters: { category } 
    });
  };

  const categories = [
    { key: ActivityCategory.SPORTS, icon: 'soccer', color: theme.colors.categories.sports },
    { key: ActivityCategory.ARTS_CRAFTS, icon: 'palette', color: theme.colors.categories.arts },
    { key: ActivityCategory.MUSIC, icon: 'music', color: theme.colors.categories.music },
    { key: ActivityCategory.DANCE, icon: 'dance-ballroom', color: theme.colors.categories.dance },
    { key: ActivityCategory.EDUCATIONAL, icon: 'school', color: theme.colors.categories.educational },
    { key: ActivityCategory.OUTDOOR, icon: 'tree', color: theme.colors.categories.outdoor },
  ];

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor: item.color }]}
      onPress={() => handleCategoryPress(item.key)}
    >
      <Icon name={item.icon} size={24} color={theme.colors.background} />
      <Text style={styles.categoryText}>
        {item.key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Text>
    </TouchableOpacity>
  );

  const renderVenue = ({ item }: { item: Venue }) => (
    <VenueCard 
      venue={item} 
      onPress={handleVenuePress}
      style={styles.venueCard}
    />
  );

  const renderActivity = ({ item }: { item: Activity }) => (
    <ActivityCard 
      activity={item}
      onPress={handleActivityPress}
      style={styles.activityCard}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={theme.colors.gradient.primary}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.appName}>KidVenture</Text>
              <Text style={styles.subtitle}>
                Discover amazing activities for your little ones!
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.partnerButton}
              onPress={() => navigation.navigate('Partnership')}
            >
              <Icon name="handshake" size={20} color={theme.colors.background} />
              <Text style={styles.partnerButtonText}>Partner</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmit={handleSearch}
              placeholder="Search activities or venues..."
            />
          </View>
        </LinearGradient>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('MyBookings')}
            >
              <LinearGradient
                colors={theme.colors.gradient.primary}
                style={styles.quickActionGradient}
              >
                <Icon name="calendar-check" size={24} color={theme.colors.background} />
                <Text style={styles.quickActionText}>My Bookings</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Map')}
            >
              <LinearGradient
                colors={theme.colors.gradient.accent}
                style={styles.quickActionGradient}
              >
                <Icon name="map-marker" size={24} color={theme.colors.background} />
                <Text style={styles.quickActionText}>Find Nearby</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => navigation.navigate('Favorites')}
            >
              <LinearGradient
                colors={theme.colors.gradient.secondary}
                style={styles.quickActionGradient}
              >
                <Icon name="heart" size={24} color={theme.colors.background} />
                <Text style={styles.quickActionText}>My Favorites</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Venues */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Venues</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredVenues}
            renderItem={renderVenue}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Popular Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Activities</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={popularActivities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <LinearGradient
            colors={theme.colors.gradient.ocean}
            style={styles.statsContainer}
          >
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>150+</Text>
                <Text style={styles.statLabel}>Partner Venues</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Activities</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>10K+</Text>
                <Text style={styles.statLabel}>Happy Kids</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>Satisfaction</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.background,
    fontFamily: theme.typography.fontFamily.regular,
    opacity: 0.9,
  },
  appName: {
    fontSize: theme.typography.fontSize.display,
    color: theme.colors.background,
    fontFamily: theme.typography.fontFamily.bold,
    marginVertical: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.background,
    fontFamily: theme.typography.fontFamily.regular,
    opacity: 0.8,
  },
  partnerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  partnerButtonText: {
    color: theme.colors.background,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: theme.spacing.xs,
  },
  searchContainer: {
    marginTop: theme.spacing.md,
  },
  section: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
  },
  seeAllText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.primary,
  },
  categoriesContainer: {
    paddingRight: theme.spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.md,
    ...theme.shadows.sm,
  },
  categoryText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.background,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  quickActionGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  quickActionText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.background,
    marginTop: theme.spacing.xs,
  },
  horizontalList: {
    paddingRight: theme.spacing.md,
  },
  venueCard: {
    marginRight: theme.spacing.md,
  },
  activityCard: {
    marginRight: theme.spacing.md,
  },
  statsContainer: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.background,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.background,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    opacity: 0.9,
  },
});

export default HomeScreen;