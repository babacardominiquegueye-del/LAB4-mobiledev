import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getRoomById, getZoneById } from '../../data/rooms';
import { colors, roomTypeIcons, roomTypeLabels } from '../../theme';

export default function RoomScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string | string[] }>();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const room = id ? getRoomById(id) : undefined;
  const zone = room ? getZoneById(room.zone) : undefined;

  // Nothing matched the id in the URL: show the not-found state.
  if (!room) {
    return (
      <>
        <Stack.Screen options={{ title: 'Not found' }} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>No such room</Text>
          <Text style={styles.notFoundText}>
            {id
              ? `Nothing in the directory matches the id "${id}".`
              : 'No room id was provided in the address.'}
          </Text>
          <Pressable
            onPress={() => router.replace('/')}
            style={({ pressed }) => [styles.notFoundButton, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
          >
            <Text style={styles.notFoundButtonText}>Back to the directory</Text>
          </Pressable>
        </View>
      </>
    );
  }

  const facts = [
    { label: 'Building', value: zone?.name ?? '-' },
    { label: 'Type', value: roomTypeLabels[room.type] },
    { label: 'Floor', value: String(room.floor) },
    { label: 'Room id', value: room.id },
  ];

  return (
    <>
      <Stack.Screen options={{ title: room.name }} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={[styles.badge, { backgroundColor: zone?.color }]}>
            <Ionicons name={roomTypeIcons[room.type]} size={32} color={colors.surface} />
          </View>
          <Text style={styles.name}>{room.name}</Text>
          <Text style={styles.heroMeta}>
            {roomTypeLabels[room.type]} · {zone?.name}
          </Text>
        </View>

        <View style={styles.card}>
          {facts.map((fact, index) => (
            <View
              key={fact.label}
              style={[styles.factRow, index < facts.length - 1 && styles.factDivider]}
            >
              <Text style={styles.factLabel}>{fact.label}</Text>
              <Text style={styles.factValue}>{fact.value}</Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => router.push('/contact')}
          style={({ pressed }) => [styles.reportButton, pressed && { opacity: 0.8 }]}
          accessibilityRole="button"
        >
          <Ionicons name="flag-outline" size={18} color={colors.surface} />
          <Text style={styles.reportButtonText}>Report a problem with {room.name}</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  notFoundText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  notFoundButton: {
    marginTop: 12,
    backgroundColor: colors.accent,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  notFoundButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: 15,
  },
  hero: {
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    width: 76,
    height: 76,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  heroMeta: {
    fontSize: 14,
    color: colors.muted,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  factDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  factLabel: {
    fontSize: 15,
    color: colors.muted,
  },
  factValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  reportButton: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    paddingVertical: 13,
    borderRadius: 10,
  },
  reportButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: 15,
  },
});