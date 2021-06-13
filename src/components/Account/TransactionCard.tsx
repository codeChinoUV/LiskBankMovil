import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/es';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../styles/generalStyles';
import {Transaction} from '../../types/Transaction';
import moment from 'moment/moment';
import 'moment/locale/es';

const getFormattedTime = (time: Date) => {
  moment().locale('es');
  return moment(time).format('LL');
};

export const TransactionCard = (transaction: Transaction) => {
  const formatter = new Intl.NumberFormat('es-mx', {
    style: 'currency',
    currency: 'MXN',
  });

  return (
    <View style={styles.card}>
      <Text style={[styles.typeAccount, styles.debitAccount]}>
        {getFormattedTime(transaction.date)}
      </Text>
      <View style={styles.firstSection}>
        <Text style={styles.title}>{transaction.concept}</Text>
        <Text>{transaction.type}</Text>
      </View>
      <View style={styles.secondSection}>
        <Text style={[styles.subtitle, styles.textToRight]}>
          ${formatter.format(transaction.amount)}
        </Text>
      </View>
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
    justifyContent: 'flex-end',
  },
  secondSection: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginVertical: 'auto',
  },
  textToRight: {
    textAlign: 'right',
  },
  typeAccount: {
    position: 'absolute',
    left: 15,
    top: 10,
    fontSize: 12,
  },
  creditAccount: {
    color: colors.secondaryColor,
  },
  debitAccount: {
    color: colors.primaryColor,
  },
});
