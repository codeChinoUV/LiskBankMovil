import React, {useContext} from 'react';
import {ScrollView, Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export const PerfilScreen = () => {
  const {authState, logout} = useContext(AuthContext);

  return (
    <ScrollView>
      <Text>{JSON.stringify(authState.user)}</Text>
    </ScrollView>
  );
};
