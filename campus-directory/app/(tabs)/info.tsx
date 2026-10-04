import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { rooms } from '../../data/rooms';
import { colors, type IconName } from '../../theme';

export default function InfoScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Room Directory</Text>
      <Text style={styles.subheading}>
        A pocket guide to {rooms.length} rooms across the Main School and the New
        Building.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How it works</Text>
        <Bullet
          icon="document-text-outline"
          text="All data comes from data/rooms.ts, a file kept outside the app folder."
        />
        <Bullet
          icon="link-outline"
          text="Opening a room puts only its short id in the URL. The screen looks the rest up itself."
        />
        <Bullet
          icon="alert-circle-outline"
          text="If an id matches no room, the screen shows a not-found state instead of crashing."
        />
      </View>

      <Text style={styles.sectionHeading}>Try it</Text>

      <Pressable
        onPress={() =>
          router.push({ pathname: '/room/[id]', params: { id: 'not-a-room' } })
        }
        style={({ pressed }) => [styles.action, pressed && { opacity: 0.8 }]}
        accessibilityRole="button"
      >
        <Ionicons name="bug-outline" size={20} color={colors.accent} />
        <View style={styles.actionText}>
          <Text style={styles.actionTitle}>Open a broken link</Text>
          <Text style={styles.actionSubtitle}>Sends an id that is not in the data</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </Pressable>

      <Text style={styles.footer}>Lab 4 · Mobile Development</Text>
    </ScrollView>
  );
}

function Bullet({ icon, text }: { icon: IconName; text: string }) {
  return (
    <View style={styles.bullet}>
      <Ionicons name={icon} size={18} color={colors.accent} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
    backgroundColor: colors.bg,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  subheading: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  bullet: {
    flexDirection: 'row',
    gap: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 21,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 6,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  actionText: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  actionSubtitle: {
    fontSize: 13,
    color: colors.muted,
  },
  footer: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 12,
    marginTop: 16,
  },
});