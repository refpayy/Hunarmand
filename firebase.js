import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDCmMgqMmMDcSzrMdA3g0dz--6IuIYWRiA",
  authDomain: "hunarmand-14142.firebaseapp.com",
  projectId: "hunarmand-14142",
  storageBucket: "hunarmand-14142.firebasestorage.app",
  messagingSenderId: "308899972176",
  appId: "1:308899972176:web:866c77443cab0763c67d55",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Web (Snack preview) uses default browser persistence; native uses AsyncStorage
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export const db = getFirestore(app);
export default app;
