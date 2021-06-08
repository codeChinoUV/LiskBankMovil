import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {generalStyles} from '../styles/generalStyles';
import {Button} from '../components/UI/Button';
import {useForm} from '../hooks/useForm';

const initialState = {
  user: '',
  password: '',
};

export const LoginScreen = () => {
  const {user, password, onChange} = useForm(initialState);

  const handleLogin = async () => {
    //Do something
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerSection}>
        <Image
          style={styles.mediumLogo}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Logo_de_la_Universidad_Veracruzana.svg/1200px-Logo_de_la_Universidad_Veracruzana.svg.png',
          }}
        />
        <Text style={styles.title}>Lis Bank</Text>
        <Text style={styles.subtitle}>Banco oficial de la LIS </Text>
      </View>
      <View style={styles.formSection}>
        <Text style={styles.inputLabel}>Usuario</Text>
        <TextInput
          style={[styles.input, generalStyles.bgColorInput]}
          onChangeText={value => onChange(value, 'user')}
          value={user}
          keyboardType="default"
        />
        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          secureTextEntry={true}
          style={[styles.input, generalStyles.bgColorInput, {marginBottom: 36}]}
          onChangeText={value => onChange(value, 'password')}
          value={password}
        />
        <Button title="Iniciar sesión" onPress={handleLogin} type="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSection: {
    flex: 2,
    marginHorizontal: 24,
  },
  mediumLogo: {
    height: 200,
    width: 200,
    borderRadius: 8,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  inputLabel: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 0,
    alignSelf: 'stretch',
    fontSize: 24,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
