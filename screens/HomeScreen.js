import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLang } from "../LangContext";
import { useAuth } from "../AuthContext";

const CATEGORIES = [
  { l: "Electrician", e: "⚡" },
  { l: "Plumber", e: "🔧" },
  { l: "Tailor", e: "🪡" },
  { l: "Driver", e: "🚗" },
  { l: "Laborer", e: "💪" },
  { l: "Mason", e: "🧱" },
  { l: "Painter", e: "🎨" },
  { l: "Carpenter", e: "🪚" },
];

const WORKERS = [
  { id: "1", name: "Muhammad Ali", profession: "Electrician", rating: 4.8, reviews: 127, city: "Lahore", price: 500, initials: "MA", color: "#00C851" },
  { id: "2", name: "Ahmed Khan", profession: "Plumber", rating: 4.5, reviews: 89, city: "Karachi", price: 400, initials: "AK", color: "#007A33" },
  { id: "3", name: "Rashid Hussain", profession: "Tailor", rating: 4.6, reviews: 64, city: "Islamabad", price: 300, initials: "RH", color: "#FFB300" },
  { id: "4", name: "Bilal Ahmed", profession: "Driver", rating: 4.3, reviews: 42, city: "Lahore", price: 350, initials: "BA", color: "#00BCD4" },
];

export default function HomeScreen({ navigation }) {
  const { t } = useLang();
  const { profile, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = WORKERS.filter((w) => {
    const matchesCategory = !activeCategory || w.profession === activeCategory;
    const matchesSearch =
      !search || w.profession.toLowerCase().includes(search.toLowerCase()) || w.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <LinearGradient colors={["#007A33", "#00C851"]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good Morning, {profile?.name || "there"} 👋</Text>
            <Text style={styles.headerTitle}>{t("findWorker")}</Text>
          </View>
          <TouchableOpacity style={styles.avatar} onPress={logout}>
            <Text style={{ color: "#fff", fontWeight: "800" }}>
              {(profile?.name || "U")[0].toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.search}
          placeholder={t("search")}
          value={search}
          onChangeText={setSearch}
        />
      </LinearGradient>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>{t("categories")}</Text>
              {activeCategory && (
                <TouchableOpacity onPress={() => setActiveCategory(null)}>
                  <Text style={styles.clearFilter}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.catGrid}>
              {CATEGORIES.map((c) => (
                <TouchableOpacity
                  key={c.l}
                  style={[
                    styles.catItem,
                    activeCategory === c.l && styles.catItemActive,
                  ]}
                  onPress={() =>
                    setActiveCategory(activeCategory === c.l ? null : c.l)
                  }
                >
                  <Text style={{ fontSize: 24 }}>{c.e}</Text>
                  <Text style={styles.catLabel}>{c.l}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
              {t("popularWorkers")} ({filtered.length})
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workerCard}
            onPress={() => navigation.navigate("WorkerDetail", { worker: item })}
          >
            <View style={[styles.workerAvatar, { backgroundColor: item.color }]}>
              <Text style={{ color: "#fff", fontWeight: "800" }}>{item.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.workerName}>{item.name}</Text>
              <Text style={styles.workerProfession}>{item.profession}</Text>
              <Text style={styles.workerMeta}>
                ⭐ {item.rating} ({item.reviews}) · 📍 {item.city}
              </Text>
            </View>
            <View>
              <Text style={styles.price}>Rs.{item.price}</Text>
              <Text style={styles.priceUnit}>/hr</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#8A94A6", marginTop: 40 }}>
            Koi worker nahi mila
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 55, paddingBottom: 22, paddingHorizontal: 20, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  greeting: { color: "rgba(255,255,255,0.85)", fontSize: 13 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "900", marginTop: 2 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" },
  search: { backgroundColor: "#fff", borderRadius: 14, padding: 14, fontSize: 14 },
  sectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#0E1420" },
  clearFilter: { color: "#00C851", fontWeight: "700" },
  catGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  catItem: { width: "22.5%", alignItems: "center", backgroundColor: "#F4F6F8", borderRadius: 16, paddingVertical: 14, gap: 6 },
  catItemActive: { backgroundColor: "#E8F9EE", borderWidth: 1.5, borderColor: "#00C851" },
  catLabel: { fontSize: 10, fontWeight: "700", color: "#5B6472", textAlign: "center" },
  workerCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#EEF1F4", borderRadius: 16, padding: 14, marginBottom: 12 },
  workerAvatar: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  workerName: { fontWeight: "800", fontSize: 15, color: "#0E1420" },
  workerProfession: { color: "#8A94A6", fontSize: 12, marginTop: 1 },
  workerMeta: { color: "#8A94A6", fontSize: 11, marginTop: 3 },
  price: { color: "#00C851", fontWeight: "800", fontSize: 15, textAlign: "right" },
  priceUnit: { color: "#8A94A6", fontSize: 10, textAlign: "right" },
});
