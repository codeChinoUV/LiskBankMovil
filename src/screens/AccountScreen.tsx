import React, {useContext, useEffect, useState} from 'react';
import 'intl';
import 'intl/locale-data/jsonp/es';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AccountContext} from '../context/AcountContext';
import {Button} from 'react-native-elements';
import {colors} from '../styles/generalStyles';
import EncryptedStorage from 'react-native-encrypted-storage';
import {reqLisBankAPI} from '../api/reqLisBank';
import {TransactionsResponse} from './TransactionsScreen';
import {Transaction} from '../types/Transaction';
import {TransactionCard} from '../components/Account/TransactionCard';
import {AuthContext} from '../context/AuthContext';
import {isCreditAccount} from '../components/Account/CardAccount';
import {useNavigation} from '@react-navigation/native';

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

export const AccountScreen = () => {
  const {accountState} = useContext(AccountContext);
  const {authState} = useContext(AuthContext);
  const navigator = useNavigation();
  const {currentAccountDetail} = accountState;

  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
          setTransactions(response.data.data);
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
    if (currentAccountDetail) {
      requestTransactionsFromAccount(currentAccountDetail.id);
    }
  }, []);

  const handleSeeDetails = () => {
    navigator.navigate('AccountDetailsScreen');
  };

  const handleAdeudo = () => {
    navigator.navigate('PaymentScreen');
  };

  const getLasDigitsCard = (cardNumber: string | undefined): string => {
    return cardNumber
      ? cardNumber.slice(cardNumber.length - 5, cardNumber.length - 1)
      : '';
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.cardAmount}>
          <Text style={styles.amount}>
            $
            {formatter.format(
              currentAccountDetail?.account.availableBalance as number,
            )}
          </Text>
          <Text style={{fontWeight: '600', marginBottom: 15}}>
            Saldo disponible
          </Text>
          <Button
            buttonStyle={styles.buttonSeeDetails}
            onPress={handleSeeDetails}
            title="Ver detalles"
            titleStyle={styles.buttonTitle}
          />
        </View>
        <LinearGradient
          style={styles.cardCard}
          colors={
            isCreditAccount(currentAccountDetail)
              ? ['#12a350', '#10bd5d', '#4fbd7d']
              : ['#1273cd', '#227cce', '#4a84ba']
          }
          start={{x: 0.1, y: 0.3}}>
          <View>
            <Text style={styles.titleCard}>LisBank</Text>
            <Text style={styles.typeTarjet}>
              {isCreditAccount(currentAccountDetail) ? 'Credito' : 'Debito'}
            </Text>
            <Text style={styles.cardNumber}>
              #### #### ####{' '}
              {getLasDigitsCard(currentAccountDetail?.account.card.number)}
            </Text>
          </View>
          <View style={styles.cardDateAndCVVDetails}>
            <View style={styles.elementDetailCard}>
              <Text style={{color: 'white'}}>Fecha </Text>
              <Text style={styles.fontWeight}>
                {currentAccountDetail?.account.card.dueDate}
              </Text>
            </View>
            <View style={styles.elementDetailCard}>
              <Text style={{color: 'white'}}>CVV </Text>
              <Text style={styles.fontWeight}>
                {currentAccountDetail?.account.card.cvv}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.clientName}>
              {authState.user?.name} {authState.user?.lastName}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.sectionDetails}>
          {isCreditAccount(accountState.currentAccountDetail) ? (
            <Button
              buttonStyle={styles.cardOption}
              title="Resumen de adeudo"
              onPress={handleAdeudo}
            />
          ) : (
            <Button
              buttonStyle={styles.cardOption}
              title="Realizar transaferencia"
            />
          )}
        </View>
      </View>

      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Ultimos movimientos</Text>
        <ScrollView>
          {transactions.map(t => (
            <TransactionCard transaction={t} extended={false} key={t.id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
  },
  cardAmount: {
    backgroundColor: colors.cardAccountColor,
    paddingVertical: 25,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderRadius: 16,
    marginBottom: 15,
  },
  amount: {
    fontSize: 30,
    marginBottom: 10,
  },
  buttonSeeDetails: {
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  buttonTitle: {
    color: 'black',
  },
  cardCard: {
    justifyContent: 'flex-end',
    backgroundColor: colors.cardAccountColor,
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 16,
    height: 175,
  },
  titleCard: {
    position: 'absolute',
    top: -60,
    right: 10,
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  typeTarjet: {
    position: 'absolute',
    top: -26,
    right: 10,
    color: 'white',
    fontSize: 12,
  },
  cardDateAndCVVDetails: {
    marginVertical: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  elementDetailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 60,
  },
  cardNumber: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
  },
  fontWeight: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  clientName: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  sectionDetails: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardOption: {
    backgroundColor: colors.primaryColor,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 16,
  },
  cardOptionText: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  transactionsSection: {
    flex: 1,
  },
});
