# HUNARMAND — Real App (React Native + Expo + Firebase)

## Isme kya hai
- Splash Screen
- Language Selection (Urdu/English)
- Login/Signup (real Firebase auth — Customer, Skilled Worker, General Worker)
- Home Screen (working categories filter + worker list + search)
- Worker Detail Screen (working "Book Now" button)
- Bottom Tabs: Home, Bookings, Wallet, Profile (sab clickable)
- Profile: language switch + real logout button

## Setup Karne Ka Tareeqa

### Option A: GitHub se Expo Snack mein import (recommended, sabse asaan)
1. Is poori folder ki saari files apne GitHub repo (HUNARMAND) mein upload kar do:
   - GitHub.com kholo apne repo mein
   - "Add file" > "Upload files" dabao
   - Yahan ki saari files (App.js, firebase.js, LangContext.js, AuthContext.js, package.json, app.json, aur screens/ folder ki 7 files) ek sath select kar ke upload kar do
   - "Commit changes" dabao
2. Phir [snack.expo.dev](https://snack.expo.dev) kholo
3. Menu se "Import Git repository" option dhundo
4. Apne GitHub repo ka URL paste karo (jaise `https://github.com/refpayy/Hunarmand`)
5. Import ho jaye to "Run on your device" se QR code milega — Expo Go se scan karo

### Option B: Manually files paste karna Snack mein
Agar GitHub import na chale, to Snack mein manually har file ka naam se naya file banao aur uska content copy-paste kar do, isi order mein:
1. App.js
2. firebase.js
3. LangContext.js
4. AuthContext.js
5. screens/SplashScreen.js
6. screens/LanguageScreen.js
7. screens/LoginScreen.js
8. screens/HomeScreen.js
9. screens/WorkerDetailScreen.js
10. screens/BookingsScreen.js
11. screens/WalletScreen.js
12. screens/ProfileScreen.js

## Zaroori Baat
- Firebase config already `firebase.js` mein daal diya gaya hai (aapke real Firebase project ka)
- Login: phone number + password se hota hai (background mein Firebase email format use hota hai)
- Signup karte hi Firestore mein `users` collection mein data save ho jayega
- Storage (photo upload) abhi shamil nahi kiya (card na hone ki wajah se) — baad mein add hoga
