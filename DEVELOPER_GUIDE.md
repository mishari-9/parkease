# ParkEase - Developer Guide

## 🎯 Quick Start

### 1. Setup
```bash
cd parkease
npm install
```

### 2. Run Development Server
```bash
npm start
# Choose platform: 'i' (iOS), 'a' (Android), 'w' (Web)
```

### 3. Test the App
- **Search Tab**: Browse 5 mock parking lots
- **Lot Detail**: Click any lot to see slots and amenities
- **Booking Flow**: Select a slot → Go through 4-step wizard
- **Confirmation**: See booking summary with mock QR code
- **Profile**: View user info, vehicles, payment methods

---

## 📂 File Organization Guide

### Types & Interfaces (`types/`)
- **Location**: `types/index.ts`
- **Update**: Add new types here, export for use across app

### State Management (`store/`)
```
authStore.ts      → User login/logout state
mapStore.ts       → Map, lots, filters
bookingStore.ts   → 4-step wizard state
userStore.ts      → User profile state
```
- All use Zustand
- Global state accessible from any component
- No prop drilling needed

### API Services (`services/`)
```
api.ts            → Axios instance + interceptors
authService.ts    → Login, register, token refresh
lotService.ts     → Parking lots CRUD
bookingService.ts → Booking CRUD
paymentService.ts → Payment processing
```
- All return Promises
- Mock data by default
- Easy to swap to real API calls

### Business Logic (`utils/`)
- **formatPrice()** - Convert numbers to "SAR 25.00"
- **formatDate()** - Convert dates to readable format
- **calculateDistance()** - Get distance between coordinates
- **calculateBookingPrice()** - Compute base + fee
- **generateQR()** - Create JWT for QR codes

### Screen Components (`app/`)
```
(tabs)/index.tsx      → Home/Map screen
(tabs)/search.tsx     → Search screen
(tabs)/bookings.tsx   → Booking history
(tabs)/profile.tsx    → User profile
lot/[id].tsx          → Lot detail
booking/[lotId].tsx   → 4-step wizard
confirmation/[id].tsx → Success screen
```
- Full-screen components
- Route params via useLocalSearchParams
- Navigate via router.push()

### Constants (`constants/`)
```
colors.ts   → All colors + typography + spacing
config.ts   → App config + feature flags
api.ts      → API URLs + endpoints
```

### Mock Data (`mock-data/`)
```
lots.ts     → 5 parking lots
slots.ts    → Parking slots for each lot
user.ts     → Sample user profile
```

---

## 🔄 Common Workflows

### Adding a New Screen

1. Create file: `app/my-screen.tsx`
2. Import utilities:
   ```tsx
   import { SafeAreaView, StyleSheet } from 'react-native';
   import { Colors, Spacing } from '../constants/colors';
   ```
3. Build component:
   ```tsx
   export default function MyScreen() {
     return (
       <SafeAreaView style={styles.container}>
         {/* content */}
       </SafeAreaView>
     );
   }
   const styles = StyleSheet.create({...});
   ```

### Using Store State

```tsx
import { useMapStore } from '../store/mapStore';

export default function MyComponent() {
  const lots = useMapStore((state) => state.lots);
  const selectLot = useMapStore((state) => state.selectLot);
  
  return <Text>{lots.length} lots</Text>;
}
```

### Making an API Call

```tsx
import { lotService } from '../services/lotService';

useEffect(() => {
  lotService.getLots()
    .then(setLots)
    .catch(console.error);
}, []);
```

### Formatting Values

```tsx
import { formatPrice } from '../utils/formatPrice';
import { formatDistance } from '../utils/calculateDistance';

<Text>{formatPrice(100)}</Text>        // "SAR 100.00"
<Text>{formatDistance(1500)}</Text>    // "1.5km"
```

---

## 🔌 Backend Integration Steps

### Step 1: Update API Base URL
**File**: `constants/api.ts`
```ts
const DEV_URL = 'http://your-backend.com/api/v1';
```

### Step 2: Uncomment Real API Calls
**File**: `services/lotService.ts` (example)
```ts
// Before (mock):
return mockParkingLots;

// After (real):
const response = await apiClient.get(Endpoints.LOTS_LIST, { params });
return response.data;
```

### Step 3: Test Each Service
```ts
// Test in browser console or test file
const lots = await lotService.getLots();
console.log(lots);
```

---

## 🎨 Styling Guidelines

### Use Spacing System
```tsx
const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,        // Use constants, not hardcoded
    marginBottom: Spacing.lg,
  }
});
```

