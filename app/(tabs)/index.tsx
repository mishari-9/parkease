import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated as RNAnimated,
  Platform,
} from "react-native";
import { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { useThemeStore } from "../../store/themeStore";
import { qassimParkingLots } from "../../mock-data/qassim-lots";
import { ParkingLot } from "../../types";
import { formatPrice } from "../../utils/formatPrice";
import { formatDistance } from "../../utils/calculateDistance";
import { router } from "expo-router";

// ============================================
// Home Map Screen - Premium Design with Map
// ============================================

const MAP_CENTER = { lat: 26.347, lng: 43.768 };
const MAP_ZOOM = 15;

// Reusable Badge Component
const StatusBadge = memo(
  ({ available, total }: { available: number; total: number }) => {
    const t = useThemeStore((s) => s.theme);
    const ratio = available / total;
    const color =
      ratio > 0.3
        ? t.colors.success
        : ratio > 0.1
          ? t.colors.warning
          : t.colors.error;
    const bgColor =
      ratio > 0.3
        ? t.colors.successLight
        : ratio > 0.1
          ? t.colors.warningLight
          : t.colors.errorLight;
    return (
      <View style={[s.badge, { backgroundColor: bgColor, borderColor: color }]}>
        <View style={[s.badgeDot, { backgroundColor: color }]} />
        <Text style={[s.badgeText, { color }]}>{available}</Text>
      </View>
    );
  },
);

// Floating Stats Card
const StatsCard = memo(() => {
  const t = useThemeStore((s) => s.theme);
  const totalLots = qassimParkingLots.length;
  const totalSlots = qassimParkingLots.reduce((s, l) => s + l.totalSlots, 0);
  const availableSlots = qassimParkingLots.reduce(
    (s, l) => s + l.availableSlots,
    0,
  );
  return (
    <View
      style={[
        stats.container,
        { backgroundColor: t.colors.bgGlass, borderColor: t.colors.border },
      ]}
    >
      {[
        { label: "مواقف", value: totalLots, icon: "🅿️" },
        { label: "متاح", value: availableSlots, icon: "🟢" },
        { label: "الإجمالي", value: totalSlots, icon: "📊" },
      ].map((st, i) => (
        <View key={i} style={stats.item}>
          <Text style={s.statIcon}>{st.icon}</Text>
          <Text style={[s.statValue, { color: t.colors.textPrimary }]}>
            {st.value}
          </Text>
          <Text style={[s.statLabel, { color: t.colors.textSecondary }]}>
            {st.label}
          </Text>
        </View>
      ))}
    </View>
  );
});

// Lot Card
const LotCard = memo(({ lot }: { lot: ParkingLot }) => {
  const t = useThemeStore((s) => s.theme);
  const mode = useThemeStore((s) => s.mode);
  const availabilityPct = Math.round(
    (lot.availableSlots / lot.totalSlots) * 100,
  );

  return (
    <TouchableOpacity
      style={[
        card.wrapper,
        { backgroundColor: t.colors.bgCard, borderColor: t.colors.border },
      ]}
      onPress={() => router.push(`/lot/${lot.id}`)}
      activeOpacity={0.7}
    >
      <View style={card.header}>
        <View style={card.titleRow}>
          <Text
            style={[card.name, { color: t.colors.textPrimary }]}
            numberOfLines={1}
          >
            {lot.name}
          </Text>
          <StatusBadge available={lot.availableSlots} total={lot.totalSlots} />
        </View>
        <Text
          style={[card.address, { color: t.colors.textSecondary }]}
          numberOfLines={1}
        >
          {lot.address}
        </Text>
      </View>
      <View style={card.body}>
        <View style={card.availabilityBar}>
          <View
            style={[
              card.availabilityFill,
              {
                width: `${availabilityPct}%`,
                backgroundColor:
                  availabilityPct > 30
                    ? t.colors.success
                    : availabilityPct > 10
                      ? t.colors.warning
                      : t.colors.error,
              },
            ]}
          />
        </View>
        <View style={card.infoRow}>
          <View style={card.infoItem}>
            <Text style={[card.infoLabel, { color: t.colors.textTertiary }]}>
              النسبة
            </Text>
            <Text style={[card.infoValue, { color: t.colors.textPrimary }]}>
              {availabilityPct}%
            </Text>
          </View>
          <View style={card.infoItem}>
            <Text style={[card.infoLabel, { color: t.colors.textTertiary }]}>
              التقييم
            </Text>
            <Text style={[card.infoValue, { color: t.colors.warning }]}>
              ★ {lot.rating}
            </Text>
          </View>
          <View style={card.infoItem}>
            <Text style={[card.infoLabel, { color: t.colors.textTertiary }]}>
              السعر
            </Text>
            <Text style={[card.infoValue, { color: t.colors.primary }]}>
              {formatPrice(lot.pricePerHour)}
            </Text>
          </View>
          <View style={card.infoItem}>
            <Text style={[card.infoLabel, { color: t.colors.textTertiary }]}>
              المسافة
            </Text>
            <Text style={[card.infoValue, { color: t.colors.textPrimary }]}>
              {formatDistance(lot.distanceMeters || 0)}
            </Text>
          </View>
        </View>
      </View>
      {lot.amenities.covered && (
        <View
          style={[card.amenityTag, { backgroundColor: t.colors.primaryLight }]}
        >
          <Text style={[card.amenityText, { color: t.colors.primary }]}>
            ☂️ مغطى
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

// Map View (Web)
const MapView = memo(() => {
  const t = useThemeStore((s) => s.theme);
  const mode = useThemeStore((s) => s.mode);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Platform.OS === "web" && mapRef.current) {
      const loadMap = async () => {
        const L = (window as any).L;
        if (!L) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
          await new Promise<void>((resolve) => {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            script.onload = () => resolve();
            document.head.appendChild(script);
          });
        }
        const LL = (window as any).L;
        if (!LL || !mapRef.current) return;
        if ((mapRef.current as any)._map) return;

        const tileUrl =
          mode === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        const map = LL.map(mapRef.current).setView(
          [MAP_CENTER.lat, MAP_CENTER.lng],
          MAP_ZOOM,
        );
        LL.tileLayer(tileUrl, {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
          maxZoom: 19,
        }).addTo(map);

        qassimParkingLots.forEach((lot) => {
          const ratio = lot.availableSlots / lot.totalSlots;
          const color =
            ratio > 0.3 ? "#10B981" : ratio > 0.1 ? "#F59E0B" : "#EF4444";
          const icon = LL.divIcon({
            className: "custom-pin",
            html: `<div style="
              background:${color};color:#fff;border-radius:50%;width:36px;height:36px;
              display:flex;align-items:center;justify-content:center;font-size:13px;
              font-weight:700;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);
              cursor:pointer;transition:transform 0.2s;
            ">${lot.availableSlots}</div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          });
          const marker = LL.marker([lot.location.lat, lot.location.lng], {
            icon,
          }).addTo(map);
          marker.bindPopup(`
            <div style="font-family:sans-serif;min-width:200px;text-align:right;direction:rtl">
              <strong style="font-size:15px">${lot.name}</strong>
              <p style="margin:4px 0;color:#666;font-size:12px">${lot.address}</p>
              <div style="display:flex;gap:8px;font-size:13px">
                <span>🟢 ${lot.availableSlots}/${lot.totalSlots}</span>
                <span>⭐ ${lot.rating}</span>
                <span>${formatPrice(lot.pricePerHour)}/ساعة</span>
              </div>
              <a href="/lot/${lot.id}" style="
                display:block;margin-top:8px;text-align:center;background:#2563EB;
                color:#fff;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:13px
              ">عرض التفاصيل</a>
            </div>
          `);
        });
        (mapRef.current as any)._map = map;
      };
      loadMap();
    }
  }, [mode]);

  return (
    <View style={[mapStyles.container, { backgroundColor: t.colors.bg }]}>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", borderRadius: 0 }}
      />
    </View>
  );
});

// Main Screen
export default function HomeMapScreen() {
  const t = useThemeStore((s) => s.theme);
  const mode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const fadeAnim = useRef(new RNAnimated.Value(1)).current;

  const switchView = useCallback((vm: "map" | "list") => {
    RNAnimated.sequence([
      RNAnimated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      RNAnimated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
    setViewMode(vm);
  }, []);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: t.colors.bg }]}>
      {/* Top Bar */}
      <View
        style={[
          topBar.container,
          {
            backgroundColor: t.colors.bgGlass,
            borderBottomColor: t.colors.border,
          },
        ]}
      >
        <View style={topBar.brand}>
          <Text style={[topBar.logo, { color: t.colors.primary }]}>🅿️</Text>
          <View>
            <Text style={[topBar.title, { color: t.colors.textPrimary }]}>
              ParkEase
            </Text>
            <Text style={[topBar.sub, { color: t.colors.textSecondary }]}>
              جامعة القصيم
            </Text>
          </View>
        </View>
        <View style={topBar.actions}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[topBar.iconBtn, { backgroundColor: t.colors.borderLight }]}
          >
            <Text style={topBar.icon}>{mode === "light" ? "🌙" : "☀️"}</Text>
          </TouchableOpacity>
          <View
            style={[
              topBar.viewToggle,
              { backgroundColor: t.colors.borderLight },
            ]}
          >
            <TouchableOpacity
              onPress={() => switchView("map")}
              style={[
                topBar.toggleBtn,
                viewMode === "map" && { backgroundColor: t.colors.primary },
              ]}
            >
              <Text
                style={[
                  topBar.toggleText,
                  viewMode === "map" && { color: "#fff" },
                ]}
              >
                🗺️
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => switchView("list")}
              style={[
                topBar.toggleBtn,
                viewMode === "list" && { backgroundColor: t.colors.primary },
              ]}
            >
              <Text
                style={[
                  topBar.toggleText,
                  viewMode === "list" && { color: "#fff" },
                ]}
              >
                📋
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Bar */}
      <StatsCard />

      {/* Content */}
      <RNAnimated.View style={[styles.content, { opacity: fadeAnim }]}>
        {viewMode === "map" ? (
          <MapView />
        ) : (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
          >
            {qassimParkingLots.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </ScrollView>
        )}
      </RNAnimated.View>

      {/* FAB */}
      <TouchableOpacity
        style={[fab.container, { backgroundColor: t.colors.primary }]}
        onPress={() => switchView(viewMode === "map" ? "list" : "map")}
      >
        <Text style={fab.text}>{viewMode === "map" ? "📋" : "🗺️"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ============== Styles ==============
const s = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4 },
  badgeText: { fontSize: 12, fontWeight: "700" },
  statIcon: { fontSize: 20, marginBottom: 2 },
  statValue: { fontSize: 20, fontWeight: "800" },
  statLabel: { fontSize: 11, fontWeight: "500" },
});

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 12, gap: 12, paddingBottom: 100 },
});

const topBar = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { fontSize: 28 },
  title: { fontSize: 20, fontWeight: "800" },
  sub: { fontSize: 11, fontWeight: "500" },
  actions: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 18 },
  viewToggle: { flexDirection: "row", borderRadius: 20, padding: 3 },
  toggleBtn: {
    width: 38,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: { fontSize: 16 },
});

const stats = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    justifyContent: "space-around",
  },
  item: { alignItems: "center", gap: 3 },
});

const card = StyleSheet.create({
  wrapper: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  header: { padding: 14, paddingBottom: 0 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 15, fontWeight: "700", flex: 1, marginRight: 8 },
  address: { fontSize: 12, marginTop: 3 },
  body: { padding: 14 },
  availabilityBar: {
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    marginBottom: 12,
  },
  availabilityFill: { height: "100%", borderRadius: 3 },
  infoRow: { flexDirection: "row", justifyContent: "space-between" },
  infoItem: { alignItems: "center", gap: 3 },
  infoLabel: { fontSize: 11, fontWeight: "500" },
  infoValue: { fontSize: 14, fontWeight: "700" },
  amenityTag: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  amenityText: { fontSize: 11, fontWeight: "600" },
});

const mapStyles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
});

const fab = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: { fontSize: 24 },
});
