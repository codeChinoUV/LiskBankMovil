import React, {useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Transaction} from '../types/Transaction';
import EncryptedStorage from 'react-native-encrypted-storage';
import {reqLisBankAPI} from '../api/reqLisBank';
import {AccountContext} from '../context/AcountContext';
import {TransactionCard} from '../components/Account/TransactionCard';

export interface TransactionsResponse {
  data: Transaction[];
}

export const TransactionsScreen = () => {
  const {accountState, setTransactions} = useContext(AccountContext);
  const [loading, setLoading] = useState(true);

  const {transactions, account} = accountState;

  const requestAllTransactions = () => {
    account?.debitAccounts.forEach(da => {
      requestTransactionsFromAccount(da.id);
    });
    account?.creditAccounts.forEach(da => {
      requestTransactionsFromAccount(da.id);
    });
  };

  const requestTransactionsFromAccount = async (accountId: Number) => {
    const token = await EncryptedStorage.getItem('token');
    if (token !== '') {
      try {
        const response = await reqLisBankAPI.get<TransactionsResponse>(
          `/transactions/client/account/${accountId}/transactions`,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.data.length > 0) {
          const newTransactions = transactions.concat(response.data.data);
          setTransactions(newTransactions);
          console.log(newTransactions);
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Ocurrio un error al recuperar los movimientos de sus cuentas,' +
            ' puede que la información mostrada no se encuentre completa',
        );
      }
    }
  };

  useEffect(() => {
    setLoading(false);
    requestAllTransactions();
  }, []);

  const loadingElement = () => {
    return (
      <View>
        <View>
          <Text>Cargando...</Text>
        </View>
      </View>
    );
  };

  const transactionsUI = () => {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Movimientos</Text>
        <ScrollView>
          {transactions.map(t => (
            <TransactionCard key={t.id} transaction={t} extended={true} />
          ))}
        </ScrollView>
      </View>
    );
  };

  return loading ? loadingElement() : transactionsUI();
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
