import React, {useContext, useState} from 'react';
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
import {useForm} from '../hooks/useForm';
import {reqLisBankAPI} from '../api/reqLisBank';
import {StackScreenProps} from '@react-navigation/stack';
import {LoginResponse} from '../types/Token';
import {AuthContext} from '../context/AuthContext';
import {Background} from '../components/UI/Background';
import {Button} from 'react-native-elements/dist/buttons/Button';

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
  const [loading, setLoading] = useState(false);
  const {logIn} = useContext(AuthContext);

  const login = async () => {
    try {
      setLoading(true);
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
    setLoading(false);
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (user.length > 0 && password.length) {
      await login();
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1}}>
          <Background />
          <View style={styles.headerSection}>
            <Image
              style={styles.mediumLogo}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Logo_de_la_Universidad_Veracruzana.svg/1200px-Logo_de_la_Universidad_Veracruzana.svg.png',
              }}
            />
            <Text style={styles.title}>LisBank</Text>
            <Text style={styles.subtitle}>Banco oficial de la LIS </Text>
          </View>
          <View style={styles.formSection}>
            <Text style={styles.inputLabel}>Usuario:</Text>
            <TextInput
              style={[styles.input]}
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={value => onChange(value, 'user')}
              value={user}
              keyboardType="email-address"
              underlineColorAndroid="white"
            />
            <Text style={styles.inputLabel}>Contraseña:</Text>
            <TextInput
              secureTextEntry={true}
              style={[styles.input, {marginBottom: 36}]}
              placeholderTextColor="rgba(255,255,255,0.4)"
              onChangeText={value => onChange(value, 'password')}
              value={password}
              keyboardType="default"
              underlineColorAndroid="white"
            />
            <Button
              title="Iniciar sesión"
              onPress={handleLogin}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonText}
              disabled={loading}
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
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
    color: 'white',
  },
  inputLabel: {
    fontSize: 18,
    marginVertical: 8,
    color: 'white',
    fontWeight: '700',
  },
  input: {
    alignSelf: 'stretch',
    fontSize: 20,
    color: 'white',
  },
  iconWithText: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 18,
  },
});
