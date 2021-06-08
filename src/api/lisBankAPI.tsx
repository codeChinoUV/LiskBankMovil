import axios from 'axios';

export const lisBankAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
});
