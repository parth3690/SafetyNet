import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';
import Button from './Button';

const StatusCard = ({
  icon,
  title,
  description,
  progress,
  progressLabel,
  buttonTitle,
  onButtonPress,
  variant = 'learning',
}) => {
  const gradientColors =
    variant === 'protected'
      ? Colors.protectedGradient
      : Colors.learningGradient;

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {progress !== undefined && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>{progressLabel}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: `${progress}%`}]} />
          </View>
        </View>
      )}

      {description && <Text style={styles.description}>{description}</Text>}

      {buttonTitle && (
        <Button
          title={buttonTitle}
          onPress={onButtonPress}
          variant="secondary"
          style={styles.button}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: Spacing.large,
    marginBottom: Spacing.xLarge,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    ...Typography.title3,
    color: Colors.textPrimary,
  },
  progressContainer: {
    marginVertical: Spacing.medium,
  },
  progressLabel: {
    ...Typography.subhead,
    color: Colors.textPrimary,
    marginBottom: Spacing.small,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  description: {
    ...Typography.body,
    color: Colors.textPrimary,
    opacity: 0.8,
    marginBottom: Spacing.medium,
    lineHeight: 22,
  },
  button: {
    marginTop: Spacing.medium,
  },
});

export default StatusCard;

