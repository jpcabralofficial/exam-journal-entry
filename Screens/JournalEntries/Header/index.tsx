/** @format */

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const Header = () => {
  return (
    <React.Fragment>
      <View
        className={'w-full flex-row justify-between items-center py-2 px-4'}>
        <Text className='color-blue-500 font-semibold text-xl'>
          Journal Entry
        </Text>
      </View>
      <View className='h-[1px] w-full bg-gray-200' />
    </React.Fragment>
  );
};

export default React.memo(Header);
