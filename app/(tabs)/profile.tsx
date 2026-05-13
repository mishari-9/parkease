import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useUserStore } from '../../store/userStore';
import { mockUser } from '../../mock-data/user';
import { Colors, Spacing, BorderRadius } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

export default function ProfileScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Load mock user
    if (!user) {
      setUser(mockUser);
    }
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.fullName}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userPhone}>{user.phone}</Text>
          </View>
        </View>

        {/* Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Vehicles ({user.vehicles.length})</Text>
          {user.vehicles.map((vehicle) => (
            <View key={vehicle.id} style={styles.itemCard}>
              <Text style={styles.itemText}>
                {vehicle.make} {vehicle.model}
              </Text>
              <Text style={styles.itemSubtext}>{vehicle.plate}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods ({user.paymentMethods.length})</Text>
          {user.paymentMethods.map((method) => (
            <View key={method.id} style={styles.itemCard}>
              <Text style={styles.itemText}>{method.method.replace('_', ' ').toUpperCase()}</Text>
              {method.lastFour && <Text style={styles.itemSubtext}>•••• {method.lastFour}</Text>}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Lots ({user.savedLotIds.length})</Text>
          {user.savedLotIds.length > 0 ? (
            user.savedLotIds.map((lotId) => (
              <View key={lotId} style={styles.itemCard}>
                <Text style={styles.itemText}>Lot {lotId}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No saved lots yet</Text>
          )}
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="language" size={20} color={Colors.BLUE_PRIMARY} />
          <Text style={styles.actionText}>Change Language</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out" size={20} color={Colors.ERROR} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    gap: Spacing.lg,
  },
  profileHeader: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.BLUE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.GRAY_900,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.GRAY_600,
    marginTop: Spacing.xs,
  },
  userPhone: {
    fontSize: 14,
    color: Colors.GRAY_600,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.GRAY_900,
    paddingHorizontal: Spacing.sm,
  },
  itemCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.BLUE_PRIMARY,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.GRAY_900,
  },
  itemSubtext: {
    fontSize: 12,
    color: Colors.GRAY_500,
    marginTop: Spacing.xs,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.GRAY_500,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  actionButton: {
    backgroundColor: Colors.WHITE,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.BLUE_PRIMARY,
  },
  logoutButton: {
    backgroundColor: Colors.ERROR,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.WHITE,
  },
});
