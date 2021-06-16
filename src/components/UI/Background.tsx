import React from 'react';
import {View} from 'react-native';
import {colors} from '../../styles/generalStyles';

export const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: colors.primaryColor,
        width: '140%',
        height: '140%',
        bottom: -330,
        transform: [{rotate: '-74deg'}],
      }}
    />
  );
};
