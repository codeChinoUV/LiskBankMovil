import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
// @ts-ignore
import {API_URL} from '@env';

export const reqLisBankAPI = axios.create({
  baseURL: API_URL,
});

export const reqLisBankWithToken = async () => {
  const token = (await EncryptedStorage.getItem('token')) || '';
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
