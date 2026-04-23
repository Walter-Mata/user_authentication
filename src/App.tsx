import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './context/MainContext';

import AppStack from './navigation/AppStack';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppStack />
      </AuthProvider>
    </NavigationContainer>
  );
}
