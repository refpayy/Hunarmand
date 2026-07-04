import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Language");
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#007A33", "#00C851"]} style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoIcon}>🔧</Text>
      </View>
      <Text style={styles.title}>HUNARMAND</Text>
      <Text style={styles.slogan}>ہنر مند پاکستان، خوشحال پاکستان</Text>
      <Text style={styles.tagline}>Pakistan's #1 Skill Worker Marketplace</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoIcon: { fontSize: 50 },
  title: { fontSize: 34, fontWeight: "900", color: "#fff", letterSpacing: 1 },
  slogan: { fontSize: 15, color: "#fff", marginTop: 10, fontWeight: "700" },
  tagline: { fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 4 },
});
