import type { Ionicons } from '@expo/vector-icons';

import type { RoomType, ZoneId } from './data/rooms';

export type IconName = keyof typeof Ionicons.glyphMap;

export const colors = {
  bg: '#f4f6f9',
  surface: '#ffffff',
  border: '#e3e8ef',
  text: '#0f172a',
  muted: '#64748b',
  accent: '#2563eb',
  accentSoft: '#eef3ff',
};

export const zoneIcons: Record<ZoneId, IconName> = {
  main: 'school-outline',
  new: 'business-outline',
};

export const roomTypeIcons: Record<RoomType, IconName> = {
  classroom: 'easel-outline',
  lab: 'flask-outline',
  service: 'restaurant-outline',
};

export const roomTypeLabels: Record<RoomType, string> = {
  classroom: 'Classroom',
  lab: 'Laboratory',
  service: 'Service',
};