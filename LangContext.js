import React, { createContext, useContext, useState } from "react";

export const STR = {
  en: {
    appName: "HUNARMAND",
    tagline: "Pakistan's #1 Skill Worker Marketplace",
    selectLang: "Choose Your Language",
    login: "Login",
    signup: "Sign Up",
    customer: "Customer",
    worker: "Skilled Worker",
    helper: "General Worker",
    mobileNumber: "Mobile Number",
    password: "Password",
    fullName: "Full Name",
    loginBtn: "Login",
    signupBtn: "Create Account",
    findWorker: "Find a Worker",
    search: "Search electrician, plumber...",
    categories: "Categories",
    popularWorkers: "Popular Workers",
    bookNow: "Book Now",
    home: "Home",
    bookings: "Bookings",
    wallet: "Wallet",
    profile: "Profile",
    logout: "Logout",
    noAccount: "Don't have an account? Sign Up",
    haveAccount: "Already have an account? Login",
  },
  ur: {
    appName: "ہنر مند",
    tagline: "پاکستان کی نمبر ون سکل مارکیٹ پلیس",
    selectLang: "اپنی زبان منتخب کریں",
    login: "لاگ ان",
    signup: "رجسٹر کریں",
    customer: "کسٹمر",
    worker: "ہنر مند ورکر",
    helper: "جنرل ورکر",
    mobileNumber: "موبائل نمبر",
    password: "پاسورڈ",
    fullName: "پورا نام",
    loginBtn: "لاگ ان کریں",
    signupBtn: "اکاؤنٹ بنائیں",
    findWorker: "ورکر تلاش کریں",
    search: "الیکٹریشن، پلمبر تلاش کریں...",
    categories: "کیٹیگریز",
    popularWorkers: "مقبول ورکرز",
    bookNow: "بک کریں",
    home: "ہوم",
    bookings: "بکنگز",
    wallet: "والٹ",
    profile: "پروفائل",
    logout: "لاگ آؤٹ",
    noAccount: "اکاؤنٹ نہیں؟ رجسٹر کریں",
    haveAccount: "پہلے سے اکاؤنٹ ہے؟ لاگ ان",
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = (key) => (STR[lang] && STR[lang][key]) || STR.en[key] || key;
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
