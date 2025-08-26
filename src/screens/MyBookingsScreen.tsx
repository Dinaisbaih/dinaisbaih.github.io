import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '@/theme';
import BookingCard from '@/components/BookingCard';
import { 
  getUserBookings, 
  getVenueById, 
  getActivityById 
} from '@/services/mockData';
import { RootStackParamList, BookingStatus } from '@types/index';

type MyBookingsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type FilterType = 'all' | 'upcoming' | 'completed' | 'cancelled';

const MyBookingsScreen: React.FC = () => {
  const navigation = useNavigation<MyBookingsScreenNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  
  // Mock user ID - in real app this would come from auth
  const userId = 'user-1';
  const allBookings = getUserBookings(userId);

  const filteredBookings = useMemo(() => {
    const now = new Date();
    
    return allBookings.filter(booking => {
      switch (selectedFilter) {
        case 'upcoming':
          return (booking.status === 'confirmed' || booking.status === 'pending') && 
                 new Date(`${booking.date}T${booking.time}`) > now;
        case 'completed':
          return booking.status === 'completed';
        case 'cancelled':
          return booking.status === 'cancelled' || booking.status === 'no-show';
        default:
          return true;
      }
    }).sort((a, b) => {
      // Sort by date, newest first
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
  }, [allBookings, selectedFilter]);

  const handleBookingPress = (bookingId: string) => {
    navigation.navigate('BookingDetails', { bookingId });
  };

  const getFilterCount = (filterType: FilterType) => {
    const now = new Date();
    switch (filterType) {
      case 'upcoming':
        return allBookings.filter(b => 
          (b.status === 'confirmed' || b.status === 'pending') && 
          new Date(`${b.date}T${b.time}`) > now
        ).length;
      case 'completed':
        return allBookings.filter(b => b.status === 'completed').length;
      case 'cancelled':
        return allBookings.filter(b => b.status === 'cancelled' || b.status === 'no-show').length;
      default:
        return allBookings.length;
    }
  };

  const renderBookingCard = ({ item: booking }) => {
    const venue = getVenueById(booking.venueId);
    const activity = getActivityById(booking.activityId);
    
    if (!venue || !activity) return null;
    
    return (
      <BookingCard
        booking={booking}
        venue={venue}
        activity={activity}
        onPress={() => handleBookingPress(booking.id)}
      />
    );
  };

  const renderFilterTab = (filterType: FilterType, label: string, icon: string) => {
    const isSelected = selectedFilter === filterType;
    const count = getFilterCount(filterType);
    
    return (
      <TouchableOpacity
        style={[styles.filterTab, isSelected && styles.filterTabActive]}
        onPress={() => setSelectedFilter(filterType)}
      >
        <Icon 
          name={icon} 
          size={20} 
          color={isSelected ? theme.colors.background : theme.colors.textSecondary} 
        />
        <Text style={[
          styles.filterTabText, 
          isSelected && styles.filterTabTextActive
        ]}>
          {label}
        </Text>
        {count > 0 && (
          <View style={[
            styles.countBadge,
            isSelected && styles.countBadgeActive
          ]}>
            <Text style={[
              styles.countBadgeText,
              isSelected && styles.countBadgeTextActive
            ]}>
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    const getEmptyStateConfig = () => {
      switch (selectedFilter) {
        case 'upcoming':
          return {
            icon: 'calendar-clock',
            title: 'No Upcoming Bookings',
            message: 'You don\'t have any upcoming activities scheduled.',
            actionText: 'Explore Activities',
          };
        case 'completed':
          return {
            icon: 'check-all',
            title: 'No Completed Bookings',
            message: 'Your completed activities will appear here.',
          };
        case 'cancelled':
          return {
            icon: 'cancel',
            title: 'No Cancelled Bookings',
            message: 'Your cancelled bookings will appear here.',
          };
        default:
          return {
            icon: 'calendar-blank',
            title: 'No Bookings Yet',
            message: 'Start exploring activities and make your first booking!',
            actionText: 'Browse Activities',
          };
      }
    };

    const config = getEmptyStateConfig();

    return (
      <View style={styles.emptyState}>
        <Icon name={config.icon} size={64} color={theme.colors.textLight} />
        <Text style={styles.emptyStateTitle}>{config.title}</Text>
        <Text style={styles.emptyStateMessage}>{config.message}</Text>
        {config.actionText && (
          <TouchableOpacity 
            style={styles.emptyStateButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.emptyStateButtonText}>{config.actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>
          {allBookings.length} total booking{allBookings.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {renderFilterTab('all', 'All', 'format-list-bulleted')}
        {renderFilterTab('upcoming', 'Upcoming', 'calendar-clock')}
        {renderFilterTab('completed', 'Completed', 'check-all')}
        {renderFilterTab('cancelled', 'Cancelled', 'cancel')}
      </View>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  filterTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    marginHorizontal: 2,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  filterTabTextActive: {
    color: theme.colors.background,
  },
  countBadge: {
    backgroundColor: theme.colors.textSecondary,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    marginLeft: theme.spacing.xs,
    minWidth: 20,
    alignItems: 'center',
  },
  countBadgeActive: {
    backgroundColor: theme.colors.background,
  },
  countBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.background,
  },
  countBadgeTextActive: {
    color: theme.colors.primary,
  },
  listContainer: {
    paddingVertical: theme.spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  emptyStateMessage: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.md,
    marginBottom: theme.spacing.xl,
  },
  emptyStateButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  emptyStateButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.background,
  },
});

export default MyBookingsScreen;