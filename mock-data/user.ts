// ============================================
// Mock User Data
// ============================================

import { User } from '../types';

export const mockUser: User = {
  id: 'user-001',
  fullName: 'Ahmed Al-Rashid',
  email: 'ahmed@example.com',
  phone: '+966501234567',
  avatarUrl: 'https://via.placeholder.com/200x200?text=Ahmed',
  language: 'en',
  vehicles: [
    {
      id: 'vehicle-001',
      plate: 'ABC 1234',
      make: 'Toyota',
      model: 'Camry',
      type: 'sedan',
      color: 'Black',
      isDefault: true,
    },
    {
      id: 'vehicle-002',
      plate: 'XYZ 5678',
      make: 'Nissan',
      model: 'Qashqai',
      type: 'suv',
      color: 'White',
      isDefault: false,
    },
  ],
  paymentMethods: [
    {
      id: 'payment-001',
      method: 'card',
      lastFour: '4242',
      isDefault: true,
    },
    {
      id: 'payment-002',
      method: 'apple_pay',
      isDefault: false,
    },
    {
      id: 'payment-003',
      method: 'stc_pay',
      isDefault: false,
    },
  ],
  savedLotIds: ['lot-001', 'lot-003'],
  createdAt: new Date('2024-01-15'),
};
