import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {generalStyles} from '../../styles/generalStyles';

interface Props {
  title: string;
  type?: 'primary' | 'secondary';
  onPress: () => void;
  disabled: boolean;
}

export const Button = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
}: Props) => {
  const ios = () => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={[]}>
        <View
          style={[
            stylesOfButton.button,
            type === 'primary'
              ? generalStyles.primaryColor
              : generalStyles.secondaryColor,
          ]}>
          <Text style={stylesOfButton.buttonText}> {title} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const android = () => {
    return (
      <View>
        <TouchableNativeFeedback
          onPress={onPress}
          disabled={disabled}
          background={TouchableNativeFeedback.Ripple('#28425B', false, 165)}>
          <View
            style={[
              stylesOfButton.button,
            ]}>
            <Text style={stylesOfButton.buttonText}> {title} </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  return Platform.OS === 'ios' ? ios() : android();
};

const stylesOfButton = StyleSheet.create({
  button: {
    borderRadius: 32,
    paddingVertical: 4,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
