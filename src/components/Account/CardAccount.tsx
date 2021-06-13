import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/es';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../styles/generalStyles';
import {CreditAccount, DebitAccount} from '../../types/Account';

function isCreditAccount(
  account: DebitAccount | CreditAccount,
): account is CreditAccount {
  return (account as CreditAccount).maxCredit !== undefined;
}

export const CardAccount = (accountToShow: DebitAccount | CreditAccount) => {
  const handleShow = () => {
    console.log('touch: ' + accountToShow.id);
  };

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });

  return (
    <View style={styles.card} onTouchEnd={handleShow}>
      <View style={styles.firstSection}>
        <Text style={styles.title}>
          ${formatter.format(accountToShow.account.availableBalance)}
        </Text>
        <Text>Saldo disponible</Text>
      </View>
      <View style={styles.secondSection}>
        <Text style={[styles.subtitle, styles.textToRight]}>Cuenta</Text>
        <Text style={styles.textToRight}>{accountToShow.account.number}</Text>
      </View>
      {isCreditAccount(accountToShow) ? (
        <Text style={[styles.typeAccount, styles.creditAccount]}>
          Cuenta de credito
        </Text>
      ) : (
        <Text style={[styles.typeAccount, styles.debitAccount]}>
          Cuenta de debito
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardAccountColor,
    borderRadius: 24,
    marginVertical: 10,
    height: 100,
    maxHeight: 100,
    padding: 15,
  },
  firstSection: {
    flex: 2,
  },
  secondSection: {
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  subtitle: {
    fontSize: 20,
  },
  textToRight: {
    textAlign: 'right',
  },
  typeAccount: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    fontSize: 12,
  },
  creditAccount: {
    color: colors.secondaryColor,
  },
  debitAccount: {
    color: colors.primaryColor,
  },
});
