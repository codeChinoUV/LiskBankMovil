import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AccountContext} from '../context/AcountContext';
import {AuthContext} from '../context/AuthContext';
import {isCreditAccount} from '../components/Account/CardAccount';

export const AccountDetailsScreen = () => {
  const {accountState} = useContext(AccountContext);
  const {authState} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cuenta de{' '}
        {isCreditAccount(accountState.currentAccountDetail)
          ? 'credito'
          : 'debito'}
      </Text>
      <View style={styles.informationContainer}>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Nombre</Text>
          <Text style={styles.information}>
            {authState.user?.name} {authState.user?.lastName}
          </Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Número de cuenta</Text>
          <Text style={styles.information}>
            {accountState.currentAccountDetail?.account.number}
          </Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Clabe de la cuenta</Text>
          <Text style={styles.information}>
            {accountState.currentAccountDetail?.account.clabe}
          </Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Numero de la tarjeta</Text>
          <Text style={styles.information}>
            {accountState.currentAccountDetail?.account.card.number}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
  },
  informationContainer: {
    flex: 4,
  },
  titleInformation: {
    fontSize: 20,
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 16,
  },
  information: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  informationSection: {
    marginTop: 15,
  },
});
