# User Authentication (React Native)

A React Native mobile app that demonstrates a local authentication flow using React Context, Formik/Yup validation, and persistent session storage via AsyncStorage.

## Implemented Features

- **Authentication context**: Centralized auth state and actions through `AuthProvider` and `useAuth`.
- **Sign up flow**: Create an account with `name`, `email`, and `password`.
- **Duplicate email protection**: Prevents registering with an email that already exists.
- **Sign in flow**: Login with email/password and route to protected home screen.
- **Validation**: Form-level validation using `formik` + `yup` for sign-in and sign-up.
- **Session persistence**: Restores both users list and active user from AsyncStorage on app launch.
- **Conditional navigation**: Auth screens (`SignIn`, `SignUp`) vs protected screen (`Home`) based on user state.
- **Logout**: Clears current session from storage and returns user to auth screens.
- **Basic UI components**: Reusable custom `TextInput` and `Button` components, including password visibility toggle.

## Tech Stack

- React Native `0.85.2`
- React `19.2.3`
- TypeScript
- React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`)
- Formik + Yup
- AsyncStorage

## Prerequisites

Before running the app, make sure your machine is ready for React Native development:

- Node.js `>= 22.11.0` (required by this project)
- npm
- React Native Android/iOS environment setup:
  - Android Studio + emulator (for Android)
  - Xcode + iOS Simulator (for iOS, macOS only)

Follow the official React Native setup guide: [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment)

## Setup Instructions

1. Install dependencies:

```bash
npm install or yarn instal
```

2. For iOS, install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

3. Start Metro bundler:

```bash
yarn start
```

4. Run the app in another terminal:

- Android:

```bash
yarn android
```

- iOS:

```bash
yarn ios
```

## Available Scripts

- `npm start` - start Metro
- `npm run android` - build and run Android app
- `npm run ios` - build and run iOS app
- `npm run lint` - run ESLint
- `npm test` - run Jest tests
