import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Colors, Spacing, BorderRadius } from '../../constants/colors';
import { useBookingStore } from '../../store/bookingStore';
import { useUserStore } from '../../store/userStore';
import { mockUser } from '../../mock-data/user';
import { formatPrice } from '../../utils/formatPrice';
import { calculateBookingPrice } from '../../utils/priceCalc';
import { lotService } from '../../services/lotService';
import { ParkingLot } from '../../types';
import { Ionicons } from '@expo/vector-icons';

export default function BookingFlowScreen() {
  const { lotId } = useLocalSearchParams<{ lotId: string }>();
  const bookingStore = useBookingStore();
  const userStore = useUserStore();

  const [lot, setLot] = useState<ParkingLot | null>(null);
  const [user, setUser] = useState(mockUser);

  useEffect(() => {
    // Load lot details
    if (lotId) {
      lotService.getLotDetail(lotId).then(setLot);
    }
    // Load user
    const storedUser = userStore.user || mockUser;
    setUser(storedUser);
  }, [lotId]);

  const handleNextStep = () => {
    if (bookingStore.step < 4) {
      bookingStore.goToNextStep();
    }
  };

  const handlePreviousStep = () => {
    if (bookingStore.step > 1) {
      bookingStore.goToPreviousStep();
    }
  };

  const handlePayment = async () => {
    try {
      await bookingStore.submitBooking();
      // Navigate to confirmation
      if (bookingStore.confirmedBooking) {
        router.push(`/confirmation/${bookingStore.confirmedBooking.id}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const isStep1Complete = bookingStore.slotId && bookingStore.startTime && bookingStore.endTime;
  const isStep2Complete = bookingStore.vehicleId;
  const isStep3Complete = true; // Review step is always complete
  const isStep4Complete = bookingStore.paymentMethodId;

  const priceInfo =
    lot && bookingStore.startTime && bookingStore.endTime
      ? calculateBookingPrice(lot, bookingStore.startTime, bookingStore.endTime)
      : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={Colors.BLUE_PRIMARY} />
        </TouchableOpacity>

        <Text style={styles.title}>Complete Your Booking</Text>

        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          {[1, 2, 3, 4].map((step) => (
            <View key={step} style={styles.stepContainer}>
              <View
                style={[
                  styles.stepCircle,
                  step <= bookingStore.step && styles.stepCircleActive,
                ]}
              >
                <Text style={styles.stepNumber}>{step}</Text>
              </View>
              {step < 4 && (
                <View
                  style={[
                    styles.stepLine,
                    step < bookingStore.step && styles.stepLineActive,
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        {/* Step 1: Date & Time */}
        {bookingStore.step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Step 1: Select Date & Time</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Parking Slot: {bookingStore.slotId || 'Not selected'}</Text>
              <Text style={styles.label}>Start Time: {bookingStore.startTime?.toLocaleString()}</Text>
              <Text style={styles.label}>End Time: {bookingStore.endTime?.toLocaleString()}</Text>

              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => {
                  // Simulate time selection
                  const now = new Date();
                  bookingStore.setTimeRange(now, new Date(now.getTime() + 2 * 60 * 60 * 1000));
                }}
              >
                <Text style={styles.inputButtonText}>Set Time (2 hours)</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 2: Vehicle */}
        {bookingStore.step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Step 2: Select Vehicle</Text>
            {user.vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  bookingStore.vehicleId === vehicle.id && styles.vehicleCardSelected,
                ]}
                onPress={() => bookingStore.setVehicle(vehicle.id)}
              >
                <Text style={styles.vehicleInfo}>
                  {vehicle.make} {vehicle.model}
                </Text>
                <Text style={styles.vehiclePlate}>{vehicle.plate}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 3: Review */}
        {bookingStore.step === 3 && priceInfo && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Step 3: Review Booking</Text>
            <View style={styles.reviewCard}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Parking Lot:</Text>
                <Text style={styles.reviewValue}>{lot?.name}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Duration:</Text>
                <Text style={styles.reviewValue}>{priceInfo.hours}h</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Slot:</Text>
                <Text style={styles.reviewValue}>{bookingStore.slotId}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Vehicle:</Text>
                <Text style={styles.reviewValue}>
                  {user.vehicles.find((v) => v.id === bookingStore.vehicleId)?.plate}
                </Text>
              </View>
              <View style={[styles.reviewRow, styles.reviewRowBorder]}>
                <Text style={styles.reviewLabel}>Base Amount:</Text>
                <Text style={styles.reviewValue}>{formatPrice(priceInfo.baseAmount)}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Service Fee (5%):</Text>
                <Text style={styles.reviewValue}>{formatPrice(priceInfo.serviceFee)}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewTotal}>Total Amount:</Text>
                <Text style={styles.reviewTotalValue}>{formatPrice(priceInfo.totalAmount)}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Step 4: Payment */}
        {bookingStore.step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Step 4: Select Payment Method</Text>
            {user.paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentCard,
                  bookingStore.paymentMethodId === method.id && styles.paymentCardSelected,
                ]}
                onPress={() => bookingStore.setPaymentMethod(method.id)}
              >
                <Text style={styles.paymentMethod}>{method.method.toUpperCase()}</Text>
                {method.lastFour && <Text style={styles.paymentDetail}>•••• {method.lastFour}</Text>}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, bookingStore.step === 1 && styles.buttonDisabled]}
          onPress={handlePreviousStep}
          disabled={bookingStore.step === 1}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonPrimary,
            bookingStore.isSubmitting && styles.buttonDisabled,
          ]}
          onPress={bookingStore.step === 4 ? handlePayment : handleNextStep}
          disabled={bookingStore.isSubmitting}
        >
          <Text style={styles.buttonPrimaryText}>
            {bookingStore.step === 4 ? 'Pay Now' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GRAY_50,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingBottom: 120,
  },
  backButton: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.GRAY_900,
    marginBottom: Spacing.lg,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.GRAY_200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  stepCircleActive: {
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  stepNumber: {
    color: Colors.GRAY_600,
    fontWeight: '600',
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: Colors.GRAY_300,
    marginHorizontal: -Spacing.sm,
  },
  stepLineActive: {
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  stepContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.GRAY_900,
    marginBottom: Spacing.md,
  },
  inputGroup: {
    gap: Spacing.md,
  },
  label: {
    fontSize: 14,
    color: Colors.GRAY_700,
  },
  inputButton: {
    backgroundColor: Colors.BLUE_LIGHT,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  inputButtonText: {
    color: Colors.BLUE_PRIMARY,
    fontWeight: '600',
  },
  vehicleCard: {
    borderWidth: 2,
    borderColor: Colors.GRAY_300,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  vehicleCardSelected: {
    borderColor: Colors.BLUE_PRIMARY,
    backgroundColor: Colors.BLUE_LIGHT,
  },
  vehicleInfo: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.GRAY_900,
  },
  vehiclePlate: {
    fontSize: 12,
    color: Colors.GRAY_600,
    marginTop: Spacing.xs,
  },
  reviewCard: {
    backgroundColor: Colors.GRAY_50,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  reviewRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_300,
    marginBottom: Spacing.sm,
  },
  reviewLabel: {
    fontSize: 14,
    color: Colors.GRAY_700,
  },
  reviewValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.GRAY_900,
  },
  reviewTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.GRAY_900,
  },
  reviewTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BLUE_PRIMARY,
  },
  paymentCard: {
    borderWidth: 2,
    borderColor: Colors.GRAY_300,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  paymentCardSelected: {
    borderColor: Colors.BLUE_PRIMARY,
    backgroundColor: Colors.BLUE_LIGHT,
  },
  paymentMethod: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.GRAY_900,
  },
  paymentDetail: {
    fontSize: 12,
    color: Colors.GRAY_600,
    marginTop: Spacing.xs,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_200,
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    backgroundColor: Colors.GRAY_100,
    borderWidth: 1,
    borderColor: Colors.GRAY_300,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.GRAY_700,
  },
  buttonPrimary: {
    backgroundColor: Colors.BLUE_PRIMARY,
    borderColor: Colors.BLUE_PRIMARY,
  },
  buttonPrimaryText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
});
