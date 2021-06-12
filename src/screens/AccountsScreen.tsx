import React, {useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {StackActions, useNavigation} from "@react-navigation/native";

export const AccountsScreen = () => {

  const navigator =  useNavigation();

  return (
    <ScrollView>
      <Text>Prueba</Text>
    </ScrollView>
  );
};
