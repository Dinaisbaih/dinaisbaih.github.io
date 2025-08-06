import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, Chip, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '@/theme';
import { VenueCategory, AgeGroup, PartnershipRequest } from '@types/index';

const PartnershipScreen: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<Partial<PartnershipRequest>>({
    venueName: '',
    ownerName: '',
    email: '',
    phone: '',
    venueType: undefined,
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
    },
    description: '',
    website: '',
    estimatedCapacity: 0,
    targetAgeGroups: [],
    proposedActivities: [],
  });
  
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AgeGroup[]>([]);
  const [activityInput, setActivityInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const venueTypes = [
    { key: VenueCategory.INDOOR_PLAYGROUND, label: 'Indoor Playground', icon: 'play' },
    { key: VenueCategory.ART_STUDIO, label: 'Art Studio', icon: 'palette' },
    { key: VenueCategory.SPORTS_CENTER, label: 'Sports Center', icon: 'soccer' },
    { key: VenueCategory.MUSIC_SCHOOL, label: 'Music School', icon: 'music' },
    { key: VenueCategory.EDUCATIONAL_CENTER, label: 'Educational Center', icon: 'school' },
    { key: VenueCategory.OUTDOOR_ADVENTURE, label: 'Outdoor Adventure', icon: 'tree' },
    { key: VenueCategory.DANCE_STUDIO, label: 'Dance Studio', icon: 'dance-ballroom' },
    { key: VenueCategory.SWIMMING_POOL, label: 'Swimming Pool', icon: 'pool' },
    { key: VenueCategory.TRAMPOLINE_PARK, label: 'Trampoline Park', icon: 'human-handsup' },
    { key: VenueCategory.CLIMBING_GYM, label: 'Climbing Gym', icon: 'hiking' },
    { key: VenueCategory.MAKER_SPACE, label: 'Maker Space', icon: 'tools' },
    { key: VenueCategory.COOKING_SCHOOL, label: 'Cooking School', icon: 'chef-hat' },
    { key: VenueCategory.THEATER, label: 'Theater', icon: 'drama-masks' },
    { key: VenueCategory.MUSEUM, label: 'Museum', icon: 'bank' },
    { key: VenueCategory.OTHER, label: 'Other', icon: 'dots-horizontal' },
  ];

  const ageGroups = [
    { key: AgeGroup.TODDLER, label: '0-3 years' },
    { key: AgeGroup.PRESCHOOL, label: '4-5 years' },
    { key: AgeGroup.EARLY_ELEMENTARY, label: '6-8 years' },
    { key: AgeGroup.LATE_ELEMENTARY, label: '9-11 years' },
    { key: AgeGroup.MIDDLE_SCHOOL, label: '12-14 years' },
    { key: AgeGroup.HIGH_SCHOOL, label: '15-18 years' },
    { key: AgeGroup.ALL_AGES, label: 'All Ages' },
  ];

  const handleAgeGroupToggle = (ageGroup: AgeGroup) => {
    setSelectedAgeGroups(prev => {
      const newSelection = prev.includes(ageGroup)
        ? prev.filter(ag => ag !== ageGroup)
        : [...prev, ageGroup];
      
      setFormData(prevForm => ({
        ...prevForm,
        targetAgeGroups: newSelection,
      }));
      
      return newSelection;
    });
  };

  const handleAddActivity = () => {
    if (activityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        proposedActivities: [...(prev.proposedActivities || []), activityInput.trim()],
      }));
      setActivityInput('');
    }
  };

  const handleRemoveActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      proposedActivities: prev.proposedActivities?.filter((_, i) => i !== index) || [],
    }));
  };

  const validateForm = (): boolean => {
    const required = ['venueName', 'ownerName', 'email', 'phone', 'venueType', 'description'];
    
    for (const field of required) {
      if (!formData[field as keyof PartnershipRequest]) {
        Alert.alert('Error', `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (!formData.location?.address || !formData.location?.city) {
      Alert.alert('Error', 'Please provide venue address and city');
      return false;
    }

    if (selectedAgeGroups.length === 0) {
      Alert.alert('Error', 'Please select at least one target age group');
      return false;
    }

    if (!formData.proposedActivities || formData.proposedActivities.length === 0) {
      Alert.alert('Error', 'Please add at least one proposed activity');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Application Submitted!',
        'Thank you for your interest in partnering with KidVenture. We will review your application and get back to you within 2-3 business days.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <LinearGradient
            colors={theme.colors.gradient.primary}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>Partner With KidVenture</Text>
            <Text style={styles.headerSubtitle}>
              Join our network of amazing venues and reach thousands of families!
            </Text>
          </LinearGradient>

          {/* Benefits Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why Partner With Us?</Text>
            <View style={styles.benefitsGrid}>
              <Card style={styles.benefitCard}>
                <View style={styles.benefitContent}>
                  <Icon name="account-group" size={32} color={theme.colors.primary} />
                  <Text style={styles.benefitTitle}>Reach More Families</Text>
                  <Text style={styles.benefitDescription}>
                    Connect with thousands of parents looking for activities
                  </Text>
                </View>
              </Card>
              
              <Card style={styles.benefitCard}>
                <View style={styles.benefitContent}>
                  <Icon name="chart-line" size={32} color={theme.colors.secondary} />
                  <Text style={styles.benefitTitle}>Grow Your Business</Text>
                  <Text style={styles.benefitDescription}>
                    Increase bookings and revenue through our platform
                  </Text>
                </View>
              </Card>
              
              <Card style={styles.benefitCard}>
                <View style={styles.benefitContent}>
                  <Icon name="star" size={32} color={theme.colors.warning} />
                  <Text style={styles.benefitTitle}>Build Your Brand</Text>
                  <Text style={styles.benefitDescription}>
                    Showcase your venue and get reviews from happy families
                  </Text>
                </View>
              </Card>
              
              <Card style={styles.benefitCard}>
                <View style={styles.benefitContent}>
                  <Icon name="headset" size={32} color={theme.colors.info} />
                  <Text style={styles.benefitTitle}>Dedicated Support</Text>
                  <Text style={styles.benefitDescription}>
                    Get ongoing support from our partnership team
                  </Text>
                </View>
              </Card>
            </View>
          </View>

          {/* Application Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Partnership Application</Text>
            
            {/* Basic Information */}
            <Card style={styles.formCard}>
              <Text style={styles.formSectionTitle}>Basic Information</Text>
              
              <TextInput
                label="Venue Name *"
                value={formData.venueName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, venueName: text }))}
                style={styles.input}
                mode="outlined"
              />
              
              <TextInput
                label="Owner/Manager Name *"
                value={formData.ownerName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, ownerName: text }))}
                style={styles.input}
                mode="outlined"
              />
              
              <TextInput
                label="Email Address *"
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                keyboardType="email-address"
                style={styles.input}
                mode="outlined"
              />
              
              <TextInput
                label="Phone Number *"
                value={formData.phone}
                onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                keyboardType="phone-pad"
                style={styles.input}
                mode="outlined"
              />
              
              <TextInput
                label="Website (Optional)"
                value={formData.website}
                onChangeText={(text) => setFormData(prev => ({ ...prev, website: text }))}
                keyboardType="url"
                style={styles.input}
                mode="outlined"
              />
            </Card>

            {/* Venue Type */}
            <Card style={styles.formCard}>
              <Text style={styles.formSectionTitle}>Venue Type *</Text>
              <View style={styles.venueTypeGrid}>
                {venueTypes.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.venueTypeItem,
                      formData.venueType === type.key && styles.venueTypeItemSelected,
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, venueType: type.key }))}
                  >
                    <Icon 
                      name={type.icon} 
                      size={24} 
                      color={formData.venueType === type.key ? theme.colors.background : theme.colors.primary} 
                    />
                    <Text style={[
                      styles.venueTypeText,
                      formData.venueType === type.key && styles.venueTypeTextSelected,
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>

            {/* Location */}
            <Card style={styles.formCard}>
              <Text style={styles.formSectionTitle}>Location *</Text>
              
              <TextInput
                label="Street Address *"
                value={formData.location?.address}
                onChangeText={(text) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, address: text } 
                }))}
                style={styles.input}
                mode="outlined"
              />
              
              <View style={styles.row}>
                <TextInput
                  label="City *"
                  value={formData.location?.city}
                  onChangeText={(text) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, city: text } 
                  }))}
                  style={[styles.input, styles.halfWidth]}
                  mode="outlined"
                />
                
                <TextInput
                  label="State"
                  value={formData.location?.state}
                  onChangeText={(text) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, state: text } 
                  }))}
                  style={[styles.input, styles.halfWidth]}
                  mode="outlined"
                />
              </View>
              
              <TextInput
                label="ZIP Code"
                value={formData.location?.zipCode}
                onChangeText={(text) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, zipCode: text } 
                }))}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
            </Card>

            {/* Target Age Groups */}
            <Card style={styles.formCard}>
              <Text style={styles.formSectionTitle}>Target Age Groups *</Text>
              <Text style={styles.formHelperText}>
                Select all age groups your venue caters to:
              </Text>
              <View style={styles.chipContainer}>
                {ageGroups.map((group) => (
                  <Chip
                    key={group.key}
                    selected={selectedAgeGroups.includes(group.key)}
                    onPress={() => handleAgeGroupToggle(group.key)}
                    style={styles.chip}
                    textStyle={styles.chipText}
                  >
                    {group.label}
                  </Chip>
                ))}
              </View>
            </Card>

            {/* Activities */}
            <Card style={styles.formCard}>
              <Text style={styles.formSectionTitle}>Proposed Activities *</Text>
              <Text style={styles.formHelperText}>
                List the activities and programs you offer:
              </Text>
              
              <View style={styles.activityInputContainer}>
                <TextInput
                  label="Add Activity"
                  value={activityInput}
                  onChangeText={setActivityInput}
                  style={[styles.input, styles.activityInput]}
                  mode="outlined"
                  onSubmitEditing={handleAddActivity}
                />
                <Button
                  mode="contained"
                  onPress={handleAddActivity}
                  style={styles.addButton}
                  disabled={!activityInput.trim()}
                >
                  Add
                </Button>
              </View>
              
              {formData.proposedActivities && formData.proposedActivities.length > 0 && (
                <View style={styles.activitiesList}>
                  {formData.proposedActivities.map((activity, index) => (
                    <View key={index} style={styles.activityItem}>
                      <Text style={styles.activityText}>{activity}</Text>
                      <TouchableOpacity onPress={() => handleRemoveActivity(index)}>
                        <Icon name="close" size={20} color={theme.colors.error} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </Card>

            {/* Additional Information */}
            <Card style={styles.formCard}>
              <Text style={styles.formSectionTitle}>Additional Information</Text>
              
              <TextInput
                label="Estimated Capacity"
                value={formData.estimatedCapacity?.toString()}
                onChangeText={(text) => setFormData(prev => ({ 
                  ...prev, 
                  estimatedCapacity: parseInt(text) || 0 
                }))}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              
              <TextInput
                label="Tell us about your venue *"
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={4}
                style={styles.input}
                mode="outlined"
                placeholder="Describe your venue, facilities, unique features, experience with children's activities, etc."
              />
            </Card>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Partnership Application'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xl,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xxxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.background,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.background,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  benefitContent: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  benefitTitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  benefitDescription: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  formCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  formSectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  formHelperText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  venueTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  venueTypeItem: {
    width: '48%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  venueTypeItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  venueTypeText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  venueTypeTextSelected: {
    color: theme.colors.background,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  chipText: {
    fontSize: theme.typography.fontSize.sm,
  },
  activityInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: theme.spacing.md,
  },
  activityInput: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  addButton: {
    marginBottom: theme.spacing.md,
  },
  activitiesList: {
    marginTop: theme.spacing.sm,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  activityText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text,
    flex: 1,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  submitButtonContent: {
    paddingVertical: theme.spacing.sm,
  },
});

export default PartnershipScreen;