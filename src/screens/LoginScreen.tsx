import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {generalStyles} from '../styles/generalStyles';
import {Button} from '../components/UI/Button';
import {useForm} from '../hooks/useForm';
import {Icon} from 'react-native-elements';
import {reqLisBankAPI} from '../api/reqLisBank';
import {StackScreenProps} from '@react-navigation/stack';

const initialState: Login = {
  user: '',
  password: '',
};

interface ResponseToken {
  token: string;
  response: {
    data: string | null;
  };
}

interface Login {
  user: '';
  password: '';
}

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const [showIncorrecLogin, setShowIncorrecLogin] = useState(false);
  const {user, password, onChange} = useForm(initialState);

  const login = async () => {
    try {
      const resp = await reqLisBankAPI.post<ResponseToken>('/token', {
        user,
        password,
      });
      await EncryptedStorage.setItem('token', resp.data.token);
      setShowIncorrecLogin(false);
      navigation.navigate('AccountsScreen');
    } catch (error) {
      setShowIncorrecLogin(true);
    }
  };

  const handleLogin = async () => {
    Keyboard.dismiss;
    await login();
  };

  return (
    <ScrollView style={styles.screen}>
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
        {showIncorrecLogin ? (
          <View style={styles.iconWithText}>
            <Icon name="error" color="red" size={25} />
            <Text style={{color: 'red', fontSize: 15}}>
              {' '}
              Usuario o contraseña no validos
            </Text>
          </View>
        ) : (
          <View></View>
        )}
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
    </ScrollView>
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
  iconWithText: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
