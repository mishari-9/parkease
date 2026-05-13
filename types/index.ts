// ============================================
// Core Data Models & TypeScript Interfaces
// ============================================

export type Coordinates = {
  lat: number;
  lng: number;
};

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

// ============== USER ==============
export type Language = 'ar' | 'en';

export interface Vehicle {
  id: string;
  plate: string; // "ABC 1234"
  make: string; // "Toyota"
  model: string; // "Camry"
  type: 'sedan' | 'suv' | 'truck' | 'motorcycle';
  color: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  method: 'card' | 'apple_pay' | 'stc_pay' | 'mada';
  lastFour?: string;
  isDefault: boolean;
}

export interface User {
  id: string; // UUID
  fullName: string;
  email: string; // unique
  phone: string; // +966 format
  avatarUrl?: string; // S3 URL
  language: Language;
  vehicles: Vehicle[];
  paymentMethods: PaymentMethod[];
  savedLotIds: string[];
  createdAt: Date;
}

// ============== PARKING LOT ==============
export interface LotAmenities {
  covered: boolean;
  evCharging: boolean;
  disabledAccess: boolean;
  cctv: boolean;
  valet: boolean;
  carWash: boolean;
}

export interface OpeningHours {
  is24Hours: boolean;
  openTime?: string; // "08:00"
  closeTime?: string; // "22:00"
  closedDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
}

export type ParkingSlotStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';
export type ParkingSlotType = 'standard' | 'compact' | 'disabled' | 'ev';

export interface ParkingSlot {
  id: string;
  label: string; // "A1", "B12"
  status: ParkingSlotStatus;
  type: ParkingSlotType;
  floor: number; // for multi-level lots
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  location: Coordinates;
  totalSlots: number;
  availableSlots: number; // live count
  pricePerHour: number; // SAR
  pricePerDay: number; // SAR
  rating: number; // 1.0–5.0
  reviewCount: number;
  photoUrls: string[]; // S3
  amenities: LotAmenities;
  hours: OpeningHours;
  slots?: ParkingSlot[]; // loaded on detail view
  distanceMeters?: number; // computed from user location
}

// ============== BOOKING & PAYMENT ==============
export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Payment {
  id: string; // Stripe payment intent ID
  baseAmount: number; // SAR
  serviceFee: number; // SAR (5% of base)
  totalAmount: number; // SAR
  method: 'card' | 'apple_pay' | 'stc_pay' | 'mada';
  status: 'pending' | 'paid' | 'refunded' | 'failed';
  paidAt?: Date;
}

export interface Review {
  id: string;
  userId: string;
  lotId: string;
  rating: number; // 1–5
  comment: string;
  createdAt: Date;
}

export interface Booking {
  id: string; // UUID
  userId: string;
  lotId: string;
  slotId: string;
  vehicleId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  payment: Payment;
  qrCodeData: string; // signed JWT string
  lot: ParkingLot; // snapshot
  slot: ParkingSlot; // snapshot
  review?: Review | null;
  createdAt: Date;
}

// ============== SEARCH & FILTERS ==============
export interface SearchFilters {
  maxDistance?: number; // meters (default 5000)
  minPrice?: number; // SAR/hr
  maxPrice?: number; // SAR/hr
  covered?: boolean;
  evCharging?: boolean;
  disabledAccess?: boolean;
  sortBy?: 'distance' | 'price' | 'rating';
  startTime?: Date; // for availability check
  endTime?: Date;
}

// ============== API RESPONSES ==============
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface SlotAvailabilityResponse {
  slotId: string;
  isAvailable: boolean;
}

export interface PriceBreakdown {
  hours: number;
  baseAmount: number;
  serviceFee: number;
  totalAmount: number;
}

// ============== STORE STATE ==============
export interface MapState {
  lots: ParkingLot[];
  selectedLot: ParkingLot | null;
  userLocation: Coordinates | null;
  region: MapRegion;
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
}

export interface BookingState {
  lotId: string | null;
  slotId: string | null;
  startTime: Date | null;
  endTime: Date | null;
  vehicleId: string | null;
  paymentMethodId: string | null;
  step: number; // 1–4
  confirmedBooking: Booking | null;
  isSubmitting: boolean;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
