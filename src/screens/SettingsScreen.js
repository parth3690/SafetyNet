import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const SettingsScreen = ({navigation}) => {
  const settingsItems = [
    {label: 'Monitoring', value: 'On'},
    {label: 'Sensitivity', value: 'Medium'},
    {label: 'Safe Zones', value: '3 locations'},
    {label: 'Notifications', value: 'All'},
    {label: 'Privacy', value: ''},
    {label: 'Account', value: ''},
    {label: 'Help & Support', value: ''},
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.settingsList}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingsItem}
              activeOpacity={0.7}>
              <Text style={styles.settingsLabel}>{item.label}</Text>
              <View style={styles.settingsRight}>
                {item.value ? (
                  <Text style={styles.settingsValue}>{item.value}</Text>
                ) : null}
                <Text style={styles.settingsArrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  settingsList: {
    backgroundColor: Colors.border,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  settingsLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  settingsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
  },
  settingsValue: {
    ...Typography.subhead,
    color: Colors.textSecondary,
  },
  settingsArrow: {
    ...Typography.title2,
    color: Colors.border,
  },
});

export default SettingsScreen;

