import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../constants/colors';

export default function BookingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <View style={styles.placeholderContent}>
        <Text style={styles.placeholderText}>📅 Booking History</Text>
        <Text style={styles.subtext}>Your parking reservations appear here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GRAY_50,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_200,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.GRAY_900,
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  placeholderText: {
    fontSize: 32,
  },
  subtext: {
    fontSize: 16,
    color: Colors.GRAY_500,
  },
});
