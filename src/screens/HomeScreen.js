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
import StatusCard from '../components/StatusCard';
import ActionCard from '../components/ActionCard';

const HomeScreen = ({navigation}) => {
  const isLearningMode = true; // Toggle between learning and protected mode
  const learningProgress = 35;
  const learningDay = 5;

  const quickActions = [
    {icon: '🏃‍♀️', label: 'Walking Home', onPress: () => handleQuickAction('walking')},
    {icon: '📅', label: 'Going Out', onPress: () => handleQuickAction('goingOut')},
    {icon: '✈️', label: 'Traveling', onPress: () => handleQuickAction('traveling')},
    {icon: '✅', label: 'Check In', onPress: () => handleQuickAction('checkIn')},
  ];

  const circleMembers = [
    {initial: 'M', color: Colors.primaryGradient},
    {initial: 'S', color: ['#FF9500', '#CC7700']},
    {initial: 'J', color: ['#34C759', '#28A745']},
  ];

  function handleQuickAction(action) {
    // Handle quick actions - could navigate to modals or other screens
    console.log('Quick action:', action);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.navBar}>
        <View style={styles.navSpacer} />
        <Text style={styles.navTitle}>Circle</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <View style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>👋 Hey Sarah</Text>

        {isLearningMode ? (
          <StatusCard
            icon="🧠"
            title="Learning Your Routine"
            description="I'm learning when you leave home, where you go, and when you return. Help me learn faster by labeling activities."
            progress={learningProgress}
            progressLabel={`Day ${learningDay} of 14`}
            buttonTitle="Help Me Learn →"
            onButtonPress={() => console.log('Help me learn')}
            variant="learning"
          />
        ) : (
          <StatusCard
            icon="🛡️"
            title="You're Protected"
            description="Everything looks normal. You typically leave work around 6pm. I'll check on you if you're running late."
            buttonTitle="View My Patterns →"
            onButtonPress={() => console.log('View patterns')}
            variant="protected"
          />
        )}

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <ActionCard
              key={index}
              icon={action.icon}
              label={action.label}
              onPress={action.onPress}
            />
          ))}
        </View>

        <View style={styles.circleSection}>
          <View style={styles.circleHeader}>
            <Text style={styles.sectionTitle}>Your Circle (3)</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Circle')}>
              <Text style={styles.viewAll}>View All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.circleMembers}>
            {circleMembers.map((member, index) => (
              <View
                key={index}
                style={[
                  styles.avatar,
                  {marginLeft: index > 0 ? -12 : 0},
                ]}>
                <Text style={styles.avatarText}>{member.initial}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>✅ Checked in safe</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>👤 Emily asked about you</Text>
            <Text style={styles.activityTime}>Yesterday at 9:30 PM</Text>
          </View>
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  navSpacer: {
    width: 32,
  },
  navTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  settingsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.medium,
    paddingBottom: 100,
  },
  greeting: {
    ...Typography.title1,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.large,
  },
  sectionTitle: {
    ...Typography.title3,
    color: Colors.textPrimary,
    marginBottom: Spacing.medium,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.medium,
    marginBottom: Spacing.xLarge,
  },
  circleSection: {
    marginBottom: Spacing.xLarge,
  },
  circleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  viewAll: {
    ...Typography.subhead,
    color: Colors.primary,
    fontWeight: '500',
  },
  circleMembers: {
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.background,
  },
  avatarText: {
    ...Typography.headline,
    color: Colors.textWhite,
    fontWeight: '600',
  },
  activityList: {
    gap: Spacing.medium,
  },
  activityItem: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: Spacing.medium,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  activityText: {
    ...Typography.subhead,
    color: Colors.textPrimary,
    marginBottom: Spacing.micro,
  },
  activityTime: {
    ...Typography.footnote,
    color: Colors.textSecondary,
  },
});

export default HomeScreen;

