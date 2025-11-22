import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';
import Button from '../components/Button';

const {width} = Dimensions.get('window');

const onboardingData = [
  {
    icon: '🧠',
    title: 'AI That Learns\nYour Routine',
    description:
      "Circle understands your daily patterns so it knows when something's wrong—without you lifting a finger.",
  },
  {
    icon: '👥',
    title: 'Your Trusted Circle\nProtects You',
    description:
      "Invite friends and family to your Circle. They'll get alerts only when you might need help.",
  },
  {
    icon: '🔔',
    title: 'Always Watching,\nNever Intrusive',
    description:
      "Works quietly in the background. You'll only hear from us when something's actually wrong.",
  },
];

const OnboardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Registration');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  const currentSlide = onboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>{currentSlide.icon}</Text>
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.description}>{currentSlide.description}</Text>

        <View style={styles.indicators}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          disabled={currentIndex === 0}>
          <Text
            style={[
              styles.backButtonText,
              currentIndex === 0 && styles.backButtonDisabled,
            ]}>
            {currentIndex === 0 ? '' : '← Back'}
          </Text>
        </TouchableOpacity>
        <Button
          title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next →'}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
  },
  icon: {
    fontSize: 120,
    marginBottom: 40,
  },
  title: {
    ...Typography.title1,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.medium,
    lineHeight: 34,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
    marginBottom: 60,
  },
  indicators: {
    flexDirection: 'row',
    gap: Spacing.small,
    marginBottom: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.xxLarge,
  },
  backButton: {
    minWidth: 80,
  },
  backButtonText: {
    ...Typography.body,
    color: Colors.primary,
  },
  backButtonDisabled: {
    opacity: 0,
  },
  nextButton: {
    flex: 1,
    marginLeft: Spacing.medium,
  },
});

export default OnboardingScreen;

