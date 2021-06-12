import {StyleSheet} from 'react-native';

export const colors = {
  primaryColor: '#0c5faa',
  secondaryColor: '#0a8d42',
  backgroundColor: 'white',
  inputColor: 'gainsboro',
};

export const generalStyles = StyleSheet.create({
  bgColorInput: {
    backgroundColor: colors.inputColor,
  },
  primaryColor: {
    color: 'white',
    backgroundColor: colors.primaryColor,
  },
  secondaryColor: {
    color: 'white',
    backgroundColor: colors.secondaryColor,
  },
});
