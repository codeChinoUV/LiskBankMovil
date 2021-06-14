import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../screens/AccountScreen';
import {AccountDetailsScreen} from '../screens/AccountDetailsScreen';
import {CreditDetailsScreen} from '../screens/CreditDetailsScreen';
import {AccountsScreen} from '../screens/AccountsScreen';

const Stack = createStackNavigator();

export const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AccountsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent', flex: 1},
      }}>
      <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen
        name="AccountDetailsScreen"
        component={AccountDetailsScreen}
      />
      <Stack.Screen
        name="BottomTabNavigation"
        component={CreditDetailsScreen}
      />
    </Stack.Navigator>
  );
};
