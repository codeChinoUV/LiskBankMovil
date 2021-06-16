import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import {colors} from '../styles/generalStyles';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const PerfilScreen = ({navigation}: Props) => {
  const {authState, logout} = useContext(AuthContext);

  // @ts-ignore
  const {name, lastName, email, phoneNumber, address} = authState.user;

  const handleLogout = () => {
    logout();
    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu perfil</Text>
        <Button
          buttonStyle={styles.logoutButton}
          onPress={handleLogout}
          icon={<Icon name="log-in-outline" size={30} color="black" />}
        />
      </View>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            uri: 'data:image/png;base64,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',
          }}
        />
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.titleInformation}>Datos personales</Text>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Nombre</Text>
          <Text style={styles.information}>
            {name} {lastName}
          </Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Correo electronico</Text>
          <Text style={styles.information}>{email}</Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Télefono</Text>
          <Text style={styles.information}>{phoneNumber}</Text>
        </View>
        <View style={styles.informationSection}>
          <Text style={styles.subtitle}>Dirección</Text>
          <Text style={styles.information}>{address}</Text>
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
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  logoutButton: {
    width: 60,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 100,
  },
  title: {
    fontSize: 30,
  },
  imgContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 100,
    backgroundColor: colors.cardAccountColor,
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
