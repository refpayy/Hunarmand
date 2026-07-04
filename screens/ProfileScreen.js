import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLang } from "../LangContext";
import { useAuth } from "../AuthContext";

export default function ProfileScreen() {
  const { t, lang, setLang } = useLang();
  const { profile, user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={{ color: "#fff", fontWeight: "900", fontSize: 26 }}>
          {(profile?.name || "U")[0].toUpperCase()}
        </Text>
      </View>
      <Text style={styles.name}>{profile?.name || "User"}</Text>
      <Text style={styles.phone}>{profile?.phone || user?.email}</Text>
      <Text style={styles.type}>{profile?.userType?.toUpperCase()}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>{t("home") === "Home" ? "Language" : "زبان"}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={[styles.langBtn, lang === "en" && styles.langBtnActive]}
            onPress={() => setLang("en")}
          >
            <Text style={lang === "en" ? styles.langTextActive : styles.langText}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, lang === "ur" && styles.langBtnActive]}
            onPress={() => setLang("ur")}
          >
            <Text style={lang === "ur" ? styles.langTextActive : styles.langText}>UR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>{t("logout")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 24, paddingTop: 70, backgroundColor: "#fff" },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: "#00C851", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  name: { fontSize: 20, fontWeight: "900", color: "#0E1420" },
  phone: { fontSize: 13, color: "#8A94A6", marginTop: 2 },
  type: { fontSize: 11, fontWeight: "700", color: "#007A33", marginTop: 6, backgroundColor: "#E8F9EE", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  card: { width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F4F6F8", borderRadius: 16, padding: 16, marginTop: 30 },
  cardLabel: { fontWeight: "700", color: "#0E1420" },
  langBtn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10, backgroundColor: "#E5E9EF" },
  langBtnActive: { backgroundColor: "#00C851" },
  langText: { color: "#5B6472", fontWeight: "700" },
  langTextActive: { color: "#fff", fontWeight: "700" },
  logoutBtn: { marginTop: 30, backgroundColor: "#FEECEC", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 14, width: "100%", alignItems: "center" },
  logoutText: { color: "#E53935", fontWeight: "800", fontSize: 15 },
});
