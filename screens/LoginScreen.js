import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useLang } from "../LangContext";

function phoneToEmail(phone) {
  const clean = phone.replace(/[^0-9]/g, "");
  return `${clean}@hunarmand.app`;
}

export default function LoginScreen({ navigation }) {
  const { t } = useLang();
  const [mode, setMode] = useState("login");
  const [utype, setUtype] = useState("customer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userTypes = [
    { id: "customer", label: t("customer"), icon: "👤" },
    { id: "worker", label: t("worker"), icon: "🔧" },
    { id: "helper", label: t("helper"), icon: "🧱" },
  ];

  const handleSubmit = async () => {
    if (!phone || !password || (mode === "signup" && !name)) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    setLoading(true);
    const email = phoneToEmail(phone);
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), {
          name,
          phone,
          userType: utype,
          createdAt: new Date().toISOString(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      Alert.alert("Error", friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <LinearGradient colors={["#007A33", "#00C851"]} style={styles.header}>
        <Text style={styles.appName}>{t("appName")}</Text>
        <Text style={styles.slogan}>ہنر مند پاکستان، خوشحال پاکستان</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.tabRow}>
          {["login", "signup"].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.tab, mode === m && styles.tabActive]}
              onPress={() => setMode(m)}
            >
              <Text style={[styles.tabText, mode === m && styles.tabTextActive]}>
                {m === "login" ? t("login") : t("signup")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.typeRow}>
          {userTypes.map((ut) => (
            <TouchableOpacity
              key={ut.id}
              style={[styles.typeBox, utype === ut.id && styles.typeBoxActive]}
              onPress={() => setUtype(ut.id)}
            >
              <Text style={{ fontSize: 20 }}>{ut.icon}</Text>
              <Text
                style={[styles.typeLabel, utype === ut.id && styles.typeLabelActive]}
              >
                {ut.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {mode === "signup" && (
          <TextInput
            style={styles.input}
            placeholder={t("fullName")}
            value={name}
            onChangeText={setName}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder={t("mobileNumber")}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder={t("password")}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>
              {mode === "login" ? t("loginBtn") : t("signupBtn")}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode(mode === "login" ? "signup" : "login")}
        >
          <Text style={styles.switchText}>
            {mode === "login" ? t("noAccount") : t("haveAccount")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function friendlyError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Ye number pehle se register hai. Login karein.";
    case "auth/invalid-email":
      return "Sahi mobile number likhein.";
    case "auth/weak-password":
      return "Password kam se kam 6 characters ka hona chahiye.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Number ya password ghalat hai.";
    default:
      return "Kuch ghalat ho gaya, dobara try karein.";
  }
}

const styles = StyleSheet.create({
  header: { paddingTop: 60, paddingBottom: 36, paddingHorizontal: 24, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  appName: { fontSize: 30, fontWeight: "900", color: "#fff" },
  slogan: { fontSize: 13, color: "#fff", marginTop: 6, fontWeight: "700" },
  body: { padding: 22, paddingBottom: 60 },
  tabRow: { flexDirection: "row", backgroundColor: "#F4F6F8", borderRadius: 14, padding: 4, marginBottom: 18 },
  tab: { flex: 1, paddingVertical: 11, borderRadius: 11, alignItems: "center" },
  tabActive: { backgroundColor: "#00C851" },
  tabText: { color: "#8A94A6", fontWeight: "700" },
  tabTextActive: { color: "#fff" },
  typeRow: { flexDirection: "row", gap: 8, marginBottom: 18 },
  typeBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#E5E9EF",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    gap: 4,
  },
  typeBoxActive: { borderColor: "#00C851", backgroundColor: "#E8F9EE" },
  typeLabel: { fontSize: 11, fontWeight: "700", color: "#5B6472", textAlign: "center" },
  typeLabelActive: { color: "#007A33" },
  input: {
    borderWidth: 1.5,
    borderColor: "#E5E9EF",
    borderRadius: 13,
    padding: 14,
    fontSize: 15,
    marginBottom: 14,
  },
  submitBtn: {
    backgroundColor: "#00C851",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 6,
  },
  submitText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  switchText: { textAlign: "center", color: "#00C851", fontWeight: "700", marginTop: 16 },
});
