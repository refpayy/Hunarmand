import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLang } from "../LangContext";

export default function WorkerDetailScreen({ route, navigation }) {
  const { worker } = route.params;
  const { t } = useLang();

  const handleBook = () => {
    Alert.alert(
      "Booking Confirm",
      `${worker.name} (${worker.profession}) ko book karna chahte hain? Rate: Rs.${worker.price}/hr`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () =>
            Alert.alert("✅ Booked!", "Aapki booking confirm ho gayi hai."),
        },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <LinearGradient colors={["#007A33", "#00C851"]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{ color: "#fff", fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <View style={[styles.avatar, { backgroundColor: worker.color }]}>
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 26 }}>
            {worker.initials}
          </Text>
        </View>
        <Text style={styles.name}>{worker.name}</Text>
        <Text style={styles.profession}>{worker.profession}</Text>
        <Text style={styles.meta}>
          ⭐ {worker.rating} ({worker.reviews} reviews) · 📍 {worker.city}
        </Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Rate</Text>
          <Text style={styles.priceValue}>Rs. {worker.price}/hr</Text>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          {worker.name} is an experienced {worker.profession.toLowerCase()} based in{" "}
          {worker.city}, verified by HUNARMAND with a CNIC verification badge and a
          strong track record of {worker.reviews}+ completed jobs.
        </Text>

        <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
          <Text style={styles.bookText}>{t("bookNow")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 55, paddingBottom: 30, alignItems: "center", borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
  backBtn: { position: "absolute", top: 55, left: 20 },
  avatar: { width: 76, height: 76, borderRadius: 38, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  name: { color: "#fff", fontSize: 20, fontWeight: "900" },
  profession: { color: "rgba(255,255,255,0.9)", fontSize: 14, marginTop: 2 },
  meta: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 6 },
  body: { padding: 22 },
  priceCard: { backgroundColor: "#E8F9EE", borderRadius: 16, padding: 18, marginBottom: 20 },
  priceLabel: { color: "#5B6472", fontSize: 12 },
  priceValue: { color: "#007A33", fontSize: 24, fontWeight: "900", marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "800", marginBottom: 8, color: "#0E1420" },
  aboutText: { color: "#5B6472", fontSize: 14, lineHeight: 21, marginBottom: 30 },
  bookBtn: { backgroundColor: "#00C851", borderRadius: 16, paddingVertical: 17, alignItems: "center" },
  bookText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
