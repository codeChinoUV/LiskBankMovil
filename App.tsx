import React from 'react';
import {LoginScreen} from './src/screens/LoginScreen';

import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <LoginScreen />
    </SafeAreaProvider>);
}

export default App;
