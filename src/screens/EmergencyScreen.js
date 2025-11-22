import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';
import Button from '../components/Button';

const EmergencyScreen = ({route, navigation}) => {
  const {tier = 1} = route?.params || {};

  const handleResponse = (response) => {
    if (response === 'safe') {
      navigation.goBack();
    } else if (response === 'help') {
      navigation.navigate('Emergency', {tier: 3});
    }
  };

  if (tier === 1) {
    return (
      <LinearGradient
        colors={Colors.learningGradient}
        style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.icon}>👋</Text>
            <Text style={[styles.title, styles.tier1Title]}>
              Just Checking In
            </Text>
            <Text style={[styles.text, styles.tier1Text]}>
              You're usually home by now. Everything okay?
            </Text>
            <Button
              title="I'm Safe"
              onPress={() => handleResponse('safe')}
              style={[styles.button, styles.safeButton]}
            />
            <Button
              title="Need More Time"
              onPress={() => handleResponse('time')}
              variant="secondary"
              style={styles.button}
            />
            <TouchableOpacity
              onPress={() => handleResponse('help')}
              style={styles.helpButton}>
              <Text style={styles.helpButtonText}>Need Help</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (tier === 2) {
    return (
      <LinearGradient
        colors={['#FFF3E0', '#FFE0B2']}
        style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <Text style={[styles.icon, styles.tier2Icon]}>⚠️</Text>
            <Text style={[styles.title, styles.tier2Title]}>
              We're Concerned
            </Text>
            <Text style={[styles.text, styles.tier2Text]}>
              You haven't responded to our check-in. We've tried calling twice
              with no answer.
            </Text>
            <View style={styles.locationCard}>
              <Text style={styles.locationTitle}>📍 Last Known Location</Text>
              <View style={styles.mapPreview}>
                <Text style={styles.mapText}>🗺️ Map Preview</Text>
              </View>
              <Text style={styles.locationAddress}>123 Main St, Dallas, TX</Text>
              <Text style={styles.locationTime}>10 minutes ago</Text>
            </View>
            <Text style={[styles.text, styles.notificationText]}>
              Your circle has been notified.
            </Text>
            <Button
              title="I'm Safe Now"
              onPress={() => handleResponse('safe')}
              style={[styles.button, styles.safeButton]}
            />
            <TouchableOpacity
              onPress={() => handleResponse('help')}
              style={styles.helpButton}>
              <Text style={[styles.helpButtonText, styles.tier2HelpText]}>
                I Need Help
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Tier 3 - Full Emergency
  return (
    <LinearGradient
      colors={Colors.emergencyGradient}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.icon}>🚨</Text>
          <Text style={styles.title}>EMERGENCY ACTIVE</Text>
          <Text style={styles.text}>Your circle has been alerted</Text>

          <View style={styles.statusCard}>
            <Text style={styles.statusText}>📍 Sharing real-time location</Text>
            <Text style={styles.statusText}>🎙️ Audio recording started</Text>
          </View>

          <View style={styles.statusCard}>
            <Text style={styles.statusText}>👤 Mom - 📞 Calling you</Text>
            <Text style={styles.statusText}>👤 Sarah - 🏃 On the way</Text>
            <Text style={styles.statusText}>👤 Jake - 👁️ Watching</Text>
          </View>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              // Would show PIN entry modal
              navigation.goBack();
            }}>
            <Text style={styles.cancelButtonText}>
              Cancel Emergency (Requires PIN)
            </Text>
          </TouchableOpacity>

          <Text style={styles.timer}>Started 3 minutes ago</Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.medium,
  },
  icon: {
    fontSize: 80,
    marginBottom: Spacing.large,
  },
  title: {
    ...Typography.title1,
    fontWeight: '600',
    color: Colors.textWhite,
    marginBottom: Spacing.medium,
    textAlign: 'center',
  },
  text: {
    ...Typography.body,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: Spacing.xLarge,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    width: '100%',
    marginBottom: Spacing.medium,
  },
  safeButton: {
    backgroundColor: Colors.success,
  },
  helpButton: {
    padding: Spacing.medium,
  },
  helpButtonText: {
    ...Typography.headline,
    color: Colors.error,
    textAlign: 'center',
  },
  // Tier 1 styles
  tier1Title: {
    color: Colors.textPrimary,
  },
  tier1Text: {
    color: Colors.textPrimary,
  },
  // Tier 2 styles
  tier2Icon: {
    color: Colors.warning,
  },
  tier2Title: {
    color: Colors.textPrimary,
  },
  tier2Text: {
    color: Colors.textPrimary,
  },
  tier2HelpText: {
    color: Colors.error,
  },
  locationCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: Spacing.medium,
    width: '100%',
    marginBottom: Spacing.medium,
  },
  locationTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.medium,
  },
  mapPreview: {
    height: 120,
    backgroundColor: Colors.border,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  mapText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  locationAddress: {
    ...Typography.subhead,
    color: Colors.textPrimary,
    marginBottom: Spacing.micro,
  },
  locationTime: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },
  notificationText: {
    fontSize: 15,
    marginBottom: Spacing.large,
  },
  // Tier 3 styles
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: Spacing.medium,
    width: '100%',
    marginBottom: Spacing.medium,
  },
  statusText: {
    ...Typography.body,
    color: Colors.textWhite,
    marginBottom: Spacing.small,
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: Colors.textWhite,
    borderRadius: 16,
    padding: Spacing.medium,
    width: '100%',
    marginTop: Spacing.medium,
  },
  cancelButtonText: {
    ...Typography.headline,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  timer: {
    ...Typography.footnote,
    color: Colors.textWhite,
    opacity: 0.8,
    marginTop: Spacing.medium,
  },
});

export default EmergencyScreen;

