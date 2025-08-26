import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '@/theme';
import { 
  getBookingById, 
  getVenueById, 
  getActivityById, 
  getChildById 
} from '@/services/mockData';
import { BookingStatus } from '@types/index';

type BookingDetailsScreenRouteProp = RouteProp<
  { BookingDetails: { bookingId: string } },
  'BookingDetails'
>;

const BookingDetailsScreen: React.FC = () => {
  const route = useRoute<BookingDetailsScreenRouteProp>();
  const navigation = useNavigation();
  const { bookingId } = route.params;
  
  const [isLoading, setIsLoading] = useState(false);
  
  const booking = getBookingById(bookingId);
  const venue = booking ? getVenueById(booking.venueId) : null;
  const activity = booking ? getActivityById(booking.activityId) : null;
  const children = booking ? booking.childrenIds.map(id => getChildById(id)).filter(Boolean) : [];

  if (!booking || !venue || !activity) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={64} color={theme.colors.error} />
        <Text style={styles.errorTitle}>Booking Not Found</Text>
        <Text style={styles.errorText}>
          Sorry, we couldn't find the booking details you're looking for.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'cancelled':
        return theme.colors.error;
      case 'completed':
        return theme.colors.info;
      case 'no-show':
        return theme.colors.textSecondary;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'check-circle';
      case 'pending':
        return 'clock-outline';
      case 'cancelled':
        return 'cancel';
      case 'completed':
        return 'check-all';
      case 'no-show':
        return 'account-cancel';
      default:
        return 'help-circle';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleCallVenue = () => {
    Linking.openURL(`tel:${venue.contact.phone}`);
  };

  const handleEmailVenue = () => {
    Linking.openURL(`mailto:${venue.contact.email}`);
  };

  const handleGetDirections = () => {
    const url = `https://maps.google.com/?q=${venue.location.latitude},${venue.location.longitude}`;
    Linking.openURL(url);
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking? This action cannot be undone.',
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: () => {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('Booking Cancelled', 'Your booking has been cancelled successfully.');
              navigation.goBack();
            }, 1500);
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    Alert.alert(
      'Reschedule Booking',
      'Rescheduling feature will be available soon. Please contact the venue directly for now.',
      [{ text: 'OK' }]
    );
  };

  const canCancelOrReschedule = booking.status === 'confirmed' || booking.status === 'pending';
  const isUpcoming = new Date(`${booking.date}T${booking.time}`) > new Date();

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: activity.images[0] || venue.images[0] }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{activity.name}</Text>
          <Text style={styles.headerSubtitle}>{venue.name}</Text>
        </View>
      </View>

      {/* Booking Status */}
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
          <Icon 
            name={getStatusIcon(booking.status)} 
            size={20} 
            color={theme.colors.background} 
          />
          <Text style={styles.statusText}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
      </View>

      {/* Booking Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        
        <View style={styles.detailRow}>
          <Icon name="calendar" size={24} color={theme.colors.primary} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>
              {formatDate(booking.date)} at {formatTime(booking.time)}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="account-group" size={24} color={theme.colors.primary} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Participants</Text>
            <Text style={styles.detailValue}>{booking.participants} participant(s)</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="clock-outline" size={24} color={theme.colors.primary} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{activity.duration} minutes</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="currency-usd" size={24} color={theme.colors.primary} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Total Price</Text>
            <Text style={styles.detailValue}>${booking.totalPrice}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Icon name="information" size={24} color={theme.colors.primary} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Booking ID</Text>
            <Text style={styles.detailValue}>{booking.id}</Text>
          </View>
        </View>
      </View>

      {/* Children Information */}
      {children.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Children</Text>
          {children.map((child) => (
            <View key={child?.id} style={styles.childCard}>
              <View style={styles.childHeader}>
                <Icon name="account-child" size={24} color={theme.colors.secondary} />
                <Text style={styles.childName}>{child?.name}</Text>
              </View>
              {child?.allergies && child.allergies.length > 0 && (
                <View style={styles.childDetail}>
                  <Text style={styles.childDetailLabel}>Allergies:</Text>
                  <Text style={styles.childDetailValue}>{child.allergies.join(', ')}</Text>
                </View>
              )}
              {child?.specialNeeds && child.specialNeeds.length > 0 && (
                <View style={styles.childDetail}>
                  <Text style={styles.childDetailLabel}>Special Needs:</Text>
                  <Text style={styles.childDetailValue}>{child.specialNeeds.join(', ')}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Notes */}
      {booking.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <View style={styles.notesContainer}>
            <Text style={styles.notesText}>{booking.notes}</Text>
          </View>
        </View>
      )}

      {/* Venue Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Venue Information</Text>
        
        <View style={styles.venueCard}>
          <Image
            source={{ uri: venue.images[0] }}
            style={styles.venueImage}
            resizeMode="cover"
          />
          <View style={styles.venueInfo}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text style={styles.venueAddress}>{venue.location.address}</Text>
            <Text style={styles.venueCity}>
              {venue.location.city}, {venue.location.state} {venue.location.zipCode}
            </Text>
          </View>
        </View>

        {/* Contact Actions */}
        <View style={styles.contactActions}>
          <TouchableOpacity style={styles.contactButton} onPress={handleCallVenue}>
            <Icon name="phone" size={20} color={theme.colors.background} />
            <Text style={styles.contactButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactButton} onPress={handleEmailVenue}>
            <Icon name="email" size={20} color={theme.colors.background} />
            <Text style={styles.contactButtonText}>Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactButton} onPress={handleGetDirections}>
            <Icon name="directions" size={20} color={theme.colors.background} />
            <Text style={styles.contactButtonText}>Directions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      {isUpcoming && canCancelOrReschedule && (
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={handleReschedule}
            disabled={isLoading}
          >
            <Icon name="calendar-edit" size={20} color={theme.colors.background} />
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={handleCancelBooking}
            disabled={isLoading}
          >
            <Icon name="cancel" size={20} color={theme.colors.background} />
            <Text style={styles.actionButtonText}>
              {isLoading ? 'Cancelling...' : 'Cancel Booking'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  errorText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  backButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  backButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  headerContent: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.background,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.background,
    opacity: 0.9,
  },
  statusContainer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginLeft: theme.spacing.xs,
  },
  section: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  detailContent: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  detailLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  detailValue: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
  },
  childCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  childName: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  childDetail: {
    marginBottom: theme.spacing.xs,
  },
  childDetailLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textSecondary,
  },
  childDetailValue: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text,
  },
  notesContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  notesText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text,
    lineHeight: 20,
  },
  venueCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  venueImage: {
    width: 80,
    height: 80,
  },
  venueInfo: {
    flex: 1,
    padding: theme.spacing.md,
  },
  venueName: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  venueAddress: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  venueCity: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  contactButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginLeft: theme.spacing.xs,
  },
  actionSection: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.xs,
  },
  rescheduleButton: {
    backgroundColor: theme.colors.secondary,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
  },
  actionButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginLeft: theme.spacing.xs,
  },
});

export default BookingDetailsScreen;