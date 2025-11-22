# Circle - AI-Powered Safety App

A native iOS and Android mobile application built with React Native, providing AI-powered safety monitoring for women.

## 🚀 Features

- **AI Routine Learning**: Learns user patterns over 14 days
- **Tiered Alert System**: Gentle check-ins to emergency escalation
- **Circle Network**: Trusted contacts for emergency response
- **Passive Monitoring**: Works in background without manual check-ins
- **Quick Actions**: Walking Home, Going Out, Traveling, Check In

## 📱 Screens

- Splash Screen
- Onboarding Flow (3 screens)
- Registration
- Home Screen (Learning & Protected modes)
- Emergency Screens (Tier 1, 2, 3)
- Circle Management
- Settings

## 🛠️ Tech Stack

- **React Native 0.73.0**
- **React Navigation 6** (Stack & Tab navigators)
- **React Native Reanimated** (Animations)
- **React Native Gesture Handler** (Touch interactions)
- **React Native Safe Area Context** (Safe area handling)
- **React Native Vector Icons** (Icons)
- **React Native Maps** (Location features)

## 📋 Prerequisites

- Node.js >= 18
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## 🔧 Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Install iOS dependencies:**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Install React Native CLI (if not already installed):**
   ```bash
   npm install -g react-native-cli
   ```

## 🏃 Running the App

### iOS

```bash
npm run ios
# or
yarn ios
```

This will open the iOS Simulator and run the app.

### Android

1. Start an Android emulator or connect a device
2. Run:
   ```bash
   npm run android
   # or
   yarn android
   ```

### Development Server

Start the Metro bundler:
```bash
npm start
# or
yarn start
```

## 📁 Project Structure

```
SafetyNet/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Button.js
│   │   ├── StatusCard.js
│   │   └── ActionCard.js
│   ├── constants/           # Design system constants
│   │   ├── Colors.js
│   │   ├── Typography.js
│   │   └── Spacing.js
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/             # Screen components
│   │   ├── SplashScreen.js
│   │   ├── OnboardingScreen.js
│   │   ├── RegistrationScreen.js
│   │   ├── HomeScreen.js
│   │   ├── EmergencyScreen.js
│   │   ├── CircleScreen.js
│   │   └── SettingsScreen.js
│   └── App.js               # Main app entry
├── ios/                     # iOS native code
├── android/                 # Android native code
├── package.json
└── README.md
```

## 🎨 Design System

The app follows the design specifications from `circle_screen_designs.md`:

- **Colors**: Primary Blue (#4A90E2), Alert Orange, Error Red
- **Typography**: SF Pro (iOS) / Roboto (Android)
- **Spacing**: 8pt grid system
- **Components**: Buttons, Cards, Status indicators

## 🔐 Permissions

The app will require the following permissions:

- **Location** (Always): For background tracking
- **Notifications**: For alerts and check-ins
- **Phone**: For emergency calls
- **Microphone**: For audio recording during emergencies

## 📦 Building for Production

### iOS

1. Open `ios/Circle.xcworkspace` in Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Follow App Store submission process

### Android

```bash
cd android
./gradlew assembleRelease
```

APK will be in `android/app/build/outputs/apk/release/`

## 🧪 Testing

```bash
npm test
# or
yarn test
```

## 📝 Notes

- The app uses React Native Linear Gradient (you may need to install: `npm install react-native-linear-gradient`)
- For production, you'll need to:
  - Set up proper authentication
  - Configure backend API endpoints
  - Add location tracking services
  - Implement push notifications
  - Set up emergency response systems

## 🐛 Troubleshooting

### iOS Build Issues

- Run `cd ios && pod install && cd ..`
- Clean build folder in Xcode: Product → Clean Build Folder
- Delete `ios/build` and `ios/Pods` folders

### Android Build Issues

- Run `cd android && ./gradlew clean && cd ..`
- Check Android SDK versions in `android/build.gradle`
- Ensure JAVA_HOME is set correctly

### Metro Bundler Issues

- Clear cache: `npm start -- --reset-cache`
- Delete `node_modules` and reinstall

## 📄 License

This project is part of the Circle Safety App design package.

## 👥 Contributing

This is a prototype implementation. For production development, follow your team's contribution guidelines.

---

**Built with React Native** | **Design by Circle Team** | **Version 1.0.0**
