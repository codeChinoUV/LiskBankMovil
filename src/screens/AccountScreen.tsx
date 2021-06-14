import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AccountContext} from '../context/AcountContext';

export const AccountScreen = () => {
  const {accountState} = useContext(AccountContext);
  const {currentAccountDetail} = accountState;
  return (
    <View>
      <Text>{JSON.stringify(currentAccountDetail)}</Text>
    </View>
  );
};