### Use Color Tokens
```tsx
backgroundColor: Colors.BLUE_PRIMARY,    // Not '#1A6FBF'
borderColor: Colors.GRAY_200,            // Not '#E5E7EB'
color: Colors.SLOT_FREE,                 // Status colors
```

### Consistent Sizing
- Button height: 48px (usually `Spacing.lg + Spacing.md`)
- Card padding: `Spacing.lg`
- Icon size: 20-24px
- Border radius: `BorderRadius.md`

---

## 🧪 Testing Mock Features

### Test Booking Flow
1. Go to Search tab
2. Tap any lot
3. Select a green slot
4. Go through 4 steps
5. Mock booking created
6. See confirmation with mock QR

### Test State Management
```tsx
// In any component:
import { useBookingStore } from '../store/bookingStore';

const step = useBookingStore((state) => state.step);
console.log('Current booking step:', step);
```

### Test API Layer
```tsx
import { lotService } from '../services/lotService';

// Mock API test:
const lots = await lotService.getLots();
console.log('Got lots:', lots.length);
```

---

## 🐛 Debugging Tips

### View Redux/Store State
```tsx
// Add to component:
useEffect(() => {
  const unsubscribe = useMapStore.subscribe(
    (state) => console.log('Map state:', state)
  );
  return unsubscribe;
}, []);
```

### Inspect Route Params
```tsx
const params = useLocalSearchParams();
console.log('Route params:', params);
```

### Log API Calls
Check `services/api.ts` interceptors - all requests logged automatically.

---

## 📦 Project Dependencies

### Key Libraries
```json
"react-native": "0.74"              // Core framework
"expo": "~51.0"                     // Build & CLI
"expo-router": "^3.5"               // File-based routing
"zustand": "^4.5"                   // State management
"axios": "^1.7"                     // HTTP client
"react-native-maps": "^1.14"        // Google Maps
"@stripe/stripe-react-native": "^0.37"  // Payments
```

### Install New Package
```bash
npx expo install package-name
# OR
npm install package-name
```

---

## 🚀 Performance Tips

1. **Memoize Components**
   ```tsx
   import { memo } from 'react';
   export default memo(MyComponent);
   ```

2. **Optimize Re-renders**
   ```tsx
   const lots = useMapStore((state) => state.lots);  // Only re-render when lots change
   ```

3. **Lazy Load Images**
   ```tsx
   import { Image } from 'react-native';
   // Use Image.prefetch() for optimization
   ```

4. **Debounce Search**
   Already implemented in `mapStore.ts` with 500ms debounce

---

## 📋 Code Style

### Naming Conventions
- **Components**: PascalCase (`HomeScreen.tsx`)
- **Functions**: camelCase (`formatPrice()`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`ParkingLot`)
- **Stores**: camelCase + suffix (`useMapStore`)

### File Organization
```
app/                    # Screens (Expo Router)
components/             # Reusable components (future)
store/                  # State (Zustand)
services/               # API layer
hooks/                  # Custom hooks
utils/                  # Utilities
constants/              # Config + design system
types/                  # TypeScript interfaces
mock-data/              # Sample data
```

---

## ✅ Pre-Commit Checklist

Before pushing code:
- [ ] No console.log() left in production code
- [ ] All types properly defined (no `any`)
- [ ] No unused imports
- [ ] Consistent spacing (use Spacing tokens)
- [ ] Error handling in try/catch
- [ ] Comments on complex logic

---

## 🆘 Common Issues & Solutions

### Issue: "Cannot find module"
**Solution**: Check import path is correct
```ts
// Wrong:
import { useMapStore } from './mapStore';

// Right:
import { useMapStore } from '../store/mapStore';
```

### Issue: TypeScript errors
**Solution**: Check type definitions in `types/index.ts`

### Issue: Navigation not working
**Solution**: Check route path matches file structure
- File: `app/lot/[id].tsx`
- Route: `/lot/123` (matches the segment)

### Issue: State not updating
**Solution**: Use store actions, not direct manipulation
```ts
// Wrong:
useMapStore.setState({ lots: [] });

// Right:
useMapStore.getState().selectLot(lot);
```

---

## 📞 Getting Help

1. **Check README.md** - Project overview
2. **Check BUILD_SUMMARY.md** - What's included
3. **Check component comments** - In-code documentation
4. **Check TypeScript errors** - Compiler tells you what's wrong

---

## 🎯 Next Steps After Setup

1. ✅ Run app and test all screens
2. ✅ Try the booking flow end-to-end
3. ✅ Connect to real backend when ready
4. ✅ Add real map integration
5. ✅ Set up payment processing
6. ✅ Configure push notifications

---

**Happy Coding! 🚀**
