import { Stack } from "expo-router";
import { useThemeStore } from "../store/themeStore";
import { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";

export default function RootLayout() {
  const theme = useThemeStore((s) => s.theme);
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = theme.colors.bg;
      document.body.style.color = theme.colors.textPrimary;
      document.body.style.transition =
        "background-color 0.3s ease, color 0.3s ease";
    }
  }, [mode]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.bg },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="lot/[id]"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="booking/[lotId]"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="confirmation/[bookingId]"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </View>
  );
}
