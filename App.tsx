import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen} from './src/screens/LoginScreen';

function App() {
  return (
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );
}

export default App;
