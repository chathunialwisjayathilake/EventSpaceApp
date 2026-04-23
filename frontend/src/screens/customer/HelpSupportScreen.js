import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import theme from '../../theme';
import ScreenContainer from '../../components/ScreenContainer';

const ACCENT = '#1E5AA8';
const ACCENT_LIGHT = '#E3F0FC';
const PAGE_BG = '#F6F8FC';

const SECTIONS = [
  {
    title: 'What is EventSpace?',
    body:
      'EventSpace helps you discover venues, check availability, and book spaces for weddings, parties, corporate events, and more — all in one place.',
  },
  {
    title: 'How do I find a venue?',
    body:
      'Open the Home tab, browse the list or map, and tap a venue to see photos, capacity, pricing, and amenities. Use filters to narrow by location or event type when available.',
  },
  {
    title: 'How do I book?',
    body:
      "From a venue’s page, choose Book, pick your date and time, add guest count and any extras (like catering) if offered, then submit your request. You’ll see the booking under My Bookings.",
  },
  {
    title: 'What happens after I book?',
    body:
      'Your booking is sent to the venue. Status updates and details appear in My Bookings. You can review past visits from your profile and leave feedback when invited.',
  },
  {
    title: 'How do I update my account?',
    body:
      'In Profile, tap Edit Profile to change your name, phone number, or password. If something looks wrong, use Help & Support to reach us.',
  },
  {
    title: 'Sign out and security',
    body:
      'Use Sign out on the Profile screen when you are finished, especially on shared devices. Keep your password private and use a strong one when you change it in Edit Profile.',
  },
];

function FaqRow({ item }) {
  return (
    <View style={styles.faqCard}>
      <View style={styles.faqHeader}>
        <View style={styles.faqIconWrap}>
          <Ionicons name="help" size={18} color={ACCENT} />
        </View>
        <Text style={styles.faqTitle}>{item.title}</Text>
      </View>
      <Text style={styles.faqBody}>{item.body}</Text>
    </View>
  );
}

export default function HelpSupportScreen() {
  return (
    <ScreenContainer backgroundColor={PAGE_BG} statusBarStyle="dark">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIconCircle}>
            <Ionicons name="headset" size={32} color={ACCENT} />
          </View>
          <Text style={styles.heroTitle}>Help & Support</Text>
          <Text style={styles.heroSubtitle}>
            Quick answers for using EventSpace as a customer. For account-specific issues, update your
            details in Edit Profile or contact your venue.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>How the app works</Text>

        {SECTIONS.map((item) => (
          <FaqRow key={item.title} item={item} />
        ))}

        <View style={styles.tipCard}>
          <Ionicons name="information-circle-outline" size={22} color={ACCENT} style={styles.tipIcon} />
          <Text style={styles.tipText}>
            Tip: Always confirm date, time, and guest count before the event. Venue policies may apply to
            cancellations and changes.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xl * 2 },
  hero: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadow.card,
  },
  heroIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ACCENT_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2B4A',
    textAlign: 'center',
  },
  heroSubtitle: {
    marginTop: theme.spacing.sm,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: ACCENT,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.md,
  },
  faqCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.card,
  },
  faqHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm },
  faqIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: ACCENT_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  faqTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2B4A',
  },
  faqBody: {
    fontSize: 14,
    lineHeight: 21,
    color: theme.colors.muted,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: ACCENT_LIGHT,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  tipIcon: { marginRight: theme.spacing.sm, marginTop: 2 },
  tipText: { flex: 1, fontSize: 14, lineHeight: 20, color: '#2D3E5C' },
});
