import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLang } from "../LangContext";

export default function LanguageScreen({ navigation }) {
  const { setLang } = useLang();
  const [selected, setSelected] = useState("en");

  const options = [
    { id: "ur", flag: "🇵🇰", label: "اردو", sub: "Urdu" },
    { id: "en", flag: "🇬🇧", label: "English", sub: "انگریزی" },
  ];

  const handleContinue = () => {
    setLang(selected);
    navigation.replace("Login");
  };

  return (
    <LinearGradient colors={["#007A33", "#00C851"]} style={styles.container}>
      <Text style={styles.title}>Choose Your Language</Text>
      <Text style={styles.titleUr}>اپنی زبان منتخب کریں</Text>

      <View style={styles.optionsWrap}>
        {options.map((o) => (
          <TouchableOpacity
            key={o.id}
            style={[styles.option, selected === o.id && styles.optionActive]}
            onPress={() => setSelected(o.id)}
          >
            <Text style={styles.flag}>{o.flag}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.optLabel}>{o.label}</Text>
              <Text style={styles.optSub}>{o.sub}</Text>
            </View>
            {selected === o.id && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>
          {selected === "ur" ? "جاری رکھیں" : "Continue"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 28 },
  title: { fontSize: 24, fontWeight: "900", color: "#fff", textAlign: "center" },
  titleUr: { fontSize: 20, fontWeight: "900", color: "#fff", marginTop: 6, marginBottom: 30 },
  optionsWrap: { width: "100%", gap: 14 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 14,
  },
  optionActive: { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.18)" },
  flag: { fontSize: 28 },
  optLabel: { fontSize: 18, fontWeight: "800", color: "#fff" },
  optSub: { fontSize: 12, color: "rgba(255,255,255,0.75)" },
  check: { fontSize: 18, color: "#fff", fontWeight: "700" },
  continueBtn: {
    marginTop: 30,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  continueText: { color: "#007A33", fontWeight: "800", fontSize: 16 },
});
