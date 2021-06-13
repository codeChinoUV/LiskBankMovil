import React, {useContext} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {generalStyles} from '../styles/generalStyles';
import {Button} from '../components/UI/Button';
import {useForm} from '../hooks/useForm';
import {reqLisBankAPI} from '../api/reqLisBank';
import {StackScreenProps} from '@react-navigation/stack';
import {LoginResponse} from '../types/Token';
import {AuthContext} from '../context/AuthContext';

const initialState: Login = {
  user: '',
  password: '',
};

interface Login {
  user: '';
  password: '';
}

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {user, password, onChange} = useForm(initialState);
  const {logIn} = useContext(AuthContext);

  const login = async () => {
    try {
      const resp = await reqLisBankAPI.post<LoginResponse>('/token', {
        user,
        password,
      });
      await EncryptedStorage.setItem('token', resp.data.accessToken);
      logIn(resp.data.data);
      navigation.replace('BottomTabNavigation');
    } catch (error) {
      Alert.alert('Login incorrecto', 'Usuario o contraseña no válidos');
    }
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    await login();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1}}>
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
              style={[
                styles.input,
                generalStyles.bgColorInput,
                {marginBottom: 36},
              ]}
              onChangeText={value => onChange(value, 'password')}
              value={password}
            />
            <Button
              title="Iniciar sesión"
              onPress={handleLogin}
              type="secondary"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
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
  iconWithText: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
