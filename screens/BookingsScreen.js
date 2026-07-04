import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLang } from "../LangContext";

export default function BookingsScreen() {
  const { t } = useLang();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📋</Text>
      <Text style={styles.title}>{t("bookings")}</Text>
      <Text style={styles.sub}>Koi booking abhi tak nahi hai</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 30, paddingTop: 100 },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "800", color: "#0E1420" },
  sub: { fontSize: 13, color: "#8A94A6", marginTop: 6 },
});
