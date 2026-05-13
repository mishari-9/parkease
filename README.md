# ParkEase - Smart Parking Finder & Reservation App

A comprehensive React Native (Expo) mobile application for finding, reserving, and managing parking spaces across Riyadh, Saudi Arabia.

## 🎯 Project Overview

**ParkEase** is an HCI Course Project (IT215) developed by Group G4. It's a cross-platform mobile app that helps users:
- Find nearby parking lots on a live map
- View real-time slot availability
- Reserve specific slots for chosen time windows
- Pay digitally (Stripe, STC Pay)
- Receive QR-code entry passes
- Navigate to parking locations

## 🏗 Tech Stack

### Frontend
- **React Native** (v0.74) with **Expo** managed workflow
- **TypeScript** for type safety
- **Zustand** for state management
- **React Query** for server-state caching
- **Axios** for HTTP requests
- **React Native Maps** for Google Maps integration
- **Stripe React Native** for payments
- **Firebase** for push notifications

### Backend (Ready for Integration)
- **Node.js + Express** REST API
- **PostgreSQL** for relational data
- **Redis** for sessions/cache
- **JWT** for authentication
- **AWS S3** for image storage

## 📁 Project Structure

```
parkease/
├── app/                         # Expo Router (file-based routing)
│   ├── (tabs)/
│   │   ├── index.tsx            # HomeMapScreen
│   │   ├── search.tsx           # SearchScreen
│   │   ├── bookings.tsx         # BookingHistoryScreen
│   │   └── profile.tsx          # ProfileScreen
│   ├── lot/[id].tsx             # LotDetailScreen
│   ├── booking/[lotId].tsx      # BookingFlowScreen
│   ├── confirmation/[bookingId].tsx
│   └── _layout.tsx
├── components/                  # Reusable UI components
├── store/                       # Zustand state stores
├── services/                    # API services layer
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript interfaces
├── constants/                   # App configuration & colors
├── utils/                       # Utility functions
├── mock-data/                   # Mock data for development
└── server/                      # Express backend (skeleton)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Navigate to project directory
cd parkease

# Install dependencies
npm install
# or
yarn install

# Install Expo CLI globally
npm install -g expo-cli
```

### Running the App

```bash
# Start Expo development server
npm start

# Choose platform:
# - Press 'i' for iOS
# - Press 'a' for Android
# - Press 'w' for web
```

The app will open on Expo Go (mobile) or web browser.

## 🎨 Design System

### Colors
- **Primary**: `#1A6FBF` (Blue)
- **Slot Status**: Green (available), Red (occupied), Orange (reserved), Gray (maintenance)
- **Status Badges**: Green (active), Blue (confirmed), Gray (completed), Red (cancelled)

### Typography
- **H1**: 24px / 700 weight
- **H2**: 18px / 600 weight
- **Body**: 14px / 400 weight
- **Small**: 12px / 400 weight

### Spacing
8pt grid system: `xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48`

## 📱 Screen Flow

1. **Home Map Screen** - Live map view with parking lot pins
2. **Search Screen** - Browse and filter parking lots
3. **Lot Detail Screen** - View lot info, amenities, slots, and reviews
4. **Booking Flow** (4-step wizard):
   - Step 1: Date & Time selection
   - Step 2: Vehicle selection
   - Step 3: Booking review & price
   - Step 4: Payment method selection
5. **Confirmation Screen** - QR code + booking summary
6. **Booking History** - View upcoming, past, and cancelled bookings
7. **Profile Screen** - User info, vehicles, payment methods, saved lots

## 🔌 API Integration

Currently uses **mock data** from:
- `mock-data/lots.ts` - 5 sample parking lots
- `mock-data/slots.ts` - Parking slot grids
- `mock-data/user.ts` - Sample user profile

To connect to real backend:
1. Update `API_BASE_URL` in `constants/api.ts`
2. Replace mock API calls in services with real endpoints
3. Uncomment actual API calls in:
   - `lotService.ts`
   - `bookingService.ts`
   - `authService.ts`

