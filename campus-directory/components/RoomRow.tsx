import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Room } from '../data/rooms';
import { colors, roomTypeIcons, roomTypeLabels } from '../theme';

type Props = {
  room: Room;
  accentColor: string;
  onPress: (room: Room) => void;
};

export function RoomRow({ room, accentColor, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(room)}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      accessibilityRole="button"
    >
      <View style={[styles.badge, { backgroundColor: accentColor }]}>
        <Ionicons name={roomTypeIcons[room.type]} size={20} color={colors.surface} />
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {room.name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {roomTypeLabels[room.type]} · Floor {room.floor}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
  },
  rowPressed: {
    backgroundColor: colors.accentSoft,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 13,
    color: colors.muted,
  },
});