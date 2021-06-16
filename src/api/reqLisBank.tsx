import axios from 'axios';
// @ts-ignore
import {API_URL} from '@env';

export const reqLisBankAPI = axios.create({
  baseURL: API_URL,
});
