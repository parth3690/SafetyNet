import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';
import Button from '../components/Button';

const RegistrationScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (phone || email) {
      // Navigate to home after registration
      navigation.replace('MainTabs');
    }
  };

  const isValid = phone.length > 0 || email.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.navTitle}>Get Started</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Let's create your account</Text>
            <Text style={styles.subtitle}>Sign up to start protecting yourself</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>📱 Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+1 (___) ___-____"
                placeholderTextColor={Colors.textTertiary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </View>

            <Text style={styles.divider}>OR</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>📧 Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={Colors.textTertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
              />
            </View>

            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={!isValid}
              style={styles.button}
            />

            <Text style={styles.terms}>
              By continuing, you agree to our{' '}
              <Text style={styles.link}>Terms</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
  },
  backButton: {
    ...Typography.body,
    color: Colors.primary,
  },
  navTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 60,
  },
  content: {
    padding: Spacing.medium,
  },
  title: {
    ...Typography.title1,
    color: Colors.textPrimary,
    marginBottom: Spacing.small,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xLarge,
  },
  inputGroup: {
    marginBottom: Spacing.medium,
  },
  label: {
    ...Typography.subhead,
    color: Colors.textPrimary,
    marginBottom: Spacing.small,
  },
  input: {
    height: 56,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.medium,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  divider: {
    ...Typography.subhead,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginVertical: Spacing.large,
  },
  button: {
    marginTop: Spacing.xLarge,
  },
  terms: {
    ...Typography.footnote,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.large,
  },
  link: {
    color: Colors.primary,
  },
});

export default RegistrationScreen;

