import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const CircleScreen = ({navigation}) => {
  const members = [
    {name: 'Mom', relation: 'Family', initial: 'M', gradient: Colors.primaryGradient},
    {name: 'Sarah', relation: 'Friend', initial: 'S', gradient: ['#FF9500', '#CC7700']},
    {name: 'Jake', relation: 'Friend', initial: 'J', gradient: ['#34C759', '#28A745']},
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>My Circle</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {members.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <LinearGradient
              colors={member.gradient}
              style={styles.avatar}>
              <Text style={styles.avatarText}>{member.initial}</Text>
            </LinearGradient>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRelation}>{member.relation}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log('Add member')}>
          <Text style={styles.addButtonText}>+ Add Circle Member</Text>
        </TouchableOpacity>
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
    padding: Spacing.medium,
    paddingBottom: 100,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: Spacing.medium,
    marginBottom: Spacing.medium,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  avatarText: {
    ...Typography.title3,
    color: Colors.textWhite,
    fontWeight: '600',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.micro,
  },
  memberRelation: {
    ...Typography.subhead,
    color: Colors.textSecondary,
  },
  addButton: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: Spacing.xLarge,
    alignItems: 'center',
    marginTop: Spacing.medium,
  },
  addButtonText: {
    ...Typography.headline,
    color: Colors.primary,
  },
});

export default CircleScreen;

