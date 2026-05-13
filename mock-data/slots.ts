// ============================================
// Mock Parking Slots Data
// ============================================

import { ParkingSlot } from '../types';

export const mockParkingSlotsFloor1: ParkingSlot[] = [
  // Row A (standard slots)
  { id: 'slot-a1', label: 'A1', status: 'available', type: 'standard', floor: 1 },
  { id: 'slot-a2', label: 'A2', status: 'available', type: 'standard', floor: 1 },
  { id: 'slot-a3', label: 'A3', status: 'occupied', type: 'standard', floor: 1 },
  { id: 'slot-a4', label: 'A4', status: 'available', type: 'standard', floor: 1 },
  { id: 'slot-a5', label: 'A5', status: 'reserved', type: 'standard', floor: 1 },
  { id: 'slot-a6', label: 'A6', status: 'available', type: 'standard', floor: 1 },

  // Row B (compact slots)
  { id: 'slot-b1', label: 'B1', status: 'available', type: 'compact', floor: 1 },
  { id: 'slot-b2', label: 'B2', status: 'available', type: 'compact', floor: 1 },
  { id: 'slot-b3', label: 'B3', status: 'maintenance', type: 'compact', floor: 1 },
  { id: 'slot-b4', label: 'B4', status: 'available', type: 'compact', floor: 1 },
  { id: 'slot-b5', label: 'B5', status: 'occupied', type: 'compact', floor: 1 },
  { id: 'slot-b6', label: 'B6', status: 'available', type: 'compact', floor: 1 },

  // Row C (disabled accessible)
  { id: 'slot-c1', label: 'C1', status: 'available', type: 'disabled', floor: 1 },
  { id: 'slot-c2', label: 'C2', status: 'available', type: 'disabled', floor: 1 },
  { id: 'slot-c3', label: 'C3', status: 'occupied', type: 'disabled', floor: 1 },

  // Row D (EV charging)
  { id: 'slot-d1', label: 'D1', status: 'available', type: 'ev', floor: 1 },
  { id: 'slot-d2', label: 'D2', status: 'occupied', type: 'ev', floor: 1 },
  { id: 'slot-d3', label: 'D3', status: 'available', type: 'ev', floor: 1 },
];

export const mockParkingSlotsFloor2: ParkingSlot[] = [
  // Row A (standard slots)
  { id: 'slot-2a1', label: 'A1', status: 'available', type: 'standard', floor: 2 },
  { id: 'slot-2a2', label: 'A2', status: 'available', type: 'standard', floor: 2 },
  { id: 'slot-2a3', label: 'A3', status: 'available', type: 'standard', floor: 2 },
  { id: 'slot-2a4', label: 'A4', status: 'occupied', type: 'standard', floor: 2 },
  { id: 'slot-2a5', label: 'A5', status: 'available', type: 'standard', floor: 2 },
  { id: 'slot-2a6', label: 'A6', status: 'available', type: 'standard', floor: 2 },

  // Row B (compact slots)
  { id: 'slot-2b1', label: 'B1', status: 'available', type: 'compact', floor: 2 },
  { id: 'slot-2b2', label: 'B2', status: 'occupied', type: 'compact', floor: 2 },
  { id: 'slot-2b3', label: 'B3', status: 'available', type: 'compact', floor: 2 },
  { id: 'slot-2b4', label: 'B4', status: 'reserved', type: 'compact', floor: 2 },
  { id: 'slot-2b5', label: 'B5', status: 'available', type: 'compact', floor: 2 },
  { id: 'slot-2b6', label: 'B6', status: 'available', type: 'compact', floor: 2 },
];

export const mockSlotsByLot = {
  'lot-001': [...mockParkingSlotsFloor1, ...mockParkingSlotsFloor2],
  'lot-002': mockParkingSlotsFloor1,
  'lot-003': [...mockParkingSlotsFloor1, ...mockParkingSlotsFloor2],
  'lot-004': mockParkingSlotsFloor1,
  'lot-005': [...mockParkingSlotsFloor1, ...mockParkingSlotsFloor2],
};
