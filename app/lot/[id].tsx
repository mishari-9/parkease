import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import { lotService } from "../../services/lotService";
import { qassimParkingLots } from "../../mock-data/qassim-lots";
import { mockSlotsByLot } from "../../mock-data/slots";
import { useThemeStore } from "../../store/themeStore";
import { ParkingLot, ParkingSlot } from "../../types";
import { formatPrice } from "../../utils/formatPrice";
import { formatDistance } from "../../utils/calculateDistance";
import { useBookingStore } from "../../store/bookingStore";

export default function LotDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lot, setLot] = useState<ParkingLot | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [selectedFloor, setSelectedFloor] = useState(1);

  const bookingStore = useBookingStore();

  useEffect(() => {
    loadLot();
  }, [id]);

  const loadLot = async () => {
    try {
      if (id) {
        const data = await lotService.getLotDetail(id);
        setLot(data);
      }
    } catch (error) {
      console.error("Error loading lot:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !lot) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading lot details...</Text>
      </SafeAreaView>
    );
  }

  const filteredSlots = (lot.slots || []).filter(
    (s) => s.floor === selectedFloor,
  );
  const floors = [...new Set((lot.slots || []).map((s) => s.floor))].sort();

  const handleSlotSelect = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
  };

  const handleReserve = () => {
    if (!selectedSlot) return;
    bookingStore.setSlot(selectedSlot.id);
    // Store lot ID in booking store
    useBookingStore.setState({ lotId: lot.id });
    router.push(`/booking/${lot.id}`);
  };

  const renderSlot = ({ item }: { item: ParkingSlot }) => (
    <TouchableOpacity
      style={[
        styles.slot,
        {
          backgroundColor:
            item.status === "available"
              ? Colors.SLOT_FREE
              : item.status === "occupied"
                ? Colors.SLOT_FULL
                : item.status === "reserved"
                  ? Colors.SLOT_LOW
                  : Colors.SLOT_MAINT,
        },
        selectedSlot?.id === item.id && styles.slotSelected,
      ]}
      onPress={() => handleSlotSelect(item)}
      disabled={item.status !== "available"}
    >
      <Text style={styles.slotLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header with Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.BLUE_PRIMARY} />
        </TouchableOpacity>

        {/* Lot Header */}
        <View style={styles.lotHeader}>
          <Text style={styles.lotName}>{lot.name}</Text>
          <Text style={styles.address}>{lot.address}</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Available</Text>
              <Text style={styles.statValue}>
                {lot.availableSlots}/{lot.totalSlots}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Rating</Text>
              <Text style={styles.statValue}>⭐ {lot.rating}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>
                {formatDistance(lot.distanceMeters || 0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.pricingCard}>
          <Text style={styles.pricePerHour}>
            {formatPrice(lot.pricePerHour)}/hour
          </Text>
          <Text style={styles.pricePerDay}>
            {formatPrice(lot.pricePerDay)}/day
          </Text>
        </View>

        {/* Amenities */}
        <View style={styles.amenitiesSection}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {lot.amenities.covered && (
              <AmenityBadge icon="☂️" label="Covered" />
            )}
            {lot.amenities.evCharging && (
              <AmenityBadge icon="🔌" label="EV Charging" />
            )}
            {lot.amenities.cctv && <AmenityBadge icon="📹" label="CCTV" />}
            {lot.amenities.valet && <AmenityBadge icon="🚗" label="Valet" />}
            {lot.amenities.disabledAccess && (
              <AmenityBadge icon="♿" label="Disabled" />
            )}
          </View>
        </View>

        {/* Floor Selector */}
        {floors.length > 1 && (
          <View style={styles.floorSelector}>
            <Text style={styles.sectionTitle}>Floor</Text>
            <View style={styles.floorButtons}>
              {floors.map((floor) => (
                <TouchableOpacity
                  key={floor}
                  style={[
                    styles.floorButton,
                    selectedFloor === floor && styles.floorButtonActive,
                  ]}
                  onPress={() => setSelectedFloor(floor)}
                >
                  <Text
                    style={[
                      styles.floorButtonText,
                      selectedFloor === floor && styles.floorButtonTextActive,
                    ]}
                  >
                    Floor {floor}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Slots Grid */}
        <View style={styles.slotsSection}>
          <Text style={styles.sectionTitle}>Parking Slots</Text>
          <FlatList
            data={filteredSlots}
            renderItem={renderSlot}
            keyExtractor={(item) => item.id}
            numColumns={6}
            scrollEnabled={false}
            columnWrapperStyle={styles.slotRow}
            contentContainerStyle={styles.slotsGrid}
          />
        </View>
      </ScrollView>

      {/* Reserve Button */}
      <TouchableOpacity
        style={[
          styles.reserveButton,
          !selectedSlot && styles.reserveButtonDisabled,
        ]}
        onPress={handleReserve}
        disabled={!selectedSlot}
      >
        <Text style={styles.reserveButtonText}>
          {selectedSlot ? `Reserve ${selectedSlot.label}` : "Select a Slot"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function AmenityBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.amenityBadge}>
      <Text style={styles.amenityIcon}>{icon}</Text>
      <Text style={styles.amenityLabel}>{label}</Text>
    </View>
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
    paddingBottom: 100,
  },
  backButton: {
    marginBottom: Spacing.md,
  },
  lotHeader: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  lotName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.GRAY_900,
  },
  address: {
    fontSize: 14,
    color: Colors.GRAY_600,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: Colors.GRAY_500,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.BLUE_PRIMARY,
    marginTop: Spacing.xs,
  },
  pricingCard: {
    backgroundColor: Colors.BLUE_LIGHT,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  pricePerHour: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.BLUE_PRIMARY,
  },
  pricePerDay: {
    fontSize: 14,
    color: Colors.GRAY_600,
    marginTop: Spacing.xs,
  },
  amenitiesSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.GRAY_900,
    marginBottom: Spacing.md,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  amenityBadge: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.GRAY_200,
  },
  amenityIcon: {
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  amenityLabel: {
    fontSize: 12,
    color: Colors.GRAY_700,
  },
  floorSelector: {
    marginBottom: Spacing.lg,
  },
  floorButtons: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  floorButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.GRAY_300,
    alignItems: "center",
  },
  floorButtonActive: {
    backgroundColor: Colors.BLUE_PRIMARY,
    borderColor: Colors.BLUE_PRIMARY,
  },
  floorButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.GRAY_700,
  },
  floorButtonTextActive: {
    color: Colors.WHITE,
  },
  slotsSection: {
    marginBottom: Spacing.lg,
  },
  slotsGrid: {
    gap: Spacing.sm,
  },
  slotRow: {
    gap: Spacing.sm,
    flex: 1,
  },
  slot: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
  slotSelected: {
    borderWidth: 3,
    borderColor: Colors.BLUE_PRIMARY,
    opacity: 1,
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.WHITE,
  },
  reserveButton: {
    position: "absolute",
    bottom: Spacing.lg,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.BLUE_PRIMARY,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  reserveButtonDisabled: {
    backgroundColor: Colors.GRAY_400,
  },
  reserveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.WHITE,
  },
});
