import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useBookingStore } from '../../store/bookingStore';
import { Colors, Spacing, BorderRadius } from '../../constants/colors';
import { formatPrice } from '../../utils/formatPrice';
import { formatDateTime } from '../../utils/formatDate';
import { Ionicons } from '@expo/vector-icons';

export default function ConfirmationScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const booking = useBookingStore((state) => state.confirmedBooking);

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading confirmation...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color={Colors.SUCCESS} />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>Your parking is reserved</Text>
        </View>

        {/* Booking Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Booking ID</Text>
            <Text style={styles.value}>{booking.id.slice(0, 8).toUpperCase()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Parking Lot</Text>
            <Text style={styles.value}>{booking.lot.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Slot</Text>
            <Text style={styles.value}>{booking.slot.label}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Start Time</Text>
            <Text style={styles.value}>{formatDateTime(booking.startTime)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>End Time</Text>
            <Text style={styles.value}>{formatDateTime(booking.endTime)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowBorder]}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Amount Paid</Text>
            <Text style={styles.valueBold}>{formatPrice(booking.payment.totalAmount)}</Text>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <Text style={styles.qrTitle}>Parking Pass</Text>
          <View style={styles.qrContainer}>
            <View style={styles.qrPlaceholder}>
              <Text style={styles.qrEmoji}>📱</Text>
              <Text style={styles.qrText}>QR CODE</Text>
            </View>
          </View>
          <Text style={styles.qrHelper}>Show this QR code at the parking entrance</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Important Information</Text>
          <View style={styles.instructionItem}>
            <Ionicons name="warning" size={20} color={Colors.WARNING} />
            <Text style={styles.instructionText}>
              Your parking slot is reserved until {formatDateTime(booking.endTime)}
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="info" size={20} color={Colors.INFO} />
            <Text style={styles.instructionText}>
              Arrive at least 10 minutes before your scheduled time
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="document-text" size={20} color={Colors.INFO} />
            <Text style={styles.instructionText}>
              Check your email for booking confirmation details
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
          <Ionicons name="navigate" size={20} color={Colors.BLUE_PRIMARY} />
          <Text style={styles.buttonSecondaryText}>Navigate to Lot</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => router.replace('/(tabs)')}>
          <Ionicons name="home" size={20} color={Colors.WHITE} />
          <Text style={styles.buttonPrimaryText}>Go to Home</Text>
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
    paddingVertical: Spacing.lg,
    paddingBottom: 140,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  successIcon: {
    marginBottom: Spacing.lg,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.GRAY_900,
    marginBottom: Spacing.sm,
  },
  successSubtitle: {
    fontSize: 16,
    color: Colors.GRAY_600,
  },
  summaryCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  summaryRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_200,
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    color: Colors.GRAY_600,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.GRAY_900,
  },
  valueBold: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BLUE_PRIMARY,
  },
  statusBadge: {
    backgroundColor: Colors.SUCCESS,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  statusText: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.GRAY_900,
    marginBottom: Spacing.md,
  },
  qrContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: Colors.GRAY_100,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrEmoji: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  qrText: {
    fontSize: 14,
    color: Colors.GRAY_500,
    fontWeight: '600',
  },
  qrHelper: {
    fontSize: 12,
    color: Colors.GRAY_600,
    textAlign: 'center',
  },
  instructionsCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.GRAY_900,
    marginBottom: Spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  instructionText: {
    fontSize: 13,
    color: Colors.GRAY_700,
    flex: 1,
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
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  buttonPrimary: {
    backgroundColor: Colors.BLUE_PRIMARY,
  },
  buttonPrimaryText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: Colors.BLUE_LIGHT,
    borderWidth: 1,
    borderColor: Colors.BLUE_PRIMARY,
  },
  buttonSecondaryText: {
    color: Colors.BLUE_PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
});
