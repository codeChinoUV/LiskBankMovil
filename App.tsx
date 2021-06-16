import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import {AuthProvider} from './src/context/AuthContext';
import {AccountProvider} from './src/context/AcountContext';

function App() {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
}

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <AccountProvider>{children}</AccountProvider>
    </AuthProvider>
  );
};

export default App;
