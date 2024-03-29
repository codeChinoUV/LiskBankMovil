import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {TransactionsScreen} from '../screens/TransactionsScreen';
import {PerfilScreen} from '../screens/PerfilScreen';
import {colors} from '../styles/generalStyles';
import {Platform, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AccountStackNavigator} from './AccountDetailStackNavigator';

const TabIOS = createBottomTabNavigator();
const TabAndroid = createMaterialBottomTabNavigator();

export const BottomTabNavigation = () => {
  return Platform.OS === 'ios' ? (
    <BottomTabNavigationIOS />
  ) : (
    <BottomTabNavigationAndroid />
  );
};

const BottomTabNavigationIOS = () => {
  return (
    <TabIOS.Navigator
      sceneContainerStyle={{backgroundColor: colors.backgroundColor}}
      tabBarOptions={{
        activeTintColor: colors.primaryColor,
        style: {
          borderTopColor: colors.secondaryColor,
        },
        labelStyle: {
          fontSize: 14,
        },
      }}
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({color, focused, size}) => {
            let iconName: string = '';
            switch (route.name) {
              case 'AccountStackNavigator':
                iconName = 'home-outline';
                break;
              case 'TransacttionsScreen':
                iconName = 'card-outline';
                break;
              case 'PerfilScreen':
                iconName = 'person-circle-outline';
                break;
            }
            return <Text />;
          },
        };
      }}>
      <TabIOS.Screen
        name="AccountStackNavigator"
        options={{title: 'Mis Cuentas'}}
        component={AccountStackNavigator}
      />
      <TabIOS.Screen
        name="TransacttionsScreen"
        options={{title: 'Movimientos'}}
        component={TransactionsScreen}
      />
      <TabIOS.Screen
        name="PerfilScreen"
        options={{title: 'Mi perfil'}}
        component={PerfilScreen}
      />
    </TabIOS.Navigator>
  );
};

function BottomTabNavigationAndroid() {
  return (
    <TabAndroid.Navigator
      sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: colors.primaryColor,
        height: 60,
      }}
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({color, focused}) => {
            let iconName: string = '';
            switch (route.name) {
              case 'AccountStackNavigator':
                iconName = 'home-outline';
                break;
              case 'TransacttionsScreen':
                iconName = 'card-outline';
                break;
              case 'PerfilScreen':
                iconName = 'person-circle-outline';
                break;
            }
            return (
              <Text>
                <Icon name={iconName} size={24} color={color} />
              </Text>
            );
          },
        };
      }}>
      <TabAndroid.Screen
        name="AccountStackNavigator"
        options={{title: 'Mis cuentas'}}
        component={AccountStackNavigator}
      />
      <TabAndroid.Screen
        options={{title: 'Movimientos'}}
        name="TransacttionsScreen"
        component={TransactionsScreen}
      />
      <TabAndroid.Screen
        name="PerfilScreen"
        options={{title: 'Mi perfil'}}
        component={PerfilScreen}
      />
    </TabAndroid.Navigator>
  );
}