## 🔐 Authentication

- **JWT-based** authentication
- Tokens stored in **SecureStore**
- Auto token refresh on 401 response
- Auth interceptor in `services/api.ts`

## 💳 Payment Integration

- **Stripe** for card payments
- **Apple Pay** support
- **STC Pay** for local payments
- **Mada** card support
- Payment flow in booking step 4

## 📍 Features Implemented

✅ Responsive UI with bottom tab navigation
✅ Lot search and filtering
✅ Slot grid display with status colors
✅ Multi-floor parking support
✅ 4-step booking wizard
✅ Price calculation with service fees
✅ User profile management
✅ Vehicle management
✅ Payment method selection
✅ Booking confirmation with QR code
✅ RTL-ready design (Arabic support)

## 🔄 Zustand Stores

### `authStore.ts`
- User authentication state
- Token management
- Login/logout actions

### `mapStore.ts`
- Parking lots list
- Selected lot
- User location
- Map filters

### `bookingStore.ts`
- Multi-step booking state
- Slot, vehicle, time, payment selection
- Booking submission

### `userStore.ts`
- Current user profile
- Saved lots
- User preferences

## 🛠 Utility Functions

- `formatPrice()` - Format prices with locale support (SAR)
- `formatDate()` - Date/time formatting
- `calculateDistance()` - Haversine formula for location distance
- `calculateBookingPrice()` - Price calculation with service fee
- `generateQR()` - QR code JWT generation

## 🚦 HCI Heuristics Implementation

✅ **Visibility of system status** - Loading indicators, progress bars
✅ **Match real world** - Colors match parking signage, SAR currency
✅ **User control & freedom** - Back buttons, cancellation options
✅ **Consistency & standards** - Unified design language
✅ **Error prevention** - Disabled buttons, validation
✅ **Recognition over recall** - Recent searches, saved lots
✅ **Flexibility & efficiency** - Quick duration buttons, rebook feature
✅ **Aesthetic & minimalist** - Clean UI, essential info only
✅ **Error handling** - Toast messages, retry options

## 📊 Mock Data

### Sample Parking Lots (5 total)
1. **Al Andalus Mall** - 450 slots, SAR 15/hr
2. **Riyadh Gallery** - 300 slots, SAR 12/hr
3. **Faisaliah Tower** - 600 slots, SAR 20/hr
4. **Centria Mall** - 250 slots, SAR 10/hr
5. **Red Sea Mall** - 400 slots, SAR 14/hr

### Sample User
- Name: Ahmed Al-Rashid
- Email: ahmed@example.com
- 2 vehicles, 3 payment methods
- 2 saved lots

## 🎯 Next Steps

1. **Backend Setup**
   - Deploy Node.js + Express server
   - Set up PostgreSQL database
   - Implement JWT auth endpoints
   - Create parking lots CRUD

2. **API Integration**
   - Replace mock data with real API calls
   - Test auth flow
   - Integrate Stripe payments
   - Set up Firebase Cloud Messaging

3. **Maps Integration**
   - Add Google Maps SDK
   - Implement custom map pins
   - Add navigation deep links

4. **Testing**
   - Unit tests with Jest
   - Integration tests
   - E2E tests with Detox

5. **Deployment**
   - Build Android APK
   - Build iOS IPA
   - Submit to app stores

## 📝 Development Notes

- Using mock data currently for rapid prototyping
- All API calls are abstracted in `services/` folder
- State management centralized with Zustand
- Colors and typography centralized in `constants/`
- Fully typed with TypeScript for safety

## 👥 Team

**Group G4** - IT215 HCI Course Project
- Backend: Express + Node.js
- Frontend: React Native + Expo
- Database: PostgreSQL
- Payments: Stripe + STC Pay

## 📄 License

This project is part of an academic course and is provided as-is.

## 🆘 Support

For issues or questions, contact the development team.

---

**Status**: ✅ Frontend UI Complete | 🔄 Ready for Backend Integration | 📱 Testing Phase
