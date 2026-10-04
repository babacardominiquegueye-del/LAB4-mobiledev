export type ZoneId = 'main' | 'new';

export type RoomType = 'classroom' | 'lab' | 'service';

export type Room = {
  id: string;
  name: string;
  zone: ZoneId;
  type: RoomType;
  floor: number;
};

export type Zone = {
  id: ZoneId;
  name: string;
  color: string;
};

export const zones: Zone[] = [
  { id: 'main', name: 'Main School', color: '#2563eb' },
  { id: 'new', name: 'New Building', color: '#0d9488' },
];

export const rooms: Room[] = [
  { id: 'lh01', name: 'LH01', zone: 'main', type: 'classroom', floor: 1 },
  { id: 'lh12', name: 'LH12', zone: 'main', type: 'classroom', floor: 1 },
  { id: 'lh13', name: 'LH13', zone: 'main', type: 'classroom', floor: 1 },
  { id: 'mech-lab', name: 'Mechanical Lab', zone: 'main', type: 'lab', floor: 2 },
  { id: 'cafeteria', name: 'Cafeteria', zone: 'main', type: 'service', floor: 0 },
  { id: 'admin', name: 'Administration', zone: 'main', type: 'service', floor: 1 },
  { id: 'nb01', name: 'NB01', zone: 'new', type: 'classroom', floor: 1 },
  { id: 'nb12', name: 'NB12', zone: 'new', type: 'classroom', floor: 1 },
  { id: 'nb13', name: 'NB13', zone: 'new', type: 'classroom', floor: 2 },
];

export function getZoneById(id: string): Zone | undefined {
  return zones.find((zone) => zone.id === id);
}

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}

export type ZoneSection = {
  zone: Zone;
  data: Room[];
};

export function groupRoomsByZone(): ZoneSection[] {
  return zones
    .map((zone) => ({
      zone,
      data: rooms.filter((room) => room.zone === zone.id),
    }))
    .filter((section) => section.data.length > 0);
}