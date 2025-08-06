import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '@/theme';
import { Venue, VenueCardProps } from '@types/index';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const VenueCard: React.FC<VenueCardProps & { style?: ViewStyle }> = ({
  venue,
  onPress,
  showDistance = false,
  userLocation,
  style,
}) => {
  const getCategoryIcon = (category: string): string => {
    const iconMap: { [key: string]: string } = {
      'indoor-playground': 'play',
      'art-studio': 'palette',
      'sports-center': 'soccer',
      'music-school': 'music',
      'educational-center': 'school',
      'outdoor-adventure': 'tree',
      'dance-studio': 'dance-ballroom',
      'swimming-pool': 'pool',
      'trampoline-park': 'human-handsup',
      'climbing-gym': 'hiking',
      'maker-space': 'tools',
      'cooking-school': 'chef-hat',
      'theater': 'drama-masks',
      'museum': 'bank',
      'other': 'dots-horizontal',
    };
    return iconMap[category] || 'map-marker';
  };

  const getPriceRangeText = (priceRange: string): string => {
    const priceMap: { [key: string]: string } = {
      'free': 'Free',
      'low': '$',
      'medium': '$$',
      'high': '$$$',
      'premium': '$$$$',
    };
    return priceMap[priceRange] || '$$';
  };

  const calculateDistance = (): string => {
    if (!userLocation || !showDistance) return '';
    
    // Simple distance calculation (not accurate for production)
    const lat1 = userLocation.latitude;
    const lon1 = userLocation.longitude;
    const lat2 = venue.location.latitude;
    const lon2 = venue.location.longitude;
    
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={12} color={theme.colors.warning} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half-full" size={12} color={theme.colors.warning} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={12} color={theme.colors.textLight} />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress(venue)}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: venue.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Overlay with category and price */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          >
            <View style={styles.imageOverlayContent}>
              <View style={styles.categoryBadge}>
                <Icon 
                  name={getCategoryIcon(venue.category)} 
                  size={14} 
                  color={theme.colors.background} 
                />
                <Text style={styles.categoryText}>
                  {venue.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </View>
              
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>
                  {getPriceRangeText(venue.priceRange)}
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Featured badge */}
          {venue.featured && (
            <View style={styles.featuredBadge}>
              <Icon name="star" size={12} color={theme.colors.background} />
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}

          {/* Distance badge */}
          {showDistance && userLocation && (
            <View style={styles.distanceBadge}>
              <Icon name="map-marker" size={12} color={theme.colors.background} />
              <Text style={styles.distanceText}>{calculateDistance()}</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>
              {venue.name}
            </Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(venue.rating)}
              </View>
              <Text style={styles.ratingText}>
                {venue.rating} ({venue.reviewCount})
              </Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {venue.description}
          </Text>

          <View style={styles.locationContainer}>
            <Icon name="map-marker-outline" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {venue.location.address}, {venue.location.city}
            </Text>
          </View>

          {/* Age Groups */}
          <View style={styles.ageGroupsContainer}>
            <Text style={styles.ageGroupsLabel}>Ages:</Text>
            <View style={styles.ageGroupsChips}>
              {venue.ageGroups.slice(0, 3).map((ageGroup, index) => (
                <View key={ageGroup} style={styles.ageGroupChip}>
                  <Text style={styles.ageGroupChipText}>
                    {ageGroup === 'all' ? 'All' : ageGroup}
                  </Text>
                </View>
              ))}
              {venue.ageGroups.length > 3 && (
                <Text style={styles.moreAgeGroups}>
                  +{venue.ageGroups.length - 3}
                </Text>
              )}
            </View>
          </View>

          {/* Activities count */}
          <View style={styles.activitiesContainer}>
            <Icon name="calendar-multiple" size={14} color={theme.colors.primary} />
            <Text style={styles.activitiesText}>
              {venue.activities.length} {venue.activities.length === 1 ? 'activity' : 'activities'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
  },
  imageOverlayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  categoryText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: theme.spacing.xs,
  },
  priceBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  priceText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.bold,
  },
  featuredBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  featuredText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: theme.spacing.xs,
  },
  distanceBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  distanceText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: theme.spacing.xs,
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: theme.spacing.xs,
  },
  ratingText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.sm,
    marginBottom: theme.spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  locationText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    flex: 1,
  },
  ageGroupsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  ageGroupsLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  ageGroupsChips: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ageGroupChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
  },
  ageGroupChipText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text,
  },
  moreAgeGroups: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
  },
  activitiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activitiesText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
});

export default VenueCard;