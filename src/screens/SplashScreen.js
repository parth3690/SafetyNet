import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Auto-navigate to onboarding after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={Colors.primaryGradient}
      style={styles.container}>
      <Text style={styles.logo}>🛡️</Text>
      <Text style={styles.title}>CIRCLE</Text>
      <Text style={styles.subtitle}>Your AI Safety Companion</Text>
      <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    ...Typography.display,
    color: Colors.textWhite,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;

