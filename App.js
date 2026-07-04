import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, ActivityIndicator } from "react-native";

import { LangProvider, useLang } from "./LangContext";
import { AuthProvider, useAuth } from "./AuthContext";

import SplashScreen from "./screens/SplashScreen";
import LanguageScreen from "./screens/LanguageScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import WorkerDetailScreen from "./screens/WorkerDetailScreen";
import BookingsScreen from "./screens/BookingsScreen";
import WalletScreen from "./screens/WalletScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs shown once a user is logged in
function MainTabs() {
  const { t } = useLang();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00C851",
        tabBarInactiveTintColor: "#8A94A6",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: t("home"), tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{ title: t("bookings"), tabBarIcon: () => <Text>📋</Text> }}
      />
      <Tab.Screen
        name="WalletTab"
        component={WalletScreen}
        options={{ title: t("wallet"), tabBarIcon: () => <Text>💰</Text> }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: t("profile"), tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tab.Navigator>
  );
}

// Stack shown when a user is not logged in yet
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// Stack shown when logged in: bottom tabs + detail screens on top
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="WorkerDetail" component={WorkerDetailScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#00C851" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </LangProvider>
  );
}
