import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import theme from '../../theme';
import { useAuth } from '../../context/AuthContext';
import ScreenContainer from '../../components/ScreenContainer';

const PAGE_BG = '#F6F8FC';
const ACCENT = '#1E5AA8';
const AVATAR_BG = '#C8E0F7';
const ICON_BOX = '#D6E8FA';
const SIGN_OUT_BG = '#FDEDED';

function MenuItem({ icon, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed]}
    >
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={ACCENT} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#B0B8C4" />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  const goTo = (screenName) => navigation.navigate(screenName);

  const initial = (user?.name || 'U').charAt(0).toUpperCase();
  const roleLabel = user?.role === 'admin' ? 'ADMIN' : 'USER';

  const bottomPad = tabBarHeight + theme.spacing.lg;

  return (
    <ScreenContainer backgroundColor={PAGE_BG} statusBarStyle="dark">
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.initial}>{initial}</Text>
            </View>
            <Text style={styles.name} numberOfLines={2}>
              {user?.name}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {user?.email}
            </Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{roleLabel}</Text>
            </View>
          </View>

          <View style={styles.menuCard}>
            <MenuItem
              icon="person-outline"
              label="Edit Profile"
              onPress={() => goTo('EditProfile')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="help-circle-outline"
              label="Help & Support"
              onPress={() => goTo('HelpSupport')}
            />
          </View>

          <TouchableOpacity
            style={styles.signOut}
            onPress={logout}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel="Sign out"
          >
            <Ionicons name="log-out-outline" size={22} color={theme.colors.danger} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: theme.spacing.lg, paddingTop: theme.spacing.md },

  profileCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadow.card,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: AVATAR_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  initial: { color: ACCENT, fontSize: 40, fontWeight: '800' },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A2B4A',
    textAlign: 'center',
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  roleBadge: {
    marginTop: theme.spacing.md,
    backgroundColor: ICON_BOX,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
  },
  roleText: { color: ACCENT, fontWeight: '800', fontSize: 12, letterSpacing: 0.6 },

  menuCard: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    ...theme.shadow.card,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  menuRowPressed: { backgroundColor: '#F3F6FA' },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: ICON_BOX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    marginLeft: theme.spacing.md,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2B4A',
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.border, marginLeft: 68 },

  signOut: {
    marginTop: theme.spacing.lg,
    backgroundColor: SIGN_OUT_BG,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.card,
  },
  signOutText: {
    marginLeft: 8,
    color: theme.colors.danger,
    fontSize: 16,
    fontWeight: '800',
  },
});
