import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Accounts} from '../types/Account';
import {reqLisBankAPI} from '../api/reqLisBank';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CardAccount} from '../components/Account/CardAccount';

const initialState: Accounts = {
  debitAccounts: [],
  creditAccounts: [],
};

interface ResponseAccounts {
  data: Accounts;
}

export const AccountsScreen = () => {
  const [account, setAccounts] = useState<Accounts>(initialState);

  const requestAccounts = async () => {
    const token = await EncryptedStorage.getItem('token');
    if (token !== '') {
      try {
        const response = await reqLisBankAPI.get<ResponseAccounts>(
          '/client/accounts',
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAccounts(response.data.data);
      } catch (error) {
        Alert.alert(
          'Error',
          'Ocurrio un error al recuperar tus cuentas, se cerrara la sesión',
        );
      }
    }
  };

  useEffect(() => {
    requestAccounts();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Cuentas</Text>
      <ScrollView>
        {account.creditAccounts.map(ca => (
          <CardAccount key={ca.id} {...ca} />
        ))}
        {account.debitAccounts.map(ca => (
          <CardAccount key={ca.id} {...ca} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    paddingLeft: 15,
  },
});
