import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors, Spacing, BorderRadius } from '../../constants/colors';
import { mockParkingLots } from '../../mock-data/lots';
import { ParkingLot } from '../../types';
import { router } from 'expo-router';
import { formatDistance } from '../../utils/calculateDistance';
import { formatPrice } from '../../utils/formatPrice';

export default function SearchScreen() {
  const [lots, setLots] = useState<ParkingLot[]>([]);

  useEffect(() => {
    setLots(mockParkingLots);
  }, []);

  const handleSelectLot = (lotId: string) => {
    router.push(`/lot/${lotId}`);
  };

  const renderLotCard = ({ item }: { item: ParkingLot }) => (
    <TouchableOpacity
      style={styles.lotCard}
      onPress={() => handleSelectLot(item.id)}
    >
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Text style={styles.lotName}>{item.name}</Text>
          <View style={[styles.availabilityBadge, {
            backgroundColor: item.availableSlots > 5 ? Colors.SLOT_FREE : item.availableSlots > 0 ? Colors.SLOT_LOW : Colors.SLOT_FULL
          }]}>
            <Text style={styles.availabilityText}>{item.availableSlots}</Text>
          </View>
        </View>

        <Text style={styles.address}>{item.address}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.distance}>{formatDistance(item.distanceMeters || 0)}</Text>
          <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
          <Text style={styles.price}>{formatPrice(item.pricePerHour)}/hr</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Parking</Text>
        <Text style={styles.subtitle}>{lots.length} lots available</Text>
      </View>

      <FlatList
        data={lots}
        keyExtractor={(item) => item.id}
        renderItem={renderLotCard}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
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
  subtitle: {
    fontSize: 14,
    color: Colors.GRAY_500,
    marginTop: Spacing.xs,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  lotCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: Colors.SHADOW_SM,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  lotName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.GRAY_900,
    flex: 1,
  },
  availabilityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
    marginLeft: Spacing.sm,
  },
  availabilityText: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
  address: {
    fontSize: 13,
    color: Colors.GRAY_600,
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  distance: {
    fontSize: 12,
    color: Colors.GRAY_600,
  },
  rating: {
    fontSize: 12,
    color: Colors.GRAY_600,
  },
  price: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.BLUE_PRIMARY,
  },
});
