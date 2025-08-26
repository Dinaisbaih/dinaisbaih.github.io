import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '@/theme';
import { BookingStatus } from '@types/index';

interface BookingCardProps {
  booking: {
    id: string;
    date: string;
    time: string;
    status: BookingStatus;
    totalPrice: number;
    participants: number;
  };
  venue: {
    name: string;
    images: string[];
  };
  activity: {
    name: string;
    duration: number;
  };
  onPress: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  venue,
  activity,
  onPress,
}) => {
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
      weekday: 'short',
      month: 'short',
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

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: venue.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.activityName} numberOfLines={1}>
            {activity.name}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Icon 
              name={getStatusIcon(booking.status)} 
              size={12} 
              color={theme.colors.background} 
            />
            <Text style={styles.statusText}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.venueName} numberOfLines={1}>
          {venue.name}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="calendar" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>
              {formatDate(booking.date)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="clock-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>
              {formatTime(booking.time)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="account-group" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>
              {booking.participants}
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.duration}>
            {activity.duration} mins
          </Text>
          <Text style={styles.price}>
            ${booking.totalPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    flexDirection: 'row',
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  image: {
    width: 100,
    height: 120,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  activityName: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.round,
  },
  statusText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: 2,
  },
  venueName: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginLeft: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
  },
  price: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
});

export default BookingCard;