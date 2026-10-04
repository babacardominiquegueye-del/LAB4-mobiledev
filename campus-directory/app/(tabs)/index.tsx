import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';

import { RoomRow } from '../../components/RoomRow';
import {
  getZoneById,
  groupRoomsByZone,
  rooms,
  type Room,
  type ZoneId,
} from '../../data/rooms';
import { colors } from '../../theme';

function zoneColor(zoneId: ZoneId) {
  return getZoneById(zoneId)?.color ?? colors.accent;
}

export default function DirectoryScreen() {
  const router = useRouter();

  const sections = useMemo(() => groupRoomsByZone(), []);

  const openRoom = useCallback(
    (room: Room) => {
      router.push({ pathname: '/room/[id]', params: { id: room.id } });
    },
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: Room }) => (
      <RoomRow room={item} accentColor={zoneColor(item.zone)} onPress={openRoom} />
    ),
    [openRoom],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: (typeof sections)[number] }) => (
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionDot, { backgroundColor: section.zone.color }]} />
        <Text style={styles.sectionTitle}>{section.zone.name}</Text>
        <Text style={styles.sectionCount}>{section.data.length}</Text>
      </View>
    ),
    [sections],
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.listHeader}>
          <Text style={styles.heading}>Find a room</Text>
          <Text style={styles.subheading}>
            {rooms.length} rooms across 2 buildings. Open one to see its type and
            floor.
          </Text>

          <Pressable
            onPress={() => router.push('/contact')}
            style={({ pressed }) => [styles.reportButton, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
          >
            <Ionicons name="flag-outline" size={18} color={colors.surface} />
            <Text style={styles.reportButtonText}>Report a problem</Text>
          </Pressable>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.bg,
    paddingBottom: 32,
  },
  listHeader: {
    padding: 16,
    gap: 8,
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
  reportButton: {
    marginTop: 14,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: colors.bg,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  sectionCount: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.muted,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 72,
  },
});