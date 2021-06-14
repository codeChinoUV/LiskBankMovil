import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/es';
import {AccountContext} from '../context/AcountContext';
import {Payment} from '../types/Payment';
import EncryptedStorage from 'react-native-encrypted-storage';
import {reqLisBankAPI} from '../api/reqLisBank';
import moment from 'moment/moment';
import 'moment/locale/es';
import {StackActions, useNavigation} from '@react-navigation/native';

interface PaymentResponse {
  data: Payment[];
}

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

const getFormattedTime = (time: Date) => {
  moment().locale('es');
  return time ? moment(time).format('LL') : '';
};

export const PaymentScreen = () => {
  const {accountState} = useContext(AccountContext);
  const navigator = useNavigation();
  const [lastPayment, setLastPayment] = useState({} as Payment);

  const requestPaymentsFromAccount = async (accountId: Number) => {
    const token = await EncryptedStorage.getItem('token');
    if (token !== '') {
      try {
        const response = await reqLisBankAPI.get<PaymentResponse>(
          `/credit-account/${accountId}/payments`,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.data.length > 0) {
          console.log(response.data.data);
          const recentPayment = response.data.data.sort(
            (a, b) =>
              new Date(b.paymentDate).getTime() -
              new Date(a.paymentDate).getTime(),
          )[0];
          setLastPayment(recentPayment);
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Ocurrio un error al recuperar la información del adeudo',
        );
        console.log(error);
        const popAction = StackActions.pop(1);
        navigator.dispatch(popAction);
      }
    }
  };

  useEffect(() => {
    if (accountState.currentAccountDetail) {
      requestPaymentsFromAccount(accountState.currentAccountDetail.id);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adeudo</Text>
      <View style={styles.informationContainer}>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Total</Text>
          <Text style={styles.information}>
            ${formatter.format(lastPayment.totalDebt)}
          </Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Fecha de pago</Text>
          <Text style={styles.information}>
            {getFormattedTime(lastPayment.paymentDate)}
          </Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Pago mensual</Text>
          <Text style={styles.information}>
            ${formatter.format(lastPayment.monthlyTotal)}
          </Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Pago minimo</Text>
          <Text style={styles.information}>
            ${formatter.format(lastPayment.minimum)}
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
